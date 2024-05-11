import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useTheme,
  Box,
} from "@mui/material";
import { tokens } from "../../theme";
import LoginComp from "../login-signup";

const HomePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url("../../assets/backgroundImgHome.jpg")`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: colors.primary[100]}}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Button color="inherit" onClick={handleLoginClick}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Box>
        {!showLogin && (
          <Box mt={30} textAlign="center">
            <Typography variant="h1" color={colors.textColor[100][100]}>
              CISO Dashboard{" "}
            </Typography>
            <Typography variant="h4" color={colors.textColor[100][600]} mt={3}>
              This is a dashboard for the Chief Information Security Officer
              (CISO) to manage the security of the organization.
            </Typography>
          </Box>
        )}
        {showLogin && (
          <Box textAlign="center">
            <Typography variant="h1" color={colors.textColor[100][500]} sx={{ mt: 20 }}>
              Log In
            </Typography>
            <LoginComp/>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
