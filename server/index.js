const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: "https://nexepwebsite.onrender.com",
  methods: ["GET","POST","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// optional: quick verify
transporter.verify().then(() => {
  console.log('SMTP transporter ready');
}).catch(err => {
  console.error('SMTP transporter error', err);
});

app.post('/send-email', async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;

    const html = `
      <h3>New contact form submission</h3>
      <p><strong>Name:</strong> ${name || '—'}</p>
      <p><strong>Email:</strong> ${email || '—'}</p>
      <p><strong>Phone:</strong> ${phone || '—'}</p>
      <p><strong>Company:</strong> ${company || '—'}</p>
      <p><strong>Message:</strong><br/>${(message || '—').replace(/\n/g, '<br/>')}</p>
    `;

    await transporter.sendMail({
      from: `${name || 'Website Contact'} <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject: `Contact form — ${name || 'No name'}`,
      html
    });

    return res.json({ success: true });
  } catch (err) {
    console.error('Error sending email:', err);
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Contact server running on port ${PORT}`);
});
