param(
  [string]$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem

$RawRoot = Join-Path $RepoRoot 'lbs-files/raw'
$ProcessedRoot = Join-Path $RepoRoot 'lbs-files/processed'

function Ensure-Dir([string]$Path) {
  $dir = if ([System.IO.Path]::HasExtension($Path)) { Split-Path -Parent $Path } else { $Path }
  if ($dir -and -not (Test-Path -LiteralPath $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }
}

function Write-TextFile([string]$Path, [string]$Text) {
  Ensure-Dir $Path
  Set-Content -LiteralPath $Path -Value $Text -Encoding UTF8
}

function Write-JsonFile([string]$Path, $Data, [int]$Depth = 20) {
  Ensure-Dir $Path
  $Data | ConvertTo-Json -Depth $Depth | Set-Content -LiteralPath $Path -Encoding UTF8
}

function Write-JsonLines([string]$Path, [object[]]$Items) {
  Ensure-Dir $Path
  $lines = foreach ($item in $Items) { $item | ConvertTo-Json -Depth 20 -Compress }
  Set-Content -LiteralPath $Path -Value $lines -Encoding UTF8
}

function Export-ObjectsCsv([string]$Path, [object[]]$Rows) {
  Ensure-Dir $Path
  if ($Rows.Count -eq 0) {
    Set-Content -LiteralPath $Path -Value '' -Encoding UTF8
    return
  }
  $Rows | Export-Csv -LiteralPath $Path -NoTypeInformation -Encoding UTF8
}

function Sanitize-Key([string]$Text) {
  if ([string]::IsNullOrWhiteSpace($Text)) { return 'value' }
  $key = $Text.Trim().ToLowerInvariant()
  $key = $key -replace '[^a-z0-9]+', '_'
  $key = $key.Trim('_')
  if ([string]::IsNullOrWhiteSpace($key)) { return 'value' }
  return $key
}

function Read-ZipEntry([System.IO.Compression.ZipArchive]$Zip, [string]$Name) {
  $entry = $Zip.GetEntry($Name)
  if ($null -eq $entry) { return $null }
  $reader = New-Object System.IO.StreamReader($entry.Open())
  try { return $reader.ReadToEnd() } finally { $reader.Dispose() }
}

function Get-DocxParagraphs([string]$Path) {
  $zip = [System.IO.Compression.ZipFile]::OpenRead((Resolve-Path -LiteralPath $Path))
  try {
    $xmlText = Read-ZipEntry $zip 'word/document.xml'
    if ($null -eq $xmlText) { return @() }
    [xml]$xml = $xmlText
    $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
    $ns.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
    $paras = @()
    foreach ($p in $xml.SelectNodes('//w:p', $ns)) {
      $parts = @()
      foreach ($n in $p.SelectNodes('.//w:t|.//w:tab|.//w:br', $ns)) {
        if ($n.LocalName -eq 't') { $parts += $n.InnerText }
        elseif ($n.LocalName -eq 'tab') { $parts += "`t" }
        elseif ($n.LocalName -eq 'br') { $parts += "`n" }
      }
      $line = ($parts -join '').Trim()
      if ($line.Length -gt 0) { $paras += $line }
    }
    return $paras
  } finally {
    $zip.Dispose()
  }
}

function Get-PptxSlides([string]$Path) {
  $zip = [System.IO.Compression.ZipFile]::OpenRead((Resolve-Path -LiteralPath $Path))
  try {
    $slides = @()
    $entries = $zip.Entries |
      Where-Object { $_.FullName -match '^ppt/slides/slide\d+\.xml$' } |
      Sort-Object { [int]([regex]::Match($_.FullName, 'slide(\d+)\.xml').Groups[1].Value) }
    foreach ($entry in $entries) {
      $reader = New-Object System.IO.StreamReader($entry.Open())
      try { $xmlText = $reader.ReadToEnd() } finally { $reader.Dispose() }
      [xml]$xml = $xmlText
      $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
      $ns.AddNamespace('a', 'http://schemas.openxmlformats.org/drawingml/2006/main')
      $texts = @()
      foreach ($t in $xml.SelectNodes('//a:t', $ns)) {
        if ($t.InnerText.Trim().Length -gt 0) { $texts += $t.InnerText.Trim() }
      }
      $slideNumber = [int]([regex]::Match($entry.FullName, 'slide(\d+)\.xml').Groups[1].Value)
      $slides += [pscustomobject]@{
        slide_number = $slideNumber
        text = ($texts -join "`n")
      }
    }
    return $slides
  } finally {
    $zip.Dispose()
  }
}

function Get-MarkdownSlideSections([string]$Path) {
  $text = Get-Content -LiteralPath $Path -Raw
  $pattern = '(?ms)^## Slide\s+(\d+):?\s*([^\r\n]*)\r?\n(.*?)(?=^## Slide\s+\d+:?|\z)'
  $matches = [regex]::Matches($text, $pattern)
  $sections = @()
  foreach ($m in $matches) {
    $slideNumber = [int]$m.Groups[1].Value
    $title = $m.Groups[2].Value.Trim()
    $body = $m.Groups[3].Value.Trim()
    $sections += [pscustomobject]@{
      slide_number = $slideNumber
      title = $title
      text = $body
    }
  }
  if ($sections.Count -eq 0) {
    $sections += [pscustomobject]@{
      slide_number = 0
      title = 'Parsed toolkit markdown'
      text = $text.Trim()
    }
  }
  return $sections
}

function Column-Index([string]$Ref) {
  $letters = ([regex]::Match($Ref, '^[A-Z]+')).Value
  if (-not $letters) { return 0 }
  $n = 0
  foreach ($ch in $letters.ToCharArray()) {
    $n = ($n * 26) + ([int][char]$ch - [int][char]'A' + 1)
  }
  return $n - 1
}

function Get-XlsxSheetRows([System.IO.Compression.ZipArchive]$Zip, [string]$EntryName, [object[]]$SharedStrings, [int]$MaxRowNumber = 0) {
  $entry = $Zip.GetEntry($EntryName)
  if ($null -eq $entry) { return @() }
  $rows = @()
  $stream = $entry.Open()
  $reader = [System.Xml.XmlReader]::Create($stream)
  try {
    while ($reader.Read()) {
      if ($reader.NodeType -ne [System.Xml.XmlNodeType]::Element -or $reader.LocalName -ne 'row') { continue }
      $rowNumberAttr = $reader.GetAttribute('r')
      $rowNumber = if ($rowNumberAttr) { [int]$rowNumberAttr } else { $rows.Count + 1 }
      if ($MaxRowNumber -gt 0 -and $rowNumber -gt $MaxRowNumber) { break }
      $vals = @()
      $rowReader = $reader.ReadSubtree()
      try {
        while ($rowReader.Read()) {
          if ($rowReader.NodeType -ne [System.Xml.XmlNodeType]::Element -or $rowReader.LocalName -ne 'c') { continue }
          $cellRef = $rowReader.GetAttribute('r')
          $cellType = $rowReader.GetAttribute('t')
          $idx = Column-Index $cellRef
          while ($vals.Count -le $idx) { $vals += '' }
          $val = ''
          $cellReader = $rowReader.ReadSubtree()
          try {
            while ($cellReader.Read()) {
              if ($cellReader.NodeType -ne [System.Xml.XmlNodeType]::Element) { continue }
              if ($cellReader.LocalName -eq 'v') {
                $val = $cellReader.ReadElementContentAsString()
                break
              }
              if ($cellReader.LocalName -eq 't') {
                $val += $cellReader.ReadElementContentAsString()
              }
            }
          } finally {
            $cellReader.Dispose()
          }
          if ($cellType -eq 's' -and $val -match '^\d+$') {
            $si = [int]$val
            if ($si -lt $SharedStrings.Count) { $val = $SharedStrings[$si] }
          }
          $vals[$idx] = ($val -replace "`r", '').Trim()
        }
      } finally {
        $rowReader.Dispose()
      }
      if (($vals | Where-Object { $_ -ne '' }).Count -gt 0) {
        $rows += [pscustomobject]@{
          row_number = $rowNumber
          values = $vals
        }
      }
    }
  } finally {
    $reader.Dispose()
    $stream.Dispose()
  }
  return $rows
}

function Get-XlsxSheets([string]$Path) {
  $zip = [System.IO.Compression.ZipFile]::OpenRead((Resolve-Path -LiteralPath $Path))
  try {
    $shared = @()
    $sstText = Read-ZipEntry $zip 'xl/sharedStrings.xml'
    if ($sstText) {
      [xml]$sst = $sstText
      $nsS = New-Object System.Xml.XmlNamespaceManager($sst.NameTable)
      $nsS.AddNamespace('x', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main')
      foreach ($si in $sst.SelectNodes('//x:si', $nsS)) {
        $parts = @()
        foreach ($t in $si.SelectNodes('.//x:t', $nsS)) { $parts += $t.InnerText }
        $shared += ($parts -join '')
      }
    }

    [xml]$wb = (Read-ZipEntry $zip 'xl/workbook.xml')
    [xml]$rels = (Read-ZipEntry $zip 'xl/_rels/workbook.xml.rels')
    $ns = New-Object System.Xml.XmlNamespaceManager($wb.NameTable)
    $ns.AddNamespace('x', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main')
    $relMap = @{}
    foreach ($r in $rels.Relationships.Relationship) { $relMap[$r.Id] = $r.Target }
    $sheets = @()
    foreach ($sheet in $wb.SelectNodes('//x:sheets/x:sheet', $ns)) {
      $rid = $sheet.GetAttribute('id', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships')
      $target = $relMap[$rid]
      $entryName = 'xl/' + $target.TrimStart('/')
      $entryName = $entryName -replace 'xl/xl/', 'xl/'
      $maxRowNumber = 0
      if ((Split-Path -Leaf $Path) -eq 'Hospitality spaces - Copy.xlsx') { $maxRowNumber = 250 }
      $rows = Get-XlsxSheetRows $zip $entryName $shared $maxRowNumber
      $sheets += [pscustomobject]@{
        name = [string]$sheet.name
        dimension = ''
        rows = $rows
      }
    }
    return $sheets
  } finally {
    $zip.Dispose()
  }
}

function Rows-ToObjects($Rows, [int]$HeaderIndex, [string]$SourceSheet) {
  if ($Rows.Count -le $HeaderIndex) { return @() }
  $header = $Rows[$HeaderIndex].values
  $keys = @()
  $seen = @{}
  for ($i = 0; $i -lt $header.Count; $i++) {
    $key = Sanitize-Key $header[$i]
    if ($seen.ContainsKey($key)) {
      $seen[$key] += 1
      $key = "$key" + '_' + $seen[$key]
    } else {
      $seen[$key] = 1
    }
    $keys += $key
  }
  $objects = @()
  for ($r = $HeaderIndex + 1; $r -lt $Rows.Count; $r++) {
    $vals = $Rows[$r].values
    if (($vals | Where-Object { $_ -ne '' }).Count -eq 0) { continue }
    $obj = [ordered]@{
      source_sheet = $SourceSheet
      source_row = $Rows[$r].row_number
    }
    for ($i = 0; $i -lt $keys.Count; $i++) {
      $obj[$keys[$i]] = if ($i -lt $vals.Count) { $vals[$i] } else { '' }
    }
    $objects += [pscustomobject]$obj
  }
  return $objects
}

function Find-HeaderIndex($Rows, [string[]]$Needles) {
  for ($i = 0; $i -lt [Math]::Min(25, $Rows.Count); $i++) {
    $joined = ($Rows[$i].values -join ' ').ToLowerInvariant()
    $ok = $true
    foreach ($needle in $Needles) {
      if (-not $joined.Contains($needle.ToLowerInvariant())) { $ok = $false; break }
    }
    if ($ok) { return $i }
  }
  return 0
}

function Make-KnowledgeChunks([string]$Source, [string[]]$Paragraphs, [string]$Category) {
  $chunks = @()
  $buffer = @()
  $chunkIndex = 1
  foreach ($p in $Paragraphs) {
    $buffer += $p
    $wordCount = (($buffer -join ' ') -split '\s+').Count
    if ($wordCount -ge 180) {
      $chunks += [pscustomobject]@{
        id = "$Category-$chunkIndex"
        source = $Source
        category = $Category
        text = ($buffer -join "`n")
      }
      $buffer = @()
      $chunkIndex += 1
    }
  }
  if ($buffer.Count -gt 0) {
    $chunks += [pscustomobject]@{
      id = "$Category-$chunkIndex"
      source = $Source
      category = $Category
      text = ($buffer -join "`n")
    }
  }
  return $chunks
}

function New-DocxTemplate([string]$Path, [string]$Title, [object[]]$Fields) {
  Ensure-Dir $Path
  $tmpRoot = Join-Path ([System.IO.Path]::GetTempPath()) ('lbs-docx-template-' + [Guid]::NewGuid().ToString())
  New-Item -ItemType Directory -Force -Path $tmpRoot | Out-Null
  New-Item -ItemType Directory -Force -Path (Join-Path $tmpRoot '_rels') | Out-Null
  New-Item -ItemType Directory -Force -Path (Join-Path $tmpRoot 'word/_rels') | Out-Null
  New-Item -ItemType Directory -Force -Path (Join-Path $tmpRoot 'word') | Out-Null
  Write-TextFile (Join-Path $tmpRoot '[Content_Types].xml') @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>
'@
  Write-TextFile (Join-Path $tmpRoot '_rels/.rels') @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>
'@
  Write-TextFile (Join-Path $tmpRoot 'word/_rels/document.xml.rels') @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>
'@
  $paras = @()
  $paras += "<w:p><w:r><w:t>$([System.Security.SecurityElement]::Escape($Title))</w:t></w:r></w:p>"
  foreach ($f in $Fields) {
    $label = [System.Security.SecurityElement]::Escape($f.label)
    $placeholder = [System.Security.SecurityElement]::Escape('{{' + $f.key + '}}')
    $paras += "<w:p><w:r><w:t>$label`: $placeholder</w:t></w:r></w:p>"
  }
  $doc = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    $($paras -join "`n    ")
    <w:sectPr/>
  </w:body>
</w:document>
"@
  Write-TextFile (Join-Path $tmpRoot 'word/document.xml') $doc
  if (Test-Path -LiteralPath $Path) { Remove-Item -LiteralPath $Path -Force }
  [System.IO.Compression.ZipFile]::CreateFromDirectory($tmpRoot, $Path)
  Remove-Item -LiteralPath $tmpRoot -Recurse -Force
}

New-Item -ItemType Directory -Force -Path $ProcessedRoot | Out-Null

$manifest = [ordered]@{
  generated_at = (Get-Date).ToString('s')
  note = 'Generated from raw LBS files. Raw files remain source-of-truth backups.'
  pdf_extraction = 'Event Toolkit PDF is the most authoritative toolkit source. This conversion uses the ChatGPT-parsed markdown companion at lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md as the authoritative parsed PDF text. Hospitality Brochure PDF still requires future PDF text extraction.'
}

Write-TextFile (Join-Path $ProcessedRoot 'README.md') @"
# Processed LBS Event Data

Generated from `lbs-files/raw/` by `scripts/convert-lbs-files.ps1`.

Raw Office/PDF files remain the source-of-truth backups. Runtime code should use these processed CSV/JSON/Markdown/template files or PostgreSQL tables.

Toolkit source note: `[SA Copy] LBS Event Toolkit Student Clubs Updated - Copy.pdf` remains the most authoritative toolkit source. This processed tree uses `lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md` as the authoritative parsed PDF text. The older PPTX-derived proxy is kept only as comparison/historical fallback context.

Known conversion limitation: direct PDF text extraction is not available in this session. The Hospitality Brochure PDF has a placeholder extraction record until a PDF extractor is added.
"@
Write-JsonFile (Join-Path $ProcessedRoot 'manifest.json') $manifest

# Finance
$financePath = Join-Path $RawRoot 'Finance_Code_Directory - Copy.xlsx'
$financeSheets = Get-XlsxSheets $financePath
$financeRows = @()
foreach ($sheet in $financeSheets | Where-Object { $_.name -like 'Finance Code Directory*' }) {
  $header = Find-HeaderIndex $sheet.rows @('EVENT')
  for ($i = $header + 1; $i -lt $sheet.rows.Count; $i++) {
    $v = $sheet.rows[$i].values
    if ($v.Count -lt 3 -or [string]::IsNullOrWhiteSpace($v[0]) -or [string]::IsNullOrWhiteSpace($v[2])) { continue }
    $financeRows += [pscustomobject]@{
      academic_year = ($sheet.name -replace 'Finance Code Directory \(', '').Trim()
      finance_code = $v[0]
      club_name = if ($v.Count -gt 1) { $v[1] } else { '' }
      event_name = if ($v.Count -gt 2) { $v[2] } else { '' }
      start_date = if ($v.Count -gt 3) { $v[3] } else { '' }
      finish_date = if ($v.Count -gt 4) { $v[4] } else { '' }
      vat_status = if ($v.Count -gt 5) { $v[5] } else { '' }
      cost_centre = if ($v.Count -gt 6) { $v[6] } else { '' }
      source_sheet = $sheet.name
      source_row = $sheet.rows[$i].row_number
    }
  }
}
Export-ObjectsCsv (Join-Path $ProcessedRoot 'finance/finance_codes.csv') $financeRows
Write-JsonFile (Join-Path $ProcessedRoot 'finance/finance_codes.json') $financeRows
$financeIndex = $financeRows | ForEach-Object {
  [pscustomobject]@{
    key = (($_.club_name + ' ' + $_.event_name) -replace '[^a-zA-Z0-9]+', ' ').Trim().ToLowerInvariant()
    finance_code = $_.finance_code
    club_name = $_.club_name
    event_name = $_.event_name
    academic_year = $_.academic_year
  }
}
Write-JsonFile (Join-Path $ProcessedRoot 'finance/finance_lookup_index.json') $financeIndex
Write-TextFile (Join-Path $ProcessedRoot 'finance/finance_code_rules.md') "# Finance Code Rules`n`n- Surface finance-code lookup whenever budget is involved.`n- Finance codes may be shown to users.`n- If no matching repeat event is found, advise the organiser to involve club treasury / finance-code setup."
Write-JsonFile (Join-Path $ProcessedRoot 'finance/finance_code_test_cases.json') @(
  [pscustomobject]@{ id = 'finance-repeat-event'; input = 'China Business Forum'; expected = 'existing_match_if_directory_contains_similar_event' },
  [pscustomobject]@{ id = 'finance-new-event'; input = 'New Wine and Spirits Club concept'; expected = 'needs_finance_code_setup_if_no_match' }
)
Write-JsonFile (Join-Path $ProcessedRoot 'schemas/finance_code.schema.json') ([ordered]@{
  '$schema' = 'https://json-schema.org/draft/2020-12/schema'
  title = 'FinanceCode'
  type = 'object'
  required = @('finance_code','event_name','source_sheet')
  properties = [ordered]@{
    academic_year = [ordered]@{ type = 'string' }
    finance_code = [ordered]@{ type = 'string' }
    club_name = [ordered]@{ type = 'string' }
    event_name = [ordered]@{ type = 'string' }
    start_date = [ordered]@{ type = 'string' }
    finish_date = [ordered]@{ type = 'string' }
    vat_status = [ordered]@{ type = 'string' }
    cost_centre = [ordered]@{ type = 'string' }
    source_sheet = [ordered]@{ type = 'string' }
    source_row = [ordered]@{ type = @('integer','number','string') }
  }
})

# Lifecycle
$lifecycleSheets = Get-XlsxSheets (Join-Path $RawRoot 'Event Management Lifecycle.xlsx')
foreach ($sheet in $lifecycleSheets) {
  $header = Find-HeaderIndex $sheet.rows @()
  if ($sheet.name -eq 'Lifecycle Phases Overview') { $header = 1 }
  if ($sheet.name -eq 'Timelines within Phase') { $header = 2 }
  if ($sheet.name -eq 'Stakeholders by Phase') { $header = 0 }
  if ($sheet.name -eq 'Forms by Phase') { $header = 0 }
  $objects = Rows-ToObjects $sheet.rows $header $sheet.name
  switch ($sheet.name) {
    'Lifecycle Phases Overview' { Write-JsonFile (Join-Path $ProcessedRoot 'lifecycle/lifecycle_phases.json') $objects }
    'Timelines within Phase' { Export-ObjectsCsv (Join-Path $ProcessedRoot 'lifecycle/phase_timelines.csv') $objects }
    'Stakeholders by Phase' { Export-ObjectsCsv (Join-Path $ProcessedRoot 'lifecycle/stakeholders_by_phase.csv') $objects }
    'Forms by Phase' { Write-JsonFile (Join-Path $ProcessedRoot 'lifecycle/forms_by_phase.json') $objects }
  }
}
Write-JsonFile (Join-Path $ProcessedRoot 'lifecycle/checklist_rules.json') @(
  [pscustomobject]@{ id = 'space-request-first'; rule = 'Complete EventRequest / Space Request before downstream MVP outputs.' },
  [pscustomobject]@{ id = 'post-phase1-outputs'; rule = 'After EventRequest completion, generate Key Event assessment, EIS if relevant, routing, emails, timeline/checklist, risk flags, and Monday mock payload.' }
)

# XLSX space/catering exports
function Export-SheetSet([string]$RawRelative, [string]$OutBase, [string]$Needle = 'Room') {
  $sheets = Get-XlsxSheets (Join-Path $RawRoot $RawRelative)
  $all = @()
  foreach ($sheet in $sheets) {
    if ($sheet.rows.Count -eq 0) { continue }
    $header = Find-HeaderIndex $sheet.rows @($Needle)
    $objects = Rows-ToObjects $sheet.rows $header $sheet.name
    $all += $objects
  }
  Export-ObjectsCsv (Join-Path $ProcessedRoot "$OutBase.csv") $all
  Write-JsonFile (Join-Path $ProcessedRoot "$OutBase.json") $all
  return $all
}

$spaceMatrix = Export-SheetSet 'space/Space Matrix (1) - Copy.xlsx' 'space/space_matrix' 'Room'
$guideSpace = Export-SheetSet 'space/6) Guide to Space at the School - Copy.xlsx' 'space/guide_to_space_rooms' 'Room'
$capacityOverview = Export-SheetSet 'space/Copy of Room capacity overview - Copy.xlsx' 'space/room_capacity_overview' 'LT'
$hospitalitySpaces = Export-SheetSet 'space/Hospitality spaces - Copy.xlsx' 'space/hospitality_spaces' 'Room'
$socRooms = Export-SheetSet 'space/SOC rooms - Copy.xlsx' 'space/soc_rooms' 'Room'

$spaceMap = [ordered]@{}
foreach ($r in $spaceMatrix) {
  $code = if ($r.room) { $r.room } else { $r.room_2 }
  $name = if ($r.room_2) { $r.room_2 } else { $r.room }
  if (-not $code -and -not $name) { continue }
  $key = (($code + ' ' + $name) -replace '[^a-zA-Z0-9]+', ' ').Trim().ToLowerInvariant()
  if (-not $spaceMap.Contains($key)) {
    $spaceMap[$key] = [pscustomobject]@{
      room_code = $code
      room_name = $name
      capacity = if ($r.capacity) { $r.capacity } else { '' }
      category = if ($r.category) { $r.category } else { '' }
      type = if ($r.type) { $r.type } else { '' }
      owner = if ($r.owner) { $r.owner } else { '' }
      source_used = 'Space Matrix'
      source_priority = 1
    }
  }
}
Write-JsonFile (Join-Path $ProcessedRoot 'space/spaces.json') @($spaceMap.Values)
Write-JsonFile (Join-Path $ProcessedRoot 'schemas/space.schema.json') ([ordered]@{
  '$schema' = 'https://json-schema.org/draft/2020-12/schema'
  title = 'Space'
  type = 'object'
  required = @('source_used')
  properties = [ordered]@{
    room_code = [ordered]@{ type = 'string' }
    room_name = [ordered]@{ type = 'string' }
    capacity = [ordered]@{ type = 'string' }
    category = [ordered]@{ type = 'string' }
    type = [ordered]@{ type = 'string' }
    owner = [ordered]@{ type = 'string' }
    source_used = [ordered]@{ type = 'string' }
    source_priority = [ordered]@{ type = @('integer','number') }
  }
})
Write-JsonFile (Join-Path $ProcessedRoot 'space/space_source_conflicts.json') @(
  [pscustomobject]@{ rule = 'Use Space Matrix first. If missing, use supporting source with more entries and state source used.' }
)
Write-JsonFile (Join-Path $ProcessedRoot 'space/room_setup_options.json') @(
  'theatre', 'classroom', 'boardroom', 'cabaret', 'reception_standing', 'flat_floor', 'tiered', 'not_sure'
)
Write-JsonFile (Join-Path $ProcessedRoot 'space/space_recommendation_test_cases.json') @(
  [pscustomobject]@{ id = 'panel-80-theatre'; attendance = 80; format = 'panel'; preferred_setup = 'theatre' },
  [pscustomobject]@{ id = 'reception-100-catering'; attendance = 100; format = 'networking reception'; catering = $true }
)

$cateringPolicy = Export-SheetSet 'catering/Catering Policy - Copy.xlsx' 'catering/catering_space_policy' 'Room'
Write-JsonFile (Join-Path $ProcessedRoot 'catering/catering_policy_rules.json') @(
  [pscustomobject]@{ id = 'lexington-default'; rule = 'Lexington is the default mandatory catering supplier unless an exception is approved.' },
  [pscustomobject]@{ id = 'external-catering-waiver'; rule = 'External catering requires waiver/approval and should be raised with Catering Events and Space.' }
)
Write-JsonLines (Join-Path $ProcessedRoot 'catering/catering_policy_chunks.jsonl') (Make-KnowledgeChunks 'Catering Policy - Copy.xlsx' @(
  'Catering policy data maps rooms/spaces to catering delivery, alcohol service, and catering/service styles. Use deterministic room-level lookup where table data is present.'
) 'catering-policy')

# DOCX conversions
$cribParas = Get-DocxParagraphs (Join-Path $RawRoot 'request-event/CribSheet - Copy.docx')
$eisParas = Get-DocxParagraphs (Join-Path $RawRoot 'request-event/LBS Event Information Sheet 2023-24 - Copy.docx')
$termsParas = Get-DocxParagraphs (Join-Path $RawRoot 'request-event/LBS Event Terms and Conditions 2024-25.docx')
$waiverParas = Get-DocxParagraphs (Join-Path $RawRoot 'catering/External catering request form - Self-Catering Waiver .docx')
$socChecklistParas = Get-DocxParagraphs (Join-Path $RawRoot 'space/Sammy Ofer Centre Check List (Section 3) copy - Copy.docx')

$spaceRequestFields = @(
  @{ key='organiser_name'; label='Name of person making the request'; category='organiser' },
  @{ key='club_or_programme_affiliation'; label='Club or Programme affiliation'; category='organiser' },
  @{ key='contact_mobile_phone'; label='Contact mobile/phone number'; category='organiser' },
  @{ key='event_title'; label='Event title'; category='event_basics' },
  @{ key='number_of_attendees'; label='Number of attendees'; category='event_basics' },
  @{ key='date'; label='DATE'; category='timing' },
  @{ key='start_finish_time'; label='Start and Finish time of the proposed event'; category='timing' },
  @{ key='event_type'; label='What type of event is this?'; category='event_basics' },
  @{ key='event_details'; label='Event Details'; category='purpose_context' },
  @{ key='external_guest_speaker_details'; label='External Guest Speaker Details'; category='speakers' },
  @{ key='has_external_guest_speakers'; label='Will the event have external guest speaker(s)?'; category='speakers' },
  @{ key='politically_sensitive_or_controversial'; label='Is the nature of the event deemed to be politically sensitive or controversial in any way?'; category='risk_security' },
  @{ key='children_attending'; label='Will there be any children attending?'; category='audience' },
  @{ key='activities'; label='What type of activities will be taking place?'; category='format_logistics' },
  @{ key='noise_impact'; label='Are any of these likely to have a noise impact to the rest of the School community?'; category='format_logistics' },
  @{ key='space_and_setup'; label='Type of space & proposed room setup required'; category='space' },
  @{ key='registration_desk'; label='Do you require a registration desk, what time?'; category='services' },
  @{ key='decorations'; label='Decorations'; category='services' },
  @{ key='catering'; label='Will catering be ordered?'; category='catering' },
  @{ key='alcohol'; label='Will alcohol be available for consumption as part of your event?'; category='catering' },
  @{ key='recorded_music'; label='Will recorded music be played, what time?'; category='services' },
  @{ key='live_music'; label='Will live music be played i.e. School or external band?'; category='services' },
  @{ key='cloakroom'; label='Do you require a cloakroom?'; category='services' },
  @{ key='outside_equipment'; label='Will any outside or extra equipment be hired or leased for the event?'; category='equipment' },
  @{ key='filming'; label='Will any filming take place during the event?'; category='media' },
  @{ key='filming_details'; label='What will be filmed and by whom?'; category='media' },
  @{ key='additional_information'; label='Any additional information'; category='additional_context' }
) | ForEach-Object { [pscustomobject]$_ }
Write-JsonFile (Join-Path $ProcessedRoot 'request-event/space_request_fields.json') $spaceRequestFields
Write-TextFile (Join-Path $ProcessedRoot 'request-event/space_request_form_template.md') ("# Space Request Form Template`n`n" + (($spaceRequestFields | ForEach-Object { "## $($_.label)`n`n{{$($_.key)}}`n" }) -join "`n"))
New-DocxTemplate (Join-Path $ProcessedRoot 'templates/space_request_form_template.docx') 'LBS Event Space Request Draft' $spaceRequestFields
Write-JsonFile (Join-Path $ProcessedRoot 'schemas/event_request.schema.json') ([ordered]@{
  '$schema' = 'https://json-schema.org/draft/2020-12/schema'
  title = 'EventRequest'
  type = 'object'
  additionalProperties = $true
  properties = [ordered]@{
    fields = [ordered]@{ type = 'object'; additionalProperties = $true }
    field_status = [ordered]@{ type = 'object'; additionalProperties = [ordered]@{ enum = @('final','best_estimate','not_sure_yet','needs_confirmation','not_applicable','organiser_follow_up','missing') } }
  }
})
Write-JsonFile (Join-Path $ProcessedRoot 'schemas/field_status.schema.json') ([ordered]@{
  '$schema' = 'https://json-schema.org/draft/2020-12/schema'
  title = 'FieldStatus'
  enum = @('final','best_estimate','not_sure_yet','needs_confirmation','not_applicable','organiser_follow_up','missing')
})
Write-JsonFile (Join-Path $ProcessedRoot 'schemas/space_request_docx.schema.json') ([ordered]@{
  '$schema' = 'https://json-schema.org/draft/2020-12/schema'
  title = 'SpaceRequestDocx'
  type = 'object'
  required = @('event_request')
  properties = [ordered]@{ event_request = [ordered]@{ '$ref' = 'event_request.schema.json' } }
})
Write-JsonFile (Join-Path $ProcessedRoot 'request-event/event_profile_question_flow.json') @(
  [pscustomobject]@{
    id = 'entry-diagnosis'
    purpose = 'Classify the organiser entry point without asking for information already provided.'
    options = @('prepared_event_request','budget_only_no_event_idea','general_event_idea','pasted_draft')
    max_questions_default = 3
    include_options = @('Other','Not sure yet','Help me decide')
  },
  [pscustomobject]@{
    id = 'space-request-form-order'
    purpose = 'When the user has not led with a middle section, collect fields in Space Request Form order.'
    field_keys = @($spaceRequestFields | ForEach-Object { $_.key })
    field_statuses = @('final','best_estimate','not_sure_yet','needs_confirmation','not_applicable','organiser_follow_up','missing')
  },
  [pscustomobject]@{
    id = 'middle-section-follow'
    purpose = 'If the organiser starts with catering, AV, space, budget, or another middle section, preserve that context and continue from there.'
    rule = 'Do not discard extra context; map it to EventRequest fields, routing facts, or later output notes.'
  }
)

$eisFields = @(
  @{ key='programme_event'; label='Programme/Event' },
  @{ key='date'; label='Date/s' },
  @{ key='programme_event_manager'; label='Programme/Event Manager' },
  @{ key='budget_code'; label='Budget Code for out of hours services' },
  @{ key='room_booking_confirmation_number'; label='Room Bookings Confirmation Number' },
  @{ key='proposed_number_of_attendees'; label='Proposed number of attendees' },
  @{ key='attendee_make_up'; label='Attendee Make Up' },
  @{ key='alcohol'; label='Will alcohol be available?' },
  @{ key='music'; label='Will music be played?' },
  @{ key='hired_equipment_services'; label='Equipment/services being hired' },
  @{ key='disruptive_activities'; label='Games/activities/amusements causing disruption' },
  @{ key='guest_speakers_performers'; label='Guest speakers or performers' },
  @{ key='additional_information'; label='Additional information' },
  @{ key='schedule'; label='Timings/Schedule' },
  @{ key='requirements'; label='Operations Delivery team requirements' }
) | ForEach-Object { [pscustomobject]$_ }
Write-TextFile (Join-Path $ProcessedRoot 'request-event/eis_template.md') ("# EIS Template`n`n" + (($eisFields | ForEach-Object { "## $($_.label)`n`n{{$($_.key)}}`n" }) -join "`n"))
New-DocxTemplate (Join-Path $ProcessedRoot 'templates/eis_template.docx') 'LBS Event Information Sheet Draft' $eisFields
Write-JsonFile (Join-Path $ProcessedRoot 'schemas/eis.schema.json') ([ordered]@{
  '$schema' = 'https://json-schema.org/draft/2020-12/schema'
  title = 'EisDraft'
  type = 'object'
  additionalProperties = $true
})
Write-JsonLines (Join-Path $ProcessedRoot 'request-event/event_terms_chunks.jsonl') (Make-KnowledgeChunks 'LBS Event Terms and Conditions 2024-25.docx' $termsParas 'event-terms')
Write-JsonFile (Join-Path $ProcessedRoot 'request-event/event_terms_rules.json') @(
  [pscustomobject]@{ id='space-first'; rule='Secure correct space before publicising the event.' },
  [pscustomobject]@{ id='short-notice'; rule='Requests less than two weeks in advance may be difficult for service teams.' },
  [pscustomobject]@{ id='catering-30-days'; rule='Catering orders should be placed 30 days before the event and final numbers confirmed 5 days before.' },
  [pscustomobject]@{ id='security-100-plus'; rule='Additional security is required for larger events of 100+; inform security no later than 3 weeks before.' },
  [pscustomobject]@{ id='higher-risk-alcohol'; rule='Higher risk events with 50+ people and alcohol need number-management procedure agreed with Head of Security.' }
)
Write-TextFile (Join-Path $ProcessedRoot 'catering/external_catering_waiver_template.md') ("# External Catering Waiver Template`n`n" + ($waiverParas -join "`n`n"))
Write-JsonFile (Join-Path $ProcessedRoot 'catering/external_catering_rules.json') @(
  [pscustomobject]@{ id='lexington-mandatory'; rule='Lexington Catering is the mandatory catering supplier on LBS premises.' },
  [pscustomobject]@{ id='waiver-14-days'; rule='External/self-catering waiver must be completed, authorised, and returned 14 days prior to the event.' },
  [pscustomobject]@{ id='alcohol-lexington'; rule='All alcoholic beverages must be served by Lexington Catering in accordance with licensing policy.' }
)
Write-JsonFile (Join-Path $ProcessedRoot 'schemas/external_catering_waiver.schema.json') ([ordered]@{
  '$schema'='https://json-schema.org/draft/2020-12/schema'; title='ExternalCateringWaiver'; type='object'; additionalProperties=$true
})
Write-JsonLines (Join-Path $ProcessedRoot 'space/soc_setup_guidance_chunks.jsonl') (Make-KnowledgeChunks 'Sammy Ofer Centre Check List (Section 3) copy - Copy.docx' $socChecklistParas 'soc-setup')
$socChecklistRows = @()
$locationHeaderIndex = [Array]::IndexOf($socChecklistParas, 'Location')
$standardsIndex = -1
for ($i = 0; $i -lt $socChecklistParas.Count; $i++) {
  if ($socChecklistParas[$i] -like 'Standards for Teaching Room and Common Area*') {
    $standardsIndex = $i
    break
  }
}
if ($locationHeaderIndex -ge 0 -and $standardsIndex -gt $locationHeaderIndex) {
  for ($i = $locationHeaderIndex + 4; $i + 3 -lt $standardsIndex; $i += 4) {
    if ([string]::IsNullOrWhiteSpace($socChecklistParas[$i])) { continue }
    $socChecklistRows += [pscustomobject]@{
      location = $socChecklistParas[$i]
      chairs_set_to_default = $socChecklistParas[$i + 1]
      flipcharts_in_place = $socChecklistParas[$i + 2]
      comments = $socChecklistParas[$i + 3]
      source = 'Sammy Ofer Centre Check List (Section 3) copy - Copy.docx'
    }
  }
}
Export-ObjectsCsv (Join-Path $ProcessedRoot 'space/soc_room_checklist.csv') $socChecklistRows
Write-JsonFile (Join-Path $ProcessedRoot 'space/soc_room_checklist.json') $socChecklistRows

# Authoritative parsed Event Toolkit PDF text
$toolkitParsedMdPath = Join-Path $RawRoot 'lbs_event_toolkit_student_clubs_parsed.md'
$parsedToolkitSections = Get-MarkdownSlideSections $toolkitParsedMdPath
Write-JsonLines (Join-Path $ProcessedRoot 'toolkit/toolkit_chunks.jsonl') ($parsedToolkitSections | ForEach-Object {
  [pscustomobject]@{
    id = "event-toolkit-slide-$($_.slide_number)"
    source = 'lbs-files/raw/[SA Copy] LBS Event Toolkit Student Clubs Updated - Copy.pdf'
    parsed_source = 'lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md'
    category = 'event-toolkit'
    slide_number = $_.slide_number
    title = $_.title
    text = $_.text
  }
})
Write-TextFile (Join-Path $ProcessedRoot 'toolkit/toolkit_sections.md') "# Event Toolkit Sections`n`nSource of truth: `lbs-files/raw/[SA Copy] LBS Event Toolkit Student Clubs Updated - Copy.pdf`.`nParsed text source: `lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md`.`n`n$((Get-Content -LiteralPath $toolkitParsedMdPath -Raw))"

# Older PPTX proxy retained only for comparison/historical fallback.
$slides = Get-PptxSlides (Join-Path $RawRoot 'request-event/Student Event Organisers Guide - Copy.pptx')
Write-JsonLines (Join-Path $ProcessedRoot 'toolkit/student_event_organisers_guide_chunks.jsonl') ($slides | ForEach-Object {
  [pscustomobject]@{ id = "student-guide-slide-$($_.slide_number)"; source='Student Event Organisers Guide - Copy.pptx'; category='student-guide-pptx-proxy'; slide_number=$_.slide_number; text=$_.text }
})
Write-TextFile (Join-Path $ProcessedRoot 'toolkit/student_event_organisers_guide_sections.md') (($slides | ForEach-Object { "## Slide $($_.slide_number)`n`n$($_.text)" }) -join "`n`n")
Write-TextFile (Join-Path $ProcessedRoot 'toolkit/toolkit_source_comparison.md') @"
# Toolkit Source Comparison

Authoritative source:

- `lbs-files/raw/[SA Copy] LBS Event Toolkit Student Clubs Updated - Copy.pdf`
- Parsed companion: `lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md`

Previous temporary proxy:

- `lbs-files/raw/request-event/Student Event Organisers Guide - Copy.pptx`

The processed runtime toolkit chunks now come from the parsed PDF markdown, not from the PPTX.

The PPTX proxy is retained in `student_event_organisers_guide_*` files only as comparison/historical fallback context.

The parsed PDF markdown is more comprehensive and includes the strategic event-planning process, decision framework, audience/owner guidance, SMART objectives, costs/returns, planning questions, marketing/communications, speaker considerations, finance/sponsorship, logistics, EIS, and Key Event-related guidance.
"@
Write-JsonFile (Join-Path $ProcessedRoot 'toolkit/toolkit_rules.json') @(
  [pscustomobject]@{ id='shape-purpose'; rule='For vague ideas, ask about strategic alignment and what the club is trying to achieve.' },
  [pscustomobject]@{ id='shape-audience'; rule='Ask who the event is for and what they should get out of it.' },
  [pscustomobject]@{ id='shape-resource-readiness'; rule='Ask about budget, time, team capacity, constraints, and success signal.' },
  [pscustomobject]@{ id='space-first'; rule='Confirm space before advertising, selling tickets, or confirming speakers.' }
)

# Run-of-show templates/examples
$runSheets = Get-XlsxSheets (Join-Path $RawRoot 'space/Run of show template - Copy.xlsx')
foreach ($sheet in $runSheets) {
  $objects = Rows-ToObjects $sheet.rows (Find-HeaderIndex $sheet.rows @('Time')) $sheet.name
  $slug = Sanitize-Key $sheet.name
  if ($sheet.name -like '*template*') {
    Write-TextFile (Join-Path $ProcessedRoot "templates/$slug.md") ("# $($sheet.name)`n`n" + (($objects | ConvertTo-Json -Depth 10)))
  } else {
    Write-JsonFile (Join-Path $ProcessedRoot "examples/$slug.json") $objects
  }
}
if (Test-Path -LiteralPath (Join-Path $ProcessedRoot 'examples/example_run_of_show.json')) {
  Copy-Item -LiteralPath (Join-Path $ProcessedRoot 'examples/example_run_of_show.json') -Destination (Join-Path $ProcessedRoot 'examples/run_of_show_example.json') -Force
}
if (Test-Path -LiteralPath (Join-Path $ProcessedRoot 'examples/example_mic_schedule.json')) {
  Copy-Item -LiteralPath (Join-Path $ProcessedRoot 'examples/example_mic_schedule.json') -Destination (Join-Path $ProcessedRoot 'examples/mic_schedule_example.json') -Force
}

# Key event rules and schema
$keyEventRules = [ordered]@{
  source = 'docs/project-context/key_event_identification_spec.md'
  sole_deterministic_source = $true
  triggers = @(
    [ordered]@{ id='attendance_100_plus'; rule='Confirmed expected attendance is 100+.' },
    [ordered]@{ id='criteria_threshold'; rule='Two or more confirmed non-attendance criteria are present.' }
  )
  non_attendance_criteria = @('high_profile_speaker','complex_logistics','significant_operational_elements','external_audience','external_media_attendance')
  guardrails = @(
    'Missing, vague, or uncollected information must not be counted.',
    'Do not ask additional questions solely for Key Event scoring.',
    'Sensitive/political topic is passive internal signal, not standalone Key Event trigger, but should be surfaced for security/timeline implications.'
  )
}
Write-JsonFile (Join-Path $ProcessedRoot 'key-event/key_event_rules.json') $keyEventRules
Write-JsonFile (Join-Path $ProcessedRoot 'key-event/key_event_test_cases.json') @(
  [pscustomobject]@{ id='attendance-120'; expected_attendance=120; confirmed_criteria=@(); expected_candidate=$true; trigger='attendance_100_plus' },
  [pscustomobject]@{ id='criteria-multiroom-external'; expected_attendance=80; confirmed_criteria=@('complex_logistics','external_audience'); expected_candidate=$true; trigger='criteria_threshold' },
  [pscustomobject]@{ id='below-threshold'; expected_attendance=30; confirmed_criteria=@('external_audience'); expected_candidate=$false; trigger='none' }
)
Write-JsonFile (Join-Path $ProcessedRoot 'schemas/key_event_assessment.schema.json') ([ordered]@{
  '$schema'='https://json-schema.org/draft/2020-12/schema'
  title='KeyEventAssessment'
  type='object'
  required=@('key_event_candidate','trigger_type','confirmed_criteria')
  properties=[ordered]@{
    key_event_candidate=[ordered]@{ type='boolean' }
    trigger_type=[ordered]@{ enum=@('attendance_100_plus','criteria_threshold','none') }
    confirmed_criteria=[ordered]@{ type='array'; items=[ordered]@{ type='string' } }
    non_counted_signals=[ordered]@{ type='array'; items=[ordered]@{ type='string' } }
    rationale_user_facing=[ordered]@{ type='string' }
    rationale_internal=[ordered]@{ type='string' }
    eis_offer_status=[ordered]@{ enum=@('offered','accepted','deferred','info_requested','not_applicable') }
  }
})

# Routing, timeline, Monday, examples, prompts
Write-JsonFile (Join-Path $ProcessedRoot 'routing/stakeholder_routing_rules.json') @(
  [pscustomobject]@{ stakeholder='Space Management'; when='All events'; needs=@('event title','date/time','attendance','space/setup','additional spaces') },
  [pscustomobject]@{ stakeholder='Catering / Lexington'; when='Catering or alcohol involved'; needs=@('numbers','timing','space','dietary/context','alcohol') },
  [pscustomobject]@{ stakeholder='Security'; when='100+ attendance, external audience, high-profile/controversial speaker/topic, children, outside equipment, alcohol risk'; needs=@('attendance','audience','speaker/topic risk','timing','access needs') },
  [pscustomobject]@{ stakeholder='AV / Technology'; when='AV, filming, recording, streaming, microphones, screens'; needs=@('room','schedule','speaker setup','recording/streaming requirements') },
  [pscustomobject]@{ stakeholder='SA Finance / Treasury'; when='Budget involved or finance code missing'; needs=@('club','event name','budget context','finance code status') }
)
Write-TextFile (Join-Path $ProcessedRoot 'routing/stakeholder_email_templates.md') "# Stakeholder Email Draft Templates`n`nTemplates should be generated from EventRequest and routing facts. Do not send automatically."
Write-JsonFile (Join-Path $ProcessedRoot 'schemas/stakeholder_routing.schema.json') ([ordered]@{
  '$schema'='https://json-schema.org/draft/2020-12/schema'; title='StakeholderRouting'; type='object'; additionalProperties=$true
})
Write-JsonFile (Join-Path $ProcessedRoot 'timeline/timeline_rules.json') @(
  [pscustomobject]@{ id='space-before-publicity'; timing='before publicity'; rule='Secure correct space before publicising the event.' },
  [pscustomobject]@{ id='catering-order'; timing='30 days before'; rule='Place catering orders at least 30 days before the event.' },
  [pscustomobject]@{ id='catering-final-numbers'; timing='5 days before'; rule='Confirm final catering numbers 5 days before.' },
  [pscustomobject]@{ id='security-large-events'; timing='3 weeks before'; rule='Inform Security for larger 100+ events no later than 3 weeks before.' },
  [pscustomobject]@{ id='key-events-meeting'; timing='2 weeks before'; rule='Key Events meeting occurs two weeks ahead when applicable.' }
)
Copy-Item -LiteralPath (Join-Path $ProcessedRoot 'timeline/timeline_rules.json') -Destination (Join-Path $ProcessedRoot 'timeline/checklist_rules.json') -Force
Copy-Item -LiteralPath (Join-Path $ProcessedRoot 'timeline/timeline_rules.json') -Destination (Join-Path $ProcessedRoot 'timeline/timeline_rules_from_terms.json') -Force
Write-JsonFile (Join-Path $ProcessedRoot 'monday/monday_payload_schema.json') ([ordered]@{
  '$schema'='https://json-schema.org/draft/2020-12/schema'
  title='MondayMockPayload'
  type='object'
  required=@('board_hint','item_name','columns')
  properties=[ordered]@{
    board_hint=[ordered]@{ type='string' }
    item_name=[ordered]@{ type='string' }
    columns=[ordered]@{ type='object'; additionalProperties=$true }
    subitems=[ordered]@{ type='array'; items=[ordered]@{ type='object' } }
  }
})
Write-JsonFile (Join-Path $ProcessedRoot 'monday/monday_payload_examples.json') @(
  [pscustomobject]@{ board_hint='Events and Key Dates 25/26'; item_name='Example Student Event'; columns=[ordered]@{ status='intake_complete'; attendance='needs_confirmation'; space='needs_confirmation' }; subitems=@() }
)
Write-JsonFile (Join-Path $ProcessedRoot 'schemas/monday_payload.schema.json') (Get-Content -LiteralPath (Join-Path $ProcessedRoot 'monday/monday_payload_schema.json') -Raw | ConvertFrom-Json)

$exampleEvents = @(
  [pscustomobject]@{ id='prepared-alumni-panel'; type='prepared_event'; prompt='I want to host an alumni panel next month for about 80 people with a guest speaker in a lecture theatre.' },
  [pscustomobject]@{ id='budget-only'; type='budget_only'; prompt='My club has a budget but no idea what event to run.' },
  [pscustomobject]@{ id='key-event-attendance'; type='key_event_candidate'; expected_attendance=120; prompt='A careers panel for 120 people with ordinary-profile company speakers.' },
  [pscustomobject]@{ id='key-event-criteria'; type='key_event_candidate'; expected_attendance=80; prompt='An 80-person multi-room workshop with external attendees.' },
  [pscustomobject]@{ id='below-threshold'; type='routine'; expected_attendance=30; prompt='A 30-person lunch with an external guest speaker and catering.' }
)
Write-JsonFile (Join-Path $ProcessedRoot 'examples/event_examples.json') $exampleEvents
Write-JsonFile (Join-Path $ProcessedRoot 'examples/pasted_draft_examples.json') @(
  [pscustomobject]@{ id='partial-draft'; text='Event title: Alumni Panel. Date: next month. Attendees: 80. Space: lecture theatre. Catering: not sure yet.' }
)
Write-TextFile (Join-Path $ProcessedRoot 'prompts/phase1_conversation_rules.md') (Get-Content -LiteralPath (Join-Path $RepoRoot 'docs/project-context/event_readiness_assistant_phase_1_conversation_rules_spec.md') -Raw)
Write-TextFile (Join-Path $ProcessedRoot 'prompts/phase1_toolkit_shaping.md') "# Toolkit Shaping Prompt Notes`n`nUse strategic alignment, unique value, audience clarity, resource readiness, and success signal to help vague or budget-only users create form-ready event concepts."
Write-TextFile (Join-Path $ProcessedRoot 'prompts/complexity_risk_prompt.md') "# Complexity/Risk Prompt Notes`n`nUse OpenAI for preliminary complexity/risk flags for LBS staff. Do not override deterministic Key Event categorisation."
Write-TextFile (Join-Path $ProcessedRoot 'prompts/stakeholder_email_prompt.md') "# Stakeholder Email Prompt Notes`n`nDraft editable stakeholder emails from EventRequest facts and routing reasons. Do not send emails automatically."

# PDF placeholders
Write-JsonLines (Join-Path $ProcessedRoot 'catering/hospitality_brochure_chunks.jsonl') @(
  [pscustomobject]@{ id='hospitality-brochure-pdf-pending'; source='Hospitality Brochure Autumn Winter 2025.pdf'; category='catering-brochure'; text='PDF text extraction pending. Do not use for deterministic menu logic until extracted.' }
)

Write-Host "Processed LBS files generated at $ProcessedRoot"
