import React, { useMemo } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";

import DynamicMuiFontIcon from "./DynamicMuiFontIcon";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      paddingBottom: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(1),
      maxWidth: 150,
    },
    gridItem: {
      textAlign: "center",
    },
  })
);

type IconSelectorProps = {
  value: string;
  onIconChange: (icon: string) => void;
};

function IconSelector({ value, onIconChange }: IconSelectorProps) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleIconSelect = (iconName: string) => {
    onIconChange(iconName);
    handleClose();
  };

  const icons = useMemo(
    () => [
      "format_list_bulleted",
      "photo_camera",
      "account_balance",
      "airplanemode_active",
      "create",
      "fitness_center",
    ],
    []
  );

  return (
    <div>
      <IconButton
        disableFocusRipple
        disableRipple
        aria-describedby={id}
        color="primary"
        aria-label="upload picture"
        onClick={handleClick}
        component="span"
      >
        <DynamicMuiFontIcon iconName={value} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{ paper: classes.paper }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid container>
          {icons.map((iconName, index) => (
            <Grid
              className={classes.gridItem}
              key={`icon-${index}`}
              item
              xs="auto"
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                onClick={() => handleIconSelect(iconName)}
                component="span"
              >
                <DynamicMuiFontIcon iconName={iconName} />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Popover>
    </div>
  );
}

export default IconSelector;
