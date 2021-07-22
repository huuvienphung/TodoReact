import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core';
import { CreateOutlined, Delete, Folder } from '@material-ui/icons';
import 'firebase/firebase-firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import db from '../../firebase';
import { setTodo } from './todosSlice';

const Todo = (props) => {
    const dispatch = useDispatch();

    const deleteTodo = () => {
        db.collection('todos').doc(props.todo.id).delete();
    };

    return (
        <ListItem button>
            <ListItemAvatar>
                <Avatar>
                    <Folder />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.todo.todo} />
            <ListItemSecondaryAction>
                <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={() => dispatch(setTodo({ todo: props }))}
                    style={{ marginRight: '15px' }}
                >
                    <CreateOutlined />
                </IconButton>
                <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={() => deleteTodo()}
                >
                    <Delete />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default Todo;
