import React from 'react'
import { LANGUAGE_TO_FLAG } from '../constants';
import { Link } from 'react-router';

const FriendCard = ({ friend }) => {
  return (
    <div className='card bg-base-200 hover:shadow-md transition-shadow'>
      <div className='card-body p-4'>
        {/* User Info */}
        <div className='flex items-center gap-3 mb-3'>
          <div className='avatar size-12'>
            <img src={friend.profilePic || '/default-avatar.png'} alt={`${friend.fullName}'s profile`} />
          </div>
          <h3 className='font-semibold truncate'>{friend.fullName}</h3>
        </div>

        <div className='flex flex-wrapgap-1.5 mb-3'>
          <span className='badge badge-secondary text-xs'>
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className='badge badge-outline text-xs'>
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className='btn btn-outline w-full'>
          Message
        </Link>

      </div>
    </div>
  )
}

export default FriendCard

/**
 * Returns a flag icon image element for the given language, or null if unavailable.
 * 
 * Converts the language name to lowercase, looks up the corresponding country code, and returns an image element displaying the flag. Returns null if the language is falsy or no matching flag is found.
 * 
 * @param {string} language - The name of the language to display a flag for.
 * @return {JSX.Element|null} The flag image element, or null if not found.
 */
export function getLanguageFlag(language) {
  if(!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if(countryCode) {
    return (
      <img 
        src={`https://flagcdn.com/24x18/${countryCode}.png`} 
        alt={`${language} flag`} 
        className='h-3 mr-1 inline-block' 
      />
    )
  }
  return null;
    
}