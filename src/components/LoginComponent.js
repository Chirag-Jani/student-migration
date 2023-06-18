import MetaMaskLogo from "../assets/metamask.svg";

import { Box, Button, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

const LoginComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        id="outlined-basic"
        variant="outlined"
        value="0xAb3..3yh"
        sx={{
          margin: "5px",
        }}
        inputProps={{ style: { textAlign: "center", fontSize: "20px" } }}
        disabled
      />
      <Typography
        sx={{
          margin: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={MetaMaskLogo}
          alt=""
          style={{
            width: "30px",
            height: "auto",
            margin: "0 10px",
          }}
        />{" "}
        Login with your MetaMask wallet
      </Typography>
      <Button
        variant="contained"
        startIcon={<LoginIcon />}
        sx={{
          margin: "5px",
          padding: "10px",
        }}
      >
        Login
      </Button>
    </Box>
  );
};
export default LoginComponent;
