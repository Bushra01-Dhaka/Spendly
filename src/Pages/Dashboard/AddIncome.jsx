import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";

const AddIncome = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {user} = useAuth();

  const onSubmit = async (data) => {
    console.log(data);
    reset();

    const incomeInfo = {
      amount: data.amount,
      category: data.category,
      description: data.description,
      date: data.date,
      status: data.status,
      createdAt: new Date(),
      email: user?.email
    };

    const incomeRes = await axiosSecure.post("/incomes", incomeInfo);
    Swal.fire({
      title: "Income Added Successfully!",
      icon: "success",
      draggable: true,
    });

    navigate("/dashboard");


  };

  return (
    <div className="flex justify-start items-center py-20 p-10 bg-linear-to-r from-yellow-200 to-yellow-400">
      <div className="w-full  bg-slate-100 shadow-lg rounded-2xl p-8">
        <h2 className="text-4xl font-bold mb-6">Add Income</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-10">
          {/* Amount */}
          <div>
            <label className="block mb-1 font-medium">Amount</label>
            <input
              type="number"
              step="0.01"
              placeholder="Enter amount"
              {...register("amount", { required: "Amount is required" })}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Category</option>
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Business">Business</option>
              <option value="Investment">Investment</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              placeholder="Write a short description"
              {...register("description")}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="3"
            ></textarea>
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              {...register("status", { required: "Status is required" })}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Status</option>
              <option value="Received">Received</option>
              <option value="Pending">Pending</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r hover:bg-linear-to-l from-yellow-400 to-yellow-500 text-black py-3 rounded-lg font-semibold 0 transition duration-300"
          >
            Add Income
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddIncome;
