import actionTypeBuilder from '../util/actionTypeBuilder';

export const TodoActionTypes = actionTypeBuilder
    .addHttpType('FETCH_TODOS')
    .addHttpType('ADD_TODO')
    .addHttpType('UPDATE_TODO')
    .addHttpType('DELETE_TODO')
    .build();

export const TodoFilterActionTypes = actionTypeBuilder
    .addType('SHOW_ALL')
    .addType('SHOW_DONE')
    .addType('SHOW_NOT_DONE')
    .build();

export const TodoSortActionTypes = actionTypeBuilder
    .addType('BY_DEADLINE_ASCENDING')
    .addType('BY_DEADLINE_DESCENDING')
    .build();