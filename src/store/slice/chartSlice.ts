import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getBeginAndEndOfMonth, createDaysAgoArray } from "../../utils/date";
import {
  filterMonthByPieChart,
  sumAmount,
  filterMonthByBarChart,
  filterMonthByAreaChart,
  filterLabelByBarChart,
} from "../../utils/filter";
import { sortQuantity } from "../../utils/sort";
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
  AreaChart: { date: string; incomeValue: number; expenseValue: number }[];
  LabelBarChart: { label: string; value: number; quantity: number }[];
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
  LabelBarChart: [],
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
      const concatChartData = filteredIncome.map((item, index) => {
        return {
          date: item.date,
          incomeValue: item.value,
          expenseValue: filteredExpense[index].value,
        };
      });
      state.AreaChart = concatChartData;
    },
    createLabelBarChart: (
      state,
      action: PayloadAction<ExpenseDataObject[]>,
    ) => {
      const { payload } = action;
      const filteredLabel = filterLabelByBarChart(payload);
      state.LabelBarChart = sortQuantity(filteredLabel);
    },
    createLineChart: (state, action: PayloadAction<argumentData>) => {
      const { incomes, expense } = action.payload;
      const array = createDaysAgoArray(7);
      const filteredIncome = filterMonthByBarChart(incomes, array);
      const filteredExpense = filterMonthByBarChart(expense, array);
      const concatChartData = filteredIncome.map((item, index) => {
        return {
          date: item.date,
          incomeValue: item.value,
          expenseValue: filteredExpense[index].value,
        };
      });
      console.log(concatChartData);
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
export const {
  createPieChart,
  createLineChart,
  createAreaChart,
  createLabelBarChart,
} = chartsSlice.actions;
