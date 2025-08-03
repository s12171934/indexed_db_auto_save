import { configureStore } from '@reduxjs/toolkit';
import autoSaveReducer from './reducers/auto-save.reducer';
import serverSaveReducer from './reducers/server-save.reducer';

const store = configureStore({
  reducer: {
    autoSave: autoSaveReducer,
    serverSave: serverSaveReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
