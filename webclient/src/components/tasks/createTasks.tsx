'use client'
import React, { useEffect, useState } from "react";
import { message } from "antd";
import taskApi from "@/api/task/taskApi";
import { v4 as uuidv4 } from "uuid"
import { RxCross2 } from "react-icons/rx";
import { handleInputChange, handleMemberClick, handleMemberSearch } from "@/functions/tasks/createTasks";


const CreateTaskForm = () => {
    const [taskName, setTaskName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [dueDate, setDueDate] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isMemberClicked, setIsMemberClicked] = useState<boolean>(false);
    const [members, setMembers] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedMember, setSelectedMember] = useState<string>("");
    const [selectedMemberSend, setSelectedMemberSend] = useState<any>({});

    const [messageApi, contextHolder] = message.useMessage();
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const TaskApi = new taskApi();



    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                handleMemberSearch(searchQuery, setLoading, setMembers, setError);
            } else {
                setMembers([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (isClicked) {
            return;
        }

        if (selectedMember == "Select a member") {
            messageApi.info("Please select a member")
            return;
        }
        if (!taskName || !description || !dueDate) {
            return;
        }

        const today = new Date().toISOString().split("T")[0];
        if (dueDate && today > dueDate) {
            messageApi.error("Deadline can't be past date.");
            return;
        }
        setIsClicked(true);
        message.info("Processing Request, Kindly Wait!")
        const taskDetails = {
            taskID: uuidv4(),
            name: taskName,
            description: description,
            deadline: dueDate,
            assignedTo: {
                userID: selectedMemberSend.userID,
                userName: selectedMemberSend.name
            }
        };


        const output = await TaskApi.checkAndCreateTask(taskDetails);
        setTimeout(() => {
            if (output?.output?.outputResponse?.length == 1) {
                messageApi.success("Task successfully created!");
                setTaskName("");
                setDescription("");
                setDueDate("");
                setSelectedMember("");
                setIsMemberClicked(false);
                setSelectedMemberSend({});
            } else {
                messageApi.error("Task Name Already Exists!");
            }
            setIsClicked(false);
        }, 2000);


    };

    const clearAssignToSelection = () => {
        setSelectedMember("");
        setIsMemberClicked(false);
    }

    return (
        <div className="flex flex-col ml-auto  mr-auto mt-4 xs:w-[90%] sm:w-[90%] 2xl:w-[90%]">
            <>
                {contextHolder}
                <div className="flex flex-col shadow-lg mb-6 bg-[#ffffff] bg-opacity-60 py-6 px-4 rounded-md animate_animated animate_fadeIn mt-2">
                    <p className="text-2xl font-semibold text-center">Create a Task</p>

                    <form
                        className="flex flex-col mt-5 space-y-4"
                        onSubmit={handleSubmit}
                    >
                        {/* Task Name */}
                        <div>
                            <label className="block text-gray-800 font-medium mb-1">Task Name</label>
                            <input
                                type="text"
                                placeholder="Enter task name"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                required
                                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:bg-navy-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-gray-800 font-medium mb-1">Description</label>
                            <textarea
                                placeholder="Enter task description"
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:bg-navy-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Due Date */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">Due Date</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 dark:bg-navy-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Assign To */}
                        <div>
                            <label htmlFor="membername" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                {isMemberClicked ? "Assigned Member" : "Search for Member"}
                            </label>

                            {/* Container with relative positioning */}
                            <div className="relative w-full sm:max-w-xs">
                                <input
                                    type="text"
                                    value={isMemberClicked ? selectedMember : searchQuery}
                                    onChange={(e) => handleInputChange(e, isMemberClicked, setSearchQuery)}
                                    className="block px-2 pr-8 w-full rounded-md border-0 py-1.5 text-gray-900 dark:!bg-navy-700 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Type member name..."
                                    required
                                />

                                {/* Cross button for clearing */}
                                {isMemberClicked && (
                                    <button
                                        type="button"
                                        onClick={clearAssignToSelection}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-800 dark:text-white hover:text-red-500"
                                    >
                                        <RxCross2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Member Dropdown Results */}
                            <div className="relative mt-2 w-full sm:max-w-xs">
                                <div className="absolute z-10 w-full bg-white dark:!bg-navy-700 shadow rounded-md">
                                    {loading && (
                                        <div className="p-2 text-sm text-gray-600 dark:text-white">
                                            Loading members...
                                        </div>
                                    )}

                                    {!loading && members.length > 0 && (
                                        <ul className="max-h-28 overflow-y-auto">
                                            {members.map(member => (
                                                <li
                                                    key={member.userID}
                                                    className="px-2 py-1 hover:bg-indigo-100 dark:hover:bg-navy-600 dark:text-white cursor-pointer"
                                                    onClick={() =>
                                                        handleMemberClick(
                                                            member,
                                                            setSelectedMemberSend,
                                                            setIsMemberClicked,
                                                            setSelectedMember,
                                                            setSearchQuery
                                                        )
                                                    }
                                                >
                                                    {member.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {!loading && !members.length && searchQuery && (
                                        <div className="p-2 text-sm text-gray-500 dark:text-white">
                                            No member found.
                                        </div>
                                    )}
                                </div>
                            </div>



                            {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: "#9ceb1c",
                                    borderColor: "#9ceb1c",
                                    padding: "8px 20px",
                                }}
                                className="text-white rounded hover:opacity-90"
                            >
                                Create Task
                            </button>
                        </div>
                    </form>

                </div>
            </>
        </div >
    );
};

export default CreateTaskForm;
