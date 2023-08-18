import { useState } from "react";
import Nav from "../components/Nav";

function AddEventPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const eventData = { title, date, time, location, description };
    fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventData }), // Wrap eventData in an object
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Event submitted for approval!");
          setTitle("");
          setDate("");
          setTime("");
          setLocation("");
          setDescription("");
        } else {
          alert("Error submitting event. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error submitting event:", error);
        alert("Error submitting event. Please try again later.");
      });
  };

  return (
    <div>
      <Nav />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Add New Event</h1>
        <p>
          {" "}
          Fill out the form below to add a new event. and we will send you an
          email if the event is approved. we need to approve the event to make
          sure it is not spam and there is no inappropriate content.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700 font-bold">Event Title:</span>
            <input
              className="form-input mt-1 block w-full"
              type="text"
              placeholder="Enter event title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700 font-bold">Date:</span>
            <input
              className="form-input mt-1 block w-full"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700 font-bold">Time:</span>
            <input
              className="form-input mt-1 block w-full"
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700 font-bold">Location:</span>
            <input
              className="form-input mt-1 block w-full"
              type="text"
              placeholder="Enter event location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700 font-bold">Description:</span>
            <textarea
              className="form-textarea mt-1 block w-full"
              placeholder="Enter event description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </label>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEventPage;
