import PaymentAreaChart from "./AreaChart/AreaChart";
import PaymentBarchart from "./BarChart/Barchart";
import PaymentLinceChart from "./LineChart/LinceChart";
import PaymentPieChart from "./PieChart/PieChart";
const Charts = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="grid grid-cols-2 bg-green-400">
        <PaymentPieChart />
        <PaymentPieChart />
      </div>
      <div className=" bg-green-400">
        <PaymentBarchart />
      </div>
      <div className="col-span-2 bg-green-400">
        <PaymentAreaChart />
      </div>
      {/* <div className="bg-green-400">
        <PaymentLinceChart />
        <PaymentLinceChart />
      </div> */}
    </div>
  );
};

export default Charts;
