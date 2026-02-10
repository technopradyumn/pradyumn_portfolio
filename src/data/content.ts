import { Project, ContentData, Service, BlogPost, NavItem } from '../../types';
import { Github, Linkedin, Mail, MapPin, Smartphone, Layers, Database, Code, Zap, Layout, Bot } from 'lucide-react';

// === GLOBAL NAVIGATION ===
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/#work' },
  { label: 'Services', path: '/#services' },
  { label: 'About', path: '/#about' },
  { label: 'Blog', path: '/#blog' },
  { label: 'Contact', path: '/#contact' },
];

// === SITE CONTENT ===
export const CONTENT: ContentData = {
  hero: {
    greeting: "Hello, I'm Pradyumn",
    title: "Mobile App, Flutter & Gen AI Developer",
    subtitle: "Building scalable, high-performance mobile applications integrated with Generative AI.",
    description: "Result-oriented developer with a B.Tech in Computer Science. Creator of 'CopyClip' and expert in building production-grade applications using Flutter, Dart, Kotlin, and Gen AI technologies.",
    ctaPrimary: "View Projects",
    ctaSecondary: "Contact Me"
  },
  about: {
    bio: "I am a passionate Mobile App Developer with practical experience delivering scalable solutions. With a strong foundation in Computer Science, I specialize in creating cross-platform applications using Flutter and native Android development with Kotlin. My expertise lies in Clean Architecture, modular code maintainability, high-performance UI components, and integrating Generative AI into mobile experiences.",
    experience: [
      { year: 'Present', role: 'Mobile App Developer', company: 'AiToXr (Remote)' },
      { year: 'Internship', role: 'Mobile App Developer Intern', company: 'AiToXr (Remote)' },
      { year: '2024', role: 'B.Tech CSE Graduate', company: 'Chandigarh Engineering College' },
    ],
    skills: [
      'Flutter / Dart', 'Kotlin / Jetpack Compose', 'Generative AI', 'Android SDK', 
      'Clean Architecture', 'MVVM / Bloc', 'Firebase / Supabase', 'RESTful APIs', 'Git / GitHub'
    ]
  },
  contact: {
    email: "technopradyumn@gmail.com",
    phone: "+91 9453283619",
    address: "Indra Nagar, Orai, UP, India"
  },
  socials: [
    { platform: 'GitHub', url: 'https://github.com', icon: Github },
    { platform: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
    { platform: 'Email', url: 'mailto:technopradyumn@gmail.com', icon: Mail },
  ]
};

// === PROJECTS ===
export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'copyclip',
    title: 'CopyClip',
    description: 'A comprehensive productivity super-app live on Play Store.',
    fullDescription: 'CopyClip is a production-ready application featuring immersive Hero animations and multiple theme support. It serves as a comprehensive productivity suite integrating Clipboard Manager, Notes, Rich Text Editor, To-Do Lists, Expense Tracker, Journals, and Canvas into a unified, high-performance ecosystem.',
    tags: ['Flutter', 'Dart', 'Clean Architecture', 'Play Store'],
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1470&auto=format&fit=crop',
    link: '#',
    year: '2024',
    client: 'Personal Project',
    role: 'Sole Developer',
    challenges: 'Integrating multiple productivity tools into a single app while maintaining smooth performance and modularity.',
    solution: 'Utilized Clean Architecture to decouple features and implemented high-performance UI components to ensure a seamless user experience.'
  },
  {
    id: '2',
    slug: 'turflo',
    title: 'Turflo',
    description: 'Sports venue booking platform with real-time features.',
    fullDescription: 'Designed and built a comprehensive sports venue booking platform. The app features real-time chat using Socket.io and secure in-app transactions via Cashfree Payment Gateway.',
    tags: ['Flutter', 'Socket.io', 'Supabase', 'Bloc'],
    imageUrl: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=1470&auto=format&fit=crop',
    link: '#',
    year: '2024',
    client: 'AiToXr',
    role: 'Mobile App Developer',
    challenges: 'Achieving real-time data synchronization and ensuring transaction security.',
    solution: 'Implemented Socket.io for chat, achieving a 35% increase in session time, and integrated Cashfree with a 99.9% success rate.'
  },
  {
    id: '3',
    slug: 'flying-marioo',
    title: 'Flying Marioo',
    description: 'High-performance 2D game built with Jetpack Compose.',
    fullDescription: 'Engineered a high-performance 2D game applying performance-focused rendering techniques to deliver smooth and responsive gameplay.',
    tags: ['Android', 'Kotlin', 'Jetpack Compose', 'Room DB'],
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1470&auto=format&fit=crop',
    link: '#',
    year: '2023',
    client: 'Personal Project',
    role: 'Game Developer',
    challenges: 'Efficiently tracking game progress and high scores locally without lag.',
    solution: 'Architected a local persistence layer using Room Database, resulting in 40-60% faster data retrieval compared to file I/O.'
  },
  {
    id: '4',
    slug: 'ev-station-map',
    title: 'EV Station Map',
    description: 'Real-time EV station locator using Google Maps API.',
    fullDescription: 'Programmed a real-time EV station locator application enhancing data accuracy through precise location tracking and validation.',
    tags: ['Android', 'Java', 'Google Maps API'],
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1472&auto=format&fit=crop',
    link: '#',
    year: '2023',
    client: 'Personal Project',
    role: 'Android Developer',
    challenges: 'Delivering fast and reliable search results for nearby stations.',
    solution: 'Optimized search functionality to deliver faster results, significantly improving the user experience.'
  }
];

