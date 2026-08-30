export const profile = {
  name: "BhargavLal KrishnaReddy Pulluru",
  title: "Senior Frontend Developer",
  tagline:
    "Technical Lead — Frontend with 6+ years architecting scalable, high-performance web applications and organization-wide design systems.",
  email: "bhargav.lkp.25@gmail.com",
  phone: "+91 7989272121",
  location: "Bangalore, India",
  linkedin: "https://www.linkedin.com/in/bhargav-lal-krishna-pulluru-46544a202/",
  initials: "BK",
  photo: "/my_photo.jpg",
  resume: "/resume.pdf",
};

export const skills = [
  "ReactJS",
  "NextJS",
  "TypeScript",
  "JavaScript",
  "TailwindCSS",
  "Bootstrap",
  "CSS",
  "HTML",
  "Zustand",
  "Supabase",
  "Lighthouse Analysis",
  "Git",
  "GitHub",
  "Pusher",
] as const;

export const keyExpertise = [
  {
    title: "Frontend Development",
    items: ["Next.js", "React.js", "TypeScript", "JavaScript", "Angular", "Tailwind CSS", "Bootstrap", "CSS", "HTML"],
  },
  {
    title: "State Management",
    items: ["Redux", "Zustand", "React Context API", "Recoil"],
  },
  {
    title: "Backend & Database",
    items: ["Supabase", "PostgreSQL", "MySQL", "Node.js", "Express.js", "PHP"],
  },
  {
    title: "Performance Optimization",
    items: ["Lighthouse Analysis", "Lazy Loading", "Code Splitting"],
  },
  {
    title: "Real-Time Communication",
    items: ["Pusher", "Socket.IO", "WebSockets"],
  },
  {
    title: "Development Tools",
    items: ["Git", "GitHub", "Postman", "Vercel"],
  },
  {
    title: "Team Leadership & Mentorship",
    items: ["Code Reviews", "Training Interns", "Agile Methodologies"],
  },
] as const;

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  technologies?: string;
  summary?: string;
  bullets: string[];
  subRoles?: {
    role: string;
    technologies?: string;
    bullets: string[];
  }[];
};

