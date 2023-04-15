import Head from "next/head";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { FaEye } from "react-icons/fa";
import RecipeStages from "../components/RecipeStages";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [showStages, setShowStages] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleLikeClick = async (recipeID) => {
    try {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeID,
          userID: 1, // Hardcoded user ID for testing purposes
        }),
      });

      if (!res.ok) {
        alert("Failed to add like");
        throw new Error("Failed to add like");
      }

      const updatedRecipes = recipes.map((recipe) => {
        if (recipe.id === recipeID) {
          return {
            ...recipe,
            likes: recipe.likes + 1,
          };
        } else {
          return recipe;
        }
      });

      setRecipes(updatedRecipes);

      setIsLiked(true);

      await fetch("/api/recipes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipes),
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch("/api/recipes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecipes(data);
      })
      .catch((error) => console.error(error));
  }, []);

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

      <div className="max-w-screen-md mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Recipes</h1>

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
                <img
                  src={recipe.image_url}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{recipe.title}</h2>
                  <p className="text-gray-700 mb-2">{recipe.description}</p>

                  <button
                    className={
                      "mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150" +
                      (isLiked ? " opacity-50 cursor-not-allowed" : "")
                    }
                    onClick={() => handleLikeClick(recipe.id)}
                  >
                    <svg
                      className="-ml-1 mr-2 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M10 20a10 10 0 100-20 10 10 0 000 20zm0 2a12 12 0 100-24 12 12 0 000 24z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{recipe.likes}</span>
                  </button>

                  <button
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                    onClick={() => handleViewStagesClick(recipe)}
                  >
                    <FaEye className="mr-2" />
                    <span>View Stages</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No recipes found</p>
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
