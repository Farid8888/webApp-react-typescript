import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Bool } from '../types/type';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbar:React.FC<Bool> =({open,err})=> {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={3000} >
        <Alert  severity="success" sx={{ width: '100%' }}>
          Запись создана
        </Alert>
      </Snackbar>
      <Snackbar open={err} autoHideDuration={3000} >
        <Alert  severity="error" sx={{ width: '100%' }}>
          Что то пошло не так
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default CustomizedSnackbar
