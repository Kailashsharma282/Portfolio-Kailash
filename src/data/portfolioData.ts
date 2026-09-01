import type { Project, Experience, Achievement, CPProfile, SkillCategory, Education } from '../types/portfolio';

export const personalInfo = {
  name: "Kailash Sharma",
  preferredName: "Kailash",
  initials: "KS",
  tagline: "I build scalable systems, intelligent applications and meaningful experiences.",
  shortBio: "Undergraduate at IIT Kharagpur with deep interests in distributed backend architectures, high-performance systems, artificial intelligence, and competitive algorithmic problem solving.",
  roles: [
    "Backend Developer",
    "AI Enthusiast",
    "Problem Solver",
    "Builder"
  ],
  location: "IIT Kharagpur, West Bengal, India",
  email: "kailashsharma382005@gmail.com",
  profileImage: "/assets/kailash_profile.jpg",
  socialLinks: {
    github: "https://github.com/Kailashsharma282",
    linkedin: "https://linkedin.com/in/kailash-sharma-4a1187328/",
    leetcode: "https://leetcode.com/u/JgeNjfID2U/",
    codeforces: "https://codeforces.com/profile/Kailash_Sharma",
    codechef: "https://codechef.com/users/kailash_382005"
  },
  stats: [
    { label: "LeetCode Max Rating", value: "1606", suffix: "" },
    { label: "Hackathon Finalist", value: "Top 1%", suffix: "of 4.4k" },
    { label: "JEE Main Percentile", value: "Top 1.7%", suffix: "of 1.1M" },
    { label: "IIT Kharagpur CGPA", value: "7.37", suffix: "/ 10" }
  ]
};

export const educationData: Education = {
  institution: "Indian Institute of Technology, Kharagpur",
  degree: "B.Tech (Hons.) in Biotechnology & Biochemical Engineering",
  specialization: "Minor / Computing Focus: Systems, Data Structures & Machine Learning",
  period: "2023 – 2027",
  grade: "CGPA: 7.37 / 10",
  location: "Kharagpur, India",
  coursework: [
    "Advanced Calculus",
    "Programming and Data Structures",
    "Programming and Data Structures Laboratory",
    "Linear Algebra, Numerical and Complex Analysis",
    "Probability and Statistics",
    "Cryptography and Network Security",
    "Quantum Mechanics and Quantum Computing",
    "Digital Image Processing"
  ],
  highlights: [
    "Relevant Coursework: Advanced Calculus, Programming & Data Structures (Theory & Lab), Linear Algebra, Numerical & Complex Analysis, Probability & Statistics, Cryptography & Network Security, Quantum Mechanics & Computing, Digital Image Processing.",
    "Active member of campus technical societies and competitive coding groups.",
    "Qualified through JEE Advanced 2023 with top 3.8% rank among 260,000+ candidates nationwide."
  ]
};

