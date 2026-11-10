/* =====================================================================
   SITE CONTENT. Written by the editor (edit.html), so it is plain data:
   no comments inside, keys and strings in double quotes.
   Edit it in the editor; by hand works too if you keep it valid JSON.

   projects  order here = order on the Work page
     slug, title, year, summary, tags [], featured, hidden,
     cover, coverStyle "photo"|"diagram", coverAlt, pageCover false,
     meta { label: value }, body [ blocks ]  (block types: assets/js/project.js)
   notes     title, date "2026-11-05", tags [], related (a project slug),
             url (makes it a link note), body (blank line = new paragraph)
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
      "year": "",
      "summary": "",
      "cover": "",
      "meta": {
        "Role": "",
        "Team": "",
        "Tools": "",
        "Duration": ""
      },
      "body": []
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
      "summary": "",
      "cover": "",
      "meta": {
        "Role": "",
        "Team": "",
        "Tools": "",
        "Duration": ""
      },
      "body": []
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
      "title": "Mind–Body Disconnect",
      "date": "",
      "tags": [],
      "related": "",
      "url": "",
      "body": ""
    }
  ]
};
