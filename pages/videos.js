import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { HeartIcon, ChatIcon, SearchIcon } from "@heroicons/react/solid";
// import AddVideo from "../components/AddVideos";
import Link from "next/link";
const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch("/api/video", { signal })
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error(error));

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Nav />

      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            {/* // add video form  component */}
            {/* <AddVideo /> */}

            <div className="flex justify-center">
              <Link href="/add-video">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Video
                </button>
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <SearchIcon className="h-5 w-5 text-gray-500" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by title"
                className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-6">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="rounded-lg shadow-lg overflow-hidden"
                >
                  <video
                    className="w-full h-48 object-cover"
                    src={video.video_url}
                    controls
                  ></video>
                  <div className="p-4">
                    <h2 className="text-lg font-bold">{video.title}</h2>
                    <p className="text-sm text-gray-700">{video.description}</p>
                    <div className="mt-2 flex items-center">
                      <HeartIcon className="h-5 w-5 text-red-500" />
                      <p className="ml-2 text-sm text-gray-500">
                        {video.likes} likes
                      </p>
                    </div>
                    <div className="mt-2 flex items-center">
                      <ChatIcon className="h-5 w-5 text-gray-500" />
                      <p className="ml-2 text-sm text-gray-500">
                        {video.comments} comments
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
