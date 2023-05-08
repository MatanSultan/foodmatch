import Head from "next/head";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { FaEye } from "react-icons/fa";
import RecipeStages from "../components/RecipeStages";
import Spinner from "../components/Spinner";
import { GiSelfLove } from "react-icons/gi";
import Link from "next/link";
import Alert from "../components/Alert";
function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showStages, setShowStages] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState(null);

  const handleLikeClick = async (recipeID) => {
    try {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeID,
        }),
      });
      if (res.status == "401") {
        setError("Please login to like the recipe");
      } else if (!res.ok) {
        setError("Failed to add or remove like");
        throw new Error("Failed to add or remove like");
      } else {
        setRecipes((prevRecipes) => {
          return prevRecipes.map((recipe) => {
            if (recipe.id === recipeID) {
              return {
                ...recipe,
                likes: recipe.didLike ? recipe.likes - 1 : recipe.likes + 1,
                didLike: !recipe.didLike,
              };
            } else {
              return recipe;
            }
          });
        });
        setIsLiked((prevIsLiked) => !prevIsLiked);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch("/api/recipes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.id);
        setRecipes(data);
      })
      .catch((error) => console.error(error));
  }, []);

  if (!Array.isArray(recipes)) {
    console.error("recipes is not an array!");
    return;
  }

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewStagesClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowStages(true);
  };

  const handleCloseStagesClick = () => {
    setSelectedRecipe(null);
    setShowStages(false);
  };

  return (
    <>
      <Nav />

      <div className="max-w-screen-md mx-auto px-4 mt-12">
        {error && (
          <div>
            {" "}
            <Alert message={error} type="error" />
          </div>
        )}

        <h1 className="mt-12 text-2xl font-bold mb-4">Recipes</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="border border-gray-400 rounded p-2 w-full"
          />
        </div>
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <Link href={`/recipes/${recipe.id}`}>
                  <img
                    src={recipe.image_url}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/no-image.jpg";
                    }}
                  />
                </Link>
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{recipe.title}</h2>
                  <p className="text-gray-700 mb-2">{recipe.description}</p>

                  <button
                    className={
                      "mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150" +
                      (recipe.didLike ? " opacity-50 cursor-not-allowed" : "")
                    }
                    onClick={() => handleLikeClick(recipe.id)}
                  >
                    <GiSelfLove /> <span className="ml-2">Like</span>{" "}
                    <span className="ml-2">{recipe.likes}</span>
                  </button>

                  <button
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                    onClick={() => handleViewStagesClick(recipe)}
                  >
                    <FaEye className="mr-2" />
                    <span>View steps</span>
                  </button>
                </div>
                <p>{` (by :  ${recipe.username})`}</p>
              </div>
            ))}
          </div>
        ) : searchTerm !== "" ? (
          <p className="text-center text-gray-700">
            No recipes found with that name.
          </p>
        ) : (
          <div className="flex items-center justify-center h-64">
            <Spinner />
          </div>
        )}
      </div>

      {showStages && (
        <RecipeStages
          recipe={selectedRecipe}
          onClose={handleCloseStagesClick}
        />
      )}
    </>
  );
}

export default Recipes;
