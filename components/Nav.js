import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { SiAboutdotme } from "react-icons/si";
import { FaBookReader } from "react-icons/fa";
import { BsCalendarEvent } from "react-icons/bs";

const Nav = () => {
  const { user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  async function logOut() {
    setUser(null);
    await axios.get("/api/logout");
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-blue-500">
      <div className="container mx-auto flex items-center justify-between px-6 py-4 md:py-6">
        <div className="flex items-center flex-shrink-0">
          <Link href="/" passHref>
            <span className="font-bold text-xl tracking-tight text-white">
              FoodMatch
            </span>
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center">
            <Link href="/" passHref>
              <span
                className="flex items-center text-sm mr-4 py-2 px-4 text-white hover:text-gray-900 transition-colors duration-200"
                aria-label="Go to Home Page"
              >
                <AiFillHome className="mr-1" />
                Home
              </span>
            </Link>
            <Link href="/about" passHref>
              <span
                className="flex items-center text-sm mr-4 py-2 px-4 text-white hover:text-gray-900 transition-colors duration-200"
                aria-label="Learn about our story"
              >
                <SiAboutdotme className="mr-1" />
                About
              </span>
            </Link>
            <Link href="/recipes" passHref>
              <span
                className="flex items-center text-sm mr-4 py-2 px-4 text-white hover:text-gray-900 transition-colors duration-200"
                aria-label="Browse our recipes"
              >
                <FaBookReader className="mr-1" />
                Recipes
              </span>
            </Link>
            <Link href="/events" passHref>
              <span
                className="flex items-center text-sm mr-4 py-2 px-4 text-white hover:text-gray-900 transition-colors duration-200"
                aria-label="Browse our events"
              >
                <BsCalendarEvent className="mr-1" />
                Events
              </span>
            </Link>
            {user && (
              <Link href="/foru" passHref>
                <span
                  className="flex items-center text-sm mr-4 py-2 px-4 text-white hover:text-gray-900 transition-colors duration-200"
                  aria-label="Browse your liked recipes"
                >
                  {menuOpen ? (
                    <MdOutlineFavorite className="mr-1" />
                  ) : (
                    <MdOutlineFavoriteBorder className="mr-1" />
                  )}
                  Liked
                </span>
              </Link>
            )}
          </div>
        </div>
        <div className="hidden md:block">
          {user ? (
            <div className="flex items-center">
              <div className="text-black text-sm mr-4 py-2 px-4">
                Welcome {user.email}
                <button
                  className=" bg-red-500 flex items-center text-sm mr-4 py-2 px-2 text-white hover:text-gray-900 transition-colors duration-200"
                  onClick={logOut}
                >
                  Log Out
                </button>
              </div>

              {/* // profile button  */}
              <Link href="/profile" passHref>
                <span
                  className="bg-blue-900 flex items-center text-sm mr-2 py-2 px-2 text-white hover:text-gray-900 transition-colors duration-200"
                  aria-label="Go to your profile"
                >
                  Profile
                </span>
              </Link>

              {/* // add-recipe button  */}
              <Link href="/add-recipe" passHref>
                <span
                  className=" bg-green-500 flex items-center text-sm py-2 px-2 text-white hover:text-gray-900 transition-colors duration-200"
                  aria-label="Add a recipe"
                >
                  Add Recipe
                </span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center">
              <Link href="/login" passHref>
                <span
                  className="flex items-center text-sm mr-4 py-2 px-4 text-white hover:text-gray-900 transition-colors duration-200"
                  aria-label="Log in to your account"
                >
                  Log In
                </span>
              </Link>
              <Link href="/signup" passHref>
                <span
                  className="flex items-center text-sm mr-4 py-2 px-4 text-white hover:text-gray-900 transition-colors duration-200"
                  aria-label="Sign up for an account"
                >
                  Sign Up
                </span>
              </Link>
            </div>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-gray-900 transition-colors duration-200"
            aria-label="Toggle Menu"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
              {menuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 18a2 2 0 100-4 2 2 0 000 4zm0-8a2 2 0 100-4 2 2 0 000 4zm12 8a2 2 0 100-4 2 2 0 000 4zm0-8a2 2 0 100-4 2 2 0 000 4z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6a2 2 0 100 4 2 2 0 000-4zm0 8a2 2 0 100 4 2 2 0 000-4zm16-8a2 2 0 100 4 2 2 0 000-4zm0 8a2 2 0 100 4 2 2 0 000-4z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-4">
            <Link href="/" passHref>
              <span
                className="block text-sm px-2 py-2 text-white hover:text-gray-900 transition-colors duration-200"
                aria-label="Go to Home Page"
              >
                <AiFillHome className="mr-1" />
                Home
              </span>
            </Link>
            <Link href="/about" passHref>
              <span
                className="block text-sm px-2 py-2 text-white hover:text-gray-900 transition-colors duration-200"
                aria-label="Learn about our story"
              >
                <SiAboutdotme className="mr-1" />
                About
              </span>
            </Link>
            <Link href="/recipes" passHref>
              <span
                className="block text-sm px-2 py-2 text-white hover:text-gray-900 transition-colors duration-200"
                aria-label="Browse our recipes"
              >
                <FaBookReader className="mr-1" />
                Recipes
              </span>
            </Link>
            <Link href="/events" passHref>
              <span
                className="block text-sm px-2 py-2 text-white hover:text-gray-900 transition-colors duration-200"
                aria-label="Browse our events"
              >
                <BsCalendarEvent className="mr-1" />
                Events
              </span>
            </Link>
            {user && (
              <Link href="/foru" passHref>
                <span
                  className="block text-sm px-2 py-2 text-white hover:text-gray-900 transition-colors duration-200"
                  aria-label="Browse your liked recipes"
                >
                  {menuOpen ? (
                    <MdOutlineFavorite className="mr-1" />
                  ) : (
                    <MdOutlineFavoriteBorder className="mr-1" />
                  )}
                  Liked
                </span>
              </Link>
            )}
          </div>
          <div className="px-2 pt-2 pb-4">
            {user ? (
              <div className="flex items-center">
                <div className="text-black text-sm mr-4 py-2 px-4">
                  Welcome {user.email}
                  {/* // profile button  */}
                  <Link href="/profile" passHref>
                    <span
                      className="mt-2 bg-blue-900 flex items-center text-sm mr-4 py-2 px-4 text-white hover:text-gray-900 transition-colors duration-200"
                      aria-label="Go to your profile"
                    >
                      Profile
                    </span>
                  </Link>
                  {/* // add-recipe button  */}
                  <Link href="/add-recipe" passHref>
                    <span
                      className="mt-2 bg-green-500 flex items-center text-sm mr-4 py-2 px-4 text-white hover:text-gray-900 transition-colors duration-200"
                      aria-label="Add a recipe"
                    >
                      Add Recipe
                    </span>
                  </Link>
                  <button
                    className="mt-2 bg-red-500 flex items-center text-sm mr-4 py-2 px-4 text-white hover:text-gray-900 transition-colors duration-200"
                    onClick={logOut}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <Link href="/login" passHref>
                  <span
                    className=" bg-green-600 block text-sm px-2 py-2 text-white hover:text-gray-900 transition-colors duration-200 mr-2"
                    aria-label="Log in to your account"
                  >
                    Log In
                  </span>
                </Link>
                <Link href="/signup" passHref>
                  <span
                    className="bg-blue-900 block text-sm px-2 py-2 text-white hover:text-gray-900 transition-colors duration-200 "
                    aria-label="Sign up for an account"
                  >
                    Sign Up
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
