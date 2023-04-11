import { useContext, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "../context/UserContext";
const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      if (username === "") {
        alert("Please enter a username");
      }
      if (username.length < 3) {
        alert("Username must be at least 3 characters");
      }
      if (email === "") {
        alert("Please enter an email");
      }
      if (password === "") {
        alert("Please enter a password");
      }
      if (password.length < 6) {
        alert("Password must be at least 6 characters");
      }
      if (confirmPassword === "") {
        alert("Please confirm your password");
      }
      // handel with sql injection
      if (username.includes(" ")) {
        alert("Username cannot contain spaces");
      }

      return;
    }
    try {
      await axios.put("/api/register", {
        username,
        email,
        password,
      });
      setUser({ username, email });

      // transfer to login page
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
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
            className="w-full border border-gray-400 p-2 rounded-md focus:outline-none focus:border-blue-500"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
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
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
