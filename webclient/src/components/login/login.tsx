"use client"
import React, { useEffect, useState } from 'react'
import handleLogin from '@/functions/login/handleLogin';
import { UserData } from '@/types/users';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store/store';
import { currentUser } from '@/redux/slice/userSlice';
import { useRouter } from 'next/navigation';
import cookies from 'js-cookie';
import Image from 'next/image';
import { isTokenExpired } from '@/functions/common/authToken';


const Login = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const data: UserData = {
    email: email,
    password: password
  }

  const fillDemoCredentials = () => {
    setEmail("teamlead@gmail.com");
    setPassword("TeamLead@01");
  };
  const fillDemoUserCredentials = () => {
    setEmail("tushardhingra37@gmail.com");
    setPassword("TeamLead@01");
  };
  

  useEffect(() => {
    const token = cookies.get('accessToken');
    if (token && !isTokenExpired(token)) {
      router.push('/admin/showtasks');
    } 
  }, [router]);
  
  const login = async (e: React.FormEvent<HTMLFormElement>, data: UserData) => {
    e.preventDefault();
    setInvalidCredentials(false);
    setLoading(true);

    const output = await handleLogin(data, setInvalidCredentials);

    if (output.success) {
      dispatch(currentUser(output.data)); 
      await router.push('/admin/showtasks');
      setTimeout(() => setLoading(false), 4000); 

    } else {
      setLoading(false);
    }

  };
  return (
    <div className="flex flex-col shadow-lg bg-white bg-opacity-90 py-5 px-4 rounded-md animate_animated animate_fadeIn mt-16 max-w-[860px] mx-auto">
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-2">
        <div className="bg-[#94eb1c] rounded-full h-12 w-16 flex items-center justify-center">
          <span className="text-white text-xl font-bold">TMS</span>
        </div>
        <p className="text-xl font-semibold text-gray-800 capitalize">
          Task Management System
        </p>
      </div>
  
      <h4 className="mt-2 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h4>
      <button  className="w-96 flex justify-center rounded-md bg-[#28a750] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#94eb1c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9ceb1c]"
       onClick={fillDemoCredentials}>Team Lead Demo Credentials</button>
      <button  className=" w-96 flex justify-center rounded-md bg-[#67e563] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#94eb1c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9ceb1c]"
       onClick={fillDemoUserCredentials}>Team Member Demo Credentials</button>
    </div>
  
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <form method="POST" onSubmit={(e) => login(e, data)} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
       

  
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {invalidCredentials && (
            <p className="text-red-500 text-sm">Invalid Credentials!</p>
          )}
        </div>
  
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[#9ceb1c] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#94eb1c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9ceb1c]"
          >
            {loading 
              ? <Image className='flex justify-center items-center' src={"https://task-management-system-7crt.vercel.app/loader.gif"} alt="my gif" height={25} width={25}  /> 
              : "Sign in"
              }
          </button>
        </div>
      </form>
    </div>
  </div>
  
  )
}

export default Login
