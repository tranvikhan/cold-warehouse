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

const INIT_STATE = {
  loading: false,
  error: null,
  areas: [],
  currentArea: null,
};

const RoomArea = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_AREAS:
      return {
        ...state,
        loading: true,
        error: null,
        currentArea: null,
      };

    case GET_AREAS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        areas: action.payload.areas,
      };

    case GET_AREAS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        areas: [],
      };

    case GET_AREA_INFO:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_AREA_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentArea: action.payload.area,
      };
    case GET_AREA_INFO_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        currentArea: null,
      };

    case ADD_AREA:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_AREA_SUCCESS:
      let newAreas = [...state.areas];
      newAreas.push({
        _id: action.payload.area._id,
        name: action.payload.area.name,
      });
      return {
        ...state,
        loading: false,
        error: null,
        areas: newAreas,
        currentArea: action.payload.area,
      };
    case ADD_AREA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case UPDATE_AREA:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_AREA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        areas: [...state.areas].map((area) =>
          area._id === action.payload.area._id
            ? {
                _id: area._id,
                name: action.payload.area.name,
              }
            : area
        ),
        currentArea: action.payload.area,
      };
    case UPDATE_AREA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case DELETE_AREA:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_AREA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        areas: [...state.areas].filter(
          (area) => area._id != action.payload.area_id
        ),
        currentArea: null,
      };
    case DELETE_AREA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case ADD_MONITOR:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_MONITOR_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentArea: {
          ...state.currentArea,
          monitors: action.payload.monitors,
        },
      };
    case ADD_MONITOR_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case UPDATE_MONITOR:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_MONITOR_SUCCESS:
      let newMonitors = [...state.currentArea.monitors];
      newMonitors = newMonitors.map((monitor) =>
        monitor._id === action.payload.monitor._id
          ? action.payload.monitor
          : monitor
      );
      return {
        ...state,
        loading: false,
        error: null,
        currentArea: {
          ...state.currentArea,
          monitors: newMonitors,
        },
      };
    case UPDATE_MONITOR_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case DELETE_MONITOR:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_MONITOR_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentArea: {
          ...state.currentArea,
          monitors: action.payload.monitors,
        },
      };
    case DELETE_MONITOR_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return { ...state };
  }
};
export default RoomArea;
