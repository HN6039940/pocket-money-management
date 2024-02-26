import { useState } from "react";
import { useAppSelector } from "../../store/slice/Hooks/hooks";
import NavMenu from "./NavMenu";
import HamburgerMenu from "./HamburgerMenu";
import OverLayMenu from "../OverLay/OverLayMenu";
import SignBtn from "../Btn/SignBtn";
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isLogin } = useAppSelector((state) => state.auth);
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <div className="navbar relative cursor-pointer bg-primary-color">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
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
          <SignBtn kind="signup" className="btn btn-ghost">
            新規登録
          </SignBtn>
          <SignBtn kind="login" className="btn btn-ghost">
            ログイン
          </SignBtn>
        </>
      )}
    </div>
  );
};

export default NavBar;
