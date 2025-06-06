import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  // discordBlack,
  // facebook,
  figma,
  file02,
  framer,
  homeSmile,
  // instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  // telegram,
  // twitter,
  nodejs,
  mongodb,
  css,
  react,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  // {
  //   id: "4",
  //   title: "New account",
  //   url: "#signup",
  //   onlyMobile: true,
  // },
  {
    id: "5",
    title: "Contact",
    url: "#pricing",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [nodejs, mongodb, css, react];

export const brainwaveServices = [
  "Website designing",
  "Website Development",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "AI Support",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2025",
    status: "Progress",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "User's ease to integrate ideas",
    text: "We are working towards letting users change the website without contacting the team.",
    date: "July 2025",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot integration",
    text: "Allow users to interact with a chatbot making it easier to maintain and enhance the website.",
    date: "Dec 2026",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with other platforms",
    text: "Working towards integrating AI tools and other platforms.",
    date: "May 2025",
    status: "done",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "With skilled developers and creative designers, we bring your ideas to life.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Development",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Management",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Landing Pages",
    description: "Just want a landing page?",
    price: "399*",
    features: [
      "Website from Scratch",
      "Hosting and domain management",
      "Priority Support via Call",
    ],
  },
  {
    id: "1",
    title: "E-Commerce Website",
    description: "Just manage the inventory, let us handle the technicals",
    price: "599*",
    features: [
      "Website and Dashboard access",
      "Dedicated Hosting",
      "Priority support via Call",
    ],
  },
  {
    id: "2",
    title: "Custom",
    description: "Something else? Contact us now",
    price: "799*",
    features: [
      "Website with All assets and source code",
      "Cloud Hosting",
      "Custom domain and Priority call support",
    ],
  },
];

export const benefits = [
  {
    id: "0",
    title: "Creative Websites",
    text: "It is our top prirority to make websites that are not only functional, but also look good to lure more customers.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Improve everyday",
    text: "We make continuous updates as per your demands starting at 100$/month.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Code is yours",
    text: "We provide source code for your websites.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Fast responding",
    text: "Let users quickly find answers to their questions, just a text or call away.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Training for maintenance",
    text: "We also provide training on how to maintain your website starting at 299$.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Reasonable Pricing",
    text: "We’re all about helping our customers succeed and giving the best support we can.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];
export const socials = [
  // {
  //   id: "0",
  //   title: "Discord",
  //   iconUrl: discordBlack,
  //   url: "#",
  // },
  // {
  //   id: "1",
  //   title: "Twitter",
  //   iconUrl: twitter,
  //   url: "#",
  // },
  // {
  //   id: "2",
  //   title: "Instagram",
  //   iconUrl: instagram,
  //   url: "#",
  // },
  // {
  //   id: "3",
  //   title: "Telegram",
  //   iconUrl: telegram,
  //   url: "#",
  // },
  // {
  //   id: "4",
  //   title: "Facebook",
  //   iconUrl: facebook,
  //   url: "#",
  // },
];
