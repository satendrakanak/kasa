import { InterviewDifficulty } from "@prisma/client";

export type CuratedInterviewQuestion = {
  roleTitle: string;
  roleAliases?: string[];
  topicTitle: string;
  topicGroup?: string;
  question: string;
  context?: string;
  shortAnswer: string;
  answer: string;
  expectedPoints: string[];
  commonMistakes: string[];
  followUps: string[];
  difficulty: InterviewDifficulty;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
};

export const curatedInterviewQuestions: CuratedInterviewQuestion[] = [
  {
    roleTitle: "Frontend Developer",
    roleAliases: ["React Developer", "UI Developer"],
    topicTitle: "React Hooks",
    topicGroup: "React",
    question: "What is the difference between useEffect and useMemo in React?",
    context: "A common fresher and junior frontend question used to test rendering, side effects, and performance basics.",
    shortAnswer:
      "useEffect runs side effects after render, while useMemo memoizes an expensive calculated value during render when dependencies change.",
    answer:
      "useEffect is used for side effects such as API calls, subscriptions, timers, analytics, or manually interacting with browser APIs. It runs after React has committed the render. useMemo is used to memoize the result of a calculation so that React does not recompute it on every render unless its dependencies change.\n\nA good interview answer should mention that useMemo should not be used for every value. It is useful when the calculation is expensive or when stable reference identity helps avoid unnecessary child renders. useEffect should not be used to calculate values that can be derived during render.",
    expectedPoints: [
      "useEffect is for side effects after render.",
      "useMemo is for memoizing calculated values.",
      "Both depend on dependency arrays.",
      "Do not use useEffect for derived state when normal render calculation is enough.",
      "Do not overuse useMemo for cheap calculations.",
    ],
    commonMistakes: [
      "Saying useMemo runs after render like useEffect.",
      "Using useEffect to calculate every derived value.",
      "Adding empty dependency arrays without understanding stale data.",
    ],
    followUps: [
      "When would you use useCallback instead of useMemo?",
      "What happens if dependencies are missing?",
      "How do React Strict Mode double effects affect development?",
    ],
    difficulty: InterviewDifficulty.BEGINNER,
    tags: ["react", "hooks", "useeffect", "usememo", "frontend"],
    seoTitle: "useEffect vs useMemo in React Interview Question and Answer",
    seoDescription:
      "Understand the difference between useEffect and useMemo in React with a fresher-friendly interview answer, expected points, mistakes, and follow-up questions.",
  },
  {
    roleTitle: "Frontend Developer",
    roleAliases: ["JavaScript Developer", "React Developer"],
    topicTitle: "JavaScript Closures",
    topicGroup: "JavaScript",
    question: "What is a closure in JavaScript?",
    context: "This question tests whether a candidate understands lexical scope and how functions remember variables.",
    shortAnswer:
      "A closure is created when a function remembers variables from its lexical scope even after the outer function has finished executing.",
    answer:
      "A closure in JavaScript means an inner function has access to variables defined in its outer function, even after the outer function has returned. This happens because functions carry their lexical environment with them.\n\nFor example, a function that returns another function can keep a private counter variable. Every time the returned function runs, it can still access and update that counter. Closures are used in callbacks, event handlers, function factories, private state, and many React patterns.",
    expectedPoints: [
      "A function remembers its lexical scope.",
      "The outer function may finish, but variables can still be accessed.",
      "Closures help create private state.",
      "Common in callbacks, event handlers, and function factories.",
    ],
    commonMistakes: [
      "Confusing closure with class inheritance.",
      "Only giving a memorized definition without an example.",
      "Not mentioning lexical scope.",
    ],
    followUps: [
      "Can closures cause memory leaks?",
      "How are closures used in React hooks?",
      "Explain closure with a counter example.",
    ],
    difficulty: InterviewDifficulty.BEGINNER,
    tags: ["javascript", "closure", "scope", "frontend"],
    seoTitle: "What is Closure in JavaScript? Interview Answer for Freshers",
    seoDescription:
      "Practice a clear JavaScript closure interview answer with examples, expected points, common mistakes, and follow-up questions.",
  },
  {
    roleTitle: "Backend Developer",
    roleAliases: ["Node.js Developer", "API Developer"],
    topicTitle: "REST API",
    topicGroup: "Backend",
    question: "What makes a REST API well designed?",
    context: "Backend interviews often use this question to check API design, naming, status codes, and consistency.",
    shortAnswer:
      "A well-designed REST API uses clear resources, proper HTTP methods, meaningful status codes, validation, pagination, consistent errors, and secure authentication.",
    answer:
      "A good REST API is designed around resources rather than actions. It uses nouns in URLs, HTTP methods correctly, and returns predictable responses. GET should read data, POST should create, PUT or PATCH should update, and DELETE should remove. Status codes should communicate the result clearly, such as 200, 201, 400, 401, 403, 404, and 500.\n\nFor production use, the API should also include validation, authentication, authorization, pagination for lists, filtering, sorting, rate limiting, and consistent error formats. Good documentation and versioning make the API easier to maintain.",
    expectedPoints: [
      "Resource-based URL naming.",
      "Correct use of HTTP methods.",
      "Meaningful status codes.",
      "Validation and consistent error responses.",
      "Pagination, filtering, authentication, and authorization.",
    ],
    commonMistakes: [
      "Using verbs for every endpoint name.",
      "Returning 200 for every success and failure.",
      "Ignoring pagination for list endpoints.",
    ],
    followUps: [
      "Difference between PUT and PATCH?",
      "How would you secure an API?",
      "How do you design API error responses?",
    ],
    difficulty: InterviewDifficulty.INTERMEDIATE,
    tags: ["rest", "api", "backend", "http", "nodejs"],
    seoTitle: "What Makes a REST API Well Designed? Interview Answer",
    seoDescription:
      "Learn how to answer REST API design interview questions with resource naming, HTTP methods, status codes, validation, pagination, and security.",
  },
  {
    roleTitle: "Backend Developer",
    roleAliases: ["Node.js Developer"],
    topicTitle: "Authentication",
    topicGroup: "Backend",
    question: "What is the difference between authentication and authorization?",
    context: "A must-know backend and full-stack interview question for login, roles, and access control.",
    shortAnswer:
      "Authentication verifies who the user is, while authorization decides what that verified user is allowed to access.",
    answer:
      "Authentication answers the question: who are you? It usually happens through passwords, OTP, OAuth, SSO, or tokens. Authorization answers: what are you allowed to do? It checks permissions, roles, ownership, plan access, or policies after the user identity is known.\n\nFor example, logging in with email and password is authentication. Allowing only admins to access an admin dashboard is authorization. A secure system needs both because a logged-in user should not automatically have access to every resource.",
    expectedPoints: [
      "Authentication verifies identity.",
      "Authorization checks permission.",
      "Authorization happens after authentication.",
      "Examples: login versus admin-only access.",
      "Both are required for secure systems.",
    ],
    commonMistakes: [
      "Using both words as the same thing.",
      "Not giving a practical example.",
      "Forgetting resource ownership checks.",
    ],
    followUps: [
      "What is role-based access control?",
      "How would you secure admin APIs?",
      "Where do JWT tokens fit in?",
    ],
    difficulty: InterviewDifficulty.BEGINNER,
    tags: ["authentication", "authorization", "security", "backend"],
    seoTitle: "Authentication vs Authorization Interview Question and Answer",
    seoDescription:
      "Freshers can learn the difference between authentication and authorization with examples, expected interview points, and follow-up questions.",
  },
  {
    roleTitle: "Full Stack Developer",
    roleAliases: ["MERN Developer", "Web Developer"],
    topicTitle: "Database Indexing",
    topicGroup: "Database",
    question: "What is a database index and when should you use it?",
    context: "This question checks whether a candidate understands query performance and trade-offs.",
    shortAnswer:
      "A database index is a data structure that speeds up reads for selected columns, but it adds storage cost and can slow down writes.",
    answer:
      "A database index helps the database find rows faster without scanning the entire table. It is useful on columns that are frequently used in WHERE, JOIN, ORDER BY, or UNIQUE constraints. For example, indexing an email column helps login lookup quickly find a user.\n\nIndexes are not free. They take extra storage and must be updated whenever data is inserted, updated, or deleted. Too many indexes can make writes slower. A good answer should mention that indexes should be based on real query patterns and checked using query plans.",
    expectedPoints: [
      "Index speeds up read queries.",
      "Useful for WHERE, JOIN, ORDER BY, and unique lookup columns.",
      "Indexes cost storage.",
      "Indexes can slow inserts and updates.",
      "Use query patterns and query plans to decide.",
    ],
    commonMistakes: [
      "Saying every column should be indexed.",
      "Ignoring write performance cost.",
      "Not linking indexes to real queries.",
    ],
    followUps: [
      "What is a composite index?",
      "When can an index be ignored?",
      "How would you debug a slow query?",
    ],
    difficulty: InterviewDifficulty.INTERMEDIATE,
    tags: ["database", "index", "sql", "performance"],
    seoTitle: "What is Database Indexing? Interview Answer with Examples",
    seoDescription:
      "Understand database indexing for interviews with read performance, write trade-offs, query patterns, and practical examples.",
  },
  {
    roleTitle: "Data Analyst",
    roleAliases: ["SQL Analyst", "Business Analyst"],
    topicTitle: "SQL Joins",
    topicGroup: "SQL",
    question: "What is the difference between INNER JOIN and LEFT JOIN in SQL?",
    context: "A common SQL interview question for analysts, backend developers, and freshers.",
    shortAnswer:
      "INNER JOIN returns only matching rows from both tables, while LEFT JOIN returns all rows from the left table and matching rows from the right table.",
    answer:
      "INNER JOIN returns rows where the join condition matches in both tables. If a row from either table does not match, it is not included. LEFT JOIN returns every row from the left table and adds matching data from the right table. If there is no right-side match, the right-side columns become NULL.\n\nFor example, if you want only users who placed orders, use INNER JOIN between users and orders. If you want all users and their orders if available, use LEFT JOIN.",
    expectedPoints: [
      "INNER JOIN returns matching rows only.",
      "LEFT JOIN keeps all left table rows.",
      "Missing right-side rows become NULL in LEFT JOIN.",
      "Use examples such as users and orders.",
    ],
    commonMistakes: [
      "Saying LEFT JOIN always returns more useful data.",
      "Forgetting NULL values in unmatched right-side rows.",
      "Not explaining table direction.",
    ],
    followUps: [
      "What is RIGHT JOIN?",
      "How do you find rows with no match?",
      "What is the difference between JOIN condition and WHERE condition?",
    ],
    difficulty: InterviewDifficulty.BEGINNER,
    tags: ["sql", "joins", "database", "data-analyst"],
    seoTitle: "INNER JOIN vs LEFT JOIN SQL Interview Question and Answer",
    seoDescription:
      "Learn INNER JOIN vs LEFT JOIN in SQL with fresher-friendly explanation, examples, expected points, and common mistakes.",
  },
  {
    roleTitle: "Computer Science Fresher",
    roleAliases: ["BTech Fresher", "CS Student"],
    topicTitle: "OOP",
    topicGroup: "Computer Science",
    question: "What are the four pillars of object-oriented programming?",
    context: "A basic CS interview question asked in fresher, Java, Python, and backend interviews.",
    shortAnswer:
      "The four pillars of OOP are encapsulation, abstraction, inheritance, and polymorphism.",
    answer:
      "The four pillars of object-oriented programming are encapsulation, abstraction, inheritance, and polymorphism. Encapsulation means keeping data and methods together and controlling access. Abstraction means showing only essential details and hiding unnecessary complexity. Inheritance allows one class to reuse or extend another class. Polymorphism allows the same interface or method name to behave differently depending on the object or implementation.\n\nA strong answer should include a simple example, such as a Payment interface with CardPayment and UPIPayment implementations.",
    expectedPoints: [
      "Encapsulation controls access to data.",
      "Abstraction hides implementation details.",
      "Inheritance reuses and extends behavior.",
      "Polymorphism allows different implementations through a common interface.",
      "Give a practical example.",
    ],
    commonMistakes: [
      "Only listing pillar names without explanation.",
      "Confusing abstraction and encapsulation.",
      "Using inheritance for every reuse case.",
    ],
    followUps: [
      "Difference between abstraction and encapsulation?",
      "What is method overriding?",
      "Composition vs inheritance?",
    ],
    difficulty: InterviewDifficulty.BEGINNER,
    tags: ["oop", "java", "python", "cs-fundamentals"],
    seoTitle: "Four Pillars of OOP Interview Question and Answer",
    seoDescription:
      "Prepare the four pillars of OOP interview question with simple definitions, examples, common mistakes, and follow-up questions.",
  },
  {
    roleTitle: "Computer Science Fresher",
    roleAliases: ["BTech Fresher", "CS Student"],
    topicTitle: "Operating System",
    topicGroup: "Computer Science",
    question: "What is the difference between process and thread?",
    context: "Operating system basics question for CS freshers and backend interviews.",
    shortAnswer:
      "A process is an independent program in execution with its own memory, while a thread is a smaller execution unit inside a process that shares memory with other threads.",
    answer:
      "A process has its own address space, resources, and execution state. Two processes are more isolated from each other. A thread exists inside a process and shares the same memory and resources with other threads of that process. Threads are lighter to create and switch between, but shared memory means synchronization issues can happen.\n\nFor example, a browser may run multiple processes for tabs, while each tab process can use multiple threads for rendering, networking, and JavaScript execution.",
    expectedPoints: [
      "Process has separate memory.",
      "Thread shares memory inside a process.",
      "Threads are lighter than processes.",
      "Threads need synchronization when sharing data.",
      "Give a practical example.",
    ],
    commonMistakes: [
      "Saying process and thread are the same.",
      "Ignoring memory sharing.",
      "Not mentioning synchronization risk.",
    ],
    followUps: [
      "What is context switching?",
      "What is a race condition?",
      "What is deadlock?",
    ],
    difficulty: InterviewDifficulty.BEGINNER,
    tags: ["operating-system", "process", "thread", "cs-fundamentals"],
    seoTitle: "Process vs Thread Interview Question and Answer",
    seoDescription:
      "Learn process vs thread for OS interviews with memory, isolation, synchronization, examples, and follow-up questions.",
  },
  {
    roleTitle: "HR Interview",
    roleAliases: ["Fresher HR Round", "Placement Interview"],
    topicTitle: "Self Introduction",
    topicGroup: "HR",
    question: "How should a fresher answer Tell me about yourself?",
    context: "The first question in many fresher interviews; it tests confidence, clarity, and relevance.",
    shortAnswer:
      "A fresher should give a 45-60 second answer covering education, skills, projects, internship or practical work, strengths, and the target role.",
    answer:
      "A good fresher introduction should be short, relevant, and role-focused. Start with your name, education, and current status. Then mention 2-3 relevant skills, one strong project or internship experience, and what type of role you are looking for. End with why you are interested in the opportunity.\n\nAvoid telling your full life story. The interviewer is checking communication, confidence, and whether your profile matches the role.",
    expectedPoints: [
      "Keep it around 45-60 seconds.",
      "Mention education and current status.",
      "Highlight relevant skills.",
      "Add one project or internship example.",
      "Connect the answer to the target role.",
    ],
    commonMistakes: [
      "Giving a very long personal story.",
      "Repeating the resume line by line.",
      "Not connecting skills to the role.",
    ],
    followUps: [
      "Why should we hire you?",
      "What are your strengths?",
      "Tell me about your project.",
    ],
    difficulty: InterviewDifficulty.BEGINNER,
    tags: ["hr", "freshers", "self-introduction", "placement"],
    seoTitle: "Tell Me About Yourself Answer for Freshers",
    seoDescription:
      "Learn how freshers should answer Tell me about yourself in HR interviews with structure, expected points, mistakes, and follow-ups.",
  },
  {
    roleTitle: "Full Stack Developer",
    roleAliases: ["MERN Developer", "Web Developer"],
    topicTitle: "Final Year Project",
    topicGroup: "Projects",
    question: "How should you explain your final year project in an interview?",
    context: "Project explanation is one of the most important fresher interview areas.",
    shortAnswer:
      "Explain the problem, users, tech stack, architecture, your role, key features, challenges, and what you improved or learned.",
    answer:
      "When explaining a final year project, start with the problem statement and who the project helps. Then explain the tech stack and architecture in simple terms. Mention your own contribution clearly instead of saying only the team did it. Talk about important features, database design, APIs, authentication, deployment, and any challenges you solved.\n\nA strong answer ends with measurable learning: performance improvement, better validation, cleaner UI, role-based access, testing, or deployment experience.",
    expectedPoints: [
      "Problem statement and target users.",
      "Tech stack and architecture.",
      "Your exact contribution.",
      "Features, database, APIs, and deployment.",
      "Challenges and learning.",
    ],
    commonMistakes: [
      "Only naming the project title.",
      "Not knowing database tables or APIs.",
      "Not explaining personal contribution.",
    ],
    followUps: [
      "Why did you choose this tech stack?",
      "What was the hardest bug?",
      "How would you scale this project?",
    ],
    difficulty: InterviewDifficulty.BEGINNER,
    tags: ["project", "final-year-project", "freshers", "full-stack"],
    seoTitle: "How to Explain Final Year Project in Interview",
    seoDescription:
      "Prepare a strong final year project interview answer with structure, personal contribution, tech stack, challenges, and follow-up questions.",
  },
];
