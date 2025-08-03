import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AutoSaveSlice {
  text: string;
  debouncedText: string; // 5초 디바운스용 텍스트
  status: 'idle' | 'loading' | 'success' | 'error';
}

const initialState: AutoSaveSlice = {
  text: 'test-text',
  debouncedText: 'test-text',
  status: 'idle',
};

const autoSaveSlice = createSlice({
  name: 'autoSave',
  initialState,
  reducers: {
    setDebouncedText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
      console.log('debounced-1st-Save', state.text);
    },
  },
});

export const { setDebouncedText } = autoSaveSlice.actions;
export default autoSaveSlice.reducer;
