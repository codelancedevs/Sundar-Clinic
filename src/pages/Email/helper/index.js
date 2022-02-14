/**
 * Helper Functions for Email Related Pages
 */

// Dependencies
import axios from "axios";
import routes from "../../../config/routes";

// Getting Required Rotes
const {
    user: { authenticateVerifyAccountEmail },
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
    if(!authenticate.data.success) throw new Error('Not Authenticated and unable to verify user account');
    return authenticate.data.data;
};
