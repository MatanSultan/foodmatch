import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";

function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("/api/events").then((res) => setEvents(res.data));
  }, []);

  if (!Array.isArray(events)) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Nav />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
        {events.length === 0 && (
          <p className="text-gray-500 text-lg">No upcoming events</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-red-500 rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-2 text-gray-900">
                {event.title}
              </h2>
              <p className="text-gray-900 mb-4 ">
                {`${event.date} at ${event.time}`}
              </p>
              <p className="mb-4">{event.description}</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                {event.location}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
