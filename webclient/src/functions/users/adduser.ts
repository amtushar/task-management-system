import usersApi from "@/api/user/userApi";
import { User, UserSubmitProps } from "@/types/users";
import { message } from "antd";
import { v4 as uuidv4 } from "uuid";

export const handleUserSubmit = (e: React.FormEvent<HTMLFormElement>,
  data: User, password: string, confirmPassword: string, phoneInputError: string, { resetForm }: UserSubmitProps, userid: string, username: string) => {
  e.preventDefault();
  console.log('phoneinput', phoneInputError);


  if (password !== confirmPassword) {
    message.info('Password does not match!');
  }
  else if (phoneInputError.length != 0) {
    message.info('Invalid Phone Format!');
  }
  else {
    handleSubmit(data, { resetForm }, userid, username);
  }


}

const handleSubmit = async (request: User, { resetForm }: UserSubmitProps, userid: string, username: string) => {

  try {
    message.info('Processing Request, Kindly wait!');
    const UserApi = new usersApi();

    const userData = {

      userID: uuidv4(),
      name: request.name,
      email: request.email,
      contact: request.contact,
      password: request.password,
      emailToken: uuidv4(),

    }

    const output = await UserApi.checkAndCreateUsers({ data: userData, permission: 'addUser' });


    if (output?.output.outputResponse.length == 1) {
      resetForm();
      setTimeout(() => {
        message.success('Member Created Successfully!')
      }, 2500)
    } else {
      setTimeout(() => {
        message.error('Member Already Exists!')
      }, 3000)
    }


  } catch (error) {
    console.log('error', error);
    return error;
  }


}


export const handleUserRole = (e: React.ChangeEvent<HTMLSelectElement>,
  setUserRole: React.Dispatch<React.SetStateAction<string>>,
  resetUserRole: () => void
) => {

  setUserRole(e.target.value);
  resetUserRole();
}




// password validity check
export const validatePassword = (password: string): string => {
  if (password.length < 8) return 'Password must be at least 8 characters'
  if (!/[A-Z]/.test(password)) return 'Must contain an uppercase letter'
  if (!/[a-z]/.test(password)) return 'Must contain a lowercase letter'
  if (!/\d/.test(password)) return 'Must contain a number'
  if (!/[!@#$%^&*]/.test(password)) return 'Must contain a special character'
  return ''
};