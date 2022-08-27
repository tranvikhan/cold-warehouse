import { all, call, fork, takeEvery, put } from "redux-saga/effects";

import {
  ADD_AREA,
  ADD_MONITOR,
  DELETE_AREA,
  DELETE_MONITOR,
  GET_AREAS,
  GET_AREA_INFO,
  UPDATE_AREA,
  UPDATE_MONITOR,
} from "./constants";

import {
  addAreaFailed,
  addAreaSuccess,
  addMonitorFailed,
  addMonitorSuccess,
  deleteAreaFailed,
  deleteAreaSuccess,
  deleteMonitorFailed,
  deleteMonitorSuccess,
  getAreaInfoFailed,
  getAreaInfoSuccess,
  getAreasFailed,
  getAreasSuccess,
  updateAreaFailed,
  updateAreaSuccess,
  updateMonitorFailed,
  updateMonitorSuccess,
} from "./actions";
import { requestApi } from "helpers/api";

function* GetAreasApi({ payload: { user, room_id } }) {
  try {
    const response = yield call(requestApi, {
      method: "get",
      headers: {
        "x-access-token": user.accessToken,
      },
      url: "api/room/area/all",
      params: { room_id },
    });
    if (response.status == "success") {
      yield put(getAreasSuccess(response.result.areas));
    } else {
      yield put(getAreasFailed(response.result));
    }
  } catch (error) {
    yield put(getAreasFailed(error));
  }
}

function* GetAreaInfoApi({ payload: { user, room_id, area_id } }) {
  try {
    const response = yield call(requestApi, {
      method: "get",
      headers: {
        "x-access-token": user.accessToken,
      },
      url: "api/room/area/",
      params: {
        room_id,
        area_id,
      },
    });
    if (response.status == "success") {
      yield put(getAreaInfoSuccess(response.result.area));
    } else {
      yield put(getAreaInfoFailed(response.result));
    }
  } catch (error) {
    yield put(getAreaInfoFailed(error));
  }
}

function* AddAreaApi({ payload: { user, room_id, area } }) {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": user.accessToken,
    },
    data: {
      room_id,
      ...area,
    },
    url: "api/room/area/create",
  };

  try {
    const response = yield call(requestApi, options);
    if (response.status === "success") {
      yield put(addAreaSuccess(response.result.area));
    } else {
      yield put(addAreaFailed(response.result));
    }
  } catch (error) {
    yield put(addAreaFailed(error));
  }
}

function* UpdateAreaApi({ payload: { user, room_id, area_id, area } }) {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": user.accessToken,
    },
    data: { room_id, area_id, ...area },
    url: "api/room/area/edit",
  };

  try {
    const response = yield call(requestApi, options);
    if (response.status === "success") {
      yield put(updateAreaSuccess(response.result.area));
    } else {
      yield put(updateAreaFailed(response.result));
    }
  } catch (error) {
    yield put(updateAreaFailed(error));
  }
}
function* DeleteAreaApi({ payload: { user, room_id, area_id } }) {
  const options = {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": user.accessToken,
    },
    data: { room_id, area_id },
    url: "api/room/area/",
  };

  try {
    const response = yield call(requestApi, options);
    if (response.status === "success") {
      yield put(deleteAreaSuccess(area_id));
    } else {
      yield put(deleteAreaFailed(response.result));
    }
  } catch (error) {
    yield put(deleteAreaFailed(error));
  }
}

////

function* AddMonitorApi({ payload: { user, room_id, area_id, monitor } }) {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": user.accessToken,
    },
    data: {
      room_id,
      area_id,
      monitor: monitor,
    },
    url: "api/room/area/monitor/add",
  };

  try {
    const response = yield call(requestApi, options);
    if (response.status === "success") {
      yield put(addMonitorSuccess(response.result.monitors));
    } else {
      yield put(addMonitorFailed(response.result));
    }
  } catch (error) {
    yield put(addMonitorFailed(error));
  }
}

function* UpdateMonitorApi({
  payload: { user, room_id, area_id, monitor_id, monitor },
}) {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": user.accessToken,
    },
    data: { room_id, area_id, monitor_id, monitor: monitor },
    url: "api/room/area/monitor/edit",
  };

  try {
    const response = yield call(requestApi, options);
    if (response.status === "success") {
      yield put(updateMonitorSuccess(response.result.monitor));
    } else {
      yield put(updateMonitorFailed(response.result));
    }
  } catch (error) {
    yield put(updateMonitorFailed(error));
  }
}
function* DeleteMonitorApi({
  payload: { user, room_id, area_id, monitor_id },
}) {
  const options = {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": user.accessToken,
    },
    data: { room_id, area_id, monitor_id },
    url: "api/room/area/monitor/",
  };

  try {
    const response = yield call(requestApi, options);
    if (response.status === "success") {
      yield put(deleteMonitorSuccess(response.result.monitors));
    } else {
      yield put(deleteMonitorFailed(response.result));
    }
  } catch (error) {
    yield put(deleteMonitorFailed(error));
  }
}

function* watchGetAreas() {
  yield takeEvery(GET_AREAS, GetAreasApi);
}

function* watchGetAreaInfo() {
  yield takeEvery(GET_AREA_INFO, GetAreaInfoApi);
}

function* watchAddArea() {
  yield takeEvery(ADD_AREA, AddAreaApi);
}

function* watchUpdateArea() {
  yield takeEvery(UPDATE_AREA, UpdateAreaApi);
}
function* watchDeleteArea() {
  yield takeEvery(DELETE_AREA, DeleteAreaApi);
}

function* watchAddMonitor() {
  yield takeEvery(ADD_MONITOR, AddMonitorApi);
}

function* watchUpdateMonitor() {
  yield takeEvery(UPDATE_MONITOR, UpdateMonitorApi);
}
function* watchDeleteMonitor() {
  yield takeEvery(DELETE_MONITOR, DeleteMonitorApi);
}

function* roomAreaSaga() {
  yield all([
    fork(watchGetAreas),
    fork(watchGetAreaInfo),
    fork(watchAddArea),
    fork(watchUpdateArea),
    fork(watchDeleteArea),
    fork(watchAddMonitor),
    fork(watchUpdateMonitor),
    fork(watchDeleteMonitor),
  ]);
}

export default roomAreaSaga;
