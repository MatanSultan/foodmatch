import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import AiFillAccountBook from "react-icons/ai";
import FocusTrap from "focus-trap-react";

function RecipeStages({ recipe, onClose }) {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    fetch(`/api/recipes-steps?recipe_id=${recipe.id}`)
      .then((response) => response.json())
      .then((data) => {
        setSteps(data);
      })
      .catch((error) => console.error(error));

    // Remove focus from trigger element when modal is open
    document.activeElement.blur();

    // Add blur effect and focus trap when the modal is open
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [recipe.id]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center">
      <FocusTrap className="overflow-y-scroll ">
        <div className="bg-white w-full sm:w-3/4 h-full sm:h-4/5 lg:w-2/3 lg:h-3/4 xl:w-1/2 xl:h-2/3 rounded-lg overflow-hidden shadow-lg">
          <div className="p-4">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-red-500 hover:text-red-600 text-5xl font-bold focus:outline-none"
            >
              &times;
            </button>
            <h2 className="text-center text-lg font-bold mb-2">
              {recipe.title}
            </h2>
          </div>
          <div className="p-4">
            <h2 className="text-center text-blue-600 text-lg font-bold mb-2">
              Preparation steps
            </h2>
            {steps.length > 0 ? (
              <ol className="list-decimal list-inside text-blue-900">
                {steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            ) : (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}

export default RecipeStages;
