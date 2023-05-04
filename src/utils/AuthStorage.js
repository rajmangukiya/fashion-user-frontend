import STORAGEKEY from "../config/storageKey.js";

class AuthStorage {

    static setStorageData = (key, data, keepMeLoggedIn) => {
        keepMeLoggedIn ? localStorage.setItem(key, data) : sessionStorage.setItem(key, data);
    }

    static setStorageJsonData = (key, data, keepMeLoggedIn) => {
        keepMeLoggedIn ? localStorage.setItem(key, JSON.stringify(data)) : sessionStorage.setItem(key, JSON.stringify(data));
    }

    static getStorageData = (key) => {
        return localStorage.getItem(key) || sessionStorage.getItem(key);
    }

    static getStorageJsonData = (key) => {
        const data = (localStorage.getItem(key) || sessionStorage.getItem(key)) ?? '';
        return JSON.parse(data);
    }

    static getToken = () => {
        const token = localStorage.getItem(STORAGEKEY.token) || sessionStorage.getItem(STORAGEKEY.token);
        return token?.replaceAll("\"", "");
    }

    static isUserAuthenticated = () => {
        return (localStorage.getItem(STORAGEKEY.token) !== null || sessionStorage.getItem(STORAGEKEY.token) !== null);
    }

    static deauthenticateUser = () => {
        localStorage.removeItem(STORAGEKEY.token);
        localStorage.removeItem(STORAGEKEY.userData);

        sessionStorage.removeItem(STORAGEKEY.token);
        sessionStorage.removeItem(STORAGEKEY.userData);
    }

    static deleteKey = (key) => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
    }
}

export default AuthStorage;
