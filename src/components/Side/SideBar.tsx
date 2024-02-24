import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <section className=" h-dvh min-w-72 max-w-80 bg-slate-100 px-3">
      <div>
        <Link to="dashboard" className=" mt-5 block font-noto-sans-jp text-2xl">
          ダッシュボードへ
        </Link>
        <Link
          to="transaction"
          className="mt-4 block font-noto-sans-jp text-2xl"
        >
          記録する
        </Link>
      </div>
    </section>
  );
};

export default SideBar;
