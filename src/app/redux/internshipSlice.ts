import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { form, TrainingCardProps } from '@/lib/interfaces';
import { addData, deleteData, listData, updateData } from '@/firebaseAPI';


const internshipPath = 'internship';

interface trainingState {
    internship: form[]
    loading: boolean,
    error: string | null,
    isEditMode: boolean,
    form: form
}

const initialState: trainingState = {
    internship: [],
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

export const listInternship = createAsyncThunk<TrainingCardProps[]>('internship/listInternship', async () => {
    return await listData<TrainingCardProps>(internshipPath);
});

export const addInternship = createAsyncThunk<TrainingCardProps, TrainingCardProps>('internship/addInternship', async (project) => {
    return await addData<TrainingCardProps>(internshipPath, project);
});

export const updateInternship = createAsyncThunk<TrainingCardProps, TrainingCardProps>('internship/updateInternship', async (project) => {
    return await updateData<TrainingCardProps>(internshipPath, project);
});

export const deleteInternship = createAsyncThunk<string, string>('internship/deleteInternship', async (id: string) => {
    return await deleteData(internshipPath, id);
});

const trainingSlice = createSlice({
    name: 'internship',
    initialState,
    reducers: {
        setField: (state, action) => {
            state.form[action.payload.field] = action.payload.value;
        },
        resetForm: (state) => {
            state.form = initialState.form;
        },
        setForm: (state, action: PayloadAction<form>) => {
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
            .addCase(listInternship.pending, state => {
                state.loading = true;
            })
            .addCase(listInternship.fulfilled, (state, action: PayloadAction<TrainingCardProps[]>) => {
                state.loading = false;
                state.internship = action.payload;
            })
            .addCase(listInternship.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load internship';
            })
            .addCase(addInternship.fulfilled, (state, action: PayloadAction<TrainingCardProps>) => {
                state.internship.push(action.payload);
            })
            .addCase(updateInternship.fulfilled, (state, action: PayloadAction<TrainingCardProps>) => {
                const index = state.internship.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.internship[index] = action.payload;
                }
            })
            .addCase(deleteInternship.fulfilled, (state, action: PayloadAction<string>) => {
                state.internship = state.internship.filter(p => p.id !== action.payload);
            });
    },
});

export const { setField, resetForm, setForm, setEditMode, setLoading } = trainingSlice.actions;

export default trainingSlice.reducer;
