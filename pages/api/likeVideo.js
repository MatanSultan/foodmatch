import { con } from "../../lib/db";
import { isLoggedInFunc } from "../../lib/authHelpers";

export default async function likeVideo(req, res) {
  const { videoId } = req.body;
  const userId = isLoggedInFunc(req);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Check if the user already liked the video
    const [rows] = await con
      .promise()
      .query("SELECT * FROM video_likes WHERE user_id = ? AND video_id = ?", [
        userId,
        videoId,
      ]);

    if (rows.length > 0) {
      // User already liked the video, remove like
      await con
        .promise()
        .query("DELETE FROM video_likes WHERE user_id = ? AND video_id = ?", [
          userId,
          videoId,
        ]);

      // Decrement video's like count in the database
      await con
        .promise()
        .query("UPDATE videos SET likes = likes - 1 WHERE id = ?", [videoId]);

      // Get updated like count from the database
      const [updatedRows] = await con
        .promise()
        .query("SELECT likes FROM videos WHERE id = ?", [videoId]);

      // Return updated like count to the client
      return res
        .status(200)
        .json({ message: "Like removed", likes: updatedRows[0].likes });
    } else {
      // User hasn't liked the video yet, add like
      await con
        .promise()
        .query("INSERT INTO video_likes (user_id, video_id) VALUES (?, ?)", [
          userId,
          videoId,
        ]);

      // Increment video's like count in the database
      await con
        .promise()
        .query("UPDATE videos SET likes = likes + 1 WHERE id = ?", [videoId]);

      // Get updated like count from the database
      const [updatedRows] = await con
        .promise()
        .query("SELECT likes FROM videos WHERE id = ?", [videoId]);

      // Return updated like count to the client
      return res
        .status(200)
        .json({ message: "Video liked", likes: updatedRows[0].likes });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
