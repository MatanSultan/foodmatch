import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { HeartIcon, ChatIcon, SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Spinner from "../components/Spinner";

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // set initial loading state to true

  useEffect(() => {
    // const abortController = new AbortController();
    // const signal = abortController.signal;

    fetch("/api/getvideo", {})
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);

        setLoading(false); // set loading to false after data is fetched
      })
      .catch((error) => console.error(error));

    // return function cleanup() {
    //   abortController.abort();
    // };
    return;
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLike = (id) => {
    const updatedVideos = videos.map((video) => {
      if (video.id === id) {
        if (!video.liked) {
          video.likes++;
        } else {
          video.likes--;
        }
        video.liked = !video.liked;
      }
      return video;
    });

    setVideos(updatedVideos);

    fetch(`/api/like?id=${id}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Nav />

      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="flex justify-center mb-8">
              <Link href="/add-video">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Video
                </button>
              </Link>
            </div>
            <div className="relative mb-8">
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

            {loading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    className="relative rounded-lg border border-gray-300 bg-white shadow-sm hover:shadow-md"
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <video
                        className="w-full h-full object-cover rounded-t-lg"
                        src={video.video_url}
                        controls
                      ></video>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <HeartIcon
                          className={`h-5 w-5 ${
                            video.liked ? "text-red-500" : "text-gray-400"
                          } cursor-pointer`}
                          onClick={() => handleLike(video.id)}
                        />
                        <span className="ml-1">{video.likes}</span>
                      </div>
                      <div className="flex items-center"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {video.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {video.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
