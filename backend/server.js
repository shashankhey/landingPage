import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors'; 
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', async (req, res) => {
  try {
    const { email } = req.body; 
    await sendEmail(email);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.use(express.static(path.join(__dirname, "/dist")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
  })
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

async function sendEmail(email) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shashankhey1710@gmail.com',
        pass: 'xxui eppc llbj ilzp'
      }
    });

    const mailOptions = {
      from: 'shashankhey1710@gmail.com',
      to: email,
      subject: 'Hello from Educity!',
      text: 'Thank you for contacting us we will get back to you soon.'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    throw error;
  }
}
