 export const skillsData = [
    { name: 'Frontend', value: 40, color: '#FACC15', percent:40 },
    { name: 'Backend', value: 35, color: '#38BDF8', percent: 35 },
    { name: 'Database', value: 15, color: '#F97316', percent:15 },
    { name: 'Others', value: 10, color: '#8B5CF6', percent: 10 }
  ];

 export const projectsData = [
    { stack: 'React', projects: 5, color: '#61DAFB' },
    { stack: 'Node.js', projects: 5, color: '#68A063' },
    { stack: 'GraphQL', projects: 1, color: '#E10098' },
    { stack: 'MongoDB', projects: 5, color: '#47A248' },
    { stack: 'TypeScript', projects: 3, color: '#3178C6' }
  ];

export const timelineData = [
  {
    id: 2,
    company: 'ChainWorks',
    role: 'Assistant Developer',
    period: 'Sept 2024 - Aug 2025',
    duration: 11,
    color: '#FACC15',
    skills: ['React', 'Node.js', 'GraphQL', 'Full-stack Development'],
    details: [
      'Developed and enhanced the Gyansopan (EdTech Platform), enabling course management and assignment distribution.',
      'Optimized frontend components for performance and reusability, implementing Redux for better state management.',
      'Improved backend API performance and resolved critical system bugs upon joining.',
      'Collaborated across teams to deliver scalable full-stack solutions using React.js, Node.js, Express.js, GraphQL, and MongoDB.'
    ]
  },
    {
    id: 1,
    company: 'Creative Galilio',
    role: 'Software Intern',
    period: 'Nov 2023 - Aug 2024',
    duration: 10,
    color: '#38BDF8',
    skills: ['Cocos Creator', 'JavaScript', 'UI/UX Design', 'Problem Solving'],
    details: [
      'Utilized Cocos Creator to develop small educational games.',
      'Collaborated in designing educational games, focusing on game mechanics and user interfaces.',
      'Resolved technical challenges and improved game performance through hands-on experience.'
    ]
  }
];

export const projectData = [
  {
    title: "ShopEasy - React E-Commerce",
    description:
      "A modern and user-friendly online shopping platform that enhances shopping experience and analytics tracking.",
    details: {
      Problem: "Many online stores are slow and confusing, frustrating users.",
      Solution:
        "Developed a React-based platform with lazy loading, smooth navigation, and integrated Google Analytics for tracking user behavior.",
      Tech: "React, Redux, JavaScript, HTML/CSS",
      Impact:
        "Users experienced faster load times, smoother navigation, and better engagement due to analytics insights.",
    },
    demoLink: "https://shopeasy-react.netlify.app/",
    githubLink: "https://github.com/Harikrishna3/ShopEasy-React",
    category: "E-Commerce",
    year: "2024",
  },
  ,
  {
    title: "My Portfolio Website",
    description:
      "A personal portfolio to showcase my projects, skills, and achievements with interactive UI and background animations.",
    details: {
      Problem:
        "I needed a professional way to present my work and experience online.",
      Solution:
        "Built a responsive React-based portfolio with dynamic project display, animated background, and interactive elements.",
      Tech: "React, JavaScript, CSS, Framer Motion, HTML",
      Impact:
        "A live, professional portfolio that highlights my skills, projects, and attracts potential employers.",
    },
    demoLink: "https://harikrishna3portfolio.vercel.app/",
    githubLink: "https://github.com/Harikrishna3/Portfolio",
    category: "Portfolio",
    year: "2025",
  },
  {
    title: "Video Chat Application",
    description:
      "A real-time peer-to-peer video chat app built for seamless communication directly in the browser.",
    details: {
      Problem:
        "Existing solutions had unreliable connections and complex setup.",
      Solution:
        "Implemented WebRTC with signaling servers for stable video/audio streaming and easy connection setup.",
      Tech: "WebRTC, JavaScript, HTML/CSS",
      Impact:
        "Reliable video calling in-browser, low latency, and easy to use for multiple users.",
    },
    // demoLink: "https://demo.videochatapp.com",
    // githubLink: "https://github.com/username/videochatapp",
    category: "Communication",
    year: "2024",
  },
];