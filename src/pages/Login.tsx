import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(login({ username, password }));
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <h1 className="text-white text-4xl font-bold mb-8 text-center">
        Welcome Back!
      </h1>
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white">
        <div className="mb-4 flex flex-col items-center">
          <label
            htmlFor="username"
            className="block text-gray-700 font-bold mb-2 text-center"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="w-full bg-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col items-center">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2 text-center"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full bg-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-md shadow-md hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <div className="mt-3 text-center">
        <h2 className="font-bold text-white text-xl">Shh! Here's a secret</h2>
        <h2 className="text-white">
          <span className="font-bold">Username</span>: admin
        </h2>
        <h2 className="text-white">
          <span className="font-bold">Password</span>: password
        </h2>
      </div>
    </div>
  );
};

export default Login;
