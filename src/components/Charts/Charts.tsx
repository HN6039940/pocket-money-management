import PaymentAreaChart from "./AreaChart/AreaChart";
import PaymentBarchart from "./BarChart/Barchart";
import PaymenWeekBarChart from "./BarChart/PaymentWeekBarChart";
import PaymentPieChart from "./PieChart/PieChart";
import LimitValPieChart from "./PieChart/LimitValPieChart";

const Charts = () => {
  return (
    <div className="space-y-7  lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0">
      <div className="grid grid-cols-1 gap-5 rounded-sm border-2  border-tertiary-color bg-white p-3 lg:grid-cols-2 lg:gap-3">
        <PaymentPieChart />
        <LimitValPieChart />
      </div>
      <div className="rounded-sm  border-2 border-tertiary-color  bg-white p-3">
        <PaymentBarchart />
      </div>
      <div className="col-span-2 rounded-sm border-2 border-tertiary-color  bg-white p-3">
        <PaymenWeekBarChart />
      </div>
      <div className="col-span-2 rounded-sm border-2 border-tertiary-color  bg-white p-3">
        <PaymentAreaChart />
      </div>
    </div>
  );
};

export default Charts;
