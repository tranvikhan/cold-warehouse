import { all, call, fork, takeEvery, put } from "redux-saga/effects";

import {
  GET_AREA_DATA,
  GET_CUBE_DATA,
  GET_CURRENT_DATA,
  GET_SENSOR_DATA,
} from "../constants";

import {
  getAreaDataSuccess,
  getAreaDataFailed,
  getCurrentDataSuccess,
  getCurrentDataFailed,
  getSensorDataSuccess,
  getSensorDataFailed,
  getCubeDataSuccess,
  getCubeDataFailed,
} from "../actions";

import { requestApi } from "../../helpers/api";

function* getAreaData({ payload: { user, room_id } }) {
  try {
    const res = yield call(requestApi, {
      method: "get",
      headers: {
        "x-access-token": user.accessToken,
      },
      url: "api/room/data/area",
      params: {
        room_id,
      },
    });
    if (res.status === "success") {
      yield put(getAreaDataSuccess(res.result));
    } else {
      yield put(getAreaDataFailed(res.result));
    }
  } catch (error) {
    yield put(getAreaDataFailed(error));
  }
}

function* getCurrentData({ payload: { user, room_id } }) {
  try {
    const res = yield call(requestApi, {
      method: "get",
      headers: {
        "x-access-token": user.accessToken,
      },
      url: "api/room/data/current",
      params: {
        room_id,
      },
    });
    if (res.status === "success") {
      yield put(getCurrentDataSuccess(res.result));
    } else {
      yield put(getCurrentDataFailed(res.result));
    }
  } catch (error) {
    yield put(getCurrentDataFailed(error));
  }
}
function* getSensorData({ payload: { user, room_id } }) {
  try {
    const res = yield call(requestApi, {
      method: "get",
      headers: {
        "x-access-token": user.accessToken,
      },
      url: "api/room/data/sensor",
      params: {
        room_id,
      },
    });
    if (res.status === "success") {
      yield put(getSensorDataSuccess(res.result));
    } else {
      yield put(getSensorDataFailed(res.result));
    }
  } catch (error) {
    yield put(getSensorDataFailed(error));
  }
}

function* getCubeData({ payload: { user, room_id } }) {
  try {
    const res = yield call(requestApi, {
      method: "get",
      headers: {
        "x-access-token": user.accessToken,
      },
      url: "api/room/data/getCubeData",
      params: {
        room_id,
      },
    });
    if (res.status === "success") {
      yield put(getCubeDataSuccess(res.result));
    } else {
      yield put(getCubeDataFailed(res.result));
    }
  } catch (error) {
    yield put(getCubeDataFailed(error));
  }
}

function* watchGetAreaData() {
  yield takeEvery(GET_AREA_DATA, getAreaData);
}

function* watchGetCurrentData() {
  yield takeEvery(GET_CURRENT_DATA, getCurrentData);
}

function* watchGetSensorData() {
  yield takeEvery(GET_SENSOR_DATA, getSensorData);
}

function* watchGetCubeData() {
  yield takeEvery(GET_CUBE_DATA, getCubeData);
}

function* RoomDataSaga() {
  yield all([
    fork(watchGetAreaData),
    fork(watchGetCurrentData),
    fork(watchGetSensorData),
    fork(watchGetCubeData),
  ]);
}

export default RoomDataSaga;
