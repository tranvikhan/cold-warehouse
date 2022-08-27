import {
    GET_ROOM_LIST,
    GET_ROOM_LIST_SUCCESS,
    GET_ROOM_LIST_FAILED,

    SET_CURR_ROOM,

   GET_CURR_ROOM_INFO,
   GET_CURR_ROOM_INFO_SUCCESS,
   GET_CURR_ROOM_INFO_FAILED,


    CREATE_ROOM,
    CREATE_ROOM_SUCCESS,
    CREATE_ROOM_FAILED,

    UPDATE_ROOM,
    UPDATE_ROOM_SUCCESS,
    UPDATE_ROOM_FAILED,

    DELETE_ROOM,
    DELETE_ROOM_SUCCESS,
    DELETE_ROOM_FAILED,
} from './constants';

export const getRoomList = (user) => ({
    type: GET_ROOM_LIST,
    payload: {user}
})

export const getRoomListSuccess = (accesses) => ({
    type: GET_ROOM_LIST_SUCCESS,
    payload: {accesses}
})

export const getRoomListFailed = (error) => ({
    type: GET_ROOM_LIST_FAILED,
    payload: {error}
})



export const getCurrentRoomInfo = (user,room_id) => ({
    type: GET_CURR_ROOM_INFO,
    payload: {user,room_id}
})
export const getCurrentRoomInfoSuccess = (room) => ({
    type: GET_CURR_ROOM_INFO_SUCCESS,
    payload: {room}
})
export const getCurrentRoomInfoFailed  = (error) => ({
    type: GET_CURR_ROOM_INFO_FAILED,
    payload: {error}
})


export const setCurrentRoom = (room) => ({
    type: SET_CURR_ROOM,
    payload: {room}
})

export const createRoom = (user,room) => ({
    type: CREATE_ROOM,
    payload: {user,room}
})
export const createRoomSuccess = (room) => ({
    type: CREATE_ROOM_SUCCESS,
    payload: {room}
})
export const createRoomFailed = (error) => ({
    type: CREATE_ROOM_FAILED,
    payload: {error}
})


export const updateRoom = (user,room_id,room_info) => ({
    type: UPDATE_ROOM,
    payload: {user,room_id,room_info}
})
export const updateRoomSuccess = (room) => ({
    type: UPDATE_ROOM_SUCCESS,
    payload: {room}
})
export const updateRoomFailed = (error) => ({
    type: UPDATE_ROOM_FAILED,
    payload: {error}
})


export const deleteRoom = (user,room_id) => ({
    type: DELETE_ROOM,
    payload: {user,room_id}
})
export const deleteRoomSuccess = (room_id) => ({
    type: DELETE_ROOM_SUCCESS,
    payload: {room_id}
})
export const deleteRoomFailed = (error) => ({
    type: DELETE_ROOM_FAILED,
    payload: {error}
})

