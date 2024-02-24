import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase/firestore/firestore-config";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "./store/slice/Hooks/hooks";
import { setUserInfo } from "./store/slice/userAuthSclice";

import User from "./pages/User/User";
import TopPage from "./pages/Home/TopPage";
import LoginPage from "./pages/Home/Login/LogIn";
import DashBoard from "./pages/User/Dashboard/DashBoard";
import Transactions from "./pages/User/Transactions/Transactions";
import SignUp from "./pages/Home/SignUp/SignUp";
import TablePage from "./pages/User/Table/TablePage";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <TopPage />,
    errorElement: <h1>404 in Home</h1>,
  },
  {
    path: "user",
    element: <User />,
    children: [
      {
        path: "dashboard",
        element: <DashBoard />,
      },
      {
        path: "transaction",
        element: <Transactions />,
      },
      {
        path: "table",
        element: <TablePage />,
      },
    ],
  },
  { path: "login", element: <LoginPage /> },
  { path: "signup", element: <SignUp /> },
]);

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        dispatch(
          setUserInfo({
            name: user.displayName || user.email!,
            id: user.uid,
            isLogin: true,
            email: user.email!,
          }),
        );
      } else {
        dispatch(
          setUserInfo({
            name: "Guest",
            id: "0",
            isLogin: false,
            email: "",
          }),
        );
        console.log("not login");
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
