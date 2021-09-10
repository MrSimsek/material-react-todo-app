import React, { Fragment, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DestructionConfirmDialog from "./modals/DestructionConfirmDialog";
import { Divider, Typography } from "@material-ui/core";

import { ITodo, useTodo } from "../context/TodoContext";
import AddTodoForm, { AddTodoFormValues } from "./forms/AddTodoForm";
import { ICategory } from "../context/CategoryContext";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    crossText: {
      textDecoration: "line-through",
    },
  })
);

type TodoListProps = {
  todos: ITodo[];
  category: ICategory;
};

function TodoList({ category, todos }: TodoListProps) {
  const classes = useStyles();
  const { updateTodo, removeTodo, saveTodo } = useTodo();

  const [open, setOpen] = useState(false);
  const [todoRemove, setTodoRemove] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (todoId: string) => () => {
    updateTodo(todoId);
  };

  const addTodo = (values: AddTodoFormValues) => {
    const newTodo: ITodo = {
      ...values,
      category: category.id,
    };
    saveTodo(newTodo);
  };

  return (
    <>
      {category?.title && (
        <Typography className={classes.title} variant="h5">
          {category?.title}
        </Typography>
      )}

      <Divider />

      <AddTodoForm handleSubmit={addTodo} />

      {todos.length === 0 && <Typography>The list is empty.</Typography>}

      {todos.length > 0 && (
        <List
          className={classes.root}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Todo Items
            </ListSubheader>
          }
        >
          <DestructionConfirmDialog
            open={open}
            handleClose={handleClose}
            handleConfirm={() => {
              removeTodo(todoRemove);
              setOpen(false);
            }}
          />

          {todos.map((todo) => {
            const labelId = `checkbox-list-label-${todo.id}`;

            return (
              <Fragment key={todo.id}>
                <ListItem
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle(todo.id)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={todo.status}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={todo.title}
                    secondary={todo.description}
                    className={clsx(todo.status && classes.crossText)}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        setTodoRemove(todo.id);
                        setOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Fragment>
            );
          })}
        </List>
      )}
    </>
  );
}

export default TodoList;
