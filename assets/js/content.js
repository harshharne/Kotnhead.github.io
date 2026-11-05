/* =====================================================================
   SITE CONTENT — this is the only file you need to edit to add work.
   ---------------------------------------------------------------------
   PROJECTS
   - Order here = order on the Work page.
   - tags: a few short lowercase words, e.g. ["wearable", "AI"]. Keep it to 1-3.
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
   - hidden: true keeps a project off the site without deleting it.
   ===================================================================== */

window.SITE = {
  projects: [
    {
      slug: "hark",
      title: "Hark",
      tags: ["haptics", "object", "sound"],
      year: "",
      summary: "A haptic stool that rewards stillness with melody.",
      cover: "",
      meta: { Role: "", Team: "", Tools: "", Duration: "" },
      body: [],
    },
    {
      slug: "plumb",
      title: "Plumb",
      tags: ["biofeedback", "instrument"],
      year: "",
      summary: "A held instrument that reads EDA and HRV to amplify gut judgment.",
      cover: "",
      meta: { Role: "", Team: "", Tools: "", Duration: "" },
      body: [],
    },
    {
      slug: "breathing-patch",
      title: "Breathing Patch",
      tags: ["wearable", "breath"],
      year: "",
      summary: "A sternal wearable for ambient breath tending in knowledge workers.",
      cover: "",
      meta: { Role: "", Team: "", Tools: "", Duration: "" },
      body: [],
    },
    {
      slug: "playing-against-chance",
      title: "Playing Against Chance",
      tags: ["staged experience", "AI voice"],
      year: "",
      summary: "A satirical game of life across life stages, narrated by an AI voice called the Bookkeeper.",
      cover: "",
      meta: { Role: "", Team: "", Tools: "", Duration: "" },
      body: [],
    },
    {
      slug: "bird-periscope",
      title: "Bird Periscope",
      tags: ["AI", "object", "team"],
      year: "",
      summary: "A periscope-like AI object that makes people more curious about birds.",
      cover: "",
      meta: { Role: "", Team: "", Tools: "", Duration: "" },
      body: [],
    },
    {
      slug: "aristotles-radio",
      title: "Aristotle's Radio",
      tags: ["object", "interface"],
      year: "",
      summary: "A radio with three unlabeled dials: ethos, logos, pathos.",
      cover: "",
      meta: { Role: "", Team: "", Tools: "", Duration: "" },
      body: [],
    },
    {
      slug: "binni",
      title: "Binni",
      tags: ["AI", "companion"],
      year: "",
      summary: "A tangible AI companion for people living with loneliness.",
      cover: "",
      meta: { Role: "", Team: "", Tools: "", Duration: "" },
      body: [],
    },
    {
      slug: "seeker",
      title: "Seeker",
      tags: ["AI", "web"],
      year: "",
      summary: "A spatial curiosity engine that pulls from YouTube and the Claude API.",
      cover: "",
      meta: { Role: "", Team: "", Tools: "", Duration: "" },
      body: [],
    },
    {
      slug: "kin",
      title: "Kin",
      tags: ["speculative", "interface"],
      year: "",
      summary: "A speculative operating system organized around states of being, not tasks or files.",
      cover: "",
      meta: { Role: "", Team: "", Tools: "", Duration: "" },
      body: [],
    },
    {
      slug: "cipher",
      title: "Cipher",
      tags: ["care", "tool"],
      year: "",
      summary: "A prescription interpretation tool for caregivers, designed to reduce anxiety.",
      cover: "",
      meta: { Role: "", Team: "", Tools: "", Duration: "" },
      body: [],
    },
    {
      slug: "fleeting-gossips",
      title: "Fleeting Gossips",
      tags: ["installation"],
      year: "",
      summary: "Mannequins that shush and fade out as visitors walk past.",
      cover: "",
      meta: { Role: "", Team: "", Tools: "", Duration: "" },
      body: [],
    },
    {
      slug: "kaleidoscope-weather",
      title: "Kaleidoscope Weather",
      tags: ["staged experience", "biofeedback"],
      year: "",
      summary: "A staged experience driven by live weather data and the viewer's biofeedback.",
      cover: "",
      meta: { Role: "", Team: "", Tools: "", Duration: "" },
      body: [],
    },
    {
      slug: "the-sublime",
      title: "The Sublime",
      tags: ["research", "writing"],
      year: "",
      summary: "Research into the sublime across philosophy, aesthetics and new media.",
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
  notes: [],
};
