import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import React from 'react';
import db from '../../firebase';

const deleteTodo = (id) => {
    db.collection('todos').doc(id).delete();
};

const Todo = (props) => {
    return (
        <ListItem button>
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.todo.todo} />
            <ListItemSecondaryAction>
                <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={() => deleteTodo(props.todo.id)}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default Todo;
