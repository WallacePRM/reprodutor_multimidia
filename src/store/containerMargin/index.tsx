import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const containerMarginSlice = createSlice({
    name: 'containerMargin',
    initialState: {
      margin: 3,
    },
    reducers: {
      setContainerMargin: (state, action: PayloadAction<{margin: number}>) => {
        state.margin = action.payload.margin;
      }
    }
});

export const { setContainerMargin } = containerMarginSlice.actions;
export const selectContainerMargin = (state: RootState) => state.containerMargin.margin;

export default containerMarginSlice.reducer;