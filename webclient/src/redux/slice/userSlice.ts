import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Users } from "@/types/users";


const initialState: Users = {

    userID: "",
    name: "",
    email: "",
    contact: "",
    userRole: "",
    emailToken: "",
    taskAssigned: 0,
    taskDone: 0,
    
}

export const userSlice = createSlice ({
    name: "user",
    initialState,
    reducers: {
      currentUser: (state, action: PayloadAction<Users>) =>{
        if (!action.payload) return; // safely exit if payload is null or undefined
        const {userID, name, email, userRole, contact, emailToken, taskAssigned, taskDone} = action.payload;
        
        state.userID = userID;
        state.name = name;
        state.email = email;
        state.contact = contact;
        state.userRole = userRole;
        state.emailToken = emailToken;
        state.taskAssigned = taskAssigned;
        state.taskDone = taskDone;
       
        
      }
    }
})

export const {currentUser} = userSlice.actions;
export default userSlice.reducer;

