import { all, call, fork, takeEvery, put } from 'redux-saga/effects';

import {
    ADD_SENSOR,
    GET_CURR_ROOM_SENSOR_MAP,
    UPDATE_SENSOR,
    DELETE_SENSOR
} from './constants';

import { addSensorFailed, addSensorSuccess, deleteSensorFailed, deleteSensorSuccess, getRoomStructureFailed, getRoomStructureSuccess, updateSensorFailed, updateSensorSuccess } from './actions';

import {requestApi} from 'helpers/api';


function * getCurrentRoomSensorMap({payload: {room_id, user}}){
    try{
        const res = yield call(requestApi, {
            method: 'get',
            headers: {
                'x-access-token': user.accessToken,
            },
            url:'api/room/structure/',
            params:{room_id}
        });
        if (res.status==='success'){
            yield put(getRoomStructureSuccess(res.result.structure));
        } else {
            yield put(getRoomStructureFailed(res.result));
        }
    } catch (error){
        yield put(getRoomStructureFailed(error))
    }
}

function * updateSensor({payload: {user,room_id,sensor_id,location}}){
    try{
        const res = yield call(requestApi, {
            method: 'post',
            headers: {
                'x-access-token': user.accessToken,
            },
            url:'api/room/structure/sensor/edit',
            data:{room_id,sensor_id,location:location}
        });

        if (res.status==='success'){
            yield put(updateSensorSuccess(res.result.structure));
        } else {
            yield put(updateSensorFailed(res.result));
        }
    } catch (error){
        yield put(updateSensorFailed(error))
    }
}

function * addSensor({payload: {user,room_id,sensor_id,location}}){
    try{
        const res = yield call(requestApi, {
            method: 'post',
            headers: {
                'x-access-token': user.accessToken,
            },
            url:'api/room/structure/sensor/add',
            data:{room_id,sensor_id,location:location}
        });

        if (res.status==='success'){
            yield put(addSensorSuccess(res.result.structure));
        } else {
            yield put(addSensorFailed(res.result));
        }
    } catch (error){
        yield put(addSensorFailed(error))
    }
}

function * deleteSensor({payload: {user,room_id,sensor_id}}){
    try{
        const res = yield call(requestApi, {
            method: 'post',
            headers: {
                'x-access-token': user.accessToken,
            },
            url:'api/room/structure/sensor/delete',
            data:{room_id,sensor_id}
        });

        if (res.status==='success'){
            yield put(deleteSensorSuccess(res.result.structure));
        } else {
            yield put(deleteSensorFailed(res.result));
        }
    } catch (error){
        yield put(deleteSensorFailed(error))
    }
}



function * watchGetCurrentRoomSensorMap(){
    yield takeEvery(GET_CURR_ROOM_SENSOR_MAP, getCurrentRoomSensorMap);
}

function * watchUpdateSensor(){
    yield takeEvery(UPDATE_SENSOR, updateSensor);
}

function * watchAddeSensor(){
    yield takeEvery(ADD_SENSOR, addSensor);
}

function * watchDeleteSensor(){
    yield takeEvery(DELETE_SENSOR, deleteSensor);
}

function* roomStructrureSaga(){
    yield all([

        fork(watchGetCurrentRoomSensorMap),
        fork(watchUpdateSensor),
        fork(watchAddeSensor),
        fork(watchDeleteSensor),
       
    ])
}

export default roomStructrureSaga;