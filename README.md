# 💬 ChitChat

> A modern, real-time messaging and video calling application built with React and Node.js

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Stream](https://img.shields.io/badge/Stream-Chat%20%26%20Video-FF3333?logo=stream)](https://getstream.io/)

---

## 📋 Overview

**ChitChat** is a full-stack real-time communication platform that enables users to connect, chat, and make video calls with friends. The application features a robust authentication system, friend management, and seamless real-time messaging powered by Stream Chat and Video APIs.

### Key Highlights

- 🔐 **Secure Authentication** - JWT-based authentication with password hashing
- 💬 **Real-Time Messaging** - Instant messaging powered by Stream Chat
- 📹 **Video Calling** - High-quality video calls with Stream Video SDK
- 👥 **Friend System** - Send, accept, and manage friend requests
- 🎨 **Modern UI** - Responsive design with Tailwind CSS and theme switching
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library with hooks
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **React Query (TanStack Query)** - Server state management
- **Stream Chat React SDK** - Real-time messaging components
- **Stream Video React SDK** - Video calling capabilities
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **Stream Chat Node SDK** - Backend integration for Stream services
- **Cookie Parser** - Cookie handling middleware
- **CORS** - Cross-origin resource sharing

### Third-Party Services
- **Stream.io** - Real-time chat and video infrastructure
- **MongoDB Atlas** (or self-hosted) - Database hosting

---

## ✨ Features

### 🔐 Authentication & User Management
- User registration with email validation
- Secure login with JWT authentication
- Password hashing using bcryptjs
- Onboarding flow for new users
- Protected routes with middleware
- Cookie-based session management

### 👥 Social Features
- User profile with customizable bio, profile picture, and location
- Language preferences (native and learning languages)
- Friend recommendation system
- Send and receive friend requests
- Accept/decline friend requests
- View friends list
- Track outgoing friend requests

### 💬 Real-Time Chat
- One-on-one messaging
- Real-time message delivery
- Stream Chat integration for reliable messaging
- Responsive chat interface
- Message history

### 📹 Video Calling
- High-quality video calls
- Stream Video SDK integration
- Secure call tokens
- Full-screen call experience

### 🎨 User Interface
- Responsive design for mobile and desktop
- Dark/Light theme switching
- Modern, clean UI with Tailwind CSS
- Loading states and animations
- Toast notifications for user feedback
- Sidebar navigation

### 🔔 Notifications
- Friend request notifications
- Real-time notification updates
- Notification center page

---

## 📁 Project Structure

```
ChitChat/
├── backend/
│   ├── src/
│   │   ├── controllers/          # Request handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── chat.controller.js
│   │   │   └── user.controller.js
│   │   ├── lib/                  # Utility functions
│   │   │   ├── db.js            # MongoDB connection
│   │   │   └── stream.js        # Stream.io integration
│   │   ├── middleware/          # Express middleware
│   │   │   └── auth.middleware.js
│   │   ├── models/              # Mongoose models
│   │   │   ├── User.js
│   │   │   └── FriendRequest.js
│   │   ├── routes/              # API routes
│   │   │   ├── auth.routes.js
│   │   │   ├── chat.routes.js
│   │   │   └── user.routes.js
│   │   └── server.js            # Express server entry point
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── CallButton.jsx
│   │   │   ├── ChatLoader.jsx
│   │   │   ├── FriendCard.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoFriendsFound.jsx
│   │   │   ├── PageLoader.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── ThemeSelector.jsx
│   │   ├── constants/           # App constants
│   │   │   └── index.js
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useAuthUser.jsx
│   │   │   ├── useLogin.jsx
│   │   │   └── useLogout.jsx
│   │   ├── lib/                 # Utilities and API client
│   │   │   ├── api.js
│   │   │   ├── axios.js
│   │   │   └── utils.js
│   │   ├── pages/               # Page components
│   │   │   ├── CallPage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── NotificationsPage.jsx
│   │   │   ├── OnboardingPage.jsx
│   │   │   └── SignUpPage.jsx
│   │   ├── store/               # State management
│   │   │   └── useThemeStore.js
│   │   ├── App.jsx              # Main app component
│   │   ├── index.css            # Global styles
│   │   └── main.jsx             # React entry point
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md
│
└── package.json                 # Root package.json
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** instance (local or MongoDB Atlas)
- **Stream.io account** with API credentials

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# CORS
CORS_ORIGIN=http://localhost:5173

# JWT
JWT_SECRET=your_jwt_secret_key

# Stream.io
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/RamenMahata/ChitChat.git
   cd ChitChat
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   - Copy the `.env.example` file (if available) or create a `.env` file in the `backend` directory
   - Fill in all required environment variables

5. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   The backend server will run on `http://localhost:5000`

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Production Build

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd backend
   npm start
   ```

   The production server will serve both the API and the frontend static files.

---

## 📸 Screenshots

> *Screenshots will be added soon*

- 🏠 Home/Dashboard
- 💬 Chat Interface
- 📹 Video Call Screen
- 👥 Friends List
- 🔔 Notifications
- 🔐 Login/Signup Pages
- ⚙️ Onboarding Flow

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/onboarding` - Complete user onboarding
- `GET /api/auth/me` - Get current user (protected)

### Users
- `GET /api/users` - Get recommended users
- `GET /api/users/friends` - Get user's friends list
- `POST /api/users/friend-request/:id` - Send friend request
- `PUT /api/users/friend-request/:id/accept` - Accept friend request
- `GET /api/users/friend-requests` - Get incoming friend requests
- `GET /api/users/outgoing-friend-requests` - Get outgoing friend requests

### Chat
- `GET /api/chat/token` - Get Stream Chat token (protected)

---

## 📚 Lessons Learned & Future Improvements

### What I Learned

- **Real-time Communication**: Implemented real-time messaging and video calling using Stream.io SDKs
- **State Management**: Utilized Zustand for client-side state and React Query for server state synchronization
- **Authentication Security**: Implemented secure JWT-based authentication with password hashing
- **API Design**: Created RESTful APIs with proper error handling and middleware
- **Modern React**: Leveraged React 19 features and hooks for efficient component architecture
- **Database Modeling**: Designed MongoDB schemas with Mongoose for users and friend relationships

### Future Improvements

- [ ] Group chat functionality
- [ ] File and image sharing in chats
- [ ] Message search and filtering
- [ ] Typing indicators
- [ ] Online/offline status indicators
- [ ] Message read receipts
- [ ] Push notifications
- [ ] End-to-end encryption
- [ ] Screen sharing in video calls
- [ ] Chat history persistence
- [ ] User blocking and reporting features
- [ ] Multi-language support
- [ ] Voice messages
- [ ] Reaction emojis for messages
- [ ] Profile picture upload functionality

---

## 👨‍💻 Author

**Ramen Mahata**

- LinkedIn: [Ramen Mahata](https://www.linkedin.com/in/ramen-mahata-bb2253253/)
- GitHub: [@RamenMahata](https://github.com/RamenMahata)

---

## 📄 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgments

- [Stream.io](https://getstream.io/) for providing excellent chat and video infrastructure
- [React](https://react.dev/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- All open-source contributors whose libraries made this project possible

---

**Made with ❤️ using React and Node.js**

