import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const playerStateSlice = createSlice({
    name: 'playerState',
    initialState: {
      currentState: {
        duration: 0,
        currentTime: 0
      } as PlayerState,
    },
    reducers: {
      setPlayerState: (state, action: PayloadAction<Partial<PlayerState>>) => {
        state.currentState = {
          ...state.currentState,
          ...action.payload
        }
      }
    }
});

export const { setPlayerState } = playerStateSlice.actions;
export const selectPlayerState = (state: RootState) => state.playerState.currentState;

export type PlayerState = {
    file_id: number,
    duration: number,
    currentTime: number
};

export default playerStateSlice.reducer;