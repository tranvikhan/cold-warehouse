import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import { requestApi } from 'helpers/api';
import { CREATE_ROOM, CREATE_ROOM_SUCCESS, DELETE_ROOM, GET_CURR_ROOM_INFO, GET_ROOM_LIST, SET_CURR_ROOM, UPDATE_ROOM } from './constants';

import {
    getRoomListSuccess,
    getRoomListFailed,
    createRoomSuccess,
    createRoomFailed,
    updateRoomFailed,
    updateRoomSuccess,
    deleteRoomSuccess,
    deleteRoomFailed,
    getCurrentRoomInfoSuccess,
    getCurrentRoomInfoFailed

} from './actions';


function* getRoomList({payload:{user}}){
    try{
        const response = yield call(requestApi, {
            method: 'get',
            headers: {
                'x-access-token': user.accessToken,
            },
            url: 'api/room/access/all'
        });
        if (response.status=="success"){
            yield put(getRoomListSuccess(response.result.accesses));
        } else {
            yield put(getRoomListFailed(response.result));
        }
    } catch (error){
        yield put(getRoomListFailed(error));
    }
}

function* getRoomInfo({payload:{user,room_id}}){
    try{
        const response = yield call(requestApi, {
            method: 'get',
            headers: {
                'x-access-token': user.accessToken,
            },
            url: 'api/room/',
            params: {
                room_id
            }
        });
        if (response.status=="success"){
            yield put(getCurrentRoomInfoSuccess(response.result.room));
        } else {
            yield put(getCurrentRoomInfoFailed(response.result));
        }
    } catch (error){
        yield put(getCurrentRoomInfoFailed(error));
    }
}


function* newRoom({ payload: {user,room} }) {
    const options = {
        method: 'post',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': user.accessToken
         },
        data:room,
        url : 'api/room/create'
    };

    try {
        const response = yield call(requestApi,options);
        if (response.status==='success') {
            yield put(createRoomSuccess(response.result.room));
        } else {
            yield put(createRoomFailed(response.result));
        }
    } catch (error) {
        yield put(createRoomFailed(error));
    }
}

function* updateRoom({ payload: {user,room_id,room_info} }) {
    const options = {
        method: 'post',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': user.accessToken
         },
        data:{room_id: room_id,...room_info},
        url : 'api/room/edit'
    };

    try {
        const response = yield call(requestApi,options);
        if (response.status==='success') {
            yield put(updateRoomSuccess(response.result.room));
        } else {
            yield put(updateRoomFailed(response.result));
        }
    } catch (error) {
        yield put(updateRoomFailed(error));
    }
}
function* deleteRoom({ payload: {user,room_id} }) {
    const options = {
        method: 'delete',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': user.accessToken
         },
        data:{room_id},
        url : 'api/room/'
    };

    try {
        const response = yield call(requestApi,options);
        if (response.status==='success') {
            yield put(deleteRoomSuccess(room_id));
        } else {
            yield put(deleteRoomFailed(response.result));
        }
    } catch (error) {
        yield put(deleteRoomFailed(error));
    }
}


function * watchGetRoomList(){
    yield takeEvery(GET_ROOM_LIST, getRoomList);
}

function * watchGetCurrentRoomInfo(){
    yield takeEvery(GET_CURR_ROOM_INFO, getRoomInfo);
}

function * watchCreateRoom(){
    yield takeEvery(CREATE_ROOM, newRoom);
}
function * watchUpdateRoom(){
    yield takeEvery(UPDATE_ROOM, updateRoom);
}
function * watchDeleteRooms(){
    yield takeEvery(DELETE_ROOM, deleteRoom);
}

function* RoomListSaga(){
    yield all([
        fork(watchGetRoomList),
        fork(watchCreateRoom),
        fork(watchUpdateRoom),
        fork(watchDeleteRooms),
        fork(watchGetCurrentRoomInfo),
    ])
}

export default RoomListSaga;