import NavMenu from "./NavMenu";
import HamburgerMenu from "./HamburgerMenu";
import OverLayMenu from "../OverLay/OverLayMenu";
import { useState } from "react";
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
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
      <NavMenu />
    </div>
  );
};

export default NavBar;
