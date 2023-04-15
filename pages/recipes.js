import Head from "next/head";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { FaEye } from "react-icons/fa";
function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLiked, setIsLiked] = useState(false);

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
                      "mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-green-600 text-white"
                    }
                  >
                    <FaEye className="mr-2" />
                  </button>

                  <button
                    onClick={() => handleLikeClick(recipe)}
                    disabled={isLiked}
                    className={`mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm ${
                      isLiked
                        ? "bg-red-600 text-white"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {isLiked ? "Liked!" : "Like"}
                  </button>
                  <p className="text-sm text-gray-500">
                    By User {recipe.user_id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">No recipes yet.</p>
        )}
      </div>
    </>
  );
}

export default Recipes;
