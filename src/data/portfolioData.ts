import { Project, SkillGroup, Milestone, ContactInfo } from '../types';

export const PERSONAL_INFO = {
  name: "Gaurav Suhas Kad",
  title: "B.Tech AI & ML | First Year Completed (8.86 CGPA)",
  shortBio: "Enthusiastic B.Tech AI & ML student at Zeal College, Narhe, Pune. Completed First Year with an 8.86 CGPA. Eager to master Programming, Web Development, and Problem Solving for creative and innovative projects.",
  aboutMe: "I am a dedicated B.Tech student specializing in Artificial Intelligence & Machine Learning at Zeal College of Engineering and Research, Narhe, Pune. Having completed my First Year with an outstanding 8.86 CGPA, I am actively building my foundation in C programming, data structures, and modern front-end web development. My goal is to develop intelligent software solutions that bridge theoretical AI concepts with real-world impact.",
  location: "Narhe, Pune",
  email: "gauravkad2424@gmail.com",
  phone: "+91 9673747641",
  college: "Zeal College of Engineering and Research, Narhe, Pune",
  avatarUrl: "/gaurav_photo.jpg", // Points to public/gaurav_photo.webp
  resumeUrl: "/resume.pdf"
};

export const CONTACT_INFO: ContactInfo = {
  phone: "+91 9673747641",
  email: "gauravkad2424@gmail.com",
  location: "Narhe, Pune",
  college: "Zeal College of Engineering and Research, Narhe, Pune",
  github: "https://github.com/gauravkad24",
  linkedin: "https://www.linkedin.com/in/gaurav-kad-7330b23a7?utm_source=share_via&utm_content=profile&utm_medium=member_android"
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Passion & Soft Skills",
    icon: "Sparkles",
    type: "soft",
    skills: [
      { name: "Programming", icon: "Code" },
      { name: "Web Development", icon: "Layout" },
      { name: "Problem Solving", icon: "BrainCircuit" },
      { name: "Communication", icon: "MessageSquare" },
      { name: "Critical Thinking", icon: "Lightbulb" },
      { name: "Team Collaboration", icon: "Users" },
      { name: "AI & ML Fundamentals", icon: "Sparkles" }
    ]
  },
  {
    title: "Tech Stack",
    icon: "FolderCode",
    type: "tech",
    currentLearning: [
      { name: "Python", highlight: true },
      { name: "C Language", highlight: true },
      { name: "HTML5", highlight: false },
      { name: "CSS3", highlight: false },
      { name: "Git / GitHub", highlight: false }
    ],
    futureRoadmap: [
      { name: "C++", highlight: false },
      { name: "Data Structures & Algorithms (DSA)", highlight: false },
      { name: "Machine Learning / Scikit-Learn", highlight: false },
      { name: "JavaScript", highlight: false }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    category: "Web Frontend",
    badges: ["WEB", "FRONTEND"],
    description: "Built with HTML, CSS, and modern UI components. Features responsive design, glassmorphism elements, and a dark mode theme to showcase student milestones and skills.",
    longDescription: "A state-of-the-art interactive personal portfolio engineered to present academic accomplishments, technical skills, and software engineering coursework. Designed with a custom dark aesthetic, luminescent borders, responsive mobile navigation, and seamless scroll interactions.",
    tags: ["#HTML", "#TailwindCSS", "#JS"],
    icon: "Folder",
    githubUrl: "https://github.com/gauravkad24",
    demoUrl: "#",
    features: [
      "Responsive Glassmorphic UI with dynamic hover lighting",
      "Interactive Education Timeline and Milestone Tracker",
      "Direct Mail & Phone Click-to-Action with instant copy",
      "Modern dark theme optimized for low-light environments"
    ],
    codeSnippet: `<!-- Portfolio Hero Section -->
<section id="hero" class="min-h-screen flex flex-col items-center justify-center text-center">
  <div class="avatar-ring p-1 rounded-full border border-neutral-700">
    <img src="avatar.jpg" alt="Gaurav Suhas Kad" class="w-40 h-40 rounded-full" />
  </div>
  <h1 class="text-4xl md:text-5xl font-bold mt-6 text-white">Gaurav Suhas Kad</h1>
  <p class="text-sky-300 font-medium text-lg mt-2">Student | First-Year B.Tech in AI & ML</p>
  <button onclick="scrollToSection('contact')" class="btn-primary mt-8">
    Let's Connect
  </button>
</section>`
  },
  {
    id: "c-utilities-algorithms",
    title: "C Language Utilities & Algorithms",
    category: "System Algorithms",
    badges: ["SYSTEM", "ALGORITHMS"],
    description: "A collection of fundamental algorithms and problem-solving scripts in C. Includes implementations of search/sort algorithms and basic utility functions for engineering coursework.",
    longDescription: "A curated repository of fundamental algorithm implementations written in standard C language. Covers linear/binary search algorithms, bubble & selection sorting, recursion patterns, string manipulation utilities, and memory allocation practices for first-year engineering mathematics and computing fundamentals.",
    tags: ["#CLanguage", "#DSA", "#LogicBuilding"],
    icon: "Terminal",
    githubUrl: "https://github.com/gauravkad24",
    features: [
      "Optimized Array Search & Sorting Algorithms (Binary Search, Bubble Sort)",
      "Mathematical Utilities (Factorial, Fibonacci recursion, Prime checkers)",
      "Dynamic Memory Management & Pointer manipulation exercises",
      "Formatted CLI console outputs with error handling"
    ],
    codeSnippet: `#include <stdio.h>

// Binary Search Algorithm in C
int binarySearch(int arr[], int size, int target) {
    int low = 0, high = size - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1; // Target not found
}

int main() {
    int data[] = {10, 20, 30, 42, 55, 78, 89};
    int n = sizeof(data) / sizeof(data[0]);
    int key = 42;
    int index = binarySearch(data, n, key);
    if (index != -1) 
        printf("Element %d found at index %d\\n", key, index);
    else 
        printf("Element not found\\n");
    return 0;
}`
  }
];

