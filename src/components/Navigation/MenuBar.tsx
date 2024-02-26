import { Link } from "react-router-dom";

const MenuBar = () => {
  return (
    <div className="mt-5 flex flex-col gap-5 lg:flex-row">
      <button className="btn btn-ghost mt-5 text-lg">
        <Link
          className="flex h-full w-full items-center justify-center sm:flex-row"
          to="dashboard"
        >
          ダッシュボードへ →
        </Link>
      </button>
      <button className="btn btn-ghost mt-5 text-lg">
        <Link
          className="flex h-full w-full items-center justify-center"
          to="transaction"
        >
          記録する →
        </Link>
      </button>
      <button className=" btn btn-ghost mt-5 text-lg">
        <Link
          className="flex h-full w-full items-center justify-center"
          to="table"
        >
          テーブル →
        </Link>
      </button>
    </div>
  );
};

export default MenuBar;
