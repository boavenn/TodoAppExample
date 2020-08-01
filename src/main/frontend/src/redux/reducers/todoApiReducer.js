import { createSlice, createReducer } from "@reduxjs/toolkit";
import { fetchTodos, addTodo, deleteTodo, updateTodo } from "../actions/actions";

export const todoApiInitialState = {
    isFetching: false,
    error: null,
    todos: []
};

const fetchTodosReducer = createSlice({
    name: fetchTodos.toString(),
    initialState: todoApiInitialState,
    reducers: {
        request: state => ({
            ...state,
            isFetching: true
        }),
        success: (state, action) => ({
            ...state,
            isFetching: false,
            todos: action.meta.response,
            error: null
        }),
        failure: (state, action) => ({
            ...state,
            isFetching: false,
            error: action.error
        })
    }
});

const addTodoReducer = createSlice({
    name: addTodo.toString(),
    initialState: todoApiInitialState,
    reducers: {
        request: state => ({
            ...state,
            error: null
        }),
        success: (state, action) => ({
            ...state,
            todos: [...state.todos, action.meta.response]
        }),
        failure: (state, action) => ({
            ...state,
            error: action.error
        })
    }
});

const updateTodoReducer = createSlice({
    name: updateTodo.toString(),
    initialState: todoApiInitialState,
    reducers: {
        request: state => ({
            ...state,
            error: null
        }),
        success: (state, action) => {
            const updatedTodo = action.meta.response;
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)
            }
        },
        failure: (state, action) => ({
            ...state,
            error: action.error
        })
    }
});

const deleteTodoReducer = createSlice({
    name: deleteTodo.toString(),
    initialState: todoApiInitialState,
    reducers: {
        request: state => ({
            ...state,
            error: null
        }),
        success: (state, action) => {
            const deletedTodoId = action.payload.id;
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== deletedTodoId)
            };
        },
        failure: (state, action) => ({
            ...state,
            error: action.error
        })
    }
});

const todoApiReducer = createReducer(todoApiInitialState, builder => {
    builder
        .addMatcher(action => action.type.startsWith(fetchTodos.toString()), fetchTodosReducer.reducer)
        .addMatcher(action => action.type.startsWith(addTodo.toString()), addTodoReducer.reducer)
        .addMatcher(action => action.type.startsWith(updateTodo.toString()), updateTodoReducer.reducer)
        .addMatcher(action => action.type.startsWith(deleteTodo.toString()), deleteTodoReducer.reducer)
});

export default todoApiReducer;