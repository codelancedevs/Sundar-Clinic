/**
 * Setting Up Base URL and other axios settings
 */

// Dependencies
import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.backendUrl;

export default axios;
