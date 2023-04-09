// server.js

const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();

app.use(express.json());

const url = "mongodb://localhost:3000";
const dbName = "foodmatch";

app.post("/api/users", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error connecting to database");
      return;
    }

    const db = client.db(dbName);
    const collection = db.collection("users");

    collection.insertOne(req.body, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error inserting user into database");
        return;
      }

      res.status(201).send("User created");
    });
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
