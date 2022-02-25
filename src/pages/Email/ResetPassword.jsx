/**
 * Reset User Password With Information sent in Email
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

// Helper Functions
import { authenticateResetPasswordLink, resetUserPassword } from "./helper";

function ResetPassword() {
    // const {user, loggedIn} = useSelector((state) => state.user)
    const { authToken } = useParams();
    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");

    // Function to Verify link validity
    const authenticateResetPassword = async () => {
        dispatch(loading(true));
        try {
            const response = await authenticateResetPasswordLink({ authToken });
            if (!response.success) throw response;
            setAuthenticated(true);
            dispatch(showSnackbar({ message: response.message, type: "success" }));
        } catch (error) {
            dispatch(showSnackbar({ message: error.message }));
        } finally {
            dispatch(loading(false));
        }
    };

    // Handle Reset Password Submission
    const handleResetPassword = async (e) => {
        e.preventDefault();
        dispatch(loading(true));

        try {
            if (password !== reenterPassword) {
                dispatch(showSnackbar({ message: "Password does not match" }));
                setPassword("");
                setReenterPassword("");
                return;
            }
            const response = await resetUserPassword({ authToken, password });
            if (!response.success) throw response;
            dispatch(showSnackbar({ message: response.message, type: 'success' }));
        } catch (error) {
            dispatch(showSnackbar({ message: error.message }));
        } finally {
            dispatch(loading(false));
        }
    };

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    };

    const handleReenterPasswordInput = (e) => {
        setReenterPassword(e.target.value);
    };

    useEffect(() => {
        authenticateResetPassword();
    });

    return (
        <div className="h-full w-full">
            {!authenticated ? (
                <div>Not allowed</div>
            ) : (
                <div>
                    <form onSubmit={handleResetPassword}>
                        <input
                            type="text"
                            onChange={handlePasswordInput}
                            placeholder="new password"
                        />
                        <input
                            type="text"
                            onChange={handleReenterPasswordInput}
                            placeholder="reenter new password"
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ResetPassword;
