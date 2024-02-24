import PaymentAreaChart from "./AreaChart/AreaChart";
import PaymentBarchart from "./BarChart/Barchart";
import PaymenWeekBarChart from "./BarChart/PaymentWeekBarChart";
import PaymentPieChart from "./PieChart/PieChart";
import LimitValPieChart from "./PieChart/LimitValPieChart";
const Charts = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="border-tertiary-color grid grid-cols-2 rounded-sm border-2  bg-white p-3">
        <PaymentPieChart />
        <LimitValPieChart />
      </div>
      <div className="border-tertiary-color grid  rounded-sm border-2  bg-white p-3">
        <PaymentBarchart />
      </div>
      <div className="border-tertiary-color col-span-2 rounded-sm border-2  bg-white p-3">
        <PaymenWeekBarChart />
      </div>
      <div className="border-tertiary-color col-span-2 rounded-sm border-2  bg-white p-3">
        <PaymentAreaChart />
      </div>
    </div>
  );
};

export default Charts;
