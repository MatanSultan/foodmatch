import { useState, useEffect } from "react";

function RecipeStages({ recipe, onClose }) {
  const [stages, setStages] = useState([]);

  useEffect(() => {
    fetch(`/api/stages?recipeID=${recipe.id}`)
      .then((response) => response.json())
      .then((data) => {
        setStages(data);
      })
      .catch((error) => console.error(error));
  }, [recipe.id]);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              {/* Display recipe image */}
              <img src={recipe.image_url} alt={recipe.title} />
            </div>

            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {recipe.title}
              </h3>
              <div className="mt-2">
                {/* Display recipe description */}
                <p className="text-sm text-gray-500">{recipe.description}</p>

                <div className="mt-4">
                  {/* Display recipe steps */}
                  {stages.map((stage) => (
                    <div key={stage.id} className="flex mb-4">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white mr-4">
                        {stage.step}
                      </div>
                      <div>{stage.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-6">
            <button
              onClick={onClose}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeStages;
