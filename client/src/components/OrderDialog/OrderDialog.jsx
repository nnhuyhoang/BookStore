import React, { useState,useEffect,useRef } from 'react'
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDialog=({isShowing,hide})=> isShowing? ReactDOM.createPortal(
    <React.Fragment>
      <div>
        <Dialog
          open={isShowing}
          onClose={hide}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Checkout Confirmation"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Thank you for your purchase. Please check your profile for order status.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={hide} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>,document.body
    ):null


export default ConfirmDialog