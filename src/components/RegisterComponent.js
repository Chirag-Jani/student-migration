// native imports
import { useCallback, useState } from "react";
import MetaMaskLogo from "../assets/metamask.svg";

// MUI imports
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const RegisterComponent = (props) => {
  const { universities, collegeInfo, connectionInfo } = props;

  // state to show colleges related to the selected university
  const [col, setCol] = useState([]);

  // state to show courses related to the selected college
  const [courses, setCourses] = useState([]);

  // state to signup
  const [userInfo, setUserInfo] = useState({
    // addr:
    //   connectionInfo.account.substr(0, 5) +
    //   "..." +
    //   connectionInfo.account.substr(
    //     connectionInfo.account.length - 5,
    //     connectionInfo.account.length
    //   ),
    addr: connectionInfo.account,
    uni: "",
    clg: "",
    cour: "",
    name: "",
  });

  // selecting university (to render colleges based on selection)
  const selectUniversity = (event) => {
    setCol([]);
    setCourses([]);
    const selectedUniversity = event.target.value;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      uni: selectedUniversity,
      clg: "",
    }));

    // helper function to get the colleges
    getCls(selectedUniversity);
  };

  // getting colleges
  const getCls = (universityAddress) => {
    const relatedColleges = collegeInfo.filter(
      (college) => college.uniAddr === universityAddress
    );
    console.log(relatedColleges);

    // updating the college list
    setCol(relatedColleges);
  };

  // selecting college
  const selectClg = (event) => {
    setCourses([]);
    const selectedCollege = event.target.value;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      clg: selectedCollege,
      cour: "",
    }));

    // helper function to get the courses
    // getting college info
    let clgInfo;

    // setting college
    // eslint-disable-next-line
    col.map((college) => {
      // return college.addr === selectedCollege;
      if (college.addr === selectedCollege) {
        clgInfo = college;
      }
    });
    console.log(clgInfo);
    getCourses(clgInfo);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCourses = useCallback((clgInfo) => {
    // getting course info and setting
    clgInfo.courses?.map(async (course) => {
      try {
        let tx = await connectionInfo.contract.getCourseInfo(course);
        setCourses((prevCourses) => [...prevCourses, tx]);
      } catch (e) {
        console.log(e);
      }
    });

    console.log(courses);
  });

  const selectCourse = (event) => {
    const selectedCourse = event.target.value;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      cour: selectedCourse,
    }));
  };

  // signing up the user
  const registerUser = async () => {
    try {
      // alert("Signup func remains:\n" + connectionInfo.account);

      const tx = await connectionInfo.contract.signup(
        userInfo.name,
        userInfo.cour,
        userInfo.clg,
        userInfo.uni
      );
      console.log(tx);
      setUserInfo({
        uni: "",
        clg: "",
        cour: "",
        name: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

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
        disabled
      />
      <TextField
        id="outlined-basic"
        variant="outlined"
        value={userInfo.name}
        onChange={(e) => {
          setUserInfo({ ...userInfo, name: e.target.value });
        }}
        sx={{
          margin: "5px 0",
        }}
        inputProps={{ style: { textAlign: "center", fontSize: "17px" } }}
        placeholder="Enter Your Name"
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
            <MenuItem value={clg.addr} key={clg.addr}>
              {clg.clgName}
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
            <MenuItem value={cour.addr} key={cour.addr}>
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
        onClick={registerUser}
      >
        Register
      </Button>
    </Box>
  );
};
export default RegisterComponent;
