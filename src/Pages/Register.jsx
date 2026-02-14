import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    refetch,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const {createUser, updateUserProfile} = useAuth();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
    .then(result => {
      console.log(result.user);
      navigate("/dashboard");
      toast.success('Successfully Registered!');


       // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          // photoURL: profilePic
        }
        updateUserProfile(userProfile)
        .then(() => {
          console.log("Profile Name and Picture updated");
          refetch;
        } )
        .catch(error => {
          console.error(error);
        })

    })
    .catch(error => {
      console.log(error)
    })

  }

  return (
    <div>
      <form onSubmit = {handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border-0 border-b-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
             {...register("name")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border-0 border-b-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
             {...register("email")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border-0 border-b-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
             {...register("password")}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-linear-to-r from-yellow-500 to-yellow-400 text-black py-2  font-medium hover:bg-linear-to-l transition cursor-pointer"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
