/**
 * Home
 */

// Dependencies
import React, { useEffect } from "react";
// import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

// Custom
import axios from "../functions/server";
import {
  enableLoading,
  disableLoading,
  showSnackbar,
} from "../store/features/app";

// Getting Specific Routes
import routes from "../config/routes.js";
const { site: { getIndex } } = routes;
function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getHome = () => {
      dispatch(enableLoading());
      axios[getIndex.method](
        getIndex.path
      )
        .then((res) => {
          dispatch(showSnackbar({ message: res.data.message, type: 'success' }))
          dispatch(disableLoading())
        })
        .catch((err) => {
          console.log(err.response);
          dispatch(disableLoading())
          dispatch(showSnackbar({ message: err.response.data.error.message }))
        })
    };
    getHome();
  }, [])

  return <div className="h-full w-full">
    Home
  </div>;
}

export default Home;
