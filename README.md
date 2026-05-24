# 🚀 Course Management & Auth API

A robust and modern RESTful API for course management, complete with a secure authentication system, database relationships, and file upload capabilities. This project is built using **Node.js**, **Express.js**, and **Sequelize ORM** interacting with a MySQL database.

## ✨ Key Features

- **Authentication & Registration**: User registration equipped with automatic password hashing using `bcrypt`.
- **Email Verification**: Automatic account activation workflow via email using `nodemailer` and unique `uuid` tokens.
- **JWT Security**: Protected sensitive routes via a custom Bearer Token middleware (`jsonwebtoken`).
- **Relational CRUD**: Full database operations on course data that is automatically bound to the creator's User ID (One-to-Many Relationship).
- **Advanced Query Features**: Dynamic `GET` data endpoint supporting **Filtering** (by author), **Searching** (partial title search via `LIKE` operator), and **Sorting** (by price or title).
- **Image Upload**: Seamless file upload feature to the local server storage using `multer`.
- **Modular Routing**: Clean architecture separated by resource modules (_user_, _course_, _upload_) for optimal maintainability.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize ORM
- **Database**: MySQL
- **Libraries**: `bcrypt`, `jsonwebtoken`, `nodemailer`, `multer`, `uuid`

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com
cd my-express
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database & SMTP Configuration

Open `src/configs/database.js` (or your database configuration file) and adjust your local MySQL credentials.
Open `src/controllers/user.controller.js` and input your SMTP Testing credentials (e.g., Mailtrap).

### 4. Database Sync (First Time Setup)

Ensure that `sequelize.sync({ alter: true })` in `index.js` is active during the first run to automatically generate the MySQL tables.

### 5. Start the Server

```bash
# Using Nodemon for development
npm run dev

# Using native Node.js
node index.js
```

The server will be up and running at `http://localhost:3000`.

## 📌 Main API Endpoints

- `POST /api/posts/user/register` - Create a New Account
- `GET /api/users/verifikasi-email?token=...` - Activate Account via Email Link
- `POST /api/users/login` - Authenticate User & Get JWT Token
- `POST /api/courses` - Create a New Course (Requires Bearer Token)
- `GET /api/courses?search=...&sort=...` - Get All Courses with Filter, Sort & Search
- `POST /api/upload` - Upload an Image File (Use `form-data` format, key: `image`)
