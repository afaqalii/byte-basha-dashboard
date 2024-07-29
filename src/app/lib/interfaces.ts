export interface UIState {
  isSidebarOpen: boolean;
}

export interface ProjectCardProps {
  id: string;
  title: string;
  url: string;
  text: string;
  technologies: string[];
  category: string;
}
