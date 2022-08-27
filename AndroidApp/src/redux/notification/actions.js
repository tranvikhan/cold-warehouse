import {
    GET_NOTIFICATION_LIST,
    GET_NOTIFICATION_LIST_SUCCESS,
    GET_NOTIFICATION_LIST_FAILED,

    DELETE_NOTIFICATION,
    DELETE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_FAILED,

    DELETE_ALL_NOTIFICATION,
    DELETE_ALL_NOTIFICATION_SUCCESS,
    DELETE_ALL_NOTIFICATION_FAILED,
    
    UPDATE_NOTIFICATION,
    PUSH_NOTIFICATION
} from './constants';


export const getNotificationList = (user) => ({
    type: GET_NOTIFICATION_LIST,
    payload: {user},
});
export const getNotificationListSuccess = (list) => ({
    type: GET_NOTIFICATION_LIST_SUCCESS,
    payload: {
        list
    },
});
export const getNotificationListFailed = (error) => ({
    type: GET_NOTIFICATION_LIST_FAILED,
    payload: {
        error
    },
});


export const deleteNotification = (user,notification_id) => ({
    type: DELETE_NOTIFICATION,
    payload: {
        user,
        notification_id
    },
});
export const deleteNotificationSuccess = (notification_id) => ({
    type: DELETE_NOTIFICATION_SUCCESS,
    payload: {
        notification_id
    },
});
export const deleteNotificationFailed = (error) => ({
    type: DELETE_NOTIFICATION_FAILED,
    payload: {
        error
    },
});


export const deleteAllNotification = (user) => ({
    type: DELETE_ALL_NOTIFICATION,
    payload: {user},
});

export const deleteAllNotificationSuccess = (result) => ({
    type: DELETE_ALL_NOTIFICATION_SUCCESS,
    payload: {
        result
    },
});
export const deleteAllNotificationFailed = (error) => ({
    type: DELETE_ALL_NOTIFICATION_FAILED,
    payload: {
        error
    },
});


export const updateNotification = (id, data) => ({
    type: UPDATE_NOTIFICATION,
    payload: {
        id,
        data
    }
});
export const pushNotification = (notification) => ({
    type: PUSH_NOTIFICATION,
    payload: {
        notification
    },
});