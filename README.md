# 🏠 CollegeCrib

CollegeCrib is a full-stack web application that helps students find PGs (Paying Guests) and allows property owners to list, manage, and track their properties easily.

---

## 🚀 Live Demo

* 🌐 Frontend: https://college-crib.vercel.app/
* 🔗 Backend API: https://collegecrib-backend.onrender.com

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB (MongoDB Atlas)
* Mongoose

### Other Tools

* Cloudinary (Image Upload)
* JWT Authentication
* Multer

---

## ✨ Features

### 👨‍🎓 Student

* Browse available PGs
* Send booking requests
* Receive notifications

### 🏠 Owner

* Add new property
* Upload property images
* View personal property listings
* Delete properties
* Manage bookings

### 🔐 Authentication

* Secure JWT-based login/signup
* Protected routes for authorized users

---

## 📂 Project Structure

```
CollegeCrib/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── services/
│   └── main.jsx
```

---

## ⚙️ Environment Variables

### Backend (.env)

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

### Frontend (.env)

```
VITE_API_URL=https://collegecrib-backend.onrender.com/api
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/Codechefskj/CollegeCrib.git
cd CollegeCrib
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment

### Frontend

Deployed on Vercel

### Backend

Deployed on Render

### Database

Hosted on MongoDB Atlas

---

## 🔥 API Endpoints

### Auth

* POST /api/auth/register
* POST /api/auth/login

### Properties

* GET /api/property
* GET /api/property/my
* POST /api/property
* DELETE /api/property/:id

---

## ⚠️ Important Notes

* Do NOT use localhost in production
* Always use environment variables
* JWT token is required for protected routes

---

## 👨‍💻 Author

Sambhav Jha

---

## ⭐ Contribution

Feel free to fork this repository and contribute!

---

## 📜 License

This project is open-source and available under the MIT License.
