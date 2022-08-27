// @flow
import { all } from "redux-saga/effects";
import authSaga from "./auth/saga";
import layoutSaga from "./layout/saga";
import appMenuSaga from "./appMenu/saga";

import roomListSaga from "./roomList/saga";
import notificationListSaga from "./notification/saga";
import roomDataSaga from "./roomData/saga";
import roomStructrureSaga from "./roomStructrure/saga";
import roomAccessSaga from "./roomAccess/saga";
import roomActivateSaga from "./roomActivate/saga";
import roomAreaSaga from "./roomArea/saga";

export default function* rootSaga(getState) {
  yield all([
    authSaga(),
    layoutSaga(),
    appMenuSaga(),
    roomListSaga(),
    notificationListSaga(),
    roomDataSaga(),
    roomStructrureSaga(),
    roomAccessSaga(),
    roomActivateSaga(),
    roomAreaSaga(),
  ]);
}
