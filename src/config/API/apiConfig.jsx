import API_LOCAL from './apiLocal';
import API_PROD from './apiProd';
const hostname = window.location.hostname;
const port = window.location.port;
let isLocalApi =  +port >= 3001;

export const API =
    (hostname === 'localhost' && isLocalApi) ? API_LOCAL : API_LOCAL