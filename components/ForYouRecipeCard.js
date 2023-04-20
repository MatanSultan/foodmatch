import Link from "next/link";

function ForYouRecipeCard({ recipe }) {
  console.log(recipe);
  return (
    <div className="rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out">
      <Link href={`/recipes/`}>
        <span>
          <div
            className="h-48 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${recipe.image_url})` }}
          />
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">{recipe.title}</h2>
            <p className="text-gray-700 text-sm mb-2">{recipe.description}</p>
          </div>
        </span>
      </Link>
    </div>
  );
}

export default ForYouRecipeCard;
