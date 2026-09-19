import { AvatarOption, Mission, CareerCluster } from './types';

export const AVATARS: AvatarOption[] = [
  {
    id: 'explorer',
    name: 'The Explorer',
    tagline: 'Curious • Adaptive • Bold',
    emoji: '🧭',
    gradient: 'from-cyan-500 to-blue-600',
    ring: 'ring-cyan-400',
    initTraits: { O: 1, RISK: 1 },
  },
  {
    id: 'engineer',
    name: 'The Engineer',
    tagline: 'Precise • Methodical • Reliable',
    emoji: '⚙️',
    gradient: 'from-violet-500 to-purple-700',
    ring: 'ring-violet-400',
    initTraits: { C: 1, R: 1 },
  },
  {
    id: 'strategist',
    name: 'The Strategist',
    tagline: 'Decisive • Visionary • Calculated',
    emoji: '♟️',
    gradient: 'from-amber-400 to-orange-600',
    ring: 'ring-amber-400',
    initTraits: { DEC: 1, EN: 1 },
  },
  {
    id: 'creator',
    name: 'The Creator',
    tagline: 'Original • Expressive • Intuitive',
    emoji: '🎨',
    gradient: 'from-pink-500 to-rose-600',
    ring: 'ring-pink-400',
    initTraits: { AR: 1, O: 1 },
  },
];

