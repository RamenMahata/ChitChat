import { ShipWheelIcon } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router';
import useLogin from '../hooks/useLogin';

const LoginPage = () => {

  const [loginData, setLoginData] = React.useState({
    email: '',
    password: ''  
  });

  // const queryClient = useQueryClient();

  // const {mutate: loginMutation, isPending, error} = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ['authUser'],
  //     });
  //   },
  // });
  const {loginMutation, isPending, error } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData); 
    // Optionally, you can handle success or error states here
  }

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 ' data-theme="forest">

      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl overflow-hidden'>
        {/* Login Form - left side */}
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
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
            <form onSubmit={handleLogin}>
              <div className='space-y-4'>
                <div>
                  <h2>Welcome Back!</h2>
                  <p className='text-sm opacity-70'>Login to continue your journey with ChitChat.</p>
                </div>

                <div className='flex flex-col gap-3'>
                  <div className='form-control w-full space-y-2'>
                    <label className='label'>Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder='Enter your email'
                      value={loginData.email} 
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})} 
                      required 
                      className='input input-bordered w-full' 
                    />
                  </div>

                  <div className='form-control w-full space-y-2'>
                    <label className='label'>Password</label>
                    <input 
                      type="password" 
                      id="password" 
                      placeholder='Enter your password'
                      value={loginData.password} 
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
                      required 
                      className='input input-bordered w-full' 
                    />
                  </div>
                  <button type="submit" disabled={isPending} className='btn btn-primary w-full mt-4'>
                    {isPending ? (
                      <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Signing in...
                      </>

                    ) : 'Sign In'}
                  </button>

                  <div className='mt-4 text-center' >
                    <p className='text-sm'>Don't have an account?{' '} <Link to='/signup' className='text-primary hover:underline'>Create One</Link></p>
                  </div>

                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Illustration */}

        <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
          <div className='max-w-md p-8'>
            <div className='relative aspect-square max-w-sm mx-auto'>
              <img src='/i.png' alt='Login Illustration' className='w-full h-full object-cover' />
            </div>
            <div className='text-center space-y-3 mt-6'>
              <h2 className='text-2xl font-bold'>Welcome Back!</h2>
              <p className='text-sm opacity-70'>Login to continue your journey with ChitChat.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage