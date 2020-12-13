import React, { useState,useEffect,useRef } from 'react'
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const QuantityDialog=({isShowing,hide,quantity,maximum})=> isShowing? ReactDOM.createPortal(
    <React.Fragment>
      <div>
        <Dialog
          open={isShowing}
          onClose={hide}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`You have bought ${quantity} copies of this book. You only can buy ${maximum-quantity} more.`}</DialogTitle>

          <DialogActions>
            <Button onClick={hide} color="primary" >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>,document.body
    ):null


export default QuantityDialog