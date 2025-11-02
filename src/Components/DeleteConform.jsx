import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { updateOpen ,deleteListing } from '../Redux/DataSlice';
import { useNavigate } from 'react-router';

export default function ResponsiveDialog({id}) {
    console.log(id)
  const Navigate=useNavigate()
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

 const {open}=useSelector((state)=>state.data)

 const dispatch=useDispatch()
 const handleCancel=()=>{
   dispatch(updateOpen())
 }
  const handleClose=()=>{
  dispatch(updateOpen());
    dispatch(deleteListing(id))
    Navigate('/')
 }

  return (
    <React.Fragment>
     
      <Dialog
        fullScreen={fullScreen}
        open={open}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
       
        <DialogContent>
          <DialogContentText>
            Are you sure ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color='warning' variant='contained' onClick={handleCancel}>
           Cancel
          </Button>
          <Button color='error' variant='contained' onClick={handleClose} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
