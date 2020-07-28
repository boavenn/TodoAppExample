import { TodoActionTypes } from '../actionTypes';

export const fetchTodos = () => {
    return {
        type: TodoActionTypes.FETCH_TODOS,
        payload: {},
        httpAction: {
            endpoint: '/api/todos',
            options: {}
        }
    }
}

export const addTodo = (description, deadline) => {
    return {
        type: TodoActionTypes.ADD_TODO,
        payload: { description },
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

export const updateTodo = (id, changes) => {
    return {
        type: TodoActionTypes.UPDATE_TODO,
        payload: { changes },
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

export const deleteTodo = id => {
    return {
        type: TodoActionTypes.DELETE_TODO,
        payload: { id },
        httpAction: {
            endpoint: `/api/todos/${id}`,
            options: {
                method: 'DELETE'
            }
        }
    }
}

export const toggleTodo = todo => {
    return updateTodo(todo.id, { isDone: !todo.isDone });
}

