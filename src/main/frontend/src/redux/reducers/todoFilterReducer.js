import { TodoFilterActionTypes } from "../actions/actionTypes";

const todoFilterReducer = (state = TodoFilterActionTypes.SHOW_ALL, action) => {
    switch (action.type) {
        case TodoFilterActionTypes.SHOW_ALL:
        case TodoFilterActionTypes.SHOW_DONE:
        case TodoFilterActionTypes.SHOW_NOT_DONE:
            return action.type;
        default:
            return state;
    }
}

export default todoFilterReducer;