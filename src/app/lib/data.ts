import { MdDashboard, MdCode, MdDesignServices, MdTrackChanges, MdSchool, MdPersonOutline } from "react-icons/md";
export const MenuItems = [
    {
        text: "Dashboard",
        href: "/dashboard",
        icon: MdDashboard,
    },
    {
        text: "Projects",
        href: "/dashboard/projects",
        icon: MdCode,
    },
    {
        text: "Services",
        href: "/dashboard/services",
        icon: MdDesignServices
    },
    {
        text: "Training",
        href: "/dashboard/training",
        icon: MdTrackChanges
    },
    {
        text: "Internships",
        href: "/dashboard/internships",
        icon: MdSchool,
    },
    {
        text: "Workspaces",
        href: "/dashboard/workspaces",
        icon: MdPersonOutline
    },
]

export const projects = [
    {
      id: 1,
      title: "AI Face Detection App",
      url: "https://www.techiexpert.com/wp-content/uploads/2023/09/Coimbatore-City-Police-Embrace-AI-Powered-Facial-Recognition-for-Enhanced-Surveillance.jpg",
      text: "Welcome to the AI Face Detection App, a cutting-edge project built with Next.js. This application leverages advanced AI models for real-time face detection, providing high accuracy and performance.",
      category: "artificial intelligence",
      technologies: ["nextJS", "reactJS", "python", "sql", "nlp"]
    },
    {
      id: 2,
      title: "E-commerce Platform",
      url: "https://cdn.dribbble.com/users/12230255/screenshots/20361322/media/d28b16088803e00b6d8f2a14859f8eb9.png",
      text: "Explore our e-commerce platform featuring seamless user experience and secure payment processing.",
      category: "custom software solutions",
      technologies: ["reactJS", "Node.js", "MongoDB", "Stripe"]
    },
    {
      id: 3,
      title: "Mobile Fitness App",
      url: "https://cdn.dribbble.com/users/1006532/screenshots/6492232/stayfit_behance_dribble_cover_2-min_4x.png",
      text: "Track your workouts, set goals, and compete with friends using our mobile fitness app.",
      category: "app development",
      technologies: ["React Native", "Firebase", "GraphQL", "Redux"]
    },
    {
      id: 4,
      title: "Data Visualization Dashboard",
      url: "https://cdn.dribbble.com/users/1094383/screenshots/6722275/fiq.png",
      text: "Visualize complex data sets with interactive charts and graphs on our data visualization dashboard.",
      category: "custom software solutions",
      technologies: ["D3.js", "Python", "Flask", "PostgreSQL"]
    },
  ];