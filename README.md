# 📘 Library Management Backend

A simple backend API project using **TypeScript**, **Express.js**, and **MongoDB**. This project supports basic CRUD operations with schema validation using Zod.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js v5**
- **TypeScript**
- **MongoDB & Mongoose**
- **Zod** for schema validation
- **dotenv** for environment management

---

## 🌐 Live API

📡 **Base URL:**  
[https://library-backend-flame.vercel.app](https://library-backend-flame.vercel.app)

You can use tools like **Postman** or **Thunder Client** to test the API endpoints.

---

## 📁 Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/Hrittik-Chatterjee/level-2-assignment-3.git
cd level-2-assignment-3
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up `.env` file

Create a `.env` file in the root directory and add your MongoDB URI like this:

```
MONGODB_URI=your_mongo_connection_string
```

### 4. Run the project

```bash
npm run dev
```

---

## 🧪 API Endpoints

| Method | Route            | Description           |
| ------ | ---------------- | --------------------- |
| GET    | `/api/books`     | Get all books         |
| GET    | `/api/books/:id` | Get single book by ID |
| POST   | `/api/books`     | Create a new book     |
| PATCH  | `/api/books/:id` | Update a book by ID   |
| DELETE | `/api/books/:id` | Delete a book by ID   |
| Get    | `/api/borrow`    | Get borrow summary    |

|
| POST | `/api/borrow` | Borrow Books

---

### GET /api/books

Supports filtering, sorting, and limiting results via query parameter
| Query Parameter | Description | Example |
| --------------- | ----------------------------------------- | ------------------ |
| `filter` | Filter by genre or other book fields | `filter=FANTASY` |
| `sortBy` | Field name to sort by (e.g., createdAt) | `sortBy=createdAt` |
| `sort` | Sort direction: `asc` or `desc` | `sort=desc` |
| `limit` | Number of results to return (default: 10) | `limit=5` |

### Example Request :

GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5

---

## 🛠️ Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Run in development mode  |
| `npm run build` | Compile TypeScript files |

---
