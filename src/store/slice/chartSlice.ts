import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getBeginAndEndOfMonth, createDaysAgoArray } from "../../utils/date";
import {
  filterMonthByPieChart,
  sumAmount,
  filterMonthByBarChart,
  filterMonthByAreaChart,
} from "../../utils/filter";
import { Timestamp } from "firebase/firestore";

export type IncomeDataObject = {
  amount: number;
  date: string | Timestamp;
  id: string;
};

export type ExpenseDataObject = IncomeDataObject & {
  label: string;
};

type argumentData = {
  incomes: IncomeDataObject[];
  expense: ExpenseDataObject[];
};

type ChartObject = {
  date: string;
  value: number;
};

type ChartState = {
  AreaChart: { name: string; data: ChartObject[] }[];
  LineChart: ChartObject[];
  BarChart: {
    name: string;
    data: ChartObject[];
  }[];
  PieChart: {
    name: string;
    value: number;
    beginMonth: string;
    endMonth: string;
  }[];
};

const initialState: ChartState = {
  AreaChart: [],
  BarChart: [],
  LineChart: [],
  PieChart: [],
};

const chartsSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    createAreaChart: (state, action: PayloadAction<argumentData>) => {
      const { incomes, expense } = action.payload;
      const filteredIncome = filterMonthByAreaChart(incomes);
      const filteredExpense = filterMonthByAreaChart(expense);
      console.log(filteredIncome, filteredExpense);
      state.AreaChart = [
        { name: "収入", data: filteredIncome },
        { name: "支出", data: filteredExpense },
      ];
    },
    filterBarChart: (state, action: PayloadAction<DataObject[]>) => {},
    createLineChart: (state, action: PayloadAction<argumentData>) => {
      const { incomes, expense } = action.payload;
      const array = createDaysAgoArray(7);
      const filteredIncome = filterMonthByBarChart(incomes, array);
      const filteredExpense = filterMonthByBarChart(expense, array);
      state.BarChart = [
        { name: "収入", data: filteredIncome },
        { name: "支出", data: filteredExpense },
      ];
    },
    createPieChart: (state, action: PayloadAction<argumentData>) => {
      const { incomes, expense } = action.payload;
      const nowDate = new Date();
      const { beginMonth, endMonth } = getBeginAndEndOfMonth(nowDate);
      const filteredIncome = filterMonthByPieChart(incomes, {
        beginMonth,
        endMonth,
      });
      const filteredExpense = filterMonthByPieChart(expense, {
        beginMonth,
        endMonth,
      });

      const sumIncome = sumAmount(filteredIncome);
      const sumExpense = sumAmount(filteredExpense);
      const sumData = [
        { name: "収入", value: sumIncome, beginMonth, endMonth },
        { name: "支出", value: sumExpense, beginMonth, endMonth },
      ];

      state.PieChart = sumData;
    },
  },
});

export default chartsSlice.reducer;
export const { createPieChart, createLineChart, createAreaChart } =
  chartsSlice.actions;
