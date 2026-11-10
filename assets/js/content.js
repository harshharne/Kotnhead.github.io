/* =====================================================================
   SITE CONTENT. Written by the editor (edit.html), so it is plain data:
   no comments inside, keys and strings in double quotes.
   Edit it in the editor; by hand works too if you keep it valid JSON.

   projects  order here = order on the Work page
     slug, title, year, summary, tags [], featured, hidden,
     cover, coverStyle "photo"|"diagram", coverAlt, pageCover false,
     meta { label: value }, body [ blocks ]  (block types: assets/js/project.js)
   notes     title, date "2026-11-05" (or "2024-12", or "2024"), tags [],
             related (a project slug), url (makes it a link note),
             body (blank line = new paragraph; opens in place), or
             slug + summary + blocks [ ] (opens on its own page, note.html)
   playground  group, title, brand, kind, text, images [{ src, alt, r }]
             (r = width ÷ height; the page reads it from the image too)
   ===================================================================== */
window.SITE = {
  "projects": [
    {
      "slug": "playing-against-chance",
      "title": "Playing Against Chance",
      "featured": true,
      "tags": [
        "Prediction Machines",
        "Staging",
        "Experience Design",
        "Immersive Tech"
      ],
      "year": "2026",
      "summary": "An installation where you live one life, and a die decides most of it",
      "cover": "",
      "meta": {
        "Year": "2026",
        "Context": "M.Des New Media Design, NID Ahmedabad",
        "Tools": "Python, FastAPI, random.org, Stable Diffusion (SDXL-Turbo), MediaPipe, LLM, Speech to Speech Models, one physical die",
        "Status": "In progress"
      },
      "body": [
        {
          "type": "statement",
          "text": "You live one life, birth to death, and a die decides most of it."
        },
        {
          "type": "text",
          "text": "Playing Against Chance is an interactive installation that sets predictive machines against true randomness. It is satirical throughout."
        },
        {
          "type": "section",
          "label": "01  Question",
          "title": "The question"
        },
        {
          "type": "text",
          "text": "Predictive systems treat a life as something that can be read in advance. Real lives keep turning on things nobody forecast: a missed train, a wrong number, an umbrella lent to a stranger.\n\nI wanted a piece where you feel that gap from the inside, by playing a life against chance instead of reading about it. The satire is aimed at the system, the forecast and the dream, never at the person living the life."
        },
        {
          "type": "section",
          "label": "02  Process",
          "title": "How it evolved",
          "sub": "Six versions. Each one kept what worked and dropped what didn’t."
        },
        {
          "type": "evolution",
          "items": [
            {
              "title": "Rock-paper-scissors",
              "text": "Against a true random number generator. A clean contest, but too small to say anything about a life."
            },
            {
              "title": "The lottery",
              "text": "Run by the Bookkeeper, an AI character who keeps the odds."
            },
            {
              "title": "Arcade stages",
              "text": "Separate games for life stages: a sperm-and-egg race for birth, a city-map game for love. Fun, but every stage reset.",
              "gave": "play"
            },
            {
              "title": "The line",
              "text": "A life as one continuous path. The first drew itself and was passive; the second put you first-person on the line, betting at forks.",
              "gave": "continuity"
            },
            {
              "title": "The camera avatar",
              "text": "The camera tracks the player’s body, which drives a baby who grows up. Each event paints a new world behind them.",
              "gave": "a body"
            },
            {
              "title": "The trajectory",
              "text": "One written life of 19 events, played with a physical die."
            }
          ]
        },
        {
          "type": "text",
          "text": "The arcade gave it play, the line gave it continuity, and the camera gave it a body."
        },
        {
          "type": "section",
          "label": "03  Rules",
          "title": "The rules of chance",
          "sub": "Two sources of chance run the life. The player throws one physical die, and only for choices. random.org, which the player never sees, decides everything else."
        },
        {
          "type": "cards",
          "cols": 3,
          "items": [
            {
              "kicker": "The player, then the die",
              "title": "Chosen",
              "text": "Pick a card and throw for it. Rarer cards need harder throws, from “2 or more” to a single number."
            },
            {
              "kicker": "random.org",
              "title": "Happens",
              "text": "One of three hidden outcomes (good, bad, neutral) is picked. The player sees only the one that happened.",
              "chance": true
            },
            {
              "kicker": "random.org",
              "title": "Fluke",
              "text": "Something tiny and ordinary. It means nothing now and changes a later event.",
              "chance": true
            }
          ]
        },
        {
          "type": "chosen",
          "alt": "A Chosen event: pick a card, the target shows, throw the die. A hit gives your card as you chose it; a miss lets random.org allot one instead. Either way the life moves on."
        },
        {
          "type": "targets",
          "rows": [
            {
              "label": "Common",
              "target": "2 or more",
              "hits": [
                2,
                3,
                4,
                5,
                6
              ]
            },
            {
              "label": "Uncommon",
              "target": "4 or more",
              "hits": [
                4,
                5,
                6
              ]
            },
            {
              "label": "Rare",
              "target": "a single number",
              "hits": [
                6
              ]
            }
          ]
        },
        {
          "type": "text",
          "text": "Two events break the rule. Birth gives three throws before random.org decides. Love allots nothing: a miss means you didn’t meet anyone that day.\n\nThe player sees the target to throw, never percentages or odds."
        },
        {
          "type": "section",
          "label": "04  Excerpts",
          "title": "A life, in excerpts",
          "sub": "The satire lives in the cards. Each shows a name at rest and reveals one line when the player reaches for it. The rarest cards are often the most modest wishes."
        },
        {
          "type": "plaques",
          "items": [
            {
              "event": "Birth",
              "name": "Non-binary",
              "line": "The form has two boxes. You’ll have to insist.",
              "target": "a 6"
            },
            {
              "event": "Whom",
              "name": "Old money",
              "line": "Everything is paid for, including the silence.",
              "target": "a 6"
            },
            {
              "event": "Education",
              "name": "Drop out, start a channel",
              "line": "Four followers, all family.",
              "target": "exactly 1"
            },
            {
              "event": "The dream",
              "name": "Left alone",
              "line": "The rarest thing on the list.",
              "target": "a 6"
            },
            {
              "event": "Love",
              "name": "Stay home",
              "line": "They’ll have to come to you.",
              "target": "exactly 1"
            },
            {
              "event": "Death",
              "name": "In your sleep, at 94",
              "line": "Everyone’s first choice.",
              "target": "a 6"
            }
          ]
        },
        {
          "type": "fluke",
          "at": 52,
          "event": "On a rainy evening you lend your umbrella to a stranger at a bus stop.",
          "quiet": "Nothing happens.",
          "back": 64,
          "outcomes": [
            "The stranger has become a minister who moves your pension file to the top of the pile.",
            "The umbrella, your name sewn inside, turns up as evidence in someone else’s court case.",
            "You see it in a shop window, for sale."
          ]
        },
        {
          "type": "text",
          "text": "Flukes carry the unexpected. The umbrella means nothing at 52. At 64 it comes back, and random.org decides how."
        },
        {
          "type": "section",
          "label": "05  Build",
          "title": "The build",
          "sub": "The player stands in front of a camera and becomes the life’s body. Everything else is painted around them as the life unfolds."
        },
        {
          "type": "pipeline",
          "alt": "Pipeline. The camera feeds MediaPipe pose tracking, which drives the avatar. The die and random.org decide an outcome; the outcome, place, year and age become a prompt; SD-Turbo paints the world. Avatar and world meet on the screen, timed from a control panel. Planned: a story engine that writes the prompts, and a real-time voice for the Bookkeeper."
        },
        {
          "type": "cards",
          "cols": 2,
          "items": [
            {
              "title": "The avatar",
              "text": "MediaPipe tracks the player’s pose in the browser. A baby mirrors their movements and ages continuously through the life."
            },
            {
              "title": "The worlds",
              "text": "Each outcome, place, year and age becomes a prompt, and Stable Diffusion paints the scene in one style. SD-Turbo makes a 512×512 frame in 0.35 s on a MacBook Pro, so the world repaints at every event without the avatar stuttering."
            },
            {
              "title": "The pace",
              "text": "No hard cuts: scenes crossfade, one thing is on screen at a time, and a bridge line carries the years between events. A full life runs 12–15 minutes, and every timing is tunable from a control panel."
            },
            {
              "title": "The look",
              "text": "Minimal plaque cards at the bottom of the screen, translucent text windows, a clean typeface."
            }
          ]
        },
        {
          "type": "section",
          "label": "06  Learnings",
          "title": "What I learned"
        },
        {
          "type": "cards",
          "cols": 3,
          "items": [
            {
              "title": "Play is not a button.",
              "text": "The self-drawing line ran on its own, and nobody felt anything. A physical die gave the player something to hold, aim and lose."
            },
            {
              "title": "The die and the story can’t be designed apart.",
              "text": "What a missed throw leads to is a story question, not a mechanic."
            },
            {
              "title": "Pace is part of the content.",
              "text": "The first full run felt rushed. The life only felt lived once there was time to look, move and breathe between events."
            }
          ]
        },
        {
          "type": "section",
          "label": "07  Next",
          "title": "What’s next"
        },
        {
          "type": "text",
          "text": "The project is moving toward a serious game: slower, contemplative play where each choice makes you think about your own life. Still open are the Bookkeeper’s voice and how much the player steers versus drifts."
        }
      ]
    },
    {
      "slug": "soma-tiles",
      "title": "Soma Tiles",
      "featured": true,
      "tags": [
        "Problem Solving",
        "Ambient Computing",
        "Interactive Hardware"
      ],
      "year": "2026",
      "summary": "Peripheral sensory objects that make your breath visible to your body, not your mind",
      "cover": "assets/projects/soma-tiles/cover.webp",
      "coverStyle": "diagram",
      "coverAlt": "Five triangular tiles: linen with a breeze mark, wood with a speaker grille, clear acrylic with a ring of lights, a pale tile with a raised ripple, and terracotta with an opening at the top",
      "pageCover": false,
      "meta": {
        "Course": "Design Project 1 · Problem Solving",
        "Brief": "Design for Human Flourishing",
        "Form": "A breath pendant, a hub and five sensory tiles",
        "Stage": "Built and working · lightly tested"
      },
      "body": [
        {
          "type": "statement",
          "text": "Are we living in our body or just occupying it?"
        },
        {
          "type": "cards",
          "cols": 3,
          "items": [
            {
              "kicker": "The problem",
              "title": "Breath held, not felt",
              "text": "At a screen we hold or shallow our breath without noticing: screen apnea, named by Linda Stone in 2008. The body is still speaking. We have stopped listening."
            },
            {
              "kicker": "The response",
              "title": "A room that tends",
              "text": "A clip-on pendant at the sternum notices when breathing goes shallow or held. Five tiles at the edge of the desk answer through air, sound, light, touch and smell. No screen, no score."
            },
            {
              "kicker": "Where it is",
              "title": "Built, lightly tested",
              "text": "The pendant detects, the hub decides, the tiles respond. Whether it builds curiosity towards the body, and not just another signal to ignore, is still open."
            }
          ]
        },
        {
          "type": "figure",
          "src": "assets/projects/soma-tiles/tiles.webp",
          "alt": "The five tiles in a row, each with its mark beneath: linen with breeze lines, wood with a speaker grille and a sound wave, clear acrylic with a ring of lights and a sun, a pale tile with a raised ripple and a ripple, terracotta with an opening and a curl",
          "caption": "Breeze, sound, light, touch, smell. One form, five senses the studio ignores.",
          "style": "diagram",
          "size": "full"
        },
        {
          "type": "section",
          "label": "01  Question",
          "title": "Knowing is not sensing",
          "sub": "We know more about our bodies than any generation before us, and feel less of them."
        },
        {
          "type": "text",
          "text": "It started with a stomach. A bloating that wouldn’t go away. My mind searched, found something frightening, and built a story around it that a negative test couldn’t undo. The bloating was still there. The unease was still there.\n\nThat gap, between what my body was actually saying and the story my mind had already written over it, is where this project began."
        },
        {
          "type": "compare",
          "items": [
            {
              "title": "Knowing",
              "text": "“My heart rate is elevated.” Cognitive, measurable, external. Data about the body, read from a screen. Confident, complete, leaving nothing open.",
              "source": "Propositional"
            },
            {
              "title": "Sensing",
              "text": "“Something is off.” Bodily, felt, interior. A quality of experience before it has a name. Uncertain, alive, difficult to close.",
              "source": "Pre-reflective"
            }
          ]
        },
        {
          "type": "text",
          "size": "lead",
          "text": "The gap is between knowing and sensing. Too much knowing is happening. No data closes it, so the project isn’t education. It is restoration."
        },
        {
          "type": "section",
          "label": "02  Narrowing",
          "title": "From everything to one breath",
          "sub": "Mind–body disconnect shows up in food, sleep, navigation, attention and belonging. Every one of them pointed back to the same root, and none of them could be the brief."
        },
        {
          "type": "table",
          "head": [
            "Coupled with",
            "Why I let it go"
          ],
          "rows": [
            [
              "Food and hunger",
              "Adds a second wicked problem, and overlaps eating-disorder territory"
            ],
            [
              "Navigation",
              "Other populations, outdoors, different methods"
            ],
            [
              "Nature",
              "Adds a second wicked problem to the plate"
            ],
            [
              "Attention",
              "Already saturated with screen-time apps and digital wellbeing tools"
            ],
            [
              "Time",
              "Moves from interoception to chronoception"
            ]
          ]
        },
        {
          "type": "text",
          "text": "Threading the gaps in parallel found the common node: interoceptive literacy, the body’s capacity to read its own signals. It felt like the answer. It was the territory. The common node is the context, not the brief. Then I tunnelled: three variables, every live option in each, one choice from each column."
        },
        {
          "type": "table",
          "head": [
            "Variable",
            "Considered",
            "Chose"
          ],
          "rows": [
            [
              "User group",
              "Trauma survivors, early childhood, people with chronic illness, knowledge workers",
              "Studio-discipline students: design, engineering, architecture"
            ],
            [
              "Signal",
              "Jaw tension, shoulder tension, postural collapse, peripheral vision collapse, skin conductance, HRV dip",
              "Screen apnea: the involuntary breath-hold under cognitive load"
            ],
            [
              "Response",
              "Behaviour change, stress reduction, productivity, wellbeing tracking",
              "Awareness: noticing what the body already does"
            ]
          ]
        },
        {
          "type": "statement",
          "text": "Specificity is not the opposite of significance. It is the condition of it."
        },
        {
          "type": "question",
          "text": "How might we make screen apnea perceptible to studio-based students, without adding another demand to an already overloaded environment, so they develop curiosity towards their own body?"
        },
        {
          "type": "section",
          "label": "03  Research",
          "title": "Listening below language",
          "sub": "The breath-hold happens before anyone can say “I noticed that”. Surveys and interviews can’t reach it, so the research was phenomenological."
        },
        {
          "type": "cards",
          "cols": 4,
          "items": [
            {
              "kicker": "Me first",
              "title": "Somatic journaling",
              "text": "Two weeks logging my own body at every transition before meeting anyone. It gave me a vocabulary to listen with."
            },
            {
              "kicker": "6 people, 5 days",
              "title": "Experience sampling",
              "text": "A four-field log: time, situation, one body word, breath quality. Minimal, so the words stay their own."
            },
            {
              "kicker": "45 minutes each",
              "title": "Body maps, then interviews",
              "text": "Mark where you feel tension, aliveness, absence or numbness. The interview followed the map, not a script."
            },
            {
              "kicker": "Months of it",
              "title": "Observation",
              "text": "What bodies do at the start and end of work in the studio, separating what I saw from what I inferred."
            }
          ]
        },
        {
          "type": "stats",
          "items": [
            {
              "value": "2 of 90",
              "label": "log entries where breath was noticed as a live signal, though every entry asked about it",
              "source": "Experience sampling, 6 participants"
            },
            {
              "value": "50+",
              "label": "entries naming upper-body tension: eyes, head, shoulders",
              "source": "Same logs"
            }
          ]
        },
        {
          "type": "quote",
          "text": "Body word: scared. Breath: held.",
          "by": "K, before a design review"
        },
        {
          "type": "text",
          "text": "She named it. She didn’t read it as breath. She read it as fear. Felt but miscategorised: that is the design problem in one sentence.\n\nThe maps agreed. The chest, the jaw and the space between the shoulders were filled on almost every one. Hands, feet and lower legs were almost always blank. The body under cognitive load contracts upward."
        },
        {
          "type": "pair",
          "items": [
            {
              "src": "assets/projects/soma-tiles/body-map-1.jpg",
              "alt": "A participant’s body map in crayon: red at the head and neck, blue down the shoulders and arm, orange at the sternum labelled impending doom, maybe before a presentation",
              "caption": "Orange at the sternum: “impending doom, maybe before a PPT”.",
              "style": "diagram"
            },
            {
              "src": "assets/projects/soma-tiles/body-map-2.jpg",
              "alt": "A participant’s body map: an orange block over the belly, blue on the arms and legs, circles around the joints, red marks at the head and knees",
              "caption": "Each participant drew before saying a word.",
              "style": "diagram"
            }
          ]
        },
        {
          "type": "cards",
          "cols": 3,
          "items": [
            {
              "kicker": "Finding",
              "title": "Visible is the wrong register",
              "text": "The breath-hold is already felt, as dread and chest pressure. It lacks a slot that lets the sensation become readable. The design creates that slot."
            },
            {
              "kicker": "Finding",
              "title": "Three somatic languages",
              "text": "People report through emotion, posture or inner sensation. Most use one. Five channels aren’t decoration; they let different bodies hear it."
            },
            {
              "kicker": "Finding",
              "title": "Novelty crosses the threshold",
              "text": "If a log with a breath field can’t surface it, a calm signal won’t either. It has to stay strange enough to make you wonder what that was."
            }
          ]
        },
        {
          "type": "section",
          "label": "04  Decisions",
          "title": "What survived the constraints",
          "sub": "Research gave five constraints. Each one removes a whole class of solutions; the design is whatever survives all five."
        },
        {
          "type": "list",
          "title": "The five constraints",
          "items": [
            "No added cognitive demand. If it needs to be turned on, it is already wrong.",
            "Must not externalise body knowledge. No new number to check.",
            "Peripheral, not central. Perceptible, but never demanding.",
            "Designed to become unnecessary. Success is when it can be put down.",
            "Awareness before behaviour change. Noticing, not correcting."
          ]
        },
        {
          "type": "table",
          "head": [
            "Chose",
            "Over",
            "Why"
          ],
          "rows": [
            [
              "Spatial response, the wearable only senses",
              "Wearable biofeedback; an app",
              "A wearable that feeds back turns felt experience into a processed signal. An app adds a screen. In the room, the body doesn’t read a data point; the space changes quality."
            ],
            [
              "Curiosity",
              "Awareness",
              "Awareness has an endpoint and sounds like knowing. Curiosity is a pull, can’t be instructed, and measures as a trajectory, not a yes or no."
            ],
            [
              "Listen for the hold, whenever it happens",
              "Fire at the transition into work",
              "The question changed from when to fire to what to listen for."
            ],
            [
              "Rhyme with the breath",
              "Correct it",
              "Correcting would make it a coach. The tiles rhyme with breathing without prescribing a pace."
            ],
            [
              "Clip-on at the sternum",
              "Adhesive; a free-hanging pendant",
              "Clipping it on becomes a small ritual. A hanging pendant decouples from the chest wall."
            ]
          ]
        },
        {
          "type": "section",
          "label": "05  System",
          "title": "Detect, decide, respond",
          "sub": "A pendant listens, a hub decides, and a cluster of tiles answers at the edge of the desk."
        },
        {
          "type": "figure",
          "src": "assets/projects/soma-tiles/cluster.webp",
          "alt": "Line drawing of many triangular tiles scattered and linked by thin lines, with a small pendant drawing at the top right labelled breathing detection",
          "caption": "Tiles cluster, fed by the pendant.",
          "style": "diagram",
          "size": "wide"
        },
        {
          "type": "cards",
          "cols": 3,
          "items": [
            {
              "kicker": "Detect",
              "title": "Pendant",
              "text": "A clip-on breath sensor at the sternum. It doesn’t measure breath rate; it detects the moment breathing shifts from regular to shallow or held.",
              "list": [
                "ICM-42688-P motion sensor",
                "ESP32-C3 Mini"
              ]
            },
            {
              "kicker": "Decide",
              "title": "Hub tile",
              "text": "The decision brain. It takes the pendant’s trigger and chooses how the tiles answer, varying it so they never become background."
            },
            {
              "kicker": "Respond",
              "title": "Five tiles",
              "text": "Each speaks through a sense the studio suppresses. Not loudly. Not demandingly. At the edge of awareness."
            }
          ]
        },
        {
          "type": "table",
          "head": [
            "Tile",
            "How it answers"
          ],
          "rows": [
            [
              "Breeze",
              "A gentle movement of air the moment a hold is confirmed: a 5015 blower at 20–50% through fabric"
            ],
            [
              "Sound",
              "An asymmetric LFO: a quality of rhythm in the air, not a metronome"
            ],
            [
              "Light",
              "Pulses in a drift pattern, organic and alive"
            ],
            [
              "Touch",
              "An LRA actuator with modulated rhythm patterns, not vibration alerts"
            ],
            [
              "Smell",
              "A spray mechanism, driven by a motor"
            ]
          ]
        },
        {
          "type": "text",
          "text": "Two layers decide when to answer. First, verification: the sensor reads the chest’s oscillation and the wearer’s movement, so a pendant lying on a desk is never mistaken for a held breath. Then classification: when the signal flatlines, the system studies how long. Any breath inside the window resets the count. Only a sustained hold becomes a trigger."
        },
        {
          "type": "section",
          "label": "06  Tending",
          "title": "Designed to be put down",
          "sub": "Most technology measures success by engagement. Tending logic inverts it."
        },
        {
          "type": "text",
          "text": "The word comes from care: tending a garden, a wound, a fire. The gardener’s goal is not a garden that needs constant intervention. It is a garden that grows.\n\nThe pendant is scaffolding. The tiles are training wheels. When a person starts to notice their own breath-hold without a tile making it perceptible, the system has done its work. The right response then is not an upgrade. It is to put it down."
        },
        {
          "type": "statement",
          "text": "Success is silence. The system working itself out of a job."
        },
        {
          "type": "section",
          "label": "07  Thinking",
          "title": "Who I thought with"
        },
        {
          "type": "table",
          "head": [
            "Question",
            "Thinking with"
          ],
          "rows": [
            [
              "What is the body to experience?",
              "Merleau-Ponty, Phenomenology of Perception (1945); Varela, Thompson and Rosch, The Embodied Mind (1991)"
            ],
            [
              "How do you design for felt experience?",
              "Kristina Höök, Designing with the Body (2018); Shusterman, somaesthetics (2008)"
            ],
            [
              "Is the disconnect real, in the body?",
              "Porges, polyvagal theory (1994); Mehling et al., the MAIA framework (2012); Damasio, The Feeling of What Happens (1999)"
            ],
            [
              "Can a room do this, quietly?",
              "Ilse Crawford, Sensual Home (1997); Weiser and Brown, calm technology (1996)"
            ],
            [
              "What exactly is happening at the screen?",
              "Linda Stone, screen apnea (2008)"
            ]
          ]
        },
        {
          "type": "section",
          "label": "08  Open",
          "title": "What remains open"
        },
        {
          "type": "text",
          "text": "The design is built. The tiles exist, the pendant detects, the system responds. The central claim, that making the breath-hold perceptible creates curiosity towards the body rather than one more signal to ignore, has been argued, designed for and tested in a limited way. It hasn’t been proven.\n\nThe anti-habituation logic is the most uncertain part. Familiarity is patient; whether the tiles stay noticed or become furniture, only sustained use will show. The evidence I want isn’t a sensor reading. It is language: can someone describe, at the end, a moment in their body they couldn’t put into words at the start?\n\nNext is a six-week probe with design and engineering students at NID. Beyond that: shared workspaces, and the home."
        }
      ]
    },
    {
      "slug": "modern-myth",
      "title": "Modern Myth",
      "featured": true,
      "tags": [
        "Kinetic Narratives",
        "Prototyping",
        "Innovative Storytelling"
      ],
      "year": "",
      "summary": "A kinetic sculpture that tells a myth about speed, knowledge, and what we trade for them",
      "cover": "assets/projects/modern-myth/cover.jpg",
      "coverStyle": "photo",
      "coverAlt": "Render of the sculpture: a wooden base holding a glass wheel, a small viewing box, a cage of rods with a spiral of discs, a brass pentagon, an hourglass in a glass capsule and a three-weight pendulum",
      "pageCover": false,
      "meta": {
        "Form": "Kinetic sculpture, seven moving objects",
        "Base": "150 × 55.5 × 15.5 cm",
        "Stage": "Narrative framework · 3D model"
      },
      "body": [
        {
          "type": "statement",
          "text": "In our relentless pursuit of unimaginable speed and unlimited knowledge, what essential parts of our humanity are we trading off?"
        },
        {
          "type": "cards",
          "cols": 3,
          "items": [
            {
              "kicker": "The question",
              "title": "What do we trade for speed?",
              "text": "Our times are technological awe, existential dread, frantic speed and a longing for lost meaning: the acceleration of AI, the attention economy, a Faustian bargain with data."
            },
            {
              "kicker": "The response",
              "title": "A myth you watch move",
              "text": "Not an essay or a story, but a myth told by seven moving objects on one table. Each act is a motion, so the viewer feels the weight of the question instead of reading it."
            },
            {
              "kicker": "Where it is",
              "title": "Mapped and modelled",
              "text": "The narrative, its philosophy, and every object’s motion, sound and material are mapped, and the sculpture is modelled to proportion. Mechanisms and electronics come next."
            }
          ]
        },
        {
          "type": "annotated",
          "src": "assets/projects/modern-myth/model.jpg",
          "alt": "Three-quarter render of the full sculpture on its wooden base, with the seven objects numbered",
          "pins": [
            {
              "x": 24,
              "y": 36,
              "label": "The Great Wheel",
              "note": "Days of Stillness"
            },
            {
              "x": 31.5,
              "y": 62,
              "label": "Mechanical TV",
              "note": "The Vision"
            },
            {
              "x": 45.5,
              "y": 47,
              "label": "The Spine",
              "note": "The Journey"
            },
            {
              "x": 58,
              "y": 22,
              "label": "The Deity",
              "note": "The Arrival"
            },
            {
              "x": 61.4,
              "y": 62,
              "label": "Soul Clock",
              "note": "The Hidden Cost"
            },
            {
              "x": 76.5,
              "y": 65,
              "label": "Tri-pendulum",
              "note": "The Final Bargain"
            },
            {
              "x": 72.6,
              "y": 79,
              "label": "The Void",
              "note": "What’s Beyond?"
            }
          ]
        },
        {
          "type": "section",
          "label": "01  Myth",
          "title": "Why a myth",
          "sub": "Myth makes the abstract tangible and emotional. It speaks a universal, timeless language, simplifies complexity without reducing it, and invites participation, not just observation."
        },
        {
          "type": "text",
          "text": "A myth can take a complex anxiety, like our relationship with technology, and distil it into a timeless, emotionally resonant story. I didn’t want the sculpture to present an idea. I wanted it to invite the viewer into a mythic drama, so they feel the weight of the question, not just think about it."
        },
        {
          "type": "text",
          "size": "lead",
          "text": "It begins in the days of wisdom, in the time of the slow churning of knowledge.\n\nBut one day, a man had a vision of the arrival of a deity in the human realm, a being who would grant all of humanity immense speed and unlimited knowledge. The man set out on a journey to find this deity.\n\nThe arrival took place, and suddenly the change began. Society started to shift at its very foundations, growing and transforming in the blink of an eye. But little did they know, this gift would come at a cost.\n\nThe price was to be paid particle by particle of the human soul. And the day came when the man was about to lose the last fragment of his being. With this, the bargain would be completed.\n\nNo one knows what happens after the final bargain is fulfilled."
        },
        {
          "type": "section",
          "label": "02  Score",
          "title": "One arc, seven acts",
          "sub": "Motion and sound climb together to the Arrival, then fall away, past where they began, into a different kind of stillness."
        },
        {
          "type": "score",
          "caption": "Kinetic–aural flow of the piece, act by act",
          "phases": [
            "Prelude",
            "Days of Stillness",
            "The Vision",
            "The Journey",
            "The Arrival",
            "The Hidden Cost",
            "The Final Bargain",
            "What’s Beyond?"
          ],
          "under": [
            "touch",
            "Great Wheel",
            "Mechanical TV",
            "The Spine",
            "The Deity",
            "Soul Clock",
            "Tri-pendulum",
            "The Void"
          ],
          "lines": [
            {
              "label": "Sound",
              "values": [
                0.2,
                0.3,
                0.6,
                0.8,
                0.9,
                0.5,
                0.3,
                0.1
              ]
            },
            {
              "label": "Motion",
              "values": [
                0.1,
                0.2,
                0.6,
                0.8,
                0.9,
                0.4,
                0.3,
                0.05
              ],
              "style": "dashed"
            }
          ]
        },
        {
          "type": "section",
          "label": "03  Objects",
          "title": "Seven acts, seven motions",
          "sub": "Each act has one object. Its motion, sound and material carry the act’s feeling."
        },
        {
          "type": "table",
          "head": [
            "Act",
            "Object",
            "Motion",
            "Sound",
            "Feeling"
          ],
          "rows": [
            [
              "1  Days of Stillness",
              "The Great Wheel: acrylic disc on a wooden stand, engraved",
              "Cyclic, slow, balanced, like the rotation of the earth",
              "Harmonic drone, a low cyclic hum",
              "Calm attention"
            ],
            [
              "2  The Vision",
              "Mechanical TV: 3D-printed disc in a wooden box, glowing screen",
              "Fast; seems still, but moving",
              "Tremolo, flickering between signal and noise",
              "Curiosity, awakening"
            ],
            [
              "3  The Journey",
              "The Spine: iron rods, wood and a spiral of discs",
              "Linear and upwards, interlinked, with friction",
              "Rhythmic pulses, metallic sequences",
              "Rising effort"
            ],
            [
              "4  The Arrival",
              "The Deity: etched brass descending on steel rods",
              "Downwards, unstable, a false harmony",
              "A chordal burst, overpressure",
              "Awe, exhilaration"
            ],
            [
              "5  The Hidden Cost",
              "Soul Clock: an hourglass in a glass capsule",
              "Particles falling, damped, resisting",
              "Damped resonance, a breath-like decay",
              "Weariness, quiet regret"
            ],
            [
              "6  The Final Bargain",
              "Tri-pendulum: brass, stone and acrylic weights",
              "Out of sync, then a sudden stop",
              "Asynchronous swings, then silence",
              "Acceptance, surrender"
            ],
            [
              "7  What’s Beyond?",
              "The Void: a black pool of liquid with a mirror",
              "Still, with faint vibrations in the liquid",
              "Silence as sound",
              "Transcendent calm"
            ]
          ]
        },
        {
          "type": "cards",
          "cols": 3,
          "items": [
            {
              "kicker": "Before act 1",
              "title": "Prelude",
              "text": "A touch to feel the engravings pulls the viewer from passive to active looking."
            },
            {
              "kicker": "Act 1 → 2",
              "title": "Disruption",
              "text": "An LED behind opaque acrylic sparks, breaking the established rhythm."
            },
            {
              "kicker": "Act 2 → 3",
              "title": "Transference",
              "text": "Linked motion runs through LEDs, passing energy from one element to the next."
            },
            {
              "kicker": "Act 4 → 5",
              "title": "Fatigue",
              "text": "A chamber changes light as the motion resists and loses amplitude."
            },
            {
              "kicker": "Act 5 → 6",
              "title": "Yielding",
              "text": "Two motions come to rest together while a low tone dissolves into silence."
            },
            {
              "kicker": "Act 6 → 7",
              "title": "Aftermath",
              "text": "A feather vibrates: the small residue of energy that lingers."
            }
          ]
        },
        {
          "type": "figure",
          "src": "assets/projects/modern-myth/glyphs.png",
          "alt": "A row of nine hand-drawn glyphs: wheels with spokes, a T, crossed shapes, a diamond, an X, a bar and an infinity loop",
          "caption": "Glyphs for the Great Wheel’s engravings, an ancient truth to be felt by hand",
          "style": "diagram",
          "size": "wide"
        },
        {
          "type": "section",
          "label": "04  Decisions",
          "title": "Three forms for every act",
          "sub": "Each act was translated into three physical options. The one chosen had to carry the story and still be buildable."
        },
        {
          "type": "table",
          "head": [
            "Act",
            "Chosen",
            "Also considered",
            "Why"
          ],
          "rows": [
            [
              "Days of Stillness",
              "One wheel of engraved acrylic on a wooden stand",
              "Three interlinked concentric wheels; circles turning on a larger circle",
              "Making fidelity and sensory freedom"
            ],
            [
              "The Vision",
              "A mechanical TV",
              "A low-resolution screen; a mutoscope",
              "Its link to media archaeology"
            ],
            [
              "The Journey",
              "A spine of circles, motion carried from bottom to top",
              "LEDs lighting in sequence; magnetic braking with changing polarity",
              "Organ projection, and the metaphor of effort"
            ],
            [
              "The Arrival",
              "A brass structure descending",
              "A brass wheel turning at irregular speed; a breathing mechanism",
              "It carries the narrative most directly"
            ],
            [
              "The Hidden Cost",
              "An hourglass in a glass capsule, showing particles being consumed",
              "A rail of marbles dropping one by one; an eroding tower",
              "Its visual appeal, and its link to time"
            ],
            [
              "The Final Bargain",
              "A three-pendulum system",
              "One pendulum stopping at random; criss-crossed strings",
              "It explains the whole narrative: a shared surrender"
            ],
            [
              "What’s Beyond?",
              "A black starch pond that vibrates",
              "A reflective surface turning pitch black; a film that goes opaque under infrared",
              "Fidelity and feasibility"
            ]
          ]
        },
        {
          "type": "section",
          "label": "05  Thinking",
          "title": "The question behind each act"
        },
        {
          "type": "table",
          "head": [
            "Act",
            "Question",
            "Thinking with"
          ],
          "rows": [
            [
              "Days of Stillness",
              "What is being before mediation, before the sign and the machine?",
              "Heidegger, Merleau-Ponty, Eliade"
            ],
            [
              "The Vision",
              "When the first sign appears, what rupture happens?",
              "Saussure, Peirce, McLuhan, Ihde"
            ],
            [
              "The Journey",
              "How does the pursuit of knowledge begin?",
              "Ernst Kapp, Ihde, Merleau-Ponty, Benjamin"
            ],
            [
              "The Arrival",
              "What illusion of mastery does acceleration produce?",
              "Heidegger’s Enframing, Benjamin’s aura, McLuhan"
            ],
            [
              "The Hidden Cost",
              "What is the ontological price of representation and speed?",
              "Heidegger, Galit Wellner, Rosenberger, Malina"
            ],
            [
              "The Final Bargain",
              "Can surrender be a form of intelligence?",
              "Merleau-Ponty’s chiasm, Ihde, South Asian metaphysics"
            ],
            [
              "What’s Beyond?",
              "What remains when mediation and motion end?",
              "Eliade’s eternal return, Heidegger’s dwelling, Peirce"
            ]
          ]
        },
        {
          "type": "section",
          "label": "06  Model",
          "title": "Built to one proportion",
          "sub": "The Great Wheel is the 1.0× baseline. The other objects follow the golden ratio, and doubling is read as an octave shift."
        },
        {
          "type": "stats",
          "items": [
            {
              "value": "150 × 55.5",
              "label": "the base, in cm, 15.5 cm deep",
              "source": ""
            },
            {
              "value": "1 : 1.618",
              "label": "the ratio between objects",
              "source": ""
            },
            {
              "value": "1.5×",
              "label": "the Deity, the tallest object",
              "source": ""
            }
          ]
        },
        {
          "type": "pair",
          "items": [
            {
              "src": "assets/projects/modern-myth/low.jpg",
              "alt": "Low front render: the wheel, viewing box, rod cage with spiral, brass pentagon, hourglass and pendulum",
              "style": "photo"
            },
            {
              "src": "assets/projects/modern-myth/above.jpg",
              "alt": "Render from above at three-quarters, showing the spiral of discs inside the rod cage",
              "style": "photo"
            }
          ]
        },
        {
          "type": "figure",
          "src": "assets/projects/modern-myth/front.jpg",
          "alt": "Front elevation of the sculpture on a black table against a grey wall",
          "caption": "Front elevation",
          "style": "photo",
          "size": "full"
        },
        {
          "type": "section",
          "label": "07  Next",
          "title": "What’s next"
        },
        {
          "type": "text",
          "text": "The later stages of the framework are still open: dimensional and experience mapping, sketches for every element, and the mechanics and electronics behind each motion. The plan is to prototype early, with small material and motion tests for each object, rather than waiting for the full map."
        }
      ]
    },
    {
      "slug": "binni",
      "title": "Binni",
      "featured": true,
      "tags": [
        "Human–AI Relationship",
        "Voice Interfaces"
      ],
      "year": "2025",
      "summary": "A compassionate AI companion",
      "cover": "assets/projects/binni/cover.jpg",
      "coverStyle": "photo",
      "coverAlt": "Binni, a pastel Russian doll with closed eyes and a gentle smile",
      "meta": {
        "Year": "2025",
        "Focus": "Loneliness and everyday emotional distress",
        "Stage": "Concept · Stage 1 prototype",
        "Built with": "Raspberry Pi Zero 2W · Google Speech-to-Text · Text-to-Speech"
      },
      "body": [
        {
          "type": "section",
          "label": "01  Context",
          "title": "Loneliness is common, and quiet."
        },
        {
          "type": "stats",
          "items": [
            {
              "value": "1 in 6",
              "label": "people worldwide are affected by loneliness",
              "source": "WHO Commission on Social Connection, 2025"
            },
            {
              "value": "17–21%",
              "label": "of people aged 13–29 report feeling lonely",
              "source": "WHO Commission on Social Connection, 2025"
            },
            {
              "value": "~1 in 2",
              "label": "18–24 year olds felt lonely, across eight countries including India",
              "source": "Abdalla et al., 2026"
            }
          ]
        },
        {
          "type": "text",
          "text": "People facing emotional distress often struggle to express their feelings or access support."
        },
        {
          "type": "section",
          "label": "02  Gap",
          "title": "Being heard helps. Leaning on it can hurt."
        },
        {
          "type": "compare",
          "items": [
            {
              "title": "Feeling heard",
              "text": "A short conversation with an empathetic AI companion reduced loneliness about as much as talking to a person. Feeling heard made the difference.",
              "source": "De Freitas et al., Journal of Consumer Research"
            },
            {
              "title": "Feeling dependent",
              "text": "The relief did not build up over days. Heavier, more personal use was linked to more loneliness and emotional dependence.",
              "source": "De Freitas et al.; MIT Media Lab × OpenAI, 2025"
            }
          ]
        },
        {
          "type": "question",
          "text": "Can AI be utilised to offer that feeling of being heard, without replacing the people in our lives?"
        },
        {
          "type": "section",
          "label": "03  Primary research",
          "title": "Primary Research",
          "sub": "Conducted a quick survey with people who have used mental health apps or talk to AI assistants (survey size: 11)."
        },
        {
          "type": "bars",
          "question": "What would make you more likely to trust and use an AI emotional support companion?",
          "total": 11,
          "rows": [
            [
              "Clear privacy and data protection policies",
              10
            ],
            [
              "Highly human-like voice and conversation",
              8
            ],
            [
              "Proven effectiveness in mental health support",
              7
            ],
            [
              "Customisation options (tone, personality, responses)",
              5
            ],
            [
              "I wouldn’t trust an AI for emotional support",
              1
            ]
          ]
        },
        {
          "type": "split",
          "question": "If the above aspects suit you, how comfortable are you with talking to an AI companion about your emotions?",
          "total": 11,
          "rows": [
            [
              "Comfortable",
              6
            ],
            [
              "Neutral",
              4
            ],
            [
              "Uncomfortable",
              1
            ]
          ]
        },
        {
          "type": "section",
          "label": "04  Ideation",
          "title": "Ideation Focus"
        },
        {
          "type": "side",
          "figure": {
            "src": "assets/projects/binni/ideation.jpg",
            "alt": "Whiteboard sketches: three stage interaction (playful, comfortable, thoughtful) and notes on magnetic connectors",
            "style": "photo",
            "caption": "Ideation board"
          },
          "blocks": [
            {
              "type": "cards",
              "items": [
                {
                  "title": "Emotional core and the spirit of AI"
                },
                {
                  "title": "Physical interactivity"
                }
              ]
            }
          ]
        },
        {
          "type": "section",
          "label": "05  Binni",
          "title": "What if the AI companion could mirror the way we confide in different friends for different aspects of life?"
        },
        {
          "type": "cards",
          "cols": 3,
          "items": [
            {
              "kicker": "Problem statement",
              "title": "A safe, empathetic space",
              "text": "People facing emotional distress often struggle to express their feelings or access support. How might we create an AI companion that offers a safe, empathetic space to help them reflect, connect, and seek help when needed?"
            },
            {
              "kicker": "Insight",
              "title": "A Trusted Friend",
              "text": "When people face emotional distress, they often seek comfort in conversations that feel personal, non-judgemental and understanding, just like talking to a trusted friend."
            },
            {
              "kicker": "Idea",
              "title": "A Russian Doll",
              "text": "So, a three stage interaction model with different emotional cores and persona in form of a Russian Doll!"
            }
          ]
        },
        {
          "type": "section",
          "label": "06  Cultivating compassion",
          "title": "Human Centred UX Thinking"
        },
        {
          "type": "lotus",
          "center": "User",
          "petals": [
            {
              "label": "3 Stage\nInteraction Model"
            },
            {
              "label": "Minimal\nCognitive Load",
              "note": "Focus on clarity\nand simplicity"
            },
            {
              "label": "Pain Points",
              "note": "Fear of judgement\nand loneliness"
            },
            {
              "label": "Feedback for\nImprovement",
              "note": "Data driven improvements\nand reflection on\npositive progress"
            },
            {
              "label": "Safety &\nBoundaries",
              "note": "Clear limits, and a path to human support\nwhen distress goes beyond everyday loneliness"
            },
            {
              "label": "Voice Interface\nDesign",
              "note": "Ensuring natural, human like\nconversation flow"
            },
            {
              "label": "Needs",
              "note": "Comfort, trust\nand safe space"
            },
            {
              "label": "Empathy\nDriven Design",
              "note": "Focus on the user’s emotions\nand mental state"
            }
          ]
        },
        {
          "type": "section",
          "label": "07  Interaction",
          "title": "3 Stage Interaction Model",
          "sub": "Emotional core and personas"
        },
        {
          "type": "side",
          "figure": {
            "src": "assets/projects/binni/nested.png",
            "alt": "Three nested dolls opening out, each with its own face",
            "style": "diagram"
          },
          "blocks": [
            {
              "type": "cards",
              "items": [
                {
                  "title": "Playful",
                  "text": "Light-hearted, engaging tone for daily activities"
                },
                {
                  "title": "Comforting",
                  "text": "Soft and reassuring responses for a feeling of safe space"
                },
                {
                  "title": "Thoughtful",
                  "text": "Deep and reflective conversations for a non-judgemental space"
                }
              ]
            }
          ]
        },
        {
          "type": "list",
          "items": [
            "This design offers a tangible interaction as the AI mode changes.",
            "AI adjusts the tone and speech delivery based on the interaction mode.",
            "Pure conversational user experience: no buttons, no app integrations, only fluid, natural dialogue."
          ]
        },
        {
          "type": "section",
          "label": "08  Technology & development",
          "title": "Prototyping Phase 1: Stage 1"
        },
        {
          "type": "cards",
          "cols": 2,
          "items": [
            {
              "title": "Hardware",
              "list": [
                "Raspberry Pi Zero 2W",
                "Microphone",
                "Speaker",
                "Power supply",
                "Wi-Fi connection"
              ]
            },
            {
              "title": "Software",
              "list": [
                "Google Text-to-Speech",
                "Google Speech-to-Text"
              ]
            }
          ]
        },
        {
          "type": "pair",
          "items": [
            {
              "src": "assets/projects/binni/prototype.jpg",
              "alt": "Raspberry Pi Zero 2W with a lapel microphone on a cutting mat",
              "style": "photo",
              "caption": "Stage 1 hardware"
            },
            {
              "src": "assets/projects/binni/connector.png",
              "alt": "Two nesting cylinders joined by magnetic connectors",
              "style": "diagram",
              "caption": "Interaction transfer: magnetic connectors"
            }
          ]
        },
        {
          "type": "section",
          "label": "09  Future roadmap",
          "title": "Evolution Path"
        },
        {
          "type": "side",
          "figure": {
            "src": "assets/projects/binni/roadmap.png",
            "alt": "Two dolls connected by a cord",
            "style": "diagram"
          },
          "blocks": [
            {
              "type": "cards",
              "items": [
                {
                  "kicker": "Phase 1 · Stage 2",
                  "title": "AI-powered emotional response engine",
                  "text": "Manual emotional modes, soothing activities, and music therapy."
                },
                {
                  "kicker": "Phase 2 · Stage 1",
                  "title": "Speech analysis",
                  "text": "Speech analysis using Librosa, OpenSmile and sentiment models. Personalised memory, adaptive AI personality, and a user-specific small language model that is localised."
                }
              ]
            }
          ]
        },
        {
          "type": "section",
          "label": "10  What matters?",
          "title": "New Media Design Impact"
        },
        {
          "type": "cards",
          "cols": 3,
          "items": [
            {
              "title": "Ethical & Responsible Design",
              "text": "Ensuring privacy, empathy, and user control"
            },
            {
              "title": "Minimal & Effortless Design",
              "text": "AI fits into life without adding complexity"
            },
            {
              "title": "Human + AI",
              "text": "Not just assistance, AI as a friend"
            }
          ]
        },
        {
          "type": "section",
          "label": "11  Revisited, 2026",
          "title": "A friend that sends you back to your friends."
        },
        {
          "type": "cards",
          "cols": 3,
          "items": [
            {
              "title": "Short visits",
              "text": "Voice helped in brief sessions and hurt with long daily use. Binni winds conversations down instead of stretching them out."
            },
            {
              "title": "A bridge, not a destination",
              "text": "Feeling heard is the start. Binni nudges you back towards the people in your life."
            },
            {
              "title": "Knowing its limits",
              "text": "When distress goes beyond everyday loneliness, Binni says so plainly and points to human support."
            }
          ]
        },
        {
          "type": "sources",
          "items": [
            {
              "label": "WHO: Social connection linked to improved health and reduced risk of early death (2025)",
              "url": "https://www.who.int/news/item/30-06-2025-social-connection-linked-to-improved-heath-and-reduced-risk-of-early-death"
            },
            {
              "label": "Abdalla et al., loneliness among young adults in eight countries, Social Psychiatry and Psychiatric Epidemiology (2026)",
              "url": "https://source.washu.edu/2026/03/nearly-half-of-young-adults-report-loneliness-in-eight-country-study/"
            },
            {
              "label": "De Freitas et al., AI companions reduce loneliness, Journal of Consumer Research",
              "url": "https://www.library.hbs.edu/working-knowledge/feeling-lonely-an-attentive-listener-is-an-ai-prompt-away"
            },
            {
              "label": "MIT Media Lab × OpenAI, affective use and emotional well-being (2025)",
              "url": "https://openai.com/index/affective-use-study"
            }
          ]
        }
      ]
    },
    {
      "slug": "neev",
      "title": "Neev",
      "featured": true,
      "tags": [
        "Game Design",
        "User Experience"
      ],
      "year": "2025",
      "summary": "An app for uplifting constitutional awareness",
      "cover": "assets/projects/neev/cover.jpg",
      "coverStyle": "photo",
      "coverAlt": "Wireframes of the Journey, Guru and Neevsense screens",
      "pageCover": false,
      "meta": {
        "Year": "2025",
        "Focus": "Constitutional literacy through play",
        "Stage": "Concept · UI wireframes",
        "Platform": "Mobile app"
      },
      "body": [
        {
          "type": "quote",
          "text": "Constitution is not a mere lawyers document, it is a vehicle of Life, and its spirit is always the spirit of Age.",
          "by": "B R Ambedkar, Writings And Speeches: A Ready Reference Manual"
        },
        {
          "type": "section",
          "label": "01  Context",
          "title": "Essential for every citizen, yet it remains low."
        },
        {
          "type": "bubbles",
          "center": "But, citizens face issues like",
          "centerAt": 2,
          "items": [
            {
              "label": "Misinterpretation",
              "size": "s"
            },
            {
              "label": "Unaware of fundamental rights",
              "size": "m"
            },
            {
              "label": "Poor constitutional education",
              "size": "l"
            },
            {
              "label": "Weak enforcement",
              "size": "s"
            },
            {
              "label": "Misunderstanding of laws",
              "size": "l"
            },
            {
              "label": "Unaware of fundamental duties",
              "size": "m"
            }
          ]
        },
        {
          "type": "section",
          "label": "02  Gap",
          "title": "Gaps in existing solutions"
        },
        {
          "type": "cards",
          "cols": 3,
          "items": [
            {
              "kicker": "01",
              "title": "No interactive learning"
            },
            {
              "kicker": "02",
              "title": "Caters to professionals only"
            },
            {
              "kicker": "03",
              "title": "Lacks engagement"
            }
          ]
        },
        {
          "type": "section",
          "label": "03  Ideation",
          "title": "Using the gaps as the corner stones"
        },
        {
          "type": "pair",
          "items": [
            {
              "src": "assets/projects/neev/ideation-wall.jpg",
              "alt": "Harshwardhan sorting sticky notes for Neev on a wall",
              "style": "photo",
              "caption": "Ideation sessions"
            },
            {
              "src": "assets/projects/neev/sketches.jpg",
              "alt": "Pencil sketches of the Journey, Guru and Neevsense screens",
              "style": "photo",
              "caption": "First wireframe sketches"
            }
          ]
        },
        {
          "type": "text",
          "text": "Worked on finding a solution that is accessible while using the gaps as the corner stones. Through a series of ideation sessions, decided to move forward with:"
        },
        {
          "type": "statement",
          "text": "A Gamified Learning App!"
        },
        {
          "type": "section",
          "label": "04  Neev",
          "title": "Gamified Learning"
        },
        {
          "type": "cards",
          "cols": 2,
          "items": [
            {
              "title": "Problem statement",
              "text": "Constitutional awareness is very essential for every citizen, yet it remains low due to complex jargon filled language, lack of engaging resources and unexplored real world applications."
            },
            {
              "title": "Insight",
              "text": "Gamifying constitutional knowledge can transform the jargon heavy legal literacy for a citizen into a fun and personal strategic journey, empowering them to navigate real world scenarios with confidence."
            },
            {
              "title": "Idea",
              "text": "A decision making strategy oriented game based on constitutional literacy woven with real life scenarios."
            },
            {
              "title": "Game mechanics",
              "text": "Following a hero’s journey, the player has to make strategic decisions while facing scenarios through different character driven arcs, and also manage the momentum points. A Neevsense score will be given to each player based on their respective gameplay."
            }
          ]
        },
        {
          "type": "section",
          "label": "05  UX thinking",
          "title": "UX Thinking",
          "sub": "Three questions, each answered by the game itself."
        },
        {
          "type": "stairs",
          "steps": [
            {
              "kicker": "01",
              "title": "User Motivation",
              "questions": [
                "But what will keep a user invested in learning constitution?",
                "Why will player return daily?"
              ],
              "answers": [
                "Daily Streaks",
                "Anticipation of what happens next in the story",
                "Strategy & resource management"
              ]
            },
            {
              "kicker": "02",
              "title": "Cognitive Load",
              "questions": [
                "Does the game introduce complex jargon filled concepts in a simple and gradual manner?",
                "How will the interactions be simple but meaningful?"
              ],
              "answers": [
                "Choice based decision making",
                "Real life scenarios",
                "No jargons, with multi-format explanation"
              ]
            },
            {
              "kicker": "03",
              "title": "Player Psychology",
              "questions": [
                "How does the game let player handle failure without discouraging?",
                "Do the rewards feel meaningful?"
              ],
              "answers": [
                "Replayability",
                "Regionalised leaderboard",
                "Other gameplay benefits like bonus points"
              ]
            }
          ]
        },
        {
          "type": "section",
          "label": "06  System",
          "title": "How Neev fits together",
          "sub": "Three parts: where you play, where you learn, and what measures you."
        },
        {
          "type": "system",
          "alt": "System map. Journey sends players to Guru to revisit past concepts; Guru gives confidence in decisions. Journey's decision-making patterns feed Neevsense; momentum points advance the journey and let players learn from the guru. Neevsense is a lifetime score that drives a live leaderboard and bonus benefits.",
          "columns": [
            {
              "kicker": "Learn",
              "title": "Guru",
              "items": [
                {
                  "label": "Gyaandhara",
                  "sub": "Multi-format learning"
                },
                {
                  "label": "Maidan",
                  "sub": "Practice understanding"
                }
              ]
            },
            {
              "kicker": "Play",
              "title": "Journey",
              "items": [
                {
                  "label": "Arcs",
                  "sub": "Roles you play"
                },
                {
                  "label": "Scenario cards",
                  "sub": "Single or multi-layered"
                }
              ]
            },
            {
              "kicker": "Measure",
              "title": "Neevsense",
              "items": [
                {
                  "label": "Momentum points"
                },
                {
                  "label": "Critical points"
                },
                {
                  "label": "Experience points"
                }
              ]
            }
          ],
          "output": {
            "title": "Live leaderboard",
            "text": "Bonus benefits"
          },
          "flows": [
            {
              "from": 1,
              "to": 0,
              "label": "revisit\npast concepts"
            },
            {
              "from": 0,
              "to": 1,
              "label": "confidence in\ndecisions"
            },
            {
              "from": 1,
              "to": 2,
              "label": "decision-making\npatterns"
            },
            {
              "from": 2,
              "to": 1,
              "label": "momentum\nadvances journey"
            },
            {
              "from": 2,
              "to": 0,
              "label": "momentum lets you learn from the guru"
            },
            {
              "from": 2,
              "to": "out",
              "label": "lifetime score"
            }
          ]
        },
        {
          "type": "section",
          "label": "07  Journey",
          "title": "Journey"
        },
        {
          "type": "text",
          "text": "Journey is a narrative based progression where players navigate through different arcs where they assume different roles, and make informed decisions via scenario cards."
        },
        {
          "type": "track",
          "arcs": [
            "Journalist",
            "Policeman",
            "Politician"
          ],
          "more": "more arcs",
          "keyArc": "Arc (a role you play)",
          "keyCard": "Scenario card"
        },
        {
          "type": "section",
          "label": "08  Scenario cards",
          "title": "Scenario Cards",
          "sub": "Scenario cards challenge players with constitutional situations in two types."
        },
        {
          "type": "scenario",
          "single": {
            "label": "Single-Layered · one clear choice",
            "q": "You are leading a peaceful protest, should you get a protest permit?",
            "options": [
              "Yes I should",
              "No, it’s not necessary"
            ]
          },
          "multi": {
            "label": "Multi-Layered · choices that unfold in steps",
            "steps": [
              {
                "q": "The protest begins, but a police officer asks you to show the protest permit. What will you do?",
                "options": [
                  "Show the permit obtained earlier",
                  "Argue that you don’t need a permit"
                ]
              },
              {
                "q": "What will you do if you don’t have a permit, or the police officer refuses to acknowledge the permit as valid?",
                "options": [
                  "Calmly state it’s a spontaneous protest under Article 19 and request time to clarify the rules",
                  "Refuse to stop and continue protesting",
                  "End the protest to avoid conflict"
                ]
              }
            ]
          }
        },
        {
          "type": "text",
          "text": "Cards may present fixed outcomes, dilemmas, or uncertain results, with complexity increasing as players progress."
        },
        {
          "type": "section",
          "label": "09  Neevsense",
          "title": "Neevsense"
        },
        {
          "type": "text",
          "text": "A player’s lifetime score, purely based on their gameplay, measured by factors like momentum points, critical points and experience points. Neevsense will be the deciding factor for players regarding the bonus benefits. A live leaderboard for the players will be published based on the Neevsense score."
        },
        {
          "type": "venn",
          "alt": "Neevsense: three overlapping circles, Critical Points, Momentum Points and Experience Points",
          "circles": [
            {
              "label": "Critical\nPoints",
              "note": "Critical points play a key role in\nanalysing players’ decision-making\npatterns and gameplay strategies,\nrevealing their approach, reasoning,\nand understanding of constitutional\nprinciples."
            },
            {
              "label": "Momentum\nPoints",
              "note": "Momentum Points let players\nperform in-game tasks, like\nadvancing their journey or\nlearning from the guru."
            },
            {
              "label": "Experience\nPoints",
              "note": "Experience points reflect a\nplayer’s progress, learning,\nand mastery in the game."
            }
          ]
        },
        {
          "type": "section",
          "label": "10  Guru",
          "title": "Guru"
        },
        {
          "type": "text",
          "text": "Is a player’s trusted guide to master Neev and gain understanding of everything constitution in a very intuitive and simple manner. It will help the player in gaining confidence in their decisions and allow them to enhance their abilities to strike a balance between understanding of rights and duties likewise. Also, this is the place where players can come and get a more in-depth understanding of past concepts."
        },
        {
          "type": "cards",
          "cols": 2,
          "items": [
            {
              "kicker": "Learn",
              "title": "Gyaandhara",
              "list": [
                "Multi-format learning",
                "Fun and accessible",
                "Consume knowledge strategically"
              ]
            },
            {
              "kicker": "Practise",
              "title": "Maidan",
              "list": [
                "Practice understanding",
                "Replayability",
                "Identify mistakes",
                "Work on abilities"
              ]
            }
          ]
        },
        {
          "type": "section",
          "label": "11  Interface",
          "title": "UI Wireframes"
        },
        {
          "type": "figure",
          "src": "assets/projects/neev/wireframes.jpg",
          "alt": "Five wireframes: Login, Journey, Guru, Neevsense and Scenario Card",
          "style": "dark",
          "size": "full"
        },
        {
          "type": "identity",
          "icon": {
            "src": "assets/projects/neev/icon.jpg",
            "alt": "Neev app icon, a stepped foundation with a pillar, in black on white and white on black"
          },
          "typeface": "Futura",
          "colours": [
            "000000",
            "FFFFFF"
          ]
        }
      ]
    }
  ],
  "notes": [
    {
      "slug": "butterflies-in-my-memories",
      "title": "Butterflies in my memories",
      "date": "2024",
      "tags": [
        "Photo essay"
      ],
      "summary": "A photo essay",
      "related": "",
      "url": "",
      "body": "",
      "blocks": [
        {
          "type": "text",
          "size": "lead",
          "text": "Every time I close my eyes, I can feel the projection of dispersed rays of light over the retina through my eyelids, causing a tinkling yet deeply nostalgic feeling. Maybe the origins of this tinkling lie in certain butterflies from my past, which have long gone. But though their appearance lasted only for split seconds compared to the quantum of time I have spent on this planet, some of their flutters have resulted in a hurricane of change in my life."
        },
        {
          "type": "text",
          "text": "These images are not only intended to capture something from the past but also the spirit of the years lived and the moments that came by, just like a butterfly. This photo essay contains images from my travels, moments of pure daydreaming, and some from the stories told by nani in my childhood, a humble pursuit to capture these butterflies from my memories."
        },
        {
          "type": "photos",
          "items": [
            {
              "src": "assets/notes/butterflies/intro.jpg",
              "alt": "Close-up of a dark surface scattered with violet specks of light",
              "caption": "",
              "date": "",
              "r": 0.636
            }
          ]
        },
        {
          "type": "photos",
          "items": [
            {
              "src": "assets/notes/butterflies/curtains.jpg",
              "alt": "A blurred landscape at dusk through a train window, the edge of a curtain streaking across it",
              "caption": "The curtains were mixing with the glass panel as if my physical body was touched by the very feeling of a journey.",
              "date": "Sept 2024",
              "r": 1
            },
            {
              "src": "assets/notes/butterflies/north-star.jpg",
              "alt": "A deep blue sky over a thin orange horizon",
              "caption": "My search for the north star.",
              "date": "Jan 2024",
              "r": 1.565
            }
          ]
        },
        {
          "type": "photos",
          "items": [
            {
              "src": "assets/notes/butterflies/balloons.jpg",
              "alt": "Blue and green balloons floating on dark water, reflected beneath",
              "caption": "I feel as a child we are never alone.",
              "date": "Dec 2024",
              "r": 0.765
            },
            {
              "src": "assets/notes/butterflies/puddle.jpg",
              "alt": "Black and white: a child stepping through a puddle, her reflection stretched upside down in the water",
              "caption": "Reflection of joy has just lost into the shadows.",
              "date": "Sept 2024",
              "r": 1.092
            }
          ]
        },
        {
          "type": "photos",
          "items": [
            {
              "src": "assets/notes/butterflies/water.jpg",
              "alt": "Rippled grey-blue water",
              "caption": "Always felt like scooping out the water and eating it.",
              "date": "Sept 2024",
              "r": 1.685
            },
            {
              "src": "assets/notes/butterflies/boats.jpg",
              "alt": "Small coloured paper boats floating on green water",
              "caption": "There are no more rivers over the roads for my boats now.",
              "date": "Dec 2024",
              "r": 0.785
            }
          ]
        },
        {
          "type": "photos",
          "items": [
            {
              "src": "assets/notes/butterflies/fire.jpg",
              "alt": "Two people on a motorbike, silhouetted against a bonfire at night",
              "caption": "Evoking the feeling of the forgotten tale of my childhood.",
              "date": "March 2024",
              "r": 0.654
            },
            {
              "src": "assets/notes/butterflies/leaves.jpg",
              "alt": "Sunlit leaves against a pale sky, blurred with movement",
              "caption": "Always wanted to capture winds and clouds and put them in a jar.",
              "date": "Oct 2024",
              "r": 0.623
            },
            {
              "src": "assets/notes/butterflies/bicycle.jpg",
              "alt": "A small red bicycle on a wet courtyard among potted plants, its headlight glowing",
              "caption": "That split seconds of blindness while riding the bicycle was addictive.",
              "date": "Nov 2024",
              "r": 0.653
            }
          ]
        }
      ]
    },
    {
      "title": "Mind–Body Disconnect",
      "date": "",
      "tags": [],
      "related": "",
      "url": "",
      "body": ""
    }
  ],
  "playground": [
    {
      "group": "Advertising",
      "title": "Tech Tuesday",
      "brand": "vivo X100 Series",
      "kind": "Social series",
      "text": "“Unlock the next level of innovation.” A weekly post that opens the phone up one part at a time: the battery and charging, the camera, the chipset, the antennas.",
      "images": [
        {
          "src": "assets/playground/advertising/vivo.jpg",
          "alt": "A grid of dark social posts: a glowing Tech Tuesday title card, then line drawings of the phone’s battery, camera lenses, chipset and antennas",
          "r": 1.77
        }
      ]
    },
    {
      "group": "Advertising",
      "title": "Reimagine the Balance",
      "brand": "New Balance",
      "kind": "Print campaign",
      "text": "Built on photographs of soldiers playing football. “Let’s replace the blood and grim with sweat and smiles.”",
      "images": [
        {
          "src": "assets/playground/advertising/new-balance.jpg",
          "alt": "Three New Balance ads in sepia: soldiers running through smoke under the line Reimagine the Balance, and two photographs of soldiers playing football",
          "r": 1.571
        }
      ]
    },
    {
      "group": "Advertising",
      "title": "Your Personal Cloud",
      "brand": "Watergen",
      "kind": "Poster series",
      "text": "Two posters sell the machine as a cloud of your own. Three set it against the numbers on water scarcity. “Let’s prove the data wrong.”",
      "images": [
        {
          "src": "assets/playground/advertising/watergen-1.jpg",
          "alt": "Blue poster with a single cloud: Get yourself a cloud, ranging from 200 to 6,000 litres a day",
          "r": 0.561
        },
        {
          "src": "assets/playground/advertising/watergen-2.jpg",
          "alt": "Blue poster with a cloud above a tower block: Get your residence its own cloud",
          "r": 0.561
        },
        {
          "src": "assets/playground/advertising/watergen-3.jpg",
          "alt": "Poster over a dusty road at sunset: Nearly 4 billion people will be living in areas with persistent water scarcity",
          "r": 0.562
        },
        {
          "src": "assets/playground/advertising/watergen-4.jpg",
          "alt": "Poster over dry pine needles: 40% of India’s population by 2030 will not have access to basic drinking water",
          "r": 0.561
        },
        {
          "src": "assets/playground/advertising/watergen-5.jpg",
          "alt": "Poster over cracked earth: 85% chance of persistent drought in southwestern USA by 2050",
          "r": 0.562
        }
      ]
    },
    {
      "group": "Advertising",
      "title": "Time is with us",
      "brand": "Christopher Ward",
      "kind": "Print campaign",
      "text": "Each headline is set as the hands of a clock, telling its own time: authentic intelligence, a generation that woke up at 89 seconds to midnight, seven passions.",
      "images": [
        {
          "src": "assets/playground/advertising/christopher-ward-1.jpg",
          "alt": "White poster: the words Authentic Intelligence set as clock hands. We believe that in the age of AI, your authentic intelligence will win. Time is with us.",
          "r": 0.731
        },
        {
          "src": "assets/playground/advertising/christopher-ward-2.jpg",
          "alt": "White poster: Generation that woke up at 89 seconds to midnight, set as clock hands with 89 seconds in red. Time is with us.",
          "r": 0.731
        },
        {
          "src": "assets/playground/advertising/christopher-ward-3.jpg",
          "alt": "White poster: It’s great to have 7 passions, set as clock hands. Time is with us.",
          "r": 0.731
        }
      ]
    }
  ]
};
