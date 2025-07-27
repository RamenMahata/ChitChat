import React from 'react'

const NoFriendsFound = () => {
  return (
    <div className='card bg-base-200 p-6 text-center'>
        <h3 className='text-lg font-semibold mb-4'>No Friends Found</h3>
        <p className='text-base-content opacity-70'>You have no friends yet. Start connecting with people!</p>
    </div>
  )
}

export default NoFriendsFound