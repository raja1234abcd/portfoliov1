// import nodemailer from "nodemailer";

// export const handleContact = async (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({
//       success: false,
//       message: "All fields are required",
//     });
//   }

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER,
//       subject: `New Portfolio Message from ${name}`,
//       html: `
//         <h3>New Contact Message</h3>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong> ${message}</p>
//       `,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Message sent successfully",
//     });
//   } catch (error) {
//     console.error("EMAIL ERROR:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send email",
//     });
//   }
// };

import nodemailer from "nodemailer";

export const handleContact = async (req, res) => {
  console.log("🔥 Contact endpoint hit");

  try {
    const { name, email, message } = req.body;
    console.log("Received data:", req.body);

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log("Creating transporter...");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // false for TLS (STARTTLS)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Verifying transporter...");
    await transporter.verify();
    console.log("Transporter verified ✅");

    console.log("Sending email...");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log("Email sent successfully 🎉");

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("❌ FULL EMAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
