import { createReducer } from "@reduxjs/toolkit";
import { sortByDeadlineAscending } from "../actions/actions";

const todoSortReducer = createReducer(sortByDeadlineAscending.toString(), builder => {
    builder
        .addMatcher(action => action.type.startsWith('sort'), (state, action) => action.type);
})

export default todoSortReducer;