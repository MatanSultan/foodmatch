import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../components/Nav";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/profile")
      .then((result) => {
        setUser(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-blue-500 rounded-lg h-96">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="text-2xl font-semibold text-gray-500">
                    Loading...
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <div className="text-2xl font-semibold text-gray-500">
                    Welcome {user.id}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
