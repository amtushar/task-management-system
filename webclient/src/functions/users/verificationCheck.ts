import usersApi from "@/api/user/userApi";
import { isVerified } from "@/types/users";

// for verification check
export const verificationCheck = async (request: string) => {
    // try {
    //     const UserApi = new usersApi();
    //     const output = await UserApi.userVerificationCheck({ emailToken: request });
    //     return output;
    // } catch (error) {
    //     console.error("error", error);
    // }
};

//for updating isVerified to true

export const handleUpdate = async(email: string, field: isVerified) => {

    try {
        // const UserApi = new usersApi();
        //  await UserApi.MarkVerifiedUser({email: email}, field)
        
    } catch (error) {
        console.log('error', error)
    }

}

