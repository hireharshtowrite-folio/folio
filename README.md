# The Story Machine — GitHub Pages Portfolio

A scroll-driven 3D portfolio built with Three.js. No build step is required.

## Deploy to GitHub Pages

1. Create a new **public** GitHub repository (for example `portfolio`).
2. Upload every file/folder from this package into the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose **main** and **/(root)**, then Save.
6. GitHub will publish the site at `https://YOUR-USERNAME.github.io/portfolio/`.

## Add or update your work

1. Open `https://YOUR-USERNAME.github.io/portfolio/admin.html`.
2. Add projects and upload a creative image for each project.
3. Add the Google Drive / YouTube / Vimeo URL in the film field.
4. Click **Export portfolio-data.js**.
5. In your GitHub repository, replace the existing `portfolio-data.js` with the exported file and commit.
6. GitHub Pages will republish automatically.

The editor resizes uploaded images before embedding them in the data file. This is intentionally simple for a GitHub-only workflow.

## Files

- `index.html` — public portfolio
- `app.js` — real-time Three.js scene, animation and interaction
- `styles.css` — UI styles
- `portfolio-data.js` — all portfolio content
- `admin.html` — no-code editor/exporter
- `assets/concept-reference.png` — optional social preview/fallback image

## Important

The live 3D typewriter is generated procedurally in Three.js. It is not a static image pasted into the page. The paper is a subdivided 3D mesh and is curved/deformed in real time as the user scrolls.
