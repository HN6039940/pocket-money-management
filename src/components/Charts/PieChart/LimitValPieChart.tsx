import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import { useAppSelector } from "../../../store/slice/Hooks/hooks";
import { createSelector } from "reselect";
import { RootState } from "../../../store/store";
const LimitValPieChart = () => {
  const chartSelector = (state: RootState) => state.charts;
  const selectPieChart = createSelector(
    chartSelector,
    (state) => state.PieChart,
  );
  const limit = 100000;
  const [_, expenseData] = useAppSelector(selectPieChart);
  console.log(expenseData);
  return (
    <div>
      <h2 className="mb-5 text-3xl font-bold">
        限度額と支出の比率
        <br />
        <p className="text-sm">{`${expenseData?.beginMonth} ~ ${expenseData?.endMonth}`}</p>
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
            data={[
              expenseData,
              { name: "残り", value: limit - expenseData?.value },
            ]}
            cx="50%"
            cy="50%"
            outerRadius={85}
            label
          >
            <Cell fill="#dd8015" />
            <Cell fill="#912191" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LimitValPieChart;
