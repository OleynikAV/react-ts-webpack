import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '@firebase/auth';
interface Alerts {
   type: 'error' | 'warning' | 'info' | 'success'
   description: string | number
   show: boolean
}
export interface RootReducer {
   preloader: boolean
   alerts: Alerts
   currentUser: UserInfo
}

const initialState: RootReducer = {
   preloader: false,
   alerts: {
      type: 'error',
      description: '',
      show: false,
   },
   currentUser: {} as UserInfo,

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
      handlerGetCurrentUser(state, action : PayloadAction<UserInfo>) {
         state.currentUser = action.payload;
         
      },
   },
});

const { actions, reducer } = catalogSlice;
export const {
   handlerPreloader,
   handlerAlerts,
   handlerGetCurrentUser,
} = actions;
export default reducer;
