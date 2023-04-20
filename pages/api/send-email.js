// import nodemailer from "nodemailer";

// export default async (req, res) => {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   const { eventData } = req.body;

//   if (!eventData) {
//     return res.status(400).json({ message: "Missing event data" });
//   }

//   try {
//     // Create a SMTP transporter
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSWORD,
//       },
//     });

//     // Send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: process.env.FROM_EMAIL,
//       to: process.env.TO_EMAIL,
//       subject: "New Event Submission",
//       html: `
//         <p><strong>Event Title:</strong> ${eventData.title}</p>
//         <p><strong>Date:</strong> ${eventData.date}</p>
//         <p><strong>Time:</strong> ${eventData.time}</p>
//         <p><strong>Location:</strong> ${eventData.location}</p>
//         <p><strong>Description:</strong> ${eventData.description}</p>
//       `,
//     });

//     console.log("Message sent: %s", info.messageId);

//     res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to send email" });
//   }
// };
