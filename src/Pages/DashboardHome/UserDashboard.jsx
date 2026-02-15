import { Link } from "react-router";

import { useQuery } from "@tanstack/react-query";
import { IoIosAddCircle } from "react-icons/io";
import { FaMinusCircle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AllIncomeData from "../Dashboard/AllIncomeData";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch Incomes
  const { data: incomes = [] } = useQuery({
    queryKey: ["incomes", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/incomes?email=${user.email}`
      );
      return res.data;
    },
  });

  // Fetch Expenses
  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/expenses?email=${user.email}`
      );
      return res.data;
    },
  });

  // Calculate Totals
  const totalIncome = incomes.reduce(
    (sum, item) => sum + parseFloat(item.amount),
    0
  );

  const totalExpenses = expenses.reduce(
    (sum, item) => sum + parseFloat(item.amount),
    0
  );

  const balance = totalIncome - totalExpenses;

  return (
    <section className="flex justify-start items-center min-h-[10vh] p-10">
      <div>
        <h2 className="text-3xl font-bold text-black">
          Welcome Back! {user?.displayName}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 py-10 gap-6">

          {/* Income */}
          <div className="bg-yellow-400 p-10 rounded-md shadow-xl">
            <p>Total Income</p>
            <h3 className="text-3xl font-bold">
              ${totalIncome.toFixed(2)}
            </h3>
          </div>

          {/* Expenses */}
          <div className="bg-yellow-400 p-10 rounded-md shadow-xl">
            <p>Total Expenses</p>
            <h3 className="text-3xl font-bold">
              ${totalExpenses.toFixed(2)}
            </h3>
          </div>

          {/* Balance */}
          <div className="bg-yellow-400 p-10 rounded-md shadow-xl">
            <p>Balance</p>
            <h3 className="text-3xl font-bold">
              ${balance.toFixed(2)}
            </h3>
          </div>

          {/* Buttons */}
          <div>
            <Link to="/dashboard/addIncome">
              <button className="btn w-full mb-4">
                <IoIosAddCircle className="inline text-2xl" />
                Add Income
              </button>
            </Link>

            <Link to="/dashboard/addExpenses">
              <button className="btn w-full">
                <FaMinusCircle className="inline text-2xl" />
                Add Expenses
              </button>
            </Link>
          </div>

        </div>

        <div className="p-10 py-20">
             <AllIncomeData/>
        </div>

      </div>
    </section>
  );
};

export default UserDashboard;
