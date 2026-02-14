import useAuth from "../../Hooks/useAuth";


const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-md hover:bg-linear-to-l cursor-pointer  bg-linear-to-r from-yellow-300 to-yellow-500 shadow-xl rounded-2xl p-6 m-10 shadow-yellow-400">
      <h2 className="text-2xl text-black font-bold font-outfit  mb-4">
        My Profile
      </h2>

      <div className="space-y-3 py-10 flex flex-col justify-between gap-4">
        <div>
          <p className="text-sm text-gray-600">Name</p>
          <p className="text-lg font-medium text-gray-800">
            {user?.displayName || "No name available"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Email</p>
          <p className="text-lg font-medium text-gray-800">
            {user?.email || "No email available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
