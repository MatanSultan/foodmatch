import { useContext, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username === "") {
      alert("Please enter a username");
      return;
    }
    if (username.includes(" ")) {
      alert("Username cannot contain spaces");
      return;
    }
    if (username.length < 3) {
      alert("Username must be at least 3 characters");
      return;
    }
    if (email === "") {
      alert("Please enter an email");
      return;
    }
    if (password === "") {
      alert("Please enter a password");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (confirmPassword === "") {
      alert("Please confirm your password");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.put("/api/register", {
        username,
        email,
        password,
      });
      setUser({ username, email });
      alert("You have successfully registered");
      window.location.href = "/recipes";
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <form className=" max-w-md mx-auto " onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-4">Create an account</h2>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="w-full border border-gray-400 p-2 rounded-md focus:outline-none focus:border-blue-500

"
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full border border-gray-400 p-2 rounded-md focus:outline-none focus:border-blue-500"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full border border-gray-400 p-2 rounded-md focus:outline-none focus:border-blue-500"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full border border-gray-400 p-2 rounded-md focus:outline-none focus:border-blue-500"
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                >
                  Register
                </button>
              </div>
              <div className="flex justify-between items-center">
                <Link href="/login">
                  <span className="text-blue-500 hover:text-blue-600">
                    Login
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
