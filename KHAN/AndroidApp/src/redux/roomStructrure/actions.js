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
} from "./constants";

export const getRoomStructure = (user, room_id) => ({
  type: GET_CURR_ROOM_SENSOR_MAP,
  payload: {
    user,
    room_id,
  },
});
export const getRoomStructureSuccess = (data) => ({
  type: GET_CURR_ROOM_SENSOR_MAP_SUCCESS,
  payload: { data },
});

export const getRoomStructureFailed = (error) => ({
  type: GET_CURR_ROOM_SENSOR_MAP_FAILED,
  payload: { error },
});

export const addSensor = (user, room_id, sensor_id, location) => ({
  type: ADD_SENSOR,
  payload: {
    user,
    room_id,
    sensor_id,
    location,
  },
});
export const addSensorSuccess = (data) => ({
  type: ADD_SENSOR_SUCCESS,
  payload: { data },
});

export const addSensorFailed = (error) => ({
  type: ADD_SENSOR_FAILED,
  payload: { error },
});

export const deleteSensor = (user, room_id, sensor_id) => ({
  type: DELETE_SENSOR,
  payload: {
    user,
    room_id,
    sensor_id,
  },
});
export const deleteSensorSuccess = (data) => ({
  type: DELETE_SENSOR_SUCCESS,
  payload: { data },
});

export const deleteSensorFailed = (error) => ({
  type: DELETE_SENSOR_FAILED,
  payload: { error },
});

export const updateSensor = (user, room_id, sensor_id, location) => ({
  type: UPDATE_SENSOR,
  payload: {
    user,
    room_id,
    sensor_id,
    location,
  },
});
export const updateSensorSuccess = (data) => ({
  type: UPDATE_SENSOR_SUCCESS,
  payload: { data },
});

export const updateSensorFailed = (error) => ({
  type: UPDATE_SENSOR_FAILED,
  payload: { error },
});
