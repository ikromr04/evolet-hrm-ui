import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncStatus } from '@/shared/store';
import { Languages } from './types';
import { fetchLanguagesAction } from './thunks';

type LanguageSlice = {
  languages: {
    data?: Languages;
    status: AsyncStatus;
  };
}

const initialState: LanguageSlice = {
  languages: {
    status: AsyncStatus.IDLE,
  },
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLanguagesAction.fulfilled, (state, action: PayloadAction<Languages>) => {
        state.languages.data = action.payload;
        state.languages.status = AsyncStatus.SUCCEEDED;
      });
  }
});

export { languageSlice };
