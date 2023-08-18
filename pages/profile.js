import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import { CgProfile } from "react-icons/cg";
import Spinner from "../components/Spinner";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/profile");
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error(error);
        setError("Error fetching user profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const validateInputs = () => {
    let isValid = true;
    if (name.length < 3) {
      setNameError("Name must be at least 3 characters long.");
      isValid = false;
    } else {
      setNameError("");
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setEmailError("Email must be valid.");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) {
      return;
    }

    try {
      const response = await axios.put("/api/profile", { name, email });
      setUser(response.data);
      alert("User details updated successfully.");
      setError("");
    } catch (error) {
      console.error(error);
      setError("Error updating user details.");
    }
  };

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
                    <Spinner />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center h-full">
                  {user ? (
                    <div className="text-2xl font-semibold text-blue-900">
                      <span className="flex justify-center items-center h-full">
                        <CgProfile />
                      </span>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="name"
                          >
                            Name
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Name"
                            value={name || user.name}
                            onChange={handleNameChange}
                          />
                        </div>
                        <p className="text-sm">{nameError}</p>

                        <div className="mb-4">
                          <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            placeholder="Email"
                            value={email || user.email}
                            onChange={handleEmailChange}
                          />
                        </div>
                        <p className="text-sm">{emailError}</p>

                        <div className="flex items-center justify-between">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="text-2xl font-semibold text-gray-500">
                      {error ? error : "No user found."}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
