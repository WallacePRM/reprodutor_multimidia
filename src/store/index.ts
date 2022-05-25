import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import sidebarOpenedReducer from './sidebarOpened';
import containerMarginReducer from './containerMargin';
import playerTransparentReducer from './playerTransparent';

// LOCAL STORAGE
const saveToLocalStorage = (state: any) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    sidebarOpened: sidebarOpenedReducer,
    containerMargin: containerMarginReducer,
    playerTransparent: playerTransparentReducer,
  },
  preloadedState: loadFromLocalStorage()
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;