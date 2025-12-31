const nodemailer = require('nodemailer');
const { createTransporter } = require('../config/email');
const { validateContactForm } = require('../utils/validators');

async function sendContact(req, res) {
  const { name, email, message, subject } = req.body;

  // Validate required fields
  const validation = validateContactForm({ name, email, message });
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: process.env.FROM_EMAIL || email,
      to: process.env.TO_EMAIL || process.env.FROM_EMAIL,
      subject: subject || `Website contact from ${name}`,
      text: `Message from ${name} <${email}>:\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent:', info.messageId);
    
    // If using Ethereal (test) account, include preview URL for developer
    const previewUrl = nodemailer.getTestMessageUrl(info) || null;
    return res.json({ ok: true, messageId: info.messageId, previewUrl });
  } catch (err) {
    console.error('Error sending email', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}

module.exports = { sendContact };
