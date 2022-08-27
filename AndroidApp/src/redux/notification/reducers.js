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

const INIT_STATE = {
}
const Notification = (state = INIT_STATE, action) => {
    switch (action.type){
        case GET_NOTIFICATION_LIST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_NOTIFICATION_LIST_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
                error: null
            }
        case GET_NOTIFICATION_LIST_FAILED:
            return {
                ...state,
                list:[],
                loading: false,
                error: action.payload.error
            }
        case DELETE_NOTIFICATION:
            return {
                ...state,
                loading: true,
                error: null
            }
        case DELETE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                list: [...state.list].filter((noti) =>(noti._id != action.payload.notification_id)),
                loading: false,
                error: null
            }
        case DELETE_NOTIFICATION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case DELETE_ALL_NOTIFICATION:
            return {
                ...state,
                loading: true,
                error: null
            }
        case DELETE_ALL_NOTIFICATION_SUCCESS:
            return {
                ...state,
                list:[],
                loading: false,
                error: null
            }
        case DELETE_ALL_NOTIFICATION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }


        case UPDATE_NOTIFICATION:
            const newState = {...state}
            const list = newState.list;
            if (!list) return newState;
            const targetIndex = list.findIndex(e => (e._id === action.payload.id));
            if (targetIndex!=-1){
                newState.list[targetIndex] = {
                    ...newState.list[targetIndex],
                    ...action.payload.data
                }
            } 
            return newState;
        
        case PUSH_NOTIFICATION:
            let newList = [...state.list];
            newList.unshift(action.payload.notification)
            return {
                ...state,list: newList
            }
        default:
            return {
                ...state,
            }
    }
}
export default Notification;