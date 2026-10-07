// Single source of truth for Uppercore Kids courses.
// Landing cards, course details pages, the registration form and the
// confirmation page should all read from here, so a price or age range
// only ever changes in one place.
//
// `id` doubles as the URL slug: /courses/:id and /register?course=:id
//
// Prices are in naira: all parents, including UK parents, pay in NGN.
// 3 classes per week. Classes are 2 hours, except Scratch (1.5 hours).
// totalClasses = weeks x 3, totalHours = totalClasses x classHours.

export const uppercoreKidsCourses = [
  {
    id: "scratch-programming",
    title: "Scratch Programming",
    shortTitle: "Scratch",
    level: "Beginner",
    ageRange: "7–12 years",
    ageMin: 7,
    ageMax: 12,
    duration: "5 weeks",
    weeks: 5,
    sessions: "3 classes per week",
    sessionDuration: "1.5 hours per class",
    classHours: 1.5,
    totalClasses: 15,
    totalHours: 22.5,
    format: "Live online classes",
    price: { amount: 70000, currency: "NGN", display: "₦70,000" },

    tagline: "Turn screen time into creative time with coding.",
    description:
      "A fun, beginner-friendly introduction to programming using Scratch. Children create interactive stories, animations and simple games while building problem-solving and computational thinking skills.",

    whatTheyWillLearn: [
      "What programming means and how Scratch works",
      "Creating and controlling characters (sprites)",
      "Movement and animation",
      "Events, loops and conditions",
      "Variables and messages between sprites",
      "Building interactive stories and simple games",
      "Debugging and improving projects",
    ],

    projects: [
      "Interactive character animation",
      "Interactive story",
      "Dinosaur or adventure game",
      "Car racing or car-dodging game",
      "Final creative Scratch project",
    ],

    whatYouNeed: [
      "A laptop or tablet with internet access, available during lessons",
      "No previous coding experience",
      "No programming knowledge needed from parents",
    ],

    outcome:
      "By the end, your child can create simple interactive Scratch projects on their own and understands the basic ideas behind programming.",
    recommendedFor:
      "Children who enjoy games, stories, animation or technology, or who want to find out what coding is about.",
  },

  {
    id: "frontend-development",
    title: "Frontend Web Development",
    shortTitle: "Frontend Development",
    level: "Beginner",
    ageRange: "10–16 years",
    ageMin: 10,
    ageMax: 16,
    duration: "2 months (8 weeks)",
    weeks: 8,
    sessions: "3 classes per week",
    sessionDuration: "2 hours per class",
    classHours: 2,
    totalClasses: 24,
    totalHours: 48,
    format: "Live online classes",
    price: { amount: 125000, currency: "NGN", display: "₦125,000" },

    tagline: "Learn how websites are built and create your own.",
    description:
      "A practical introduction to web development. Children write real HTML and CSS to build and style web pages, and turn their own ideas into websites.",

    whatTheyWillLearn: [
      "How websites work",
      "HTML structure: headings, text, images, links and buttons",
      "CSS: colours, fonts, backgrounds and spacing",
      "Layouts, cards and navigation sections",
      "Responsive design basics",
      "Publishing and sharing a simple website",
    ],

    projects: [
      "Personal profile webpage",
      "Creative landing page",
      "Mini portfolio website",
      "Final personal website project",
    ],

    whatYouNeed: [
      "A laptop or desktop computer (recommended)",
      "Reliable internet access",
      "Basic computer skills and typing",
      "No previous web development experience",
    ],

    outcome:
      "By the end, your child understands how websites are structured and can build and style simple web pages with HTML and CSS.",
    recommendedFor:
      "Children who want to understand how websites are made, or who are ready to move from Scratch into real coding.",
  },

  {
    id: "ai-creation",
    title: "AI Creation for Kids",
    shortTitle: "AI Creation",
    level: "Beginner",
    ageRange: "9–16 years",
    ageMin: 9,
    ageMax: 16,
    duration: "6 weeks",
    weeks: 6,
    sessions: "3 classes per week",
    sessionDuration: "2 hours per class",
    classHours: 2,
    totalClasses: 18,
    totalHours: 36,
    format: "Live online classes",
    price: { amount: 85000, currency: "NGN", display: "₦85,000" },

    tagline: "Don’t just use AI. Learn to create with it.",
    description:
      "A practical introduction to artificial intelligence and creative AI tools. Children learn how AI works at a simple level and use it to make useful and creative digital projects.",

    whatTheyWillLearn: [
      "What AI is and how it’s used in everyday life",
      "Writing effective prompts",
      "Using AI for research, ideas and learning",
      "Creating stories, images and simple websites with AI tools",
      "Understanding what AI gets wrong",
      "Using AI responsibly and safely",
    ],

    projects: [
      "AI-generated story",
      "AI-assisted artwork",
      "Creative AI presentation",
      "Simple AI-assisted website",
      "Final AI creativity project",
    ],

    whatYouNeed: [
      "A laptop or tablet with internet access",
      "No previous AI experience",
      "Some AI tools have age limits and may need parental supervision",
      "Specific tools may change as the tools themselves change",
    ],

    outcome:
      "By the end, your child understands the basic idea of AI and can confidently use suitable AI tools to create, learn and solve simple problems.",
    recommendedFor:
      "Children curious about ChatGPT, AI images, AI websites or the future of technology.",
  },

  {
    id: "graphics-design",
    title: "Graphics Design",
    shortTitle: "Graphics Design",
    level: "Beginner",
    ageRange: "8–16 years",
    ageMin: 8,
    ageMax: 16,
    duration: "5 weeks",
    weeks: 5,
    sessions: "3 classes per week",
    sessionDuration: "2 hours per class",
    classHours: 2,
    totalClasses: 15,
    totalHours: 30,
    format: "Live online classes",
    price: { amount: 65000, currency: "NGN", display: "₦65,000" },

    tagline: "Turn ideas into designs people can see.",
    description:
      "A creative introduction to graphic design. Children learn the basics of visual communication and create posters, social media graphics and presentations.",

    whatTheyWillLearn: [
      "Basic design principles: colour, typography, layout and spacing",
      "Using images and visual elements",
      "Creating posters, social media graphics and presentations",
      "Basic branding concepts",
      "Using templates effectively",
      "Exporting and sharing designs",
    ],

    projects: [
      "Personal name/identity design",
      "Event poster",
      "Social media graphic",
      "Simple brand identity",
      "Final creative design project",
    ],

    whatYouNeed: [
      "A laptop or tablet",
      "No previous design experience",
      "Design tools may vary depending on availability and age suitability",
    ],

    outcome:
      "By the end, your child understands basic design principles and can create simple, attractive digital graphics.",
    recommendedFor:
      "Children who enjoy drawing, colour, social media content, posters or visual storytelling.",
  },

  {
    id: "data-analysis",
    title: "Data Analysis for Kids",
    shortTitle: "Data Analysis",
    level: "Beginner",
    ageRange: "11–17 years",
    ageMin: 11,
    ageMax: 17,
    duration: "2 months (8 weeks)",
    weeks: 8,
    sessions: "3 classes per week",
    sessionDuration: "2 hours per class",
    classHours: 2,
    totalClasses: 24,
    totalHours: 48,
    format: "Live online classes",
    price: { amount: 125000, currency: "NGN", display: "₦125,000" },

    tagline: "Learn how numbers can tell stories.",
    description:
      "An age-appropriate introduction to data analysis. Children learn to collect, organise, analyse and visualise information using spreadsheets and simple data concepts.",

    whatTheyWillLearn: [
      "What data is, and how to collect and organise it",
      "Spreadsheet basics: rows, columns, tables and formulas",
      "Sorting, filtering and finding patterns",
      "Basic averages and percentages",
      "Charts and graphs",
      "Presenting findings clearly",
    ],

    projects: [
      "Class or family survey",
      "Sports statistics analysis",
      "Personal spending or savings dataset",
      "Survey dashboard",
      "Final data storytelling project",
    ],

    whatYouNeed: [
      "A laptop or desktop computer (recommended)",
      "Basic maths and computer skills",
      "Comfort working with simple numbers",
    ],

    outcome:
      "By the end, your child can organise simple datasets, do basic analysis and explain their findings with charts.",
    recommendedFor:
      "Children who enjoy maths, numbers, patterns and problem solving, or who want to see how data is used in the real world.",
  },
];

// ------------------------------------------------------
// Programme-wide information (shown on every course page)
// ------------------------------------------------------

export const uppercoreKidsProgramme = {
  name: "Uppercore Kids",
  tagline: "Turn screen time into creative time.",
  description:
    "Uppercore Kids helps children discover technology and creative skills through practical, project-based learning. Instead of only using technology, they learn to build, create and solve problems with it.",

  howItWorks:
    "Live, interactive online classes: 3 classes a week (1.5 to 2 hours each, depending on the course). Children learn by building real projects throughout the course.",

  everyCourseNeeds: [
    "A reliable internet connection",
    "A suitable device (laptop, desktop or tablet, depending on the course)",
    "A quiet space during live classes",
    "Commitment to attend the scheduled sessions",
  ],

  notSure:
    "Not sure which course to choose? Tell us your child’s age and interests and we’ll recommend a good starting point.",
};

export const getCourse = (id) => uppercoreKidsCourses.find((c) => c.id === id);
