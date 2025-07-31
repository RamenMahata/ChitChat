import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import useAuthUser from '../hooks/useAuthUser';
import { getStreamToken } from '../lib/api';
import { useQuery } from '@tanstack/react-query';

import {
  StreamVideo, 
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks
} from '@stream-io/video-react-sdk';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import toast from 'react-hot-toast';
import PageLoader from '../components/PageLoader';
import { Speaker } from 'lucide-react';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const {id: callId} = useParams();
  const [client, setClient] =useState(null);
  const [call, setCall] =useState(null);
  const [isConnecting, setIsConnecting] =useState(false);

  const {authUser, isLoading} = useAuthUser();

  const {data: tokenData} = useQuery({
    queryKey: ['streamToken'],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return;

      setIsConnecting(true);

      try {
        console.log("Initializing call with token...");

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        }

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });
        const callInstance = videoClient.call("default", callId);
        await callInstance.join({create: true});
        console.log("Call initialized successfully");
        setClient(videoClient);
        setCall(callInstance);
        

      } catch (error) {
        console.error("Error initializing call:", error);
        toast.error("Failed to initialize call. Please try again later.");
        
      } finally {
        setIsConnecting(false);
      }
    }

    initCall();
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) {
    return <PageLoader />;
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center' data-theme={authUser?.theme}>
      <div className='relative'>
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call} user={authUser}>
              <StreamTheme>
                <CallContent />
              </StreamTheme>
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className='flex items-center justify-center h-full'>
            <p>Could not connect to the call. Please try again later.</p>
          </div>
        )}
      </div> 
    </div>
  )
};
const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  if(callingState === CallingState.LEFT) return navigate('/')
  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage