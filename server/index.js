// server/index.js (replace your current file with this)
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// root route
app.get('/', (req, res) => {
  res.send("Nexep backend is running!");
});

// quick check: are required SMTP env vars present?
const SMTP_CONFIGURED = !!(process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.TO_EMAIL);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  // important timeouts so sendMail doesn't hang forever
  connectionTimeout: 10_000, // 10s
  greetingTimeout: 10_000,
  socketTimeout: 10_000,
  tls: {
    // keep this false in prod unless you need otherwise
    rejectUnauthorized: false
  }
});

// verify transporter but don't crash server; just log
if (SMTP_CONFIGURED) {
  transporter.verify()
    .then(() => console.log('SMTP transporter ready'))
    .catch(err => console.error('SMTP transporter error (verify):', err && err.message ? err.message : err));
} else {
  console.warn('SMTP not configured. Set SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS/TO_EMAIL in environment.');
}

// helper: sendMail with a timeout wrapper (safety)
function sendMailWithTimeout(mailOptions, ms = 12_000) {
  return Promise.race([
    transporter.sendMail(mailOptions),
    new Promise((_, reject) => setTimeout(() => reject(new Error('sendMail timeout')), ms))
  ]);
}

app.post('/send-email', async (req, res) => {
  console.log('POST /send-email received'); // minimal request log
  // quick fail if SMTP not configured
  if (!SMTP_CONFIGURED) {
    console.error('SMTP not configured; cannot send email.');
    return res.status(500).json({ success: false, error: 'SMTP not configured on server' });
  }

  try {
    const { name, email, phone, company, message } = req.body || {};
    console.log('Payload:', { name, email, phone, company, message: !!message });

    const html = `
      <h3>New contact form submission</h3>
      <p><strong>Name:</strong> ${name || '—'}</p>
      <p><strong>Email:</strong> ${email || '—'}</p>
      <p><strong>Phone:</strong> ${phone || '—'}</p>
      <p><strong>Company:</strong> ${company || '—'}</p>
      <p><strong>Message:</strong><br/>${(message || '—').replace(/\n/g, '<br/>')}</p>
    `;

    const mailOptions = {
      from: `${name || 'Website Contact'} <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject: `Contact form — ${name || 'No name'}`,
      html
    };

    // attempt send with explicit timeout (rejects if takes too long)
    await sendMailWithTimeout(mailOptions, 12_000);

    return res.json({ success: true });
  } catch (err) {
    console.error('Error sending email:', err && err.message ? err.message : err);
    // return error detail limited for security
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Contact server running on port ${PORT}`);
});
