import {debounce, put, retry, spawn} from 'redux-saga/effects';
import {changeSearchField, searchSkillsFailure, searchSkillsRequest, searchSkillsSuccess, reset} from '../slices/skills.ts';
import {searchSkills} from '../fetch/fetchApi.ts';
export default function* saga() {
    yield spawn(watchSearchSkillsSaga);
}
function* watchSearchSkillsSaga() {
    yield debounce(500, changeSearchField, handleSearchSkillsSaga);
}
function* handleSearchSkillsSaga({payload}: { payload: string }) {
    if(payload === "") {
        yield put(reset());
        return;
    }
    try {
        yield put(searchSkillsRequest());
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
