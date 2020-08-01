import { createReducer } from "@reduxjs/toolkit";
import { showAll } from "../actions/actions";

const todoFilterReducer = createReducer(showAll.toString(), builder => {
    builder
        .addMatcher(action => action.type.startsWith('filter'), (state, action) => action.type);
})

export default todoFilterReducer;