# Users & Posts RESTful API

This is a full-stack ready backend REST API built using **Node.js**, **Express.js**, **Prisma ORM**, and **PostgreSQL**. It manages users and their blog posts, enforcing a one-to-many relationship (i.e., one user can author multiple posts).

The API allows client applications to create, retrieve, update, and delete both users and posts. It follows clean architecture practices and is ready for integration with frontend frameworks or mobile apps.

---

## 🛠️ Technologies Used

- **Node.js** — JavaScript runtime environment
- **Express.js** — Web framework for Node.js
- **Prisma** — Next-generation ORM for database interactions
- **PostgreSQL** — Open-source relational database
- **UUID** — For unique identifier generation (via Prisma)

---

## 📦 Models

### 🧑 User

| Field        | Type   | Description                          |
|--------------|--------|--------------------------------------|
| `id`         | String | Primary key, UUID                    |
| `firstName`  | String | First name of the user               |
| `lastName`   | String | Last name of the user                |
| `emailAddress` | String | Unique email address              |
| `userName`   | String | Unique username                      |
| `posts`      | Post[] | All posts authored by the user       |

---

### 📝 Post

| Field         | Type      | Description                           |
|---------------|-----------|---------------------------------------|
| `id`          | String    | Primary key, UUID                     |
| `title`       | String    | Title of the post                     |
| `content`     | String    | Post body/content                     |
| `createdAt`   | DateTime  | Defaults to now()                     |
| `lastUpdated` | DateTime  | Updated automatically on modification |
| `isDeleted`   | Boolean   | Soft delete flag (defaults to false)  |
| `userId`      | String    | Foreign key linking to User ID        |

---

## 🔗 Relationships

- **User ↔ Posts**: One-to-many
  - One user can author multiple posts.
  - Each post belongs to exactly one user.

---

## 🔌 API Endpoints

### 📍 Users

#### ✅ GET /users
- **Description**: Returns a list of all users.
- **Response**:
```json
[
  {
    "id": "1",
    "firstName": "Jane",
    "lastName": "Doe",
    "emailAddress": "jane@example.com",
    "userName": "jane_d"
  }
]
