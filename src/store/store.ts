import { configureStore } from "@reduxjs/toolkit";
import FinanceSlice from "./slice/financeSlice";
import AuthSlice from "./slice/userAuthSclice";
import chartSlice from "./slice/chartSlice";

const store = configureStore({
  reducer: {
    // reducers
    finance: FinanceSlice,
    auth: AuthSlice,
    charts: chartSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
