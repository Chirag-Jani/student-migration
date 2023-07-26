import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Navbar(props) {
  const { userLoggedIn, connectionInfo, setUserLoggedIn, setLoggedInUserInfo } =
    props;

  const logout = async () => {
    try {
      const tx = await connectionInfo.contract.auth(false);
      console.log(tx);

      setTimeout(() => {
        setUserLoggedIn(false);
        setLoggedInUserInfo();
        localStorage.removeItem("userLoggedIn");
      }, 4000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingX: "24px",
            backgroundColor: "#2196f3",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                Tr - Cert
              </Link>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              to="/admin"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button
                color="inherit"
                sx={{
                  fontWeight: 700,
                  fontSize: "16px",
                  textTransform: "none",
                  letterSpacing: "0.5px",
                  marginRight: "16px",
                }}
              >
                Manage Orgs
              </Button>
            </Link>
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button
                color="inherit"
                sx={{
                  fontWeight: 700,
                  fontSize: "16px",
                  textTransform: "none",
                  letterSpacing: "0.5px",
                  marginRight: "16px",
                }}
              >
                Profile
              </Button>
            </Link>

            {!userLoggedIn ? (
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <Button
                  color="inherit"
                  sx={{
                    fontWeight: 700,
                    fontSize: "16px",
                    textTransform: "none",
                    letterSpacing: "0.5px",
                  }}
                >
                  Login / Register
                </Button>
              </Link>
            ) : (
              <>
                {/* <Link
                  to="/transfer"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button
                    color="inherit"
                    sx={{
                      fontWeight: 700,
                      fontSize: "16px",
                      textTransform: "none",
                      letterSpacing: "0.5px",
                      marginRight: "16px",
                    }}
                  >
                    Transfer
                  </Button>
                </Link> */}
                <Button
                  onClick={logout}
                  sx={{
                    fontWeight: 700,
                    color: "white",
                    fontSize: "16px",
                    textTransform: "none",
                    letterSpacing: "0.5px",
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
