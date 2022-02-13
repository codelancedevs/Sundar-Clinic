/**
 * Backdrop Component
 */

// Dependencies
import React from "react";
import { useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function BackdropComponent() {
    const { showLoading } = useSelector((state) => state.app.value);

    return (
        <Backdrop className="z-50 text-white" open={showLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default BackdropComponent;
