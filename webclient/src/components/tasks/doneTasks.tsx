'use client'
import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { getDoneTasks } from '@/functions/tasks/tasks';
import { handleNextClick, handlePageClick, handlePrevClick } from '@/functions/common/handlePagination';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import Image from 'next/image';
import TaskDescriptionModal from './desc';


const DoneTasks = () => {


  const [donetasks, setDoneTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(true);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [taskDescription, setTaskDescription] = useState<string>("");

  const user = useSelector((state: RootState) => state?.user?.userRole); 



  useEffect(() => {
    setLoading(true);
    if (user) {
      getDoneTasks(setDoneTasks, setPages, 1, true).then(()=>{
      setLoading(false);
      });
    }
  }, [user]);


  const handleDescClick = (description: string) => {
    setTaskDescription(description);
    setIsModalVisible(true);
};

const handleCloseModal = () => {
    setIsModalVisible(false);
    setTaskDescription("");
};



  return (
    <>
      <div className="rounded-lg border mt-4 py-4  border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 px-2">
          Task Done On Time
        </h2>
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white dark:bg-navy-700 text-sm">
            <thead className="text-left">
              <tr>
              {user === "TeamLead" &&  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">assigned to</th> }
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Task Name</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Description</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Deadline</th>

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
                      <Image src={"https://task-management-system-7crt.vercel.app/loader.gif"} alt="loading gif" height={30} width={30} />
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : donetasks && donetasks.length > 0 ? (
              <tbody className="divide-y divide-gray-200">
                {donetasks.map((donetasks) => (
                  <tr key={donetasks.taskID}>
                    {user === "TeamLead" && <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {donetasks.assignedTo.userName}
                    </td>}
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                      {donetasks.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {donetasks.description.length >= 18 ? (
                        <>
                          {`${donetasks.description.slice(0, 18)}...`}
                          <button className='text-blue-400 hover:text-blue-300 hover:underline' onClick={() => handleDescClick(donetasks.description)}>show</button>
                        </>
                      ) : (
                        donetasks.description
                      )}
                      </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {donetasks.deadline}
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
              onClick={!isPrevDisabled ? () => handlePrevClick("doneTasks", setDoneTasks, setPages, currentPage - 1, setCurrentPage, setIsPrevDisabled, setIsNextDisabled) : undefined}
            >
              <IoIosArrowDropleftCircle />
            </button>
            {pages.map((page: number) => {
              return <div key={page}>
                <button
                  className={`${currentPage == page ? "bg-blueSecondary text-white rounded-full w-7 h-7 text-sm" : "text-gray-500 text-sm  hover:bg-brandLinear hover:text-white rounded-full w-7 h-7 "}`}
                  onClick={() => handlePageClick("doneTasks", setDoneTasks, setPages, page, setCurrentPage, pages, setIsNextDisabled, setIsPrevDisabled)}
                >{page}</button>
              </div>
            })}
            <button
              className={`${isNextDisabled ? "text-brandLinear" : "text-blueSecondary"}`}
              onClick={!isNextDisabled ? () => handleNextClick("doneTasks", setDoneTasks, setPages, currentPage + 1, setCurrentPage, pages, setIsNextDisabled, setIsPrevDisabled) : undefined}
            >
              <IoIosArrowDroprightCircle />
            </button>
          </div>
        }

      </div>

      <TaskDescriptionModal
                isVisible={isModalVisible}
                description={taskDescription}
                onClose={handleCloseModal}
            />
    </>
  )
}

export default DoneTasks
