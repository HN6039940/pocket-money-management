import { Link } from "react-router-dom";
import SignOutBtn from "../Btn/SignOutBtn";

const NavMenu = () => {
  return (
    <div className="invisible hidden flex-none md:visible md:block">
      <ul className="menu menu-horizontal px-1">
        <li>
          <Link
            to="dashboard"
            className=" text-md  font-noto-sans-jp font-bold text-white"
          >
            ダッシュボードへ
          </Link>
        </li>
        <li>
          <Link
            to="transaction"
            className="text-md  font-noto-sans-jp font-bold text-white"
          >
            記録する
          </Link>
        </li>
        <li>
          <Link
            to="table"
            className="text-md  font-noto-sans-jp font-bold text-white"
          >
            テーブル
          </Link>
        </li>

        <li>
          <details>
            <summary className="font-bold">メニュー</summary>
            <ul className=" rounded-t-none bg-base-100 p-2 font-bold">
              <li>
                <SignOutBtn />
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  );
};

export default NavMenu;
