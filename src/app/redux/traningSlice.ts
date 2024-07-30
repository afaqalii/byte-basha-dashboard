import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FormState, TrainingCardProps } from '@/lib/interfaces';
import { addData, deleteData, listData, updateData } from '@/firebaseAPI';


const trainingsPath = 'training';

interface trainingForm {
    id: string | null,
    title: string,
    text: string,
    file: File | string | null;
}

interface trainingState {
    training: trainingForm[]
    loading: boolean,
    error: string | null,
    isEditMode: boolean,
    form: trainingForm
}

const initialState: trainingState = {
    training: [],
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

export const listTrainings = createAsyncThunk<TrainingCardProps[]>('training/listTrainings', async () => {
    return await listData<TrainingCardProps>(trainingsPath);
});

export const addTraining = createAsyncThunk<TrainingCardProps, TrainingCardProps>('training/addTraining', async (project) => {
    return await addData<TrainingCardProps>(trainingsPath, project);
});

export const updateTraining = createAsyncThunk<TrainingCardProps, TrainingCardProps>('training/updateTraining', async (project) => {
    return await updateData<TrainingCardProps>(trainingsPath, project);
});

export const deleteTraining = createAsyncThunk<string, string>('training/deleteTraining', async (id: string) => {
    return await deleteData(trainingsPath, id);
});

const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setField: (state, action: PayloadAction<{ field: keyof FormState; value: FormState[keyof FormState] }>) => {
            state.form[action.payload.field] = action.payload.value;
        },
        resetForm: (state) => {
            state.form = initialState.form;
        },
        setForm: (state, action: PayloadAction<trainingForm>) => {
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
            .addCase(listTrainings.pending, state => {
                state.loading = true;
            })
            .addCase(listTrainings.fulfilled, (state, action: PayloadAction<TrainingCardProps[]>) => {
                state.loading = false;
                state.training = action.payload;
            })
            .addCase(listTrainings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load training';
            })
            .addCase(addTraining.fulfilled, (state, action: PayloadAction<TrainingCardProps>) => {
                state.training.push(action.payload);
            })
            .addCase(updateTraining.fulfilled, (state, action: PayloadAction<TrainingCardProps>) => {
                const index = state.training.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.training[index] = action.payload;
                }
            })
            .addCase(deleteTraining.fulfilled, (state, action: PayloadAction<string>) => {
                state.training = state.training.filter(p => p.id !== action.payload);
            });
    },
});

export const { setField, resetForm, setForm, setEditMode, setLoading } = trainingSlice.actions;

export default trainingSlice.reducer;
