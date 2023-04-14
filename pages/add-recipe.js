// pages/add-recipe.js

import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Nav from "../components/Nav";

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [user_id, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const { user, setUser } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const results = await axios.post("/api/addrecipe", {
        title,
        description,
        image_url,
        user_id,
      });
      setUser(results.data);
      setMessage(results.data.message);
    } catch (e) {
      setMessage(e.response.data.message);
    }
  };
  return (
    <>
      <Nav />
      <div class="p-8">
        <h1 class="text-3xl font-bold mb-4">Add Recipe</h1>
        <form class="flex flex-col" onSubmit={handleSubmit}>
          <label class="mb-2 font-bold" for="title">
            Title
          </label>
          <input
            class="px-4 py-2 border rounded-lg mb-4"
            type="text"
            id="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label class="mb-2 font-bold" for="description">
            Description
          </label>
          <input
            class="px-4 py-2 border rounded-lg mb-4"
            type="text"
            id="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <label class="mb-2 font-bold" for="image-url">
            Image URL
          </label>
          <input
            class="px-4 py-2 border rounded-lg mb-4"
            type="text"
            id="image-url"
            placeholder="Image URL"
            onChange={(e) => setImageUrl(e.target.value)}
            value={image_url}
          />
          <label class="mb-2 font-bold" for="user-id">
            User ID
          </label>
          <input
            class="px-4 py-2 border rounded-lg mb-4"
            type="text"
            id="user-id"
            placeholder="User ID"
            onChange={(e) => setUserId(e.target.value)}
            value={user_id}
          />
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-700 transition duration-200"
            type="submit"
          >
            Add Recipe
          </button>
        </form>
        <p class="mt-4">{message}</p>
      </div>
    </>
  );
}
