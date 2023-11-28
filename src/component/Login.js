import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../services/api";
import { UserContext } from "../contexts/UserContext";
import "../styles.css";
import {   toast } from "react-toastify";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      setLoading(true);
      if(!username && !password){
        throw new Error("Enter Credentials")
      }
      const response = await AuthService.login({ username, password });
      console.log("response =>",response)
      setUser({
        token: response.data.token,
        role: response.data.role,
      });

      localStorage.setItem("token", response.data.token);
      toast('LoggedIn Successfully', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      navigate("/tasks");
    } catch (error) {
      console.error("Login failed:", error);
      toast(JSON.stringify(error), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      // Display a user-friendly error message to the user
      // You could use a state variable to manage the error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xs">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold "
              htmlFor="username"
            >
              Username:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold "
              htmlFor="password"
            >
              Password:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="ml-4">
              <Link
                to="/register" // Navigate to the registration page
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
