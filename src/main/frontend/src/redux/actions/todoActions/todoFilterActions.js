import { TodoFilterActionTypes } from '../actionTypes';

export const showAll = () => {
    return {
        type: TodoFilterActionTypes.SHOW_ALL,
        payload: {}
    }
}

export const showDone = () => {
    return {
        type: TodoFilterActionTypes.SHOW_DONE,
        payload: {}
    }
}

export const showNotDone = () => {
    return {
        type: TodoFilterActionTypes.SHOW_NOT_DONE,
        payload: {}
    }
}