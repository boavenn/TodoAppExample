import { combineReducers } from "redux";
import todoApiReducer from "./todoApiReducer";
import todoFilterReducer from "./todoFilterReducer";
import todoSortReducer from "./todoSortReducer";

const todosBranchReducer = combineReducers({
    api: todoApiReducer,
    filter: todoFilterReducer,
    sortType: todoSortReducer
});

const rootReducer = combineReducers({
    todosBranch: todosBranchReducer
})

export default rootReducer;