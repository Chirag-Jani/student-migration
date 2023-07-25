import React, { useState } from "react";
import InputComp from "./InputComp";
import { Grid, Box, Button, MenuItem, Select, Typography } from "@mui/material";

const AddCourse = (props) => {
  const { connectionInfo, inputVal, setInputVal, handleChange, universities } =
    props;

  // state to show colleges related to the selected university
  const [col, setCol] = useState([]);

  // static for now, match the same as in contract
  const courseTypes = [
    {
      num: 1,
      name: "Computer",
    },
    {
      num: 2,
      name: "Commerce",
    },
    {
      num: 3,
      name: "Science",
    },
  ];

  // adding college
  const addCourse = async () => {
    try {
      if (
        inputVal.uniAddr !== "" &&
        inputVal.clgAddr !== "" &&
        inputVal.courseName !== "" &&
        inputVal.courseAddr !== ""
      ) {
        const tx = await connectionInfo.contract.addCourse(
          inputVal.courseName,
          inputVal.courseAddr,
          inputVal.type,
          inputVal.clgAddr,
          inputVal.uniAddr,
          Number(inputVal.courseSeats)
        );
        console.log("Transaction info: ", tx);
        setInputVal({
          uniName: "",
          uniAddr: "",
          clgName: "",
          clgAddr: "",
          courseName: "",
          courseAddr: "",
        });
      } else {
        alert("Please enter all the fields");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // selecting university from dropdown while adding college
  const selectUniversity = (event) => {
    setCol([]);
    const selectedUniversity = event.target.value;
    setInputVal((prevUserInfo) => ({
      ...prevUserInfo,
      uniAddr: selectedUniversity,
      clgName: "",
    }));

    getCls(selectedUniversity);
  };

  // getting colleges
  const getCls = (universityAddress) => {
    const selectedUniversity = universities.find(
      (uni) => universityAddress === uni.uniAddr
    );
    selectedUniversity.uniColleges?.map(async (college) => {
      try {
        let clg = await connectionInfo.contract.getCollegeInfo(college);
        setCol((prevCols) => [...prevCols, clg]);
      } catch (e) {
        console.log(e);
      }
    });
  };

  // selecting college
  const selectClg = (event) => {
    const selectedCollege = event.target.value;
    setInputVal((prevUserInfo) => ({
      ...prevUserInfo,
      clgAddr: selectedCollege,
      cour: "",
    }));
  };

  // selecting course
  const selectCourseType = (event) => {
    const selectedCourse = event.target.value;
    setInputVal((prevUserInfo) => ({
      ...prevUserInfo,
      type: selectedCourse,
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
        Add Course
      </Typography>
      <Grid container spacing={2}>
        {/* University List */}
        <Grid item xs={12} md={6}>
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
              margin: "10px 0",
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
        {/* College List */}
        <Grid item xs={12} md={6}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "400",
              color: "#1D1D3E",
              margin: "8px 0",
              textAlign: "start",
            }}
          >
            clgAddr:
          </Typography>
          <Select
            value={inputVal.clgAddr}
            onChange={selectClg}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              margin: "10px 0",
              width: "100%",
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
        </Grid>
        {/* Course Name */}
        <Grid item xs={12}>
          <InputComp
            label="courseName"
            inputVal={inputVal.courseName}
            handleChange={handleChange}
          />
        </Grid>
        {/* Course Address */}
        <Grid item xs={12}>
          <InputComp
            label="courseAddr"
            inputVal={inputVal.courseAddr}
            handleChange={handleChange}
          />
        </Grid>
        {/* Course Type */}
        <Grid item xs={12} md={6}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "400",
              color: "#1D1D3E",
              margin: "8px 0",
              textAlign: "start",
            }}
          >
            type:
          </Typography>
          <Select
            value={inputVal.type}
            onChange={selectCourseType}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              // margin: "10px 0",
              width: "100%",
            }}
          >
            <MenuItem value="">
              <em>Select Course Type</em>
            </MenuItem>
            {courseTypes?.map((course) => {
              return (
                <MenuItem value={course.num} key={course.num}>
                  {course.name}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        {/* Course Seats */}
        <Grid item xs={12} md={6}>
          <InputComp
            label="courseSeats"
            inputVal={inputVal.courseSeats}
            handleChange={handleChange}
          />
        </Grid>
        {/* Add Course Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={addCourse}
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
            Add Course
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddCourse;
