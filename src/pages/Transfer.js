import React, { useCallback, useState } from "react";
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
  const { universities, collegeInfo, connectionInfo, loggedInUserInfo } = props;

  const { uniAddr, clgAddr, courseAddr } = loggedInUserInfo;

  const [applicationInfo, setApplicationInfo] = useState({
    transferType: null,
    selectedUniversity: "",
    selectedCollege: "",
    selectedCourse: "",
    nocCID: "",
    transferCertiCID: "",
    marksheetCID: "",
    migrationCertiCID: "",
  });

  // state to show colleges related to the selected university
  const [col, setCol] = useState([]);

  // state to show courses related to the selected college
  const [courses, setCourses] = useState([]);

  // temporary fild holding
  const [selectedFile, setSelectedFile] = useState(null);

  const handleTransferTypeChange = (event) => {
    setApplicationInfo({
      ...applicationInfo,
      selectedCollege: "",
      selectedCourse: "",
      nocCID: "",
      transferCertiCID: "",
      marksheetCID: "",
      migrationCertiCID: "",
      transferType: event.target.value,
      selectedUniversity: uniAddr,
    });

    setCol([]);
    setCourses([]);
    getCls(uniAddr);
  };

  const handleUniversityChange = (event) => {
    setApplicationInfo({
      ...applicationInfo,
      selectedCollege: "",
      selectedCourse: "",
      nocCID: "",
      transferCertiCID: "",
      marksheetCID: "",
      migrationCertiCID: "",
      selectedUniversity: event.target.value,
    });
    setCol([]);
    setCourses([]);

    // helper function to get the colleges
    getCls(event.target.value);
  };

  // getting colleges
  const getCls = (universityAddress) => {
    const relatedColleges = collegeInfo.filter(
      (college) => college.uniAddr === universityAddress
    );

    // updating the college list
    setCol(relatedColleges);
    setCourses([]);
  };

  const handleCollegeChange = (event) => {
    // setSelectedCollege(event.target.value);
    setApplicationInfo({
      ...applicationInfo,
      selectedCourse: "",
      nocCID: "",
      transferCertiCID: "",
      marksheetCID: "",
      migrationCertiCID: "",
      selectedCollege: event.target.value,
    });

    let clgInfo;

    // setting college
    // eslint-disable-next-line
    col.map((college) => {
      // return college.addr === selectedCollege;
      if (college.addr === event.target.value) {
        clgInfo = college;
      }
    });
    getCourses(clgInfo);
  };

  // eslint-disable-next-line
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
  });

  const handleCourseChange = (event) => {
    setApplicationInfo({
      ...applicationInfo,
      nocCID: "",
      transferCertiCID: "",
      marksheetCID: "",
      migrationCertiCID: "",
      selectedCourse: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setApplicationInfo({
      ...applicationInfo,
      [event.target.name]: "",
    });
  };

  const handleUpload = async (event) => {
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
        setApplicationInfo({
          ...applicationInfo,
          [event.target.name]: added.path,
        });
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleInitiateTransfer = async () => {
    try {
      const {
        transferType,
        // selectedUniversity,
        selectedCollege,
        selectedCourse,
        nocCID,
        transferCertiCID,
        marksheetCID,
        migrationCertiCID,
      } = applicationInfo;
      const tx = await connectionInfo.contract.initiateTransfer(
        transferType,
        clgAddr,
        selectedCollege,
        courseAddr,
        selectedCourse,
        nocCID,
        transferCertiCID,
        marksheetCID,
        migrationCertiCID
      );
      if (tx) {
        alert("Transfer Initiated Successfully!!!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "16px",
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
        <Select
          value={applicationInfo.transferType}
          onChange={handleTransferTypeChange}
        >
          <MenuItem value={0}>College to College (Same University)</MenuItem>
          <MenuItem value={1}>
            College to College (Different University)
          </MenuItem>
        </Select>
      </FormControl>

      {applicationInfo.transferType === 0 && (
        <div>
          <FormControl
            fullWidth
            sx={{
              marginBottom: "16px",
            }}
          >
            <InputLabel>University</InputLabel>
            <Select
              value={applicationInfo.selectedUniversity}
              onChange={handleUniversityChange}
              disabled
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

          {applicationInfo.selectedUniversity && (
            <FormControl
              fullWidth
              sx={{
                marginBottom: "16px",
              }}
            >
              <InputLabel>College</InputLabel>
              <Select
                value={applicationInfo.selectedCollege}
                onChange={handleCollegeChange}
              >
                {col
                  .filter(
                    (college) =>
                      college.uniAddr === applicationInfo.selectedUniversity
                  )
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

      {applicationInfo.transferType === 1 && (
        <div>
          <FormControl
            fullWidth
            sx={{
              marginBottom: "16px",
            }}
          >
            <InputLabel>University</InputLabel>
            <Select
              value={applicationInfo.selectedUniversity}
              onChange={handleUniversityChange}
            >
              {universities.map((uni, index) => {
                return (
                  uni.uniAddr !== uniAddr && (
                    <MenuItem key={uni.uniAddr} value={uni.uniAddr}>
                      {uni.uniName}
                    </MenuItem>
                  )
                );
              })}
            </Select>
          </FormControl>

          {applicationInfo.selectedUniversity && (
            <FormControl
              fullWidth
              sx={{
                marginBottom: "16px",
              }}
            >
              <InputLabel>College</InputLabel>
              <Select
                value={applicationInfo.selectedCollege}
                onChange={handleCollegeChange}
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
            </FormControl>
          )}
        </div>
      )}

      {applicationInfo.selectedCollege && (
        <div>
          <FormControl
            fullWidth
            sx={{
              marginBottom: "16px",
            }}
          >
            <InputLabel>Course</InputLabel>
            <Select
              value={applicationInfo.selectedCourse}
              onChange={handleCourseChange}
            >
              {courses.map((course, index) => (
                <MenuItem key={index} value={course.addr}>
                  {course.courseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {applicationInfo.selectedCourse && (
            <>
              <InputLabel
                sx={{
                  margin: "10px",
                }}
              >
                Upload NOC:
              </InputLabel>
              <Input
                type="file"
                inputProps={{
                  accept: ".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt,.webp",
                }}
                name="nocCID"
                onChange={handleFileChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                name="nocCID"
                sx={{
                  display: `${applicationInfo.nocCID !== "" && "none"}`,
                }}
              >
                Upload
              </Button>
              {/* {applicationInfo.nocCID && (
                <p>NOC CID: {applicationInfo.nocCID}</p>
              )} */}
            </>
          )}
          {applicationInfo.nocCID && (
            <>
              <InputLabel
                sx={{
                  margin: "10px",
                }}
              >
                Upload Transfer Certificate:
              </InputLabel>
              <Input
                type="file"
                inputProps={{
                  accept: ".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt,.webp",
                }}
                name="transferCertiCID"
                onChange={handleFileChange}
              />
              <Button
                variant="contained"
                color="primary"
                name="transferCertiCID"
                onClick={handleUpload}
                sx={{
                  display: `${
                    applicationInfo.transferCertiCID !== "" && "none"
                  }`,
                }}
              >
                Upload
              </Button>
              {/* {applicationInfo.transferCertiCID && (
                <p>
                  Transfer Certificate CID: {applicationInfo.transferCertiCID}
                </p>
              )} */}
            </>
          )}
          {applicationInfo.transferCertiCID && (
            <>
              <InputLabel
                sx={{
                  margin: "10px",
                }}
              >
                Upload Marksheet:
              </InputLabel>
              <Input
                type="file"
                inputProps={{
                  accept: ".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt,.webp",
                }}
                name="marksheetCID"
                onChange={handleFileChange}
              />
              <Button
                variant="contained"
                color="primary"
                name="marksheetCID"
                onClick={handleUpload}
                sx={{
                  display: `${applicationInfo.marksheetCID !== "" && "none"}`,
                }}
              >
                Upload
              </Button>
              {/* {applicationInfo.marksheetCID && (
                <p>Marksheet CID: {applicationInfo.marksheetCID}</p>
              )} */}
            </>
          )}
          {applicationInfo.marksheetCID && (
            <>
              <InputLabel
                sx={{
                  margin: "10px",
                }}
              >
                Upload Migration Certificate:
              </InputLabel>
              <Input
                type="file"
                inputProps={{
                  accept: ".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt,.webp",
                }}
                name="migrationCertiCID"
                onChange={handleFileChange}
              />
              <Button
                variant="contained"
                color="primary"
                name="migrationCertiCID"
                onClick={handleUpload}
                sx={{
                  display: `${
                    applicationInfo.migrationCertiCID !== "" && "none"
                  }`,
                }}
              >
                Upload
              </Button>
              {/* {applicationInfo.migrationCertiCID && (
                <p>
                  Migration Certificate CID: {applicationInfo.migrationCertiCID}
                </p>
              )} */}
            </>
          )}

          {applicationInfo.migrationCertiCID && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleInitiateTransfer}
              sx={{
                margin: "20px 0",
              }}
            >
              Initiate Transfer
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Transfer;
