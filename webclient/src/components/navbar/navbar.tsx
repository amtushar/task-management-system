'use client'
import React from 'react';
import Dropdown from '../dropdown/dropdown';
import {
  IoMdLogOut
} from 'react-icons/io';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store'
import { handleLogout } from '@/functions/logout/logout';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
import { FiAlignJustify } from 'react-icons/fi';

import Link from 'next/link';
const Navbar = (props: {
  onOpenSidenav: () => void;
}) => {

  const { onOpenSidenav } = props;
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  return (

    <>
      <nav className="sticky top-1 left-0 z-50 w-full flex items-center justify-between bg-white shadow-lg rounded-lg  px-3 py-2 md:py-4">
        <div className="flex items-center space-x-2">
          <div className="bg-[#94eb1c] rounded-full h-12 w-16 flex items-center justify-center">
            <span className="text-white text-xl font-bold">TMS</span>
          </div>
          <p className="text-xl font-semibold text-gray-800 capitalize">Task Management System</p>
        </div>

        <div className="flex items-center gap-8">
          <button
            className="p-1 rounded-full bg-gray-100 text-[#94eb1c] hover:bg-[#94eb1c] hover:text-white transition"
            aria-label="Profile"
          >
            <Link href="/admin/profile">

              <FaUserCircle className="h-5 w-5" />
            </Link>
          </button>


          <Dropdown
            button={
              <p className="cursor-pointer p-1 rounded-full bg-gray-100 text-blue-800 hover:bg-blue-800 hover:text-white transition">
                <IoMdLogOut className="h-4 w-4" />
              </p>
            }
            classNames={'py-2 top-8 -left-[180px] w-max'}
            animation="origin-[75%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
          >
            <div className="flex h-24 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="ml-4 mt-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    👋 Hey, {user?.name}
                  </p>{' '}
                </div>
              </div>
              <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="ml-4 mt-3 flex flex-col">
                <button
                  onClick={() => handleLogout(router)}
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500 self-start"
                >
                  Log Out
                </button>

              </div>
            </div>
          </Dropdown>
          <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>

        </div>
      </nav>


    </>


  );
};

export default Navbar;