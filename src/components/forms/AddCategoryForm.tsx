import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconSelector from "../IconSelector";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      paddingBottom: theme.spacing(2),
    },
  })
);

export type AddCategoryFormValues = {
  title: string;
  icon: string;
};

type AddCategoryFormProps = {
  handleSubmit: (props: AddCategoryFormValues) => void;
};

const DEFAULT_VALUES: AddCategoryFormValues = {
  title: "",
  icon: "format_list_bulleted",
};

function AddCategoryForm({ handleSubmit }: AddCategoryFormProps) {
  const classes = useStyles();

  const [formState, setFormState] =
    useState<AddCategoryFormValues>(DEFAULT_VALUES);

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
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={2}>
          <IconSelector
            value={formState.icon}
            onIconChange={(iconName: string) =>
              setFormState((prevState) => ({
                ...prevState,
                icon: iconName,
              }))
            }
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Category Title"
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
        <Grid item xs={12}>
          <Button fullWidth type="submit" variant="contained" color="primary">
            Save Category
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddCategoryForm;
