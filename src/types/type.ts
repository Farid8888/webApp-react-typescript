export type Note={
    text:string,
    sign:string,
    tz:string,
    date:Record<string,any>
  }


  export interface N{
    sign:string,
    date:string,
    text:string,
    ind:number
 }

 export interface NoteArr{
  notes:Note[]
 }

 export interface Bool{
  open:boolean,
  err:boolean
 }

export  type PageObNum={
  [index:string]:number,
}

export type PageObName={
  [index:number]:string,
}

export type FormState = {
  signVal:boolean,
  textVal:boolean,
}

export type FormAction = {
type: string,
payload:boolean
}

