import React, { useEffect } from 'react';
import { createSelector } from 'reselect';
import { TodoFilterActionTypes, TodoSortActionTypes } from '../redux/actions/actionTypes';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, toggleTodo, deleteTodo, updateTodo } from '../redux/actions/todoActions/todoActions';
import Todo from './Todo';
import styled from 'styled-components';
import sortTodosByDeadline from '../util/sortTodosByDeadline';

const List = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 28vw;
    max-width: 500px;
    min-width: 350px;
    min-height: 100px;
    margin: 0 auto;
    margin-top: 15px;
    padding: 10px;
    border: 1px solid #181818;
    background-color: whitesmoke;
    box-shadow:
    11px 11px 0 -5px whitesmoke,
    11px 11px 0 -4px #181818,
    22px 22px 0 -10px whitesmoke,
    22px 22px 0 -9px #181818;
`;

const getFilter = state => state.todosBranch.filter;
const getSort = state => state.todosBranch.sortType;
const getTodos = state => state.todosBranch.api.todos;

const getFilteredTodos = createSelector([getFilter, getTodos], (filter, todos) => {
    switch (filter) {
        case TodoFilterActionTypes.SHOW_ALL:
            return todos;
        case TodoFilterActionTypes.SHOW_DONE:
            return todos.filter(todo => todo.isDone);
        case TodoFilterActionTypes.SHOW_NOT_DONE:
            return todos.filter(todo => !todo.isDone);
        default:
            return todos;
    }
});

const getFilteredSortedTodos = createSelector([getSort, getFilteredTodos], (sort, todos) => {
    switch (sort) {
        case TodoSortActionTypes.BY_DEADLINE_ASCENDING:
            return [...todos].sort((a, b) => sortTodosByDeadline(a, b));
        case TodoSortActionTypes.BY_DEADLINE_DESCENDING:
            return [...todos].sort((a, b) => sortTodosByDeadline(b, a));
        default:
            return todos;
    }
})

const TodoList = () => {
    const todos = useSelector(getFilteredSortedTodos);
    const error = useSelector(state => state.todosBranch.api.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, []);

    return (
        <List>
            {todos.map(todo => (
                <Todo key={todo.id} {...todo}
                    toggleTodo={() => dispatch(toggleTodo(todo))}
                    deleteTodo={() => dispatch(deleteTodo(todo.id))}
                    updateTodo={(changes) => dispatch(updateTodo(todo.id, changes))}
                />
            ))}
            {error !== null && (
                <div>
                    {error.message}
                </div>
            )}
        </List>
    )
}

export default TodoList;