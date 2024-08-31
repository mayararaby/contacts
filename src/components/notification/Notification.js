import React from "react"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export const Notification = ({ type ,msg, open, close}) => {

  return <Snackbar open={open} autoHideDuration={6000} onClose={() => close(false)}  >
    <Alert
      severity={type}
      variant="filled"
      sx={{ width: '100%' }}
      onClose={() => close(false)} 
    >
      {msg}
    </Alert>
  </Snackbar>
}