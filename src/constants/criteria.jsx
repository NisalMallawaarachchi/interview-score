export const roles = {
  backend: "Backend Developer (Node.js/Express)",
  frontend: "Frontend Developer (React)",
  fullstack: "Fullstack Developer (MERN)",
};

export const criteria = {
  backend: [
    {
      category: "Node.js & Backend Skills",
      weight: 40,
      items: [
        { name: "Node.js Fundamentals", max: 10 },
        { name: "Express.js & Middleware", max: 10 },
        { name: "RESTful API Design & Best Practices", max: 10 },
        { name: "Authentication & Authorization (JWT, OAuth)", max: 10 },
      ],
    },
    {
      category: "MongoDB & Database",
      weight: 25,
      items: [
        { name: "SQL vs NoSQL Databases", max: 8 },
        { name: "Mongoose Schema & Models", max: 8 },
        { name: "Database Design & Optimization", max: 9 },
      ],
    },
    {
      category: "Problem Solving & Code Quality",
      weight: 15,
      items: [
        { name: "Git and GitHub Knowledge", max: 8 },
        { name: "SQL Query", max: 7 },
      ],
    },
    {
      category: "Additional Backend Skills",
      weight: 12,
      items: [
        { name: "Error Handling & Validation", max: 4 },
        { name: "Async/Await & Promises", max: 4 },
        { name: "CORS", max: 4 },
      ],
    },
    {
      category: "Communication & Soft Skills",
      weight: 8,
      items: [
        { name: "Technical Communication", max: 4 },
        { name: "Team Collaboration & Learning Attitude", max: 4 },
      ],
    },
  ],
  
  frontend: [
    {
      category: "React Fundamentals",
      weight: 40,
      items: [
        { name: "React Components & JSX", max: 10 },
        { name: "State Management (useState, useReducer)", max: 10 },
        { name: "React Hooks (useEffect, Custom Hooks)", max: 10 },
        { name: "Props & Component Communication", max: 10 },
      ],
    },
    {
      category: "Advanced React & State Management",
      weight: 25,
      items: [
        { name: "Context API / Redux", max: 10 },
        { name: "React Router & Navigation", max: 8 },
        { name: "API Integration (Axios/Fetch)", max: 7 },
      ],
    },
    {
      category: "UI/UX & Styling",
      weight: 15,
      items: [
        { name: "CSS/SCSS or Tailwind CSS", max: 8 },
        { name: "Responsive Design & Mobile-First", max: 7 },
      ],
    },
    {
      category: "Problem Solving & Code Quality",
      weight: 12,
      items: [
        { name: "Component Design Patterns", max: 6 },
        { name: "Performance Optimization", max: 6 },
      ],
    },
    {
      category: "Communication & Soft Skills",
      weight: 8,
      items: [
        { name: "Technical Communication", max: 4 },
        { name: "Team Collaboration & Learning Attitude", max: 4 },
      ],
    },
  ],
  
  fullstack: [
    {
      category: "MERN Stack Knowledge",
      weight: 45,
      items: [
        { name: "MongoDB & Mongoose", max: 10 },
        { name: "Express.js & Node.js", max: 12 },
        { name: "React & State Management", max: 12 },
        { name: "Full Stack Integration & API Consumption", max: 11 },
      ],
    },
    {
      category: "Backend Development",
      weight: 20,
      items: [
        { name: "RESTful API Design", max: 7 },
        { name: "Authentication & Security", max: 7 },
        { name: "Error Handling & Validation", max: 6 },
      ],
    },
    {
      category: "Frontend Development",
      weight: 15,
      items: [
        { name: "React Components & Hooks", max: 8 },
        { name: "UI/UX Implementation", max: 7 },
      ],
    },
    {
      category: "DevOps & Tools",
      weight: 12,
      items: [
        { name: "Git & Version Control", max: 4 },
        { name: "Deployment (Vercel/Heroku/AWS)", max: 4 },
        { name: "Environment Variables & Config", max: 4 },
      ],
    },
    {
      category: "Communication & Soft Skills",
      weight: 8,
      items: [
        { name: "Technical Communication", max: 4 },
        { name: "Problem Solving & Learning Attitude", max: 4 },
      ],
    },
  ],
};