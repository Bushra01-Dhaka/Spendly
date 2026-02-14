import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { IoIosAddCircle } from "react-icons/io";
import { FaMinusCircle } from "react-icons/fa";

const UserDashboard = () => {
  const { user } = useAuth();
  console.log(user?.displayName);
  return (
    <section className="flex justify-start items-center min-h-[10vh] p-10">
      <div>
        <div>
          <h2 className="text-3xl font-bold font-outfit text-black">
            Welcome Back! {user?.displayName}
          </h2>
          <p className="py-2">
            View Your monthly spending, saving progress and budget for this
            month.
          </p>
        </div>

        <div className="grid grid-cols-1  lg:grid-cols-4 py-10 gap-6">
          <div className="bg-linear-to-tr cursor-pointer hover:bg-linear-to-r  from-yellow-500 to-yellow-300 text-black p-10 rounded-md shadow-2xl">
            <p className="text-lg">Monthly Income</p>
            <h3 className="text-3xl font-bold py-4">$10000</h3>
          </div>

          <div className="bg-linear-to-tr cursor-pointer hover:bg-linear-to-r  from-yellow-500 to-yellow-300 text-black p-10 rounded-md shadow-2xl">
            <p className="text-lg">Monthly Expenses</p>
            <h3 className="text-3xl font-bold py-4">$6600</h3>
          </div>

          <div className="bg-linear-to-tr cursor-pointer hover:bg-linear-to-r  from-yellow-500 to-yellow-300 text-black p-10 rounded-md shadow-2xl">
            <p className="text-lg">Monthly Saving</p>
            <h3 className="text-3xl font-bold py-4">$3400</h3>
          </div>

          <div className="">
            <Link>
              <button className="btn w-full border-0 rounded-md shadow-2xl btn-primary bg-black text-yellow-400 hover:text-yellow-200 hover:bg-slate-950 mb-4">
                <IoIosAddCircle className="text-3xl inline" />
                Add Income
              </button>
            </Link>
            <Link>
              {" "}
              <button className="btn w-full border-0 rounded-md shadow-2xl btn-primary bg-black text-yellow-400 hover:text-yellow-200 hover:bg-slate-950">
                <FaMinusCircle className="text-2xl inline" />
                Add Expenses
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
