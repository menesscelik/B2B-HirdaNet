# Hırdanet B2B E-Commerce Platform

## 📌 About the Project

Hırdanet B2B is a modern **B2B e-commerce platform** that enables businesses to deliver their products to dealers.  
The project covers both the **customer side** (product browsing, cart, order creation) and the **admin side** (product, user, and order management), providing a full end-to-end system.

This project has been developed personally, using modern web technologies and up-to-date software architectures. The goal is to experience the **backend** and **frontend** integration of a professional B2B solution at a real product level.

---

## 🚀 Technologies Used

### Backend

- **ASP.NET Core 8.0 / .NET 9**
- **Entity Framework 6 (EF6)**
- **SQLite** database
- **JWT Authentication**
- **Authorization Policy** (role & permission-based access)
- **Global Exception Handling**
- **DTO Projection** & Layered Architecture
- **Unit of Work & Generic Repository**
- **MassTransit & RabbitMQ** for message queuing
- **Redis + FusionCache** for caching

### Frontend

- **React (TypeScript)**
- **Redux Toolkit** for state management
- **Material UI (MUI)** for modern UI design
- **Axios** for API integration
- **React Router** for multi-page routing
- **React-Toastify** for notifications

---

## 🛠️ Features

### Customer Side

- Browse and view product details
- Create and manage cart
- Place orders & checkout process
- View order history and details
- User registration & login
- Secure sessions with JWT

### Admin Panel

- Add, edit, and delete products
- Manage user accounts (activate/deactivate, delete, view orders)
- Update order statuses
- View customer messages
- Role-based access control with AdminGuard

### General Features

- Global error handling (ProblemDetails)
- Modern 404 page
- Multi-language welcome page
- JSONL-based contact message logging
- Responsive design (mobile-friendly)

---

## 📂 Project Structure (Overview)

```
Hirdanet-B2B/
│── Api/                # ASP.NET Core Web API
│   ├── Controllers/
│   ├── Entities/
│   ├── DTOs/
│   ├── Services/
│   ├── Data/
│── Client/             # React (TypeScript) frontend
│   ├── src/components/
│   ├── src/pages/
│   ├── src/store/
│   ├── src/api/
│── Infrastructure/     # Redis, MassTransit, Mail Service etc.
```

---

## 🔑 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/menesscelik/B2B-HirdaNet.git
cd B2B-HirdaNet
```

### Prerequisites

You need to have the following tools installed:

- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- [Node.js (>=18.x)](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [SQLite](https://www.sqlite.org/download.html) (optional, EF Core creates DB automatically)
- [Redis](https://redis.io/) (for caching)
- [RabbitMQ](https://www.rabbitmq.com/) (for messaging, optional)

### Backend

```bash
cd Api
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend

```bash
cd Client
npm install
npm run dev
```

API runs on **https://localhost:5105** by default.  
Frontend runs on **http://localhost:5173**.

---

## 📖 Conclusion

Through this project, the full development of a modern e-commerce infrastructure has been experienced.  
On the backend side, solutions were applied with a focus on **security, performance, and integration**; on the frontend side, **user-friendly, modern, and responsive** interfaces were implemented.

All applied structures aim to build a scalable and extensible architecture.

---

## 🧰 Requirements (Prerequisites)

> The following tools must be installed:

- **.NET SDK 8.0 or 9.0**
- **Node.js 18+** and **npm**
- **SQLite** (local file database for dev is enough)
- **EF Core CLI** (optional): `dotnet tool install --global dotnet-ef`
- **Redis** (for caching) — local or Docker
- **RabbitMQ** (for messaging/MassTransit) — local or Docker
- (Optional) **MailTrap** or SMTP credentials (for email notifications)

> Note: The repository contains **API** (ASP.NET Core) and **b2bhirdanet** (React/TypeScript) folders. Languages are mainly C# and TypeScript.

---

## 🔧 Setup & Run

### 1) Clone the repository

```bash
git clone https://github.com/menesscelik/B2B-HirdaNet.git
cd B2B-HirdaNet
```

### 2) Backend (API)

```bash
cd API
dotnet restore
dotnet ef database update        # run migrations on first setup
dotnet run                       # API runs on https://localhost:5105
```

### 3) Frontend (React/TypeScript)

```bash
cd ../b2bhirdanet
npm install
npm run dev                      # runs on http://localhost:5173
```

> Dev flow: Start Redis/RabbitMQ with Docker → Run API → Run Frontend.

---

## 🧑‍💻 Developer Commands

**EF Core**

```bash
dotnet ef migrations add Init
dotnet ef database update
```

**NPM**

```bash
npm run dev       # development
npm run build     # production build
npm run preview   # local preview after build
```

---

## ❓ FAQ

- **Where is the database file?**  
  If using SQLite, a file like `app.db` will be created at the root when API runs.
  
- **What is the JWT Key?**  
  It’s defined under `Jwt:Key` in `appsettings.json`. Use a long, strong key locally.
  
- **Does it work without Cache/RabbitMQ?**  
  Basic API functions work, but messaging/caching features will be limited or disabled.
  

---

## 🔐 Security Notes

- Do not put secrets in files tracked by Git.
- In production, always enable **HTTPS**, use a **Strong JWT Key**, configure **CORS**, and enable **Rate Limiting**.
- Restrict Admin access with **Policy/Role** based authorization.
