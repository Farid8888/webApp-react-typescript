import { configureStore } from "@reduxjs/toolkit";
import {notesReducer} from './notes.slice'


export const store = configureStore({
    reducer: {
      notesReducer: notesReducer,
    },
  });

 export type RootState = ReturnType<typeof store.getState>