export const MISSIONS: Mission[] = [
  {
    id: 'mission_1',
    number: 1,
    title: 'Alien Pattern Hunt',
    subtitle: 'Domain 1 • Aptitude',
    category: 'aptitude',
    categoryLabel: 'Spatial Ability',
    xpReward: 100,
    categoryColor: 'from-cyan-500 to-blue-600',
    categoryBg: 'bg-cyan-500/10',
    categoryBorder: 'border-cyan-500/30',
    categoryText: 'text-cyan-400',
    setup: 'You have entered an ancient temple in search of hidden treasure. Follow the directions correctly to find the treasure chest.\n\nClues:\n• Move North\n• Turn Right\n• Walk two blocks\n• Turn Left\n\nWhere are you now?',
    imageUrl: '/assets/alien_map_1785491193474.png',
    type: 'basic_choice',
    choices: [
      { id: 'c1', text: 'Facing North, two blocks East of start', subtext: 'Correctly traces all four directions', traits: { R: 2, I: 1 }, highlight: true },
      { id: 'c2', text: 'Facing East, one block North of start', subtext: 'Partial trace — misses the final turn', traits: {}, highlight: false },
      { id: 'c3', text: 'Facing South, two blocks East of start', subtext: 'Incorrect final facing direction', traits: {}, highlight: false },
      { id: 'c4', text: 'Facing North, two blocks West of start', subtext: 'Incorrect East/West orientation', traits: {}, highlight: false },
    ],
  },
  {
    id: 'mission_2',
    number: 2,
    title: 'Escape Room: Number Vault',
    subtitle: 'Domain 1 • Aptitude',
    category: 'aptitude',
    categoryLabel: 'Logical Reasoning',
    xpReward: 120,
    categoryColor: 'from-cyan-500 to-blue-600',
    categoryBg: 'bg-cyan-500/10',
    categoryBorder: 'border-cyan-500/30',
    categoryText: 'text-cyan-400',
    setup: 'You are trapped inside a futuristic research facility. The Number Vault door is sealed. Find the missing element in the grid to escape.',
    imageUrl: '/assets/visual_sequence_1785491204435.png',
    type: 'pattern_grid',
    grid: [
      { shape: 'sq', n: 3 }, { shape: 'sq', n: 6 }, { shape: 'sq', n: 12 },
      { shape: 'ci', n: 6 }, { shape: 'ci', n: 12 }, { shape: 'ci', n: 24 },
      { shape: 'tr', n: 12 }, { shape: 'tr', n: 24 }, null,
    ],
    choicesForGrid: [
      { id: 'g1', shape: 'tr', n: 36, correct: false },
      { id: 'g2', shape: 'tr', n: 48, correct: true },
      { id: 'g3', shape: 'ci', n: 48, correct: false },
      { id: 'g4', shape: 'tr', n: 30, correct: false },
    ],
    hint: 'Each row doubles: 3→6→12, 6→12→24. What comes after 12 and 24?',
  },
  {
    id: 'mission_3',
    number: 3,
    title: 'Design Your Dream Workspace',
    subtitle: 'Domain 2 • Personality',
    category: 'personality',
    categoryLabel: 'Personality Mapping',
    xpReward: 120,
    categoryColor: 'from-pink-500 to-rose-600',
    categoryBg: 'bg-pink-500/10',
    categoryBorder: 'border-pink-500/30',
    categoryText: 'text-pink-400',
    setup: 'Imagine you have been given your own workspace where you will spend most of your day. Choose up to 5 items that you would enjoy having around you.',
    type: 'workspace_builder',
    maxSelections: 5,
    items: [
      { id: 'w1',  label: 'Whiteboard',             icon: '📋', desc: 'Planning & Organisation',          traits: { C: 2, EN: 1 } },
      { id: 'w2',  label: 'Robotics Kit',            icon: '🤖', desc: 'Learning Agility & Creativity',    traits: { O: 2, I: 1 } },
      { id: 'w3',  label: 'Bean Bag Corner',         icon: '🛋️', desc: 'Adaptability & Creativity',        traits: { A: 1, O: 1 } },
      { id: 'w4',  label: 'Library Shelf',           icon: '📚', desc: 'Learning Agility & Achievement',   traits: { C: 1, I: 1 } },
      { id: 'w5',  label: 'Plants',                  icon: '🌿', desc: 'Emotional Stability',              traits: { STR: 2, C: 1 } },
      { id: 'w6',  label: 'Team Discussion Table',   icon: '👥', desc: 'Collaboration & Leadership',       traits: { E: 2, A: 1 } },
      { id: 'w7',  label: 'VR Gaming Station',       icon: '🥽', desc: 'Creativity & Innovation',          traits: { O: 2, RISK: 1 } },
      { id: 'w8',  label: 'Digital Drawing Tablet',  icon: '🎨', desc: 'Creativity & Initiative',          traits: { AR: 2, O: 1 } },
      { id: 'w9',  label: 'Project Planner Board',   icon: '📊', desc: 'Conscientiousness',                traits: { C: 2, DEC: 1 } },
      { id: 'w10', label: 'Coffee Corner',           icon: '☕', desc: 'Collaboration & Communication',    traits: { E: 1, SO: 2 } },
      { id: 'w11', label: 'Meditation Space',        icon: '🧘', desc: 'Adaptability & Regulation',        traits: { STR: 2, A: 1 } },
      { id: 'w12', label: '3D Printer',              icon: '🖨️', desc: 'Creativity & Learning Agility',    traits: { O: 2, I: 1 } },
      { id: 'w13', label: 'Art Wall',                icon: '🖼️', desc: 'Creativity & Openness',            traits: { AR: 2, O: 1 } },
      { id: 'w14', label: 'Award Display',           icon: '🏆', desc: 'Achievement & Leadership',         traits: { EN: 2, C: 1 } },
    ],
  },
  {
    id: 'mission_4',
    number: 4,
    title: 'Weekend Adventure',
    subtitle: 'Domain 2 • Personality',
    category: 'personality',
    categoryLabel: 'Behavioural Tendencies',
    xpReward: 100,
    categoryColor: 'from-pink-500 to-rose-600',
    categoryBg: 'bg-pink-500/10',
    categoryBorder: 'border-pink-500/30',
    categoryText: 'text-pink-400',
    setup: 'You have an entire weekend free. Choose the activity you would genuinely enjoy the most.',
    type: 'basic_choice',
    choices: [
      { id: 'wa1', text: 'Organise a charity event',          subtext: 'Leadership, Initiative, Collaboration',         traits: { EN: 2, SO: 1 } },
      { id: 'wa2', text: 'Learn video editing',               subtext: 'Learning Agility, Creativity',                  traits: { O: 2, I: 1 } },
      { id: 'wa3', text: 'Build a robot',                     subtext: 'Achievement, Problem Solving',                  traits: { I: 2, C: 1 } },
      { id: 'wa4', text: 'Play sports all weekend',           subtext: 'Achievement, Teamwork, Resilience',             traits: { E: 2, STR: 1 } },
      { id: 'wa5', text: 'Read an interesting book',          subtext: 'Learning Agility, Conscientiousness',           traits: { O: 1, C: 2 } },
      { id: 'wa6', text: 'Paint a mural',                     subtext: 'Creativity, Adaptability',                      traits: { AR: 2, A: 1 } },
      { id: 'wa7', text: 'Volunteer at an animal shelter',    subtext: 'Collaboration, Empathy',                        traits: { SO: 2, A: 1 } },
      { id: 'wa8', text: 'Start selling handmade products online', subtext: 'Initiative, Risk Tolerance',               traits: { RISK: 2, EN: 1 } },
    ],
  },
  {
    id: 'mission_5',
    number: 5,
    title: 'Mystery Object',
    subtitle: 'Domain 3 • Career Interest',
    category: 'interest',
    categoryLabel: 'Field Identification',
    xpReward: 100,
    categoryColor: 'from-emerald-400 to-teal-600',
    categoryBg: 'bg-emerald-500/10',
    categoryBorder: 'border-emerald-500/30',
    categoryText: 'text-emerald-400',
    setup: 'An object appears on your screen: 🔬 A Microscope. Select the activity you would most enjoy doing with it.',
    imageUrl: '/assets/microscope_1785491214994.png',
    type: 'internship_cards',
    internshipChoices: [
      { id: 'mo1', title: 'Discover new bacteria',          icon: '🧬', desc: 'Medical Research • Microbiology • Biotech',       tags: ['Research','Biotech'],   gradient: 'from-cyan-900/80 to-blue-950',  border: 'border-cyan-500/40',   glow: 'rgba(6,182,212,0.3)',  traits: { I: 3, R: 2 } },
      { id: 'mo2', title: 'Teach students how it works',   icon: '👨‍🏫', desc: 'Education • Communication',                       tags: ['Education','Teaching'], gradient: 'from-pink-900/80 to-rose-950',  border: 'border-pink-500/40',   glow: 'rgba(236,72,153,0.3)', traits: { SO: 3, E: 2 } },
      { id: 'mo3', title: 'Design a better microscope',    icon: '⚙️',  desc: 'Biomedical Engineering • Product Design',          tags: ['Engineering','Design'], gradient: 'from-emerald-900/80 to-teal-950', border: 'border-emerald-500/40', glow: 'rgba(16,185,129,0.3)', traits: { R: 3, AR: 1 } },
      { id: 'mo4', title: 'Write about discoveries',       icon: '📝',  desc: 'Science Communication • Journalism',               tags: ['Writing','Media'],      gradient: 'from-amber-900/80 to-orange-950', border: 'border-amber-500/40',  glow: 'rgba(245,158,11,0.3)', traits: { AR: 2, O: 2 } },
    ],
  },
  {
    id: 'mission_6',
    number: 6,
    title: 'Internship Quest',
    subtitle: 'Domain 3 • Career Interest',
    category: 'interest',
    categoryLabel: 'Career Clustering',
    xpReward: 120,
    categoryColor: 'from-emerald-400 to-teal-600',
    categoryBg: 'bg-emerald-500/10',
    categoryBorder: 'border-emerald-500/30',
    categoryText: 'text-emerald-400',
    setup: 'Imagine you have received offers from all the internships below, but you can choose only one.',
    type: 'internship_cards',
    internshipChoices: [
      { id: 'iq1', title: 'Space Research Centre',   icon: '🚀', desc: 'Aerospace Engineering • Physics',            tags: ['STEM','Physics'],     gradient: 'from-cyan-900/80 to-blue-950',    border: 'border-cyan-500/40',    glow: 'rgba(6,182,212,0.3)',   traits: { I: 3, R: 2 } },
      { id: 'iq2', title: 'Animation Studio',        icon: '🎨', desc: 'Design & Creative Arts • Visual Effects',    tags: ['Design','Gaming'],    gradient: 'from-pink-900/80 to-rose-950',    border: 'border-pink-500/40',    glow: 'rgba(236,72,153,0.3)',  traits: { AR: 3, O: 2 } },
      { id: 'iq3', title: 'Startup Incubator',       icon: '💡', desc: 'Business & Entrepreneurship',               tags: ['Business','Startup'], gradient: 'from-emerald-900/80 to-teal-950', border: 'border-emerald-500/40', glow: 'rgba(16,185,129,0.3)', traits: { EN: 3, RISK: 2 } },
      { id: 'iq4', title: 'International NGO',       icon: '🌐', desc: 'Social Sciences • Public Policy',            tags: ['Social','Policy'],    gradient: 'from-amber-900/80 to-orange-950', border: 'border-amber-500/40',   glow: 'rgba(245,158,11,0.3)',  traits: { SO: 3, A: 2 } },
      { id: 'iq5', title: 'Wildlife Rescue Camp',    icon: '🐾', desc: 'Environment & Sustainability • Zoology',     tags: ['Env','Science'],      gradient: 'from-lime-900/80 to-green-950',   border: 'border-lime-500/40',    glow: 'rgba(132,204,22,0.3)',  traits: { R: 2, A: 1 } },
      { id: 'iq6', title: 'Hospital',                icon: '🏥', desc: 'Healthcare • Medicine • Psychology',         tags: ['Health','Medicine'],  gradient: 'from-teal-900/80 to-cyan-950',   border: 'border-teal-500/40',    glow: 'rgba(20,184,166,0.3)',  traits: { I: 2, SO: 2 } },
    ],
  },
  {
    id: 'mission_7',
    number: 7,
    title: 'Reading Between the Lines',
    subtitle: 'Domain 4 • Emotional Intelligence',
    category: 'ei',
    categoryLabel: 'Empathy & Awareness',
    xpReward: 110,
    categoryColor: 'from-violet-500 to-purple-700',
    categoryBg: 'bg-violet-500/10',
    categoryBorder: 'border-violet-500/30',
    categoryText: 'text-violet-400',
    setup: 'Read the conversation carefully. Think about what the person might actually be feeling. Choose the response you are most likely to make.',
    type: 'scenario',
    character: {
      name: 'Riya',
      role: 'Teammate',
      avatar: '👩‍💻',
      message: "I'm fine. Let's just finish the project.",
      context: 'A week before the exhibition, Riya suddenly becomes quiet. She contributes very little and starts making unusual mistakes.',
    },
    scenarioChoices: [
      { id: 'ei1', text: 'Continue with the project since she said she is fine.', subtext: 'Respects boundaries but limited emotional awareness.', traits: { A: -1, IND: 1 }, response: 'You focus on the work, but Riya remains disengaged.', branch: null },
      { id: 'ei2', text: 'Ask if she needs help with the project work.', subtext: 'Empathy, Supportiveness.', traits: { A: 1, SO: 1 }, response: 'She declines the help, but seems slightly appreciative.', branch: null },
      {
        id: 'ei3',
        text: 'Privately tell her you noticed a change and are available to talk.',
        subtext: 'Empathy, Emotional Awareness, Respect for Boundaries.',
        traits: { E: 2, A: 2, SO: 2 },
        response: null,
        branch: {
          title: 'A Private Conversation',
          narrative: [
            'You pull Riya aside after the meeting and gently mention that you noticed she seems stressed.',
            'She hesitates, then admits she is overwhelmed with family issues and struggling to focus.',
            'Because you gave her a safe space without pressure, she felt comfortable opening up.',
            'You adjust the project timeline together to give her some breathing room.',
          ],
          resolution: 'Riya thanks you for understanding. The project gets done, and your teamwork is stronger than ever.',
          bonusTraits: { SO: 2, A: 1 },
          bonusXP: 30,
        },
      },
      { id: 'ei4', text: 'Inform the team lead immediately because something seems wrong.', subtext: 'Concern for wellbeing, but may bypass personal autonomy.', traits: { C: 1, EN: 1 }, response: 'The lead intervenes. Riya is helped, but feels slightly embarrassed.', branch: null },
    ],
  },
  {
    id: 'mission_8',
    number: 8,
    title: 'Hidden Feelings',
    subtitle: 'Domain 4 • Emotional Intelligence',
    category: 'ei',
    categoryLabel: 'Relationship Management',
    xpReward: 110,
    categoryColor: 'from-violet-500 to-purple-700',
    categoryBg: 'bg-violet-500/10',
    categoryBorder: 'border-violet-500/30',
    categoryText: 'text-violet-400',
    setup: 'You will see a short interaction. Choose the response that best balances your own goals with sensitivity toward others.',
    type: 'scenario',
    character: {
      name: 'Best Friend',
      role: 'Peer',
      avatar: '🧑‍🤝‍🧑',
      message: "Hey, congratulations on getting the Lead Captain role. You'll be great.",
      context: 'You and your best friend both applied. You were selected. Your friend congratulates you but becomes unusually quiet and avoids talking during lunch.',
    },
    scenarioChoices: [
      { id: 'hf1', text: 'Assume they just need some time and continue as usual.', subtext: 'Respects space but limited emotional engagement.', traits: { IND: 1 }, response: 'Things are awkward for a few days, but eventually return to normal.', branch: null },
      { id: 'hf2', text: 'Send a message later saying you hope they are okay.', subtext: 'Empathy, Respect for Boundaries.', traits: { A: 1, SO: 1 }, response: 'They reply later appreciating the message.', branch: null },
      {
        id: 'hf3',
        text: 'Acknowledge the result may be disappointing while expressing friendship.',
        subtext: 'Emotional Validation, Empathy.',
        traits: { E: 2, A: 2, SO: 2 },
        response: null,
        branch: {
          title: 'Honest Conversation',
          narrative: [
            '"I know you really wanted this too," you say. "And honestly, you would have been amazing. Our friendship matters more to me than any title."',
            'Your friend sighs. "Yeah. I am happy for you, I just feel a bit bummed about myself right now."',
            '"That makes total sense," you reply.',
            'Just acknowledging the reality clears the air between you.',
          ],
          resolution: 'The tension dissolves. By the end of lunch, you are joking around again.',
          bonusTraits: { SO: 2, A: 1 },
          bonusXP: 30,
        },
      },
      { id: 'hf4', text: 'Celebrate while finding a meaningful way to include your friend.', subtext: 'Relationship Management, Leadership.', traits: { EN: 2, SO: 2 }, response: 'Your friend feels valued and joins you enthusiastically.', branch: null },
    ],
  },
  {
    id: 'mission_9',
    number: 9,
    title: 'Mission Manager',
    subtitle: 'Domain 5 • Career Approach',
    category: 'approach',
    categoryLabel: 'Resourcefulness',
    xpReward: 130,
    categoryColor: 'from-amber-400 to-orange-600',
    categoryBg: 'bg-amber-500/10',
    categoryBorder: 'border-amber-500/30',
    categoryText: 'text-amber-400',
    setup: 'You have: ₹20,000 • 10 volunteers • 5 days. Your goal is to organise a Community Science Exhibition.',
    type: 'budget_sim',
    budget: 20000,
    categories: [
      { id: 'venue',        label: 'Venue',        icon: '🏛️', defaultPct: 40 },
      { id: 'publicity',   label: 'Publicity',     icon: '📢', defaultPct: 20 },
      { id: 'materials',   label: 'Materials',     icon: '📦', defaultPct: 25 },
      { id: 'refreshments',label: 'Refreshments',  icon: '🥪', defaultPct: 15 },
    ],
    crisisTitle: 'Stage 2: Unexpected Event',
    crisisEvent: '⚠️ Three of your volunteers just cancelled. Choose ONE option.',
    crisisChoices: [
      { id: 'cr1', text: 'Recruit new volunteers',      icon: '🤝', subtext: 'Initiative',    traits: { EN: 2, DEC: 1 } },
      { id: 'cr2', text: 'Reassign responsibilities',   icon: '📋', subtext: 'Leadership',    traits: { C: 2, SO: 1 } },
      { id: 'cr3', text: 'Reduce event size',           icon: '📉', subtext: 'Adaptability',  traits: { RISK: -1, A: 1 } },
      { id: 'cr4', text: 'Extend work hours',           icon: '⏳', subtext: 'Ownership',     traits: { C: 1, IND: 1 } },
    ],
  },
  {
    id: 'mission_10',
    number: 10,
    title: 'Startup Challenge',
    subtitle: 'Domain 5 • Career Approach',
    category: 'approach',
    categoryLabel: 'Entrepreneurial Orientation',
    xpReward: 200,
    categoryColor: 'from-amber-400 to-orange-600',
    categoryBg: 'bg-amber-500/10',
    categoryBorder: 'border-amber-500/30',
    categoryText: 'text-amber-400',
    setup: 'You have been selected for the Young Entrepreneurs Challenge. Build a startup that solves a real-world problem.',
    type: 'multi_step',
    steps: [
      {
        title: 'Step 1 of 4: Identify the Opportunity',
        prompt: 'Choose the problem you would like to solve.',
        choices: [
          { text: 'Students struggle to manage their study schedules.',   subtext: 'Opportunity Recognition, Problem Solving', traits: { I: 2, C: 1 } },
          { text: 'Local businesses need better online visibility.',       subtext: 'Business Orientation',                    traits: { EN: 2, CO: 1 } },
          { text: 'Households generate too much plastic waste.',           subtext: 'Social Innovation, Sustainability',        traits: { O: 2, A: 1 } },
          { text: 'Elderly people find technology difficult to use.',      subtext: 'Empathy, Human-Centred Innovation',        traits: { SO: 2, E: 1 } },
        ],
      },
      {
        title: 'Step 2 of 4: Your First Action',
        prompt: 'What would you do first?',
        choices: [
          { text: 'Speak to potential users to understand their needs.',   subtext: 'Customer Orientation', traits: { SO: 2, E: 1 } },
          { text: 'Research existing competitors and similar solutions.',  subtext: 'Planning, Analytical Thinking', traits: { I: 2, C: 2 } },
          { text: 'Build a quick prototype to test the idea.',             subtext: 'Initiative, Innovation', traits: { AR: 2, RISK: 1 } },
          { text: 'Form a team with people having different skills.',      subtext: 'Leadership, Collaboration', traits: { EN: 2, A: 1 } },
        ],
      },
      {
        title: 'Step 3 of 4: Investor Decision',
        prompt: 'An investor offers funding but wants 40% ownership. What would you do?',
        choices: [
          { text: 'Accept the offer immediately to secure funding.',  subtext: 'Risk Orientation, Decision Making', traits: { DEC: 2, RISK: 2 } },
          { text: 'Negotiate for a smaller ownership share.',         subtext: 'Negotiation, Strategic Thinking', traits: { EN: 2, CO: 1 } },
          { text: 'Decline and look for alternative funding.',        subtext: 'Independence, Risk Tolerance', traits: { IND: 2, RISK: 1 } },
          { text: 'Discuss the offer with mentors or your team.',     subtext: 'Collaborative Decision Making', traits: { A: 2, SO: 1 } },
        ],
      },
      {
        title: 'Step 4 of 4: Measuring Success',
        prompt: 'After six months, what outcome would make you feel the most successful?',
        choices: [
          { text: 'Having the highest number of satisfied users.',         subtext: 'Customer Orientation', traits: { SO: 2, E: 1 } },
          { text: 'Generating consistent profits.',                        subtext: 'Business Orientation', traits: { CO: 2, C: 1 } },
          { text: 'Creating a solution that positively impacts society.',  subtext: 'Purpose Orientation', traits: { A: 2, O: 1 } },
          { text: 'Building a strong and motivated team.',                 subtext: 'Leadership, People Orientation', traits: { EN: 2, SO: 1 } },
        ],
      },
    ],
  },
];

