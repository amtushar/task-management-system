import taskApi from "@/api/task/taskApi";


const getPages = async (count: number) => {
  let arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push(i);
  }
  return arr;
}


export const getTasks = async (
  setTasks: React.Dispatch<React.SetStateAction<any[]>>,
  setPages: React.Dispatch<React.SetStateAction<number[]>>,
  currentPage: number,
  shouldSetPages: boolean
) => {
  const TaskAPI = new taskApi();

  const output = await TaskAPI.ReadTask({ filter: {}, page: currentPage, permission: "viewActiveTasks" });
  const getTasks = output?.output?.outputResponse;
  if(shouldSetPages && getTasks){
    const count = Math.ceil(output.output.totalCount / 10);
    const pages = await getPages(count);
    setPages(pages);
  }
  setTasks(getTasks);
     
};


export const getMissedTasks = async (setMissedTasks: React.Dispatch<React.SetStateAction<any[]>>,
   setPages: React.Dispatch<React.SetStateAction<number[]>>, currentPage: number, shouldSetPages: boolean) => {

  const TaskAPI = new taskApi();

  const output = await TaskAPI.ReadMissedTask({ filter: {}, permission: "viewMissedTasks", page: currentPage })
  const getMissed = output?.output?.outputResponse;
  if(shouldSetPages && getMissed){
    const count = Math.ceil(output.output.totalCount / 10);
    const pages = await getPages(count);
    setPages(pages);
  }
  setMissedTasks(getMissed);
}


export const getDoneTasks = async (setDoneTasks: React.Dispatch<React.SetStateAction<any[]>>,
   setPages: React.Dispatch<React.SetStateAction<number[]>>, currentPage: number, shouldSetPages: boolean) => {

  const TaskAPI = new taskApi();

  const output = await TaskAPI.ReadDoneTask({ filter: {}, permission: "viewDoneTasks", page: currentPage })
  const getDone = output?.output?.outputResponse;
  if(shouldSetPages && getDone){
    const count = Math.ceil(output.output.totalCount / 10);
    const pages = await getPages(count);
    setPages(pages);
  }
  
  setDoneTasks(getDone);
}