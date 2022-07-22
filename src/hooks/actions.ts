import {useDispatch} from 'react-redux'
import {bindActionCreators} from '@reduxjs/toolkit'
import {notesActions} from '../store/notes.slice'

const actions={
    ...notesActions
}


export const useActions =()=>{
const dispatch = useDispatch()
return bindActionCreators(actions,dispatch)
}