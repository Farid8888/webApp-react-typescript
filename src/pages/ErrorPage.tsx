import * as React from 'react'
import Button from '@mui/material/Button'
import {useNavigate} from 'react-router-dom'

 
export default function ErrorPage() {
    const navigate = useNavigate()
const backHandler=()=>{
    navigate('/')
}
  return (
    <div style={{display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
    marginTop:"10rem"}}>
      <h1>
      Tакой страницы не существует
        </h1>
        <Button variant="contained" onClick={backHandler}>Назад</Button>
    </div>
  )
}
