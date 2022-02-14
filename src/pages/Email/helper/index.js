/**
 * Helper Functions for Email Related Pages
 */

// Dependencies
import axios from "axios";
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
    const authenticate = await axios[authenticateVerifyAccountEmail.method](
        authenticateVerifyAccountEmail.path,
        { authToken }
    );
    if (!authenticate?.data?.success)
        throw new Error("Not Authenticated and unable to verify user account");
    return authenticate.data.data;
};

/**
 * @description Authenticate Reset Password Link
 * @param {string} authToken
 * @returns {object} If valid, then true else throws error
 */
export const authenticateResetPasswordLink = async ({ authToken }) => {
    const authenticate = await axios[authenticateResetPasswordEmail.method](
        authenticateResetPasswordEmail.path,
        { authToken }
    );
    if (!authenticate?.data?.success)
        throw new Error("Not Authenticated and unable to reset password");
    return authenticate.data.data.isValid;
};

/**
 * @description Reset password
 * @param {string} authToken
 * @param {string} password
 * @returns {promise} If changed, then true, else false
 */
export const resetUserPassword = async ({authToken, password}) => {
    const response = await axios[resetPassword.method](resetPassword.path, {authToken, password});
    console.log(response.data)
    if (!response?.data?.success) return false;
    return response.data.success
}
