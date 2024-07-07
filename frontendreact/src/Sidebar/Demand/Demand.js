import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./Demand.css";

const Demand = ({ handleChange }) => {
  const [cur, setCur] = React.useState('');

  const handleChange1 = (event) => {
    setCur(event.target.value);
  };
  return (
    <>
      <div className="sites_container">
        <h2 className="sidebar-title">Popularity</h2>
        <div className="solid-line3"></div>
        <FormControl variant="filled" sx={{ m: 2, minWidth: 170 }}>
          <InputLabel id="demo-simple-select-filled-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={cur}
            onChange={(e) =>{
              handleChange1(e);
              handleChange(e);
              }}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="MtoL">Most in Demand</MenuItem>
            <MenuItem value="LtoM">Least in Demand</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default Demand;
