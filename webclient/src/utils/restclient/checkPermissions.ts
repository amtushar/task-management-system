// utils/checkPermission.ts
import { PERMISSIONS } from "./permissions";

export const checkPermission = (requiredPermission: string, userRole: string | undefined): boolean => {

    // Grant access for SuperAdmin and Marriage HallAdmin roles
    if (userRole === "SuperAdmin" || userRole === "Marriage HallAdmin") {
        return true;
    }

    // Get the permissions associated with the user's role
    const permissions = PERMISSIONS[userRole as keyof typeof PERMISSIONS];

    // Return true if the required permission is "ALL" or it exists in the user's permissions
    return(permissions && permissions.includes(requiredPermission));
};
