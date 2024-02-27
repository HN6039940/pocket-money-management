import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";

export type IncomesItem = {
  id: string;
  date: string | Timestamp;
  amount: number;
};

export type ExpensesItem = IncomesItem & {
  label: string;
};
export type FinanceState = {
  incomes: IncomesItem[];
  expense: ExpensesItem[];
};

const initialState: FinanceState = {
  incomes: [],
  expense: [],
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setFireStoreData(state, action: PayloadAction<FinanceState>) {
      state.incomes = action.payload.incomes;
      state.expense = action.payload.expense;
    },
  },
});

export const { setFireStoreData } = financeSlice.actions;
export default financeSlice.reducer;
