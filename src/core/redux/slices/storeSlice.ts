import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Alerts {
   type: 'error' | 'warning' | 'info' | 'success'
   description: string | number
   show: boolean
}
export interface RootReducer {
   preloader: boolean
   alerts: Alerts
}

const initialState: RootReducer = {
   preloader: false,
   alerts: {
      type: 'error',
      description: '',
      show: false,
   },
};

export const catalogSlice = createSlice({
   name: 'store',
   initialState,
   reducers: {
      handlerPreloader(state, action: PayloadAction<boolean>) {
         state.preloader = action.payload;
      },
      handlerAlerts(state, action: PayloadAction<Alerts>) {
         state.alerts = action.payload;
      },
   },
});

const { actions, reducer } = catalogSlice;
export const {
   handlerPreloader,
   handlerAlerts,
} = actions;
export default reducer;
