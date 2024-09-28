import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/home/Home";
import Shop from "../Componenets/shop/Shop";
import LoginPAge from "../pages/loginPage/LoginPAge";
import Registration from "../pages/registrationPage/Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPAge />,
      },
      {
        path: "/signin",
        element: <Registration />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
    ],
  },
]);
