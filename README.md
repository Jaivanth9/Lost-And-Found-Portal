# 🔎 Lost & Found Portal

A full-stack **Lost & Found Management System** that enables users to **report lost items, list found items, and claim ownership** securely.  
Built with **Node.js, Express, MongoDB, React.js**, and a modular backend and frontend architecture.

---

## 🚀 Features

- 👤 **User Authentication** (Sign up / Login / JWT-based sessions)  
- 🧾 **Report Lost Items** with title, description, location, and date  
- 📦 **List Found Items** and mark them as available  
- 🔗 **Claim Process** for users to request item ownership  
- 🔒 **Role-based Access Control** (User / Moderator)  
- ⚡ **Optimized Search** (by name, category, location, date)  
- 🛡️ **Data Security** with password hashing and input validation  

---

⚙️ Installation & Setup

1️⃣ Clone the repo
git clone https://github.com/Jaivanth9/lost-found-portal.git

cd lost-found-portal/backend

cd lost-found-portal/frontend

2️⃣ Install dependencies
npm install

3️⃣ Environment Variables

Create a .env file in /backend:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/lostfound
JWT_SECRET=yourSecretKey
PORT=3000

4️⃣ Run the server
npm start

Server will run at:
👉 http://localhost:3000

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | `/api/user/signup` | Register new user       |
| POST   | `/api/user/login`  | Authenticate user       |
| POST   | `/api/items`       | Report lost/found item  |
| GET    | `/api/items`       | Get all items           |
| GET    | `/api/items/:id`   | Get item by ID          |
| PUT    | `/api/items/:id`   | Update item status      |
| DELETE | `/api/items/:id`   | Remove item (moderator) |


🧪 Testing

Run tests with:

npm test

---

📈 Future Enhancements

📸 Image upload for items

📍 Geolocation-based search

🔔 Email/SMS notifications when a match is found

📊 Analytics dashboard for moderators

---

🛡️ Security Highlights

Passwords stored using bcrypt hashing

JWT-based authentication for stateless sessions

Middleware for request validation & authorization

Protection against NoSQL injection & XSS

---

🤝 Contributing

Contributions are welcome!
Fork the repo and submit a PR 🚀