/* =====================================================================
   EDITOR BLOCKS. For every block type the site can draw (project.js):
     name     what the editor calls it
     fields   the settings panel, in order
     inline   text you can type straight onto the canvas: [selector, path]
              ("*" in a path = which match it is, e.g. items.*.title)
     make     a starting block, used by "Add a block"
   Field kinds: text, area, select, check, number, image, lines (one per
   line → list), numbers ("2, 3, 6" → [2, 3, 6]), tags ("a, b" → list),
   items (a repeatable group), json (the raw data, for complex diagrams).
   A type with no entry here can still be moved, copied and edited as data.
   ===================================================================== */
window.EdBlocks = (() => {
  const SIZE = { key: "size", kind: "select", label: "Width", options: [["full", "Full width"], ["wide", "Wide (8 of 12 columns, from the text line)"], ["half", "Half"]] };
  const STYLE = { key: "style", kind: "select", label: "Fit", options: [["photo", "Photo: fills the frame"], ["diagram", "Drawing: whole, on a panel"], ["dark", "On black"]] };
  const FIG = [
    { key: "src", kind: "image", label: "Image" },
    { key: "alt", kind: "text", label: "Alt text", help: "Describe the image for people who can’t see it." },
    { key: "caption", kind: "text", label: "Caption" },
    STYLE,
  ];

  const T = {
    section: {
      name: "Section", hint: "A numbered start: label, title, subtitle",
      fields: [
        { key: "label", kind: "text", label: "Label", help: "e.g. 03  Ideation (two spaces after the number)" },
        { key: "title", kind: "text", label: "Title" },
        { key: "sub", kind: "area", label: "Subtitle" },
      ],
      inline: [[".cs-label", "label"], [".cs-title", "title"], [".cs-sub", "sub"]],
      make: () => ({ type: "section", label: "00  Label", title: "Section title" }),
    },
    text: {
      name: "Text", hint: "Paragraphs on the text line",
      fields: [{ key: "text", kind: "area", tall: true, label: "Text", help: "A blank line starts a new paragraph." }],
      inline: [[".cs-text", "text", "paras"]],
      make: () => ({ type: "text", text: "Write here." }),
    },
    statement: {
      name: "Statement", hint: "One large line",
      fields: [{ key: "text", kind: "area", label: "Line" }],
      inline: [[".cs-statement", "text"]],
      make: () => ({ type: "statement", text: "One line worth saying large." }),
    },
    quote: {
      name: "Quote", hint: "A pull quote with its source",
      fields: [{ key: "text", kind: "area", label: "Quote", help: "Without quotation marks; the site adds them." }, { key: "by", kind: "text", label: "By" }],
      inline: [[".cs-quote > p", "text", "quote"], [".cs-quote footer", "by"]],
      make: () => ({ type: "quote", text: "A line worth pulling out.", by: "Who said it" }),
    },
    question: {
      name: "Question", hint: "The question the work answers",
      fields: [{ key: "text", kind: "area", label: "Question" }],
      inline: [[".cs-question", "text"]],
      make: () => ({ type: "question", text: "How might we …?" }),
    },
    figure: {
      name: "Image", hint: "One image, with caption",
      fields: [...FIG, SIZE],
      inline: [["figcaption", "caption"]],
      make: () => ({ type: "figure", src: "", alt: "", caption: "", style: "photo", size: "wide" }),
    },
    pair: {
      name: "Image pair", hint: "Two images side by side, equal height",
      fields: [{ key: "items", kind: "items", label: "Images", one: "Image", min: 2, max: 3, fields: FIG, make: () => ({ src: "", alt: "", caption: "", style: "photo" }) }],
      inline: [["figcaption", "items.*.caption"]],
      make: () => ({ type: "pair", items: [{ src: "", alt: "", caption: "", style: "photo" }, { src: "", alt: "", caption: "", style: "photo" }] }),
    },
    photos: {
      name: "Photo row", hint: "Photos side by side at their own shapes",
      fields: [{ key: "items", kind: "items", label: "Photos", one: "Photo", fields: [
        { key: "src", kind: "image", label: "Photo" },
        { key: "alt", kind: "text", label: "Alt text", help: "Describe the photo for people who can’t see it." },
        { key: "caption", kind: "text", label: "Caption" },
        { key: "date", kind: "text", label: "Date", help: "e.g. Sept 2024" },
      ], make: () => ({ src: "", alt: "", caption: "", date: "" }) }],
      make: () => ({ type: "photos", items: [{ src: "", alt: "", caption: "", date: "" }, { src: "", alt: "", caption: "", date: "" }] }),
    },
    video: {
      name: "Video", hint: "YouTube, Vimeo or an .mp4",
      fields: [
        { key: "src", kind: "video", label: "Video", help: "Paste a YouTube or Vimeo link, or upload a short .mp4 (under 20 MB)." },
        { key: "caption", kind: "text", label: "Caption" },
        { key: "loop", kind: "check", label: "Play silently on a loop (.mp4 only)" },
        SIZE,
      ],
      inline: [["figcaption", "caption"]],
      make: () => ({ type: "video", src: "", caption: "", size: "wide" }),
    },
    cards: {
      name: "Cards", hint: "Short labelled statements in 2–4 columns",
      fields: [
        { key: "cols", kind: "select", label: "Columns", options: [[2, "2"], [3, "3"], [4, "4"]], number: true },
        { key: "items", kind: "items", label: "Cards", one: "Card", fields: [
          { key: "kicker", kind: "text", label: "Small label" },
          { key: "title", kind: "text", label: "Title" },
          { key: "text", kind: "area", label: "Text" },
          { key: "list", kind: "lines", label: "List", help: "One point per line." },
        ], make: () => ({ title: "Title", text: "" }) },
      ],
      inline: [[".cs-card h3", "items.*.title"], [".cs-card .cs-kicker", "items.*.kicker"]],
      make: () => ({ type: "cards", cols: 3, items: [{ title: "One", text: "" }, { title: "Two", text: "" }, { title: "Three", text: "" }] }),
    },
    list: {
      name: "List", hint: "A titled list of points",
      fields: [{ key: "title", kind: "text", label: "Title" }, { key: "items", kind: "lines", label: "Points", help: "One per line." }],
      inline: [[".cs-list h3", "title"]],
      make: () => ({ type: "list", title: "Title", items: ["First point", "Second point"] }),
    },
    stats: {
      name: "Numbers", hint: "Big numbers with their source",
      fields: [{ key: "items", kind: "items", label: "Numbers", one: "Number", fields: [
        { key: "value", kind: "text", label: "Number" }, { key: "label", kind: "text", label: "What it counts" }, { key: "source", kind: "text", label: "Source" },
      ], make: () => ({ value: "0", label: "", source: "" }) }],
      inline: [[".cs-stat-value", "items.*.value"], [".cs-stat-label", "items.*.label"]],
      make: () => ({ type: "stats", items: [{ value: "1 in 4", label: "What it counts", source: "Source, year" }] }),
    },
    compare: {
      name: "Compare", hint: "Two sides of an argument",
      fields: [{ key: "items", kind: "items", label: "Sides", one: "Side", min: 2, max: 2, fields: [
        { key: "title", kind: "text", label: "Title" }, { key: "text", kind: "area", label: "Text" }, { key: "source", kind: "text", label: "Source" },
      ], make: () => ({ title: "", text: "", source: "" }) }],
      inline: [[".cs-side h3", "items.*.title"]],
      make: () => ({ type: "compare", items: [{ title: "One side", text: "", source: "" }, { title: "The other", text: "", source: "" }] }),
    },
    sources: {
      name: "Sources", hint: "Numbered references with links",
      fields: [{ key: "items", kind: "items", label: "Sources", one: "Source", fields: [{ key: "label", kind: "text", label: "Title" }, { key: "url", kind: "text", label: "Link" }], make: () => ({ label: "", url: "" }) }],
      make: () => ({ type: "sources", items: [{ label: "Author, Title, Year", url: "" }] }),
    },
    bubbles: {
      name: "Bubbles", hint: "A cluster of issues around a centre",
      fields: [
        { key: "center", kind: "text", label: "Centre" },
        { key: "centerAt", kind: "number", label: "Centre position", help: "How many bubbles come before the centre one." },
        { key: "items", kind: "items", label: "Bubbles", one: "Bubble", fields: [{ key: "label", kind: "text", label: "Text" }, { key: "size", kind: "select", label: "Size", options: [["s", "Small"], ["m", "Medium"], ["l", "Large"]] }], make: () => ({ label: "", size: "m" }) },
      ],
      make: () => ({ type: "bubbles", center: "Centre", centerAt: 2, items: [{ label: "One", size: "m" }, { label: "Two", size: "l" }, { label: "Three", size: "s" }, { label: "Four", size: "m" }] }),
    },
    stairs: {
      name: "Steps", hint: "Questions rising into answers",
      fields: [{ key: "steps", kind: "items", label: "Steps", one: "Step", fields: [
        { key: "kicker", kind: "text", label: "Small label" }, { key: "title", kind: "text", label: "Title" },
        { key: "questions", kind: "lines", label: "Questions (above the line)" }, { key: "answers", kind: "lines", label: "Answers (below the line)" },
      ], make: () => ({ title: "Step", questions: [], answers: [] }) }],
      make: () => ({ type: "stairs", steps: [{ title: "First", questions: ["A question?"], answers: ["An answer"] }, { title: "Second", questions: ["A question?"], answers: ["An answer"] }] }),
    },
    evolution: {
      name: "Versions", hint: "Versions in a row, the last one current",
      fields: [{ key: "items", kind: "items", label: "Versions", one: "Version", fields: [
        { key: "title", kind: "text", label: "Title" }, { key: "text", kind: "area", label: "Text" }, { key: "gave", kind: "text", label: "Gave it …", help: "Optional: what this version added." },
      ], make: () => ({ title: "", text: "" }) }],
      inline: [[".cs-evo h3", "items.*.title"], [".cs-evo li > p", "items.*.text"]],
      make: () => ({ type: "evolution", items: [{ title: "First try", text: "" }, { title: "Second try", text: "" }, { title: "Now", text: "" }] }),
    },
    plaques: {
      name: "Plaque cards", hint: "Cards that reveal a line on hover",
      fields: [{ key: "items", kind: "items", label: "Cards", one: "Card", fields: [
        { key: "event", kind: "text", label: "Small label" }, { key: "name", kind: "text", label: "Name" }, { key: "line", kind: "text", label: "Revealed line" }, { key: "target", kind: "text", label: "Throw …" },
      ], make: () => ({ event: "", name: "", line: "", target: "" }) }],
      inline: [[".cs-plaque h3", "items.*.name"], [".cs-plaque p", "items.*.line"]],
      make: () => ({ type: "plaques", items: [{ event: "Event", name: "Name", line: "The line it reveals.", target: "a 6" }] }),
    },
    targets: {
      name: "Die targets", hint: "Which faces count for each target",
      fields: [{ key: "rows", kind: "items", label: "Rows", one: "Row", fields: [
        { key: "label", kind: "text", label: "Label" }, { key: "target", kind: "text", label: "Target" }, { key: "hits", kind: "numbers", label: "Faces that hit", help: "e.g. 4, 5, 6" },
      ], make: () => ({ label: "", target: "", hits: [6] }) }],
    },
    identity: {
      name: "Identity", hint: "App icon, typeface and colours",
      fields: [
        { key: "icon.src", kind: "image", label: "Icon" }, { key: "icon.alt", kind: "text", label: "Icon alt text" },
        { key: "typeface", kind: "text", label: "Typeface" }, { key: "colours", kind: "tags", label: "Colours", help: "Hex codes without #, separated by commas." },
      ],
    },
    fluke: {
      name: "Fluke", hint: "A small event and what it becomes",
      fields: [
        { key: "at", kind: "number", label: "Age it happens" }, { key: "event", kind: "area", label: "Event" }, { key: "quiet", kind: "text", label: "At the time" },
        { key: "back", kind: "number", label: "Age it comes back" }, { key: "outcomes", kind: "lines", label: "What it can become", help: "One per line." },
      ],
    },
    side: { name: "Image beside text" },
    lotus: { name: "Lotus diagram" },
    system: { name: "System map" },
    track: { name: "Journey track" },
    scenario: { name: "Scenario cards" },
    venn: { name: "Venn" },
    chosen: { name: "Chosen flow" },
    pipeline: { name: "Build pipeline" },
    bars: { name: "Bar chart" },
    split: { name: "Split bar" },
    neevplay: { name: "Neev phone (playable)" },
    table: { name: "Table" },
    annotated: { name: "Annotated image" },
    score: { name: "Score chart" },
  };
  T.image = { ...T.figure, name: "Image" };

  const PALETTE = [
    ["Writing", ["section", "text", "statement", "quote", "question", "list"]],
    ["Media", ["figure", "pair", "photos", "video"]],
    ["Structure", ["cards", "stats", "compare", "sources"]],
    ["Diagrams", ["bubbles", "stairs", "evolution", "plaques"]],
  ];

  return { T, PALETTE, name: t => (T[t] && T[t].name) || t };
})();
