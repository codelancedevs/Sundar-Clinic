/**
 * Verify User Account With Information sent in Email
 */

// Dependencies
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

// Actions
import {
    loading,
    showSnackbar,
} from "../../store/features/app";
import { login } from "../../store/features/user";

// Helper Functions
import { authenticateVerifyAccountLink } from "./helper";

function VerifyAccount() {
    // const {user, loggedIn} = useSelector((state) => state.user)
    const { authToken } = useParams();
    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState(false);

    // Function to Verify link validity
    const authenticateVerifyUser = async () => {
        dispatch(loading(true));
        try {
            const {success, message, data} = await authenticateVerifyAccountLink({ authToken });
            if (!success) throw new Error(message);
            setAuthenticated(true);
            dispatch(showSnackbar({ message: message, type: "success" }));
            dispatch(
                login({ user: data.user, loggedInAs: data.user.role })
            );
        } catch (error) {
            dispatch(showSnackbar({ message: error.message }));
        } finally {
            dispatch(loading(false));
        }
    };

    useEffect(() => {
        authenticateVerifyUser();
    }, []);

    return (
        <div className="h-full w-full">
            {authenticated ? (
                <div>Account verified</div>
            ) : (
                <div>Not verified, try again</div>
            )}
        </div>
    );
}

export default VerifyAccount;
