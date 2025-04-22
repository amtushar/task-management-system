import { User } from "@/types/users";
import { task } from "@/types/task";
import { getDoneTasks, getMissedTasks, getTasks } from "../tasks/tasks";
import { getUsers } from "../users/viewusers";

type DataType = User[] | task[];

export const handlePageClick = async <T extends DataType>(dataFrom: string, setData: React.Dispatch<React.SetStateAction<T>>,
    setPages: React.Dispatch<React.SetStateAction<number[]>>,
    page: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>, pages: number[],
     setIsNextDisabled: React.Dispatch<React.SetStateAction<boolean>>,
     setIsPrevDisabled: React.Dispatch<React.SetStateAction<boolean>>
    ) => {

    if (page == 1) {
      setIsNextDisabled(false);  
      setIsPrevDisabled(true);
      setCurrentPage(page);
    } else if (pages[pages.length - 1] === page) {
      setIsPrevDisabled(false);
      setIsNextDisabled(true);
      setCurrentPage(page);
    } else {
        setIsPrevDisabled(false);
        setIsNextDisabled(false);
        setCurrentPage(page);
    }

    if (dataFrom === "users") {
        getUsers(setData as React.Dispatch<React.SetStateAction<any[]>>, setPages, page, false);
      } 
      else if (dataFrom === "missedTasks") {
        getMissedTasks(setData as React.Dispatch<React.SetStateAction<task[]>>, setPages, page, false);
      }
      else if (dataFrom === "doneTasks") {
        getDoneTasks(setData as React.Dispatch<React.SetStateAction<task[]>>, setPages, page, false);
      }
      else if (dataFrom === "ongoingTasks") {
        getTasks(setData as React.Dispatch<React.SetStateAction<task[]>>, setPages, page, false);
      }

}

export const handleNextClick = async <T extends DataType>(dataFrom: string, setData: React.Dispatch<React.SetStateAction<T>>,
    setPages: React.Dispatch<React.SetStateAction<number[]>>,
    page: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>, pages: number[],
    setIsNextDisabled: React.Dispatch<React.SetStateAction<boolean>>, setIsPrevDisabled: React.Dispatch<React.SetStateAction<boolean>>

) => {

    setIsPrevDisabled(false);

    if (pages[pages.length - 1] === page) {
        setIsNextDisabled(true);
        setCurrentPage(page);
    } else {
        setIsNextDisabled(false);
        setCurrentPage(page);
    }

    if (dataFrom === "users") {
        getUsers(setData as React.Dispatch<React.SetStateAction<any[]>>, setPages, page, false);
      } 
      else if (dataFrom === "missedTasks") {
        getMissedTasks(setData as React.Dispatch<React.SetStateAction<task[]>>, setPages, page, false);
      }
      else if (dataFrom === "doneTasks") {
        getDoneTasks(setData as React.Dispatch<React.SetStateAction<task[]>>, setPages, page, false);
      }
      else if (dataFrom === "ongoingTasks") {

        getTasks(setData as React.Dispatch<React.SetStateAction<task[]>>, setPages, page, false);
      }

}


export const handlePrevClick = async <T extends DataType>(dataFrom: string, setData: React.Dispatch<React.SetStateAction<T>>,
    setPages: React.Dispatch<React.SetStateAction<number[]>>,
    page: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    setIsPrevDisabled: React.Dispatch<React.SetStateAction<boolean>>, setIsNextDisabled: React.Dispatch<React.SetStateAction<boolean>>

) => {

    setIsNextDisabled(false);

    if (page === 1) {
        setIsPrevDisabled(true);
        setCurrentPage(page);
    } else {
        setIsPrevDisabled(false);
        setCurrentPage(page);
    }

    if (dataFrom === "users") {
        getUsers(setData as React.Dispatch<React.SetStateAction<any[]>>, setPages, page, false);
      } 
      else if (dataFrom === "missedTasks") {
        getMissedTasks(setData as React.Dispatch<React.SetStateAction<task[]>>, setPages, page, false);
      }
      else if (dataFrom === "doneTasks") {
        getDoneTasks(setData as React.Dispatch<React.SetStateAction<task[]>>, setPages, page, false);
      }
      else if (dataFrom === "ongoingTasks") {
        getTasks(setData as React.Dispatch<React.SetStateAction<task[]>>, setPages, page, false);
      }
      

    
}