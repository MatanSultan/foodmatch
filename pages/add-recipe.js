// pages/add-recipe.js

import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Nav from "../components/Nav";
export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { user } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if the user is not logged in, redirect to login page
    if (!user) {
      router.push("/");
    }
    // Upload image to server
    const formData = new FormData();
    formData.append("file", image);

    const {
      data: { imageUrl },
    } = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Create recipe in database
    const { data: recipeData } = await axios.post("/api/upload-recipe", {
      title,
      description,
      image_url: imageUrl,
      user_id: user.id,
    });

    console.log(recipeData);
  };

  return (
    <div>
      <Nav />

      <div className="max-w-md mx-auto mt-4">
        <h1 className="text-2xl font-bold mb-4">Add Recipe</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            />
          </div>
          <div>
            <label htmlFor="image" className="block font-medium text-gray-700">
              Image:
            </label>
            <input
              type="file"
              id="image"
              onChange={(event) => setImage(event.target.files[0])}
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
