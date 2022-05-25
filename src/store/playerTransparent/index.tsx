import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const playerTransparentSlice = createSlice({
    name: 'playerTransparent',
    initialState: {
      isTransparent: false,
    },
    reducers: {
      setPlayerTransparent: (state, action: PayloadAction<{ isTransparent: boolean }>) => {
        state.isTransparent = action.payload.isTransparent;
      }
    }
});

export const { setPlayerTransparent } = playerTransparentSlice.actions;
export const selectPlayerTransparency = (state: RootState) => state.playerTransparent.isTransparent;

export default playerTransparentSlice.reducer;