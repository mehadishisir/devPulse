# 🚀 DevPulse – Issue Tracker API

DevPulse is a backend REST API for an internal tech issue & feature tracking system.  
It allows teams to report bugs, suggest features, and manage issue workflows efficiently.

---

## 🌐 Live Links

- 🔗 Production API: https://dev-pulse-gamma-livid.vercel.app
- 🔗 GitHub Repo: https://github.com/mehadishisir/devPulse

---

## 🛠️ Tech Stack

- Node.js (LTS)
- Express.js
- TypeScript
- PostgreSQL (NeonDB)
- Raw SQL (pg module)
- JWT Authentication
- bcrypt password hashing
- dotenv

---

## 👥 User Roles

### 🧑 Contributor
- Register & login
- Create issues
- View all issues
- Update own open issues only

### 🧑‍💼 Maintainer
- All contributor permissions
- Update any issue
- Delete any issue
- Manage issue workflow

---

## 🔐 Authentication Flow

1. User registers / logs in
2. Server validates credentials
3. Password is hashed using bcrypt
4. JWT token is generated
5. Client sends token in headers:

Authorization: Bearer <token>

6. Middleware verifies token before protected routes

---

## 🗄️ Database Schema

### Users Table
- id (SERIAL PRIMARY KEY)
- name (VARCHAR)
- email (UNIQUE)
- password (TEXT)
- role (contributor | maintainer)
- created_at
- updated_at

### Issues Table
- id (SERIAL PRIMARY KEY)
- title (VARCHAR 150)
- description (TEXT)
- type (bug | feature_request)
- status (open | in_progress | resolved)
- reporter_id (INTEGER)
- created_at
- updated_at

---

## 📡 API Endpoints

### 🔐 Auth Routes

POST /api/auth/signup  
POST /api/auth/login  

---

### 🐞 Issue Routes

POST /api/issues  
GET /api/issues?sort=newest&type=bug&status=open  
GET /api/issues/:id  
PATCH /api/issues/:id  
DELETE /api/issues/:id  

---

## 🚀 Deployment

- Deployed on Vercel  
- PostgreSQL hosted on NeonDB  
- Environment variables configured in Vercel dashboard  

---

## 📌 Features

- JWT Authentication  
- Role-based authorization  
- Issue tracking system  
- Filtering & sorting issues  
- Secure password hashing  
- Modular architecture  
- Global error handling  

---

## ⚠️ Notes

- Never expose `.env` file to GitHub  
- All protected routes require JWT token  
- Only maintainers can delete issues  
- Contributors can only modify their own open issues  

---

## 👨‍💻 Author

Mehadi Shisir
