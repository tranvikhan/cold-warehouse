import { all, call, fork, takeEvery, put } from "redux-saga/effects";

import { requestApi } from "helpers/api";

function* CurrentRoomSaga() {
  yield all([]);
}

export default CurrentRoomSaga;
