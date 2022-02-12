/**
 * Setting Up Base URL and other axios settings
 */

// Dependencies
import axios from 'axios';
import config from '../config';

const server = axios.create({ baseURL: config.backendUrl })

export default server;
