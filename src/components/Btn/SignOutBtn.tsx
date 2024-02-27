import { ComponentPropsWithoutRef } from "react";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../firebase/auth/fireauth-config";

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
