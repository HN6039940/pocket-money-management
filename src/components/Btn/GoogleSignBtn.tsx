import { ComponentPropsWithoutRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/slice/Hooks/hooks";

import { auth } from "../../firebase/firestore/firestore-config";
import { getRedirectResult } from "firebase/auth";
import {
  googleSignIn,
  googleUserCreateOrUpdate,
} from "../../firebase/auth/fireauth-config";

import Loading from "../Loding/Loading";

type GoogleSignBtnProps = ComponentPropsWithoutRef<"div"> & {
  kind: "login" | "signup";
};

const GoogleSignBtn = (props: GoogleSignBtnProps) => {
  const { isLogin } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { isLoading, isFetching, isError } = useQuery({
    queryKey: ["googleSignIn", isLogin],
    queryFn: async () => {
      if (!auth.currentUser) {
        return null;
      }
      const result = await getRedirectResult(auth);
      await googleUserCreateOrUpdate();
      if (result?.user.providerData[0].providerId === "google.com") {
        navigate("/user");
        return result;
      }
      return result;
    },
  });

  const onGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      throw new Error("ログインに失敗しました");
    }
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError) {
    throw new Error("ログインに失敗しました");
  }

  return (
    <div onClick={() => onGoogleSignIn()} {...props}>
      <button className=" inline-block h-full w-full">{`Googleで${props.kind === "login" ? "ログイン" : "サインアップ"}`}</button>
    </div>
  );
};

export default GoogleSignBtn;
