import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Media } from "../../service/media/types";

const playerSlice = createSlice({
    name: 'player',
    initialState: {
      currentMedia: null as Media | null,
    },
    reducers: {
      setCurrentMedia: (state, action: PayloadAction<Media | null>) => {
        state.currentMedia = action.payload;
      }
    }
});

export const { setCurrentMedia } = playerSlice.actions;
export const selectCurrentMedia = (state: RootState) => state.player.currentMedia;

export default playerSlice.reducer;