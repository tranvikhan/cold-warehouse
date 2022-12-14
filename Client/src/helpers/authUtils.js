// @flow
import jwtDecode from 'jwt-decode';
import { Cookies } from 'react-cookie';
import {requestApi} from './api';
/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    if (!user) {
        return false;
    }
    const decoded = jwtDecode(user.accessToken);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        console.warn('access token expired');
        return false;
    } else {
        return true;
    }
};

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
    const cookies = new Cookies();
    const user = cookies.get('user');
    let newUser= user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
    return newUser;
};

export { isUserAuthenticated, getLoggedInUser };
