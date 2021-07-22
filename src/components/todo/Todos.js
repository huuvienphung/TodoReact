import { Button, ButtonGroup, List, TextField } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import db from '../../firebase';
import Todo from './Todo';
import { selectTodos, setTodo, setTodos } from './todosSlice';

const Todos = () => {
    // form hook
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // use selector/dispatch
    const { todos, todo } = useSelector(selectTodos);
    const dispatch = useDispatch();

    // call api firebase
    useEffect(() => {
        db.collection('todos')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                dispatch(
                    setTodos({
                        todos: snapshot.docs.map((doc) => ({
                            id: doc.id,
                            todo: doc.data().todo,
                        })),
                    })
                );
            });
        // eslint-disable-next-line
    }, []);

    // submit form
    const onSubmit = (data) => {
        if (todo) {
            db.collection('todos').doc(todo?.todo.id).set(
                {
                    todo: data.valueTodo,
                },
                { merge: true }
            );
            dispatch(setTodo({ todo: null }));
        } else {
            db.collection('todos').add({
                todo: data.valueTodo,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        }
        reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {errors.valueTodo && <span>input is required</span>}
                <br />
                <TextField
                    type='text'
                    {...register('valueTodo', { required: true })}
                    id='standard-basic'
                    label={
                        todo ? `Before value: ${todo?.todo.todo}` : 'New Todo'
                    }
                />
                <ButtonGroup>
                    <Button type='submit' variant='contained' color='primary'>
                        {todo ? 'Update Todo' : 'Add Todo'}
                    </Button>
                    {todo && (
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={() => {
                                dispatch(setTodo({ todo: null }));
                                reset();
                            }}
                        >
                            Cancel
                        </Button>
                    )}
                </ButtonGroup>
            </form>

            <List component='nav' aria-label='mailbox folders'>
                {todos?.map((todo, index) => {
                    return <Todo key={index} todo={todo} />;
                })}
            </List>
        </div>
    );
};

export default Todos;
