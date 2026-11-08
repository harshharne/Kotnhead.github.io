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
      year: "2025",
      summary: "A compassionate AI companion",
      cover: "assets/projects/binni/doll.png",
      coverStyle: "diagram",
      coverAlt: "Line drawing of Binni: a Russian doll with a calm face and a woven lower body",
      meta: {
        Year: "2025",
        Focus: "Loneliness and everyday emotional distress",
        Stage: "Concept · Stage 1 prototype",
        "Built with": "Raspberry Pi Zero 2W · Google Speech-to-Text · Text-to-Speech",
      },
      body: [
        { type: "section", label: "01  Context", title: "Loneliness is common, and quiet." },
        { type: "stats", items: [
          { value: "1 in 6", label: "people worldwide are affected by loneliness", source: "WHO Commission on Social Connection, 2025" },
          { value: "17–21%", label: "of people aged 13–29 report feeling lonely", source: "WHO Commission on Social Connection, 2025" },
          { value: "~1 in 2", label: "18–24 year olds felt lonely, across eight countries including India", source: "Abdalla et al., 2026" },
        ] },
        { type: "text", text: "People facing emotional distress often struggle to express their feelings or access support." },

        { type: "section", label: "02  Gap", title: "Being heard helps. Leaning on it can hurt." },
        { type: "compare", items: [
          { title: "Feeling heard", text: "A short conversation with an empathetic AI companion reduced loneliness about as much as talking to a person. Feeling heard made the difference.", source: "De Freitas et al., Journal of Consumer Research" },
          { title: "Feeling dependent", text: "The relief did not build up over days. Heavier, more personal use was linked to more loneliness and emotional dependence.", source: "De Freitas et al.; MIT Media Lab × OpenAI, 2025" },
        ] },
        { type: "question", text: "Can AI be utilised to offer that feeling of being heard, without replacing the people in our lives?" },

        { type: "section", label: "03  Primary research", title: "Primary Research", sub: "Conducted a quick survey with people who have used mental health apps or talk to AI assistants (survey size: 11)." },
        { type: "bars", question: "What would make you more likely to trust and use an AI emotional support companion?", total: 11, rows: [
          ["Clear privacy and data protection policies", 10],
          ["Highly human-like voice and conversation", 8],
          ["Proven effectiveness in mental health support", 7],
          ["Customisation options (tone, personality, responses)", 5],
          ["I wouldn’t trust an AI for emotional support", 1],
        ] },
        { type: "split", question: "If the above aspects suit you, how comfortable are you with talking to an AI companion about your emotions?", total: 11, rows: [["Comfortable", 6], ["Neutral", 4], ["Uncomfortable", 1]] },

        { type: "section", label: "04  Ideation", title: "Ideation Focus" },
        { type: "side", figure: { src: "assets/projects/binni/ideation.jpg", alt: "Whiteboard sketches: three stage interaction (playful, comfortable, thoughtful) and notes on magnetic connectors", style: "photo", caption: "Ideation board" }, blocks: [
          { type: "cards", items: [
            { title: "Emotional core and the spirit of AI" },
            { title: "Physical interactivity" },
          ] },
        ] },

        { type: "section", label: "05  Binni", title: "What if the AI companion could mirror the way we confide in different friends for different aspects of life?" },
        { type: "cards", cols: 3, items: [
          { kicker: "Problem statement", title: "A safe, empathetic space", text: "People facing emotional distress often struggle to express their feelings or access support. How might we create an AI companion that offers a safe, empathetic space to help them reflect, connect, and seek help when needed?" },
          { kicker: "Insight", title: "A Trusted Friend", text: "When people face emotional distress, they often seek comfort in conversations that feel personal, non-judgemental and understanding, just like talking to a trusted friend." },
          { kicker: "Idea", title: "A Russian Doll", text: "So, a three stage interaction model with different emotional cores and persona in form of a Russian Doll!" },
        ] },

        { type: "section", label: "06  Cultivating compassion", title: "Human Centred UX Thinking" },
        { type: "lotus", center: "User", petals: [
          { label: "3 Stage\nInteraction Model" },
          { label: "Minimal\nCognitive Load", note: "Focus on clarity\nand simplicity" },
          { label: "Pain Points", note: "Fear of judgement\nand loneliness" },
          { label: "Feedback for\nImprovement", note: "Data driven improvements\nand reflection on\npositive progress" },
          { label: "Safety &\nBoundaries", note: "Clear limits, and a path to human support\nwhen distress goes beyond everyday loneliness" },
          { label: "Voice Interface\nDesign", note: "Ensuring natural, human like\nconversation flow" },
          { label: "Needs", note: "Comfort, trust\nand safe space" },
          { label: "Empathy\nDriven Design", note: "Focus on the user’s emotions\nand mental state" },
        ] },

        { type: "section", label: "07  Interaction", title: "3 Stage Interaction Model", sub: "Emotional core and personas" },
        { type: "side", figure: { src: "assets/projects/binni/nested.png", alt: "Three nested dolls opening out, each with its own face", style: "diagram" }, blocks: [
          { type: "cards", items: [
            { title: "Playful", text: "Light-hearted, engaging tone for daily activities" },
            { title: "Comforting", text: "Soft and reassuring responses for a feeling of safe space" },
            { title: "Thoughtful", text: "Deep and reflective conversations for a non-judgemental space" },
          ] },
        ] },
        { type: "list", items: [
          "This design offers a tangible interaction as the AI mode changes.",
          "AI adjusts the tone and speech delivery based on the interaction mode.",
          "Pure conversational user experience: no buttons, no app integrations, only fluid, natural dialogue.",
        ] },

        { type: "section", label: "08  Technology & development", title: "Prototyping Phase 1: Stage 1" },
        { type: "cards", cols: 2, items: [
          { title: "Hardware", list: ["Raspberry Pi Zero 2W", "Microphone", "Speaker", "Power supply", "Wi-Fi connection"] },
          { title: "Software", list: ["Google Text-to-Speech", "Google Speech-to-Text"] },
        ] },
        { type: "pair", items: [
          { src: "assets/projects/binni/prototype.jpg", alt: "Raspberry Pi Zero 2W with a lapel microphone on a cutting mat", style: "photo", caption: "Stage 1 hardware" },
          { src: "assets/projects/binni/connector.png", alt: "Two nesting cylinders joined by magnetic connectors", style: "diagram", caption: "Interaction transfer: magnetic connectors" },
        ] },

        { type: "section", label: "09  Future roadmap", title: "Evolution Path" },
        { type: "side", figure: { src: "assets/projects/binni/roadmap.png", alt: "Two dolls connected by a cord", style: "diagram" }, blocks: [
          { type: "cards", items: [
            { kicker: "Phase 1 · Stage 2", title: "AI-powered emotional response engine", text: "Manual emotional modes, soothing activities, and music therapy." },
            { kicker: "Phase 2 · Stage 1", title: "Speech analysis", text: "Speech analysis using Librosa, OpenSmile and sentiment models. Personalised memory, adaptive AI personality, and a user-specific small language model that is localised." },
          ] },
        ] },

        { type: "section", label: "10  What matters?", title: "New Media Design Impact" },
        { type: "cards", cols: 3, items: [
          { title: "Ethical & Responsible Design", text: "Ensuring privacy, empathy, and user control" },
          { title: "Minimal & Effortless Design", text: "AI fits into life without adding complexity" },
          { title: "Human + AI", text: "Not just assistance, AI as a friend" },
        ] },

        { type: "section", label: "11  Revisited, 2026", title: "A friend that sends you back to your friends." },
        { type: "cards", cols: 3, items: [
          { title: "Short visits", text: "Voice helped in brief sessions and hurt with long daily use. Binni winds conversations down instead of stretching them out." },
          { title: "A bridge, not a destination", text: "Feeling heard is the start. Binni nudges you back towards the people in your life." },
          { title: "Knowing its limits", text: "When distress goes beyond everyday loneliness, Binni says so plainly and points to human support." },
        ] },

        { type: "sources", items: [
          { label: "WHO: Social connection linked to improved health and reduced risk of early death (2025)", url: "https://www.who.int/news/item/30-06-2025-social-connection-linked-to-improved-heath-and-reduced-risk-of-early-death" },
          { label: "Abdalla et al., loneliness among young adults in eight countries, Social Psychiatry and Psychiatric Epidemiology (2026)", url: "https://source.washu.edu/2026/03/nearly-half-of-young-adults-report-loneliness-in-eight-country-study/" },
          { label: "De Freitas et al., AI companions reduce loneliness, Journal of Consumer Research", url: "https://www.library.hbs.edu/working-knowledge/feeling-lonely-an-attentive-listener-is-an-ai-prompt-away" },
          { label: "MIT Media Lab × OpenAI, affective use and emotional well-being (2025)", url: "https://openai.com/index/affective-use-study" },
        ] },
      ],
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
