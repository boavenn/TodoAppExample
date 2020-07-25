import httpReducerBuilder from "../../../src/redux/util/httpReducerBuilder";

describe('Proper reducer is built', () => {
    let initialState;
    let reducer;

    beforeAll(() => {
        initialState = {
            num: 10,
            fetching: false,
            error: null
        };

        const additionSubreducer = (state, action) => {
            switch (action.type) {
                case 'ADD_REQUEST':
                    return {
                        ...state,
                        fetching: true
                    };
                case 'ADD_SUCCESS':
                    return {
                        ...state,
                        num: state.num + action.response,
                        fetching: false
                    };
                case 'ADD_FAILURE':
                    return {
                        ...state,
                        fetching: false,
                        error: action.error
                    };
                default:
                    return state;
            }
        }

        reducer = httpReducerBuilder
            .addSubreducer('ADD', additionSubreducer)
            .build(initialState);
    })

    it('should return initial state when empty action is given', () => {
        // given
        const state = undefined;
        const action = {};

        // when
        const newState = reducer(state, action);

        // then
        const expected = initialState;
        expect(newState).toEqual(expected);
    });

    it('should change the state on request correctly', () => {
        // given
        const state = initialState;
        const action = {
            type: 'ADD_REQUEST'
        };

        // when
        const newState = reducer(state, action);

        // then
        const expected = {
            num: 10,
            fetching: true,
            error: null
        };
        expect(newState).toEqual(expected);
    });

    it('should change the state on success correctly', () => {
        // given
        const state = {
            num: 10,
            fetching: true,
            error: null
        };
        const action = {
            type: 'ADD_SUCCESS',
            response: 5
        };

        // when
        const newState = reducer(state, action);

        // then
        const expected = {
            num: 15,
            fetching: false,
            error: null
        };
        expect(newState).toEqual(expected);
    });

    it('should change the state on success correctly', () => {
        // given
        const state = {
            num: 10,
            fetching: true,
            error: null
        };
        const action = {
            type: 'ADD_FAILURE',
            error: 'Oops'
        };

        // when
        const newState = reducer(state, action);

        // then
        const expected = {
            num: 10,
            fetching: false,
            error: 'Oops'
        };
        expect(newState).toEqual(expected);
    });
})