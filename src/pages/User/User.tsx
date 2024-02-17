import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/slice/Hooks/hooks";
import { listenToDoc } from "../../firebase/firestore/firestore-financeData-operations";
import { setFireStoreData } from "../../store/slice/financeSlice";
const User = () => {
  const { isLogin, name, id } = useAppSelector((state) => state.auth);
  const { incomes, expense } = useAppSelector((state) => state.finance);
  const dispatch = useAppDispatch();
  console.log(isLogin);
  useEffect(() => {
    if (id) {
      localStorage.setItem("uid", id);
    }
    const userUid = id || (localStorage.getItem("uid") as string);
    const unsubscribe = listenToDoc(userUid, (data) => {
      if (data) {
        dispatch(setFireStoreData(data));
      } else {
        console.log("Error");
      }
    });
    return () => unsubscribe();
  }, [id, dispatch]);

  console.log(incomes, expense);

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
