import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const StudentProfile = (props) => {
  const { loggedInUserInfo } = props;
  const {
    addr,
    batch,
    clgAddr,
    courseAddr,
    migrationApplications,
    name,
    regNo,
    uniAddr,
  } = loggedInUserInfo;

  return (
    <Box
      sx={{
        width: "50%",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginBottom: "20px" }}
      >
        Student Profile
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary={`Name: ${name}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Address: ${addr}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Batch ID: ${batch}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`College Address: ${clgAddr}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Course Address: ${courseAddr}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Registration Number: ${regNo}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`University Address: ${uniAddr}`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Migration Applications:"
            secondary={
              migrationApplications ? migrationApplications.join(", ") : "None"
            }
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default StudentProfile;
