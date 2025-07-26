import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = ({children,  showSidebar = false}) => {
  return (
    <div className='min-h-screen'>
        <div className='flex'>
            {/* Sidebar */}
            {showSidebar && <Sidebar />}

            {/* Main Content */}
            <div className='flex-1 flex flex-col'>
                {/* Navbar */}
                <Navbar />

                <main className='flex-1 overflow-y-auto'>
                    {children}
                </main>
            </div>
        </div>
        
    </div>
  )
}

export default Layout