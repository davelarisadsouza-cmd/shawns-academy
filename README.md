# Shawn's Academy of Music

A modern MERN stack website for Shawn's Academy of Music featuring music education, session booking, digital products, blog, and music production inquiries.

## Features

- **Hero Section** with animated particles and gradient effects
- **About Section** - Shawn's story as a worship leader under Ps. Sijo Mathew and Ps. Ashwini Sijo Mathew
- **Services** - Music lessons, productions, studio sessions, worship training
- **Digital Products** - Courses, audio packs, backing tracks, e-books (QR payment setup)
- **Booking System** - Calendar-based scheduling with email notifications
- **Music Production** - Custom production inquiry form
- **Blog** - Articles from Shawn
- **QR Payment** - UPI payment via `shawnsaldana75@okaxis`
- **Contact** - Reach out form
- **Social Media** - Instagram @shawn_mp.4

## Tech Stack

- **MongoDB** - Database
- **Express** - Backend API
- **React** (with Router, Hooks) - Frontend
- **Node.js** - Backend runtime
- **nodemailer** - Email notifications for bookings/inquiries (sends to abhi.dsouza430@gmail.com)

## Setup

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Configure `.env`:
- `MONGODB_URI` - MongoDB connection string
- `EMAIL_USER` - Gmail address (for nodemailer)
- `EMAIL_PASS` - Gmail app password

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

### 3. Add initial data (Blog posts, Products)

Use the API endpoints:
- `POST /api/blogs` - Create blog post
- `GET /api/blogs` - Fetch blog posts
- `POST /api/products` - Create product
- `GET /api/products` - Fetch products

### 4. Replace images

The Shawn image placeholder in the hero/about sections can be replaced by adding the file at `frontend/public/shawn.jpg`.

## Booking Flow

1. User selects a date on the calendar
2. Picks an available time slot
3. Fills in details and submits
4. Booking is saved to MongoDB and an email notification is sent to `abhi.dsouza430@gmail.com`

## Payment

QR payment accepts payments via any UPI app. UPI ID: `shawnsaldana75@okaxis`. Users scan the QR, pay, and send a screenshot to `abhi.dsouza430@gmail.com`.

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - List bookings
- `POST /api/inquiries` - Submit inquiry
- `POST /api/contact` - Submit contact form
- `GET /api/available-slots?date=YYYY-MM-DD` - Check available time slots
- `GET /api/blogs` - List blogs
- `GET /api/products` - List products
- `POST /api/blogs` - Create blog
- `POST /api/products` - Create product