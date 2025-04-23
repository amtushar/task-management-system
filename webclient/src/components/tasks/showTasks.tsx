'use client'
import React, { useRef } from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { getTasks } from '@/functions/tasks/tasks';
import { message, Modal } from 'antd';
import taskApi from '@/api/task/taskApi';
import Image from 'next/image';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { handleNextClick, handlePageClick, handlePrevClick } from '@/functions/common/handlePagination';
import TaskDescriptionModal from './desc';


const ShowTasks = () => {

  const [tasks, setTasks] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [doneModalOpen, setDoneModalOpen] = useState<boolean>(false);
  const [doneTaskID, setDoneTaskID] = useState<string>("");
  const [userID, setUserID] = useState<string>("");

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteTaskID, setDeleteTaskID] = useState<string>("");
  const [deleteUserID, setDeleteUserID] = useState<string>("");

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [taskDescription, setTaskDescription] = useState<string>("");

  const [pages, setPages] = useState<number[]>([]);
  const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(true);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);
  const userRole = useSelector((state: RootState) => state.user.userRole);
  const [updated, setUpdated] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);


  // Handle task click
  const handleDescClick = (description: string) => {
    setTaskDescription(description);
    setIsModalVisible(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setTaskDescription("");
  };

  useEffect(() => {
    if (updated) {
      setLoading(true);
      getTasks(setTasks, setPages, currentPage, true).then(() => {
        setLoading(false);
        setUpdated(false);
      });
    }
  }, [updated]);





  const showDoneModal = (taskID: string, userID: string) => {
    setUserID(userID);
    setDoneTaskID(taskID);
    setDoneModalOpen(true);
  }

  const showDeleteModal = (taskID: string, userID: string) => {
    setDeleteTaskID(taskID);
    setDeleteUserID(userID);
    setDeleteModalOpen(true);
  }


  const handleDoneCancel = () => {
    setDoneModalOpen(false);
  };
  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  const handleDone = async (e: any, taskID: string, userID: string) => {
    e.preventDefault();
    setDoneModalOpen(false);
   
    message.info('processing request, kindly wait!')
    setIsClicked(true);

    const TaskApi = new taskApi();
    const output = await TaskApi.UpdateTask({ taskID: taskID, status: "Done", userID: userID, permission: "markTaskDone" });
    setTimeout(() => {
      if (output?.output?.outputResponse?.modifiedCount == 1) {
        setUpdated(true);
        message.success("Task updated successfully!");
      } else {
        message.error("Task updation failed!");
      }
    }, 2000);

  }
  const handleDelete = async (e: any, taskID: string, userID: string) => {
    e.preventDefault();
    setDeleteModalOpen(false);
    message.info('processing request, kindly wait!')
    const TaskApi = new taskApi();
    const output = await TaskApi.DeleteTask({ taskID: taskID, userID: userID });
   
    setTimeout(() => {
      if (output?.output?.outputResponse?.updateUserOutput.modifiedCount == 1) {
        setUpdated(true);
        message.success("Task Deleted successfully!");
      } else {
        message.error("Task Deletion failed!");
      }
    }, 2000);

  }

  return (
    <>
      <div className="rounded-lg border mt-4 py-4  border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 px-2">
                    Active Tasks
                </h2>
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white dark:bg-navy-700 text-sm">
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">assigned to</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Task Name</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Description</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Deadline</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Action</th>

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
            ) : tasks && tasks.length > 0 ? (
              <tbody className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.taskID}>
                    {userRole === "TeamLead" && <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {task.assignedTo.userName}
                    </td>}
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                      {task.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {task.description.length >= 18 ? (
                        <>
                          {`${task.description.slice(0, 18)}...`}
                          <button className='text-blue-400 hover:text-blue-300 hover:underline' onClick={() => handleDescClick(task.description)}>show</button>
                        </>
                      ) : (
                        task.description
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {task.deadline}
                    </td>
                    {userRole === "TeamLead" ? <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      <button className='bg-red-500 px-2 py-1 rounded-md text-white' onClick={() => showDeleteModal(task.taskID, task.assignedTo.userID)} >Delete</button>
                    </td>
                      :
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                        <button className='bg-green-500 px-2 py-1 rounded-md text-white' onClick={() => showDoneModal(task.taskID, task.assignedTo.userID)} >Done</button>
                      </td>}

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
              onClick={!isPrevDisabled ? () => handlePrevClick("ongoingTasks", setTasks, setPages, currentPage - 1, setCurrentPage, setIsPrevDisabled, setIsNextDisabled) : undefined}
            >
              <IoIosArrowDropleftCircle />
            </button>
            {pages.map((page: number) => {
              return <div key={page}>
                <button
                  className={`${currentPage == page ? "bg-blueSecondary text-white rounded-full w-7 h-7 text-sm" : "text-gray-500 text-sm  hover:bg-brandLinear hover:text-white rounded-full w-7 h-7 "}`}
                  onClick={() => handlePageClick("ongoingTasks", setTasks, setPages, page, setCurrentPage, pages, setIsNextDisabled, setIsPrevDisabled)}
                >{page}</button>
              </div>
            })}
            <button
              className={`${isNextDisabled ? "text-brandLinear" : "text-blueSecondary"}`}
              onClick={!isNextDisabled ? () => handleNextClick("ongoingTasks", setTasks, setPages, currentPage + 1, setCurrentPage, pages, setIsNextDisabled, setIsPrevDisabled) : undefined}
            >
              <IoIosArrowDroprightCircle />
            </button>
          </div>
        }


      </div>

      <Modal
        width={400}
        centered={true}
        open={doneModalOpen}
        okText="Done"
        onOk={(e) => {
          handleDone(e, doneTaskID, userID);
        }}
        onCancel={handleDoneCancel}

        okButtonProps={{
          className:
            "hover:!text-[#ffffff]  hover:!border-[#9ceb1c] !bg-[#9ceb1c] text-black hover:!text-white",
        }}
      >
        <div>Are you sure, you want to mark this task as Done?</div>
      </Modal>
      <Modal
        width={400}
        centered={true}
        open={deleteModalOpen}
        okText="Delete"
        onOk={(e) => {
          handleDelete(e, deleteTaskID, deleteUserID);
        }}
        onCancel={handleDeleteCancel}

        okButtonProps={{
          className:
            "hover:!text-[#ffffff]  hover:!border-[#ff0000] !bg-[#ff0000] text-black hover:!text-white",
        }}
      >
        <div>Are you sure, you want to delete this task?</div>
      </Modal>

      <TaskDescriptionModal
        isVisible={isModalVisible}
        description={taskDescription}
        onClose={handleCloseModal}
      />

   
    </>
  )
}

export default ShowTasks