export const CAREER_CLUSTERS: CareerCluster[] = [
  {
    id: 'data',
    title: 'Data & Research',
    icon: '📊',
    color: '#00e5ff',
    gradient: 'from-cyan-500 to-blue-600',
    desc: 'Turn complexity into clarity through analysis and empirical evidence.',
    roles: ['Data Analyst', 'Research Associate', 'BI Developer', 'QA Architect'],
    triggers: { primary: ['I', 'C'], secondary: ['CO', 'R'] },
  },
  {
    id: 'creative',
    title: 'Design & Creative',
    icon: '🎨',
    color: '#ff6b9d',
    gradient: 'from-pink-500 to-rose-600',
    desc: 'Shape experiences, tell stories, and define how interfaces and brands feel.',
    roles: ['UX Designer', 'Content Strategist', 'Brand Designer', 'Product Designer'],
    triggers: { primary: ['AR', 'O'], secondary: ['E', 'SO'] },
  },
  {
    id: 'product',
    title: 'Product & Strategy',
    icon: '🚀',
    color: '#ffbe0b',
    gradient: 'from-amber-400 to-orange-600',
    desc: 'Define what gets built, prioritize what matters, and navigate market ambiguity.',
    roles: ['Product Manager', 'Growth Analyst', 'Business Strategist', 'Startup Generalist'],
    triggers: { primary: ['EN', 'DEC'], secondary: ['RISK', 'O'] },
  },
  {
    id: 'people',
    title: 'People & Culture',
    icon: '🤝',
    color: '#00ff9d',
    gradient: 'from-emerald-400 to-teal-600',
    desc: 'Build high-trust teams and systems that empower talent to do their best work.',
    roles: ['Talent Partner', 'Customer Success Lead', 'Team Facilitator', 'L&D Specialist'],
    triggers: { primary: ['SO', 'A'], secondary: ['E', 'CO'] },
  },
  {
    id: 'ops',
    title: 'Operations & Finance',
    icon: '⚙️',
    color: '#a78bfa',
    gradient: 'from-violet-500 to-purple-700',
    desc: 'Make systems work reliably, efficiently, and at global enterprise scale.',
    roles: ['Operations Analyst', 'Finance Associate', 'Project Coordinator', 'Process Designer'],
    triggers: { primary: ['CO', 'C'], secondary: ['R', 'AMB'] },
  },
  {
    id: 'tech',
    title: 'Engineering & Technology',
    icon: '💻',
    color: '#7c6dfa',
    gradient: 'from-indigo-500 to-violet-700',
    desc: 'Build the resilient infrastructure, algorithms, and logic that power everything else.',
    roles: ['Software Engineer', 'DevOps Engineer', 'Systems Architect', 'Technical Lead'],
    triggers: { primary: ['R', 'I'], secondary: ['C', 'IND'] },
  },
];

