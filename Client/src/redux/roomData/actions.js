import {
    GET_AREA_DATA,
    GET_AREA_DATA_SUCCESS,
    GET_AREA_DATA_FAILED,

    GET_CURRENT_DATA,
    GET_CURRENT_DATA_SUCCESS,
    GET_CURRENT_DATA_FAILED,

    GET_SENSOR_DATA,
    GET_SENSOR_DATA_SUCCESS,
    GET_SENSOR_DATA_FAILED,

    GET_CUBE_DATA,
    GET_CUBE_DATA_SUCCESS,
    GET_CUBE_DATA_FAILED,
} from './constants';

export const getAreaData = (user,room_id) => ({
    type: GET_AREA_DATA,
    payload: {
        room_id,
        user,
    }
})

export const getAreaDataSuccess = (data) => ({
    type: GET_AREA_DATA_SUCCESS,
    payload: {data}
})

export const getAreaDataFailed = (error) => ({
    type: GET_AREA_DATA_FAILED,
    payload: {error}
})

export const getCurrentData = (user,room_id) => ({
    type: GET_CURRENT_DATA,
    payload: {
        room_id,
        user
    }
})

export const getCurrentDataSuccess = (data) => ({
    type: GET_CURRENT_DATA_SUCCESS,
    payload: {data}
})

export const getCurrentDataFailed = (error) => ({
    type: GET_CURRENT_DATA_FAILED,
    payload: {error}
})

export const getSensorData = (user,room_id) => ({
    type: GET_SENSOR_DATA,
    payload: {
        room_id,
        user
    }
})

export const getSensorDataSuccess = (data) => ({
    type: GET_SENSOR_DATA_SUCCESS,
    payload: {data}
})

export const getSensorDataFailed = (error) => ({
    type: GET_SENSOR_DATA_FAILED,
    payload: {error}
})


export const getCubeData = (user,room_id) => ({
    type: GET_CUBE_DATA,
    payload: {
        room_id,
        user
    }
})
export const getCubeDataSuccess = (data) => ({
    type: GET_CUBE_DATA_SUCCESS,
    payload: {data}
})

export const getCubeDataFailed = (error) => ({
    type: GET_CUBE_DATA_FAILED,
    payload: {error}
})