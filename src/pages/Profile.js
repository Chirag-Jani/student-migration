import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UniversityProfile from "../components/ProfileComponents/UniversityProfile";
import CollegeProfile from "../components/ProfileComponents/CollegeProfile";
import StudentProfile from "../components/ProfileComponents/StudentProfile";

const Profile = (props) => {
  const { userLoggedIn, connectionInfo, loggedInUserInfo } = props;

  const [userType, setUserType] = useState();

  useEffect(() => {
    console.log(props);

    const getUserType = async () => {
      const tx = await connectionInfo.contract.getUserType(
        connectionInfo.account
      );
      console.log(tx);
      setUserType(tx);
    };

    getUserType();
  });
  return (
    <Box>
      {userLoggedIn ? (
        <Box>
          {
            // uni
            userType === 0 ? (
              <UniversityProfile
                loggedInUserInfo={loggedInUserInfo}
                connectionInfo={connectionInfo}
              />
            ) : // college
            userType === 1 ? (
              <CollegeProfile
                loggedInUserInfo={loggedInUserInfo}
                connectionInfo={connectionInfo}
              />
            ) : (
              <StudentProfile
                loggedInUserInfo={loggedInUserInfo}
                connectionInfo={connectionInfo}
              />
            )
          }
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <h2>
            <Link
              style={{
                color: "blue",
              }}
              to={"/"}
            >
              Login
            </Link>{" "}
            to access profile.{" "}
          </h2>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
