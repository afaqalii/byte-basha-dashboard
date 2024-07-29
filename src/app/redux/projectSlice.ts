import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ref, set, get, update } from 'firebase/database';
import { ProjectCardProps } from '@/lib/interfaces';
import { database } from '../../../firebase';

interface ProjectsState {
  projects: ProjectCardProps[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

export const listProjects = createAsyncThunk<ProjectCardProps[]>('projects/listProjects', async () => {
  const snapshot = await get(ref(database, 'projects'));
  const projects: Record<string, ProjectCardProps> = snapshot.val() || {};
  return Object.values(projects);
});

export const addProject = createAsyncThunk<ProjectCardProps, ProjectCardProps>('projects/addProject', async (project) => {
  const projectRef = ref(database, `projects/${project.id}`);
  await set(projectRef, project);
  return project;
});

export const updateProject = createAsyncThunk<ProjectCardProps, ProjectCardProps>('projects/updateProject', async (project) => {
  const projectRef = ref(database, `projects/${project.id}`);
  await update(projectRef, project);
  return project;
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(listProjects.pending, state => {
        state.loading = true;
      })
      .addCase(listProjects.fulfilled, (state, action: PayloadAction<ProjectCardProps[]>) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(listProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load projects';
      })
      .addCase(addProject.fulfilled, (state, action: PayloadAction<ProjectCardProps>) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action: PayloadAction<ProjectCardProps>) => {
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      });
  },
});

export default projectsSlice.reducer;
