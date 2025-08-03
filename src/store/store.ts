import { configureStore } from '@reduxjs/toolkit';
import serverSaveReducer from './reducers/server-save.reducer';

const store = configureStore({
  reducer: {
    serverSave: serverSaveReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
