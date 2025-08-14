# ChitChat - Real-Time Chat Application

A modern, full-stack chat application built with React, Node.js, and Stream Chat for real-time messaging and video calling.

## 🚀 Features

- **Real-time messaging** with Stream Chat
- **Video calling** with Stream Video
- **User authentication** with JWT
- **Friend system** with friend requests
- **Modern UI** with Tailwind CSS and DaisyUI
- **Responsive design** for all devices
- **Dark/Light theme** support

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **DaisyUI** - Component library
- **React Router** - Navigation
- **Zustand** - State management
- **Axios** - HTTP client
- **Stream Chat React** - Chat components
- **Stream Video React** - Video calling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Stream Chat Node SDK** - Chat backend
- **CORS** - Cross-origin requests

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Stream Chat account

### Local Development

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd ChitChat
   ```

2. **Install dependencies**:
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**:
   
   Create `backend/.env`:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=http://localhost:5173
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   PORT=5001
   NODE_ENV=development
   ```

   Create `frontend/.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5001/api
   VITE_STREAM_API_KEY=your_stream_api_key
   VITE_NODE_ENV=development
   ```

4. **Start development servers**:
   ```bash
   npm run dev
   ```

   This will start both frontend (port 5173) and backend (port 5001).

## 🚀 Deployment

### Quick Deploy to Vercel

1. **Run the deployment script**:
   ```bash
   ./deploy.sh
   ```

2. **Or deploy manually**:
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

### Manual Deployment Steps

1. **Push code to GitHub**
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings

3. **Set environment variables** in Vercel dashboard:
   - Backend variables (see `backend/env.example`)
   - Frontend variables (see `frontend/env.example`)

4. **Deploy and test**

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 📁 Project Structure

```
ChitChat/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and API
│   │   └── store/          # State management
│   └── public/             # Static assets
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── lib/            # Utilities
│   └── server.js           # Entry point
├── vercel.json             # Vercel configuration
├── package.json            # Root package.json
└── deploy.sh              # Deployment script
```

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development
- `npm run build` - Build frontend for production
- `npm run install:all` - Install dependencies for all packages

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/onboarding` - Complete user onboarding

### Users
- `GET /api/users` - Get recommended users
- `GET /api/users/friends` - Get user's friends
- `GET /api/users/friend-requests` - Get incoming friend requests
- `POST /api/users/friend-request/:userId` - Send friend request
- `PUT /api/users/friend-request/:requestId/accept` - Accept friend request

### Chat
- `GET /api/chat/token` - Get Stream Chat token

## 🔒 Environment Variables

### Backend Required Variables
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `STREAM_API_KEY` - Stream Chat API key
- `STREAM_API_SECRET` - Stream Chat API secret
- `CORS_ORIGIN` - Allowed origin for CORS

### Frontend Required Variables
- `VITE_API_BASE_URL` - Backend API URL
- `VITE_STREAM_API_KEY` - Stream Chat API key

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for troubleshooting
2. Review the application logs
3. Test locally with production environment variables
4. Open an issue on GitHub

## 🙏 Acknowledgments

- [Stream Chat](https://getstream.io/chat/) for real-time messaging
- [Stream Video](https://getstream.io/video/) for video calling
- [Vercel](https://vercel.com) for hosting
- [Tailwind CSS](https://tailwindcss.com) for styling
- [DaisyUI](https://daisyui.com) for components
