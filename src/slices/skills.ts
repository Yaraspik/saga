import {createSlice} from '@reduxjs/toolkit';

type initialStateType = {
    loading: boolean;
    error: string | null;
    search: string;
    items: skillsType[];
}

type skillsType = {
    id: string,
    name: string
}

const initialState: initialStateType = {
    loading: false,
    error: null,
    search: "",
    items: [],
}

const skillsSlice = createSlice({
    name: "skills",
    initialState: initialState,
    reducers: {
        searchSkillsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        searchSkillsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        searchSkillsSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.items = action.payload;
        },
        changeSearchField: (state, action: {payload: string}) => {
            state.search = action.payload;
        }
    },
});

export const {
    searchSkillsRequest,
    searchSkillsFailure,
    searchSkillsSuccess,
    changeSearchField,
} = skillsSlice.actions;
export const skillsData = ({skills}: {skills: initialStateType}): initialStateType => skills;
export default skillsSlice.reducer;