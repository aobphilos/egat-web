import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState } from '../../app/store';

export interface ILayoutState {
  isActiveSidebar: boolean;
}

const initialState: ILayoutState = {
  isActiveSidebar: false,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,

  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setActiveSidebar: (state, action: PayloadAction<boolean>) => {
      state.isActiveSidebar = action.payload;
    },
  },
});

export const { setActiveSidebar } = layoutSlice.actions;
export const selectLayout = (state: AppState) => state.layout;

export default layoutSlice.reducer;
