const PERMISSIONS = require('../schemas/user/permissions');
const engine = require('../utils/engine.util');

const checkPermission = async (req, res, next) => {
    try {
        const userRole = req.user.userRole; 
        if (userRole == "TeamLead") {
            return next();
        }
        const rolePermissions = PERMISSIONS[userRole] || [];
        const requestedPermission = req?.body?.permission || req?.query?.permission;
        if (!rolePermissions.includes(requestedPermission)) {
            const stucturedResponse = engine.generateServiceResponse(null, req.method, 403, req.originalUrl, 'Access Denied.');
            return res.json(stucturedResponse);
        }
        next();

    } catch (error) {
        const stucturedResponse = engine.generateServiceResponse(null, req.method, 500, req.originalUrl, error.message);
        res.json(stucturedResponse);
    }

}
 
module.exports = checkPermission;