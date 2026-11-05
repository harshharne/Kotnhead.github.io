# harshwardhanharne — portfolio

Plain HTML, CSS and JavaScript. No build step: edit a file, commit, and GitHub Pages updates within a minute.

## Pages

| File | Page |
|---|---|
| `index.html` | Landing: the dot-matrix name, plus one of four games picked at random on each reload |
| `work.html` | One list of all projects, each with a few tags |
| `project.html?p=slug` | One project (a single template fills in every project) |
| `notes.html` | Notes and links |
| `about.html` | Short bio |
| `playground.html` | The four games, each playable on its own, with your best scores |
| `resume.html` | Education, experience, skills, tools, and a PDF download |
| `404.html` | Page not found |

Your email, LinkedIn, Instagram and GitHub sit at the bottom of every page.
The bulb button (top right) switches between night and day mode.

## The landing games

All four live in `assets/js/hero.js`:

- **Stay still**: moving breaks the name apart, and stillness rebuilds it.
- **Chain reaction**: one click, and flying dots set off the other letters. Change `tune` to make chains longer or shorter.
- **Against the odds**: each letter spins like a slot reel, and you tap to stop it.
- **Rebuild me**: the name starts in pieces, and you sweep the dots home.

Open a specific game with `index.html?game=still`, `chain`, `odds` or `rebuild`.

## Adding or editing a project

Everything lives in **`assets/js/content.js`**.

1. Make a folder for the images: `assets/projects/<slug>/` (for example `assets/projects/hark/`).
2. Upload the images there. Use JPG or WebP, around 2000px wide and under 500 KB each.
3. In `content.js`, find the project and fill in:
   - `year`, e.g. `"2026"`
   - `tags`, e.g. `["wearable", "AI"]`
   - `cover`, e.g. `"assets/projects/hark/cover.jpg"`
   - `meta` (Role, Team, Tools, Duration). Add or remove labels freely.
   - `body`: the write-up, made of text, image, gallery, video and quote blocks. The examples are at the top of the file.
4. To add a new project, copy an existing `{ ... },` block and give it a new `slug` (lowercase, hyphens, no spaces).
5. The order in the file is the order on the Work page.

## Adding a note

Add an entry to `notes: [ ... ]` at the bottom of `content.js`. There's a commented example right above it.

## Things to fill in

- **LinkedIn / Instagram:** replace `YOUR-HANDLE` in the footer of every page (search all files for `YOUR-`).
  Links still containing `YOUR-` are hidden automatically, so nothing broken shows meanwhile.
- **CV:** upload it as `assets/cv/Harshwardhan-Harne-CV.pdf`. The download button on the Resume page appears once the file exists.
- **Portrait:** upload `assets/about/portrait.jpg`, then follow the comment in `about.html`.
- **Landing taglines:** edit `TAGLINES` at the top of `assets/js/hero.js`.

## Colours and type

Both live at the top of `assets/css/site.css`: night mode in `:root`, day mode in `:root[data-theme="light"]`.
