import { UnauthenticatedError, UnauthorizedError, BadRequestError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, resizeBy, next) => {
    const {token} = req.cookies;
    if (!token) throw new UnauthenticatedError('authentication invalid')
        
        // VERIFY JWT IS VALID
    try {
    const {userId, role} = verifyJWT(token);
    const testUser = userId === "686e7bbc045b5db5952e66ea";
    req.user = { userId, role, testUser};
    next();
    } catch (error) {
        throw new UnauthenticatedError('authentication invalid')
    }
}

// TO DON'T ALLOW TO REACH OUT THE INFORMATION EXCEPT ADMIN
export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            throw new UnauthorizedError('Unauthorized to access this route')
        }
        next();
    };
};

export const checkForTestUser = (req, res, next) => {
    if (req.user.testUser) throw new BadRequestError ('Demo User. READ ONLY!'); 
      next();  
}