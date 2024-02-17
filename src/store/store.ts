import { configureStore } from "@reduxjs/toolkit";
import FinanceSlice from "./slice/financeSlice";
import AuthSlice from "./slice/userAuthSclice";

const store = configureStore({
  reducer: {
    // Add your reducers here
    finance: FinanceSlice,
    auth: AuthSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