export const RANGES: Record<string, { min: number; max: number }> = {
  O:    { min: -2, max: 10 },
  C:    { min: -3, max: 12 },
  E:    { min: -2, max: 8  },
  A:    { min: -2, max: 10 },
  STR:  { min: -3, max: 6  },
  R:    { min: -1, max: 8  },
  I:    { min: 0,  max: 8  },
  AR:   { min: 0,  max: 8  },
  SO:   { min: 0,  max: 12 },
  EN:   { min: -2, max: 10 },
  CO:   { min: 0,  max: 8  },
  RISK: { min: -2, max: 6  },
  DEC:  { min: -1, max: 6  },
  IND:  { min: -4, max: 6  },
  AMB:  { min: -1, max: 4  },
};

export function normalizeTrait(rawVal: number, trait: string): number {
  const { min, max } = RANGES[trait] || { min: 0, max: 10 };
  if (max === min) return 50;
  return Math.max(0, Math.min(100, Math.round(((rawVal - min) / (max - min)) * 100)));
}

export function computeCareerMatches(scores: Record<string, number>): CareerCluster[] {
  return CAREER_CLUSTERS.map((cluster) => {
    const primaryScore = cluster.triggers.primary.reduce((sum, t) => sum + (scores[t] || 0), 0);
    const secondaryScore = cluster.triggers.secondary.reduce((sum, t) => sum + (scores[t] || 0), 0);
    const raw = (primaryScore * 2 + secondaryScore) / (cluster.triggers.primary.length * 2 + cluster.triggers.secondary.length);
    return { ...cluster, matchPct: Math.max(35, Math.min(98, Math.round(raw))) };
  }).sort((a, b) => (b.matchPct || 0) - (a.matchPct || 0));
}

