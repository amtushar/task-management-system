
import usersApi from '@/api/user/userApi';
import { UserData } from '@/types/users';

const handleLogin = async (request: UserData,
     setInvalidCredentials:React.Dispatch<React.SetStateAction<boolean>> ) => {
    const userAPI = new usersApi();

    try {
        const response = await userAPI.LoginUser({
            email: request.email,
            password: request.password
        });

        console.log('response.message', response);
        if (response?.output?.outputResponse) {
            return {
                success: true,
                data: response.output.outputResponse
            };
        } else {
           
         
          if (response.output.apiResponse.message === 'Password Not Matched!') {
                setInvalidCredentials(true);
            } 

           
             return {
                success: false,
            };
        }
    } catch (error) {
        console.error('Login error:', error);
        setInvalidCredentials(true);
        return {
            success: false,
            message: 'An unexpected error occurred. Please try again later.'
        };
    }
};

export default handleLogin;

