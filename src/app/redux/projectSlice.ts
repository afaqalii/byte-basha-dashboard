import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FormState, ProjectCardProps } from '@/lib/interfaces';
import { addData, deleteData, listData, updateData } from '@/firebaseAPI';


const projectsPath = 'projects';

interface ProjectsState {
  projects: ProjectCardProps[];
  loading: boolean;
  isLoading: boolean; // this loader is for edit/delete/update opertaions
  isEditMode: boolean;
  error: string | null;
  form: FormState;
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  isLoading: false,
  error: null,
  isEditMode: false,
  form: {
    title: '',
    file: null,
    text: '',
    category: '',
    technology: '',
    technologies: [],
  }
};

export const listProjects = createAsyncThunk<ProjectCardProps[]>('projects/listProjects', async () => {
  return await listData<ProjectCardProps>(projectsPath);
});

export const addProject = createAsyncThunk<ProjectCardProps, ProjectCardProps>('projects/addProject', async (project) => {
  return await addData<ProjectCardProps>(projectsPath, project);
});

export const updateProject = createAsyncThunk<ProjectCardProps, ProjectCardProps>('projects/updateProject', async (project) => {
  return await updateData<ProjectCardProps>(projectsPath, project);
});

export const deleteProject = createAsyncThunk<string, string>('projects/deleteProject', async (id: string) => {
  return await deleteData(projectsPath, id);
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<{ field: keyof FormState; value: FormState[keyof FormState] }>) => {
      state.form[action.payload.field] = action.payload.value;
    },
    addTechnology: (state) => {
      if (state.form.technology && !state.form.technologies.includes(state.form.technology)) {
        state.form.technologies.push(state.form.technology);
        state.form.technology = '';
      }
    },
    removeTechnology: (state, action: PayloadAction<string>) => {
      state.form.technologies = state.form.technologies.filter(t => t !== action.payload);
    },
    resetForm: (state) => {
      state.form = initialState.form;
    },
    setForm: (state, action: PayloadAction<FormState>) => {
      state.form = action.payload;
    },
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.isEditMode = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(listProjects.pending, state => {
        state.loading = true;
      })
      .addCase(updateProject.pending, state => {
        state.isLoading = true;
      })
      .addCase(addProject.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateProject.rejected, state => {
        state.isLoading = false;
      })
      .addCase(addProject.rejected, state => {
        state.isLoading = false;
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
        state.isLoading = false;
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action: PayloadAction<ProjectCardProps>) => {
        state.isLoading = false;
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(deleteProject.fulfilled, (state, action: PayloadAction<string>) => {
        state.projects = state.projects.filter(p => p.id !== action.payload);
      });
  },
});

export const { setField, addTechnology, removeTechnology, resetForm, setForm, setEditMode, setLoading } = projectsSlice.actions;

export default projectsSlice.reducer;
