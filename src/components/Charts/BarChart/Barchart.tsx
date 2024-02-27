import { useEffect } from "react";
import { createSelector } from "reselect";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../store/slice/Hooks/hooks";
import { RootState } from "../../../store/store";
import { createLabelBarChart } from "../../../store/slice/chartSlice";
import {
  ResponsiveContainer,
  BarChart,
  Legend,
  Tooltip,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const PaymentBarchart = () => {
  const dispatch = useAppDispatch();

  const selectGraph = (state: RootState) => state.charts;
  const selectBarChart = createSelector(
    selectGraph,
    (state) => state.LabelBarChart,
  );
  const barChartData = useAppSelector(selectBarChart);

  const { expense } = useAppSelector((state) => state.finance);

  useEffect(() => {
    dispatch(createLabelBarChart(expense));
  }, [expense, dispatch]);

  return (
    <div>
      <h2 className="mb-5 text-3xl font-bold">タグ別比率</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barChartData} layout="vertical" className=" mt-5">
          <CartesianGrid strokeDasharray="3 3" />
          <Legend />
          <Tooltip />
          <XAxis type="number" />
          <YAxis type="category" dataKey="label" />
          <Bar
            dataKey="quantity"
            fill="#0D9276"
            name={"タグ数"}
            radius={[5, 5, 0, 0]}
            barSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentBarchart;
