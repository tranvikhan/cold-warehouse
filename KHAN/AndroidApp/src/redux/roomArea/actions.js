import {
  GET_AREA_INFO,
  GET_AREA_INFO_SUCCESS,
  GET_AREA_INFO_FAILED,
  GET_AREAS,
  GET_AREAS_SUCCESS,
  GET_AREAS_FAILED,
  ADD_AREA,
  ADD_AREA_SUCCESS,
  ADD_AREA_FAILED,
  ADD_MONITOR,
  ADD_MONITOR_SUCCESS,
  ADD_MONITOR_FAILED,
  UPDATE_AREA,
  UPDATE_AREA_SUCCESS,
  UPDATE_AREA_FAILED,
  UPDATE_MONITOR,
  UPDATE_MONITOR_SUCCESS,
  UPDATE_MONITOR_FAILED,
  DELETE_AREA,
  DELETE_AREA_SUCCESS,
  DELETE_AREA_FAILED,
  DELETE_MONITOR,
  DELETE_MONITOR_SUCCESS,
  DELETE_MONITOR_FAILED,
} from "./constants";

export const getAreas = (user, room_id) => ({
  type: GET_AREAS,
  payload: { user, room_id },
});

export const getAreasSuccess = (areas) => ({
  type: GET_AREAS_SUCCESS,
  payload: { areas },
});

export const getAreasFailed = (error) => ({
  type: GET_AREAS_FAILED,
  payload: { error },
});

export const getAreaInfo = (user, room_id, area_id) => ({
  type: GET_AREA_INFO,
  payload: { user, room_id, area_id },
});

export const getAreaInfoSuccess = (area) => ({
  type: GET_AREA_INFO_SUCCESS,
  payload: { area },
});

export const getAreaInfoFailed = (error) => ({
  type: GET_AREA_INFO_FAILED,
  payload: { error },
});

export const addArea = (user, room_id, area) => ({
  type: ADD_AREA,
  payload: { user, room_id, area },
});

export const addAreaSuccess = (area) => ({
  type: ADD_AREA_SUCCESS,
  payload: { area },
});

export const addAreaFailed = (error) => ({
  type: ADD_AREA_FAILED,
  payload: { error },
});

export const updateArea = (user, room_id, area_id, area) => ({
  type: UPDATE_AREA,
  payload: { user, room_id, area_id, area },
});

export const updateAreaSuccess = (area) => ({
  type: UPDATE_AREA_SUCCESS,
  payload: { area },
});

export const updateAreaFailed = (error) => ({
  type: UPDATE_AREA_FAILED,
  payload: { error },
});

export const deleteArea = (user, room_id, area_id) => ({
  type: DELETE_AREA,
  payload: { user, room_id, area_id },
});

export const deleteAreaSuccess = (area_id) => ({
  type: DELETE_AREA_SUCCESS,
  payload: { area_id },
});

export const deleteAreaFailed = (error) => ({
  type: DELETE_AREA_FAILED,
  payload: { error },
});

///

export const addMonitor = (user, room_id, area_id, monitor) => ({
  type: ADD_MONITOR,
  payload: { user, room_id, area_id, monitor },
});

export const addMonitorSuccess = (monitors) => ({
  type: ADD_MONITOR_SUCCESS,
  payload: { monitors },
});

export const addMonitorFailed = (error) => ({
  type: ADD_MONITOR_FAILED,
  payload: { error },
});

export const updateMonitor = (user, room_id, area_id, monitor_id, monitor) => ({
  type: UPDATE_MONITOR,
  payload: { user, room_id, area_id, monitor_id, monitor },
});

export const updateMonitorSuccess = (monitor) => ({
  type: UPDATE_MONITOR_SUCCESS,
  payload: { monitor },
});

export const updateMonitorFailed = (error) => ({
  type: UPDATE_MONITOR_FAILED,
  payload: { error },
});

export const deleteMonitor = (user, room_id, area_id, monitor_id) => ({
  type: DELETE_MONITOR,
  payload: { user, room_id, area_id, monitor_id },
});

export const deleteMonitorSuccess = (monitors) => ({
  type: DELETE_MONITOR_SUCCESS,
  payload: { monitors },
});

export const deleteMonitorFailed = (error) => ({
  type: DELETE_MONITOR_FAILED,
  payload: { error },
});
