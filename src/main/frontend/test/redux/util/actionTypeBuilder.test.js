import actionTypeBuilder from "../../../src/redux/util/actionTypeBuilder";

describe('actionTypeBuilder', () => {
    it('should create proper action types', () => {
        // given
        const normalType = 'DO_SMTH_NORMAL';
        const httpType = 'FETCH_SMTH';

        // when
        const types = actionTypeBuilder
            .addType(normalType)
            .addHttpType(httpType)
            .build();

        // then
        const expected = {
            DO_SMTH_NORMAL: 'DO_SMTH_NORMAL',
            FETCH_SMTH: 'FETCH_SMTH',
            FETCH_SMTH_REQUEST: 'FETCH_SMTH_REQUEST',
            FETCH_SMTH_SUCCESS: 'FETCH_SMTH_SUCCESS',
            FETCH_SMTH_FAILURE: 'FETCH_SMTH_FAILURE'
        }
        expect(types).toEqual(expected);
    })
})