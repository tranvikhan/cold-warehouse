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

const INIT_STATE = {
  loading: false,
  error: null,
  activates: [],
  stations: null,
};

const RoomActivate = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ACTIVATES:
      return {
        ...state,
        loading: true,
        error: null,
        activates: [],
      };
    case GET_ACTIVATES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        activates: [],
      };
    case GET_ACTIVATES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        activates: action.payload.activates,
      };

    case ADD_ACTIVATE:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADD_ACTIVATE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case ADD_ACTIVATE_SUCCESS:
      let newActivates = [...state.activates];
      newActivates.push(action.payload.activate);
      return {
        ...state,
        loading: false,
        error: null,
        activates: newActivates,
        stations: null,
      };

    case GET_STATIONS:
      return {
        ...state,
        loading: true,
        error: null,
        stations: null,
      };
    case GET_STATIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        stations: null,
      };
    case GET_STATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        stations: action.payload.stations,
      };

    case DELETE_ACTIVATE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_ACTIVATE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case DELETE_ACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        activates: [...state.activates].filter(
          (at) => at._id != action.payload.activate_id
        ),
      };
    default:
      return { ...state };
  }
};
export default RoomActivate;
