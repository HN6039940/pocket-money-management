import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/slice/Hooks/hooks";
import { setUserInfo } from "../../store/slice/userAuthSclice";
import {
  signupEmailUser,
  logInEmailUser,
} from "../../firebase/auth/fireauth-config";
import {
  createNewDocument,
  createUserDoc,
} from "../../firebase/firestore/firestore-financeData-operations";
import { useNavigate } from "react-router-dom";

type SignInput = {
  email: string;
  password: string;
};

type SignFormProps = {
  kind: "login" | "signup";
};

const SignForm = ({ kind }: SignFormProps) => {
  const dispatch = useAppDispatch();
  const redirect = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<SignInput>();

  const onSubmit = async (data: SignInput) => {
    try {
      if (kind === "login") {
        const { uid, email } = await logInEmailUser(data.email, data.password);
        dispatch(
          setUserInfo({ isLogin: true, email: email!, id: uid, name: email! }),
        );
        redirect("/user");
      } else {
        const { uid, email } = await signupEmailUser(data.email, data.password);
        await createUserDoc(uid, email!, true);
        await createNewDocument(uid);
        dispatch(
          setUserInfo({ isLogin: true, email: email!, id: uid, name: email! }),
        );
        redirect("/user");
      }
      reset();
    } catch (error) {
      setError("root", {
        message: "ログインに失敗しました。もう一度お試しください。",
      });
      reset();
    }
  };

  return (
    <>
      <div className="mx-auto min-w-64 max-w-md px-2">
        <div className=" mt-20  rounded-sm border-2 border-gray-800 bg-orange-600 py-3 text-center font-bold text-white transition-all duration-300 hover:bg-orange-700 ">
          <button className=" inline-block h-full w-full">{`Googleで${kind === "login" ? "ログイン" : "サインアップ"}`}</button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
         border-charcoal-primary  mt-4  flex flex-col
      gap-3 rounded-md border-t-2 bg-tertiary-color p-5 shadow-md"
        >
          <h2 className="text-center text-lg font-bold">
            メールアドレスで{kind === "login" ? "ログイン" : "サインアップ"}
          </h2>
          <div className=" flex flex-col gap-2  pt-3 ">
            <div>
              <label htmlFor="email" className="">
                email
              </label>
              <input
                {...register("email", {
                  required: "メールアドレスを入力してください",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "メールアドレスの形式で入力してください",
                  },
                })}
                type="email"
                id="email"
                className="min-h-10  w-full rounded-sm"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password">password</label>
              <input
                {...register("password", {
                  required: "パスワードを入力してください",
                  minLength: {
                    value: 6,
                    message: "パスワードは6文字以上で入力してください",
                  },
                })}
                type="password"
                id="password"
                className="min-h-10 w-full rounded-sm"
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {errors.root && (
            <p className="text-center text-sm text-red-500">
              {errors.root.message}
            </p>
          )}
          <div className="pt-3 text-center">
            <button
              type="submit"
              className=" border-gry-800 rounded-md   border-2 bg-primary-color p-3 font-bold text-white transition-all duration-300 ease-in-out hover:border-primary-color hover:bg-white hover:text-primary-color hover:shadow-lg"
            >
              {kind === "login" ? "ログイン" : "サインアップ"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignForm;
