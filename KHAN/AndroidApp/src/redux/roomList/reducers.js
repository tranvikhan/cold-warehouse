import {
  getRoomCookieDefault,
  setRoomCookieDefault,
} from "../../helpers/roomUtils";
import { setCurrentRoom } from "./actions";
import {
  GET_ROOM_LIST,
  GET_ROOM_LIST_SUCCESS,
  GET_ROOM_LIST_FAILED,
  SET_CURR_ROOM,
  CREATE_ROOM,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILED,
  UPDATE_ROOM,
  UPDATE_ROOM_SUCCESS,
  UPDATE_ROOM_FAILED,
  DELETE_ROOM,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_FAILED,
  GET_CURR_ROOM_INFO,
  GET_CURR_ROOM_INFO_SUCCESS,
  GET_CURR_ROOM_INFO_FAILED,
} from "./constants";

const INIT_STATE = {
  loading: false,
  error: null,
  myRoom: [],
  sharedRoom: [],
  currentRoom: getRoomCookieDefault(),
  currentRoomInfo: null,
};

const RoomList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ROOM_LIST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ROOM_LIST_SUCCESS:
      const rooms = action.payload.accesses;
      const newMyRoom = rooms.filter((e) => e.role === "Owner");
      const newSharedRoom = rooms.filter((e) => e.role != "Owner");
      return {
        ...state,
        loading: false,
        error: null,
        myRoom: newMyRoom,
        sharedRoom: newSharedRoom,
        currentRoom: getRoomCookieDefault()
          ? getRoomCookieDefault()
          : newMyRoom[0]
          ? newMyRoom[0]
          : newSharedRoom[0]
          ? newSharedRoom[0]
          : {
              role: "Viewer",
              room: {
                _id: undefined,
                name: "Chưa có kho lạnh nào",
              },
            },
      };

    case GET_ROOM_LIST_FAILED:
      return {
        ...state,
        loading: false,
        myRoom: [],
        sharedRoom: [],
        error: action.payload.error,
        currentRoom: null,
      };

    case SET_CURR_ROOM:
      setRoomCookieDefault(action.payload.room);
      return {
        ...state,
        loading: true,
        error: null,
        currentRoom: action.payload.room,
      };
    case GET_CURR_ROOM_INFO:
      return {
        ...state,
        loading: true,
        error: null,
        currentRoomInfo: null,
      };
    case GET_CURR_ROOM_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentRoomInfo: action.payload.room,
      };
    case GET_CURR_ROOM_INFO_FAILED:
      setRoomCookieDefault(null);
      return {
        ...state,
        ...state,
        loading: false,
        error: action.payload.error,
        currentRoomInfo: null,
      };

    case CREATE_ROOM:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_ROOM_SUCCESS:
      let newRoom = {
        role: "Owner",
        room: {
          _id: action.payload.room._id,
          name: action.payload.room.name,
        },
      };
      let newListMyRoom = [...state.myRoom];
      newListMyRoom.push(newRoom);
      setRoomCookieDefault(newRoom);
      return {
        ...state,
        loading: false,
        error: null,
        myRoom: newListMyRoom,
        currentRoom: newRoom,
      };
    case CREATE_ROOM_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case UPDATE_ROOM:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_ROOM_SUCCESS:
      let tempUpdateRoom = {
        role: state.currentRoom.role,
        room: {
          ...state.currentRoom.room,
          name: action.payload.room.name,
        },
      };
      let newSharedRoomU = null;
      let newMyRoomU = null;
      if (tempUpdateRoom.role === "Owner") {
        newMyRoomU = [...state.myRoom];
        newMyRoomU = newMyRoomU.map((it) => {
          return it.room._id === tempUpdateRoom.room._id ? tempUpdateRoom : it;
        });
      } else {
        newSharedRoomU = [...state.sharedRoom];
        newSharedRoomU = newSharedRoomU.map((it) => {
          return it.room._id === tempUpdateRoom.room._id ? tempUpdateRoom : it;
        });
      }
      setRoomCookieDefault(tempUpdateRoom);
      return {
        ...state,
        loading: false,
        error: null,
        currentRoomInfo: action.payload.room,
        currentRoom: tempUpdateRoom,
        myRoom: newMyRoomU ? newMyRoomU : state.myRoom,
        sharedRoom: newSharedRoomU ? newSharedRoomU : state.sharedRoom,
      };
    case UPDATE_ROOM_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case DELETE_ROOM:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_ROOM_SUCCESS:
      let tempShareRoom = [...state.sharedRoom].filter(
        (r) => r.room._id !== action.payload.room_id
      );
      let tempMyRoom = [...state.myRoom].filter(
        (r) => r.room._id !== action.payload.room_id
      );
      let tempCurrent = tempMyRoom[0]
        ? tempMyRoom[0]
        : tempShareRoom[0]
        ? tempShareRoom[0]
        : {
            role: "Viewer",
            room: {
              _id: undefined,
              name: "Chưa có kho lạnh nào",
            },
          };
      setRoomCookieDefault(null);
      return {
        ...state,
        loading: false,
        sharedRoom: tempShareRoom,
        myRoom: tempMyRoom,
        currentRoom: tempCurrent,
        error: null,
      };
    case DELETE_ROOM_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return { ...state };
  }
};
export default RoomList;
