import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2, 0),
      display: "flex",
      flexDirection: "row",
      flexGrow: 1,
    },
    textField: {
      marginRight: theme.spacing(2),
    },
  })
);

export type AddTodoFormValues = {
  title: string;
  description: string;
};

type AddTodoFormProps = {
  handleSubmit: (props: AddTodoFormValues) => void;
};

const DEFAULT_VALUES: AddTodoFormValues = {
  title: "",
  description: "",
};

function AddTodoForm({ handleSubmit }: AddTodoFormProps) {
  const classes = useStyles();

  const [formState, setFormState] = useState<AddTodoFormValues>(DEFAULT_VALUES);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleSubmit(formState);

    setFormState(DEFAULT_VALUES);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={5}>
          <TextField
            fullWidth
            className={classes.textField}
            label="Todo Title"
            variant="outlined"
            margin="dense"
            value={formState.title}
            onChange={(e) =>
              setFormState((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            fullWidth
            label="Todo Description"
            variant="outlined"
            margin="dense"
            value={formState.description}
            onChange={(e) =>
              setFormState((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={2}>
          <Button fullWidth type="submit" variant="contained" color="primary">
            Save Todo
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddTodoForm;
