import { QueryClient, useMutation } from '@tanstack/react-query';
import { ShipWheelIcon } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router';
import { signup } from '../lib/api';

const SignUpPage = () => {

  const [signupData, setSignupData] = React.useState({
    fullName: '',
    email: '',
    password: '',
  });

  const queryClient = new QueryClient();

  const { 
    mutate: signupMutation, 
    isPending, 
    error 
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['authUser'],
      });
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
    // Optionally, you can handle success or error states here
    // Handle signup logic here
  }
  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 ' data-theme="forest">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl overflow-hidden'>

      {/* Signup Form - left side */}
      <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col justify-center'>
      {/* LOGO */}
        <div className='mb-4 flex items-center justify-start gap-2'>
          <ShipWheelIcon className='size-9 text-primary' />
          <span className='text-3xl font-bold font-mono bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wider'>ChitChat</span>
        </div>

        {/* Error Message */}
        {error && 
          <div className='alert alert-error mb-4'>
            <span>{error.response.data.message}</span>
          </div>
        }
        <div className='w-full'>
          <form onSubmit={handleSignup}>

            <div className='space-y-4'>
              <div>
                <h2>Create an Account</h2>
                <p className='text-sm opacity-70'>Join ChitChat today and connect with your friends!</p>
              </div>

              <div className='space-y-3'>
                {/* Full Name */}
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Full Name</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Enter your full name'
                    className='input input-bordered w-full'
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                    required
                  />
                </div>
                {/* Email */}
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input
                    type='email'
                    placeholder='Enter your Email'
                    className='input input-bordered w-full'
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                  />
                </div>
                {/* Password */}
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Password</span>
                  </label>
                  <input
                    type='password'
                    placeholder='Enter your password'
                    className='input input-bordered w-full'
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                  />
                  <p className='text-sm opacity-70 mt-1' >Password must be at least 6 characters long</p>
                </div>
                {/* Terms and Conditions */}
                <div className='form-control'>
                  <label className='label cursor-pointer justify-start gap-2'>
                    <input type='checkbox' className='checkbox checkbox-sm' required />
                    <span className='label-text'>I agree to the {" "} <span className='text-primary hover:underline'>Terms and Conditions</span> and {" "} <span className=' text-primary hover:underline'>Privacy Policy</span></span>
                  </label>
                </div>
              </div>

              <button className='btn btn-primary w-full' type='submit'>
                {isPending ? (
                  <>
                  <span className='loading loading-spinner loading-xs'></span>
                  Loading...
                  </>
                ) : 'Create Account'}
              </button>

              <div className='text-center mt-4'>
                <p className='text-sm opacity-70'>Already have an account? <Link to='/login' className='text-primary hover:underline'>Sign in</Link></p>
              </div>
            </div>
          </form>
        </div>

      </div>
      {/* Signup Illustration - right side */}
      <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
        <div className='max-w-md p-8'>
          {/* Signup Illustration */}
          <div className='relative aspect-square max-w-sm mx-auto'>
            <img src='/i.png' alt='Signup Illustration' className='w-full h-full' />
          </div>

          <div className='text-center space-y-3 mt-6'>
            <h2 className='text-xl font-semibold'>Join the Conversation</h2>
            <p className='text-sm opacity-70'>Connect with friends and the world around you.</p>
          </div>
        </div>
      </div>

      </div>
      
    </div>
  )
}

export default SignUpPage