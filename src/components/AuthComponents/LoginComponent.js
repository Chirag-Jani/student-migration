// native imports
import { useState } from "react";
import MetaMaskLogo from "../..//assets/metamask.svg";

// MUI imports
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

const LoginComponent = (props) => {
  const { connectionInfo, setUserLoggedIn, setLoggedInUserInfo } = props;

  const navigate = useNavigate();

  // let acc =
  //   connectionInfo.account.substr(0, 5) +
  //   "..." +
  //   connectionInfo.account.substr(
  //     connectionInfo.account.length - 5,
  //     connectionInfo.account.length
  //   );
  let acc = connectionInfo.account;
  // just to redirect to the related page
  const [userType, setUserType] = useState("");

  // selecting user type
  const selectUserType = (e) => {
    setUserType(e.target.value);
  };

  // login function
  const loginUser = async () => {
    try {
      const tx = await connectionInfo.contract.auth(true);
      console.log(tx);

      if (userType === "University") {
        const tx = await connectionInfo.contract.getUniversityInfo(
          connectionInfo.account
        );
        setLoggedInUserInfo(tx);
      } else if (userType === "College") {
        const tx = await connectionInfo.contract.getCollegeInfo(
          connectionInfo.account
        );
        setLoggedInUserInfo(tx);
      } else {
        const tx = await connectionInfo.contract.getStudentInfo(
          connectionInfo.account
        );
        setLoggedInUserInfo(tx);
      }

      setTimeout(() => {
        navigate("/profile");
        setUserLoggedIn(true);
        // alert("User Logged In!");
        localStorage.setItem("userLoggedIn", true);
      }, 2000);

      setUserType("");
    } catch (e) {
      console.log(e);
    }
  };
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
        value={acc}
        sx={{
          margin: "5px",
        }}
        inputProps={{ style: { textAlign: "center", fontSize: "17px" } }}
        disabled
      />
      <Select
        value={userType}
        onChange={selectUserType}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          margin: "5px",
        }}
      >
        <MenuItem value="" selected>
          <em>Select Your Designation</em>
        </MenuItem>
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="University">University</MenuItem>
        <MenuItem value="College">College</MenuItem>
        <MenuItem value="Student">Student</MenuItem>
      </Select>
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
        onClick={loginUser}
      >
        Login
      </Button>
    </Box>
  );
};
export default LoginComponent;
