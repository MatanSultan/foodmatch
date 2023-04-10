import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Nav = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-700 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          <Link href="/">FoodMatch</Link>
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-900 hover:border-gray-900">
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
          <Link href="/">
            <li className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4">
              Home
            </li>
          </Link>
          <Link href="/about">
            <li className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4">
              about
            </li>
          </Link>
          <Link href="/recipes">
            <li className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500">
              Recipes
            </li>
          </Link>
        </div>
        <div>
          {user ? (
            <div className="flex items-center text-red-400">
              hello{" "}
              <p
                className="text-red-400 inline-block align-baseline font-bold text-sm text-red-400 hover:text-red-800
              "
              >
                {user.email}
              </p>
              <button
                onClick={() => setUser(null)}
                className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                log out
              </button>
            </div>
          ) : (
            <Link href="/login">
              <li className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-500 hover:bg-white mt-4 lg:mt-0">
                Login
              </li>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
