import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const sidebarOpenedSlice = createSlice({
    name: 'sidebarOpened',
    initialState: {
      isOpened: false,
    },
    reducers: {
      setSidebarOpened: (state) => {
        state.isOpened = !state.isOpened;
      }
    }
});

export const { setSidebarOpened } = sidebarOpenedSlice.actions;
export const selectSidebarOpened = (state: RootState) => state.sidebarOpened.isOpened;

export default sidebarOpenedSlice.reducer;