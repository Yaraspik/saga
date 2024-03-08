import {changeSearchField, skillsData} from '../slices/skills.ts'
import {useAppSelector, useAppDispatch} from "../store/store.ts";
import {BaseSyntheticEvent} from "react";

export default function Skills() {
    const {items, loading, error, search} = useAppSelector(skillsData);

    const dispatch = useAppDispatch();
    const handleSearch = (evt: BaseSyntheticEvent) => {
        const {value}: {value: string} = evt.target;
        dispatch(changeSearchField(value));
    };
    const hasQuery = search.trim() !== '';

    return (
        <>
            <div><input type="search" value={search} onChange={
                handleSearch}/></div>
            {!hasQuery && <div>Type something to search</div>}
            {hasQuery && loading && <div>searching...</div>}
            {error ? <div>Error occurred</div> : <ul>{items.map(
                o => <li key={o.id}>{o.name}</li>
            )}</ul>}
        </>
    )
}
