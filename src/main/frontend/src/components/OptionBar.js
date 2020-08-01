import React from 'react';
import styled from 'styled-components';
import { showDone, showAll, showNotDone } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';
import { sortByDeadlineAscending, sortByDeadlineDescending } from '../redux/actions/actions';

const Container = styled.div`
    width: 28vw;
    max-width: 500px;
    min-width: 350px;
    margin: 0 auto;
    margin-top: 15px;
    padding: 15px;
    display: flex;
    justify-content: space-around;
    border: 1px solid black;
`;

const OptionBar = () => {
    const dispatch = useDispatch();
    const filterActions = [showAll, showDone, showNotDone];
    const sortActions = [sortByDeadlineAscending, sortByDeadlineDescending];

    return (
        <Container>
            <p>Filter:</p>
            <select onChange={e => dispatch(filterActions[e.currentTarget.value]())}>
                <option value={0}>ALL</option>
                <option value={1}>DONE</option>
                <option value={2}>NOT DONE</option>
            </select>
            <p>By deadline:</p>
            <select onChange={e => dispatch(sortActions[e.currentTarget.value]())}>
                <option value={0}>Ascending</option>
                <option value={1}>Descending</option>
            </select>
        </Container>
    )
}

export default OptionBar;