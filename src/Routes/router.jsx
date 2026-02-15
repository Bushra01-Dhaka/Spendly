import { createBrowserRouter } from "react-router";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login";
import DashborardLayout from "../Layout/DashborardLayout";
import UserDashboard from "../Pages/DashboardHome/UserDashboard";
import UserProfile from "../Pages/Dashboard/Userprofile";
import AddIncome from "../Pages/Dashboard/AddIncome";
import AddExpenses from "../Pages/Dashboard/AddExpenses";
import AllIncomeData from "../Pages/Dashboard/AllIncomeData";

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
      },
      {
        path:"addExpenses",
        Component: AddExpenses,
      },
      {
        path:"budgetTracker",
        Component: AllIncomeData,
      }
     ]
  }
]);

export default router;
