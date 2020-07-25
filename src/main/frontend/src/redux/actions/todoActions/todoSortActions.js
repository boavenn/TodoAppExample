import { TodoSortActionTypes } from '../actionTypes';

export const sortByDeadlineAscending = () => {
    return {
        type: TodoSortActionTypes.BY_DEADLINE_ASCENDING,
        payload: {}
    }
}

export const sortByDeadlineDescending = () => {
    return {
        type: TodoSortActionTypes.BY_DEADLINE_DESCENDING,
        payload: {}
    }
}