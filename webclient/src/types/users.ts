


export interface Users{

    userID: string;
    name: string;
    email: string;
    contact: string;
    userRole?: string;
    emailToken?: string;
    taskAssigned: number;
    taskDone: number
    
}

export interface User {
    userID: string;
    name: string;
    email: string;
    password?: string;
    contact: string;

}

export interface Member {
  userID: string;
  name: string;
  email: string;
  taskAssigned: number;
  taskDone: number,
  missedTasks?: number,
  efficiency?: number,
  password?: string;
  contact: string;

}
export interface GetMember {
  userID: string;
  name: string;

}

// interface for login
export interface UserData {
    email: string;
    password: string;
    
  }

  // Define a type for the state management functions
export interface UserSubmitProps {
    resetForm: () => void;
  }

  export interface UserProfileProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  }





  export interface isVerified {
    isVerified: boolean,
    emailToken: string,
  }