import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface ServerSaveSlice {
  text: string | null;
}

const initialState: ServerSaveSlice = {
  text: null,
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
