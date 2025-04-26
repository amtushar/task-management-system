import usersApi from '@/api/user/userApi';
import { User, UserProfileProps, Users } from '@/types/users';
import { message } from 'antd';

const updateUser = async (request: Users) => {
  //    e.preventDefault();

  const UserAPI = new usersApi();
  // const dispatch = useDispatch<AppDispatch>();

  const userDetails = {
    name: request.name,
    email: request.email,
    contact: request.contact
  }


  const output = await UserAPI.UpdateUser( { userID: request.userID}, userDetails, "updateProfile");
  if (output.output.outputResponse) {
    return output.output.outputResponse;
  } else {
    return -1;
  }

}

export const handleSaveClick = async (e: any, userData: any, setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>, phoneInputError: string, formSubmitted: boolean) => {
  // Logic to save changes goes here
  e.preventDefault();

  if(phoneInputError || formSubmitted){
    return [];
  }
  
  message.info('processing request, kindly wait!')
  const output = await updateUser(userData)

 
  setFormSubmitted(true);
  if (output?.modifiedCount >= 0) {


    setTimeout(() => {
      message.success('Profile Updated Sucessfully!').then(()=>{
        setFormSubmitted(false);
      })
    }, 3000)

  } else {
    setTimeout(() => {
      message.error('Email or Contact already exists!')
    }, 3000)

  }

};





