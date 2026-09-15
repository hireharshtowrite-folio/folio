# Typewriter Portfolio

A static, GitHub Pages-ready portfolio with a scroll-driven typewriter concept and a browser-based editor.

## Run locally
Open `index.html` directly, or serve the folder with any static server.

## Edit projects
Open `admin.html`.

You can:
- add/reorder/delete projects
- edit title, description, metadata and film links
- upload multiple creative images per project
- export/import portfolio JSON

Uploads are stored in browser localStorage as data URLs for preview. GitHub Pages is static, so browser uploads cannot write themselves back to the repository. For permanent publishing, commit optimized images and the exported data or connect the site later to a CMS/storage service.

## Deploy to GitHub Pages
1. Create a GitHub repository.
2. Upload these files to the repository root.
3. In **Settings → Pages**, deploy from the main branch/root.
4. GitHub will provide the public URL.

## Recommended production upgrade
For true "upload image and publish live" editing, connect the editor to a small backend such as Cloudinary/Supabase plus GitHub Actions, or use a Git-based CMS.
