import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const handleContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.EMAIL_USER, // your email
      subject: `New Portfolio Message from ${name}`,
      html: `
  <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:30px;">
    <div style="max-width:600px; margin:auto; background:white; border-radius:8px; overflow:hidden;">
      
      <div style="background:#6c63ff; padding:20px; color:white;">
        <h2 style="margin:0;">New Portfolio Message</h2>
      </div>

      <div style="padding:20px; color:#333;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="background:#f9f9f9; padding:15px; border-radius:6px;">
          ${message}
        </p>
      </div>

      <div style="background:#f4f4f4; padding:15px; text-align:center; font-size:12px; color:#888;">
        Sent from your portfolio website
      </div>

    </div>
  </div>
`,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("RESEND ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
