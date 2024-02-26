import { Link } from "react-router-dom";
import SignOutBtn from "../Btn/SignOutBtn";

const NavMenu = () => {
  return (
    <div className="invisible hidden flex-none md:visible md:block">
      <ul className="menu menu-horizontal px-1">
        <li>
          <Link to="dashboard" className=" text-md  font-noto-sans-jp">
            ダッシュボードへ
          </Link>
        </li>
        <li>
          <Link to="transaction" className="text-md  font-noto-sans-jp">
            記録する
          </Link>
        </li>
        <li>
          <Link to="table" className="text-md  font-noto-sans-jp">
            テーブル
          </Link>
        </li>

        <li>
          <details>
            <summary>メニュー</summary>
            <ul className=" rounded-t-none bg-base-100 p-2">
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
