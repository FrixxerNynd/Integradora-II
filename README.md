# Web Application Project with Integrated Backend

## Overview
This project is a **React** web application that connects to a **Node.js/NestJS** backend via a REST API.  
The app provides **secure authentication with JWT**, dynamic data display, and real-time communication with the server.  

Its goal is to deliver a simple monitoring application for the humidity, temperature values, and provide a simple movement detection sistem.

---

## Technologies Used

### **Frontend (Mobile)**
- [React](https://es.react.dev/) - Main framework for web development.
- [Axios](https://axios-http.com/) - HTTP client for API requests.

### **Backend**
- [NestJS](https://nestjs.com/) - Backend framework based on Node.js, used for the gateway service.
- [NodeJS](https://nodejs.org/es) - Main Backend framework, used in the different services projects.
- [JWT (JSON Web Tokens)](https://jwt.io/) - Authentication and authorization.
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Secure password hashing.
- [MongoDB](https://www.mongodb.com/) - Database used in the installation.
- [Railway](https://railway.app/) - Backend hosting.

---

## Installation & Setup

### **Clone the repository**
```
git clone https://github.com/user/project-name.git
cd project-name
```

### **Install backend dependencies (NestJS)**

```
cd gateway
npm install
```

### **Install backend dependencies (NodeJS)**

User service
```bash
cd backend/user
npm install
```

For the data service:
```
cd backend/data
npm install
```

Email service:
```bash
cd backend/email
npm install
```
### **Set up environment variables**

Create a `.env` file at the root of both the `gateway` and `backend`(each service aviable) projects:

Backend Projects
```
# Backend
PORT=3000
DATABASE_URL=mongodb://user:password@localhost:5432/db_name
JWT_SECRET=secret_key
JWT_EXPIRATION=40m

```
Gateway project
```
# gateway
PORT=3005
JWT_SECRET=secret_key

```

---

## Running the Project

### **Backend**

Gateway service
```
cd gateway
npm run start:dev
```

User service
```
cd backend/user
npm run dev
```

For the data service:
```
cd backend/data
npm run dev
```

Email service:
```
cd backend/email
npm run dev
```
---

## Main API Endpoints (Backend)

* `POST /users/login` → Logs in and returns `accessToken`.
* `GET /users/all` → Retrieves the list of users (requires authentication).
* `POST /user/createU` → Creates a new user.
* `GET /data/all` → Visualize all data information storaged (in the first 30 days).
* `POST /data/insert` → Insert data recived from the esp32 microcontroller.
---

## Authors

**\[NeoDev Software Development Team]**
📧 Email: \[[neodev.solutions.utd@gmail.com](mailto:neodev.solutions.utd@gmail.com)]
