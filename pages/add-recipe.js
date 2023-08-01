import Head from "next/head";
import { useState } from "react";
import Nav from "../components/Nav";

function AddRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState("");
  const [errors, setErrors] = useState({});
  const [user_id, setUser_id] = useState();

  const validate = () => {
    const errors = {};
    if (!title.trim()) {
      errors.title = "Title is required";
    }
    if (title.length > 50) {
      errors.title = "Title must be less than 50 characters";
    }
    if (description.length > 100) {
      errors.description = "Description must be less than 100 characters";
    }
    if (title.length < 5) {
      errors.title = "Title must be at least 5 characters";
    }
    if (!description.trim()) {
      errors.description = "Description is required";
    }
    if (!imageUrl.trim()) {
      errors.imageUrl = "Image URL is required";
    }
    if (steps.length === 0) {
      errors.steps = "At least one step is required";
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    console.log(title, description, imageUrl, steps);
    try {
      const res = await fetch("/api/addrecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          steps,
        }),
      });

      if (!res.ok) {
        alert("Failed to add recipe");
        throw new Error("Failed to add recipe");
      }

      alert("Recipe added successfully");
      setTitle("");
      setDescription("");
      setImageUrl("");
      setSteps([]);
      setCurrentStep("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleStepChange = (event) => {
    setCurrentStep(event.target.value);
  };

  const handleAddStep = () => {
    if (currentStep !== "") {
      setSteps([...steps, currentStep]);
      setCurrentStep("");
    }
  };

  const handleRemoveStep = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  return (
    <>
      <Nav />

      <div className="max-w-screen-md mx-auto px-4">
        <Head>
          <title>Add Recipe</title>
        </Head>

        <h1 className="text-2xl font-bold mb-4">Add Recipe</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className={
                "border border-gray-400 rounded p-2 w-full " +
                (errors.title ? "border-red-500" : "")
              }
            />
            {errors.title && (
              <span className="text-red-500">{errors.title}</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor=" description"
              className="block text-gray-700 font-bold"
            >
              Description :
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className={
                "border border-gray-400 rounded p-2 w-full " +
                (errors.description ? "border-red-500" : "")
              }
            />
            {errors.description && (
              <span className="text-red-500">{errors.description}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700 font-bold">
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              className={
                "border border-gray-400 rounded p-2 w-full " +
                (errors.imageUrl ? "border-red-500" : "")
              }
            />
            {errors.imageUrl && (
              <span className="text-red-500">{errors.imageUrl}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="steps" className="block text-gray-700 font-bold">
              Steps
            </label>
            <div className="flex">
              <input
                type="text"
                id="steps"
                value={currentStep}
                onChange={handleStepChange}
                className={
                  "border border-gray-400 rounded p-2 w-full " +
                  (errors.steps ? "border-red-500" : "")
                }
              />
              <button
                type="button"
                onClick={handleAddStep}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Add
              </button>
            </div>
            {errors.steps && (
              <span className="text-red-500">{errors.steps}</span>
            )}
            <ul className="mt-2">
              {steps.map((step, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">{index + 1}.</span>
                  <span>{step}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Recipe
          </button>
        </form>
      </div>
    </>
  );
}

export default AddRecipe;
