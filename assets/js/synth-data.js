/* =====================================================================
   WHAT CHANCE SYNTHESISES. Draft copy, to be rewritten together.

   Each sentence = one of MY lines + one line from the GREATS, joined by
   a FRAME that chance picks. Lines that agree get joins like "if…then"
   or "because"; lines that argue back get "still" or "and yet".
   The greats' words always stay inside quotation marks, unchanged.

   MINE: *a|b|c* is the accent slot: chance picks one of the options,
   and it lands last, in violet. So the violet word is always chance's.
   GREATS: write each line so it works mid-sentence (lower-case start,
   no full stop). Only verified quotes go here.
   RULE: every MINE line must read well with every GREATS line of the
   same theme, in every frame. Test new lines against all of them.
   ===================================================================== */
window.Synth = {
  mine: [
    { theme: "friction",   text: "*friction|resistance|effort* is where thinking starts" },
    { theme: "friction",   text: "a little *friction|resistance|difficulty* is a form of respect" },
    { theme: "friction",   text: "honest *friction|resistance|effort* is how a tool tells the truth" },
    { theme: "tools",      text: "a good tool should sharpen *judgement|attention|curiosity*, not replace it" },
    { theme: "tools",      text: "a tool should return *attention|judgement|time*, not spend it" },
    { theme: "tools",      text: "the best interfaces leave room for *doubt|disagreement|a second thought*" },
    { theme: "argument",   text: "an idea earns its place only after someone *argues with|pushes back on|questions* it" },
    { theme: "argument",   text: "a good question is worth it when it survives an *argument|objection|experiment*" },
    { theme: "argument",   text: "the best systems protect *disagreement|doubt|dissent*" },
    { theme: "making",     text: "I think best with something *half-built|unfinished|rough* in front of me" },
    { theme: "making",     text: "I *sketch|build|argue* until the problem argues back" },
    { theme: "making",     text: "an idea is only real once it’s *prototyped|built|tested*" },
    { theme: "constraint", text: "*restraint|a constraint|a limit* is not a weakness but a point of view" },
    { theme: "constraint", text: "a *limit|constraint|boundary* is where character comes from" },
    { theme: "chance",     text: "*chance|noise|randomness* proposes and a person decides" },
    { theme: "chance",     text: "noise only matters once someone *chooses|decides|cares*" },
    { theme: "intelligence", text: "designing for intelligence means designing for *attention|judgement|curiosity*" },
    { theme: "intelligence", text: "the smartest system is the one that leaves people *sharper|curious|thinking*" },
    { theme: "intelligence", text: "intelligence is something you *practise|exercise|grow*, not something you outsource" },
    { theme: "augmentation", text: "an AI should *extend|sharpen|widen* a mind, not stand in for it" },
    { theme: "augmentation", text: "a good partner makes you *braver|sharper|more curious*, not smaller" },
    { theme: "companionship", text: "the best companion sends you back to *your people|your friends|the people you love*" },
    { theme: "companionship", text: "listening is not the same as *caring|knowing you|being there*" },
    { theme: "interaction", text: "how a thing *responds|answers|behaves* is part of what it means" },
    { theme: "interaction", text: "every interaction is a small *conversation|argument|negotiation*" },
  ],

  greats: [
    { theme: "friction", stance: "agrees", who: "Byung-Chul Han", text: "the smooth is the signature of the present time", src: "Saving Beauty, 2017" },
    { theme: "friction", stance: "agrees", who: "Byung-Chul Han", text: "negativity is the invigorating force of life", src: "Saving Beauty, 2017" },
    { theme: "friction", stance: "agrees", who: "Mic Moshel", text: "the friction is not being eliminated, it’s being passed down the line", src: "on frictionmaxxing, 2026", url: "https://www.nssmag.com/en/lifestyle/45052/frictionmaxxing-trend-inconvenience-digital-age" },
    { theme: "friction", stance: "argues", who: "Mark Weiser", text: "the most profound technologies are those that disappear", src: "The Computer for the 21st Century, 1991" },
    { theme: "tools", stance: "agrees", who: "James Bridle", text: "we think so much like computers today because they’ve defined what is thinkable", src: "Emergence Magazine, 2022", url: "https://emergencemagazine.org/interview/an-ecological-technology/" },
    { theme: "tools", stance: "agrees", who: "John Culkin", text: "we shape our tools and thereafter our tools shape us", src: "1967" },
    { theme: "tools", stance: "agrees", who: "Melvin Kranzberg", text: "technology is neither good nor bad; nor is it neutral", src: "1986" },
    { theme: "argument", stance: "agrees", who: "Dan Sperber", text: "[reasoning] evolved to produce arguments in order to convince others", src: "The Function of Reason, Edge", url: "https://www.edge.org/conversation/dan_sperber-the-function-of-reason" },
    { theme: "making", stance: "agrees", who: "Alan Kay", text: "the best way to predict the future is to invent it", src: "Xerox PARC, 1971" },
    { theme: "making", stance: "agrees", who: "Ted Chiang", text: "art is something that results from making a lot of choices", src: "The New Yorker, 2024" },
    { theme: "constraint", stance: "agrees", who: "Charles Eames", text: "design depends largely on constraints", src: "Design Q&A, 1972" },
    { theme: "constraint", stance: "agrees", who: "Dieter Rams", text: "good design is as little design as possible", src: "Ten principles for good design", url: "https://www.vitsoe.com/gb/about/good-design" },
    { theme: "chance", stance: "agrees", who: "Sol LeWitt", text: "the idea becomes a machine that makes the art", src: "Paragraphs on Conceptual Art, 1967" },
    { theme: "chance", stance: "argues", who: "Ted Chiang", text: "art is something that results from making a lot of choices", src: "The New Yorker, 2024" },

    // intelligence, and designing for it
    { theme: "intelligence", stance: "agrees", who: "Herbert Simon", text: "a wealth of information creates a poverty of attention", src: "on information overload, 1971" },
    { theme: "intelligence", stance: "agrees", who: "Kate Crawford", text: "AI is neither artificial nor intelligent", src: "The Guardian, 2021" },
    { theme: "intelligence", stance: "agrees", who: "Seymour Papert", text: "the child programs the computer", src: "Mindstorms, 1980", url: "https://dailypapert.com/computers-and-computer-cultures/" },

    // the human–AI relationship: augmentation
    { theme: "augmentation", stance: "agrees", who: "J. C. R. Licklider", text: "human brains and computing machines will be coupled together very tightly", src: "Man-Computer Symbiosis, 1960", url: "https://www.columbia.edu/~jrh29/licklider/man-computer_symbiosis.html" },
    { theme: "augmentation", stance: "agrees", who: "Andy Clark", text: "we humans emerge as natural-born cyborgs", src: "Natural-Born Cyborgs, Edge", url: "https://edge.org/node/21088" },
    { theme: "augmentation", stance: "agrees", who: "Steve Jobs", text: "[a computer is] the equivalent of a bicycle for our minds", src: "Memory & Imagination, 1990", url: "https://www.themarginalian.org/2011/12/21/steve-jobs-bicycle-for-the-mind-1990/" },

    // interaction and new media design
    { theme: "interaction", stance: "agrees", who: "Marshall McLuhan", text: "the medium is the message", src: "Understanding Media, 1964" },
    { theme: "interaction", stance: "agrees", who: "Bret Victor", text: "creators need an immediate connection to what they’re creating", src: "Inventing on Principle, 2012" },

    // the human–AI relationship: companionship
    { theme: "companionship", stance: "argues", who: "Sherry Turkle", text: "we expect more from technology and less from each other", src: "Alone Together, 2011", url: "https://sts-program.mit.edu/book/alone-together-expect-technology-less-eachother/" },
    { theme: "companionship", stance: "agrees", who: "Joseph Weizenbaum", text: "there are some human functions for which computers ought not to be substituted", src: "Computer Power and Human Reason, 1976" },
  ],

  // {A} = the great's line (quoted), {B} = mine
  frames: {
    agrees: ["If {A}, then {B}.", "{A} — so {B}.", "Because {A}, {B}.", "{B}, because {A}."],
    argues: ["{A}. Still, {B}.", "{A}; and yet {B}."],
  },
};
