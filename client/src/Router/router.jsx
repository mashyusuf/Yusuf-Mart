import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/home/Home";
import Shop from "../Componenets/shop/Shop";
import LoginPAge from "../pages/loginPage/LoginPAge";
import Registration from "../pages/registrationPage/Registration";
import PrivateRouter from "./PrivateRouter";
import ShopNow from "../Componenets/shopNow/ShopNow";
import MyAddToCart from "../Componenets/MyCart/MyAddToCart";
import MyHeartList from "../Componenets/myHeartList/MyHeartList";
import Checkout from "../Componenets/checkout/Checkout";

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
        path: "/signUp",
        element: <Registration />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shopNow/:id",
        element: <PrivateRouter ><ShopNow /></PrivateRouter>,
      },
      {
        path: "/myCart",
        element: <MyAddToCart />,
      },
      {
        path: "/myHeart",
        element: <MyHeartList />,
      },
      {
        path: "/checkout",
        element: <PrivateRouter><Checkout /></PrivateRouter>,
      },
    ],
  },
]);
