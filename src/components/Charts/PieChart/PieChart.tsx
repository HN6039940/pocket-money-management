import { useEffect } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
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
      <h2 className="mb-3 text-3xl font-bold">
        今月の収支の内訳
        <p className="space-y-2 text-sm text-gray-700">
          {`${pieChartData[0]?.beginMonth} ~ ${pieChartData[0]?.endMonth}`}
        </p>
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={400} height={400}>
          <Legend />
          <Tooltip
            animationDuration={2000}
            contentStyle={{
              backgroundColor: "#faf4fd",
              border: "1px solid #000000",
              borderRadius: "5px",
              padding: "20px",
              color: "#1e1e1f",
            }}
          />
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={pieChartData}
            cx="50%"
            cy="50%"
            outerRadius={85}
            fill="#dd8015"
            label
          >
            <Cell fill="#40A2E3" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentPieChart;
