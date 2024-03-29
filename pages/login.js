import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { setCookie } from "cookies-next";
import Nav from "../components/Nav";
import Link from "next/link";
import { auth } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Alert from "../components/Alert";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [username, setUser] = useState("");
  const googleAuth = new GoogleAuthProvider();
  const handleGoogleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleAuth);

      const { email, displayName } = user;

      // First check if user already exists with the provided email
      const checkUserResponse = await axios.get(
        `/api/check-user ? email=${email}`
      );
      if (checkUserResponse.data.exists) {
        // User already registered, just set the user context
        setUser({ username: displayName, email });
        setSuccess(`Welcome back, ${displayName}!`);
        window.location.href = "/recipes";
        return;
      }

      // If user doesn't exist, register them with the Google user data
      await axios.put("/api/register", {
        username: displayName,
        email,
        google_id: user.uid,
        google_email: email,
        google_name: displayName,
      });

      // Set the user context with the registered user data
      setUser({ username: displayName, email });
      setSuccess(`${email}, You have successfully registered with Google!`);
      window.location.href = "/recipes";
    } catch (error) {
      console.error(error);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validation the form
    if (email === "") {
      setError("Please enter an email");
      return;
    }
    if (password === "") {
      setError("Please enter a password");
      return;
    }
    // handle with sql injection

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      setCookie(null, "SID", response.data.token, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
        httpOnly: true,
      });

      window.location.reload();
      window.location.href = "/recipes";
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div>
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
      <Nav />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    // required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>

                <div className="mt-2">
                  <Link href="/register">
                    <span className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Dont have an account? Register
                    </span>
                  </Link>
                </div>
                <div className="mt-2">
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Sign in with Google
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
