import SignOutBtn from "./Btn/SignOutBtn";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="bg-primary-color navbar">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
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
    </div>
  );
};

export default NavBar;
