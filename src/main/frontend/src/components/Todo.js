import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 2px;
    width: 25vw;
    max-width: 400px;
    min-width: 300px;
    border: 1px solid whitesmoke;
    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.75);
`;

const Body = styled.div`
    display: flex;
    border-bottom: 1px dashed black;
`;

const DescriptionBlockInput = styled.input`
    width: 100%;
    border: 1px solid black;
    border-radius: 5px;
    background-color: whitesmoke;
    padding: 15px;
    margin: 5px;
    font-size: 1.2rem;
`;

const DescriptionBlockButton = styled.button`
    width: 100%;
    border-radius: 0;
    border: none;
    background-color: whitesmoke;
    padding: 15px;
    font-size: 1.2rem;
    text-align: left;
    text-decoration-line: ${props => props.isDone ? "line-through" : "none"};
    font-style: ${props => props.isDone ? "italic" : "normal"};
    color: ${props => props.isDone ? "#5C5C5C" : "black"};

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: 0;
    }
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    background-color: whitesmoke;
    padding-left: 5px;
`;

const DeadlineContainer = styled.div`
    display: flex;
`;

const DeadlineInput = styled.input`
    width: 100%;
    margin-left: 5px;
`;

const ButtonContainer = styled.div`
    display: flex;
    margin-left: auto;
`;

const Button = styled.button`
    padding-left: 15px;
    padding-right: 15px;
    height: 24px;
    margin: 3px;
    border: 1px solid grey;
    border-radius: 3px;

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: 0;
        border: 1px solid black;
    }
`;

const Todo = ({ description, isDone, deadline, toggleTodo, deleteTodo, updateTodo }) => {
    const [editing, setEditing] = useState(false);
    const descriptionInput = useRef();
    const deadlineInput = useRef();

    const renderBody = () => {
        if (editing) {
            return <DescriptionBlockInput defaultValue={description} ref={descriptionInput} />;
        } else {
            return (
                <DescriptionBlockButton
                    isDone={isDone}
                    onClick={toggleTodo}
                >
                    {description}
                </DescriptionBlockButton>
            )
        }
    }

    const renderDeadlineContainer = () => {
        if (editing) {
            return (
                <>
                    <p>Deadline:</p>
                    <DeadlineInput
                        defaultValue={deadline}
                        ref={deadlineInput}
                    />
                </>
            )
        } else {
            return <p>Deadline: {deadline === null ? "none" : deadline}</p>;
        }
    }

    const handleUpdate = () => {
        const newDescription = descriptionInput.current.value;
        const newDeadline = deadlineInput.current.value;
        const changes = {
            description: description === newDescription ? undefined : newDescription,
            deadline: deadline === newDeadline ? undefined : newDeadline,
        }
        descriptionInput.current.value = "";
        deadlineInput.current.value = "";
        updateTodo(changes);
    }

    return (
        <Container>
            <Body>
                {renderBody()}
            </Body>
            <Footer>
                <DeadlineContainer>
                    {renderDeadlineContainer()}
                </DeadlineContainer>
                <ButtonContainer>
                    <Button onClick={() => {
                        if (editing) {
                            handleUpdate();
                            setEditing(false);
                        } else {
                            setEditing(true);
                        }
                    }}>
                        {editing ? "Accept" : "Edit"}
                    </Button>
                    <Button onClick={deleteTodo}>
                        Delete
                    </Button>
                </ButtonContainer>
            </Footer>
        </Container>
    )
};

export default React.memo(Todo);