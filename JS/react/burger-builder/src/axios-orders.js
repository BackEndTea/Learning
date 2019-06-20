import axios from 'axios';
import info from './info';

const instance = axios.create({baseURL: info.baseUrl});

export default instance;
