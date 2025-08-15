
# 🌐 Web Frontend for the Management System

## 📌 Overview
This project is a **React.js web application** designed to interact with a backend API to manage users, monitor data, and handle role-based functionalities.  
It implements a responsive interface for desktop and mobile, and a modular component architecture for scalability.

The application’s primary goal is to provide an intuitive and efficient platform for administrators and users to manage system operations from any device.

---

## 🛠 Technologies Used

### **Frontend**
- [React.js](https://es.react.dev/) – Main framework for building the web application.
- [React Router DOM](https://reactrouter.com/) – Client-side routing and navigation.
- [Axios](https://axios-http.com/) – HTTP client for communicating with the backend.
- [Context API](https://react.dev/reference/react/useContext) – Global state management for authentication and user data.
- [CSS / SCSS Modules] – Component-based styling.
- [Railway]() – Hosting service

---

## 📱 Features
- **Login & Logout** with JWT authentication.
- **Role-based access control** (admin, user, etc.).
- **Responsive UI** for desktop, tablet, and mobile devices.
- **Data fetching** from the backend API.
- **User management** (create, view, update, delete).

---

## ⚙️ Installation & Setup

### **1️⃣ Clone the repository**
```
git clone --branch frontend --single-branch https://github.com/FrixxerNynd/Integradora-II.git
cd frontend-web-system
````

### **2️⃣ Install dependencies**

```bash
npm install
```

### **3️⃣ Set up environment variables**

Create a `.env` file in the project root with the following configuration:

```
VITE_LOGIN_URL=https://your-api-url.com 
VITE_USER_URL=https://your-api-url.com
VITE_DATA_URL=https://your-api-url.com
VITE_DATA_FILTER_URL=https://your-api-url.com
VITE_USER_DELETE=https://your-api-url.com
VITE_USER_REGISTER=https://your-api-url.com
VITE_USER_CHANGE_PASSWORD=https://your-api-url.com
VITE_USER_CHANGE=https://your-api-ur.com
```

---

## ▶️ Running the Project

### **Development**

```bash
npm run dev
```

The app will be available at:
👉 **[http://localhost:5173](http://localhost:5173)** (or the port configured by Vite).

### **Production Build**
If you are using railway service, you have to ensure that in package.json file exist the comand 
```
"start": "serve dist -s -n -l -p $PORT"
```
then, upload the repository with the project on your railway service, it will automatically starts the build.

**If you are not using railway** then use these comands to build the project and upload in your server or domain following its recomendations.

```
npm run build
npm run preview
```

---

## 📡 API Communication

The frontend communicates with the backend using Axios. All requests are sent with an **Authorization** header containing the JWT access token.

Example:

```javascript
axios.get(`${import.meta.env.VITE_API_URL}/users`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

---

## 🖼 Project Structure

```
src/
├── components/      # Reusable UI components
  |─── Auth          # Carpet for auth components(login, context, etc)
  |─── Cards         # Card components
  |─── Charts        # Chart components
  |─── Dashboard     # Main components for application
  |─── Layout        # Auxiliar components for navigation(sidebar, tables)
├── services/        # API calls and data services
├── styles/          # Global and component styles
└── App.jsx          # Main app component
```

---

## 👨‍💻 Author

**\[NeoDev Software Development Team]**
📧 Email: \[[[neodev.solutions.utd@gmail.com](mailto:[neodev.solutions.utd@gmail.com)]

¿Quieres que lo prepare con esas mejoras?
```
