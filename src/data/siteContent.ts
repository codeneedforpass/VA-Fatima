export const brand = {
  name: 'Fatima Francisco',
  title: 'Freelance Virtual Assistant',
  tagline:
    'Corporate-grade discipline with remote-first flexibility — admin, creative, and customer operations for founders and small teams.',
  email: 'mailto:yourvafatimafrancisco@gmail.com',
} as const;

export const about = {
  headline: 'About me',
  paragraphs: [
    "Hi, I'm Fatima. I have over 12 years of professional experience in corporate settings and 5 years thriving in the remote work scene.",
    'I am passionate about supporting small businesses as a virtual assistant, specializing in email management, social media maintenance, and customer service.',
    'In 2023, I launched Fatima and Friends with a clear mission: to empower aspiring VA parents to reclaim precious family time while making a meaningful impact by supporting small business owners in their daily operations.',
  ],
  quote:
    "One of my favorite quotes is, \"Don't be afraid to fail; be afraid not to try.\" It's a constant reminder to keep moving forward and embrace every opportunity.",
} as const;

export const experienceColumns = [
  {
    id: 'corporate',
    label: 'Corporate',
    employers: [
      {
        company: 'JPMorgan Chase & Co.',
        roles: [
          {title: 'Client Ops Specialist I', range: 'Aug 2020 – Feb 2021'},
          {title: 'Senior Specialist I', range: 'Mar 2020 – Aug 2020'},
          {title: 'Fraud Recovery', range: 'May 2018 – Mar 2020'},
          {title: 'Merchant Dispute Specialist', range: 'Sep 2016 – May 2018'},
        ],
      },
      {
        company: 'Alorica',
        roles: [
          {title: 'Quality Coach', range: '2011 – 2016'},
          {title: 'Inbound Financial Care Specialist', range: '2010 – 2011'},
          {title: 'Collections Specialist', range: '2009 – 2010'},
        ],
      },
    ],
  },
  {
    id: 'agency',
    label: 'Agency',
    employers: [
      {
        company: 'Awesome Outsourcing, LLC',
        roles: [{title: 'General Virtual Assistant', range: 'Apr 2021 – Jul 2022'}],
      },
    ],
  },
  {
    id: 'independent',
    label: 'Independent contract',
    employers: [
      {
        company: '716 Realty Group WNY',
        roles: [{title: 'General Virtual Assistant — Admin Support', range: 'Mar 2023 – Dec 2024'}],
      },
      {
        company: 'The Customer Factor',
        roles: [{title: 'Phone Support / Operations Lead', range: 'Feb 2023 – Present'}],
      },
      {
        company: 'Upskills Qld',
        roles: [{title: 'General Virtual Assistant — Admin Support', range: 'Jan 2025 – Present'}],
      },
    ],
  },
] as const;

export const servicesOffered = [
  {
    title: 'Administrative assistance',
    items: [
      'Inbox & calendar management',
      'Lead generation & data mining',
      'Social media maintenance',
      'Short-term rental operations',
    ],
  },
  {
    title: 'Phone & email support',
    subtitle: 'Referral program',
    items: ['Customer support', 'Technical support'],
  },
  {
    title: 'Light video & audio editing',
    items: ['Podcast audio editing', 'YouTube vlogs, TikTok, Facebook / Instagram Reels'],
    footnote: 'Pricing varies by scope.',
  },
] as const;

export const testimonials = [
  {
    quote:
      'Fatima was an absolute joy to work with. She is incredibly hard-working and dedicated. She truly cared about making the company better. Whatever we needed, she figured out a way to make it happen.',
    name: 'Michelle Thompson',
    title: null as string | null,
  },
  {
    quote:
      'Fatima is a former colleague that I look up to; she excels in everything she does. She is a combination of hard work and competence. Her caliber as a trainer, team leader, and team manager is evident in her recognized accomplishments. She has grown professionally from the corporate domain to online business management. Her expertise is worth recommending — she carries a “can do it all” attitude and is always coming from a place of help, ready to take the burden off your shoulders.',
    name: 'Princess Mendoza',
    title: null as string | null,
  },
  {
    quote:
      'Two years later I am still repurposing and using things that you did for me. Your organization and design skills have continued to be useful to me all this time. Plus… your ability to train my next VA made the transition almost seamless!',
    name: 'Alison Riley Rodden',
    title: 'The Oddball Copywriter',
  },
] as const;

export const approach = {
  headline: 'Stop, start, continue',
  intro:
    'A simple retrospective rhythm I bring into operations: protect what works, experiment where it counts, and retire friction early.',
  pillars: [
    {
      label: 'Stop',
      body: 'Manual busywork, unclear handoffs, and tools that no longer match how the team actually works.',
    },
    {
      label: 'Start',
      body: 'Lightweight SOPs, clearer communication loops, and repeatable systems your VA (or team) can run without you in every thread.',
    },
    {
      label: 'Continue',
      body: 'High-trust client experiences, disciplined follow-through, and the creative assets that already perform.',
    },
  ],
} as const;

export const impactMetrics = {
  corporateYears: '12+',
  remoteYears: '5+',
  headline: 'Command center',
  sub:
    'From regulated financial operations to founder-led programs — one operator mindset across corporate, agency, and independent work.',
} as const;
