import React from "react";
import InputComp from "./InputComp";
import { Grid, Box, Button, MenuItem, Select, Typography } from "@mui/material";

const AddCollege = (props) => {
  const { connectionInfo, inputVal, setInputVal, handleChange, universities } =
    props;

  // adding college
  const addCollege = async () => {
    try {
      if (
        inputVal.uniAddr !== "" &&
        inputVal.clgAddr !== "" &&
        inputVal.clgName !== ""
      ) {
        const tx = await connectionInfo.contract.addCollege(
          inputVal.clgAddr,
          inputVal.clgName,
          inputVal.uniAddr
        );
        console.log("Transaction info: ", tx);
        setInputVal({ ...inputVal, clgAddr: "", clgName: "", uniAddr: "" });
      } else {
        alert("Please enter all the fields");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // selecting university from dropdown while adding college
  const selectUniversity = (event) => {
    const selectedUniversity = event.target.value;
    setInputVal((prevUserInfo) => ({
      ...prevUserInfo,
      uniAddr: selectedUniversity,
      clgName: "",
    }));
  };

  return (
    <Box
      sx={{
        width: "50%",
        margin: "auto",
        padding: "20px",
        // border: "1px solid #ccc",
        // borderRadius: "5px",
        // boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginBottom: "20px" }}
      >
        Add College
      </Typography>
      <Grid container spacing={2}>
        {/* University List */}
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "400",
              color: "#1D1D3E",
              margin: "8px 0",
              textAlign: "start",
            }}
          >
            uniAddr:
          </Typography>
          <Select
            value={inputVal.uniAddr}
            onChange={selectUniversity}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              margin: "5px 0",
              width: "100%",
            }}
          >
            <MenuItem value="">
              <em>Select University</em>
            </MenuItem>
            {universities.map((uni, index) => {
              return (
                <MenuItem key={uni.uniAddr} value={uni.uniAddr}>
                  {uni.uniName}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        {/* College Address */}
        <Grid item xs={12}>
          <InputComp
            label="clgAddr"
            inputVal={inputVal.clgAddr}
            handleChange={handleChange}
          />
        </Grid>
        {/* College Name */}
        <Grid item xs={12}>
          <InputComp
            label="clgName"
            inputVal={inputVal.clgName}
            handleChange={handleChange}
          />
        </Grid>
        {/* Add College Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={addCollege}
            sx={{
              margin: "10px 0",
              width: "100%",
              backgroundColor: "#4caf50",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#45a049",
              },
            }}
          >
            Add College
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddCollege;
