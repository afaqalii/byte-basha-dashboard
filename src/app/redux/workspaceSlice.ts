import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { form, FormState, WorkspaceCardProps } from '@/lib/interfaces';
import { addData, deleteData, listData, updateData } from '@/firebaseAPI';


const workspacePath = 'workspace';

interface workspaceState {
    workspace: form[]
    loading: boolean,
    error: string | null,
    isEditMode: boolean,
    form: form
}

const initialState: workspaceState = {
    workspace: [],
    loading: false,
    error: null,
    isEditMode: false,
    form: {
        id: "",
        title: '',
        file: null,
        text: '',
    }
};

export const listworkspace = createAsyncThunk<WorkspaceCardProps[]>('workspace/listworkspace', async () => {
    return await listData<WorkspaceCardProps>(workspacePath);
});

export const addworkspace = createAsyncThunk<WorkspaceCardProps, WorkspaceCardProps>('workspace/addworkspace', async (project) => {
    return await addData<WorkspaceCardProps>(workspacePath, project);
});

export const updateworkspace = createAsyncThunk<WorkspaceCardProps, WorkspaceCardProps>('workspace/updateworkspace', async (project) => {
    return await updateData<WorkspaceCardProps>(workspacePath, project);
});

export const deleteworkspace = createAsyncThunk<string, string>('workspace/deleteworkspace', async (id: string) => {
    return await deleteData(workspacePath, id);
});

const trainingSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        setField: (state, action: PayloadAction<{ field: keyof form, value: any }>) => {
            state.form[action.payload.field] = action.payload.value;
        },
        resetForm: (state) => {
            state.form = initialState.form;
        },
        setForm: (state, action: PayloadAction<WorkspaceCardProps>) => {
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
            .addCase(listworkspace.pending, state => {
                state.loading = true;
            })
            .addCase(listworkspace.fulfilled, (state, action: PayloadAction<WorkspaceCardProps[]>) => {
                state.loading = false;
                state.workspace = action.payload;
            })
            .addCase(listworkspace.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load workspace';
            })
            .addCase(addworkspace.fulfilled, (state, action: PayloadAction<WorkspaceCardProps>) => {
                state.workspace.push(action.payload);
            })
            .addCase(updateworkspace.fulfilled, (state, action: PayloadAction<WorkspaceCardProps>) => {
                const index = state.workspace.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.workspace[index] = action.payload;
                }
            })
            .addCase(deleteworkspace.fulfilled, (state, action: PayloadAction<string>) => {
                state.workspace = state.workspace.filter(p => p.id !== action.payload);
            });
    },
});

export const { setField, resetForm, setForm, setEditMode, setLoading } = trainingSlice.actions;

export default trainingSlice.reducer;
