import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './projectSlice';
import traningSlice from './traningSlice';
import internshipSlice from './internshipSlice';
import workspaceSlice from './workspaceSlice';

const store = configureStore({
  reducer: {
    projects: projectSlice,
    training: traningSlice,
    internship: internshipSlice,
    workspace: workspaceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
