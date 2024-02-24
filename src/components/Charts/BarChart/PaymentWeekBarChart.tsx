import { useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store/slice/Hooks/hooks";
import { createSelector } from "reselect";
import { RootState } from "../../../store/store";
import { createBarChart } from "../../../store/slice/chartSlice";

const PaymentWeekBarChart = () => {
  const dispatch = useAppDispatch();
  const { expense, incomes } = useAppSelector((state) => state.finance);
  const selectGraph = (state: RootState) => state.charts;
  const selectBarChart = createSelector(selectGraph, (state) => state.BarChart);
  const lineBarData = useAppSelector(selectBarChart);

  useEffect(() => {
    dispatch(createBarChart({ expense, incomes }));
  }, [expense, incomes, dispatch]);

  console.log(lineBarData);

  return (
    <div>
      <h2 className="mb-5 text-3xl font-bold">Payment</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={lineBarData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="incomeValue" fill="#8884d8" name={"収入"} />
          <Bar dataKey="expenseValue" fill="#82ca9d" name={"支出"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentWeekBarChart;
