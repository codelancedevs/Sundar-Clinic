/**
 * Snackbar Component
 */

// Dependencies
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { hideSnackbar } from "../../store/features/app";
function SnackbarComponent() {
    const dispatch = useDispatch();
	const { snackbar } = useSelector((state) => state.app.value);
    
    return (
        <Snackbar
            open={snackbar.display}
            autoHideDuration={8000}
            onClose={() => dispatch(hideSnackbar())}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <Alert
                onClose={() => dispatch(hideSnackbar())}
                severity={snackbar.type}
                variant="standard"
                className="z-50 w-full"
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
}

export default SnackbarComponent;
