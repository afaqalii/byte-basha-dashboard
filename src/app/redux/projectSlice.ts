// slices/projectSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ref, set, get, remove, update } from 'firebase/database';
import { database } from '../../../firebase';

interface Project {
  id: string;
  title: string;
  url: string;
  text: string;
  technologies: string[];
  category: string;
}

interface ProjectsState {
  projects: Project[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  status: 'idle',
  error: null,
};

// Async thunks for Firebase operations
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const snapshot = await get(ref(database, 'projects/'));
  const projects = snapshot.val();
  return Object.keys(projects).map(key => ({ id: key, ...projects[key] }));
});

export const addProject = createAsyncThunk('projects/addProject', async (project: Project) => {
  const newProjectRef = ref(database, `projects/${project.id}`);
  await set(newProjectRef, project);
  return project;
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (projectId: string) => {
  await remove(ref(database, `projects/${projectId}`));
  return projectId;
});

export const updateProject = createAsyncThunk('projects/updateProject', async (project: Project) => {
  const projectRef = ref(database, `projects/${project.id}`);
  await update(projectRef, project);
  return project;
});

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch projects';
      })
      .addCase(addProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.projects.push(action.payload);
      })
      .addCase(deleteProject.fulfilled, (state, action: PayloadAction<string>) => {
        state.projects = state.projects.filter(project => project.id !== action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action: PayloadAction<Project>) => {
        const index = state.projects.findIndex(project => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      });
  },
});

export default projectSlice.reducer;
