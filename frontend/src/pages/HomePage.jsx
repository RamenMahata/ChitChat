import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from '../lib/api.js';
import { Link } from 'react-router';
import { CheckCircleIcon, MapPinIcon, UserIcon, UserPlusIcon } from 'lucide-react';
import FriendCard, { getLanguageFlag } from '../components/FriendCard.jsx';
import NoFriendsFound from '../components/NoFriendsFound.jsx';
import { capitalizeFirstLetter } from '../lib/utils.js';

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const {data: friendsData, isLoading:loadingFriends} = useQuery({
    queryKey: ['friends'],
    queryFn: getUserFriends
  });
  const friends = Array.isArray(friendsData?.friends) ? friendsData.friends : [];
  const {data:recommendedUsersData, isLoading:loadingRecommendedUsers} = useQuery({
    queryKey: ['users'],
    queryFn: getRecommendedUsers
  });
  const recommendedUsers = Array.isArray(recommendedUsersData?.recommendedUsers)
    ? recommendedUsersData.recommendedUsers
    : [];
  const {data:outgoingFriendReqs} = useQuery({
    queryKey: ['outgoingFriendReqs'],
    queryFn: getOutgoingFriendReqs
  });

  const {mutate:sendRequestMutation, isPending} = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['outgoingFriendReqs']);
      queryClient.invalidateQueries(['users']);
      queryClient.invalidateQueries(['friends']);
    }
  }); 

  useEffect(() => {
    const outgoingIds = new Set();
    if(outgoingFriendReqs && outgoingFriendReqs.outgoingRequests && outgoingFriendReqs.outgoingRequests.length > 0) {
      outgoingFriendReqs.outgoingRequests.forEach(req => {
        if (req.recipient && req.recipient._id) {
          outgoingIds.add(req.recipient._id);
        }
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto space-y-10'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          <h2 className='text-2xl sm:text-3xl tracking-tight font-bold'>Your Friends</h2>
          <Link to='/notifications' className='btn btn-outline btn-sm'>
            <UserIcon className='mr-2 size-4' />
            Friend Requests
          </Link>
        </div>

        {/* Friends List */}
        {
          loadingFriends ? (
            <div className='flex justify-center py-12'>
              <span className='loading loading-spinner loading-lg' />
            </div>
          ) : friends.length === 0 ? (
            <NoFriendsFound />
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {friends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          )
        }

        <section>
          <div className='mb-6 sm:mb-8'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
              <div>
                <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Meet New Learners</h2>
                <p className='opacity-70'>Discover new friends who are also learning!</p>
              </div>
            </div>
          </div>

          {
            loadingRecommendedUsers ? (
              <div className='flex justify-center py-12'>
                <span className='loading loading-spinner loading-lg' />
              </div>
            ) : recommendedUsers.length === 0 ? (
              <div className='card bg-base-200 p-6 text-center'>
                <h3 className='font-semibold text-lg mb-2'>No recommendations found.</h3>
                <p className='text-base-content opacity-70'>Try adjusting your preferences or exploring other users.</p>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {recommendedUsers.map((user) => {
                  const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                  return (
                    <div key={user._id} className='card bg-base-200 hover:shadow-lg transition-all duration-300'>
                      <div className='card-body p-5 space-y-4'>
                        <div className='flex items-center gap-3'>
                          <div className='avatar size-16 rounded-full'>
                            <img src={user.profilePic} alt={user.fullName} />
                          </div>

                          <div>
                            <h3 className='font-semibold text-lg'>{user.fullName}</h3>
                            {user.location && (
                              <div className='flex items-center text-xs opacity-70 mt-1'>
                                <MapPinIcon className='size-3 mr-1' />
                                <span>{user.location}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Language with flags */}
                        <div className='flex flex-wrap gap-1.5'>
                          <span className='badge badge-secondary'>
                            {getLanguageFlag(user.nativeLanguage)}
                            Native: {capitalizeFirstLetter(user.nativeLanguage)}
                          </span>
                          <span className='badge badge-outline'>
                            {getLanguageFlag(user.learningLanguage)}
                            Learning: {capitalizeFirstLetter(user.learningLanguage)}
                          </span>
                        </div>

                        {
                          user.bio && <p className='text-sm opacity-70'> {user.bio}</p>
                        }

                        {/* Action Button */}
                        <button
                          className={`btn w-full mt-2 ${
                            hasRequestBeenSent ? 'btn-disabled' : 'btn-primary'
                          }`}
                          onClick={() => sendRequestMutation(user._id)}
                          disabled={hasRequestBeenSent || isPending}
                        >
                          {hasRequestBeenSent ? (
                            <>
                              <CheckCircleIcon className='size-4 mr-2' />
                              <span>Request Sent</span>
                            </>
                          ): (
                            <>
                              <UserPlusIcon className='size-4 mr-2' />
                              <span>Send Friend Request</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  )
                })}
              </div>
            )
          }
        </section>

      </div>
    </div>
  )
}

export default HomePage

