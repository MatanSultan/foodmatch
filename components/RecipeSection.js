const RecipeSection = ({ recipes }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-lg">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{recipe.name}</h3>
              <p className="text-gray-600">{recipe.description}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-300 ease-in-out">
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSection;
