# 🚀 Premium Full-Stack MVC Blog Application

A highly scalable, secure, and fully functional Blog Application built with the **MERN-like stack** (MongoDB, Express.js, Node.js) and rendered using **EJS** with a premium dark-themed UI (Tailwind CSS). This project strictly follows the **MVC (Model-View-Controller)** architecture.

Developed as a lab assignment for the **Advanced Web Technologies** course.

---

## 🎨 UI/UX Design Overview

The application was designed with a high-end, premium dark-mode aesthetic. Core interfaces include:

* **Public Landing Page:** The main hub for readers to explore articles and join the community.
* **Admin Developer Console (Dashboard):** A sleek, data-rich control panel restricted to master admins.
* **Rich-Text Article Creator:** The content management interface featuring the integrated Quill.js editor.
* **Authentication Portals:** Glassmorphism-inspired secure login and registration forms.

*(Link to complete Figma Workspace: [View Interactive Prototype Here](https://www.figma.com/))*

---

## ✨ Key Features

* **🔐 Secure Authentication:** User registration and login powered by `express-session` and password encryption using `bcryptjs`.
* **🛡️ Role-Based Access Control (RBAC):** Distinct layouts and permissions for Guests, standard Users, and Master Admins.
* **📝 Comprehensive Blog Management:** Full CRUD operations (Create, Read, Update, Delete) for articles accessible via a secure Admin Console.
* **🖋️ Rich Text Editing:** Integration of **Quill.js** for a modern, Notion-style WYSIWYG content creation experience.
* **🖼️ Secure Image Uploads:** Handled via `express-fileupload` with strict custom middleware validation.
* **🚦 Custom Middlewares:**
    * `logger.js`: Logs every incoming HTTP request.
    * `authGuard.js`: Protects dashboard and CRUD routes.
    * `imageValidator.js`: Validates image uploads.
* **🗄️ Advanced Database Relations:** Utilizes Mongoose `.populate()` to seamlessly map User and Post relationships.

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
 ┣ 📜 .env             # Environment variables (Ignored in Git)
 ┣ 📜 app.js           # Application entry point
 ┣ 📜 seed.js          # Database seeder for default Admin and Dummy Posts
 ┗ 📜 package.json     # Project metadata and dependencies

git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd blog-app

npm install

PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/blog_db
SESSION_SECRET=your_super_secret_key_here


node seed.js



npm run dev
