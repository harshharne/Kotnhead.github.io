/* =====================================================================
   SITE CONTENT — this is the only file you need to edit to add work.
   ---------------------------------------------------------------------
   PROJECTS
   - Order here = order on the Work page.
   - tags: a few short labels, e.g. ["Staging", "Voice Interfaces"]. Keep it to 2-4.
   - year: e.g. "2026". Shown next to the title.
   - cover: path to an image, e.g. "assets/projects/hark/cover.jpg".
            Leave "" and the project name is drawn in dot-matrix instead.
   - meta: any label/value pairs shown in the left column of the page.
   - body: the write-up, built from blocks (copy the examples):
       { type: "text",    heading: "Context", text: "Paragraph one.\n\nParagraph two." }
       { type: "image",   src: "assets/projects/hark/01.jpg", caption: "Optional caption" }
       { type: "gallery", items: [ { src: "...", caption: "" }, { src: "...", caption: "" } ] }
       { type: "video",   src: "https://www.youtube.com/watch?v=..." }   (YouTube, Vimeo or .mp4)
       { type: "quote",   text: "A line worth pulling out.", by: "Optional source" }
   - featured: true puts it in "Selected work" on the landing page (pairs
     read best, so 4 or 6). Placeholder picks for now; we curate in Phase B.
   - hidden: true keeps a project off the site without deleting it.
   ===================================================================== */

window.SITE = {
  projects: [
    {
      slug: "playing-against-chance",
      title: "Playing Against Chance",
      featured: true,
      tags: ["Prediction Machines", "Staging", "Experience Design", "Immersive Tech"],
      year: "",
      summary: "",
      cover: "",
      meta: { Role: "", Team: "", Tools: "", Duration: "" },
      body: [],
    },
    {
      slug: "soma-tiles",
      title: "Soma Tiles",
      featured: true,
      tags: ["Problem Solving", "Ambient Computing", "Interactive Hardware"],
      year: "",
      summary: "",
      cover: "",
      meta: { Role: "", Team: "", Tools: "", Duration: "" },
      body: [],
    },
    {
      slug: "modern-myth",
      title: "Modern Myth",
      featured: true,
      tags: ["Kinetic Narratives", "Prototyping", "Innovative Storytelling"],
      year: "",
      summary: "",
      cover: "",
      meta: { Role: "", Team: "", Tools: "", Duration: "" },
      body: [],
    },
    {
      slug: "binni",
      title: "Binni",
      featured: true,
      tags: ["Human–AI Relationship", "Voice Interfaces"],
      year: "",
      summary: "",
      cover: "",
      meta: { Role: "", Team: "", Tools: "", Duration: "" },
      body: [],
    },
    {
      slug: "neev",
      title: "Neev",
      featured: true,
      tags: ["Game Design", "User Experience"],
      year: "",
      summary: "",
      cover: "",
      meta: { Role: "", Team: "", Tools: "", Duration: "" },
      body: [],
    },
  ],

  /* ===================================================================
     NOTES
     - date: "2026-11-05"
     - tags: short words, e.g. ["AI", "writing"]. They become the filters on the Notes page.
     - url: add one to make it a "Links" note (a link worth sharing)
     - related: the slug of a project above, e.g. "hark"
     - body: same as project text — blank lines start new paragraphs

     Example (copy it inside the [ ] below and remove the // ):
     // { title: "Why stillness needs a reward", date: "2026-11-05", tags: ["writing"],
     //   related: "hark", url: "", body: "First paragraph.\n\nSecond paragraph." },
     =================================================================== */
  notes: [
    { title: "Mind–Body Disconnect", date: "", tags: [], related: "", url: "", body: "" },
  ],
};
