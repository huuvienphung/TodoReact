import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: null,
    todo: null,
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload.todos;
        },
        setTodo: (state, action) => {
            state.todo = action.payload.todo;
        },
    },
});

export const { setTodos, setTodo } = todosSlice.actions;

export const selectTodos = (state) => state.todos.todos;
export const selectTodo = (state) => state.todos.todo;

export default todosSlice.reducer;
