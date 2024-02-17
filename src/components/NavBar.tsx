import SignOutBtn from "./Btn/SignOutBtn";
const NavBar = () => {
  return (
    <div className="navbar  bg-orange-primary ">
      <a className="btn btn-ghost text-xl text-base-100">Finance</a>
      <SignOutBtn />
    </div>
  );
};

export default NavBar;
