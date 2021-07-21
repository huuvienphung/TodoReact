import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload.todos;
        },
        addTodo: (state, action) => {
            state.todos = [...state.todos, action.payload.todo];
        },
    },
});

export const { addTodo, setTodos } = todosSlice.actions;

export const selectTodos = (state) => state.todos.todos;

export default todosSlice.reducer;
