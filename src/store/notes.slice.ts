import { store } from './index';
import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import {Note} from '../types/type'


type ValObj={
    sign:string,
    tz:string
}

interface NoteState{
    notes:Note[],
    localValues:ValObj
}

const initialState:NoteState = {
    notes:[],
    localValues:JSON.parse(localStorage.getItem('SIGN_KEY') ?? '{}')
}


export const notesSlice=createSlice({
    name:'notes',
    initialState,
    reducers:{
      addNotes(state,action:PayloadAction<Note>){
        state.notes.push(action.payload)
      },
      addValues(state,action:PayloadAction<ValObj>){
        state.localValues.sign = action.payload.sign
        state.localValues.tz = action.payload.tz
       localStorage.setItem('SIGN_KEY',JSON.stringify(
        state.localValues
       ))
      }
    }  
}) 

export const notesReducer =notesSlice.reducer
export const notesActions = notesSlice.actions