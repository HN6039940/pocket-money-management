import Table from "../../../components/Table/Table";
import Charts from "../../../components/Charts/Charts";
const DashBoard = () => {
  return (
    <section className="container mx-auto  min-w-60">
      <h1 className="mt-20 text-4xl font-bold">ダッシュボード</h1>
      <div className="mt-10">
        <Charts />
      </div>
      <div className="mt-10">
        <Table />
      </div>
    </section>
  );
};

export default DashBoard;