export const experiencesData: Experience[] = [
  {
    id: "meetmux",
    company: "MeetMux",
    role: "Software Engineering Intern – Backend & Microservices",
    period: "May 2026 – Jul 2026",
    location: "Bengaluru, India (Hybrid)",
    type: "Internship",
    description: "Architected distributed backend services, high-throughput microservices pipelines, and low-latency database queries.",
    highlights: [
      "Engineered high-concurrency microservices handling 10,000+ requests/minute with sub-50ms latency.",
      "Implemented Redis caching and pub/sub pipelines, decreasing database load and response times by 45%.",
      "Designed clean gRPC and REST APIs with automated validation and structured logging."
    ],
    technologies: ["Go", "Node.js", "Docker", "Redis", "PostgreSQL", "gRPC", "Microservices"],
    iconName: "Server",
    color: "#06b6d4" // Cyan accent
  },
  {
    id: "cognifyev",
    company: "CognifyEV",
    role: "Artificial Intelligence Intern",
    period: "Aug 2025 – Sep 2025",
    location: "Remote",
    type: "Internship",
    description: "Developed deep learning and predictive analytics models for electric vehicle battery telemetry and anomaly detection.",
    highlights: [
      "Built time-series predictive models for State of Charge (SoC) and battery degradation with 94.2% test accuracy.",
      "Packaged ML pipelines into low-latency FastAPI microservices deployed inside containerized environments.",
      "Engineered automated anomaly detection for real-time telemetry streams from hundreds of simulated vehicle nodes."
    ],
    technologies: ["Python", "PyTorch", "FastAPI", "Scikit-Learn", "Pandas", "Docker", "Time-Series"],
    iconName: "Cpu",
    color: "#a855f7" // Purple accent
  },
  {
    id: "springfest",
    company: "Spring Fest, IIT Kharagpur",
    role: "Tech Subhead",
    period: "Jul 2024 – Apr 2025",
    location: "IIT Kharagpur",
    type: "Student Leadership",
    description: "Directed technical infrastructure for Asia's 2nd largest cultural fest with 80,000+ footfall and 50,000+ online users.",
    highlights: [
      "Architected registration portals, live event scheduling feeds, and automated certificate generation engines.",
      "Maintained 99.99% uptime during nationwide online quiz rounds and high-volume celebrity night ticket passes.",
      "Mentored a team of 15+ student developers in code reviews, CI/CD pipelines, and cloud deployment."
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Redis", "AWS EC2", "Nginx"],
    iconName: "Layers",
    color: "#3b82f6" // Blue accent
  }
];

export const projectsData: Project[] = [
  {
    id: "ai-interview",
    title: "AI Interview Platform",
    subtitle: "Real-time AI Voice & Technical Mock Interviewer",
    description: "An intelligent end-to-end interview simulation platform with dynamic question generation, live voice interaction, code compilation, and algorithmic feedback.",
    longDescription: "Features adaptive technical interviews driven by LLMs that tune difficulty dynamically based on candidate performance. Incorporates speech-to-text, real-time code analysis, semantic evaluation of responses, and comprehensive PDF scorecard generation.",
    tags: ["React", "TypeScript", "Node.js", "WebRTC", "OpenAI / Gemini API", "TailwindCSS"],
    features: [
      "Real-time voice dialogue via WebRTC & Speech Recognition",
      "Dynamic difficulty adaptation based on candidate confidence & accuracy",
      "Integrated Monaco code editor with live syntax checking & mock tests",
      "Comprehensive evaluation breakdown: System Design, DSA, and Communication"
    ],
    metrics: "400ms average response latency • 95% evaluation accuracy",
    githubUrl: "https://github.com/Kailashsharma282",
    liveUrl: "https://ai-interview-platform-demo.vercel.app",
    category: "ai",
    badge: "Featured AI Project"
  },
  {
    id: "ai-website-builder",
    title: "AI Website Builder",
    subtitle: "Prompt-to-Production Autonomous Web Builder",
    description: "Natural language web app generation engine creating fully responsive, modern multi-page websites with instant interactive preview and clean code export.",
    longDescription: "Transforms natural language descriptions into production-ready web interfaces with real-time sandboxed rendering, modular AST generation, design token synthesis, and immediate ZIP bundle export.",
    tags: ["React", "Next.js", "TypeScript", "TailwindCSS", "LLM Orchestration", "Sandboxed Iframe"],
    features: [
      "Natural language to multi-component React/HTML layout compilation",
      "Live sandboxed preview with responsive viewport switching (Desktop/Tablet/Mobile)",
      "Interactive style refinement & component drag-and-drop tweaks",
      "One-click production source code bundle download"
    ],
    metrics: "< 5s full site generation • Zero hydration mismatch",
    githubUrl: "https://github.com/Kailashsharma282",
    liveUrl: "https://ai-web-builder-demo.vercel.app",
    category: "fullstack",
    badge: "Interactive Tool"
  },
  {
    id: "distributed-kv-store",
    title: "Mini Distributed Key-Value Store",
    subtitle: "Fault-Tolerant Distributed Storage Engine with Raft",
    description: "High-throughput distributed key-value store implementing Raft consensus protocol, write-ahead logging (WAL), and an LSM-tree storage engine.",
    longDescription: "Engineered from scratch to explore distributed systems concepts. Guarantees strong consistency and high availability across cluster partitions. Implements log replication, leader election, persistent snapshots, and multi-threaded compaction.",
    tags: ["Go", "gRPC", "Protocol Buffers", "Raft Consensus", "LSM-Tree", "Distributed Systems"],
    features: [
      "Raft consensus protocol with dynamic leader election & heartbeats",
      "Write-Ahead Logging (WAL) and memory table with immutable SSTable flushes",
      "gRPC microservices API supporting atomic Get, Put, Delete, and Batch operations",
      "Jepsen-style fault injection testing simulating partition recovery"
    ],
    metrics: "50,000+ ops/sec throughput • 0 data loss under network partitions",
    githubUrl: "https://github.com/Kailashsharma282",
    category: "systems",
    badge: "Core Systems"
  }
];

export const achievementsData: Achievement[] = [
  {
    id: "omnixan-2026",
    title: "Finalist – Omnixan National Hackathon 2026",
    subtitle: "National Hackathon Championship",
    organization: "Omnixan",
    description: "Selected as one of the top finalist teams out of 4,400+ national participants for engineering an autonomous AI-driven triage & microservices engine.",
    stat: "Top 0.5%",
    statLabel: "Among 4,400+ participants",
    badge: "National Finalist",
    color: "#f59e0b" // Gold
  },
  {
    id: "jee-main",
    title: "Top 1.7% in JEE Main 2023",
    subtitle: "National Testing Agency (NTA)",
    organization: "Joint Entrance Examination",
    description: "Achieved an elite nationwide percentile in one of the world's most competitive engineering entrance exams among over 1.1 million aspiring engineers.",
    stat: "Top 1.7%",
    statLabel: "Out of 1,100,000+ candidates",
    badge: "National Percentile",
    color: "#06b6d4" // Cyan
  },
  {
    id: "jee-advanced",
    title: "Top 3.8% in JEE Advanced 2023",
    subtitle: "IIT Entrance Examination",
    organization: "Indian Institute of Technology",
    description: "Qualified with high distinction among 260,000+ top screened candidates to secure admission to India's premier institution, IIT Kharagpur.",
    stat: "Top 3.8%",
    statLabel: "Out of 260,000+ candidates",
    badge: "IIT Qualification",
    color: "#8b5cf6" // Purple
  },
  {
    id: "decodex",
    title: "Completed 10-day DecodeX Challenge",
    subtitle: "Advanced Algorithmic Bootcamp",
    organization: "KodeIn, IIT Kharagpur",
    description: "Successfully solved intensive daily advanced competitive programming and algorithmic optimization challenges organized by the premier coding society.",
    stat: "100%",
    statLabel: "Completion & Problem Clearance",
    badge: "Algorithmic Sprint",
    color: "#10b981" // Emerald
  }
];

export const cpProfilesData: CPProfile[] = [
  {
    platform: "LeetCode",
    handle: "JgeNjfID2U",
    maxRating: 1606,
    currentRating: 1606,
    rank: "Knight Candidate / Top Percentile",
    url: "https://leetcode.com/u/JgeNjfID2U/",
    color: "#ffa116",
    badge: "Max: 1606",
    stats: [
      { label: "Max Rating", value: "1606" },
      { label: "Problems Solved", value: "450+" },
      { label: "Contest Percentile", value: "Top 15%" },
      { label: "Streak", value: "120+ Days" }
    ]
  },
  {
    platform: "Codeforces",
    handle: "Kailash_Sharma",
    maxRating: 1333,
    currentRating: 1333,
    rank: "Pupil",
    url: "https://codeforces.com/profile/Kailash_Sharma",
    color: "#3b82f6",
    badge: "Max: 1333",
    stats: [
      { label: "Max Rating", value: "1333" },
      { label: "Rank", value: "Pupil" },
      { label: "Contests", value: "25+" },
      { label: "Problems", value: "200+" }
    ]
  },
  {
    platform: "CodeChef",
    handle: "kailash_382005",
    maxRating: "3★ Division 2",
    currentRating: "3★",
    rank: "3-Star Coder",
    url: "https://codechef.com/users/kailash_382005",
    color: "#8b5cf6",
    badge: "3-Star Coder",
    stats: [
      { label: "Handle", value: "kailash_382005" },
      { label: "Division", value: "Div 2" },
      { label: "Global Contests", value: "18+" },
      { label: "Problem Score", value: "1,500+" }
    ]
  }
];

export const skillCategoriesData: SkillCategory[] = [
  {
    title: "Backend & Systems",
    iconName: "Server",
    color: "#06b6d4",
    skills: [
      { name: "Go (Golang)", level: 88, badge: "Distributed" },
      { name: "Node.js & Express", level: 92, badge: "Microservices" },
      { name: "Python & FastAPI", level: 90, badge: "Async API" },
      { name: "PostgreSQL & SQL", level: 86, badge: "Relational" },
      { name: "Redis & In-Memory", level: 88, badge: "Caching" },
      { name: "gRPC & Protobuf", level: 82, badge: "High Perf" }
    ]
  },
  {
    title: "AI & Machine Learning",
    iconName: "Brain",
    color: "#a855f7",
    skills: [
      { name: "LLM & Prompt Eng.", level: 92, badge: "OpenAI / Gemini" },
      { name: "PyTorch & Deep Learning", level: 80, badge: "Neural Nets" },
      { name: "Scikit-Learn", level: 85, badge: "Predictive" },
      { name: "Time-Series Telemetry", level: 84, badge: "EV Anomaly" },
      { name: "Vector Search & RAG", level: 83, badge: "Embeddings" }
    ]
  },
  {
    title: "Frontend & 3D Interactive",
    iconName: "Globe",
    color: "#3b82f6",
    skills: [
      { name: "React.js & TypeScript", level: 90, badge: "Modern UI" },
      { name: "Three.js & WebGL", level: 82, badge: "3D Graphics" },
      { name: "TailwindCSS & Modern CSS", level: 94, badge: "Responsive" },
      { name: "WebRTC & WebSockets", level: 80, badge: "Real-time" }
    ]
  },
  {
    title: "Core Engineering & Tools",
    iconName: "Terminal",
    color: "#10b981",
    skills: [
      { name: "Data Structures & Algos", level: 92, badge: "CP / LeetCode" },
      { name: "Raft Consensus & WAL", level: 84, badge: "Fault Tolerance" },
      { name: "Docker & Containers", level: 86, badge: "DevOps" },
      { name: "Git, Linux & Bash", level: 90, badge: "Workflow" }
    ]
  }
];

export const celestialStations = [
  {
    id: "about",
    name: "Aethelgard Core",
    label: "About & Education",
    subtitle: "IIT Kharagpur & Story",
    color: "#06b6d4",
    emissive: "#083344",
    radius: 1.8,
    distance: 14,
    speed: 0.25,
    hasRings: true,
    ringColor: "#22d3ee",
    textureType: "ice-gas",
    icon: "User"
  },
  {
    id: "experience",
    name: "Cronos Station",
    label: "Experience & Roles",
    subtitle: "MeetMux • CognifyEV • Spring Fest",
    color: "#8b5cf6",
    emissive: "#3b0764",
    radius: 2.2,
    distance: 22,
    speed: 0.18,
    hasRings: true,
    ringColor: "#c084fc",
    textureType: "ringed-gas",
    icon: "Briefcase"
  },
  {
    id: "projects",
    name: "Techno-Prime",
    label: "Projects & Systems",
    subtitle: "AI Interview • AI Builder • Distributed KV",
    color: "#3b82f6",
    emissive: "#1e3a8a",
    radius: 2.0,
    distance: 30,
    speed: 0.14,
    hasRings: false,
    textureType: "terrestrial-tech",
    icon: "Code2"
  },
  {
    id: "achievements",
    name: "Solaris Aureus",
    label: "Achievements",
    subtitle: "Omnixan Finalist • Top JEE Ranks",
    color: "#f59e0b",
    emissive: "#78350f",
    radius: 2.1,
    distance: 38,
    speed: 0.11,
    hasRings: true,
    ringColor: "#fde047",
    textureType: "golden-pulsar",
    icon: "Trophy"
  },
  {
    id: "skills",
    name: "Plasma Matrix",
    label: "Skills & Tech Stack",
    subtitle: "Backend • AI • Frontend • Core DSA",
    color: "#ec4899",
    emissive: "#831843",
    radius: 1.9,
    distance: 46,
    speed: 0.08,
    hasRings: false,
    textureType: "plasma-storm",
    icon: "Cpu"
  },
  {
    id: "cp",
    name: "Binary Zenith",
    label: "Competitive Coding",
    subtitle: "LeetCode 1606 • Codeforces 1333",
    color: "#10b981",
    emissive: "#064e3b",
    radius: 1.7,
    distance: 53,
    speed: 0.06,
    hasRings: true,
    ringColor: "#6ee7b7",
    textureType: "binary-crystalline",
    icon: "Terminal"
  },
  {
    id: "contact",
    name: "Beacon Outpost",
    label: "Contact & Connect",
    subtitle: "Reach out • Social Links",
    color: "#6366f1",
    emissive: "#312e81",
    radius: 1.6,
    distance: 60,
    speed: 0.04,
    hasRings: true,
    ringColor: "#a5b4fc",
    textureType: "beacon-signal",
    icon: "Mail"
  }
];
