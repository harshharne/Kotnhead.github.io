/* =====================================================================
   SITE CONTENT. Written by the editor (edit.html), so it is plain data:
   no comments inside, keys and strings in double quotes.
   Edit it in the editor; by hand works too if you keep it valid JSON.

   projects  order here = order on the Work page
     slug, title, year, summary, tags [], featured, hidden,
     cover, coverStyle "photo"|"diagram", coverPos (focal point, e.g. "60% 50%"), coverAlt, pageCover false,
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
      "cover": "assets/projects/playing-against-chance/throw.jpg",
      "meta": {
        "Year": "2026",
        "Context": "M.Des New Media Design, NID Ahmedabad",
        "Stack": "Python, FastAPI, random.org, Stable Diffusion Turbo, MediaPipe, one physical die; planned: an LLM and a speech-to-speech voice",
        "Status": "In progress"
      },
      "body": [
        {
          "type": "statement",
          "text": "You live one life, birth to death, and a die decides most of it."
        },
        {
          "type": "cards",
          "cols": 3,
          "items": [
            {
              "kicker": "The question",
              "title": "Can you play against a forecast?",
              "text": "Predictive systems treat a life as something that can be read in advance. Real lives keep turning on things nobody forecast."
            },
            {
              "kicker": "What it is",
              "title": "One life, in 15 minutes",
              "text": "You stand in front of a camera and live a whole life, birth to death. You throw a die for what you want; random.org, unseen, decides the rest."
            },
            {
              "kicker": "Where it is",
              "title": "A working life",
              "text": "The full life runs: 19 events, a camera avatar, a world repainted at every event. The Bookkeeper’s voice and a story engine come next."
            }
          ]
        },
        {
          "type": "pacsystem",
          "title": "One event, through the system",
          "caption": "Pick a run and step through it. Violet is chance. Dashed parts are planned.",
          "cols": [
            {
              "label": "In",
              "sub": "what goes into a life",
              "nodes": [
                {
                  "id": "body",
                  "title": "Your body",
                  "sub": "a camera"
                },
                {
                  "id": "die",
                  "title": "Your throw",
                  "sub": "one physical die",
                  "chance": true
                },
                {
                  "id": "rng",
                  "title": "The unseen",
                  "sub": "random.org, from atmospheric noise",
                  "chance": true
                },
                {
                  "id": "panel",
                  "title": "The pace",
                  "sub": "a control panel"
                }
              ]
            },
            {
              "label": "Engine",
              "sub": "Python · FastAPI",
              "nodes": [
                {
                  "id": "script",
                  "title": "Life script",
                  "sub": "19 events, birth to death"
                },
                {
                  "id": "rules",
                  "title": "Rules of chance",
                  "sub": "Chosen · Happens · Fluke"
                },
                {
                  "id": "prompt",
                  "title": "Prompt",
                  "sub": "outcome + place + year + age"
                },
                {
                  "id": "story",
                  "title": "Story engine",
                  "sub": "an LLM writes prompts and bridge lines",
                  "planned": true
                }
              ]
            },
            {
              "label": "Makers",
              "sub": "in real time",
              "nodes": [
                {
                  "id": "pose",
                  "title": "Pose",
                  "sub": "MediaPipe, in the browser"
                },
                {
                  "id": "paint",
                  "title": "World",
                  "sub": "SD-Turbo · 512 × 512 in 0.35 s"
                },
                {
                  "id": "voice",
                  "title": "The Bookkeeper",
                  "sub": "a speech-to-speech voice",
                  "planned": true
                }
              ]
            },
            {
              "label": "Stage",
              "sub": "one screen",
              "nodes": [
                {
                  "id": "screen",
                  "title": "Avatar over world",
                  "sub": "a baby who grows old with you"
                },
                {
                  "id": "cards",
                  "title": "Plaques and lines",
                  "sub": "cards, text windows, bridge lines"
                }
              ]
            }
          ],
          "edges": [
            [
              "body",
              "pose"
            ],
            [
              "pose",
              "screen"
            ],
            [
              "die",
              "rules"
            ],
            [
              "rng",
              "rules"
            ],
            [
              "panel",
              "script"
            ],
            [
              "script",
              "rules"
            ],
            [
              "rules",
              "prompt"
            ],
            [
              "prompt",
              "paint"
            ],
            [
              "paint",
              "screen"
            ],
            [
              "rules",
              "cards",
              "below"
            ],
            [
              "story",
              "prompt",
              "planned"
            ],
            [
              "voice",
              "screen",
              "planned"
            ]
          ],
          "runs": [
            {
              "name": "A Chosen event",
              "steps": [
                {
                  "on": [
                    "panel",
                    "panel>script",
                    "script"
                  ],
                  "text": "Age 18. The script reaches Education, a Chosen event, at the pace set on the control panel."
                },
                {
                  "on": [
                    "script>rules",
                    "rules",
                    "rules>cards",
                    "cards"
                  ],
                  "text": "Cards appear. You reach for one: Drop out, start a channel. Its line shows, “Four followers, all family.” Its target: exactly 1."
                },
                {
                  "on": [
                    "die",
                    "die>rules",
                    "rules"
                  ],
                  "text": "You throw the die. A 4. A miss."
                },
                {
                  "on": [
                    "rng",
                    "rng>rules",
                    "rules"
                  ],
                  "text": "On a miss, random.org allots a card for you instead. You never see the odds, only what you get."
                },
                {
                  "on": [
                    "rules>prompt",
                    "prompt"
                  ],
                  "text": "The outcome, the place, the year and your age become one prompt."
                },
                {
                  "on": [
                    "prompt>paint",
                    "paint"
                  ],
                  "text": "SD-Turbo paints the new world: 512 × 512 in about 0.35 seconds, so it never holds up the avatar."
                },
                {
                  "on": [
                    "body",
                    "body>pose",
                    "pose",
                    "pose>screen",
                    "screen"
                  ],
                  "text": "All along, the camera has been reading your body. The avatar, now 18, moves as you move."
                },
                {
                  "on": [
                    "paint>screen",
                    "screen",
                    "rules>cards",
                    "cards"
                  ],
                  "text": "The world crossfades in behind you. The plaque settles, and a bridge line carries the years to the next event."
                }
              ]
            },
            {
              "name": "Something happens",
              "steps": [
                {
                  "on": [
                    "script"
                  ],
                  "text": "The script reaches a Happens event. Three outcomes are written for it in advance: one good, one bad, one neutral."
                },
                {
                  "on": [
                    "rng",
                    "rng>rules",
                    "rules"
                  ],
                  "text": "random.org picks one. Nobody, not even the operator, chooses it."
                },
                {
                  "on": [
                    "rules>prompt",
                    "prompt",
                    "prompt>paint",
                    "paint"
                  ],
                  "text": "It becomes a prompt, and the world is repainted around it."
                },
                {
                  "on": [
                    "paint>screen",
                    "screen",
                    "rules>cards",
                    "cards"
                  ],
                  "text": "You only ever see the one that happened. The other two never existed for you."
                }
              ]
            },
            {
              "name": "A fluke",
              "steps": [
                {
                  "on": [
                    "script",
                    "script>rules",
                    "rules"
                  ],
                  "text": "Age 52. A fluke: on a rainy evening you lend your umbrella to a stranger at a bus stop."
                },
                {
                  "on": [
                    "rules>cards",
                    "cards"
                  ],
                  "text": "Nothing happens. The life moves on, and so do you."
                },
                {
                  "on": [
                    "script",
                    "rng",
                    "rng>rules",
                    "rules"
                  ],
                  "text": "Age 64. The fluke comes back, and random.org decides how."
                },
                {
                  "on": [
                    "rules>prompt",
                    "prompt>paint",
                    "paint",
                    "paint>screen",
                    "screen"
                  ],
                  "text": "The stranger has become a minister who moves your pension file to the top of the pile."
                }
              ]
            },
            {
              "name": "Next: the Bookkeeper",
              "steps": [
                {
                  "on": [
                    "story",
                    "story>prompt",
                    "prompt"
                  ],
                  "text": "Planned: a story engine, an LLM, writes each prompt and bridge line from the outcome, so no two lives read the same."
                },
                {
                  "on": [
                    "voice",
                    "voice>screen",
                    "screen"
                  ],
                  "text": "Planned: the Bookkeeper, who keeps the odds, speaks with you in real time through a speech-to-speech model."
                }
              ]
            }
          ]
        },
        {
          "type": "section",
          "label": "01  Territory",
          "title": "From the sublime to a die",
          "sub": "It began far from games, in a research map of the sublime. Each station narrowed the question."
        },
        {
          "type": "route",
          "items": [
            {
              "kicker": "Start",
              "title": "The sublime",
              "text": "Kant’s mathematical sublime: scale beyond calculation, terror and exhilaration at once."
            },
            {
              "kicker": "A venue",
              "title": "Threshold",
              "text": "A place where something shifts. Pinning the work to it gave the synthesis a constraint."
            },
            {
              "kicker": "A tension",
              "title": "Deterministic ↔ random",
              "text": "Unpredictability and entropy on one side; AI and algorithms on the other."
            },
            {
              "kicker": "A material",
              "title": "True randomness",
              "text": "Chance from a physical process, not a formula: a true random number generator.",
              "chance": true
            },
            {
              "kicker": "A form",
              "title": "Games of chance",
              "text": "Dice, slot machines, poker, a coin flip. What hooks people: rewards, incentives, high stakes."
            },
            {
              "kicker": "A contest",
              "title": "Predictive machines vs chance",
              "text": "Our relationship with probability and prediction. What if the AI is made to struggle?"
            },
            {
              "kicker": "Now",
              "title": "A life, played",
              "text": "The stakes became the chances in a life: birth, love, where you’re born, who you end up with."
            }
          ]
        },
        {
          "type": "text",
          "text": "Once randomness was the material, I mapped six directions for it before choosing one."
        },
        {
          "type": "cards",
          "cols": 3,
          "items": [
            {
              "kicker": "01",
              "title": "Randomness as author",
              "text": "What if the artist gives up control? The rules are designed; chance decides the final work."
            },
            {
              "kicker": "02",
              "title": "Randomness as instruction",
              "text": "Chance sets the instruction, and the participant has to interpret it and act."
            },
            {
              "kicker": "03",
              "title": "Finding meaning in randomness",
              "text": "Our habit of seeing patterns, intention and connection in events that are random."
            },
            {
              "kicker": "04",
              "title": "Randomness as the unknowable",
              "text": "From the sublime: the concealed object, uncertainty, and the limits of knowing."
            },
            {
              "kicker": "05",
              "title": "Randomness and agency",
              "text": "What happens to our sense of choice when chance is making the decisions?"
            },
            {
              "kicker": "06",
              "title": "Randomness and fallacies",
              "text": "How we misread chance: believing we can predict it, change it, control it."
            }
          ]
        },
        {
          "type": "statement",
          "text": "A designed field where chance navigates the participants."
        },
        {
          "type": "section",
          "label": "02  Structure",
          "title": "Rule, chance, response",
          "sub": "Everything else orbits three roles. I design the possibility space, chance picks the path, the player lives it."
        },
        {
          "type": "cards",
          "cols": 3,
          "items": [
            {
              "kicker": "Rule · me",
              "title": "The possibility space",
              "text": "Every event, card, outcome and line is written in advance. Nothing on screen is improvised.",
              "list": [
                "19 events, birth to death",
                "Cards with throws from “2 or more” to a single number",
                "A good, a bad and a neutral outcome for each Happens"
              ]
            },
            {
              "kicker": "Chance · random.org and the die",
              "title": "The path",
              "text": "Chance never invents. It only selects within what is written, the way random.org’s Jazz Scale Generator picks within rules.",
              "list": [
                "The die: the player’s throw for what they want",
                "random.org: everything the player doesn’t see"
              ],
              "chance": true
            },
            {
              "kicker": "Response · the player",
              "title": "The life",
              "text": "The player’s body is the life’s body. They aim, throw, miss and keep living.",
              "list": [
                "A body the camera follows",
                "One physical die in hand"
              ]
            }
          ]
        },
        {
          "type": "table",
          "head": [
            "Thinking with",
            "What I took"
          ],
          "rows": [
            [
              "David Rokeby, Minimal Object",
              "The artist builds an invisible field of possibilities; the participant finds a path through it."
            ],
            [
              "Yoko Ono",
              "The instruction can be the artwork. The participant completes it."
            ],
            [
              "Samuel Beckett, Lessness",
              "A rigorously authored structure, put in order by chance."
            ],
            [
              "random.org, Jazz Scale Generator",
              "True randomness selecting within authored rules, not generating the material."
            ],
            [
              "Lauren McCarthy",
              "What happens when a system starts to influence how people behave."
            ],
            [
              "Immanuel Kant",
              "The overwhelming scale of possibility."
            ],
            [
              "Slavoj Žižek",
              "Our desire for a hidden cause behind random events."
            ],
            [
              "Isaac Asimov, Franchise",
              "A computer picks one voter to stand for everyone."
            ]
          ]
        },
        {
          "type": "section",
          "label": "03  Process",
          "title": "How it evolved",
          "sub": "Six versions. Each kept what worked and dropped what didn’t."
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
          "label": "04  Rules",
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
          "type": "bars",
          "question": "Chance of getting the card you chose",
          "unit": "%",
          "total": 100,
          "rows": [
            [
              "Common · 2 or more",
              83.3
            ],
            [
              "Uncommon · 4 or more",
              50
            ],
            [
              "Rare · a single number",
              16.7
            ]
          ],
          "note": "One fair die. The player never sees these numbers, only the target to throw."
        },
        {
          "type": "text",
          "text": "Two events break the rule. Birth gives three throws before random.org decides. Love allots nothing: a miss means you didn’t meet anyone that day.\n\nThe player sees the target to throw, never percentages or odds."
        },
        {
          "type": "section",
          "label": "05  Excerpts",
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
          "label": "06  Build",
          "title": "The stack",
          "sub": "Four inputs, one engine, two makers, one stage. The player feels none of it: only a die, a body and a life."
        },
        {
          "type": "stats",
          "items": [
            {
              "value": "19",
              "label": "events in one life, birth to death",
              "source": "The life script"
            },
            {
              "value": "12–15 min",
              "label": "for a whole life, every timing tunable",
              "source": "Control panel"
            },
            {
              "value": "0.35 s",
              "label": "to paint a world, 512 × 512",
              "source": "SD-Turbo on a MacBook Pro"
            }
          ]
        },
        {
          "type": "table",
          "head": [
            "Part",
            "Tool",
            "What it does",
            "Status"
          ],
          "rows": [
            [
              "Hidden chance",
              "random.org",
              "True random numbers from atmospheric noise. Decides Happens events, flukes and missed throws.",
              "Built"
            ],
            [
              "Chance in hand",
              "One physical die",
              "The player’s throw for the card they chose.",
              "Built"
            ],
            [
              "Body",
              "MediaPipe pose, in the browser",
              "Tracks the player and drives an avatar that ages from a baby to old age.",
              "Built"
            ],
            [
              "World",
              "Stable Diffusion Turbo",
              "Paints each event’s world in one style, fast enough to repaint at every event.",
              "Built"
            ],
            [
              "Engine",
              "Python, FastAPI",
              "Runs the life: the script, the rules and the image model behind the screen.",
              "Built"
            ],
            [
              "Pace",
              "Control panel",
              "Sets every timing: crossfades, holds, bridge lines.",
              "Built"
            ],
            [
              "Story",
              "An LLM",
              "Writes prompts and bridge lines from each outcome.",
              "Planned"
            ],
            [
              "Voice",
              "Speech-to-speech model",
              "The Bookkeeper, talking with the player in real time.",
              "Planned"
            ]
          ]
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
          "label": "07  Learnings",
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
          "label": "08  Next",
          "title": "What’s next"
        },
        {
          "type": "text",
          "text": "The project is moving toward a serious game: slower, contemplative play where each choice makes you think about your own life.\n\nStill open are the Bookkeeper’s voice, and how much the player steers versus drifts. The story engine would let every life read differently while chance stays exactly where it is: selecting, never inventing."
        }
      ],
      "coverStyle": "photo",
      "coverAlt": "A hand lets go of a die over a black tray on a wooden table, with a second tray and die beyond it",
      "pageCover": false,
      "coverPos": "64% 50%"
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
      "cover": "assets/projects/soma-tiles/cover-white.jpg",
      "coverStyle": "photo",
      "coverAlt": "The five Soma Tiles marks in a row: a sun for light, a ripple for touch, a curl for smell, a wave for sound, and lines of wind for breeze",
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
      "cover": "assets/projects/modern-myth/elevation.jpg",
      "coverStyle": "photo",
      "coverAlt": "Blueprint front elevation of the Modern Myth sculpture: a lattice globe on a turned stand, a framed picture, a lattice framework with a spiral slide, a pendant on top, an hourglass and a pendulum, on an 840 mm base",
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
      "cover": "assets/projects/neev/cover.webp",
      "coverStyle": "diagram",
      "coverAlt": "A phone with the Neev app icon, a stepped foundation with a pillar, in the middle of its screen",
      "pageCover": false,
      "meta": {
        "Year": "2025",
        "Focus": "Constitutional literacy through play",
        "Methods": "Desk research · audit · proto-personas · journey map",
        "Stage": "Concept · wireframes · playable prototype"
      },
      "body": [
        {
          "type": "quote",
          "text": "Constitution is not a mere lawyers document, it is a vehicle of Life, and its spirit is always the spirit of Age.",
          "by": "B R Ambedkar, Writings And Speeches: A Ready Reference Manual"
        },
        {
          "type": "cards",
          "cols": 3,
          "items": [
            {
              "kicker": "The problem",
              "title": "Rights nobody can read",
              "text": "The Constitution is 145,000 words of legal English. Most people meet it only when a right is already at stake, and then they can’t use it."
            },
            {
              "kicker": "What I did",
              "title": "Rehearse it as a game",
              "text": "A decision game. You play a journalist, a police officer or a politician, and get through real situations with your rights and duties. The learning happens in the choice."
            },
            {
              "kicker": "Where it is",
              "title": "Concept, playable core",
              "text": "Wireframes and a playable prototype of the core loop. The research so far is desk research; testing with players comes next."
            }
          ]
        },
        {
          "type": "neevplay",
          "title": "Play a card",
          "caption": "The core loop, playable. Pick an arc and make the calls.",
          "arcs": [
            {
              "name": "Journalist",
              "line": "Speech, information and their limits",
              "cards": [
                {
                  "steps": [
                    {
                      "scene": "protest",
                      "alt": "Dots resolve into a line of protesters holding a placard, and a camera in the foreground",
                      "q": "You’re filming a protest outside the collector’s office. An official tells you to stop and delete your footage.",
                      "hint": "Free expression has limits. But who sets them, and how?",
                      "article": "Article 19(1)(a) · 19(2)",
                      "options": [
                        {
                          "text": "Keep filming from the public road, and ask which order stops you",
                          "sound": true,
                          "why": "Freedom of the press is part of your freedom of speech and expression, Article 19(1)(a). It can be limited only by law, on grounds Article 19(2) lists, such as public order. Asking which order applies is fair."
                        },
                        {
                          "text": "Delete it. It’s not worth the trouble",
                          "sound": false,
                          "why": "You gave up a right without being shown why. Limits on speech have to come from a law, on the grounds Article 19(2) lists, and you can ask which one applies."
                        }
                      ]
                    }
                  ]
                },
                {
                  "steps": [
                    {
                      "scene": "rti",
                      "alt": "Dots resolve into a stack of files and an official stamp",
                      "q": "You want to know how the town’s road budget was spent. The office says the files are internal.",
                      "hint": "One law turns ‘internal’ into ‘ask and you shall be told’.",
                      "article": "RTI Act, 2005 · Article 19(1)(a)",
                      "options": [
                        {
                          "text": "File an RTI application with the department",
                          "sound": true,
                          "why": "Under the Right to Information Act, 2005, any citizen can ask a public authority for information, and it must usually reply within 30 days. The Supreme Court has read the right to know into Article 19(1)(a)."
                        },
                        {
                          "text": "Wait for the official press release",
                          "sound": false,
                          "why": "Waiting leaves the story to the office. The Right to Information Act, 2005 lets any citizen ask for the records, and the authority must usually reply within 30 days."
                        }
                      ]
                    }
                  ]
                },
                {
                  "steps": [
                    {
                      "scene": "comment",
                      "alt": "Dots resolve into a phone screen of comments, one crossed out",
                      "q": "Your story goes viral. The top comment calls on readers to attack a community. Do you pin it for the engagement?",
                      "hint": "Does free speech cover every kind of speech?",
                      "article": "Article 19(2)",
                      "options": [
                        {
                          "text": "Remove it",
                          "sound": true,
                          "why": "Free speech doesn’t cover incitement to an offence or threats to public order. Article 19(2) lets the law restrict both."
                        },
                        {
                          "text": "Pin it. It’s just speech",
                          "sound": false,
                          "why": "Article 19(2) lets the law restrict speech that incites an offence or threatens public order. A call to attack people is exactly that."
                        }
                      ]
                    },
                    {
                      "scene": "voices",
                      "alt": "Dots resolve into many speech bubbles, some faint, some bold",
                      "q": "A forwarded video says a vaccine carries a tracking chip. Your editor wants it on the homepage.",
                      "hint": "Among a citizen’s duties is a way of thinking.",
                      "article": "Article 51A(h)",
                      "options": [
                        {
                          "text": "Check it before anything runs",
                          "sound": true,
                          "why": "Article 51A(h) lists a scientific temper and the spirit of inquiry among every citizen’s fundamental duties. For a journalist, that starts with checking."
                        },
                        {
                          "text": "Run it. Readers love this",
                          "sound": false,
                          "why": "Article 51A(h) asks every citizen to develop a scientific temper and a spirit of inquiry. Running it unchecked spreads it with your name on it."
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "name": "Police officer",
              "line": "Power, and the rights that check it",
              "cards": [
                {
                  "steps": [
                    {
                      "scene": "arrest",
                      "alt": "Dots resolve into an officer in a cap beside a man, a pair of handcuffs between them",
                      "q": "You arrest a man for stealing a phone. He asks why he is being taken.",
                      "hint": "An arrest comes with things the arrested person must be told.",
                      "article": "Article 22(1)",
                      "options": [
                        {
                          "text": "Tell him the grounds of arrest",
                          "sound": true,
                          "why": "Article 22(1): no one who is arrested can be held without being told the grounds as soon as may be. He may also consult a lawyer of his choice."
                        },
                        {
                          "text": "He’ll find out at the station",
                          "sound": false,
                          "why": "Article 22(1) says an arrested person must be told the grounds as soon as may be, and may consult a lawyer of their choice."
                        }
                      ]
                    }
                  ]
                },
                {
                  "steps": [
                    {
                      "scene": "family",
                      "alt": "Dots resolve into a house and a phone sending a signal",
                      "q": "At the station, he asks for his family to be told where he is.",
                      "hint": "The Supreme Court spelt out what an arrest must include.",
                      "article": "Article 21 · D.K. Basu, 1997",
                      "options": [
                        {
                          "text": "Inform a relative or friend he names",
                          "sound": true,
                          "why": "In D.K. Basu v. State of West Bengal (1997), the Supreme Court read Article 21 to require that a friend or relative be told of the arrest and where the person is held."
                        },
                        {
                          "text": "That isn’t your job",
                          "sound": false,
                          "why": "It is. In D.K. Basu v. State of West Bengal (1997), the Supreme Court read Article 21 to require that a friend or relative be told of the arrest and where the person is held."
                        }
                      ]
                    }
                  ]
                },
                {
                  "steps": [
                    {
                      "scene": "clock",
                      "alt": "Dots resolve into a clock face, most of it filled",
                      "q": "He has been in custody for 20 hours. Your senior says to hold him over the weekend.",
                      "hint": "Custody has a clock on it.",
                      "article": "Article 22(2)",
                      "options": [
                        {
                          "text": "Produce him before a magistrate within 24 hours",
                          "sound": true,
                          "why": "Article 22(2): an arrested person must be produced before the nearest magistrate within 24 hours, not counting the journey. Holding him longer needs the magistrate’s order."
                        },
                        {
                          "text": "Hold him till Monday",
                          "sound": false,
                          "why": "Article 22(2) requires an arrested person to be produced before the nearest magistrate within 24 hours, not counting the journey. Only a magistrate can extend custody."
                        }
                      ]
                    },
                    {
                      "scene": "room",
                      "alt": "Dots resolve into a lamp over a table, a person on each side",
                      "q": "During questioning, he refuses to say whether he took the phone.",
                      "hint": "Can the accused be made to give evidence against themselves?",
                      "article": "Article 20(3)",
                      "options": [
                        {
                          "text": "Respect his silence, and build the case on evidence",
                          "sound": true,
                          "why": "Article 20(3): no person accused of an offence can be compelled to be a witness against himself."
                        },
                        {
                          "text": "Keep pressing until he confesses",
                          "sound": false,
                          "why": "Article 20(3) protects an accused person from being compelled to be a witness against himself. A forced confession breaks that right."
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "name": "Politician",
              "line": "Equality, the vote and duties",
              "cards": [
                {
                  "steps": [
                    {
                      "scene": "podium",
                      "alt": "Dots resolve into a speaker at a podium before a crowd",
                      "q": "A party worker suggests promising a new state scheme only to families of one religion in your ward.",
                      "hint": "Can the State choose people by religion alone?",
                      "article": "Articles 14 · 15(1)",
                      "options": [
                        {
                          "text": "Open it to every eligible family",
                          "sound": true,
                          "why": "Article 15(1): the State shall not discriminate against any citizen on grounds only of religion, race, caste, sex or place of birth. Article 14 guarantees equality before the law."
                        },
                        {
                          "text": "Promise it. It wins votes",
                          "sound": false,
                          "why": "Article 15(1) bars the State from discriminating on grounds only of religion, among others. A scheme limited by religion alone fails that test."
                        }
                      ]
                    }
                  ]
                },
                {
                  "steps": [
                    {
                      "scene": "well",
                      "alt": "Dots resolve into a village well and a woman carrying a pot",
                      "q": "Elders in a village ask you to stop a Dalit family from drawing water at the common well.",
                      "hint": "One Article ends a practice outright.",
                      "article": "Articles 17 · 15(2)",
                      "options": [
                        {
                          "text": "Refuse, and make sure the family can draw water",
                          "sound": true,
                          "why": "Article 17 abolishes untouchability and forbids its practice in any form. Article 15(2) guarantees every citizen the use of public wells."
                        },
                        {
                          "text": "Stay out of it. It’s their custom",
                          "sound": false,
                          "why": "Untouchability is abolished by Article 17, and enforcing it is an offence under law. Article 15(2) guarantees every citizen the use of public wells."
                        }
                      ]
                    }
                  ]
                },
                {
                  "steps": [
                    {
                      "scene": "ballot",
                      "alt": "Dots resolve into a ballot paper going into a box",
                      "q": "On polling day, a rival’s agent says people from the settlement by the river shouldn’t vote because they don’t own land.",
                      "hint": "What does it take to be a voter?",
                      "article": "Article 326",
                      "options": [
                        {
                          "text": "Say it plainly: every adult citizen can vote",
                          "sound": true,
                          "why": "Article 326: elections are held on adult suffrage. Every citizen who is 18 or older and not disqualified by law can vote. Owning land has nothing to do with it."
                        },
                        {
                          "text": "Let the officials sort it out",
                          "sound": false,
                          "why": "Staying quiet lets a false rule stand. Article 326 gives the vote to every citizen 18 or older, with no condition of property."
                        }
                      ]
                    },
                    {
                      "scene": "voices",
                      "alt": "Dots resolve into many speech bubbles, some faint, some bold",
                      "q": "Your team wants a rally speech that mocks people who speak another language.",
                      "hint": "The Constitution lists duties, not only rights.",
                      "article": "Article 51A(e)",
                      "options": [
                        {
                          "text": "Drop it",
                          "sound": true,
                          "why": "Article 51A(e) asks every citizen to promote harmony and the spirit of common brotherhood across religious, linguistic and regional differences."
                        },
                        {
                          "text": "Keep it. The crowd will love it",
                          "sound": false,
                          "why": "Among the fundamental duties, Article 51A(e) asks citizens to promote harmony across linguistic and regional differences. A leader sets the tone."
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ],
          "notes": [
            [
              "Arc",
              "A role you play. Each arc is a run of cards around one part of the Constitution."
            ],
            [
              "Scene",
              "Every card opens with a picture of the moment, so the situation is seen before it is read. Here a fixed set develops dot by dot; in the product, each scene would be made for the card, the player’s region and role."
            ],
            [
              "Choice",
              "Two options in plain words, no Articles. The Article appears after you choose, attached to what just happened."
            ],
            [
              "Guru",
              "A hint costs one momentum point. Help is always there, but it costs something."
            ],
            [
              "Neevsense",
              "XP for playing, critical points for sound calls. A wrong call explains itself, and you can try again."
            ]
          ]
        },
        {
          "type": "section",
          "label": "01  Desk research",
          "title": "Why the Constitution stays unread",
          "sub": "No interviews yet. This is published data, and it shaped every decision after it."
        },
        {
          "type": "stats",
          "items": [
            {
              "value": "145,000",
              "label": "words in the Constitution, the longest of any sovereign country",
              "source": "World Economic Forum, 2019"
            },
            {
              "value": "76%",
              "label": "find legal documents hard to understand",
              "source": "Vidhi Centre for Legal Policy, SARAL survey, 2025 (360 people)"
            },
            {
              "value": "73%",
              "label": "find it hard to exercise their legal rights",
              "source": "Same survey"
            }
          ]
        },
        {
          "type": "bars",
          "question": "Why legal documents are hard to understand",
          "unit": "%",
          "total": 100,
          "rows": [
            [
              "Not knowing the legal concepts",
              54.5
            ],
            [
              "Too long",
              53.7
            ],
            [
              "Legal jargon",
              51.1
            ],
            [
              "Unclear language",
              31.5
            ]
          ],
          "note": "Among the 271 who found them hard. Vidhi Centre for Legal Policy, SARAL survey, 2025, Bengaluru and Delhi NCR."
        },
        {
          "type": "bars",
          "question": "Who has access to legal resources or help, by age",
          "unit": "%",
          "total": 100,
          "rows": [
            [
              "18–30",
              30
            ],
            [
              "31–40",
              58
            ],
            [
              "41–50",
              63
            ],
            [
              "51–60",
              75
            ],
            [
              "Over 60",
              17
            ]
          ],
          "note": "Same survey. Without access, 88% turn to friends or family and 77% to online resources."
        },
        {
          "type": "text",
          "size": "lead",
          "text": "The youngest adults have the least access to help, and they are the ones with phones in their hands."
        },
        {
          "type": "stats",
          "items": [
            {
              "value": "886 million",
              "label": "active internet users in India",
              "source": "IAMAI and Kantar, Internet in India 2024"
            },
            {
              "value": "488 million",
              "label": "of them in rural India, more than in cities",
              "source": "Same report"
            },
            {
              "value": "98%",
              "label": "use the internet in Indian languages",
              "source": "Same report"
            }
          ]
        },
        {
          "type": "text",
          "text": "Gamification isn’t a guarantee. A meta-analysis of 40 experiments (Sailer and Homner, 2020) found it helps learning, with the clearest effect on what people know and smaller effects on motivation and behaviour.\n\nTwo details mattered for Neev. A story around the game helped change behaviour. And competition worked better mixed with collaboration than on its own."
        },
        {
          "type": "section",
          "label": "02  Audit",
          "title": "What already exists",
          "sub": "Four kinds of help a citizen can find today, against what the research asks for."
        },
        {
          "type": "table",
          "head": [
            "",
            "Plain language",
            "Real situations",
            "Indian languages",
            "Reason to return"
          ],
          "rows": [
            [
              "Bare-act apps",
              "No, the full legal text",
              "No",
              "Varies",
              "No"
            ],
            [
              "Nyaaya, Vidhi Centre",
              "Yes",
              "As explainers",
              "English, Hindi, Kannada",
              "No"
            ],
            [
              "Constitution quizzes",
              "Partly",
              "No",
              "Varies",
              "One-off"
            ],
            [
              "iCivics (USA)",
              "Yes",
              "Yes, as games",
              "Not for India",
              "Yes"
            ],
            [
              "Neev",
              "Yes",
              "Yes, as cards",
              "Planned",
              "Arcs, streaks, Neevsense"
            ]
          ]
        },
        {
          "type": "cards",
          "cols": 3,
          "items": [
            {
              "kicker": "Gap 01",
              "title": "No interactive learning",
              "text": "Reading is the only way in."
            },
            {
              "kicker": "Gap 02",
              "title": "Made for professionals",
              "text": "Written for lawyers and exam takers."
            },
            {
              "kicker": "Gap 03",
              "title": "Nothing to come back to",
              "text": "Look something up once, then leave."
            }
          ]
        },
        {
          "type": "section",
          "label": "03  Proto-personas",
          "title": "Who Neev is for, assumed",
          "sub": "Built from the research above, not from interviews. Hypotheses to test, not findings."
        },
        {
          "type": "cards",
          "cols": 2,
          "items": [
            {
              "kicker": "Proto-persona · 19",
              "title": "The first-time voter",
              "text": "Studies in a small city and lives on a phone, in Hindi and English. Knows the Preamble from a school wall. Has never read an Article.",
              "list": [
                "Wants: to know what to do when it matters",
                "Stuck on: legal words, long text",
                "Asks: friends, family, search"
              ]
            },
            {
              "kicker": "Proto-persona · 26",
              "title": "The new earner",
              "text": "First job, first rent agreement, first office that won’t answer. Short on time, not on curiosity.",
              "list": [
                "Wants: to get through it without a lawyer",
                "Stuck on: no time, no one to ask",
                "Asks: whatever comes up online"
              ]
            }
          ]
        },
        {
          "type": "section",
          "label": "04  Journey",
          "title": "When a right is at stake, today"
        },
        {
          "type": "table",
          "head": [
            "",
            "Something happens",
            "Looks it up",
            "Makes sense of it",
            "Acts"
          ],
          "rows": [
            [
              "Doing",
              "A police stop, a refused form, a notice",
              "Searches, asks family",
              "Reads the bare text, or a forward",
              "Complies, or gives up"
            ],
            [
              "Feeling",
              "Unsure",
              "Overwhelmed",
              "Doubtful",
              "Powerless"
            ],
            [
              "With Neev",
              "Has played it before",
              "Guru, in plain words",
              "Sees the Article inside a story",
              "Knows the move"
            ]
          ]
        },
        {
          "type": "statement",
          "text": "Learn it before the moment, the way a fire drill works."
        },
        {
          "type": "section",
          "label": "05  Principles",
          "title": "Four rules from the research"
        },
        {
          "type": "cards",
          "cols": 4,
          "items": [
            {
              "kicker": "Jargon",
              "title": "Situations before Articles",
              "text": "Start from what happens. Name the Article after the choice, never before."
            },
            {
              "kicker": "Length",
              "title": "Seconds, not chapters",
              "text": "One decision per card. The Constitution is 145,000 words; a card is under forty."
            },
            {
              "kicker": "Reach",
              "title": "In your language",
              "text": "98% of Indian internet users use Indian languages. English only is a wall."
            },
            {
              "kicker": "Motivation",
              "title": "Play with, not only against",
              "text": "Competition works better mixed with collaboration. The regional leaderboard stays; team arcs are next."
            }
          ]
        },
        {
          "type": "section",
          "label": "06  Ideation",
          "title": "Using the gaps as corner stones"
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
          "text": "Through a series of ideation sessions, the three gaps became the brief: interactive, for everyone, worth coming back to. The answer was a decision game."
        },
        {
          "type": "section",
          "label": "07  UX thinking",
          "title": "Three questions the game has to answer"
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
          "label": "08  System",
          "title": "How Neev fits together",
          "sub": "Where you play, where you learn, and what measures you."
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
          "type": "text",
          "text": "Journey is the story: arcs where you take on a role and decide through scenario cards. A card can be single-layered, one clear choice, or multi-layered, choices that unfold in steps. Complexity rises as you progress."
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
          "type": "cards",
          "cols": 3,
          "items": [
            {
              "kicker": "Neevsense",
              "title": "Momentum points",
              "text": "Spent to move the journey forward and to learn from Guru."
            },
            {
              "kicker": "Neevsense",
              "title": "Critical points",
              "text": "Show how a player decides: their reasoning and their grasp of constitutional principles."
            },
            {
              "kicker": "Neevsense",
              "title": "Experience points",
              "text": "Progress and mastery over time."
            }
          ]
        },
        {
          "type": "text",
          "text": "Neevsense is a player’s lifetime score, made from all three. It decides bonus benefits and a live, regional leaderboard. Guru is the trusted guide: Gyaandhara for learning in many formats, Maidan for practice, replays and mistakes."
        },
        {
          "type": "section",
          "label": "09  Interface",
          "title": "From wireframes to a playable card"
        },
        {
          "type": "figure",
          "src": "assets/projects/neev/wireframes.jpg",
          "alt": "Five wireframes: Login, Journey, Guru, Neevsense and Scenario Card",
          "style": "dark",
          "size": "full"
        },
        {
          "type": "text",
          "text": "The scenario card gives its top half to the scene. A picture of the moment comes first, the question second, and the Article only after the choice. In the prototype above, the scene develops as the card opens, so every card feels made for that turn of the game."
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
        },
        {
          "type": "section",
          "label": "10  Next",
          "title": "What I’d test first",
          "sub": "Everything above is a hypothesis until players touch it."
        },
        {
          "type": "table",
          "head": [
            "Question",
            "Method",
            "It works if"
          ],
          "rows": [
            [
              "Can players act on a right before they see the Article?",
              "Think-aloud sessions with first-time voters, five per round",
              "They explain the right in their own words"
            ],
            [
              "Does Guru get used, or skipped?",
              "Prototype analytics: hints per card",
              "Hints rise on hard cards and fall on replays"
            ],
            [
              "Do streaks bring people back, or just guilt them?",
              "Two-week diary study",
              "They return without a reminder"
            ],
            [
              "Is one language enough per region?",
              "The same arc in three languages",
              "Scores hold across languages"
            ]
          ]
        },
        {
          "type": "sources",
          "items": [
            {
              "label": "Vidhi Centre for Legal Policy, SARAL Survey Report, 2025",
              "url": "https://saral.vidhilegalpolicy.in/docs/SARAL-Survey-Report-2025.pdf"
            },
            {
              "label": "IAMAI and Kantar, Internet in India 2024",
              "url": "https://www.iamai.in/sites/default/files/research/Kantar_%20IAMAI%20report_2024_.pdf"
            },
            {
              "label": "World Economic Forum, India’s constitution is 30 times longer than America’s, 2019",
              "url": "https://www.weforum.org/stories/2019/10/india-constitution-over-30-times-long-us/"
            },
            {
              "label": "Sailer and Homner, The Gamification of Learning: a Meta-analysis, Educational Psychology Review, 2020",
              "url": "https://link.springer.com/article/10.1007/s10648-019-09498-w"
            },
            {
              "label": "Nyaaya, India’s laws explained",
              "url": "https://nyaaya.org/"
            }
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
