export interface UIState {
  isSidebarOpen: boolean;
}
export interface CardProps {
  id: string;
  title: string;
  file: File | string;
  text: string;
  handleOpen?: () => void;
}

export interface ProjectCardProps extends CardProps {
  technologies: string[];
  category: string;
}
export interface InternshipCardProps extends CardProps { };
export interface WorkspaceCardProps extends CardProps { };
export interface TrainingCardProps extends CardProps { };

export interface form {
  id: string,
  title: string,
  text: string,
  file: File | string | null;
}

export interface FormState extends form {
  category: string;
  technology: string;
  technologies: string[];
}



export interface ProjectsState {
  projects: ProjectCardProps[];
  loading: boolean;
  error: string | null;
  form: FormState;
}

