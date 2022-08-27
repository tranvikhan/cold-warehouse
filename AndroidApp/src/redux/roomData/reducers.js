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
} from "./constants";

const INIT_STATE = {
  areaData: null,
  sensorData: null,
  cubeData: null,
  currentData: null,
  loading: false,
  error: null,
};
const RoomData = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_AREA_DATA:
      return {
        ...state,
        loading: true,
        error: null,
        areaData: null,
      };
    case GET_AREA_DATA_SUCCESS:
      let cr = state.areaData ? [...state.areaData] : new Array();
      cr.push(action.payload.data);
      if (cr.length > 5) {
        cr.shift();
      }
      return {
        ...state,
        areaData: cr,
        loading: false,
        error: null,
      };
    case GET_AREA_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        areaData: null,
      };
    case GET_CURRENT_DATA:
      return {
        ...state,
        loading: true,
        error: null,
        cubeData: null,
      };
    case GET_CURRENT_DATA_SUCCESS:
      return {
        ...state,
        currentData: action.payload.data,
        loading: false,
        error: null,
      };
    case GET_CURRENT_DATA_FAILED:
      return {
        ...state,
        currentData: null,
        loading: false,
        error: action.payload.error,
      };
    case GET_SENSOR_DATA:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_SENSOR_DATA_SUCCESS:
      return {
        ...state,
        sensorData: action.payload.data,
        loading: false,
        error: null,
      };
    case GET_SENSOR_DATA_FAILED:
      return {
        ...state,
        sensorData: null,
        loading: false,
        error: action.payload.error,
      };
    case GET_CUBE_DATA:
      return {
        ...state,
        loading: true,
        error: null,
        cubeData: null,
      };
    case GET_CUBE_DATA_SUCCESS:
      return {
        ...state,
        cubeData: action.payload.data,
        loading: false,
        error: null,
      };
    case GET_CUBE_DATA_FAILED:
      return {
        ...state,
        cubeData: null,
        loading: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
export default RoomData;
