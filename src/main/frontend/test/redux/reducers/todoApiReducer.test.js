import todoApiReducer, { todoApiInitialState } from "../../../src/redux/reducers/todoApiReducer";
import { TodoActionTypes } from "../../../src/redux/actions/actionTypes";

describe('Todo fetch handling', () => {
    it('should return initial state when empty action is given', () => {
        expect(todoApiReducer(undefined, {})).toEqual(todoApiInitialState);
    })

    it('should change the state on request correctly', () => {
        // given
        const state = todoApiInitialState;
        const action = {
            type: TodoActionTypes.FETCH_TODOS_REQUEST,
            payload: {}
        };

        // when
        const newState = todoApiReducer(state, action);

        // then
        const expectedState = {
            isFetching: true,
            error: null,
            todos: []
        }
        expect(newState).toEqual(expectedState);
    })

    it('should change the state on success correctly', () => {
        // given
        const state = {
            isFetching: true,
            error: null,
            todos: []
        };
        const todos = [
            {
                id: 1,
                description: "todo1",
                isDone: false,
                deadline: null
            },
            {
                id: 2,
                description: "todo2",
                isDone: true,
                deadline: "02-02-2020 13:30"
            }
        ];
        const action = {
            type: TodoActionTypes.FETCH_TODOS_SUCCESS,
            response: todos
        };

        // when
        const newState = todoApiReducer(state, action);

        // then
        const expectedState = {
            isFetching: false,
            error: null,
            todos: todos
        }
        expect(newState).toEqual(expectedState);
    })

    it('should change the state on failure correctly', () => {
        // given
        const state = {
            isFetching: true,
            error: null,
            todos: []
        };
        const action = {
            type: TodoActionTypes.FETCH_TODOS_FAILURE,
            error: 'Oops'
        };

        // when
        const newState = todoApiReducer(state, action);

        // then
        const expectedState = {
            isFetching: false,
            error: 'Oops',
            todos: []
        }
        expect(newState).toEqual(expectedState);
    })
});

describe('Todo add handling', () => {
    it('should change the state on request correctly', () => {
        // given
        const state = {
            isFetching: false,
            error: 'Oops',
            todos: []
        };
        const action = {
            type: TodoActionTypes.ADD_TODO_REQUEST,
            payload: {}
        };

        // when
        const newState = todoApiReducer(state, action);

        // then
        const expectedState = {
            isFetching: false,
            error: null,
            todos: []
        }
        expect(newState).toEqual(expectedState);
    })

    it('should change the state on success correctly', () => {
        // given
        const state = {
            isFetching: false,
            error: null,
            todos: [{
                id: 1,
                description: "todo1",
                isDone: false,
                deadline: null
            }]
        };
        const addedTodo = {
            id: 2,
            description: "todo2",
            isDone: false,
            deadline: "02-02-2020 15:23"
        }
        const action = {
            type: TodoActionTypes.ADD_TODO_SUCCESS,
            response: addedTodo
        };

        // when
        const newState = todoApiReducer(state, action);

        // then
        const expectedState = {
            isFetching: false,
            error: null,
            todos: [...state.todos, addedTodo]
        }
        expect(newState).toEqual(expectedState);
    })

    it('should change the state on failure correctly', () => {
        // given
        const state = {
            isFetching: false,
            error: null,
            todos: []
        };
        const action = {
            type: TodoActionTypes.ADD_TODO_FAILURE,
            error: 'Oops'
        };

        // when
        const newState = todoApiReducer(state, action);

        // then
        const expectedState = {
            isFetching: false,
            error: 'Oops',
            todos: []
        }
        expect(newState).toEqual(expectedState);
    })
});

describe('Todo update handling', () => {
    it('should change the state on request correctly', () => {
        // given
        const state = {
            isFetching: false,
            error: 'Oops',
            todos: []
        };
        const action = {
            type: TodoActionTypes.UPDATE_TODO_REQUEST,
            payload: {}
        };

        // when
        const newState = todoApiReducer(state, action);

        // then
        const expectedState = {
            isFetching: false,
            error: null,
            todos: []
        }
        expect(newState).toEqual(expectedState);
    })

    it('should change the state on success correctly', () => {
        // given
        const state = {
            isFetching: false,
            error: null,
            todos: [{
                id: 1,
                description: "todo1",
                isDone: false,
                deadline: null
            }]
        };
        const updatedTodo = {
            id: 1,
            description: "updated",
            isDone: true,
            deadline: "02-02-2020 15:23"
        }
        const action = {
            type: TodoActionTypes.UPDATE_TODO_SUCCESS,
            response: updatedTodo
        };

        // when
        const newState = todoApiReducer(state, action);

        // then
        const expectedState = {
            isFetching: false,
            error: null,
            todos: [updatedTodo]
        }
        expect(newState).toEqual(expectedState);
    })

    it('should change the state on failure correctly', () => {
        // given
        const state = {
            isFetching: false,
            error: null,
            todos: []
        };
        const action = {
            type: TodoActionTypes.UPDATE_TODO_FAILURE,
            error: 'Oops'
        };

        // when
        const newState = todoApiReducer(state, action);

        // then
        const expectedState = {
            isFetching: false,
            error: 'Oops',
            todos: []
        }
        expect(newState).toEqual(expectedState);
    })
});

describe('Todo delete handling', () => {
    it('should change the state on request correctly', () => {
        // given
        const state = {
            isFetching: false,
            error: 'Oops',
            todos: []
        };
        const action = {
            type: TodoActionTypes.DELETE_TODO_REQUEST,
            payload: {}
        };

        // when
        const newState = todoApiReducer(state, action);

        // then
        const expectedState = {
            isFetching: false,
            error: null,
            todos: []
        }
        expect(newState).toEqual(expectedState);
    })

    it('should change the state on success correctly', () => {
        // given
        const state = {
            isFetching: false,
            error: null,
            todos: [{
                id: 1,
                description: "todo1",
                isDone: false,
                deadline: null
            }]
        };
        const action = {
            type: TodoActionTypes.DELETE_TODO_SUCCESS,
            payload: {
                id: 1
            }
        };

        // when
        const newState = todoApiReducer(state, action);

        // then
        const expectedState = {
            isFetching: false,
            error: null,
            todos: []
        }
        expect(newState).toEqual(expectedState);
    })

    it('should change the state on failure correctly', () => {
        // given
        const state = {
            isFetching: false,
            error: null,
            todos: []
        };
        const action = {
            type: TodoActionTypes.DELETE_TODO_FAILURE,
            error: 'Oops'
        };

        // when
        const newState = todoApiReducer(state, action);

        // then
        const expectedState = {
            isFetching: false,
            error: 'Oops',
            todos: []
        }
        expect(newState).toEqual(expectedState);
    })
});