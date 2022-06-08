import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const playerConfigSlice = createSlice({
    name: 'playerConfig',
    initialState: {
        config: {
            shuffle: true,
            repeatMode: 'all',
            volume: 1,
            muted: false,
        } as PlayerConfig,
    },
    reducers: {
        setPlayerConfig: (state, action: PayloadAction<Partial<PlayerConfig>>) => {
            state.config = {
              ...state.config,
              ...action.payload
            }
        }
    }
});

export const { setPlayerConfig } = playerConfigSlice.actions;
export const selectPlayerConfig = (state: RootState) => state.playerConfig.config;

export type PlayerConfig = {
    shuffle: boolean,
    repeatMode: string | boolean,
    volume: number,
    muted: boolean,
};

export default playerConfigSlice.reducer;