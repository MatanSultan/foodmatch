Description: FoodMatch is a social networking platform for food lovers around the world. Users can create profiles, share recipes, review restaurants, and connect with other foodies in their area. The platform features a recommendation engine that suggests dishes and restaurants based on users' preferences and previous activity. FoodMatch also hosts virtual cooking classes and food-related events, allowing users to learn new skills and connect with like-minded individuals. Whether you're a seasoned chef or a beginner cook, FoodMatch is the perfect platform for discovering new flavors and building a community around your love of food.

I built a recipe site using NEXTJS & planetscale, the user is registered, he is logged in automatically, a TOKEN and a cookie are saved, currently the passwords in the database are not encrypted
The user table looks like this:

TABLE `users` (
`id` int NOT NULL AUTO_INCREMENT,
`name` varchar(255),
`email` varchar(255),
`password` varchar(255),
PRIMARY KEY (`id`)
) ENGINE InnoDB,
CHARSET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

In addition, I have more tables, events, likes, recipes, tokens,
tABLE `likes` (
`id` int NOT NULL AUTO_INCREMENT,
`recipeID` int NOT NULL,
`userID` int NOT NULL,
`createdAt` datetime NOT NULL DEFAULT current_timestamp(),
PRIMARY KEY (`id`)
) ENGINE InnoDB,
CHARSET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `recipes` (
	`id` int NOT NULL AUTO_INCREMENT,
	`title` varchar(255),
	`description` text,
	`image_url` varchar(255),
	`user_id` int,
	`likes` int NOT NULL DEFAULT '0',
	`steps` json,
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

  

my api/events route looks like this:
iimport { con } from "../../lib/db";

export default function handler(req, res) {
return new Promise((resolve, reject) => {
con.query("SELECT \* FROM events", function (err, result, fields) {
if (err) {
reject(err);
} else {
resolve(result);
}
});
})
.then((result) => {
if (result.length === 0) {
res.status(200).json({ message: "No events found" });
} else {
res.status(200).json(result);
}
})
.catch((error) => {
console.error(error);
res.status(500).json({ error: "Internal Server Error" });
});
}

i have in lib the db.js file that looks like this:
import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();
const connection = mysql.createConnection(process.env.DATABASE_URL);

console.log("Connected to the database!");

connection.connect((err) => {
if (err) throw err;
console.log("Connected to MySQL server!");
});
export const con = connection;

my page/events.js looks like this:
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";

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
<button className="mt-10  bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
wont to add event ?
</button>
{/_ space _/}
<div className="h-10"></div>
{events.length === 0 && (
<p className="text-gray-500 text-lg">
<Spinner />
</p>
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

in <button className="mt-10  bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
wont to add event ?
</button>

        i wont to build a form to add a new event but the form sent to mail and after admin check the event
        he add  a manualy to the database

        can you help me to build this from scratch ?
