import { combineReducers, configureStore } from '@reduxjs/toolkit';

import consents from './features/consent/slice';

export const store = configureStore({
  reducer: combineReducers({
    consents
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
