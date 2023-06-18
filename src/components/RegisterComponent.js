import MetaMaskLogo from "../assets/metamask.svg";

import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";

const RegisterComponent = (props) => {
  const { universities, collegeInfo } = props;

  const [col, setCol] = useState([]);

  const [courses, setCourses] = useState([]);

  const [userInfo, setUserInfo] = useState({
    addr: "0xAb3..3yh",
    uni: "",
    clg: "",
    cour: "",
  });

  const selectUniversity = (event) => {
    const selectedUniversity = event.target.value;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      uni: selectedUniversity,
      clg: "",
    }));

    getCls(selectedUniversity);
  };

  const getCls = (universityAddress) => {
    const relatedColleges = collegeInfo.filter(
      (college) => college.uniAddr === universityAddress
    );

    setCol(relatedColleges);
  };

  const selectClg = (event) => {
    const selectedCollege = event.target.value;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      clg: selectedCollege,
      cour: "",
    }));
    getCourses();
  };

  const getCourses = () => {
    if (userInfo.uni && userInfo.clg) {
      const selectedCollege = collegeInfo.find(
        (cour) =>
          cour.collegeAddr === userInfo.clg && cour.uniAddr === userInfo.uni
      );

      setCourses(selectedCollege.courses);
    }
  };

  const selectCourse = (event) => {
    const selectedCourse = event.target.value;

    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      cour: selectedCourse,
    }));
  };

  useEffect(() => {
    getCourses();
  }, [userInfo.uni, userInfo.clg]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "5px",
      }}
    >
      <TextField
        id="outlined-basic"
        variant="outlined"
        value={userInfo.addr}
        sx={{
          margin: "5px 0",
        }}
        inputProps={{ style: { textAlign: "center", fontSize: "17px" } }}
      />
      {/* University List */}
      <Select
        value={userInfo.uni}
        onChange={selectUniversity}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          margin: "5px 0",
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
      {/* College List */}
      <Select
        value={userInfo.clg}
        onChange={selectClg}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          margin: "5px 0",
        }}
      >
        <MenuItem value="">
          <em>Select College</em>
        </MenuItem>
        {col?.map((clg) => {
          return (
            <MenuItem value={clg.collegeAddr} key={clg.collegeAddr}>
              {clg.collegeName}
            </MenuItem>
          );
        })}
      </Select>
      {/* Course List */}
      <Select
        value={userInfo.cour}
        onChange={selectCourse}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          margin: "5px 0",
        }}
      >
        <MenuItem value="">
          <em>Select Course</em>
        </MenuItem>
        {courses?.map((cour) => {
          return (
            <MenuItem value={cour.courseAddr} key={cour.courseAddr}>
              {cour.courseName}
            </MenuItem>
          );
        })}
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
        Register with your MetaMask wallet
      </Typography>
      <Button
        variant="contained"
        startIcon={<SendIcon />}
        sx={{
          margin: "5px",
          padding: "10px",
        }}
      >
        Register
      </Button>
    </Box>
  );
};
export default RegisterComponent;
