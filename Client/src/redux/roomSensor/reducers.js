import {
  GET_SENSORS,
  GET_SENSORS_SUCCESS,
  GET_SENSORS_FAILED,
  GET_SENSORS_NOT_USED,
  GET_SENSORS_NOT_USED_SUCCESS,
  GET_SENSORS_NOT_USED_FAILED,
} from "./constants";

const INIT_STATE = {};

const CurrentRoom = (state = INIT_STATE, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};
export default CurrentRoom;
