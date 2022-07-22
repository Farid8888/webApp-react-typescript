import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CreateNote from './CreateNote';
import Notes from './Notes';
import ErrorPage from './ErrorPage';
import {useNavigate,useParams} from 'react-router-dom'
import { PageObName,PageObNum } from '../types/type';



const BasicTabs=()=> {
    const params = useParams()
    const navigate =useNavigate()
    const pageName:string = params.p!
    const pageArr:string[] = ['create','notes']
    if(!pageArr.includes(pageName)){
        return <ErrorPage/>
    }
   
    const pageObjectName:PageObName ={
        0:'create',
        1:'notes'
    }
    const pageObjectNumber:PageObNum ={
        "create":0,
        "notes":1
    }
   console.log(pageName)
    console.log(pageObjectNumber[pageName])
  const [page, setPage] = React.useState(pageObjectNumber[pageName]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
     navigate(`/${pageObjectName[newValue]}`)
    setPage(newValue);
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={page} onChange={handleChange} >
          <Tab label="СОЗДАТЬ ЗАПИСЬ"  />
          <Tab label="ЗАПИСИ" />
        </Tabs>
      </Box>
     {page === 0 && <CreateNote/>}
     {page === 1 && <Notes/>}
    </Box>
  );
}


export default BasicTabs