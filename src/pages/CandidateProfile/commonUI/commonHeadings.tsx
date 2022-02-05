import * as React from "react";
import { useState, FunctionComponent, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  Select,
  Typography,
  MenuItem,
  InputLabel,
  Divider,
  FormLabel,
} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";

export const MyTextField = (
  label,
  placeholder,
  props,
  register,
  multiline?
) => {
  return (
    <React.Fragment>
      <Typography variant="body2">{label}</Typography>
      <TextField
        variant="outlined"
        placeholder={placeholder}
        multiline={multiline ? true : false}
        inputRef={register}
      />
    </React.Fragment>
  );
};

export const SelectField = (props) => {
  return (
    <React.Fragment>
      <FormControl variant="outlined">
        <Select
          {...props}
          // onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setValue(e.target.value)}}
        >
          {Object.keys(props.options).map((c, index) => (
            <MenuItem key={index} value={c}>
              {props.options[c].replace("_", "-")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </React.Fragment>
  );
};

export const ProfileSubHeadings = (labelName: string) => {
  return (
    <React.Fragment>
      <Grid container className="position-collapsible-label">
        <Typography variant="h1">{labelName}</Typography>
      </Grid>
    </React.Fragment>
  );
};
