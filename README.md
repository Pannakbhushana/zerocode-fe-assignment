# 🤖 Chatbot

A web application where users can create an account and chat with Gemini AI using text or voice. All chats are saved and accessible from any device.

---

## ✨ Features

- 🔐 User authentication (Signup/Login with OTP)
- ✅ Email verification with OTP
- 🔁 Password reset via email
- 🧠 Chat with Gemini AI
- 💬 Voice input support
- 🗂️ Chat history saved in MongoDB
- 🧾 Multi-session support
- 🗑️ Delete chat history or account
- 📱 Responsive design (mobile/tablet friendly)
- 🙋 Help & Support page

---

## 🛠️ Tech Stack

### Frontend
- React + TypeScript
- Chakra UI + Tailwind CSS
- Redux Toolkit
- Axios

### Backend
- Node.js + Express
- MongoDB (Atlas) via Mongoose
- JWT for Authentication
- Nodemailer for Email
- Gemini AI API

---

## 🚀 Deployment

| Component | Platform |
|-----------|----------|
| Frontend  | [Netlify](https://chitchatwithchatbot.netlify.app/) |
| Backend   | Render |
| Database  | MongoDB Atlas |

---

## 📷 Screenshots

> Screenshots are stored in the `screenshots/` folder at the root of this repo.

| Description              | Preview                                  |
|--------------------------|------------------------------------------|
| Signup Page              | ![Signup](./screenshots/signup.png)     |
| Login Page               | ![Login](./screenshots/login.png)       |
| Dashboard (Large)        | ![Dashboard](./screenshots/dashboard.png) |
| Dashboard (Mobile)       | ![Dashboard Small](./screenshots/dashboard-small-screen.png) |
| Reset Password           | ![Reset Password](./screenshots/reset-password.png) |
| User Menu                | ![User Menu](./screenshots/user-menu.png) |
| Help and Support         | ![Help](./screenshots/help-and-support.png) |
| Delete Account           | ![Delete Account](./screenshots/delete-account.png) |

---

## 🔧 Installation Instructions

### 🧬 Clone repository

- git clone https://github.com/Pannakbhushana/zerocode-fe-assignment.git


### 🔧 Install Frontend

- cd client
- npm install
- npm start

---

### 🔧 Install Backend

- cd ../server
- npm install
- npm run dev

---

### Run both Frontend & Backend (if configured)
npm run serve (root folder of repo)

---

## 🔐 Environment Variables

### Frontend (.env)

- REACT_APP_SERVER_ADDRESS = https://example.com (for prod)
- REACT_APP_SERVER_ADDRESS = http://localhost:300 (for local)

### Backend (.env)

- mongoUrl=mongodb+srv://example.com$true&w=majority&appName=Cluster0
- rounds=5
- JWT_SECRET=examplesecret
- tokenExpiry=1d
- GEMINI_API_KEY=exampleapisecret
- SMTP_USER=example@gmail.com
- SMTP_PASS=exam plex exam plew

## 🧭 API Endpoints

### 🔑 account/ – User Authentication

- POST /sendotp – Send OTP for email verification
- POST /verifyotp – Verify OTP from email
- POST /login – Login with credentials
- POST /send-reset-otp – Send password reset OTP
- POST /reset-password – Reset user password
- Example: https://chatbotexample.com/api/account/login

### 🤖 chatbot/ – Gemini AI Chat

- POST /ask – Send message to Gemini AI
- Example: https://chatbotexample.com/api/chatbot/ask

### 💬 chat/ – Chat Sessions

- POST /new-session – Create a new chat session
- GET /sessions – Get all chat sessions
- PATCH /session/update – Update session title
- DELETE /session/delete – Delete chat session
- Example: https://chatbotexample.com/api/chat/new-session

### 📩 message/ – Messages in a Session

- GET /session/:sessionId – Get all messages of a session
- POST /add – Add message to a session
- Example: https://chatbotexample.com/api/message/session/1

## 📐 Architecture Diagram

 ```txt
                         ┌────────────────────────────┐
                         │       👤 User (Browser)    │
                         └────────────┬───────────────┘
                                      │
                                      ▼
               ┌────────────────────────────────────────────────┐
               │         🌐 React Frontend (TypeScript)         │
               │  - UI Components (Chakra UI + Tailwind CSS)    │
               │  - Voice Input (Web Speech API)                │
               │  - Redux Toolkit for Global State              │
               │  - Axios for API Communication                 │
               │  - Routing, Error Handling, Auth UI            │
               └────────────┬───────────────────────────────────┘
                            │
                            ▼
                    🔐 Authenticated Requests
                            │
                            ▼
    ┌──────────────────────────────────────────────────────────────┐
    │               🛠 Node.js + Express Backend (TypeScript)      │
    │                                                              │
    │  - JWT Auth (Signup, Login, OTP Verification)                │
    │  - REST API Endpoints (/account, /chat, /message)            │
    │  - Middleware (CORS, Rate Limiting, Auth Guard)              │
    │  - Business Logic Layer (Chat Mgmt, Voice Input Handling)    │
    │  - API Request Validation (Zod)                              │
    └──────┬─────────────┬────────────────────┬────────────────────┘
           │             │                    │
           ▼             ▼                    ▼
    ┌────────────────┐ ┌────────────────┐ ┌────────────────────────┐
    │ 📧 Nodemailer   │ │ 🧠 Gemini AI    │ │ 🗃️ MongoDB Atlas    │
    │ - Send OTP     │ │ - AI Chat      │ │ - User Auth Data       │
    │ - Reset Links  │ │ - Text + Voice │ │ - Chat Sessions        │
    └────────────────┘ └────────────────┘ │ - Chat History (CRUD)  │
                                         │ - Session Metadata      │
                                         └─────────┬──────────────┘
                                                   │
                                                   ▼
                                ┌────────────────────────────────┐
                                │ 🔄 Multi-device Support       │
                                │ - Sync Chat History            │
                                │ - Session Continuation         │
                                └────────────────────────────────┘

Deployment Summary:
┌────────────────────────────────────┐
│ 🔼 Frontend: Hosted on Netlify    |
│ 🛠 Backend: Hosted on Render       │
│ ☁️ Database: MongoDB Atlas         │
└────────────────────────────────────┘
```




## 🌐 Live Demo
🔗 https://chitchatwithchatbot.netlify.app/


