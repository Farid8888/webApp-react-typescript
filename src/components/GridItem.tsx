import * as React from 'react'
import {Grid,Card,CardContent,Typography} from '@mui/material'
import {N} from '../types/type'



const GridItem:React.FC<N>=(props)=> {
  return (
        <Grid item xs={2} sm={2} md={6} >
                    <Card>
                        <CardContent>
                      <Typography component="p" variant='caption' color={'gray'}>{props.sign}</Typography>     
                      <Typography  variant="h6" component="h6" >ЗАПИСЬ № {props.ind+1}</Typography>
                      <Typography component="p" variant='caption' color={'gray'}>{props.date}</Typography>
                      <Typography component="p" variant='caption' color={'gray'}>{props.text}</Typography>
                    </CardContent>
                </Card>
        </Grid>
  )
}

export default GridItem


