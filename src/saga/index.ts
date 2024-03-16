import {debounce, put, retry, spawn, takeLatest} from 'redux-saga/effects';
import {changeSearchField, searchSkillsFailure, searchSkillsRequest, searchSkillsSuccess} from '../slices/skills.ts';
import {searchSkills} from '../fetch/fetchApi.ts';
export default function* saga() {
    yield spawn(watchChangeSearchSaga);
    yield spawn(watchSearchSkillsSaga)
}
function* watchSearchSkillsSaga() {
    //TODO как исправить ошибку?
    yield takeLatest(changeSearchField, handleSearchSkillsSaga);
}
function* handleSearchSkillsSaga({payload}: { payload: string }) {
    try {
        const retryCount = 3;
        const retryDelay = retryCount * 1000;
        let data = [];
        data = yield retry(retryCount, retryDelay,
            searchSkills,
            payload);
        yield put(
            searchSkillsSuccess(data));
    } catch (e) {
        if(e instanceof Error) {
        yield put(searchSkillsFailure(e.message));
        }
    }
}
function* watchChangeSearchSaga() {
    //TODO как исправить ошибку?
    yield debounce(2000, searchSkillsRequest, handleChangeSearchSaga);
}
function* handleChangeSearchSaga() {
    yield put(searchSkillsRequest());
}
