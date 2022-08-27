import {
  GET_ACTIVATES,
  GET_ACTIVATES_SUCCESS,
  GET_ACTIVATES_FAILED,
  GET_STATIONS,
  GET_STATIONS_SUCCESS,
  GET_STATIONS_FAILED,
  ADD_ACTIVATE,
  ADD_ACTIVATE_SUCCESS,
  ADD_ACTIVATE_FAILED,
  DELETE_ACTIVATE,
  DELETE_ACTIVATE_SUCCESS,
  DELETE_ACTIVATE_FAILED,
} from "./constants";

export const getActivates = (user, room_id) => ({
  type: GET_ACTIVATES,
  payload: {
    user,
    room_id,
  },
});

export const getActivatesSuccess = (activates) => ({
  type: GET_ACTIVATES_SUCCESS,
  payload: {
    activates,
  },
});

export const getActivatesFailed = (error) => ({
  type: GET_ACTIVATES_FAILED,
  payload: {
    error,
  },
});

export const getStations = (user, room_id, username, password) => ({
  type: GET_STATIONS,
  payload: {
    user,
    room_id,
    username,
    password,
  },
});

export const getStationsSuccess = (stations) => ({
  type: GET_STATIONS_SUCCESS,
  payload: {
    stations,
  },
});

export const getStationsFailed = (error) => ({
  type: GET_STATIONS_FAILED,
  payload: {
    error,
  },
});

export const addActivate = (
  user,
  room_id,
  username,
  password,
  station_id,
  station_name
) => ({
  type: ADD_ACTIVATE,
  payload: {
    user,
    room_id,
    username,
    password,
    station_id,
    station_name,
  },
});

export const addActivateSuccess = (activate) => ({
  type: ADD_ACTIVATE_SUCCESS,
  payload: {
    activate,
  },
});

export const addActivateFailed = (error) => ({
  type: ADD_ACTIVATE_FAILED,
  payload: {
    error,
  },
});

export const deleteActivate = (user, room_id, activate_id) => ({
  type: DELETE_ACTIVATE,
  payload: {
    user,
    room_id,
    activate_id,
  },
});

export const deleteActivateSuccess = (activate_id) => ({
  type: DELETE_ACTIVATE_SUCCESS,
  payload: {
    activate_id,
  },
});

export const deleteActivateFailed = (error) => ({
  type: DELETE_ACTIVATE_FAILED,
  payload: {
    error,
  },
});
