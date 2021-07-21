import { Button, List, TextField } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import db from '../../firebase';
import Todo from './Todo';
import { selectTodos, setTodos } from './todosSlice';

const Todos = () => {
    // form hook
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // use selec/dispatch
    const todos = useSelector(selectTodos);
    const dispatch = useDispatch();

    useEffect(() => {
        db.collection('todos')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                dispatch(
                    setTodos({
                        todos: snapshot.docs.map((doc) => doc.data().todo),
                    })
                );
            });
        // eslint-disable-next-line
    }, []);

    // submit form
    const onSubmit = (data) => {
        db.collection('todos').add({
            todo: data.todo,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        // dispatch(addTodo({ todo: data.todo }));
        reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {errors.todo && <span>input is required</span>}
                <br />
                <TextField
                    type='text'
                    {...register('todo', { required: true })}
                    id='standard-basic'
                    label='New Todo'
                />
                <Button
                    type='submit'
                    value='Submit'
                    variant='contained'
                    color='primary'
                >
                    Add Todo
                </Button>
            </form>

            <List component='nav' aria-label='mailbox folders'>
                {todos.map((todo, index) => {
                    return <Todo key={index} todo={todo} />;
                })}
            </List>
        </div>
    );
};

export default Todos;
