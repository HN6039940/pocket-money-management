import Table from "../../../components/Table/Table";

const DashBoard = () => {
  return (
    <section className="container mx-auto  min-w-60">
      {/* 
    Rechartsを使って簡単なグラフを表示する
  */}
      <div className="mt-10">
        <h1 className="text-4xl font-bold">ダッシュボード</h1>
        <div className="mt-10">
          <Table />
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
