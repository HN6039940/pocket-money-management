import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/slice/Hooks/hooks";
import { listenToDoc } from "../../firebase/firestore/firestore-financeData-operations";
import { isLoginUser } from "../../firebase/auth/fireauth-config";
import { setFireStoreData } from "../../store/slice/financeSlice";

const User = () => {
  const { name, id } = useAppSelector((state) => state.auth);
  const { incomes, expense } = useAppSelector((state) => state.finance);
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

  console.log(incomes, expense);
  console.log(data, isLoading);

  return (
    <>
      <NavBar />
      <section className="container mx-auto  min-w-60">
        <h1 className=" mt-16 font-noto-sans-jp text-5xl">ようこそ {name}</h1>

        <div>
          <Link
            to="dashboard"
            className="mt-4 block font-noto-sans-jp text-2xl"
          >
            ダッシュボードへ
          </Link>
          <Link
            to="transaction"
            className="mt-4 block font-noto-sans-jp text-2xl"
          >
            記録する
          </Link>
        </div>
        <Outlet />
      </section>
    </>
  );
};

export default User;
