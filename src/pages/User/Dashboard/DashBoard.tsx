import Charts from "../../../components/Charts/Charts";

const DashBoard = () => {
  return (
    <section className=" ">
      <h1 className="mt-10 text-center text-2xl font-bold lg:mt-16 lg:text-4xl">
        ダッシュボード
      </h1>
      <div className="mt-10">
        <Charts />
      </div>
    </section>
  );
};

export default DashBoard;
