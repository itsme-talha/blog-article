# 🚀 Premium Full-Stack MVC Blog Application

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)

A highly scalable, secure, and fully functional Blog Application built with the **MERN-like stack** (MongoDB, Express.js, Node.js) and rendered using **EJS** with a premium dark-themed UI (Tailwind CSS). This project strictly follows the **MVC (Model-View-Controller)** architecture.

Developed as a lab assignment for the **Advanced Web Technologies** course.

---

## 🎨 UI/UX Design & Previews

The application was designed with a high-end, premium dark-mode aesthetic. Below are the actual implementations based on the Figma wireframes:

### 1. Public Landing Page
![Landing Page Design](docs/landing.png)
*The main hub for readers to explore articles and join the community.*

### 2. Admin Developer Console (Dashboard)
![Dashboard Design](docs/dashboard.png)
*A sleek, data-rich control panel restricted to master admins.*

### 3. Rich-Text Article Creator
![Create Post Design](docs/create-post.png)
*The content management interface featuring the integrated Quill.js editor.*

### 4. Authentication Portals
![Auth Design](docs/auth.png)
*Glassmorphism-inspired secure login and registration forms.*

*(**Link to complete Figma Workspace:** [View Interactive Prototype Here](https://www.figma.com/))*

---

## ✨ Key Features

- **🔐 Secure Authentication:** User registration and login powered by `express-session` and password encryption using `bcryptjs`.
- **🛡️ Role-Based Access Control (RBAC):** Distinct layouts and permissions for Guests, standard Users, and Master Admins.
- **📝 Comprehensive Blog Management:** Full CRUD operations (Create, Read, Update, Delete) for articles accessible via a secure Admin Console.
- **🖋️ Rich Text Editing:** Integration of **Quill.js** for a modern, Notion-style WYSIWYG content creation experience.
- **🖼️ Secure Image Uploads:** Handled via `express-fileupload` with strict custom middleware validation.
- **🚦 Custom Middlewares:** - `logger.js`: Logs every incoming HTTP request.
  - `authGuard.js`: Protects dashboard and CRUD routes.
  - `imageValidator.js`: Validates image uploads.
- **🗄️ Advanced Database Relations:** Utilizes Mongoose `.populate()` to seamlessly map User and Post relationships.

---

## 📂 MVC Folder Structure

```text
📦 blog-app
 ┣ 📂 config           # Database connection setup
 ┣ 📂 controllers      # Core business logic (authController, postController)
 ┣ 📂 middleware       # Custom middlewares (logger, authGuard, imageValidator)
 ┣ 📂 models           # Mongoose schemas (User, Post)
 ┣ 📂 public           # Static assets (uploads, css, js)
 ┣ 📂 routes           # Express route definitions
 ┣ 📂 views            # EJS templates (layouts, auth, posts, dashboard)
 ┣ 📂 docs             # Project documentation and screenshots
 ┣ 📜 .env             # Environment variables (Ignored in Git)
 ┣ 📜 app.js           # Application entry point
 ┣ 📜 seed.js          # Database seeder for default Admin and Dummy Posts
 ┗ 📜 package.json     # Project metadata and dependencies
