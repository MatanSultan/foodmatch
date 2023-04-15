import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Nav = () => {
  const { user, setUser } = useContext(UserContext);
  async function logOut() {
    setUser(null);
    await axios.get("/api/logout");
  }
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-900 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          <Link href="/">FoodMatch</Link>
        </span>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-900 hover:border-gray-900"
          aria-label="Toggle Navigation Menu"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link href="/" passHref>
            <li
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4"
              aria-label="Go to Home Page"
            >
              Home
            </li>
          </Link>
          <Link href="/about" passHref>
            <li
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4"
              aria-label="Learn about our story"
            >
              Our Story
            </li>
          </Link>
          <Link href="/recipes" passHref>
            <li
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4"
              aria-label="Browse our recipes"
            >
              Our Recipes
            </li>
          </Link>
          <Link href="/events" passHref>
            <li
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500"
              aria-label="Browse our events"
            >
              Our events
            </li>
          </Link>
        </div>
        <div>
          {user ? (
            <div className="flex items-center text-red-400">
              <span
                className="ml-3 text-red-400 inline-block align-baseline font-bold text-sm hover:text-red-800"
                aria-label={`Logged in as ${user.email}`}
              >
                {user.email}
              </span>
              <button
                onClick={() => logOut()}
                className="flex items-center ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                aria-label="Log out"
              >
                Log Out
              </button>
              <button
                className="flex items-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                aria-label="Share your recipe"
              >
                <Link href="/add-recipe">Share Recipe</Link>
              </button>
            </div>
          ) : (
            <Link href="/login" passHref>
              <button
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-500 hover:bg-white mt-4 lg:mt-0"
                aria-label="Log in"
              >
                Log In
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
