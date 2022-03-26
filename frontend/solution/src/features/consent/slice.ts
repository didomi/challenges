import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IConsent, IConsentState } from './contracts';
import { IApi } from '../../api';
import { AppDispatch } from '../../store';

const initialState: IConsentState = {
  page: 1,
  list: []
};

const slice = createSlice({
  name: 'consents',
  initialState,
  reducers: {
    consentsLoaded: (
      state: IConsentState,
      action: PayloadAction<IConsent[]>
    ) => {
      state.list = action.payload;
    },

    consentsChangePage: (
      state: IConsentState,
      action: PayloadAction<{ page: number }>
    ) => {
      state.page = action.payload.page;
    },

    consentAdded: (state: IConsentState, action: PayloadAction<IConsent>) => {
      state.list.unshift(action.payload);
    }
  }
});

export const { consentsLoaded, consentsChangePage, consentAdded } =
  slice.actions;

export const consentsLoad = (api: IApi) => {
  return async (dispatch: AppDispatch) => {
    const res = await api.allConsents();

    dispatch(consentsLoaded(res));
  };
};

export default slice.reducer;
