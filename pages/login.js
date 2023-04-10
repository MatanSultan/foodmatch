import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import Nav from "../components/Nav";
import { UserContext } from "../context/UserContext";
import axios from "axios";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/api/login", {
        email,
        password,
      });
      // if data current user is not null, then redirect to recipes page

      if (data.user) {
        router.push("/about");
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div>
      <Nav />

      <div className="min-h-screen bg-gray-100">
        <Head>
          <title>Login - FoodMatch</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-4xl font-bold mb-8">Login to FoodMatch</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-md">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
              <Link href="/register">
                <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                  Create an account
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
