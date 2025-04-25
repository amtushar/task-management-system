'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import routes from '../../components/sidebar/routes';
import React from 'react';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store/store'
import usersApi from '@/api/user/userApi';
import { currentUser } from '@/redux/slice/userSlice';
import cookies from 'js-cookie';
import { isTokenExpired } from '@/functions/common/authToken';
import { useRouter } from 'next/navigation';

export default function Admin({ children }: { children: React.ReactNode }) {

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const UserAPI = new usersApi();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);


  useEffect(() => {

    const getUser = async () => {
      console.log('inside get user');
      const output = await UserAPI.CurrentUser("currentUser");
      console.log('inside get user output', output);
      const data = output.output.outputResponse;
      dispatch(currentUser(data));

    }
    if (user.userID == "") {
      getUser();
    }
  }, [dispatch, user])

  useEffect(() => {
    const token = cookies.get('accessToken');
    
    // If token is not present or expired, redirect to login page
    if (!token || isTokenExpired(token)) {
      // router.push('/login/data');
      console.log('no push to login')
    }
  }, [router]);

  
  return (
    <div className="flex h-full w-full bg-white dark:bg-background-900">
      <Sidebar routes={routes} open={open} setOpen={setOpen} variant="admin" />
      <div className="h-full w-full font-dm dark:bg-navy-900">
        <main
          className={`mr-2.5  flex-none transition-all dark:bg-navy-900 
              md:pr-2 `}
        >
          {/* Routes */}
          <div>
            <Navbar
              onOpenSidenav={() => setOpen(!open)}
              // brandText='WED-VENUE'
              // secondary='Admin'
            />
            <div className="ml-2.5 mx-auto min-h-screen p-2 !pt-[10px] md:p-2 xl:ml-[323px]">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
