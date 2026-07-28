# JobHunt
> Simple Job Search & Hiring Platform

**JobHunt** is a modern web app that connects job seekers with employers. Job seekers can search and apply for open jobs, while employers can post job openings and manage listings.

---

## Key Features
- **Job Seekers**: Browse jobs by category or location, read details, and apply easily.
- **Employers**: Post new jobs, edit listings, and manage homepage banner sliders.
- **Secure Accounts**: Separate roles for Job Seekers and Employers using JWT login.
- **Media Uploads**: Fast image and video uploads powered by Cloudinary.

---

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Media Storage**: Cloudinary
- **Auth**: JWT & Bcrypt

---

## User Flow
1. **Sign Up / Login** ➔ Choose role (Job Seeker or Employer).
2. **Job Seeker** ➔ Browse Jobs ➔ View Job Requirements ➔ Apply.
3. **Employer** ➔ Open Dashboard ➔ Post New Job ➔ Manage Listings & Banners.

---

## Quick Setup Guide

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Database
- Cloudinary Account

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```

Set these in your `backend/.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start backend:
```bash
npm run dev
```
*(Runs at http://localhost:5000)*

### 3. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env
```

Set this in your `frontend/.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```
*(Runs at http://localhost:5173)*

---

## Future Roadmap
- Resume PDF uploader for job applications.
- Real-time application status tracking (Pending, Accepted, Rejected).
- Email alerts for new job postings.
- Analytics dashboard for employers.

---

**Built by Subhradeep Sikder**
