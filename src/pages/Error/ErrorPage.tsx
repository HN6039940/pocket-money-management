import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/slice/Hooks/hooks";

const ErrorPage = () => {
  const { isLogin } = useAppSelector((state) => state.auth);
  return (
    <div className=" container mx-auto flex min-h-dvh flex-col items-center justify-center px-2">
      <h1 className="text-3xl font-bold">不正な操作です</h1>

      {isLogin ? (
        <button
          className="
         btn-primary-color btn btn-lg mt-5
        "
        >
          <Link to="/user" className="flex h-full w-full items-center">
            userページに戻る
          </Link>
        </button>
      ) : (
        <button
          className="
         btn-primary-color btn btn-lg mt-5"
        >
          <Link to="/" className="flex h-full w-full items-center">
            トップページに戻る
          </Link>
        </button>
      )}
    </div>
  );
};

export default ErrorPage;
