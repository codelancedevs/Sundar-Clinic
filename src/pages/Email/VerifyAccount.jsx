/**
 * Verify User Account With Information sent in Email
 */

// Dependencies
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

// Actions
import { enableLoading, disableLoading } from "../../store/features/app";

// Helper Functions
import { authenticateVerifyAccountLink } from "./helper";

function VerifyAccount() {
    const { authToken } = useParams();
    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState(false);

    // Function to Verify link validity
    const authenticateVerifyUser = async () => {
        dispatch(enableLoading());
        try {
            await authenticateVerifyAccountLink({ authToken });
            setAuthenticated(true);
        } catch (error) {
        } finally {
            dispatch(disableLoading());
        }
    };

    useEffect(() => {
        authenticateVerifyUser();
    });

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
