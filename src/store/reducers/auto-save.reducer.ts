import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import indexedDBRepository from '../../db/indexed-db.repository';

interface AutoSaveSlice {
  text: string;
  debouncedText: string; // 5초 디바운스용 텍스트
  status: 'idle' | 'loading' | 'success' | 'error';
}

const getIndexedDBText = async () => {
  const text = await indexedDBRepository.getText();
  // 빈 문자열이어도 정상적으로 반환
  return text || '';
};

const loadInitialText = createAsyncThunk(
  'autoSave/loadInitialText',
  async () => {
    const text = await getIndexedDBText();
    return text;
  }
);

const initialState: AutoSaveSlice = {
  text: '',
  debouncedText: '',
  status: 'idle',
};

const autoSaveSlice = createSlice({
  name: 'autoSave',
  initialState,
  reducers: {
    setDebouncedText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
      indexedDBRepository.setText(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(loadInitialText.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(loadInitialText.fulfilled, (state, action) => {
      state.status = 'success';
      state.text = action.payload;
      state.debouncedText = action.payload;
    });
    builder.addCase(loadInitialText.rejected, state => {
      state.status = 'error';
    });
  },
});

export const { setDebouncedText } = autoSaveSlice.actions;
export { loadInitialText };
export default autoSaveSlice.reducer;