/**
 * Adapter mapping the comprehensive psychometric traits into SkillRadar's 4 core dimensions:
 * LEADERSHIP, ADAPTABILITY, ANALYTICAL_THINKING, COLLABORATION
 */
export function computeSkillRadarCoreTraits(normScores: Record<string, number>): Record<string, number> {
  const en = normScores['EN'] ?? 60;
  const dec = normScores['DEC'] ?? 60;
  const e = normScores['E'] ?? 60;
  const leadership = Math.round(en * 0.45 + dec * 0.35 + e * 0.2);

  const a = normScores['A'] ?? 65;
  const o = normScores['O'] ?? 65;
  const risk = normScores['RISK'] ?? 60;
  const adaptability = Math.round(a * 0.35 + o * 0.4 + risk * 0.25);

  const i = normScores['I'] ?? 70;
  const c = normScores['C'] ?? 70;
  const r = normScores['R'] ?? 65;
  const analytical = Math.round(i * 0.5 + c * 0.3 + r * 0.2);

  const so = normScores['SO'] ?? 70;
  const agree = normScores['A'] ?? 70;
  const extra = normScores['E'] ?? 65;
  const collaboration = Math.round(so * 0.45 + agree * 0.35 + extra * 0.2);

  return {
    LEADERSHIP: Math.max(20, Math.min(100, leadership)),
    ADAPTABILITY: Math.max(20, Math.min(100, adaptability)),
    ANALYTICAL_THINKING: Math.max(20, Math.min(100, analytical)),
    COLLABORATION: Math.max(20, Math.min(100, collaboration)),
  };
}
