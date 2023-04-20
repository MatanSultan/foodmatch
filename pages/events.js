import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";
import Link from "next/link";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/events").then((res) => {
      setEvents(res.data);
      setIsLoading(false);
    });
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Nav />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
        <Link href="/add-event">
          <button className="mt-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Add Event
          </button>
        </Link>
        <div className="mt-8">
          <input
            className="border rounded-md p-2 w-full"
            type="text"
            placeholder="Search for an event"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <div className="h-10"></div>
        {isLoading ? (
          <Spinner />
        ) : filteredEvents.length === 0 ? (
          <p className="text-gray-500 text-lg">
            No events found matching your search criteria.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md p-4">
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
        )}
      </div>
    </div>
  );
}

export default EventsPage;
