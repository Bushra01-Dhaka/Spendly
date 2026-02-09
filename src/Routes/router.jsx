import { createBrowserRouter } from "react-router";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Login,
      },
    ],
  },
]);

export default router;
