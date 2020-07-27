import React from 'react';
import TodoList from './components/TodoList';
import { Provider } from 'react-redux';
import store from './redux/store';
import styled, { createGlobalStyle } from 'styled-components';
import AddTodo from './components/AddTodo';
import OptionBar from './components/OptionBar';

const GlobalStyle = createGlobalStyle`
    html, body {
        background-color: whitesmoke;
        height: 100vh;
    }
`;

const Header = styled.h1`
    margin: 0 auto;
    width: 20%;
    font-size: 2rem;
    text-align: center;
    color: #181818;
`;

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Provider store={store}>
                <Header>Todo App Example</Header>
                <AddTodo />
                <OptionBar />
                <TodoList />
            </Provider>
        </>
    )
}

export default App;