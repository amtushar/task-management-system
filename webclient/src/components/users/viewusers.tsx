'use client'
import React, { useEffect, useState } from 'react'
import { Member } from '@/types/users';
import 'react-phone-input-2/lib/style.css'
import { getUsers } from '@/functions/users/viewusers';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import Image from 'next/image';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { handleNextClick, handlePageClick, handlePrevClick } from '@/functions/common/handlePagination';

const Viewusers = () => {

  const [users, setUsers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);


  const user = useSelector((state: RootState) => state?.user?.userRole);
  const [pages, setPages] = useState<number[]>([]);

  const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(true);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);



  useEffect(() => {
    if (user) {
      setLoading(true);
      getUsers(setUsers, setPages, currentPage, true).then(() => {
        setLoading(false);
      });
    }
  }, [user]);



  return (
    <>
      <div className="rounded-lg border mt-4 py-4  border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 px-2">
          Team Members
        </h2>
        <div className="overflow-x-auto rounded-t-lg">


          <table className="min-w-full divide-y-2 divide-gray-200 bg-white dark:bg-navy-700 text-sm">
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Member Name</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Email</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Contact</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Task Assigned</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Task Done</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Efficiency</th>

              </tr>
            </thead>


            {loading ? (
              <tbody className='h-64'>
                <tr>
                  <td
                    colSpan={5}
                    className="text-center min-h-[200px] bg-white dark:bg-navy-700"
                  >
                    <div className="flex justify-center items-center h-full">
                      <Image src={"http://localhost:3000/loader.gif"} alt="loading gif" height={30} width={30} />
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : users && users.length > 0 ? (
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.userID}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {user.contact}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {user.taskAssigned}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {user.taskDone}
                    </td>
                    <td
                      className={`whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 ${user.taskAssigned > 0
                        ? (user.taskDone / user.taskAssigned) * 100 <= 40
                          ? 'bg-red-500 text-white'
                          : (user.taskDone / user.taskAssigned) * 100 < 70
                            ? 'bg-yellow-400 text-black'
                            : 'bg-green-500 text-white'
                        : ''
                        }`}
                    >
                      {user.taskAssigned > 0
                        ? `${(user.taskDone / user.taskAssigned * 100).toFixed(0)}%`
                        : 'NA'}
                    </td>



                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody className='h-64'>
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No Tasks available
                  </td>
                </tr>
              </tbody>
            )}

          </table>
        </div>

        {pages.length > 1 &&
          <div className='flex justify-center gap-x-3 text-lg mt-2'>
            <button className={`${isPrevDisabled ? "text-brandLinear" : "text-blueSecondary"}`}
              onClick={!isPrevDisabled ? () => handlePrevClick("users", setUsers, setPages, currentPage - 1, setCurrentPage, setIsPrevDisabled, setIsNextDisabled) : undefined}
            >
              <IoIosArrowDropleftCircle />
            </button>
            {pages.map((page: number) => {
              return <div key={page}>
                <button
                  className={`${currentPage == page ? "bg-blueSecondary text-white rounded-full w-7 h-7 text-sm" : "text-gray-500 text-sm  hover:bg-brandLinear hover:text-white rounded-full w-7 h-7 "}`}
                  onClick={() => handlePageClick("users", setUsers, setPages, page, setCurrentPage, pages, setIsNextDisabled, setIsPrevDisabled)}
                >{page}</button>
              </div>
            })}
            <button
              className={`${isNextDisabled ? "text-brandLinear" : "text-blueSecondary"}`}
              onClick={!isNextDisabled ? () => handleNextClick("users", setUsers, setPages, currentPage + 1, setCurrentPage, pages, setIsNextDisabled, setIsPrevDisabled) : undefined}
            >
              <IoIosArrowDroprightCircle />
            </button>
          </div>
        }


      </div>
    </>
  )
}

export default Viewusers;