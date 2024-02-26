import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/slice/Hooks/hooks";
import { listenToDoc } from "../../firebase/firestore/firestore-financeData-operations";
import { isLoginUser } from "../../firebase/auth/fireauth-config";
import { setFireStoreData } from "../../store/slice/financeSlice";

import NavBar from "../../components/Navigation/NavBar";
import MenuBar from "../../components/Navigation/MenuBar";

const User = () => {
  const { name, id } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["financeData", id, dispatch],
    queryFn: async () => {
      const response = await isLoginUser();
      if (response === undefined) {
        return null;
      }
      return response;
    },
  });

  useEffect(() => {
    const unsubscribe = listenToDoc((data) => {
      if (data) {
        dispatch(setFireStoreData(data));
      } else {
        console.log("Error");
      }
    });
    return () => unsubscribe();
  }, [id, dispatch]);

  if (isLoading) return <p>loading...</p>;

  if (isError && !data) return <p>ログインしてください</p>;

  return (
    <>
      <NavBar />
      <section className="container mx-auto min-h-dvh px-5">
        <div className="border-b-2 border-black py-5">
          <h1 className=" md:mt-15 mt-8  font-noto-sans-jp text-xl sm:mt-10 sm:text-3xl md:text-5xl">
            ようこそ {name}
          </h1>
          <MenuBar />
        </div>
        <Outlet />
      </section>
    </>
  );
};

export default User;
