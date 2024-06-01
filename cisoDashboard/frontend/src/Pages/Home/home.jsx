import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    useTheme,
    Box,
    Container,
    Grid,
    Paper
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import LoginRegisterComp from "../login-signup";

const HomePage = ({ showLogin }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [isLoginVisible, setIsLoginVisible] = useState(showLogin);

    useEffect(() => {
        setIsLoginVisible(showLogin);
    }, [showLogin]);

    const handleLoginClick = () => {
        navigate("/authenticate");
        setIsLoginVisible(true);
    };

    const handleLogoClick = () => {
        navigate("/");
        setIsLoginVisible(false);
    };

    return (
        <Box
            sx={{
                backgroundImage: `url("../../assets/main_background.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                color: colors.textColor[100],
            }}
        >
            <AppBar
                position="sticky"
                sx={{ backgroundColor: "#24303F", boxShadow: "none" }}
            >
                <Toolbar>
                    <Box
                        sx={{ flexGrow: 1, display: "flex", alignItems: "center", ml: 10 }}
                    >
                        <Link
                            to="/"
                            onClick={handleLogoClick}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                textDecoration: "none",
                                color: "inherit",
                                padding: 6,
                            }}
                        >
                            <img
                                src="../../assets/whiteLogo.png"
                                alt="Company Logo"
                                style={{ height: 60, width: 100 }}
                            />
                        </Link>
                    </Box>
                    <Button
                        variant="contained"
                        onClick={handleLoginClick}
                        style={{ backgroundColor: colors.buttonColor[200], color: 'white', height: '45px' }}
                    >
                        Access Dashboard
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ pt: 8, pb: 6, textAlign: "center" }}>
                {isLoginVisible ? (
                    <>
                        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 6, color: colors.sameColors[200] }}>
                            ACCESS YOUR FAVORITE DASHBOARD ON THE GO!
                        </Typography>
                        <LoginRegisterComp />
                    </>
                ) : (
                    <>
                        <Typography variant="h1" sx={{ fontWeight: "bold", color: colors.sameColors[200], mb: 3 }}>
                            Central Command for Cybersecurity
                        </Typography>
                        <Typography variant="h4" sx={{ my: 3, color: colors.sameColors[200] }}>
                            Optimized for seamless integration across all platforms, our CISO dashboard ensures real-time monitoring, comprehensive control, and strategic security insights to protect your organization against evolving threats.
                        </Typography>

                        {/* Image Section */}
                        <Box sx={{ mt: 8, mb: 8 }}>
                            <img
                                src="../../assets/mainPageImg.png"
                                alt="Feature Overview"
                                style={{ width: "100%", height: "auto", maxHeight: "900px" }}
                            />
                        </Box>

                        {/* New Features Section */}
                        <Box sx={{ mt: 8 }}>
                            <Typography variant="h1" sx={{ fontWeight: "bold", color: colors.sameColors[200], mb: 3 }}>
                                Discover Our Key Features
                            </Typography>
                            <Typography variant="h4" sx={{ mb: 6, color: colors.sameColors[200] }}>
                                Explore the features that make our CISO dashboard a powerful tool for cybersecurity management. And there's much more to explore!
                            </Typography>
                        </Box>

                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Paper elevation={3} sx={{ p: 2, backgroundColor: "white", height: '100%' }}>
                                    <Box sx={{ textAlign: "center", height: '100%' }}>
                                        <img src="../../assets/homeImg1.png" alt="Feature 1" style={{ width: '100%', height: 'auto', marginBottom: 10 }} />
                                        <Typography variant="h5" sx={{ color: colors.others[600], fontWeight: 'bold' }}>Visual Insights and Analytics</Typography>
                                        <Typography variant="body1" sx={{ color: colors.others[600] }}>
                                            Gain deep insights into your data with intuitive visual charts and graphs that make it easy to monitor and analyze cybersecurity metrics.
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper elevation={3} sx={{ p: 2, backgroundColor: "white", height: '100%' }}>
                                    <Box sx={{ textAlign: "center", height: '100%' }}>
                                        <img src="../../assets/homeImg2.png" alt="Feature 2" style={{ width: '100%', height: '65%', marginBottom: 10 }} />
                                        <Typography variant="h5" sx={{ color: colors.others[600], fontWeight: 'bold' }}>Multi-Organization Management</Typography>
                                        <Typography variant="body1" sx={{ color: colors.others[600] }}>
                                            Efficiently manage multiple organizations from a single dashboard, providing a centralized view of all your cybersecurity operations.
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper elevation={3} sx={{ p: 2, backgroundColor: "white", height: '100%' }}>
                                    <Box sx={{ textAlign: "center", height: '100%' }}>
                                        <img src="../../assets/homeImg3.png" alt="Feature 3" style={{ width: '100%', height: '65%', marginBottom: 10 }} />
                                        <Typography variant="h5" sx={{ color: colors.others[600], fontWeight: 'bold' }}>Comprehensive Threat Monitoring</Typography>
                                        <Typography variant="body1" sx={{ color: colors.others[600] }}>
                                            Stay ahead of threats with real-time monitoring and detailed reporting on new threats, user activities, and critical alerts.
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default HomePage;