export const experience: Experience[] = [
  {
    role: "Technical Lead",
    company: "HCLTech",
    period: "08/2025 – Present",
    location: "Bangalore, India",
    technologies: "Next.js, React.js, TypeScript, JavaScript, Jest, GitHub, Git",
    bullets: [],
    subRoles: [
      {
        role: "Technical Lead – Frontend | Epiroc (Client)",
        technologies:
          "React.js, TypeScript, JavaScript (ES6+), Zustand, Tailwind CSS 4, Storybook, Figma, HTML5, CSS3, MapLibre GL JS, Lucide Icons, Git, GitHub, GitHub Copilot, SVGO",
        bullets: [
          "Leading frontend development for a large-scale Industrial IoT platform used to monitor machine health, assets, operations, and fleet connectivity.",
          "Architecting and developing scalable, reusable, and high-performance React components for multiple business modules.",
          "Developing responsive dashboards, machine detail pages, asset management modules, operational insights, and live asset tracking features.",
          "Implemented an interactive Live Assets Map using MapLibre GL JS to visualize real-time machine locations and operational data.",
          "Collaborating with backend and full-stack engineers to integrate REST APIs and deliver seamless user experiences.",
          "Driving frontend architecture decisions, component reusability, state management, and performance optimization.",
          "Reviewing pull requests, maintaining coding standards, and ensuring high-quality, maintainable code.",
          "Assigning development tasks, providing technical guidance, and mentoring team members throughout the development lifecycle.",
          "Working closely with UX designers and product stakeholders to translate business requirements into intuitive user interfaces.",
          "Leading the development of a centralized Design System to standardize UI components across organizational applications, using Atomic Design and Storybook.",
          "Establishing design tokens, typography, spacing, color systems, and component guidelines.",
          "Optimizing SVG assets using SVGO and integrating Lucide Icons for a lightweight, consistent visual language.",
        ],
      },
      {
        role: "Senior Frontend Developer | PayPal (Client)",
        bullets: [
          "Gained hands-on exposure to Next.js and React architecture within PayPal's large-scale frontend ecosystem.",
          "Explored and understood Guest Checkout features, including form handling, validation logic, and user flow.",
          "Assisted in minor UI updates, bug fixes, and unit testing tasks using Jest.",
          "Collaborated with senior developers to understand code structure, best practices, and development workflows in an enterprise setup.",
        ],
      },
    ],
  },
  {
    role: "Senior Web Developer / Team Lead",
    company: "Miles Education",
    period: "10/2022 – 08/2025",
    location: "Bangalore, India",
    technologies:
      "Next.js, React.js, Angular, TypeScript, JavaScript, Tailwind CSS, Supabase, PostgreSQL, Pusher, Socket.IO, Git, Docker",
    bullets: [
      "Led and mentored a team of 10 developers, improving project efficiency, collaboration, and code quality.",
      "Designed and developed high-performance CRM, CMS, and LMS applications, enhancing scalability and maintainability.",
      "Architected authentication and real-time communication features using Pusher and Socket.IO.",
      "Collaborated with backend developers to integrate APIs and optimize data fetching and database performance (Supabase, PostgreSQL).",
      "Worked closely with UI/UX designers to deliver responsive, accessible, and visually engaging interfaces.",
      "Implemented agile best practices, ensuring timely delivery and continuous improvement across projects.",
      "Optimized performance by reducing unnecessary re-renders and applying lazy loading, improving load times by up to 40% and boosting engagement.",
      "Transitioned into a full-stack capacity, handling backend integrations and database optimization.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Get Nine Software",
    period: "01/2020 – 10/2022",
    location: "Hyderabad, India",
    technologies: "PHP, JavaScript, React.js, MySQL, Node.js, Bootstrap, JQuery, HTML, CSS",
    bullets: [
      "Progressed from intern to full-time developer within 3 months, demonstrating strong technical & problem-solving skills.",
      "Developed & maintained 10+ CMS, LMS & website projects, ensuring high performance and scalability.",
      "Built & optimized RESTful APIs using PHP & MySQL, improving data retrieval efficiency.",
      "Implemented frontend state management using Redux, improving application responsiveness.",
      "Designed & developed reusable UI components, reducing development time for new features.",
      "Enhanced application security by implementing JWT-based authentication.",
      "Worked in an agile development environment, participating in sprints, daily stand-ups, and code reviews.",
    ],
  },
];

export type Project = {
  title: string;
  company: string;
  location: string;
  period: string;
  /** Optional — comma-separated, same format as `experience[].technologies`. Add per-project as details come in. */
  technologies?: string;
  description: string;
  /** Optional — set once a live/repo link exists. */
  link?: string;
};

/**
 * Newest first. To add a new project, prepend an entry here — no component
 * changes needed (Projects.tsx just maps over this array).
 */
export const projects: Project[] = [
  {
    title: "Doctors CRM (MilesForce 3)",
    company: "Miles Education",
    location: "Bangalore (Offsite)",
    period: "May 2025 – Aug 2025",
    description:
      "A new vertical was introduced in the organization to serve Doctors, requiring a minimal CRM platform focused on essential features like Calling, All Leads, Lead Details, and Queue. Leveraging experience from the previous CRM project, we successfully delivered these core features within a tight timeline.",
  },
  {
    title: "Miles CRM (MilesForce)",
    company: "Miles Education",
    location: "Bangalore (Offsite)",
    period: "Jun 2024 – May 2025",
    technologies: "Next.js, React.js, Tailwind CSS, Zustand",
    description:
      "MilesForce is an in-house CRM application built using Next.js, React, Tailwind CSS, and Zustand. It is designed to streamline lead tracking and student enrollment processes. The platform focuses on efficient lead engagement, helping teams manage and convert prospects more effectively.",
  },
  {
    title: "Miles LMS — 2024 Revamp",
    company: "Miles Education Pvt Ltd",
    location: "Bangalore (Offsite)",
    period: "Oct 2023 – Dec 2023",
    description:
      "New version of the existing LMS at Miles Education — revamped with new designs and functionality; the look and feel is entirely different from the original.",
  },
  {
    title: "Miles Education Website",
    company: "Miles Education",
    location: "Bangalore (Offsite)",
    period: "Aug 2023 – Aug 2024",
    technologies: "Next.js, TypeScript, Supabase",
    description:
      "An information hub for users to explore the organization and its courses, with the option to enroll directly. Includes six main modules: Home, Courses, Contact, About Us, Blogs, and special campaign pages.",
  },
  {
    title: "Webinar Registration Website & Payment Integration",
    company: "Miles CPA",
    location: "Offsite",
    period: "Jun 2023 – Sep 2023",
    technologies: "Next.js, Supabase",
    description:
      "Landing page for webinar registration in the Miles USP, including a payment page and direct registration based on shared links. Built on Next.js with a Supabase real-time database.",
  },
  {
    title: "Miles CPA Factory",
    company: "Miles CPA",
    location: "Bangalore (Offsite)",
    period: "Mar 2023 – Aug 2023",
    description: "A CMS project where all questions, SIMs, and MCQs are created and managed.",
  },
  {
    title: "MILES Education LMS",
    company: "Miles CPA",
    location: "Bangalore (Offsite)",
    period: "Oct 2022 – Oct 2023",
    description:
      "A Learning Management System where students access their exams, SIMs, notes, and webinars from within the platform.",
  },
  {
    title: "Sweetart Web Billing",
    company: "Just Bake",
    location: "Offsite",
    period: "Sep 2022",
    description: "Web billing application built for a franchise of Just Bake.",
  },
  {
    title: "Tutorhive Web Application",
    company: "Tutorhive",
    location: "Offsite",
    period: "May 2022 – Sep 2022",
    description: "Worked on the chat module, set-availability module, invite-buddies flow, and user search.",
  },
  {
    title: "Tutorhive Single Page Web App",
    company: "Tutorhive",
    location: "Offsite",
    period: "Feb 2022 – May 2022",
    description: "Educational website built for tutors and students.",
  },
  {
    title: "HouseBuddy Web Application",
    company: "HouseBuddy",
    location: "Offsite",
    period: "Oct 2021 – Feb 2022",
    description: "Main application powering the HouseBuddy user experience.",
  },
  {
    title: "HouseBuddy Website & CMS Application",
    company: "House Buddy",
    location: "Offsite",
    period: "Aug 2021 – Oct 2021",
    technologies: "PHP, MySQL, Bootstrap",
    description: "Public website for the HouseBuddy application, built on PHP, MySQL, and Bootstrap.",
  },
  {
    title: "Just Bake E-commerce Web Application UI",
    company: "Just Bake",
    location: "Offsite",
    period: "Apr 2021 – Jul 2021",
    description: "New e-commerce UI built as a frontend developer, from scratch to launch.",
  },
  {
    title: "CFM India Online Course E-commerce & CMS",
    company: "CFM India",
    location: "Offsite",
    period: "Dec 2020 – Feb 2021",
    description: "Education e-commerce application built for management students.",
  },
  {
    title: "Berlynoak E-commerce Website & CMS",
    company: "Berlynoak",
    location: "Offsite",
    period: "Oct 2020 – Jan 2021",
    description: "E-commerce website and CMS for a furniture & appliances brand modeled on Royal Oak.",
  },
  {
    title: "Just Bake Web Billing Application",
    company: "Just Bake",
    location: "Offsite",
    period: "Oct 2019 – Sep 2020",
    description: "Web billing application for Just Bake — still maintained.",
  },
  {
    title: "Chef Bake E-commerce",
    company: "Chef Bakers",
    location: "Offsite",
    period: "Sep 2019 – Nov 2019",
    description: "Maintenance work on the e-commerce application in its initial stage of development.",
  },
];

export const education = [
  {
    school: "Srikalahasteeswara Institute of Technology",
    degree: "Bachelor of Technology (B.Tech), Electronics and Communication Engineering",
    period: "2014 – 2019",
    location: "Srikalahasthi, India",
  },
  {
    school: "Narayana Jr College",
    degree: "Intermediate (MPC)",
    period: "2012 – 2014",
    location: "Nellore, India",
  },
  {
    school: "Audisankara Techno School",
    degree: "SSC (10th Grade)",
    period: "2011 – 2012",
    location: "Srikalahasthi, India",
  },
];

export const achievements = [
  "Best Employee of the Year (2020 & 2021) – Get Nine Software Pvt Ltd, Hyderabad, India.",
  "Mentored & trained junior developers, enhancing team productivity & knowledge-sharing – Miles Education.",
];

export const certificates = [
  "JavaScript (Basic & Intermediate) – HackerRank",
  "React (Basic) – HackerRank",
  "CSS (Basic) – HackerRank",
];

export const interests = ["Quantum Computing", "Devops", "Cricket"];
