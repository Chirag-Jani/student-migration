import React, { useCallback, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Input,
} from "@mui/material";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

const Transfer = (props) => {
  const {
    universities,
    collegeInfo,
    connectionInfo,
    loggedInUserInfo,
    getUniversities,
    getCollegeDetails,
  } = props;

  const [transferType, setTransferType] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  // state to show colleges related to the selected university
  const [col, setCol] = useState([]);

  // state to show courses related to the selected college
  const [courses, setCourses] = useState([]);

  // files CID
  const [selectedFile, setSelectedFile] = useState(null);
  const [ipfsCID, setIpfsCID] = useState("");

  const handleTransferTypeChange = (event) => {
    setTransferType(event.target.value);
    setSelectedUniversity("");
    setSelectedCollege("");
    setSelectedCourse("");
  };

  const handleUniversityChange = (event) => {
    console.log(event.target.value);
    setSelectedUniversity(event.target.value);
    setSelectedCollege("");
    setSelectedCourse("");

    // helper function to get the colleges
    getCls(event.target.value);
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

  const handleCollegeChange = (event) => {
    setSelectedCollege(event.target.value);
    setSelectedCourse("");

    let clgInfo;

    // setting college
    // eslint-disable-next-line
    col.map((college) => {
      // return college.addr === selectedCollege;
      if (college.addr === event.target.value) {
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

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const projectId = "2T3eMNF8knKDGTpszZDyVBGuTrb";
      const projectSecret = "83431740a593de7a6b5da01b98610c30";
      const auth =
        "Basic " +
        Buffer.from(projectId + ":" + projectSecret).toString("base64");
      const client = create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        apiPath: "/api/v0",
        headers: {
          authorization: auth,
        },
      });

      try {
        const added = await client.add(selectedFile);
        console.log(added);
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleInitiateTransfer = () => {
    console.log("Transfer Type:", transferType);
    console.log("Selected University:", selectedUniversity);
    console.log("Selected College:", selectedCollege);
    console.log("Selected Course:", selectedCourse);
  };

  useEffect(() => {
    console.log(universities);
    console.log(collegeInfo);
  });
  return (
    // <div
    //   style={{
    //     maxWidth: "400px",
    //     margin: "auto",
    //     padding: "16px",
    //   }}
    // >

    // </div>
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <h1>Initiate Transfer:</h1>

      {/* Selecting Transfer Type */}
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
              {universities.map((uni, index) => {
                return (
                  <MenuItem key={uni.uniAddr} value={uni.uniAddr}>
                    {uni.uniName}
                  </MenuItem>
                );
              })}
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
                {col
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
              {universities.map((uni, index) => {
                return (
                  <MenuItem key={uni.uniAddr} value={uni.uniAddr}>
                    {uni.uniName}
                  </MenuItem>
                );
              })}
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
              {courses.map((course, index) => (
                <MenuItem key={index} value={course.addr}>
                  {course.courseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedCourse && (
            <>
              <Input
                type="file"
                inputProps={{
                  accept: ".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt",
                }}
                onChange={handleFileChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
              >
                Upload to IPFS
              </Button>
              {ipfsCID && <p>IPFS CID: {ipfsCID}</p>}
            </>
          )}

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
