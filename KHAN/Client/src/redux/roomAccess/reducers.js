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

const INIT_STATE = {
  loading: false,
  error: null,
  accesses: [],
};

const RoomAccess = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_ACCESS:
      return {
        ...state,
        loading: true,
        error: null,
        accesses: [],
      };
    case GET_USER_ACCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        accesses: action.payload.accesses,
      };
    case GET_USER_ACCESS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        accesses: [],
      };
    case ADD_ACCESS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_ACCESS_SUCCESS:
      let newAccesses = [...state.accesses];
      newAccesses.push(action.payload.access);
      return {
        ...state,
        loading: false,
        error: null,
        accesses: newAccesses,
      };
    case ADD_ACCESS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case UPDATE_ACCESS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_ACCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        accesses: [...state.accesses].map((ac) =>
          ac._id === action.payload.access._id ? action.payload.access : ac
        ),
      };
    case UPDATE_ACCESS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case REPLY_ACCESS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REPLY_ACCESS_SUCCESS:
      let newAccessesReply = [...state.accesses];
      newAccessesReply.push(action.payload.access);
      return {
        ...state,
        loading: false,
        error: null,
        accesses: newAccessesReply,
      };
    case REPLY_ACCESS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case DELETE_ACCESS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_ACCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        accesses: [...state.accesses].filter(
          (ac) => ac._id != action.payload.access_id
        ),
      };
    case DELETE_ACCESS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return { ...state };
  }
};
export default RoomAccess;