export const MILESTONES: Milestone[] = [
  {
    id: "btech-aiml",
    year: "2025 - 2029",
    title: "B.TECH IN AI & ML",
    institution: "First Year Completed with 8.86 CGPA | Zeal College of Engineering and Research",
    score: "8.86 CGPA (First Year Completed)",
    status: "current",
    icon: "GraduationCap",
    description: "Successfully completed First Year B.Tech program specializing in Artificial Intelligence and Machine Learning with an 8.86 CGPA. Focusing on foundational engineering mathematics, programming in C, problem solving logic, and web development."
  },
  {
    id: "mht-cet",
    year: "2025",
    title: "MHT-CET",
    institution: "State Level Engineering Entrance Exam",
    score: "Achieved 89.28 Percentile",
    status: "completed",
    icon: "Trophy",
    description: "Secured a top percentile of 89.28 in the state engineering entrance test, demonstrating strong logical reasoning, physics, chemistry, and mathematics proficiency."
  },
  {
    id: "nda-prep",
    year: "2022 - 2024",
    title: "UPSC NDA Preparation & Examination",
    institution: "2-Year Defence Academy Training (11th & 12th Grade)",
    score: "NDA Coaching & Leadership Discipline",
    status: "completed",
    icon: "ShieldCheck",
    description: "Underwent 2 years of rigorous NDA coaching focusing on Mathematics, General Ability, Leadership, and Physical Discipline."
  },
  {
    id: "hsc-completion",
    year: "2024",
    title: "HSC Completion",
    institution: "Gaytri Junior College (72.17%)",
    score: "72.17%",
    status: "completed",
    icon: "Award",
    description: "Completed Higher Secondary Certificate (HSC) in Science Stream with focus on Physics, Chemistry, and Higher Mathematics."
  }
];