import { logOutUser } from "../../firebase/auth/fireauth-config";
import { useNavigate } from "react-router-dom";

const SignOutBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() =>
        logOutUser().then(() => {
          localStorage.removeItem("uid");
          navigate("/");
        })
      }
    >
      Sign Out
    </button>
  );
};

export default SignOutBtn;
