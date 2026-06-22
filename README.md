# QRooms 🏠

> A platform for students at Quantum University to find and share verified PG accommodations near campus — without relying on scattered WhatsApp groups or unverified broker listings.

**Live demo:** https://qrooms.onrender.com/listings

---

## The Problem

Finding a paying guest (PG) accommodation near Quantum University, Roorkee is a painful experience for new students. Information is spread across WhatsApp groups, word-of-mouth, and broker calls — with no way to read reviews, verify photos, or compare options in one place.

QRooms solves this by letting students post, browse, and review PG listings themselves.

---

## Features

- **Browse listings** — filter and explore PG rooms near campus
- **Post your own listing** — upload photos, set price, add description
- **Leave reviews** — rate and review places you've actually stayed
- **User accounts** — sign up, log in, manage your own posts
- **Image uploads** — via Cloudinary (supports real photos, not placeholders)
- **Flash messages** — instant feedback on all actions

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Templating | EJS + ejs-mate |
| Auth | Passport.js + passport-local-mongoose |
| Media | Cloudinary + multer |
| Sessions | express-session + connect-mongo |

---

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd MAJORPROJECT
npm install
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```env
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret

# Only needed if you want image uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

### 3. Run in development

```bash
npm run dev
```

App runs at **http://localhost:8080**

---

## Project Structure
```
MAJORPROJECT/
├── app.js                  # Express app entry point
├── controllers/
│   ├── listings.js         # CRUD for room listings
│   ├── reviews.js          # Review logic
│   └── users.js            # Auth: signup/login/logout
├── models/
│   ├── listing.js          # Listing schema (title, price, location, images...)
│   ├── review.js           # Review schema (rating, comment, author)
│   └── user.js             # User schema (passport-local-mongoose)
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/                  # EJS templates
└── public/                 # Static assets (CSS, JS, images)
```

---

## Deployment

The app is deployed on **Render**. To deploy your own instance:

1. Set all environment variables in the platform dashboard
2. Ensure your MongoDB Atlas cluster allows connections from the deployment host (or use `0.0.0.0/0` for Render's dynamic IPs)
3. Set `NODE_ENV=production` for secure session handling

> The app reads `process.env.PORT` for the port — no changes needed on Render or Heroku.

---

## What I Learned

Building QRooms was my first end-to-end full-stack project with real auth, file uploads, and cloud deployment. Key things I implemented from scratch:

- Secure session-based authentication with Passport.js
- Cloud image storage with Cloudinary and multer middleware
- MVC architecture with Express route controllers
- MongoDB Atlas for production data persistence
- Deploying a Node.js app with environment-based config

---

## Roadmap

- [ ] Location filter (distance from Quantum University gate)
- [ ] Price range filter
- [ ] Verified listing badge (owner contact confirmed)
- [ ] Map view of listings
- [ ] Mobile-responsive UI improvements