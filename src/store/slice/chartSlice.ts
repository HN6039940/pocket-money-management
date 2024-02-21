import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type DataObject = {
  amount: number;
  date: string;
  id: string;
  label?: string;
};

type ChartObject = {
  name: string;
  value: number;
  date: string;
};

type ChartState = {
  AreaChart: ChartObject[];
  BarChart: ChartObject[];
  LineChart: ChartObject[];
  PieChart: ChartObject[];
};

const initialState: ChartState = {
  AreaChart: [],
  BarChart: [],
  LineChart: [],
  PieChart: [],
};

const isExpense = (data: DataObject): boolean => {
  return "label" in data;
};

const chartsSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    filterAreaChart: (state, action: PayloadAction<DataObject[], string>) => {},
    filterBarChart: (state, action: PayloadAction<DataObject[]>) => {},
    filterLineChart: (state, action: PayloadAction<DataObject[]>) => {},
    filterPieChart: (state, action: PayloadAction<DataObject[]>) => {},
  },
});

export default chartsSlice.reducer;
export const { filterAreaChart } = chartsSlice.actions;
