import * as React from 'react'
import GridList from '../components/GridList'
import {useAppSelector} from '../hooks/redux'

export default function Notes() {
  const {notes} = useAppSelector(state=>state.notesReducer)
  return (
    <>
      <GridList notes={notes}/>
    </>
  )
}
