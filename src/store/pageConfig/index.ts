import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const pageConfigSlice = createSlice({
    name: 'pageConfig',
    initialState: {
        config: {
           orderBy: 'name',
        } as pageConfig,
    },
    reducers: {
        setPageConfig: (state, action: PayloadAction<Partial<pageConfig>>) => {
            state.config = {
              ...state.config,
              ...action.payload
            }
        }
    }
});

export const { setPageConfig } = pageConfigSlice.actions;
export const selectPageConfig = (state: RootState) => state.pageConfig.config;

export type pageConfig = {
    orderBy: string;
};

export default pageConfigSlice.reducer;