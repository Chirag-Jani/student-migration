import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ethers } from "ethers";
import React, { useState } from "react";

const CollegeProfile = (props) => {
  const { loggedInUserInfo, connectionInfo } = props;
  const { addr, applications, clgName, courses, uniAddr } = loggedInUserInfo;

  const [searchType, setSearchType] = useState("Course");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchedData, setSearchedData] = useState(null);

  // for approving students
  // State for modal and inputs
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalInput1, setModalInput1] = useState("");
  const [modalInput2, setModalInput2] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  const [courseAddress, setCourseAddress] = useState("");

  // Handle modal open
  const handleModalOpen = (studentAddr) => {
    setModalInput1("");
    setModalInput2("");
    setModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Handle submit of modal inputs
  const handleModalSubmit = async () => {
    // console.log("Cours ADr:", courseAddress);
    // console.log("StudAddr:", studentAddress);
    // console.log("REg no:", modalInput1);
    // console.log("Bach NO:", modalInput2);

    try {
      const tx = await connectionInfo.contract.approve(
        courseAddress,
        studentAddress,
        modalInput1,
        modalInput2
      );
      console.log(tx);
    } catch (e) {
      console.log(e);
    }
    setModalOpen(false);
  };

  const handleAddressClick = (address) => {
    // Function to copy the address to clipboard
    navigator.clipboard
      .writeText(address)
      .then(() => {
        alert(`Address copied to clipboard!`);
      })
      .catch((error) => {
        console.error("Failed to copy address to clipboard:", error);
      });
  };

  const handleSearch = async () => {
    // Simulate searching for the address in the data
    // Replace this with your actual data retrieval logic based on the searchType and searchAddress
    let foundData = null;
    let tx;
    if (searchType === "Course") {
      tx = await connectionInfo.contract.getCourseInfo(searchAddress);
      console.log(tx);
      foundData = {
        courseName: tx.courseName,
        addr: tx.addr,
        totalSeats: ethers.BigNumber.from(tx.totalSeats._hex).toNumber(),
        availableSeats: ethers.BigNumber.from(
          tx.availableSeats._hex
        ).toNumber(),
        courseType: tx.courseType,
        clgAddr: tx.clgAddr,
        uniAddr: tx.uniAddr,
        enrolledStudents: tx.enrolledStudents,
        requestedStudents: tx.requestedStudents,
      };
    } else if (searchType === "Student") {
      tx = await connectionInfo.contract.getStudentInfo(searchAddress);
      console.log(tx);

      const {
        name,
        addr,
        courseAddr,
        clgAddr,
        uniAddr,
        regNo,
        batch,
        migrationApplications,
      } = tx;

      foundData = {
        name,
        addr,
        courseAddr,
        clgAddr,
        uniAddr,
        regNo,
        batch,
        migrationApplications,
      };
    }
    setSearchedData(foundData);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        College Profile
      </Typography>
      <div>
        <Typography variant="subtitle1">College Name: {clgName}</Typography>
      </div>
      <div>
        <Typography variant="subtitle1">
          College Address:
          <span
            onClick={() => handleAddressClick(addr)}
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >
            {addr}
          </span>
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle1">List of Courses:</Typography>
        <List>
          {courses?.map((address, index) => (
            <ListItem
              key={index}
              button
              onClick={() => handleAddressClick(address)}
            >
              <ListItemText primary={address} />
            </ListItem>
          ))}
        </List>
      </div>
      <div>
        <Typography variant="subtitle1">List of Applications:</Typography>
        <List>
          {applications?.map((address, index) => (
            <ListItem
              key={index}
              button
              onClick={() => handleAddressClick(address)}
            >
              <ListItemText primary={address} />
            </ListItem>
          ))}
        </List>
      </div>
      <div style={{ marginTop: "20px" }}>
        <FormControl variant="outlined" style={{ minWidth: "200px" }}>
          <InputLabel>Search Type</InputLabel>
          <Select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            label="Search Type"
          >
            <MenuItem value="Course">Course</MenuItem>
            <MenuItem value="Student">Student</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label={`Search ${searchType} Address`}
          variant="outlined"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ marginLeft: "10px" }}
        >
          Search
        </Button>
      </div>
      {searchedData !== null ? (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Search Result:</Typography>
          {searchType === "Course" && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" component="div">
                  Course Name: {searchedData.courseName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" component="div">
                  Course Address: {searchedData.addr}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="div">
                  Total Seats: {searchedData.totalSeats}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="div">
                  Available Seats: {searchedData.availableSeats}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" component="div">
                  Course Type: {searchedData.courseType}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" component="div">
                  Parent College Address: {searchedData.clgAddr}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" component="div">
                  Parent University Address: {searchedData.uniAddr}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" component="div">
                  Enrolled Students:
                </Typography>
                <List>
                  {searchedData.enrolledStudents?.map((studentAddr, index) => (
                    <ListItem
                      key={index}
                      button
                      onClick={() => handleAddressClick(studentAddr)}
                    >
                      <ListItemText primary={studentAddr} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" component="div">
                  Requested Students:
                </Typography>
                <List>
                  {searchedData.requestedStudents?.map((studentAddr, index) => (
                    <>
                      <ListItem
                        key={index}
                        button
                        onClick={() => handleAddressClick(studentAddr)}
                      >
                        <ListItemText primary={studentAddr} />
                      </ListItem>

                      <Button
                        onClick={() => {
                          handleModalOpen(studentAddr);
                          setStudentAddress(studentAddr);
                          setCourseAddress(searchedData.addr);
                        }}
                        variant="contained"
                        color="primary"
                        style={{ margin: "10px" }}
                      >
                        Approve
                      </Button>
                      {/* <Button
                        onClick={() => alert(studentAddr)}
                        variant="contained"
                        color="secondary"
                      >
                        Reject
                      </Button> */}
                    </>
                  ))}

                  {/* Modal */}
                  <Dialog open={isModalOpen} onClose={handleModalClose}>
                    <DialogTitle>Approve Student</DialogTitle>
                    <DialogContent>
                      <TextField
                        label="Assigned Registration Number"
                        value={modalInput1}
                        onChange={(e) => setModalInput1(e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Assigned Batch Number"
                        value={modalInput2}
                        onChange={(e) => setModalInput2(e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleModalClose}
                        variant="outlined"
                        color="primary"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleModalSubmit}
                        variant="outlined"
                        color="primary"
                      >
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>
                </List>
              </Grid>
            </Grid>
          )}
          {searchType === "Student" && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" component="div">
                  Student Name: {searchedData.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" component="div">
                  Student Address: {searchedData.addr}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" component="div">
                  Enrolled Course Address: {searchedData.courseAddr}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" component="div">
                  Parent College Address: {searchedData.clgAddr}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" component="div">
                  Parent University Address: {searchedData.uniAddr}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="div">
                  Registration Number: {searchedData.regNo}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="div">
                  Batch ID: {searchedData.batch}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" component="div">
                  Migration Applications:
                </Typography>
                <List>
                  {searchedData.migrationApplications?.map((appAddr, index) => (
                    <ListItem
                      key={index}
                      button
                      onClick={() => handleAddressClick(appAddr)}
                    >
                      <ListItemText primary={appAddr} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          )}
        </div>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="body1">Search User to get info</Typography>
        </div>
      )}
    </div>
  );
};

export default CollegeProfile;
