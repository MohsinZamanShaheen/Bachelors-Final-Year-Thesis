import React, {useState}  from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useTheme,
  Box,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import LoginRegisterComp from "../login-signup";

const HomePage = ({showLogin}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [isLoginVisible, setIsLoginVisible] = useState(showLogin);

  const handleLoginClick = () => {
      navigate("/authenticate");
      setIsLoginVisible(true);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url("../../assets/main_background.jpg")`, // Consider using a high-quality image or a gradient similar to image 1
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: colors.textColor[100],
      }}
    >
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", ml: 10 }}
          >
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src="../../assets/homeLogo2.png"
                alt="Company Logo"
                style={{ height: 80, width: 120 }}
              />
            </Link>
          </Box>
            <Button  
            variant="contained"
            onClick={handleLoginClick}
            style={{ backgroundColor:colors.buttonColor[200] , color: 'white', height: '45px' }}>
              Access Dashboard
            </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ pt: 8, pb: 6, textAlign: "center" }}>
          {isLoginVisible ? (
              <>
                  <Typography variant="h2" sx={{ fontWeight: "bold", mb: 6 }}>
                      ACCESS YOUR FAVORITE DASHBOARD ON THE GO!
                  </Typography>
                  <LoginRegisterComp />
              </>
          ) : (
              <>
                  <Typography variant="h1" sx={{ fontWeight: "bold" }}>
                      Central Command for Cybersecurity
                  </Typography>
                  <Typography variant="h4" sx={{ my: 3 }}>
                      Optimized for seamless integration across all platforms, our CISO dashboard ensures real-time monitoring, comprehensive control, and strategic security insights to protect your organization against evolving threats.
                  </Typography>
                  <Box>
                      <Button variant="contained" sx={{ m: 1, backgroundColor: colors.buttonColor[200], color: 'white' }}>
                          Github
                      </Button>
                      <Button variant="outlined" sx={{ m: 1 }}>
                          Learn more
                      </Button>
                  </Box>
              </>
          )}
      </Container>
    </Box>
  );
};

export default HomePage;
