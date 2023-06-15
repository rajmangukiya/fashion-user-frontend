import { API } from '../config/API/apiConfig';
import axios from 'axios';
import AuthStorage from './AuthStorage';

export const BaseURL = API.endpoint + '/';

const defaultHeaders = {
    isAuth: true,
    AdditionalParams: {},
    isJsonRequest: true
};

export const ApiGet = (type) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BaseURL}${type}`, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson.data);
            })
            .catch((error) => {
                if (error?.response?.status === 401) {
                    // AuthStorage.deauthenticateUser();
                    window.location.href = "/"
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}


export const ApiGetNoAuth = (type) => {
    const s = type.includes('?') ? '&' : '?';
    return new Promise((resolve, reject) => {
        axios.get(`${BaseURL}${type}`, getHttpOptions({ ...defaultHeaders, isAuth: false }))
            .then((responseJson) => {
                resolve(responseJson.data);
            })
            .catch((error) => {
                if (error?.response?.status === 401) {
                    // AuthStorage.deauthenticateUser();
                    window.location.href = "/"
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}


export const ApiPost = (type, userData) => {
    return new Promise((resolve, reject) => {
        axios.post(`${BaseURL}${type}`, userData, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson.data);
            })
            .catch((error) => {
                if (error?.response?.status === 401) {
                    // AuthStorage.deauthenticateUser();
                    window.location.href = "/"
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}


export const ApiPostNoAuth = (type, userData) => {
    return new Promise((resolve, reject) => {
        axios.post(`${BaseURL}${type}`, userData, getHttpOptions({ ...defaultHeaders, isAuth: false }))
            .then((responseJson) => {
                resolve(responseJson.data);
            })
            .catch((error) => {
                if (error?.response?.status === 401) {
                    // AuthStorage.deauthenticateUser();
                    window.location.href = "/"
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('message') && error.response.data.message) {
                    reject(error.response.data.message);
                } else {
                    reject(error);
                }
            });
    });
}


export const ApiPatch = (type, userData) => {
    return new Promise((resolve, reject) => {
        axios.patch(`${BaseURL}${type}`, userData, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error?.response?.status === 401) {
                    // AuthStorage.deauthenticateUser();
                    window.location.href = "/"
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}


export const ApiDelete = (type, userData) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${BaseURL}${type}`, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error?.response?.status === 401) {
                    // AuthStorage.deauthenticateUser();
                    window.location.href = "/"
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}

export const ApiPut = (type, userData) => {
    const s = type.includes('?') ? '&' : '?';
    return new Promise((resolve, reject) => {
        axios.put(`${BaseURL}${type}${s}}`, userData, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error?.response?.status === 401) {
                    // AuthStorage.deauthenticateUser();
                    window.location.href = "/"
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}



export const getHttpOptions = (options = defaultHeaders) => {
    let headers = {
        Authorization: "",
        'Content-Type': "application/json",

    };

    if (options.hasOwnProperty('isAuth') && options.isAuth) {
        headers['Authorization'] = AuthStorage.getToken() ?? "";
    }

    if (options.hasOwnProperty('isJsonRequest') && options.isJsonRequest) {
        headers['Content-Type'] = 'application/json';
    }

    if (options.hasOwnProperty('AdditionalParams') && options.AdditionalParams) {
        headers = { ...headers, ...options.AdditionalParams };
    }

    return { headers }
}