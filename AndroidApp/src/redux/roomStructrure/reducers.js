import {
    GET_CURR_ROOM_SENSOR_MAP,
    GET_CURR_ROOM_SENSOR_MAP_SUCCESS,
    GET_CURR_ROOM_SENSOR_MAP_FAILED,

    ADD_SENSOR,
    ADD_SENSOR_SUCCESS,
    ADD_SENSOR_FAILED,

    UPDATE_SENSOR,
    UPDATE_SENSOR_SUCCESS,
    UPDATE_SENSOR_FAILED,

    DELETE_SENSOR,
    DELETE_SENSOR_SUCCESS,
    DELETE_SENSOR_FAILED,
} from './constants';

const INIT_STATE = {
    loading: false,
    error:null,
    structure:null
};

const RoomStructrure = (state = INIT_STATE, action) =>{
    switch (action.type) {
        case GET_CURR_ROOM_SENSOR_MAP:
        return{
            ...state,
            loading: true,
            error:null,
            structure:null
        }
        case GET_CURR_ROOM_SENSOR_MAP_SUCCESS:
        return{
            ...state,
            loading: false,
            error:null,
            structure: (action.payload.data.map.map) ? action.payload.data :null
        }
        case GET_CURR_ROOM_SENSOR_MAP_FAILED:
        return{
            ...state,
            loading: false,
            error:action.payload.error,
            structure: null
        }
        case ADD_SENSOR:
        return{
            ...state,
            loading: true,
            error:null,
        }
        case ADD_SENSOR_SUCCESS:
        return{
            ...state,
            loading: false,
            error:null,
            structure: (action.payload.data.map.map) ? action.payload.data :null
        }
        case ADD_SENSOR_FAILED:
        return{
            ...state,
            loading: false,
            error:action.payload.error,
            structure: null
        }
        case UPDATE_SENSOR:
        return{
            ...state,
            loading: true,
            error:null,
        }
        case UPDATE_SENSOR_SUCCESS:
        return{
            ...state,
            loading: false,
            error:null,
            structure: (action.payload.data.map.map) ? action.payload.data :null
        }
        case UPDATE_SENSOR_FAILED:
        return{
            ...state,
            loading: false,
            error:action.payload.error,
            structure: null
        }
        case DELETE_SENSOR:
        return{
            ...state,
            loading: true,
            error:null,
        }
        case DELETE_SENSOR_SUCCESS:
        return{
            ...state,
            loading: false,
            error:null,
            structure: (action.payload.data.map.map) ? action.payload.data :null
        }
        case DELETE_SENSOR_FAILED:
        return{
            ...state,
            loading: false,
            error:action.payload.error,
            structure: null
        }
        default:
            return {...state}
    }
}
export default RoomStructrure;