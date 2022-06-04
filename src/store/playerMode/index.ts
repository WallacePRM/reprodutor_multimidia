import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const playerModeSlice = createSlice({
    name: 'playerMode',
    initialState: {
      mode: 'mini',
    },
    reducers: {
      setPlayerMode: (state, action: PayloadAction<string>) => {
        state.mode = action.payload;
      }
    }
});

export const { setPlayerMode } = playerModeSlice.actions;
export const selectPlayerMode = (state: RootState) => state.playerMode.mode;

export default playerModeSlice.reducer;