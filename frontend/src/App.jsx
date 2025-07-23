import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import CallPage from './pages/CallPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import toast, { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios.js'


const App = () => {

  const {data} = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await axiosInstance.get('/auth/me')
      return response.data
    },
    retry: false, // auth check
  })
  console.log({data});
  

  return (
    <div className='h-screen' data-theme="night">
      <button onClick={() => toast.success('Toast created!')}>Create a toast</button>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />

      </Routes>

      <Toaster />

    </div>
  )
}

export default App