// === SERVICES ===
export const SERVICES: Service[] = [
  { 
    id: '1', 
    slug: 'cross-platform-dev',
    title: 'Flutter Development', 
    description: 'Building beautiful, natively compiled applications for mobile from a single codebase.', 
    icon: 'smartphone',
    features: ['Custom UI/UX', 'Clean Architecture', 'State Management (Bloc/Provider)', 'Performance Tuning'],
    fullDescription: "I leverage the power of Flutter to build high-quality native interfaces on iOS and Android in record time. My focus is on writing clean, maintainable code that scales.",
    process: [
      { title: 'Analysis', description: 'Understanding app requirements and target audience.' },
      { title: 'Architecture', description: 'Setting up Clean Architecture and modular structure.' },
      { title: 'Development', description: 'Iterative coding with regular builds.' },
      { title: 'Deployment', description: 'Publishing to Play Store and App Store.' }
    ]
  },
  { 
    id: '2', 
    slug: 'android-native',
    title: 'Native Android', 
    description: 'Robust and high-performance native Android applications using Kotlin.', 
    icon: 'code',
    features: ['Jetpack Compose', 'Room Database', 'Background Services', 'Hardware Integration'],
    fullDescription: "For projects requiring deep system integration or maximum performance, I build native Android apps using modern Kotlin practices and Jetpack Compose.",
    process: [
      { title: 'Design', description: 'Material Design implementation.' },
      { title: 'Logic', description: 'Business logic with MVVM.' },
      { title: 'Persistence', description: 'Local data storage with Room.' },
      { title: 'Optimization', description: 'Memory profiling and battery optimization.' }
    ]
  },
  { 
    id: '3', 
    slug: 'gen-ai-solutions',
    title: 'Generative AI', 
    description: 'Integrating LLMs and AI models into mobile experiences.', 
    icon: 'bot',
    features: ['LLM Integration', 'Prompt Engineering', 'AI Agents', 'RAG Pipelines'],
    fullDescription: "I bridge the gap between traditional mobile apps and the cutting edge of Generative AI, creating intelligent interfaces that understand and assist users.",
    process: [
      { title: 'Strategy', description: 'Identifying AI use cases.' },
      { title: 'Integration', description: 'Connecting Gemini/OpenAI APIs.' },
      { title: 'Fine-tuning', description: 'Optimizing responses.' },
      { title: 'UX', description: 'Designing AI-native interfaces.' }
    ]
  },
  { 
    id: '4', 
    slug: 'backend-integration',
    title: 'API & Backend', 
    description: 'Seamless integration with Firebase, Supabase, and RESTful APIs.', 
    icon: 'database',
    features: ['Firebase (FCM/Auth)', 'Supabase Real-time', 'REST API (Dio/Retrofit)', 'Socket.io'],
    fullDescription: "A great app needs great data. I specialize in connecting mobile frontends to robust backends, ensuring real-time data sync, secure authentication, and reliable push notifications.",
    process: [
      { title: 'Setup', description: 'Configuring cloud services (Firebase/Supabase).' },
      { title: 'Integration', description: 'Connecting APIs using Dio or Retrofit.' },
      { title: 'Real-time', description: 'Implementing Sockets or Streams.' },
      { title: 'Testing', description: 'Ensuring data integrity and error handling.' }
    ]
  }
];

// === BLOG ===
export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'clean-architecture-flutter',
    title: 'Clean Architecture in Flutter',
    excerpt: 'Why modularity matters for scalable mobile applications.',
    date: 'Oct 20, 2024',
    readTime: '6 min read',
    category: 'Development',
    imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1470&auto=format&fit=crop',
    content: `
      <p>Building small apps is easy, but maintaining large ones is hard. This is where Clean Architecture comes in. By separating your code into independent layers—Domain, Data, and Presentation—you create a codebase that is testable, maintainable, and scalable.</p>
      <h3 class="text-2xl font-bold my-4">The Layers</h3>
      <p>The <strong>Domain Layer</strong> contains your business logic and entities. It should be completely independent of Flutter.</p>
      <p>The <strong>Data Layer</strong> handles data retrieval from APIs or local databases. It implements the interfaces defined in the domain layer.</p>
      <p>The <strong>Presentation Layer</strong> is where UI/UX lives (Widgets, Bloc/Provider). It depends on the domain layer to get data.</p>
    `
  },
  {
    id: '2',
    slug: 'ai-in-mobile',
    title: 'Integrating Gen AI in Mobile Apps',
    excerpt: 'Enhancing user experience with On-device and Cloud AI.',
    date: 'Nov 12, 2024',
    readTime: '6 min read',
    category: 'Gen AI',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop',
    content: `
      <p>Generative AI is transforming how users interact with mobile applications. From smart replies to personalized content generation, the possibilities are endless.</p>
      <h3 class="text-2xl font-bold my-4">Hybrid Approach</h3>
      <p>By combining lightweight on-device models for latency-sensitive tasks and powerful cloud APIs (like Gemini) for complex reasoning, we can build apps that are both responsive and intelligent.</p>
    `
  },
  {
    id: '3',
    slug: 'real-time-flutter',
    title: 'Real-time Features with Socket.io',
    excerpt: 'Building live chat functionality in Flutter.',
    date: 'Aug 05, 2024',
    readTime: '7 min read',
    category: 'Tutorial',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
    content: `
      <p>In modern apps, users expect real-time feedback. Whether it's a chat app, live score updates, or location tracking, Socket.io is a powerful tool to enable bidirectional communication.</p>
      <p>In my recent project Turflo, integrating Socket.io allowed us to increase user session time by 35%. The key is to manage the socket connection lifecycle properly within your state management solution (like Bloc) to avoid memory leaks.</p>
    `
  }
];