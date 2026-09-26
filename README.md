# Cameron's Personal Portfolio
Link: https://cameronjiang.dev

## Editing the resume

The `/resume` page embeds `public/Resume.pdf` within the site UI. Replace that PDF to update both the preview and download. Edit the wrapper in `src/app/resume/page.js` and its styles in `src/app/resume/resume.module.css`.

The previous editable HTML resume is preserved at `/resume/legacy`. Its content is in `src/data/resume.js`, with layout and styles in `src/app/resume/legacy/`. Editing the legacy page does not regenerate the PDF.
