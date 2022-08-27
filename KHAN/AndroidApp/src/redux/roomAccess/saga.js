import { all, call, fork, takeEvery, put } from "redux-saga/effects";

import {
  ADD_ACCESS,
  DELETE_ACCESS,
  GET_USER_ACCESS,
  REPLY_ACCESS,
  UPDATE_ACCESS,
} from "../constants";

import {
  AddAccessFailed,
  AddAccessSuccess,
  deleteAccessFailed,
  deleteAccessSuccess,
  getUserAccessFailed,
  getUserAccessSuccess,
  replyAccessFailed,
  replyAccessSuccess,
  updateAccessFailed,
  updateAccessSuccess,
} from "../actions";

import { requestApi } from "../../helpers/api";

function* getUserAccessApi({ payload: { user, room_id } }) {
  try {
    const res = yield call(requestApi, {
      method: "get",
      headers: {
        "x-access-token": user.accessToken,
      },
      url: "api/room/access/",
      params: { user, room_id },
    });

    if (res.status === "success") {
      yield put(getUserAccessSuccess(res.result.accesses));
    } else {
      yield put(getUserAccessFailed(res.result));
    }
  } catch (error) {
    yield put(getUserAccessFailed(error));
  }
}

function* addAccessApi({ payload: { user, room_id, user_id, role } }) {
  try {
    const res = yield call(requestApi, {
      method: "post",
      headers: {
        "x-access-token": user.accessToken,
      },
      url: "api/room/access/add",
      data: { room_id, user_id, role },
    });

    if (res.status === "success") {
      yield put(AddAccessSuccess(res.result.access));
    } else {
      yield put(AddAccessFailed(res.result));
    }
  } catch (error) {
    yield put(AddAccessFailed(error));
  }
}

function* updateAccessApi({ payload: { user, room_id, access_id, role } }) {
  try {
    const res = yield call(requestApi, {
      method: "post",
      headers: {
        "x-access-token": user.accessToken,
      },
      url: "api/room/access/edit",
      data: { room_id, access_id, role: role },
    });

    if (res.status === "success") {
      yield put(updateAccessSuccess(res.result.access));
    } else {
      yield put(updateAccessFailed(res.result));
    }
  } catch (error) {
    yield put(updateAccessFailed(error));
  }
}

function* replyAccessApi({ payload: { user, access_id, accepted } }) {
  try {
    const res = yield call(requestApi, {
      method: "post",
      headers: {
        "x-access-token": user.accessToken,
      },
      url: "api/room/access/reply",
      data: { access_id, accepted },
    });

    if (res.status === "success") {
      yield put(replyAccessSuccess(res.result.access));
    } else {
      yield put(replyAccessFailed(res.result));
    }
  } catch (error) {
    yield put(replyAccessFailed(error));
  }
}

function* deleteAccessApi({ payload: { user, room_id, access_id } }) {
  try {
    const res = yield call(requestApi, {
      method: "delete",
      headers: {
        "x-access-token": user.accessToken,
      },
      url: "api/room/access/",
      data: { room_id, access_id },
    });

    if (res.status === "success") {
      yield put(deleteAccessSuccess(access_id));
    } else {
      yield put(deleteAccessFailed(res.result));
    }
  } catch (error) {
    yield put(deleteAccessFailed(error));
  }
}

function* watchGetUserAccess() {
  yield takeEvery(GET_USER_ACCESS, getUserAccessApi);
}
function* watchAddAccess() {
  yield takeEvery(ADD_ACCESS, addAccessApi);
}

function* watchUpdateAccess() {
  yield takeEvery(UPDATE_ACCESS, updateAccessApi);
}
function* watchReplyAccess() {
  yield takeEvery(REPLY_ACCESS, replyAccessApi);
}

function* watchDeleteAccess() {
  yield takeEvery(DELETE_ACCESS, deleteAccessApi);
}

function* roomAccessSaga() {
  yield all([
    fork(watchGetUserAccess),
    fork(watchUpdateAccess),
    fork(watchAddAccess),
    fork(watchReplyAccess),
    fork(watchDeleteAccess),
  ]);
}

export default roomAccessSaga;
