import type { Project, Experience, Achievement, CPProfile, SkillCategory, Education } from '../types/portfolio';

export const personalInfo = {
  name: "Pochiraju Kailash Ram Markandeya Sharma",
  preferredName: "Kailash Sharma",
  initials: "KS",
  tagline: "I build scalable distributed systems, intelligent AI pipelines, and resilient backend architectures.",
  shortBio: "Undergraduate at IIT Kharagpur specializing in distributed systems, high-concurrency microservices, real-time AI oversight pipelines, and competitive algorithmic problem solving.",
  roles: [
    "Backend & Systems Engineer",
    "Applied AI & ML Developer",
    "Distributed Systems Builder",
    "Competitive Programmer"
  ],
  location: "IIT Kharagpur, West Bengal, India",
  phone: "+91 7013364559",
  email: "kailashsharma8@kgpian.iitkgp.ac.in",
  secondaryEmail: "kailashsharma382005@gmail.com",
  profileImage: "/assets/kailash_profile.jpg",
  socialLinks: {
    github: "https://github.com/Kailashsharma282",
    linkedin: "https://linkedin.com/in/kailash-sharma-4a1187328/",
    leetcode: "https://leetcode.com/u/kailash_382005/",
    codeforces: "https://codeforces.com/profile/Kailash_Sharma",
    codechef: "https://codechef.com/users/kailash_382005"
  },
  stats: [
    { label: "LeetCode Peak Rating", value: "1,770", suffix: "(Top 4%)" },
    { label: "Omnikon Hackathon", value: "6th", suffix: "of 3,000+" },
    { label: "CodeChef Starters 254", value: "Global 184", suffix: "of 30,000+" },
    { label: "IIT Kharagpur CGPA", value: "7.37", suffix: "/ 10" }
  ]
};

export const educationData: Education = {
  institution: "Indian Institute of Technology, Kharagpur",
  degree: "B.Tech (Hons.) in Biotechnology & Biochemical Engineering",
  specialization: "Minor / Computing Focus: Systems, Data Structures & Machine Learning",
  period: "2023 – 2027",
  grade: "CGPA: 7.37 / 10",
  location: "Kharagpur, West Bengal, India",
  coursework: [
    "Programming & Data Structures (Theory & Lab)",
    "Operating Systems & Multithreading",
    "Computer Networks & Sockets",
    "Database Management Systems (DBMS)",
    "Linear Algebra & Complex Analysis",
    "Probability & Statistics",
    "Cryptography & Network Security",
    "Distributed Systems & Raft Consensus",
    "Artificial Intelligence & Machine Learning"
  ],
  highlights: [
    "Admitted to IIT Kharagpur through JEE Advanced 2023 with high nationwide distinction.",
    "Technical Subhead for Spring Fest — architected high-traffic mobile web platform supporting 40K+ logins and 50L+ transactions.",
    "Maintained active competitive algorithmic rank across LeetCode (1,770 max rating, Top 4%), CodeChef (Global Rank 184), and Codeforces."
  ],
  history: [
    {
      id: "iitkgp",
      institution: "Indian Institute of Technology, Kharagpur",
      degree: "B.Tech (Hons.) in Biotechnology and Biochemical Engineering",
      boardOrProgram: "IIT Kharagpur",
      period: "2023 – 2027",
      grade: "7.37 / 10",
      gradeType: "CGPA",
      location: "Kharagpur, West Bengal, India",
      highlights: [
        "Rigorous coursework in Systems, Data Structures, Multithreading, and Computer Networks",
        "Technical Subhead for Asia's 2nd largest cultural festival (Spring Fest)",
        "Active member of campus software systems and competitive programming groups"
      ],
      coursework: [
        "Programming and Data Structures",
        "Linear Algebra & Statistics",
        "Computer Networks",
        "Operating Systems",
        "Database Systems"
      ]
    },
    {
      id: "narayana-jc",
      institution: "Narayana Junior College (TSBIE)",
      degree: "Intermediate / Higher Secondary (MPC)",
      boardOrProgram: "Telangana State Board of Intermediate Education (TSBIE)",
      period: "2021 – 2023",
      grade: "98.3%",
      gradeType: "Percentage",
      location: "Hyderabad, Telangana, India",
      highlights: [
        "Achieved an outstanding 98.3% aggregate score across Mathematics, Physics, and Chemistry",
        "Top 1.7% in JEE Main 2023 among over 1.1 million candidates nationwide",
        "Top 3.8% in JEE Advanced 2023 qualifying for India's premier IITs"
      ]
    },
    {
      id: "narayana-school",
      institution: "Narayana High School (SSC, TS Board)",
      degree: "Secondary School Certificate (SSC)",
      boardOrProgram: "Telangana State Board of Secondary Education",
      period: "2020 – 2021",
      grade: "10 / 10",
      gradeType: "GPA",
      location: "Hyderabad, Telangana, India",
      highlights: [
        "Graduated with a perfect 10.0/10.0 GPA across all subjects",
        "Distinction in science and regional mathematics talent examinations"
      ]
    }
  ]
};

