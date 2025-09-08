# 📦 Parcel Management Frontend System

This is the frontend application for the Parcel Management System. It provides a user-friendly interface for Admins, Senders, and Receivers to register, login, create parcels, track deliveries, and manage user and parcel information with role-based access control.

---

## 🚀 Project Overview

The frontend is built to interact seamlessly with the Parcel Management Backend, providing real-time data handling, secure authentication, and responsive UI components. Users can manage parcels, view status logs, approve or cancel deliveries, and update information through an intuitive interface designed for each user role.

---

## 🔍 Features Overview

* **User Authentication:** Register, login, logout, and token refresh with JWT.
* **Role-Based Access:** Dynamic UI and route protection for Admin, Sender, and Receiver roles.
* **Parcel Management:** Create, update, approve, cancel parcels; track status logs.
* **Responsive Design:** Fully responsive and accessible UI for desktop and mobile.
* **Real-Time API Interaction:** Efficient state and API data synchronization using RTK Query.

---

## 🧰 Technology Stack

* **React** – Frontend UI library for building interactive user interfaces
* **TypeScript** – Typed superset of JavaScript for better code quality and maintainability
* **React Router** – Client-side routing for SPA navigation
* **Redux Toolkit (RTK Query)** – State management and powerful data fetching with caching using Axios
* **Axios** – HTTP client for API requests
* **Tailwind CSS** – Utility-first CSS framework for styling and responsiveness
* **ShadCN UI** – Component library built on top of Tailwind CSS for polished, accessible UI components

---

## 🛠️ Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <frontend-repo-url>
   cd <frontend-folder>
   ```

2. **Install dependencies:**

   ```bash
   bun add
   ```

3. **Environment Variables:**

   Create a `.env` file in the root directory with the following variables:

   ```env
   VITE_BACKEND_URL=backend_url
   ```

   (Adjust the API URL according to your backend setup)

4. **Start the development server:**

   ```bash
   bun dev
   ```

5. **Build for production:**

   ```bash
   bun run build
   ```

---

## 📌 Additional Notes

* **Environment config:** Make sure your backend API is running and accessible via the URL specified in `.env`.
* **Security:** JWT tokens are stored securely and used to authorize API requests.
* **Role-aware UI:** Components render or hide features based on user roles fetched after login.
* **Error handling:** Global and local error states are handled gracefully with user feedback.
* **Testing:** Consider adding unit and integration tests for critical flows to ensure reliability.

---

Thanks
