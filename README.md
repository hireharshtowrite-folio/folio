# Cinematic Typewriter Portfolio

This is a no-build static website designed for GitHub Pages.

## Files
- `index.html` — public cinematic portfolio
- `admin.html` — local portfolio editor
- `portfolio-data.js` — published project data
- `assets/typewriter.png` — the supplied ornate typewriter, cut out for the scene

## Edit your work
1. Open `admin.html` through a local web server or after deploying to GitHub Pages.
2. Add/reorder projects.
3. Upload one or more creative images for each project.
4. Add your Google Drive / YouTube / Vimeo link.
5. Open the live preview.

The editor stores edits in your browser so the preview updates immediately.

## Publish your edits
1. In the editor click **Export portfolio-data.js**.
2. Replace the existing `portfolio-data.js` in your GitHub repository with the downloaded file.
3. Commit the change. GitHub Pages will redeploy automatically.

This export includes the uploaded images as compressed data URLs, so you do not need to manually manage an assets folder for each new creative. For a very large portfolio, moving images to Cloudinary/Supabase later is recommended.

## GitHub Pages
Upload the contents of this folder to the repository root, then:
Settings → Pages → Deploy from branch → `main` → `/ (root)`.

## Local preview
Because the site imports Three.js as an ES module, use a local HTTP server rather than opening `index.html` directly.

Python example:
`python3 -m http.server 8080`

Then open `http://localhost:8080`.