export const experiencesData: Experience[] = [
  {
    id: "meetmux",
    company: "MeetMux",
    role: "Software Engineering Intern",
    period: "May 2026 – Jul 2026",
    location: "Bengaluru, India (Hybrid)",
    type: "Internship",
    description: "Architected scalable microservices, low-latency gRPC communications, distributed caching, and automated coding sandboxes.",
    highlights: [
      "Built 20+ REST APIs across microservices with Redis caching, rate limiting, and optimized request handling, reducing API latency by 40%.",
      "Replaced REST with gRPC for inter-service communication, reducing latency by 35% while supporting 1,000+ concurrent sessions.",
      "Built a Judge0 coding sandbox handling 5,000+ daily evaluations and integrated WebSocket-based AI proctoring for real-time monitoring."
    ],
    technologies: ["REST", "gRPC", "Redis", "Microservices", "Judge0", "WebSockets", "Docker", "Node.js", "Rate Limiting"],
    iconName: "Server",
    color: "#06b6d4" // Cyan accent
  },
  {
    id: "prathik",
    company: "Prathik Infotech",
    role: "Machine Learning Intern",
    period: "Nov 2025 – Jan 2026",
    location: "Bengaluru, India (Remote)",
    type: "Internship",
    description: "Constructed real-time fraud detection pipelines with high-precision classification models and asynchronous inference microservices.",
    highlights: [
      "Built a real-time fraud detection pipeline with feature engineering, class-imbalance handling, model training, and threshold optimization.",
      "Developed a FastAPI inference service with PostgreSQL and Redis for low-latency transaction prediction and real-time monitoring.",
      "Evaluated classification models using Precision, Recall, F1, and PR-AUC, with feature-importance analysis for fraud explainability."
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "Scikit-Learn", "PR-AUC", "Feature Engineering", "Docker"],
    iconName: "Cpu",
    color: "#ec4899" // Pink accent
  },
  {
    id: "cognifyev",
    company: "CognifyEV",
    role: "Artificial Intelligence Intern",
    period: "Aug 2025 – Sep 2025",
    location: "Remote",
    type: "Internship",
    description: "Engineered low-latency Retrieval-Augmented Generation (RAG) conversational agents and external knowledge pipelines.",
    highlights: [
      "Built an AI chatbot using RAG pipelines and FastAPI, enabling context-aware, accurate responses from external knowledge sources.",
      "Implemented embedding-based retrieval to reduce hallucinated responses by 30% while improving overall response relevance.",
      "Optimized the AI inference pipeline to achieve sub-500ms response latency for real-time chatbot interactions at production scale."
    ],
    technologies: ["RAG", "LLM APIs", "Embedding Retrieval", "FastAPI", "Python", "Vector Search", "Redis"],
    iconName: "Brain",
    color: "#a855f7" // Purple accent
  },
  {
    id: "springfest",
    company: "Spring Fest, IIT Kharagpur",
    role: "Tech Subhead",
    period: "Jul 2024 – Apr 2025",
    location: "IIT Kharagpur, India",
    type: "Tech Leadership",
    description: "Directed architecture, security, and payment pipelines for Asia's 2nd largest cultural festival web infrastructure.",
    highlights: [
      "Developed a responsive mobile website supporting 40K+ logins, 50L+ UPI transactions, and 5K+ verifications, driving 20%+ engagement growth.",
      "Engineered resilient real-time checkout flows and robust authentication layers under peak festival traffic surges.",
      "Maintained zero downtime across high-concurrency celebrity night ticketing events and nationwide competition portals."
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Redis", "UPI Gateway", "AWS", "Nginx"],
    iconName: "Layers",
    color: "#3b82f6" // Blue accent
  }
];

export const projectsData: Project[] = [
  {
    id: "ai-interview",
    title: "AI Interview Platform",
    subtitle: "Adaptive LLM-Powered Voice & Coding Mock Interviewer",
    description: "An intelligent mock interview platform featuring dynamic question adaptation, real-time rubric-based LLM evaluation, live WebRTC audio dialogue, and speech-to-text.",
    longDescription: "Designed an event-driven architecture using WebSockets, Redis, PostgreSQL, and WebRTC for scalable real-time interview sessions. Built adaptive question generation with automated follow-ups, rubric-based evaluation, speech-to-text, and prompt-injection defense with automated testing.",
    tags: ["React", "Node.js", "FastAPI", "PostgreSQL", "Redis", "WebRTC", "Docker", "Speech-to-Text"],
    features: [
      "Adaptive question generation and intelligent follow-up inquiries based on candidate responses",
      "Rubric-based structured LLM evaluation breakdown (correctness, communication, depth)",
      "Event-driven architecture with WebSockets, Redis pub/sub, PostgreSQL, and WebRTC",
      "Speech-to-text audio pipeline with prompt-injection defense and caching"
    ],
    metrics: "Event-driven WebSockets • Sub-400ms evaluation latency • 100% prompt-injection defense",
    githubUrl: "https://github.com/Kailashsharma282",
    liveUrl: "https://ai-interview-platform-demo.vercel.app",
    category: "ai",
    badge: "Production AI Platform",
    architectureDetails: {
      components: ["WebRTC Media Gateway", "FastAPI Inference Engine", "Redis Pub/Sub Event Bus", "PostgreSQL Session Store"],
      concurrencyModel: "Asynchronous event loops with WebSockets & Redis pub/sub",
      keyInnovations: ["Adaptive difficulty scaling", "Voice-to-score pipeline", "Injection-proof guardrails"]
    }
  },
  {
    id: "distributed-kv-store",
    title: "Mini Distributed Key-Value Store",
    subtitle: "Fault-Tolerant Distributed Storage Engine with Raft Consensus",
    description: "A high-performance distributed key-value store built in C++20 with a custom TCP protocol, Write-Ahead Logging (WAL) persistence, LRU caching, and Raft consensus across a 5-node Docker cluster.",
    longDescription: "Engineered from scratch in C++20 with multithreaded synchronization, crash recovery, and consistent-hash sharding. Features Raft-based replication with dynamic leader election and failure recovery, benchmarked across P50/P95/P99 latency percentiles.",
    tags: ["C++20", "TCP Sockets", "Multithreading", "Raft Consensus", "Docker", "WAL", "LRU Cache"],
    features: [
      "Raft consensus protocol with dynamic leader election, log replication, and automated failure recovery",
      "Consistent-hash sharding across a 5-node Docker cluster for horizontal scalability",
      "Write-Ahead Logging (WAL) persistence and thread-safe LRU in-memory cache",
      "Engineered with concurrent synchronization, crash recovery, and P50/P95/P99 latency benchmarking"
    ],
    metrics: "5-Node Docker Cluster • P99 Sub-5ms Latency • Zero-Data-Loss Raft Failover",
    githubUrl: "https://github.com/Kailashsharma282",
    category: "systems",
    badge: "Distributed Systems (C++20)",
    architectureDetails: {
      components: ["Custom TCP Protocol Engine", "Raft Consensus Core", "WAL Storage Manager", "Consistent Hash Sharder"],
      concurrencyModel: "C++20 std::jthread pool with lock-free atomic rings and read-write mutexes",
      keyInnovations: ["Dynamic Raft leader election", "Crash recovery verification", "Consistent hashing topology"]
    }
  },
  {
    id: "ai-website-builder",
    title: "AI Website Builder",
    subtitle: "Prompt-to-Production React Site Generator with AST Regeneration",
    description: "An LLM-powered website builder converting natural-language prompts into validated, production-ready React web apps with targeted AST component regeneration.",
    longDescription: "Implemented an Abstract Syntax Tree (AST)-based component regeneration system that enables surgical, targeted edits without regenerating entire projects. Features Redis caching, sandboxed live previews, versioning, and one-click Vercel/Netlify deployment.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "LLMs", "AST", "Vercel / Netlify"],
    features: [
      "Natural language to validated, production-grade React web application generation",
      "AST-based component parsing and incremental updates without full rebuilds",
      "Redis caching layer for rapid prompt resolution and component caching",
      "Live interactive sandboxed previews with one-click deployment pipelines"
    ],
    metrics: "< 4s Generation Speed • Incremental AST Updates • One-Click Deploy",
    githubUrl: "https://github.com/Kailashsharma282",
    liveUrl: "https://ai-web-builder-demo.vercel.app",
    category: "fullstack",
    badge: "AI Developer Tool",
    architectureDetails: {
      components: ["Babel/AST Transformer", "Prompt Reasoning Engine", "Redis Cache Layer", "Deployment Webhook Broker"],
      concurrencyModel: "Node.js cluster worker threads with Redis job queue",
      keyInnovations: ["Surgical AST diff patching", "Deterministic code synthesis", "Instant live preview sandbox"]
    }
  },
  {
    id: "drishti-ai-oversight",
    title: "Drishti: Real-Time AI Oversight Layer",
    subtitle: "Accenture Innovation Challenge 2026 — Model-Agnostic LLM Guardrail Engine",
    description: "A high-performance AI oversight layer monitoring LLM responses in real time for correctness, token cost, bias, PII leakage, and safety risks with composite risk scoring.",
    longDescription: "Built for the Accenture Innovation Challenge 2026. Employs critic-model validation, token/latency profiling, and responsible-AI classifiers. Features a dynamic risk-based intervention engine that can pass, annotate, block, or escalate responses with continuous human feedback loops.",
    tags: ["Python", "FastAPI", "LLM APIs", "Responsible AI", "Critic Models", "PII Shield", "Docker"],
    features: [
      "Model-agnostic oversight proxy inspecting LLM outputs in real time",
      "Composite risk scoring via critic-model verification, latency profiling, and bias classifiers",
      "Automated dynamic policy enforcement: pass, annotate, block, or escalate responses",
      "Active human-in-the-loop feedback mechanisms continuously tuning classifier accuracy"
    ],
    metrics: "Real-time stream interception • Sub-60ms overhead • 99.4% PII & risk detection",
    githubUrl: "https://github.com/Kailashsharma282",
    category: "ai",
    badge: "Accenture Challenge 2026",
    architectureDetails: {
      components: ["Streaming Proxy Interceptor", "Critic Verification Ensemble", "Responsible-AI Policy Gate", "Escalation Hub"],
      concurrencyModel: "FastAPI asynchronous streaming pipeline with non-blocking evaluation queues",
      keyInnovations: ["Composite risk metric formula", "Zero-trust PII sanitization", "Human feedback calibration"]
    }
  }
];

export const achievementsData: Achievement[] = [
  {
    id: "omnikon-2026",
    title: "Secured 6th Position – Omnikon National Hackathon 2026",
    subtitle: "National Hackathon Championship (Team: kailashsharma8)",
    organization: "Omnikon 2026",
    description: "Secured 6th position in Omnikon National Hackathon 2026 among 3,000+ participants nationwide for engineering a resilient real-time triage & microservices engine.",
    stat: "6th Rank",
    statLabel: "Among 3,000+ participants nationwide",
    badge: "Top 0.2% Nationwide",
    color: "#f59e0b" // Gold
  },
  {
    id: "leetcode-contest-500",
    title: "Secured Top 4% – LeetCode Weekly Contest 500",
    subtitle: "Max Rating: 1,770 • 400+ Problems Solved",
    organization: "LeetCode (Handle: kailash_382005)",
    description: "Secured Top 4% ranking in LeetCode Weekly Contest 500, achieving a peak rating of 1,770 with over 400+ complex algorithmic data structure challenges solved.",
    stat: "1,770 Rating",
    statLabel: "Top 4% (LeetCode Contest 500)",
    badge: "Top 4% Global",
    color: "#ffa116" // Orange
  },
  {
    id: "codechef-starters-254",
    title: "Secured Global Rank 184 – CodeChef Starters 254",
    subtitle: "Division Contest (Handle: kailash_382005)",
    organization: "CodeChef",
    description: "Secured Global Rank 184 in CodeChef Starters 254 among 30,000+ participants worldwide, demonstrating rapid algorithmic speed and mathematical correctness.",
    stat: "Global 184",
    statLabel: "Out of 30,000+ global participants",
    badge: "Global Rank 184",
    color: "#8b5cf6" // Purple
  },
  {
    id: "codeforces-round-1117",
    title: "Secured Rank 1,530 – Codeforces Round 1117 (Div. 2)",
    subtitle: "Achieved 1333 Rating (Kailash Sharma)",
    organization: "Codeforces",
    description: "Secured Rank 1,530 in Codeforces Round 1117 (Div. 2) among 25,000+ competitive programmers worldwide, achieving a verified 1333 rating.",
    stat: "Rank 1,530",
    statLabel: "Out of 25,000+ participants (Div. 2)",
    badge: "1333 Rating",
    color: "#3b82f6" // Blue
  },
  {
    id: "jee-entrance",
    title: "Top 1.7% in JEE Main & Top 3.8% in JEE Advanced",
    subtitle: "National Engineering Entrance",
    organization: "National Testing Agency & IITs",
    description: "Qualified with distinction out of 1.1 million candidates in JEE Main and 260,000+ selected candidates in JEE Advanced 2023 to earn admission to IIT Kharagpur.",
    stat: "Top 1.7%",
    statLabel: "Among 1.1M+ candidates nationwide",
    badge: "IIT Qualification",
    color: "#06b6d4" // Cyan
  }
];

export const cpProfilesData: CPProfile[] = [
  {
    platform: "LeetCode",
    handle: "kailash_382005",
    maxRating: 1770,
    currentRating: 1770,
    rank: "Top 4% • Contest 500",
    url: "https://leetcode.com/u/kailash_382005/",
    color: "#ffa116",
    badge: "Max: 1,770 (Top 4%)",
    stats: [
      { label: "Max Rating", value: "1,770" },
      { label: "Problems Solved", value: "400+" },
      { label: "Contest 500", value: "Top 4%" },
      { label: "Platform ID", value: "kailash_382005" }
    ]
  },
  {
    platform: "CodeChef",
    handle: "kailash_382005",
    maxRating: "Global 184",
    currentRating: "Starters 254",
    rank: "Global Rank 184 / 30K+",
    url: "https://codechef.com/users/kailash_382005",
    color: "#8b5cf6",
    badge: "Global Rank 184",
    stats: [
      { label: "Starters 254", value: "Rank 184" },
      { label: "Participants", value: "30,000+" },
      { label: "Division", value: "Div 2" },
      { label: "Handle", value: "kailash_382005" }
    ]
  },
  {
    platform: "Codeforces",
    handle: "Kailash_Sharma",
    maxRating: 1333,
    currentRating: 1333,
    rank: "Rank 1,530 / 25,000+",
    url: "https://codeforces.com/profile/Kailash_Sharma",
    color: "#3b82f6",
    badge: "Rating: 1333 (Pupil)",
    stats: [
      { label: "Max Rating", value: "1,333" },
      { label: "Round 1117", value: "Rank 1,530" },
      { label: "Participants", value: "25,000+" },
      { label: "Handle", value: "Kailash_Sharma" }
    ]
  }
];

export const skillCategoriesData: SkillCategory[] = [
  {
    title: "Languages",
    iconName: "Terminal",
    color: "#06b6d4",
    skills: [
      { name: "C++ (C++20)", level: 94, badge: "Distributed / Concurrency" },
      { name: "C", level: 88, badge: "Low-Level / Memory" },
      { name: "Python", level: 95, badge: "FastAPI / ML / RAG" },
      { name: "JavaScript / TypeScript", level: 92, badge: "Modern Web / React" },
      { name: "SQL", level: 90, badge: "Complex Queries / Tuning" }
    ]
  },
  {
    title: "Web & Backend",
    iconName: "Server",
    color: "#3b82f6",
    skills: [
      { name: "React & TypeScript", level: 94, badge: "Interactive UI" },
      { name: "Node.js & Express", level: 92, badge: "Event-Driven" },
      { name: "FastAPI", level: 94, badge: "Async REST APIs" },
      { name: "gRPC & Protocol Buffers", level: 88, badge: "Sub-ms RPCs" },
      { name: "WebSockets & WebRTC", level: 86, badge: "Real-time Streams" },
      { name: "REST APIs & Rate Limiting", level: 95, badge: "20+ Microservices" }
    ]
  },
  {
    title: "AI/ML & Data",
    iconName: "Brain",
    color: "#a855f7",
    skills: [
      { name: "RAG & Vector Retrieval", level: 92, badge: "Embeddings / LLMs" },
      { name: "LLM APIs & Prompt Security", level: 94, badge: "Injection Defense" },
      { name: "Speech-to-Text Pipelines", level: 85, badge: "Audio Transcribe" },
      { name: "NumPy & Pandas", level: 90, badge: "Feature Engineering" },
      { name: "PostgreSQL & MongoDB", level: 88, badge: "ACID / Document" },
      { name: "Redis In-Memory Caching", level: 92, badge: "Pub/Sub / Latency Drop" }
    ]
  },
  {
    title: "Systems & CS",
    iconName: "Cpu",
    color: "#10b981",
    skills: [
      { name: "Distributed Systems & Raft", level: 90, badge: "Consensus / Sharding" },
      { name: "Microservices Architecture", level: 92, badge: "High Concurrency" },
      { name: "Multithreading & Sockets", level: 88, badge: "TCP/IP Protocol" },
      { name: "Docker & Containerization", level: 90, badge: "5-Node Clusters" },
      { name: "System Design & DSA", level: 95, badge: "P50/P95/P99 Tuning" },
      { name: "AWS (S3 & Lambda)", level: 82, badge: "Cloud Microservices" }
    ]
  },
  {
    title: "Tools & Platforms",
    iconName: "Globe",
    color: "#f59e0b",
    skills: [
      { name: "Git & GitHub Workflow", level: 95, badge: "CI/CD / Versioning" },
      { name: "VS Code & Linux Bash", level: 92, badge: "Environment" },
      { name: "Postman & API Testing", level: 92, badge: "Contract Testing" },
      { name: "Figma UI/UX", level: 84, badge: "Visual Design" },
      { name: "Vercel, Netlify & Render", level: 92, badge: "Instant Deployment" }
    ]
  }
];

export const celestialStations = [
  {
    id: "about",
    name: "Aethelgard Core",
    label: "About & Education",
    subtitle: "IIT Kharagpur • Narayana JC 98.3% • Narayana HS 10/10",
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
    id: "meetmux",
    name: "Cronos Station",
    label: "MeetMux Engineering",
    subtitle: "gRPC • 20+ Microservices • Judge0 Sandbox",
    color: "#06b6d4",
    emissive: "#083344",
    radius: 2.1,
    distance: 21,
    speed: 0.20,
    hasRings: true,
    ringColor: "#38bdf8",
    textureType: "ringed-gas",
    icon: "Server"
  },
  {
    id: "prathik",
    name: "Veda Prime",
    label: "Prathik ML & Fraud",
    subtitle: "FastAPI • Fraud Detection • PR-AUC Optimization",
    color: "#ec4899",
    emissive: "#831843",
    radius: 1.9,
    distance: 28,
    speed: 0.16,
    hasRings: false,
    textureType: "plasma-storm",
    icon: "Cpu"
  },
  {
    id: "cognifyev",
    name: "Electra Outpost",
    label: "CognifyEV AI Chatbot",
    subtitle: "RAG Pipeline • Vector Embeddings • Sub-500ms Latency",
    color: "#a855f7",
    emissive: "#3b0764",
    radius: 1.8,
    distance: 35,
    speed: 0.13,
    hasRings: true,
    ringColor: "#c084fc",
    textureType: "beacon-signal",
    icon: "Brain"
  },
  {
    id: "kvstore",
    name: "Raft-Titan",
    label: "Distributed C++ KV Store",
    subtitle: "C++20 • 5-Node Raft Cluster • WAL • P99 Benchmarks",
    color: "#3b82f6",
    emissive: "#1e3a8a",
    radius: 2.2,
    distance: 43,
    speed: 0.10,
    hasRings: true,
    ringColor: "#60a5fa",
    textureType: "terrestrial-tech",
    icon: "Database"
  },
  {
    id: "drishti",
    name: "Aegis-Shield",
    label: "Drishti AI Oversight Layer",
    subtitle: "Accenture Challenge 2026 • Real-Time Safety & Risk",
    color: "#10b981",
    emissive: "#064e3b",
    radius: 2.0,
    distance: 51,
    speed: 0.08,
    hasRings: false,
    textureType: "binary-crystalline",
    icon: "Shield"
  },
  {
    id: "cp",
    name: "Binary Zenith",
    label: "Competitive Coding",
    subtitle: "LeetCode 1,770 (Top 4%) • CodeChef 184 • CF 1333",
    color: "#f59e0b",
    emissive: "#78350f",
    radius: 2.1,
    distance: 59,
    speed: 0.06,
    hasRings: true,
    ringColor: "#fde047",
    textureType: "golden-pulsar",
    icon: "Trophy"
  },
  {
    id: "contact",
    name: "Beacon Signal",
    label: "Contact & Connect",
    subtitle: "+91 7013364559 • kailashsharma8@kgpian.iitkgp.ac.in",
    color: "#6366f1",
    emissive: "#312e81",
    radius: 1.7,
    distance: 67,
    speed: 0.04,
    hasRings: true,
    ringColor: "#a5b4fc",
    textureType: "beacon-signal",
    icon: "Mail"
  }
];
