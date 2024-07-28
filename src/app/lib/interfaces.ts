export interface UIState {
  isSidebarOpen: boolean;
}

export interface ProjectCardProps {
  url: string;
  title: string;
  text: string;
  category: string;
  index: number;
  technologies: string[];
}