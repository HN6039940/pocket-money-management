import { useEffect } from "react";
import { createSelector } from "reselect";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../store/slice/Hooks/hooks";
import { RootState } from "../../../store/store";
import { createAreaChart } from "../../../store/slice/chartSlice";
import {
  ResponsiveContainer,
  AreaChart,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";

const PaymentAreaChart = () => {
  const dispatch = useAppDispatch();
  const { incomes, expense } = useAppSelector((state) => state.finance);
  const selectGraph = (state: RootState) => state.charts;
  const selectAreaChart = createSelector(
    selectGraph,
    (state) => state.AreaChart,
  );
  const areaChartData = useAppSelector(selectAreaChart);
  useEffect(() => {
    dispatch(createAreaChart({ incomes, expense }));
  }, [incomes, expense, dispatch]);
  return (
    <div>
      <h2 className=" mb-5 text-3xl font-bold">
        月別収支推移
        <p className="text-sm ">
          {`${areaChartData[0]?.date} ~ ${areaChartData[areaChartData.length - 1]?.date}`}
        </p>
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          width={500}
          height={400}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          data={areaChartData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={`date`} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="incomeValue"
            stackId="1"
            stroke="#03ffff"
            fill="#0099ff"
            name="収入"
          />
          <Area
            type="monotone"
            dataKey="expenseValue"
            stackId="1"
            stroke="#ffc402"
            fill="#dd8015"
            name="支出"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentAreaChart;
