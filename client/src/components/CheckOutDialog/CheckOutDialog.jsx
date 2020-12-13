import React from 'react'
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const CheckOutDialog=({isShowing,hide,goCart})=>isShowing?ReactDOM.createPortal(
    <React.Fragment>
      <div>
        <Dialog style={{widht: "400px"}}
          open={isShowing}
          onClose={hide}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Thank you. Your product has been move to Cart."}</DialogTitle>
          <DialogActions style={{display: "flex", justifyContent: "space-between"}}>
            <Button style={{width: "50%"}} variant="contained" color="primary" onClick={hide} color="primary" >
              Continue Shopping
            </Button>
            <Button style={{width: "50%"}} variant="contained" color="secondary" onClick={goCart} >
              Go To Cart
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>,document.body
):null


export default CheckOutDialog