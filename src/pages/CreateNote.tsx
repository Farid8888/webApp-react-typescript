import * as React from "react";
import FormControl from "@mui/material/FormControl";
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Box,
  OutlinedInput,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import { Note } from "../types/type";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import SnackBar from "../components/SnackBar";
import LoadingButton from "../components/LoadingButton";
import {FormState,FormAction} from '../types/type'


const CreateNote =()=> {
  const { addNotes, addValues } = useActions();
  const { localValues } = useAppSelector((state) => state.notesReducer);
  const [open, setOpen] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState({
    text: "",
    sign: localValues.sign,
    tz: localValues.tz,
  });
  const [timezone, setTimezone] = React.useState([]);

   const initialState:FormState={
    signVal:false,
    textVal:false,
   }

   const reducer =(state:FormState,action:FormAction):FormState=>{
    switch(action.type){
      case('SIGN'):return {...state,signVal:action.payload}
      case('TEXT'):return {...state,textVal:action.payload}
      default:return state
    }
   }

   const [valState,dispatch] = React.useReducer(reducer,initialState)
  React.useEffect(() => {
    setLoading(true);
    fetch(`https://worldtimeapi.org/api/timezone`)
      .then((response) => response.json())
      .then((data) => {
        setTimezone(data);
        setLoading(false);
      })
      .catch((e) => e.message);
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValue((prevst) => {
      return { ...prevst, [name]: value };
    });
  };

  const selectHandler = (event: SelectChangeEvent<unknown>) => {
    const { value, name } = event.target;
    setValue((prevst) => {
      return { ...prevst, [name]: value };
    });
  };

  const submitHandler = () => {
    if(value.text.trim().length === 0){
      dispatch({type:'TEXT',payload:true})
    }else{
      dispatch({type:'TEXT',payload:false})
    }
    if(value.sign.trim().length === 0){
      dispatch({type:'SIGN',payload:true})
    }else{
      dispatch({type:'SIGN',payload:false})
    }  
     if(value.text.trim().length === 0 || value.sign.trim().length === 0){
      return
     }

    setValue((prevst) => {
      return { ...prevst, text: "" };
    });
    setLoading(true);
    fetch(`http://worldtimeapi.org/api/timezone/${value.tz}`)
      .then((response) => response.json())
      .then((data) => {
        const noteObj: Note = {
          text: value.text,
          sign: value.sign,
          tz: value.tz,
          date: data.datetime,
        };
        addNotes(noteObj);
        addValues({
          sign: value.sign,
          tz: value.tz,
        });
        setOpen(true);
        setTimeout(()=>{
          setLoading(false)
        },1000)
        setTimeout(() => {
          setOpen(false);
        }, 3000);
      })
      .catch((e) => {
        setLoading(false);
        setErr(true);
        setTimeout(() => {
          setErr(false);
        }, 3000);
      });
  };

  return (
    <FormControl sx={{ width: "100%", mt: 6 }}>
      <SnackBar open={open} err={err} />
      <TextField
        label="Запись"
        error={valState.textVal}
        helperText={`${valState.textVal ? 'Введите значение' : ''} `}
        InputLabelProps={{ shrink: true }}
        id="outlined-multiline-flexible"
        multiline
        sx={{ width: "100%", mx: "auto", maxWidth: "95%" }}
        rows={10}
        value={value.text}
        name="text"
        onChange={handleChange}
      />
      <div
        style={{
          width: "100%",
          maxWidth: "95%",
          margin: "auto",
          marginTop: "2rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Подпись*"
          InputLabelProps={{ shrink: true }}
          error={valState.signVal}
          helperText={`${valState.signVal ? 'Введите значение' : ''} `}
          id="outlined-multiline-flexible"
          multiline
          sx={{ width: "70%", maxWidth: "95%" }}
          rows={1}
          value={value.sign}
          name="sign"
          onChange={handleChange}
          inputProps={{ maxLength: 100 }}
        />
        <Box sx={{ width: "25%", maxWidth: "95%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" shrink={true}>
              Точное время по:
            </InputLabel>
            {timezone.length > 0 && <Select
              labelId="demo-simple-select-label"
              input={<OutlinedInput notched label={"Точное время по:"} />}
              id="demo-simple-select"
              value={value.tz}
              name="tz"
              label="Time"
              onChange={selectHandler}
            >
              {timezone.map((tz) => {
                return (
                  <MenuItem key={tz} value={tz}>
                    {tz}
                  </MenuItem>
                );
              })}
            </Select>}
          </FormControl>
        </Box>
      </div>
      <Grid container justifyContent="flex-end">
        <LoadingButton submitHandler={submitHandler} loading={loading} />
      </Grid>
    </FormControl>
  );
}

export default CreateNote