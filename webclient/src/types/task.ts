
interface assignedTo{
    userID: string,
    userName: string
}

export interface task {

    taskID: string,
    name: string,
    description: string,
    deadline: string,
    assignedTo: assignedTo

}

