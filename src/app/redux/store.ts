import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './projectSlice';
import traningSlice from './traningSlice';
import internshipSlice from './internshipSlice';

const store = configureStore({
  reducer: {
    projects: projectSlice,
    training: traningSlice,
    internship: internshipSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
