import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

type DestructionConfirmDialogProps = {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};

function DestructionConfirmDialog({
  open,
  handleClose,
  handleConfirm,
}: DestructionConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Are you sure to delete?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This process cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          color="secondary"
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DestructionConfirmDialog;
