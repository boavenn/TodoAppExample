import { TodoActionTypes } from "../actions/actionTypes";
import httpReducerBuilder from "../util/httpReducerBuilder";

export const todoApiInitialState = {
    isFetching: false,
    error: null,
    todos: []
}

const fetchTodosSubreducer = (state, action) => {
    switch (action.type) {
        case TodoActionTypes.FETCH_TODOS_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case TodoActionTypes.FETCH_TODOS_SUCCESS:
            return {
                isFetching: false,
                todos: action.response,
                error: null
            };
        case TodoActionTypes.FETCH_TODOS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        default:
            return state;
    }
}

const addTodoSubreducer = (state, action) => {
    switch (action.type) {
        case TodoActionTypes.ADD_TODO_REQUEST:
            return {
                ...state,
                error: null
            }
        case TodoActionTypes.ADD_TODO_SUCCESS:
            return {
                ...state,
                todos: [...state.todos, action.response]
            };
        case TodoActionTypes.ADD_TODO_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}

const updateTodoSubreducer = (state, action) => {
    switch (action.type) {
        case TodoActionTypes.UPDATE_TODO_REQUEST:
            return {
                ...state,
                error: null
            }
        case TodoActionTypes.UPDATE_TODO_SUCCESS:
            const updatedTodo = action.response;
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)
            };
        case TodoActionTypes.UPDATE_TODO_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}

const deleteTodoSubreducer = (state, action) => {
    switch (action.type) {
        case TodoActionTypes.DELETE_TODO_REQUEST:
            return {
                ...state,
                error: null
            }
        case TodoActionTypes.DELETE_TODO_SUCCESS:
            const deletedTodoId = action.payload.id;
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== deletedTodoId)
            };
        case TodoActionTypes.DELETE_TODO_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}

const todoApiReducer = httpReducerBuilder
    .addSubreducer(TodoActionTypes.FETCH_TODOS, fetchTodosSubreducer)
    .addSubreducer(TodoActionTypes.ADD_TODO, addTodoSubreducer)
    .addSubreducer(TodoActionTypes.UPDATE_TODO, updateTodoSubreducer)
    .addSubreducer(TodoActionTypes.DELETE_TODO, deleteTodoSubreducer)
    .build(todoApiInitialState);

export default todoApiReducer;