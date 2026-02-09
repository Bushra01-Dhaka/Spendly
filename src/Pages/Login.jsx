const Login = () => {
  return (
    <div>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border-0 border-b-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border-0 border-b-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-linear-to-r from-yellow-500 to-yellow-400 text-black py-2  font-medium hover:bg-linear-to-l transition cursor-pointer"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
