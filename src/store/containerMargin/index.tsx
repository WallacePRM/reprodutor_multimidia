import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const containerMarginSlice = createSlice({
    name: 'containerMargin',
    initialState: {
      margin: 0,
    },
    reducers: {
      setContainerMargin: (state) => {
        state.margin = (document.querySelector('.c-sidebar') as HTMLElement).offsetWidth * 0.0625; // PX to REM
      }
    }
});

export const { setContainerMargin } = containerMarginSlice.actions;
export const selectContainerMargin = (state: RootState) => state.containerMargin.margin;

export default containerMarginSlice.reducer;