import React, { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AddCategoryForm, {
  AddCategoryFormValues,
} from "./forms/AddCategoryForm";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { ICategory, useCategory } from "../context/CategoryContext";
import DestructionConfirmDialog from "./modals/DestructionConfirmDialog";
import DynamicMuiFontIcon from "./DynamicMuiFontIcon";

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    drawerPaper: {
      width: drawerWidth,
    },
    list: {
      flex: 1,
      overflowY: "auto",
    },
    toolbar: theme.mixins.toolbar,
  })
);

function SideBar() {
  const classes = useStyles();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [categoryRemove, setCategoryRemove] = useState("");

  const { categories, saveCategory, removeCategory } = useCategory();

  const addCategory = (values: AddCategoryFormValues) => {
    saveCategory(values);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <AddCategoryForm handleSubmit={addCategory} />
      <Divider />
      <List
        className={classes.list}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Categories
          </ListSubheader>
        }
      >
        <DestructionConfirmDialog
          open={open}
          handleClose={handleClose}
          handleConfirm={() => {
            router.push("/");
            removeCategory(categoryRemove);
            setOpen(false);
          }}
        />

        {categories.map((category, index) => (
          <Fragment key={category.id}>
            <Link href={`/${category.id}`} passHref>
              <ListItem button component="a">
                <ListItemIcon>
                  <DynamicMuiFontIcon iconName={category.icon} />
                </ListItemIcon>
                <ListItemText primary={category.title} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      setCategoryRemove(category.id);
                      setOpen(true);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          </Fragment>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
