export const BLOG_CATEGORIES = [
  "All",
  "Culture",
  "Language Tips",
  "Career",
  "Travel",
  "Austrian Life",
  "Grammar",
] as const;

export const FEATURED_ARTICLES = [
  {
    image: "/CULTURE.png",
    category: "Culture",
    title: "5 Coffee House Phrases You Need in Vienna",
    description:
      "Navigate the iconic Viennese coffee culture with these essential linguistic tips and traditional etiquette guides.",
    featured: true,
  },
  {
    image: "/TIPS.png",
    category: "Tips",
    title: "Mastering German Articles",
    description:
      "Navigate the iconic Viennese coffee culture with these essential linguistic tips and traditional etiquette guides.",
  },
  {
    image: "/CAREER.png",
    category: "Career",
    title: "Working in Austria: Expectations",
    description:
      "Navigate the iconic Viennese coffee culture with these essential linguistic tips and traditional etiquette guides.",
  },
] as const;

export const TOP_ARTICLES = [
  {
    image: "/TRAVEL.png",
    category: "Travel",
    title: "Hidden Gems: The Salzburg Lakes District",
    description:
      "Beyond the city of music lies a turquoise paradise. We explore the lesser-known villages surrounding Lake Wolfgangsee.",
    author: "Johan V.",
    readTime: "8 min read",
  },
  {
    image: "/AUSTRIAN LIFE.png",
    category: "Austrian Life",
    title: "The Sweet Secrets of Austrian Pastry",
    description:
      "A deep dive into the history of the Sachertorte and why dessert is a non-negotiable course in any Austrian home.",
  },
] as const;

export const LATEST_ARTICLES = [
  {
    image: "/CULTURELATESTARTICLES.png",
    category: "Culture",
    title: "Linz: The Future of European Media Art",
    description:
      "How an industrial city transformed into the world's leading hub for digital art and innovation.",
    author: "Marc Weber",
    readTime: "4 min read",
  },
  {
    image: "/CATEERLTESTARTICLES.png",
    category: "Career",
    title: "Finding Your First Job in Graz",
    description:
      "A step-by-step guide to the Styrian labor market and the most in-demand skills for 2024.",
    author: "Elena Rossi",
    readTime: "6 min read",
  },
  {
    image: "/TRAVELLATESTARTCILES.png",
    category: "Travel",
    title: "Sustainable Tourism in Hallstatt",
    description:
      "How one of the world's most photographed villages is protecting its heritage for future generations.",
    author: "Peter Hoffmann",
    readTime: "7 min read",
  },
  {
    image: "/Grammar.png",
    category: "Grammar",
    title: "The Subjunctive II Made Easy",
    description:
      "Expressing wishes and polite requests doesn't have to be complicated. Our simplified breakdown.",
    author: "Katrin Schwarz",
    readTime: "5 min read",
  },
  {
    image: "/AUSTRIANLIFELATESTARTICALES.png",
    category: "Austrian Life",
    title: "Craftsmanship in the Bregenzerwald",
    description:
      "Discover the centuries-old woodworking traditions that define the identity of western Austria.",
    author: "Lukas Brunner",
    readTime: "8 min read",
  },
  {
    image: "/CULTRELATESTARTICLES2.png",
    category: "Culture",
    title: "Austria's Emerging Indie Game Scene",
    description:
      "Meet the developers in Vienna and Innsbruck who are making waves on the global gaming stage.",
    author: "Sophia Lang",
    readTime: "5 min read",
  },
] as const;

export const BLOG_DETAIL_POST = {
  slug: "coffee-house-phrases-vienna",
  category: "Culture",
  title: "5 Essential Coffee House Phrases for Your Visit to Vienna",
  description:
    "Navigate the iconic Viennese coffee culture with these essential linguistic tips and traditional etiquette guides.",
  image: "/CULTUREblog.png",
  author: {
    name: "Anna Steinhart",
    role: "Linguistics Expert",
    date: "May 24, 2026",
  },
  readTime: "6 min read",
  tableOfContents: [
    "The Melange",
    "Ordering Etiquette",
    "Paying the Bill",
    "Sweet Sidekicks",
  ],
  intro:
    'To step into a Viennese coffee house is to step into the "living room of the city." Unlike global chains where speed is the priority, here, time is the ultimate luxury. Understanding the linguistic nuances of this UNESCO-protected tradition is your key to a truly authentic experience.',
  quote: '"In Vienna, coffee is a reason to linger, not a reason to leave."',
  sections: [
    {
      title: "1. The Melange",
      paragraphs: [
        'While you might be tempted to order a "cappuccino," the local equivalent is the **Wiener Melange**. It consists of one part espresso and one part steamed milk, topped with a thin layer of milk foam. The subtle difference lies in the roast and the texture.',
        'How to order: "Einen Kleinen Brauner, bitte" for a single espresso with a side of cream, or "Eine Melange, bitte" for the classic experience.',
      ],
    },
    {
      title: "2. Ordering Etiquette",
      paragraphs: [
        "The relationship between a patron and the Herr Ober (the waiter) is defined by a specific kind of formal distance. Waiters in traditional cafes often wear tuxedos and pride themselves on a professional, sometimes brisk, efficiency.",
      ],
      tip: {
        title: "Language Tip",
        text: 'Address your waiter as "Herr Ober" to signal your respect for the tradition. Avoid waving your hand; a simple nod or eye contact is sufficient.',
      },
    },
    {
      title: "3. Paying the Bill",
      paragraphs: [
        "When you are ready to leave, do not expect the bill to be brought automatically. You must request it. In Vienna, it is customary to pay at the table.",
        'Use the phrase: "Zahlen, bitte!" (Pay, please). The waiter will usually ask if you are paying together or separately ("Zusammen oder getrennt?").',
      ],
    },
    {
      title: "4. Sweet Sidekicks",
      paragraphs: [
        "No coffee visit is complete without Mehlspeisen (pastries). From the legendary Sachertorte to the delicate Apfelstrudel, the language of sweets is just as important as the coffee itself.",
        "If you see a small glass of water alongside your coffee, don't be surprised. It is a traditional palate cleanser provided with every cup - a sign that you are welcome to sit for as long as you like.",
      ],
    },
  ],
  authorBio:
    "Anna has spent over a decade documenting the evolution of Central European dialects. She specializes in the intersection of language, tradition, and modern urban identity.",
} as const;

export const RELATED_JOURNAL_POSTS = [
  {
    image: "/jornal1.png",
    category: "Linguistics",
    title: "The Evolution of Viennese Dialects in Modern Tech",
    description:
      "How global connectivity is reshaping the unique accent of the Austrian capital...",
  },
  {
    image: "/jornal2.png",
    category: "Education",
    title: "Why Immersion Still Wins: A 2024 Study",
    description:
      "New research suggests that physical presence in a culture accelerates language acquisition by 40%...",
  },
  {
    image: "/jornal3.png",
    category: "Culture",
    title: "Hidden Gems: The Library District of Vienna",
    description:
      "Exploring the quiet corners where scholars have gathered for centuries to debate and dream...",
  },
] as const;
