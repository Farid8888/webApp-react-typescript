import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

interface Loading{
  loading:boolean,
  submitHandler:()=>void
}
const LoadingButt:React.FC<Loading>=({loading,submitHandler})=> {
  return ( 
      <LoadingButton
        loading={loading}
        loadingPosition="start"
        size='small'
        startIcon={<SaveIcon />}
        variant="contained"
        endIcon={<SendIcon/>} 
        sx={{mr:"2.5%",mt:4}}
        onClick={submitHandler}
      >
        СОЗДАТЬ
      </LoadingButton>
  );
}

export default LoadingButt
