import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxios from "../Hooks/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useAuth();

  const onSubmit = async (data) => {
    try {
      // 1️⃣ Create User in Firebase
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;

      // 2️⃣ Update Firebase Profile
      await updateUserProfile({
        displayName: data.name,
      });

      // 3️⃣ Send user info to database
      const userInfo = {
        name: data.name,
        email: data.email,
        createdAt: new Date(),
      };

      const userRes = await axiosPublic.post(`/users`, userInfo);
        console.log(userRes.data);

      // 4️⃣ Success
      toast.success("Successfully Registered!");
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border-0 border-b-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border-0 border-b-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border-0 border-b-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            {...register("password", { 
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black py-2 font-medium hover:from-yellow-400 hover:to-yellow-500 transition cursor-pointer"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
