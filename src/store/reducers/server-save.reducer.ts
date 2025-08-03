import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface ServerSaveSlice {
  text: string;
}

const initialState: ServerSaveSlice = {
  text: '',
};

const serverSaveSlice = createSlice({
  name: 'serverSave',
  initialState,
  reducers: {
    setServerSaveText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { setServerSaveText } = serverSaveSlice.actions;
export default serverSaveSlice.reducer;
