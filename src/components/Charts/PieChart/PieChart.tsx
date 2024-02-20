import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
const PaymentPieChart = () => {
  const dammyData = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];
  const sumUv = dammyData.reduce((acc, cur) => acc + cur.uv, 0);
  const sumPv = dammyData.reduce((acc, cur) => acc + cur.pv, 0);
  const sumAmt = dammyData.reduce((acc, cur) => acc + cur.amt, 0);
  const sumData = [
    { value: sumUv, name: "sumUv" },
    { value: sumPv, name: "sumPv" },
    { value: sumAmt, name: "sumAmt" },
  ];
  return (
    <div>
      <h2 className="text-3xl font-bold">PieChart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={400} height={400}>
          <Legend />
          <Tooltip />
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={sumData}
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
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentPieChart;
