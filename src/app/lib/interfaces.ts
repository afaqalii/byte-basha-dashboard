export interface UIState {
  isSidebarOpen: boolean;
}

export interface ProjectCardProps extends TrainingCardProps {
  technologies: string[];
  category: string;
}
export interface InternshipCardProps extends TrainingCardProps{};
export interface TrainingCardProps {
  id: string;
  title: string;
  file: File | string;
  text: string;
  handleOpen?: () => void;
}

export interface FormState {
  id?: string,
  title: string;
  file: File | null | string;
  text: string;
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

