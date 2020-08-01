import { createAction } from '@reduxjs/toolkit';

export const showAll = createAction('filter/show_all');
export const showDone = createAction('filter/show_done');
export const showNotDone = createAction('filter/show_not_done');

export const sortByDeadlineAscending = createAction('sort/by_deadline-ascending');
export const sortByDeadlineDescending = createAction('sort/by_deadline_descending');

export const fetchTodos = createAction('todos/fetch', () => {
    return {
        payload: {},
        meta: {
            httpAction: {
                endpoint: '/api/todos',
                options: {}
            }
        }
    }
});

export const addTodo = createAction('todos/add', (description, deadline) => {
    return {
        payload: { description, deadline },
        meta: {
            httpAction: {
                endpoint: '/api/todos',
                options: {
                    method: 'POST',
                    body: JSON.stringify({
                        description: description,
                        deadline: deadline
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            }
        }
    }
})

export const updateTodo = createAction('todos/update', (id, changes) => {
    return {
        payload: { id, changes },
        meta: {
            httpAction: {
                endpoint: `/api/todos/${id}`,
                options: {
                    method: 'PATCH',
                    body: JSON.stringify({
                        description: changes.description,
                        deadline: changes.deadline,
                        isDone: changes.isDone
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            }
        }
    }
})

export const deleteTodo = createAction('todos/delete', id => {
    return {
        payload: { id },
        meta: {
            httpAction: {
                endpoint: `/api/todos/${id}`,
                options: {
                    method: 'DELETE'
                }
            }
        }
    }
})

export const toggleTodo = todo => updateTodo(todo.id, { isDone: !todo.isDone });