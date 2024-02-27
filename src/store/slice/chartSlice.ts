import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";

import { getBeginAndEndOfMonth, createDaysAgoArray } from "../../utils/date";
import {
  filterMonthByPieChart,
  sumAmount,
  filterMonthByBarChart,
  filterMonthByAreaChart,
  filterLabelByBarChart,
} from "../../utils/filter";
import { sortQuantity } from "../../utils/sort";

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

type ChartObject = { date: string; incomeValue: number; expenseValue: number };

type LabelBarChartObject = { label: string; value: number; quantity: number };

type PieChartObject = {
  name: string;
  value: number;
  beginMonth: string;
  endMonth: string;
};

type ChartState = {
  AreaChart: ChartObject[];
  BarChart: ChartObject[];
  LabelBarChart: LabelBarChartObject[];
  PieChart: PieChartObject[];
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

      // filteredIncome filteredExpenseはどちらも必ずデータ長は同じなので、どちらかのデータを基準にしても良い
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

    createBarChart: (state, action: PayloadAction<argumentData>) => {
      const { incomes, expense } = action.payload;

      // 今日から7日分の日付を遡って取得する
      const array = createDaysAgoArray(7);
      const filteredIncome = filterMonthByBarChart(incomes, array);
      const filteredExpense = filterMonthByBarChart(expense, array);

      // filteredIncome filteredExpenseはどちらも必ずデータ長は同じなので、どちらかのデータを基準にしても良い
      const concatChartData = filteredIncome.map((item, index) => {
        return {
          date: item.date,
          incomeValue: item.value,
          expenseValue: filteredExpense[index].value,
        };
      });
      state.BarChart = concatChartData;
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

      // ここで収入と支出の合計を求める
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
  createBarChart,
  createAreaChart,
  createLabelBarChart,
} = chartsSlice.actions;
