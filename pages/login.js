import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Nav from "../components/Nav";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      const user = response.data;
      // Do something with the user object, e.g. store it in a global state
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };
  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gray-100">
        <div className="flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <form onSubmit={handleSubmit}>
                <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
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
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Login
                </button>
                <p className="mt-4 text-center">
                  Don&lsquo;t have an account?{" "}
                  <Link href="/register">
                    <button className="text-blue-500 hover:text-blue-600">
                      Register here
                    </button>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
