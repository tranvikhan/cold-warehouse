import { requestApi } from "../../helpers/api";
import { all, call, fork, takeEvery, put } from "redux-saga/effects";
import {
  getAreaData,
  getCubeData,
  getCurrentData,
  getSensorData,
  getRoomStructure,
  getActivatesFailed,
  getActivatesSuccess,
  getStationsSuccess,
  getStationsFailed,
  addActivateSuccess,
  addActivateFailed,
  deleteActivateSuccess,
  deleteActivateFailed,
} from "../actions";
import {
  ADD_ACTIVATE,
  DELETE_ACTIVATE,
  GET_ACTIVATES,
  GET_STATIONS,
} from "../constants";

function* getActivatesApi({ payload: { user, room_id } }) {
  try {
    const res = yield call(requestApi, {
      method: "get",
      headers: {
        "x-access-token": user.accessToken,
      },
      url: "api/room/activate/all",
      params: { room_id },
    });
    if (res.status === "success") {
      yield put(getActivatesSuccess(res.result.activates));
    } else {
      yield put(getActivatesFailed(res.result));
    }
  } catch (error) {
    yield put(getActivatesFailed(error));
  }
}

function* getStationsApi({ payload: { user, room_id, username, password } }) {
  try {
    const res = yield call(requestApi, {
      method: "post",
      headers: {
        "x-access-token": user.accessToken,
      },
      url: "api/room/activate/getStation",
      data: { room_id, username, password },
    });
    if (res.status === "success") {
      yield put(getStationsSuccess(res.result.stations));
    } else {
      yield put(getStationsFailed(res.result));
    }
  } catch (error) {
    yield put(getStationsFailed(error));
  }
}

function* addActivateApi({
  payload: { user, room_id, username, password, station_id, station_name },
}) {
  try {
    const res = yield call(requestApi, {
      method: "post",
      headers: {
        "x-access-token": user.accessToken,
      },
      url: "api/room/activate/add",
      data: {
        room_id,
        username,
        password,
        station_id,
        station_name,
      },
    });
    if (res.status === "success") {
      yield put(addActivateSuccess(res.result.activate));

      //refesh data
      yield put(getRoomStructure(user, room_id));

      yield put(getAreaData(user, room_id));
      yield put(getCurrentData(user, room_id));
      yield put(getSensorData(user, room_id));
      yield put(getCubeData(user, room_id));
    } else {
      yield put(addActivateFailed(res.result));
    }
  } catch (error) {
    yield put(addActivateFailed(error));
  }
}

function* deleteActivateApi({ payload: { user, room_id, activate_id } }) {
  try {
    const res = yield call(requestApi, {
      method: "delete",
      headers: {
        "x-access-token": user.accessToken,
      },
      url: "api/room/activate",
      data: { room_id, activate_id },
    });
    if (res.status === "success") {
      yield put(deleteActivateSuccess(activate_id));

      //refesh data
      yield put(getRoomStructure(user, room_id));

      yield put(getAreaData(user, room_id));
      yield put(getCurrentData(user, room_id));
      yield put(getSensorData(user, room_id));
      yield put(getCubeData(user, room_id));
    } else {
      yield put(deleteActivateFailed(res.result));
    }
  } catch (error) {
    yield put(deleteActivateFailed(error));
  }
}

function* watchGetActivates() {
  yield takeEvery(GET_ACTIVATES, getActivatesApi);
}

function* watchGetStations() {
  yield takeEvery(GET_STATIONS, getStationsApi);
}

function* watchAddActivate() {
  yield takeEvery(ADD_ACTIVATE, addActivateApi);
}

function* watchDeleteActivate() {
  yield takeEvery(DELETE_ACTIVATE, deleteActivateApi);
}

function* roomActivateSaga() {
  yield all([
    fork(watchGetActivates),
    fork(watchGetStations),
    fork(watchAddActivate),
    fork(watchDeleteActivate),
  ]);
}

export default roomActivateSaga;
