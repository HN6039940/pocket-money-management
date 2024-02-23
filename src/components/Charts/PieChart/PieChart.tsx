import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import { useEffect } from "react";
import { createSelector } from "reselect";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../store/slice/Hooks/hooks";
import { RootState } from "../../../store/store";
import { createPieChart } from "../../../store/slice/chartSlice";
const PaymentPieChart = () => {
  const dispatch = useAppDispatch();
  const selectGraph = (state: RootState) => state.charts;

  const selectPieChart = createSelector(selectGraph, (state) => state.PieChart);
  const pieChartData = useAppSelector(selectPieChart);
  const { incomes, expense } = useAppSelector((state) => state.finance);

  useEffect(() => {
    dispatch(createPieChart({ incomes, expense }));
  }, [incomes, expense, dispatch]);

  return (
    <div>
      <h2 className="text-3xl font-bold">PieChart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={400} height={400}>
          <Legend />
          <Tooltip
            animationDuration={2000}
            contentStyle={{
              backgroundColor: "#d797fc",
              border: "1px solid #e5e7eb",
              borderRadius: "5px",
              padding: "20px",
            }}
          />
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={pieChartData}
            cx="50%"
            cy="50%"
            outerRadius={85}
            fill="#8884d8"
            label
          >
            <Cell fill="#82ca9d" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentPieChart;
