import React from "react";
import InputComp from "../InputComp";
import { Grid, Typography, Box, Button } from "@mui/material";

const AddUniversity = (props) => {
  const { connectionInfo, inputVal, setInputVal, handleChange } = props;

  // function to add university
  const addUniversity = async () => {
    try {
      if (inputVal.uniAddr !== "" && inputVal.uniName !== "") {
        const tx = await connectionInfo.contract.addUniversity(
          inputVal.uniName,
          inputVal.uniAddr
        );
        console.log("Transaction info: ", tx);
        setInputVal({ ...inputVal, uniName: "", uniAddr: "" });
      } else {
        alert("Please enter all the fields");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        margin: "10px 0",
      }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", marginBottom: "20px" }}
          >
            Add University
          </Typography>
          <InputComp
            label="uniAddr"
            inputVal={inputVal.uniAddr}
            handleChange={handleChange}
            sx={{
              marginBottom: "10px",
            }}
          />
          <InputComp
            label="uniName"
            inputVal={inputVal.uniName}
            handleChange={handleChange}
            sx={{
              marginBottom: "20px",
            }}
          />
          <Button
            variant="contained"
            onClick={addUniversity}
            sx={{
              backgroundColor: "#4caf50",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#45a049",
              },
              width: "100%",
              margin: "10px 0",
            }}
          >
            Add University
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddUniversity;
