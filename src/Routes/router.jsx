import { createBrowserRouter } from "react-router";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login";
import DashborardLayout from "../Layout/DashborardLayout";
import UserDashboard from "../Pages/DashboardHome/UserDashboard";
import UserProfile from "../Pages/Dashboard/Userprofile";
import AddIncome from "../Pages/Dashboard/AddIncome";

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

  // dashboard
  {
     path:"/dashboard",
     Component: DashborardLayout,
     children: [
      {
        path:"/dashboard",
        Component: UserDashboard,
      },
      {
        path:"profile",
        Component: UserProfile,
      },
      {
        path:"addIncome",
        Component:AddIncome,
      }
     ]
  }
]);

export default router;
