import usersApi from "@/api/user/userApi"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleLogout = async (router: AppRouterInstance) => {

    const UserApi = new usersApi();

    await UserApi.LogoutUser().then(() => {
        router.push("/login/data");
    });


}