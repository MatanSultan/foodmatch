import { useContext, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { auth } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Alert from "./Alert";
const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const googleAuthProvider = new GoogleAuthProvider();

  // hendel in the error message time
  setTimeout(() => {
    setError(null);
  }, 10000);
  // hendel in the success message time

  const handleGoogleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleAuthProvider);
      const { email, displayName } = user;

      // Call your registration API with the Google user data
      await axios.put("/api/register", {
        username: displayName,
        email,
        google_id: user.uid,
        google_email: email,
        google_name: displayName,
      });

      // Set the user context with the registered user data
      setUser({ username: displayName, email });
      setSuccess(email + "You have successfully registered by google");
      // Redirect to the recipes page
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username === "") {
      setError("Please enter a username");
      return;
    }
    if (username.includes(" ")) {
      setError("Username cannot contain spaces");
      return;
    }
    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }
    if (email === "") {
      setError("Please enter an email");
      return;
    }
    if (password === "") {
      setError("Please enter a password");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (confirmPassword === "") {
      setError("Please confirm your password");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.put("/api/register", {
        username,
        email,
        password,
      });
      ///
      setUser({ username, email });
      setSuccess("You have successfully registered");
      window.location.href = "/recipes";
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen mt-12">
      <div className="flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <form className=" max-w-md mx-auto " onSubmit={handleSubmit}>
              {error && (
                <div>
                  {" "}
                  <Alert message={error} type="error" />
                </div>
              )}
              {success && (
                <div>
                  {" "}
                  <Alert message={success} type="success" />
                </div>
              )}
              <h2 className="text-2xl font-bold mb-4">Create an account</h2>
              {/* Google Login */}
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none"
              >
                <div className="px-4 py-3">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        x1="50%"
                        y1="0%"
                        x2="50%"
                        y2="100%"
                        id="linearGradient-1"
                      >
                        <stop stopColor="#FFC107" offset="0%" />
                        <stop stopColor="#FF8A00" offset="100%" />
                      </linearGradient>
                    </defs>

                    <g fill="none" fillRule="evenodd">
                      <path
                        d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"
                        fill="url(#linearGradient-1)"
                      />
                      <path
                        d="M13.333 20v3.333h6.667c-.278 1.667-1.667 5-5 5a5.833 5.833 0 01-5-5c0-3.056 2.278-5.278 5-5.833v3.333a2.5 2.5 0 00-2.5 2.5c0 .694.278 1.389.833 1.944l2.5 2.5a6.25 6.25 0 004.167-2.5h3.333a10 10 0 01-6.667 6.667A10 10 0 0113.333 20z"
                        fill="#FFF"
                      />
                    </g>
                  </svg>
                </div>
                <span className="w-5/6 text-center font-semibold">
                  Continue with Google
                </span>
              </button>
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
