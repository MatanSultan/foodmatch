import React, { useState, useEffect } from "react";
import { storage } from "../lib/firebase";
import Alert from "./Alert";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import crypto from "crypto";
import Nav from "../components/Nav";
export default function AddVideos() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleVideoFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };
  // fuction to validate the form
  const validateForm = () => {
    if (!title || !description || !videoFile) {
      setError("Please fill all the fields");
      return false;
    }
    return true;
  };

  const handleVideoSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", videoFile);
    const url = crypto.randomBytes(32).toString("hex") + videoFile.name;
    const storageRef = ref(storage, "videos/" + url);
    if (!validateForm()) {
      return;
    }

    try {
      await uploadBytes(storageRef, videoFile);
      console.log("Uploaded a blob or file!");
      setSuccess("Video uploaded successfully");
    } catch (error) {
      console.log(error);
      return;
    }
    const urlDownloadURL = await getDownloadURL(storageRef);

    try {
      const response = await fetch("/api/video", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          videoUrl: urlDownloadURL,
        }),
      });

      // const data = await response.json();
      // setVideos([...videos, { id: data.id, title, description }]);
      // setTitle("");
      // setDescription("");
      // setVideoFile(null);
    } catch (error) {
      alert("An error occurred, try again.");
      console.log(error);
    }

    //   fetch("/api/video", {
    //     method: "POST",
    //     body: formData,
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setVideos([...videos, { id: data.id, title, description }]);

    //       setTitle("");
    //       setDescription("");
    //       setVideoFile(null);
    //     })
    //     .catch((error) => console.error(error));
  };

  return (
    <div>
      <Nav />
      <div className="max-w-md mx-auto">
        {success && (
          <div>
            {" "}
            <Alert message={success} type="success" />
          </div>
        )}
        {error && (
          <div>
            {" "}
            <Alert message={error} type="error" />
          </div>
        )}

        <h1 className="text-3xl font-bold text-gray-900">Videos</h1>
        <div className="mt-8 space-y-6">
          <form onSubmit={handleVideoSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleTitleChange}
                required
                className="block w-full border-2 border-gray-300 rounded-md py-2 px-4 leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                required
                className="block w-full border-2 border-gray-300 rounded-md py-2 px-4 leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="video"
                className="block text-gray-700 font-bold mb-2"
              >
                Video
              </label>
              <input
                type="file"
                id="video"
                name="video"
                onChange={handleVideoFileChange}
                required
                className="block w-full border-2 border-gray-300 rounded-md py-2 px-4 leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
