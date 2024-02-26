import { logOutUser } from "../../firebase/auth/fireauth-config";
import { useNavigate } from "react-router-dom";
import { ComponentPropsWithoutRef } from "react";

type SignOutBtnProps = ComponentPropsWithoutRef<"button">;

const SignOutBtn = (props: SignOutBtnProps) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() =>
        logOutUser().then(() => {
          navigate("/");
        })
      }
      {...props}
    >
      サインアウト
    </button>
  );
};

export default SignOutBtn;
