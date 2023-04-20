import Head from "next/head";
import { useState, useEffect } from "react";
import Nav from "./Nav";
import ForYouRecipeCard from "./ForYouRecipeCard";
import Spinner from "./Spinner";

function ForYou() {
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/liked-recipes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLikedRecipes(data.likedRecipes);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Nav />

      <div className="max-w-screen-md mx-auto px-4">
        <Head>
          <title>Liked |FoodMatch </title>
        </Head>

        <h1 className="text-2xl font-bold mb-4">Liked</h1>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Spinner />
          </div>
        ) : likedRecipes && likedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {likedRecipes.map((recipe) => (
              <ForYouRecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="text-gray-700">
            You haven&lsquo;t liked any recipes yet.
          </p>
        )}
      </div>
    </>
  );
}

export default ForYou;
