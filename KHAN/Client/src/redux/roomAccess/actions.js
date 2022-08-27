import {
  GET_USER_ACCESS,
  GET_USER_ACCESS_SUCCESS,
  ADD_ACCESS,
  ADD_ACCESS_SUCCESS,
  ADD_ACCESS_FAILED,
  UPDATE_ACCESS,
  UPDATE_ACCESS_SUCCESS,
  UPDATE_ACCESS_FAILED,
  REPLY_ACCESS,
  REPLY_ACCESS_SUCCESS,
  REPLY_ACCESS_FAILED,
  DELETE_ACCESS,
  DELETE_ACCESS_SUCCESS,
  DELETE_ACCESS_FAILED,
  GET_USER_ACCESS_FAILED,
} from "./constants";

export const getUserAccess = (user, room_id) => ({
  type: GET_USER_ACCESS,
  payload: {
    user,
    room_id,
  },
});
export const getUserAccessSuccess = (accesses) => ({
  type: GET_USER_ACCESS_SUCCESS,
  payload: { accesses },
});

export const getUserAccessFailed = (error) => ({
  type: GET_USER_ACCESS_FAILED,
  payload: { error },
});

export const AddAccess = (user, room_id, user_id, role) => ({
  type: ADD_ACCESS,
  payload: {
    user,
    room_id,
    user_id,
    role,
  },
});
export const AddAccessSuccess = (access) => ({
  type: ADD_ACCESS_SUCCESS,
  payload: { access },
});

export const AddAccessFailed = (error) => ({
  type: ADD_ACCESS_FAILED,
  payload: { error },
});

export const updateAccess = (user, room_id, access_id, role) => ({
  type: UPDATE_ACCESS,
  payload: {
    user,
    room_id,
    access_id,
    role,
  },
});
export const updateAccessSuccess = (access) => ({
  type: UPDATE_ACCESS_SUCCESS,
  payload: { access },
});

export const updateAccessFailed = (error) => ({
  type: UPDATE_ACCESS_FAILED,
  payload: { error },
});

export const replyAccess = (user, access_id, accepted) => ({
  type: REPLY_ACCESS,
  payload: {
    user,
    access_id,
    accepted,
  },
});
export const replyAccessSuccess = (access) => ({
  type: REPLY_ACCESS_SUCCESS,
  payload: { access },
});

export const replyAccessFailed = (error) => ({
  type: REPLY_ACCESS_FAILED,
  payload: { error },
});

export const deleteAccess = (user, room_id, access_id) => ({
  type: DELETE_ACCESS,
  payload: {
    user,
    room_id,
    access_id,
  },
});
export const deleteAccessSuccess = (access_id) => ({
  type: DELETE_ACCESS_SUCCESS,
  payload: { access_id },
});

export const deleteAccessFailed = (error) => ({
  type: DELETE_ACCESS_FAILED,
  payload: { error },
});
