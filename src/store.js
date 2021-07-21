import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './components/todo/todosSlice';

export const stotre = configureStore({
    reducer: {
        todos: todosReducer,
    },
});
