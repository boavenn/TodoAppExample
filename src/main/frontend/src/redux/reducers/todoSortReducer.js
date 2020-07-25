const { TodoSortActionTypes } = require("../actions/actionTypes");

const todoSortReducer = (state = TodoSortActionTypes.BY_DEADLINE_ASCENDING, action) => {
    switch (action.type) {
        case TodoSortActionTypes.BY_DEADLINE_ASCENDING:
        case TodoSortActionTypes.BY_DEADLINE_DESCENDING:
            return action.type;
        default:
            return state;
    }
}

export default todoSortReducer;