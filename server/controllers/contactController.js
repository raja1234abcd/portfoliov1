export const handleContact = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Simulate saving message (DB / email can be added later)
  console.log("📩 New Contact Message:");
  console.log({ name, email, message });

  return res.status(200).json({
    success: true,
    message: "Message received successfully",
  });
};
