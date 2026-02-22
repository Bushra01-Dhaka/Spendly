import { useState } from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaDumpster, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AllIncomeData = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Fetch Incomes
  const { data: incomes = [] } = useQuery({
    queryKey: ["incomes", user?.email, month, year],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/incomes?email=${user.email}&month=${month}&year=${year}`,
      );
      return res.data;
    },
  });

  // Fetch Expenses
  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses", user?.email, month, year],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/expenses?email=${user.email}&month=${month}&year=${year}`,
      );
      return res.data;
    },
  });

  const deleteMutation = useMutation({
  mutationFn: async (id) => {
    return await axiosSecure.delete(`/income/${id}`);
  },
  onSuccess: () => {
    // Refetch incomes automatically
    QueryClient.invalidateQueries(["incomes"]);
    toast.success("Deleted successfully");
  },
  onError: () => {
    toast.error("Delete failed");
  },
});


  const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#FDC700",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteMutation.mutate(id);
    }
  });
};

  return (
    <div className="p-10 bg-slate-100 rounded-md shadow-2xl ">
      {/* Search Bar */}
      <div className="flex justify-end gap-3 mb-8">
        <select
          className="select select-bordered"
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">Month</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={String(i + 1).padStart(2, "0")}>
              {i + 1}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Year"
          className="input input-bordered w-32"
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      {/* Income Table */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Income</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((item) => (
                <tr key={item._id}>
                  <td>{item.date}</td>
                  <td>{item.category}</td>
                  <td className="text-green-600 font-semibold">
                    ৳ {item.amount}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <FaEdit className="text-xl text-yellow-400" />
                      <MdDelete
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                        className="text-xl text-red-600"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expenses Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Expenses</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((item) => (
                <tr key={item._id}>
                  <td>{item.date}</td>
                  <td>{item.category}</td>
                  <td className="text-red-600 font-semibold">
                    ৳ {item.amount}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <FaEdit className="text-xl text-yellow-400" />
                      <MdDelete
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                        className="text-xl text-red-600"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllIncomeData;
