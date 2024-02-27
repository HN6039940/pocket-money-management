import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/slice/Hooks/hooks";

import NavMenu from "./NavMenu";
import HamburgerMenu from "./HamburgerMenu";
import OverLayMenu from "../OverLay/OverLayMenu";
import SignBtn from "../Btn/SignBtn";

import Home from "../../assets/home-svgrepo-com.svg";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isLogin } = useAppSelector((state) => state.auth);
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <div className="navbar relative cursor-pointer bg-primary-color">
      <div className="flex-1">
        <Link to={isLogin ? "/user" : "/"} className="btn btn-ghost text-xl">
          <img src={Home} alt="home" className="h-10 w-10" />
        </Link>
      </div>
      <HamburgerMenu
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      />
      <OverLayMenu handleClose={handleCloseMenu} isOpen={isMenuOpen} />
      {isLogin ? (
        <NavMenu />
      ) : (
        <>
          <SignBtn
            kind="signup"
            className="btn btn-ghost  invisible hidden sm:visible sm:block"
          >
            新規登録
          </SignBtn>
          <SignBtn
            kind="login"
            className="btn btn-ghost invisible hidden sm:visible sm:block"
          >
            ログイン
          </SignBtn>
        </>
      )}
    </div>
  );
};

export default NavBar;
