import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";

const Transfer = () => {
  const universities = [
    {
      addr: "0xUNI1",
      uniName: "University 1",
      colleges: ["0xCOL1", "0xCOL2", "0xCOL3"],
    },
    {
      addr: "0xUNI2",
      uniName: "University 2",
      colleges: ["0xCOL4", "0xCOL5", "0xCOL6"],
    },
  ];

  const colleges = [
    {
      addr: "0xCOL1",
      clgName: "College 1",
      uniAddr: "0xUNI1",
      courses: ["0xCOURSE1", "0xCOURSE2", "0xCOURSE2"],
    },
    {
      addr: "0xCOL2",
      clgName: "College 2",
      uniAddr: "0xUNI1",
      courses: ["0xCOURSE3", "0xCOURSE4"],
    },
    {
      addr: "0xCOL3",
      clgName: "College 3",
      uniAddr: "0xUNI1",
      courses: ["0xCOURSE6"],
    },
    {
      addr: "0xCOL4",
      clgName: "College 4",
      uniAddr: "0xUNI2",
      courses: ["0xCOURSE7", "0xCOURSE8"],
    },
    {
      addr: "0xCOL5",
      clgName: "College 5",
      uniAddr: "0xUNI2",
      courses: ["0xCOURSE9", "0xCOURSE10"],
    },
    {
      addr: "0xCOL6",
      clgName: "College 6",
      uniAddr: "0xUNI2",
      courses: ["0xCOURSE11", "0xCOURSE12"],
    },
  ];

  const courses = [
    {
      addr: "0xCOURSE1",
      totalSeats: 100,
      availableSeats: 50,
      courseType: "Course Type 1",
      courseName: "Course 1 - College 1",
      clgAddr: "0xCOL1",
      uniAddr: "0xUNI1",
    },
    {
      addr: "0xCOURSE2",
      totalSeats: 80,
      availableSeats: 20,
      courseType: "Course Type 2",
      courseName: "Course 2 - College 1",
      clgAddr: "0xCOL1",
      uniAddr: "0xUNI1",
    },
    {
      addr: "0xCOURSE5",
      totalSeats: 150,
      availableSeats: 70,
      courseType: "Course Type 1",
      courseName: "Course 1 - College 3",
      clgAddr: "0xCOL3",
      uniAddr: "0xUNI1",
    },
    {
      addr: "0xCOURSE3",
      totalSeats: 120,
      availableSeats: 60,
      courseType: "Course Type 1",
      courseName: "Course 1 - College 2",
      clgAddr: "0xCOL2",
      uniAddr: "0xUNI1",
    },
    {
      addr: "0xCOURSE4",
      totalSeats: 90,
      availableSeats: 30,
      courseType: "Course Type 2",
      courseName: "Course 2 - College 2",
      clgAddr: "0xCOL2",
      uniAddr: "0xUNI1",
    },
    {
      addr: "0xCOURSE6",
      totalSeats: 70,
      availableSeats: 20,
      courseType: "Course Type 2",
      courseName: "Course 2 - College 3",
      clgAddr: "0xCOL3",
      uniAddr: "0xUNI1",
    },
    {
      addr: "0xCOURSE7",
      totalSeats: 80,
      availableSeats: 40,
      courseType: "Course Type 1",
      courseName: "Course 1 - College 4",
      clgAddr: "0xCOL4",
      uniAddr: "0xUNI2",
    },
    {
      addr: "0xCOURSE8",
      totalSeats: 60,
      availableSeats: 10,
      courseType: "Course Type 2",
      courseName: "Course 2 - College 4",
      clgAddr: "0xCOL4",
      uniAddr: "0xUNI2",
    },
    {
      addr: "0xCOURSE9",
      totalSeats: 110,
      availableSeats: 55,
      courseType: "Course Type 1",
      courseName: "Course 1 - College 5",
      clgAddr: "0xCOL5",
      uniAddr: "0xUNI2",
    },
    {
      addr: "0xCOURSE10",
      totalSeats: 70,
      availableSeats: 30,
      courseType: "Course Type 2",
      courseName: "Course 2 - College 5",
      clgAddr: "0xCOL5",
      uniAddr: "0xUNI2",
    },
    {
      addr: "0xCOURSE11",
      totalSeats: 90,
      availableSeats: 45,
      courseType: "Course Type 1",
      courseName: "Course 1 - College 6",
      clgAddr: "0xCOL6",
      uniAddr: "0xUNI2",
    },
    {
      addr: "0xCOURSE12",
      totalSeats: 75,
      availableSeats: 25,
      courseType: "Course Type 2",
      courseName: "Course 2 - College 6",
      clgAddr: "0xCOL6",
      uniAddr: "0xUNI2",
    },
  ];

  const [transferType, setTransferType] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const handleTransferTypeChange = (event) => {
    setTransferType(event.target.value);
    setSelectedUniversity("");
    setSelectedCollege("");
    setSelectedCourse("");
  };

  const handleUniversityChange = (event) => {
    setSelectedUniversity(event.target.value);
    setSelectedCollege("");
    setSelectedCourse("");
  };

  const handleCollegeChange = (event) => {
    setSelectedCollege(event.target.value);
    setSelectedCourse("");
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleInitiateTransfer = () => {
    console.log("Transfer Type:", transferType);
    console.log("Selected University:", selectedUniversity);
    console.log("Selected College:", selectedCollege);
    console.log("Selected Course:", selectedCourse);
  };

  const filteredColleges =
    transferType === "COLLEGE_TO_COLLEGE_SAME_UNIVERSITY"
      ? colleges.filter((college) => college.uniAddr === selectedUniversity)
      : colleges;

  const filteredCourses =
    transferType === "COLLEGE_TO_COLLEGE_SAME_UNIVERSITY"
      ? courses.filter((course) => course.clgAddr === selectedCollege)
      : courses;

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "16px",
      }}
    >
      <FormControl
        fullWidth
        sx={{
          marginBottom: "16px",
        }}
      >
        <InputLabel>Transfer Type</InputLabel>
        <Select value={transferType} onChange={handleTransferTypeChange}>
          <MenuItem value="COLLEGE_TO_COLLEGE_SAME_UNIVERSITY">
            College to College (Same University)
          </MenuItem>
          <MenuItem value="COLLEGE_TO_COLLEGE_DIFFERENT_UNIVERSITY">
            College to College (Different University)
          </MenuItem>
        </Select>
      </FormControl>

      {transferType === "COLLEGE_TO_COLLEGE_SAME_UNIVERSITY" && (
        <div>
          <FormControl
            fullWidth
            sx={{
              marginBottom: "16px",
            }}
          >
            <InputLabel>University</InputLabel>
            <Select
              value={selectedUniversity}
              onChange={handleUniversityChange}
            >
              {universities.map((university, index) => (
                <MenuItem key={index} value={university.addr}>
                  {university.uniName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedUniversity && (
            <FormControl
              fullWidth
              sx={{
                marginBottom: "16px",
              }}
            >
              <InputLabel>College</InputLabel>
              <Select value={selectedCollege} onChange={handleCollegeChange}>
                {filteredColleges.map((college, index) => (
                  <MenuItem key={index} value={college.addr}>
                    {college.clgName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </div>
      )}

      {transferType === "COLLEGE_TO_COLLEGE_DIFFERENT_UNIVERSITY" && (
        <div>
          <FormControl
            fullWidth
            sx={{
              marginBottom: "16px",
            }}
          >
            <InputLabel>University</InputLabel>
            <Select
              value={selectedUniversity}
              onChange={handleUniversityChange}
            >
              {universities.map((university, index) => (
                <MenuItem key={index} value={university.addr}>
                  {university.uniName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedUniversity && (
            <FormControl
              fullWidth
              sx={{
                marginBottom: "16px",
              }}
            >
              <InputLabel>College</InputLabel>
              <Select value={selectedCollege} onChange={handleCollegeChange}>
                {colleges
                  .filter((college) => college.uniAddr === selectedUniversity)
                  .map((college, index) => (
                    <MenuItem key={index} value={college.addr}>
                      {college.clgName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </div>
      )}

      {transferType && selectedCollege && (
        <div>
          <FormControl
            fullWidth
            sx={{
              marginBottom: "16px",
            }}
          >
            <InputLabel>Course</InputLabel>
            <Select value={selectedCourse} onChange={handleCourseChange}>
              {filteredCourses.map((course, index) => (
                <MenuItem key={index} value={course.addr}>
                  {course.courseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleInitiateTransfer}
          >
            Initiate Transfer
          </Button>
        </div>
      )}
    </div>
  );
};

export default Transfer;
