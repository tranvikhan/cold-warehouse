import { combineReducers } from "redux";
import Layout from "./layout/reducers";
import Auth from "./auth/reducers";
import AppMenu from "./appMenu/reducers";

import RoomList from "./roomList/reducers";
import Notification from "./notification/reducers";
import RoomData from "./roomData/reducers";
import RoomStructrure from "./roomStructrure/reducers";
import RoomAccess from "./roomAccess/reducers";
import RoomActivate from "./roomActivate/reducers";
import RoomArea from "./roomArea/reducers";

export default combineReducers({
  Auth,
  AppMenu,
  Layout,
  RoomList,
  RoomData,
  Notification,
  RoomStructrure,
  RoomAccess,
  RoomActivate,
  RoomArea,
});
