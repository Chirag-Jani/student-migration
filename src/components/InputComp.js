import React from "react";
import { Stack, TextField, Typography } from "@mui/material";

const InputComp = (props) => {
  const { label, inputVal, handleChange, disabled } = props;
  return (
    <>
      <Stack
        direction={"column"}
        spacing={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "auto",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "400",
            color: "#1D1D3E",
            margin: "8px 0",
            textAlign: "start",
          }}
        >
          {label}:
        </Typography>
        <TextField
          required
          placeholder={label}
          value={inputVal}
          onChange={handleChange}
          name={label}
          sx={{
            border: "1px solid #EEEEEE",
            backgroundColor: "#FFFFFF",
            width: "100%",
          }}
          disabled={disabled}
        />
      </Stack>
    </>
  );
};

export default InputComp;
