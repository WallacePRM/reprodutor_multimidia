import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const playerTransparentSlice = createSlice({
    name: 'playerTransparent',
    initialState: {
      isTransparent: false,
    },
    reducers: {
      setPlayerTransparent: (state) => {
        state.isTransparent = !state.isTransparent;
      }
    }
});

export const { setPlayerTransparent } = playerTransparentSlice.actions;
export const selectPlayerTransparency = (state: RootState) => state.playerTransparent.isTransparent;

export default playerTransparentSlice.reducer;