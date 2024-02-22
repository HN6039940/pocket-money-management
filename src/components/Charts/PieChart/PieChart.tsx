// import {
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   Tooltip,
// } from "recharts";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../store/slice/Hooks/hooks";
import {
  createPieChart,
  createLineChart,
  createBarChart,
  createAreaChart,
} from "../../../store/slice/chartSlice";
const PaymentPieChart = () => {
  const dispatch = useAppDispatch();
  // const limit = 100000;
  const { incomes, expense } = useAppSelector((state) => state.finance);
  return (
    <div>
      <h2
        className="text-3xl font-bold"
        onClick={() => dispatch(createAreaChart({ incomes, expense }))}
      >
        PieChart
      </h2>
      {/* <ResponsiveContainer width="100%" height={300}>
        <PieChart width={400} height={400}>
          <Legend />
          <Tooltip />
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {sumData.map((entry, index) => (
              <Cell
                name={entry.name}
                key={`cell-${index}`}
                fill={
                  index % 2 === 0
                    ? "rgba(255, 99, 132, 0.6)"
                    : "rgba(54, 162, 235, 0.6)"
                }
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer> */}
    </div>
  );
};

export default PaymentPieChart;
