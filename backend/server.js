const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shawns-academy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  date: { type: Date, required: true },
  time: { type: String, required: true },
  serviceType: { type: String, required: true },
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, default: 'general' },
  createdAt: { type: Date, default: Date.now }
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: String,
  author: { type: String, default: 'Shawn Saldana' },
  image: String,
  tags: [String],
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  category: String,
  downloadLink: String,
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);
const Inquiry = mongoose.model('Inquiry', inquirySchema);
const Blog = mongoose.model('Blog', blogSchema);
const Product = mongoose.model('Product', productSchema);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendBookingEmail = async (booking) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'abhi.dsouza430@gmail.com',
    subject: `New Booking Request - ${booking.serviceType}`,
    html: `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${booking.name}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Phone:</strong> ${booking.phone || 'Not provided'}</p>
      <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${booking.time}</p>
      <p><strong>Service Type:</strong> ${booking.serviceType}</p>
      <p><strong>Message:</strong> ${booking.message || 'No message'}</p>
    `
  };
  await transporter.sendMail(mailOptions);
};

const sendInquiryEmail = async (inquiry) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'abhi.dsouza430@gmail.com',
    subject: `New Inquiry - ${inquiry.subject}`,
    html: `
      <h2>New Inquiry</h2>
      <p><strong>Name:</strong> ${inquiry.name}</p>
      <p><strong>Email:</strong> ${inquiry.email}</p>
      <p><strong>Phone:</strong> ${inquiry.phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${inquiry.subject}</p>
      <p><strong>Type:</strong> ${inquiry.type}</p>
      <p><strong>Message:</strong> ${inquiry.message}</p>
    `
  };
  await transporter.sendMail(mailOptions);
};

app.post('/api/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    await sendBookingEmail(booking);
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    await sendInquiryEmail(inquiry);
    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({ available: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message, type } = req.body;
    const inquiry = new Inquiry({ name, email, phone, subject, message, type: type || 'contact' });
    await inquiry.save();
    await sendInquiryEmail(inquiry);
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/available-slots', async (req, res) => {
  try {
    const { date } = req.query;
    const bookings = await Booking.find({
      date: new Date(date),
      status: { $ne: 'cancelled' }
    });
    const allSlots = [
      '09:00', '10:00', '11:00', '12:00',
      '14:00', '15:00', '16:00', '17:00', '18:00'
    ];
    const bookedSlots = bookings.map(b => b.time);
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Shawn\'s Academy API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
