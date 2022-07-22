import * as React from "react";
import {
  Grid,
  Pagination,
  Stack,
  Container,
  PaginationItem,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import GridItem from "./GridItem";
import { NoteArr } from "../types/type";


const GridList:React.FC<NoteArr> = ({ notes}) => {
  const location = useLocation();
  const [value, setValue] = React.useState(
    parseInt(location.search?.split("=")[1]) || 1
  );
  const changeHandler = (num: any) => {
    setValue(num);
  };
  const startP = value * 6 - 6;
  const endP = value * 6;
  const tmNotes = notes.slice(startP, endP);

  if (notes.length === 0) {
    return (
      <Typography align="center" variant="h3" sx={{ my: 25 }}>
        Записей нет
      </Typography>
    );
  }

  return (
    <Container sx={{ my: 3, alignItems: "center" }}>
      <Grid
        container
        spacing={{ xs: 3, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {tmNotes.map((note: any, i: number) => {
          return (
            <GridItem
              key={note.date}
              text={note.text}
              sign={note.sign}
              date={note.date}
              ind={i + startP}
            />
          );
        })}
      </Grid>
      <Stack spacing={2} sx={{ my: 5, alignItems: "center" }}>
        <Pagination
          count={10}
          page={value}
          onChange={(_, num) => changeHandler(num)}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`${location.pathname}?page=${item.page}`}
              {...item}
            />
          )}
        />
      </Stack>
    </Container>
  );
};

export default GridList;
