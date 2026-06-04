# Space Request Generation Output

Use this message pattern after the assistant generates the Space Request DOCX.

```md
[Download Space Request Form here]

By sending this form to space@london.edu, you are agreeing/declaring the following:

- I understand that space is not confirmed until I receive written confirmation from Space Management.
- I will attend the Key Events Meeting if my event is designated a Key Event.
- If catering is required, I commit to providing final guest numbers to catering at least 5 working days before the event.
- I will submit a provisional guest list to Security at least 5 working days before the event, and the final list no more than 2 days before the event.
- My line manager or Student Club President has approved this event request.
```

Business rule:

- DOCX generation is allowed even when declaration fields are still `needs_confirmation`.
- The generated output must display the declarations below the download link so the organiser understands that sending the form to Space Management is the point at which they agree to those declarations.
- The Space Request should not be described as ready to submit unless the organiser understands these declarations.
