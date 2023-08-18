// pages/api/send-email.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { eventData } = req.body;

    // Configure transporter (Replace with your email configuration)
    let transporter = nodemailer.createTransport({
      service: "Outlook365", // if using outlook
      auth: {
        user: "traibo-dev@outlook.com",
        pass: "ntWP2C1waCeENsoDBkRX",
      },
    });

    // Set email data
    let mailOptions = {
      from: "traibo-dev@outlook.com",
      to: "matansultan1@gmail.com", // where you want to send the email for approval
      subject: "New Event Submission..",
      text: `
        Event Title: ${eventData.title}
        Date: ${eventData.date}
        Time: ${eventData.time}
        Location: ${eventData.location}
        Description: ${eventData.description}
      `,
    };

    // Send email
    try {
      let info = await transporter.sendMail(mailOptions);
      return res
        .status(200)
        .json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res
        .status(500)
        .json({ success: false, message: "Error sending email." });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
