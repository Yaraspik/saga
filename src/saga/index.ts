import {debounce, put, retry, spawn, takeLatest} from 'redux-saga/effects';
import {changeSearchField, searchSkillsFailure, searchSkillsRequest, searchSkillsSuccess} from '../slices/skills.ts';
import {searchSkills} from '../fetch/fetchApi.ts';

export default function* saga() {
    yield spawn(watchChangeSearchSaga);
    yield spawn(watchSearchSkillsSaga)
}

// watcher
function* watchSearchSkillsSaga() {
    //TODO как исправить ошибку?
    yield takeLatest(searchSkillsRequest, handleSearchSkillsSaga);
}

function* handleSearchSkillsSaga({payload}: { payload: string }) {
    try {
        const retryCount = 3;
        const retryDelay = retryCount * 1000;
        let data: [];
        data = yield retry(retryCount, retryDelay,
            searchSkills,
            payload);
        yield put(
            searchSkillsSuccess(data));
    } catch (e) {
        const {message} = e as { message: string };
        yield put(
            searchSkillsFailure(message));
    }
}

function* watchChangeSearchSaga() {
    //TODO как исправить ошибку?
    yield debounce(300, filterChangeSearchAction, handleChangeSearchSaga);
}

function
filterChangeSearchAction({type, payload}: { type: string, payload: string }) {
    return type === changeSearchField.type && payload.trim() !== '';
}


function* handleChangeSearchSaga() {
    yield put(searchSkillsRequest());
}



