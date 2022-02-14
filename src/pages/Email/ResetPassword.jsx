/**
 * Reset User Password With Information sent in Email
 */

// Dependencies
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

// Actions
import {
    enableLoading,
    disableLoading,
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
        dispatch(enableLoading());
        try {
            const isValid = await authenticateResetPasswordLink({ authToken });
            setAuthenticated(isValid);
        } catch (error) {
        } finally {
            dispatch(disableLoading());
        }
    };

    // Handle Reset Password Submission
    const handleResetPassword = async (e) => {
        e.preventDefault();
        dispatch(enableLoading());
        if (password !== reenterPassword) {
            dispatch(showSnackbar({ message: 'Password does not match' }));
            setPassword('');
            setReenterPassword('');
            dispatch(disableLoading());
            return;
        }
        const passwordUpdated = await resetUserPassword({ authToken, password });
        if (!passwordUpdated) {
            dispatch(showSnackbar({ message: 'Unable to update password at the moment' }));
            dispatch(disableLoading());
            return;
        }
        dispatch(showSnackbar({ message: 'Password Updated Successfully', type: 'success' }));
        dispatch(disableLoading());
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
                        <button
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ResetPassword;
