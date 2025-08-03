import { configureStore } from '@reduxjs/toolkit';
import autoSaveReducer from './reducers/auto-save.reducer';

const store = configureStore({
  reducer: {
    autoSave: autoSaveReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
