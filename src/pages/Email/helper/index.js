/**
 * Helper Functions for Email Related Pages
 */

// Dependencies
import { server } from "../../../functions/server";
import routes from "../../../config/routes";

// Getting Required Rotes
const {
    user: {
        authenticateVerifyAccountEmail,
        authenticateResetPasswordEmail,
        resetPassword,
    },
} = routes;

/**
 * @description Authenticate Verify User Link
 * @param {string} authToken
 * @returns {object} User Data (if verified);
 */
export const authenticateVerifyAccountLink = async ({ authToken }) => {
    try {
        const authenticate = await server({ ...authenticateVerifyAccountEmail, data: { authToken } });
        console.log(authenticate)
        return authenticate;
    } catch (error) {
        console.log(error)
        return error;
    }
}

/**
 * @description Authenticate Reset Password Link
 * @param {string} authToken
 * @returns {object} If valid, then true else throws error
 */
export const authenticateResetPasswordLink = async ({ authToken }) => {
    try {
        const authenticate = await server({ ...authenticateResetPasswordEmail, data: { authToken } });
        console.log(authenticate)
        return authenticate;
    } catch (error) {
        console.log(error)
        return error;
    }
};

/**
 * @description Reset password
 * @param {string} authToken
 * @param {string} password
 * @returns {promise} If changed, then true, else false
 */
export const resetUserPassword = async ({ authToken, password }) => {
    try {
        const response = await server({ ...resetPassword, data: { authToken, password } });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}
