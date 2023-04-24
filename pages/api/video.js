import { con } from "../../lib/db";
import { app } from "../../lib/firebase";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      if (!req.files || !req.files.video) {
        return res.status(400).json({ error: "No video file provided" });
      }

      const file = req.files.video;
      const filename = file.name;

      // Upload the file to Firebase Storage
      const storageRef = app.ref();
      const fileRef = storageRef.child(filename);
      const snapshot = await fileRef.put(file.data);
      const videoUrl = await snapshot.ref.getDownloadURL();

      // Insert the video into the database
      const [result] = await con
        .promise()
        .query(
          "INSERT INTO videos (title, description, video_url) VALUES (?, ?, ?)",
          [req.body.title, req.body.description, videoUrl]
        );

      res.status(201).json({ id: result.insertId });
    } else {
      const [videosResult] = await con.promise().query("SELECT * FROM videos");
      const [likesResult] = await con
        .promise()
        .query(
          "SELECT video_id, COUNT(*) AS likes_count FROM video_likes GROUP BY video_id"
        );
      const [commentsResult] = await con
        .promise()
        .query(
          "SELECT video_id, COUNT(*) AS comments_count FROM video_comments GROUP BY video_id"
        );

      // Combine the video, likes, and comments data into a single array
      const videos = videosResult.map((video) => {
        const likes = likesResult.find((like) => like.video_id === video.id);
        const comments = commentsResult.find(
          (comment) => comment.video_id === video.id
        );
        return {
          ...video,
          likes_count: likes ? likes.likes_count : 0,
          comments_count: comments ? comments.comments_count : 0,
        };
      });

      res.status(200).json(videos);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
