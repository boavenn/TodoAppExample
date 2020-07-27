import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions/todoActions/todoActions';
import styled from 'styled-components';

const Container = styled.div`
    width: 28vw;
    max-width: 500px;
    min-width: 350px;
    margin: 0 auto;
    margin-top: 15px;
    padding: 15px;
    display: flex;
    justify-content: center;
    border: 1px solid black;
`;

const Form = styled.form`
    display: flex;
    width: 100%;
    justify-content: space-around;
`;

const AddTodo = () => {
    const descriptionInput = useRef();
    const deadlineInput = useRef();
    const dispatch = useDispatch();

    return (
        <Container>
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    dispatch(addTodo(descriptionInput.current.value, deadlineInput.current.value));
                    descriptionInput.current.value = "";
                    deadlineInput.current.value = "";
                }}
            >
                <input ref={descriptionInput} placeholder="Description" />
                <input ref={deadlineInput} placeholder="dd-mm-yyyy hh:mm" />
                <button>
                    Add
                </button>
            </Form>
        </Container>
    )
}

export default AddTodo;