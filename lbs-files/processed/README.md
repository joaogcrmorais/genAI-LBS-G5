# Processed LBS Event Data

Generated from lbs-files/raw/ by scripts/convert-lbs-files.ps1.

Raw Office/PDF files remain the source-of-truth backups. Runtime code should use these processed CSV/JSON/Markdown/template files or PostgreSQL tables.

Toolkit source note: [SA Copy] LBS Event Toolkit Student Clubs Updated - Copy.pdf remains the most authoritative toolkit source. This processed tree uses lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md as the authoritative parsed PDF text. The older PPTX-derived proxy is kept only as comparison/historical fallback context.

Known conversion limitation: direct PDF text extraction is not available in this session. The Hospitality Brochure PDF has a placeholder extraction record until a PDF extractor is added.
