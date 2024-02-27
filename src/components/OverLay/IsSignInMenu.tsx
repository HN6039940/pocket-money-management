import { Link } from "react-router-dom";

import SignOutBtn from "../Btn/SignOutBtn";

const IsSignInMenu = () => {
  return (
    <>
      <Link
        to="dashboard"
        className="text-2xl font-bold  text-white transition-all
            duration-300 ease-in-out hover:text-sky-200
        "
      >
        ダッシュボード
      </Link>
      <Link
        to="transaction"
        className="text-2xl font-bold text-white transition-all
            duration-300 ease-in-out hover:text-sky-200"
      >
        記録する
      </Link>
      <Link
        to="table"
        className="text-2xl font-bold text-white transition-all
            duration-300 ease-in-out hover:text-sky-200"
      >
        テーブル
      </Link>
      <SignOutBtn
        className="rounded-md border-2 border-white p-3 font-bold text-white
            transition-all duration-300 ease-in-out hover:border-gray-500
            hover:bg-white hover:text-gray-800 hover:shadow-lg
        "
      />
    </>
  );
};

export default IsSignInMenu;
