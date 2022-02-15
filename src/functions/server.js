/**
 * Setting Up Base URL and other axios settings
 */

// Dependencies
import axios from "axios";
import config from "../config";

axios.defaults.baseURL = config.backendUrl;

export default axios;

// Axios Client
const client = axios.create({ baseURL: config.backendUrl });

// Custom Axios Interceptor
export const server = ({ ...options }) => {
    client.defaults.headers.common.Authorization = "Bearer {Token}"; //Fetch from local storage
    const onSuccess = (response) => response.data;
    const onError = (error) => {
        if (error.isAxiosError && !error.response) {
            return error.toJSON().message;
        }
        if (error.response) {
            return error.response.data;
        }
        return error;
    };
    return client(options).then(onSuccess).catch(onError);
};