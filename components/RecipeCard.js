import React from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
const RecipeCard = ({ title, image, description }) => {
  return (
    <>
      <div className=" max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={image}
              alt={title}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {title}
            </div>
            <p className="mt-2 text-gray-500">{description}</p>
          </div>
          <div className="flex items-center  bg-gray-900">
            <Link href={`/recipes/}`}>
              <span className="text-white font-bold">
                <FaEye />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
