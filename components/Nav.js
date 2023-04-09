import Link from "next/link";

const Nav = () => {
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
          <Link href="/recipes">
            <li className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4">
              Recipes
            </li>
          </Link>
          <Link href="/restaurants">
            <li className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500">
              Restaurants
            </li>
          </Link>
        </div>
        <div>
          <Link href="/register">
            <li className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-500 hover:bg-white mt-4 lg:mt-0">
              Sign Up
            </li>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
