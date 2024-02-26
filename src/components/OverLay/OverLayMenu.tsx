import { ComponentPropsWithoutRef } from "react";
import { useAppSelector } from "../../store/slice/Hooks/hooks";
import IsSignInMenu from "./IsSignInMenu";
import SignBtn from "../Btn/SignBtn";

type OverLayMenuProps = ComponentPropsWithoutRef<"section"> & {
  isOpen: boolean;
  handleClose: () => void;
};

const OverLayMenu = (props: OverLayMenuProps) => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  const { isOpen, handleClose } = props;
  console.log(isOpen);
  return (
    <section
      onClick={handleClose}
      className={`  ${isOpen ? "block" : "invisible hidden"}  fixed left-0 top-0 z-50 flex min-h-dvh min-w-full  flex-col items-center justify-center bg-primary-color opacity-95
      transition-all duration-300 ease-in-out md:invisible md:hidden `}
    >
      <span
        onClick={handleClose}
        className="absolute right-3 top-3 cursor-pointer text-3xl text-white"
      >
        &times;
      </span>

      <div className="flex size-full flex-col items-center justify-center gap-5">
        {isLogin ? (
          <IsSignInMenu />
        ) : (
          <>
            <SignBtn
              kind="signup"
              className="rounded-md bg-gray-800 p-3 font-bold  text-white
              transition-all duration-300 ease-in-out hover:border-gray-800 hover:bg-gray-600  hover:shadow-lg
              "
            >
              新規登録
            </SignBtn>

            <SignBtn
              kind="login"
              className="rounded-md border-2 bg-primary-color p-3  font-bold
              text-white transition-all duration-300 ease-in-out hover:border-primary-color hover:bg-white
              hover:text-primary-color hover:shadow-lg 
              "
            >
              ログイン
            </SignBtn>
          </>
        )}
      </div>
    </section>
  );
};

export default OverLayMenu;
