import { useState, useContext } from "react";
import { tokens } from "../../theme";
import { Typography, Box, Button, useTheme, TextField } from "@mui/material";
import Link from "@mui/material/Link";
import styled from "styled-components";
import { AuthContext } from "../../Context/AuthContext";
import { register, login } from "../../apiClient";

const OverlayPanel = styled(Box)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

const InputField = ({ type, placeholder, onChange }) => {
    return (
        <TextField
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            variant="outlined"
            sx={{
                margin: "8px 0",
                width: "100%",
            }}
        />
    );
};

const ButtonComp = ({ value, onClick, backgroundColor, borderColor }) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                borderRadius: "20px",
                border: "1px solid #ff4b2b",
                borderColor: { borderColor },
                marginTop: "10px",
                backgroundColor: { backgroundColor },
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: "bold",
                padding: "12px 45px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                transition: "transform 80ms ease-in",
                "&:active": {
                    transform: "scale(0.95)",
                },
                "&:focus": {
                    outline: "none",
                },
                "&:hover": {
                    backgroundColor: { backgroundColor },
                    borderColor: { borderColor },
                },
            }}
        >
            {value}
        </Button>
    );
};

function LoginRegisterComp() {
    const [signIn, toggle] = useState(true);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [organizationName, setOrganizationName] = useState("");
    const { handleLogin } = useContext(AuthContext);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleOrganizationNameChange = (event) => {
        setOrganizationName(event.target.value);
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await login({ email, password });
            handleLogin(response.data.token);
        } catch (error) {
            alert("Invalid email or password");
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        try {
            await register({ username, email, password, organizationName });
            alert("Registration successful. Please log in.");
            toggle(true);
        } catch (error) {
            alert("Error during registration");
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: colors.primary[100],
                borderRadius: "10px",
                borderColor: colors.primary[100],
                border: "1px solid",
                boxShadow:
                    "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
                position: "relative",
                overflow: "hidden",
                width: "678px",
                maxWidth: "100%",
                minHeight: "400px",
                display: "flex",
                margin: "auto",
                marginTop: "20px",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "0",
                    height: "100%",
                    transition: "all 0.6s ease-in-out",
                    left: "0",
                    width: "50%",
                    transform: signIn !== true ? "translateX(100%)" : null,
                    opacity: signIn !== true ? 1 : 0,
                    zIndex: signIn !== true ? 5 : 1,
                }}
            >
                <Box
                    sx={{
                        backgroundColor: colors.primary[100],
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        padding: "0 50px",
                        height: "100%",
                        textAlign: "center",
                    }}
                >
                    <form>
                        <Typography variant="h3" fontWeight="bold" sx={{ m: "0" }}>
                            Create Account
                        </Typography>
                        <InputField type="text" placeholder="Name" onChange={handleNameChange} />
                        <InputField type="email" placeholder="Email" onChange={handleEmailChange} />
                        <InputField type="password" placeholder="Password" onChange={handlePasswordChange} />
                        <InputField type="text" placeholder="Organization Name" onChange={handleOrganizationNameChange} />
                        <ButtonComp value="Sign Up" backgroundColor={colors.buttonColor[200]} onClick={handleRegisterSubmit} />
                    </form>
                </Box>
            </Box>

            <Box
                sx={{
                    position: "absolute",
                    top: "0",
                    height: "100%",
                    transition: "all 0.6s ease-in-out",
                    left: "0",
                    width: "50%",
                    zIndex: "2",
                    transform: signIn !== true ? "translateX(100%)" : null,
                }}
            >
                <Box
                    sx={{
                        backgroundColor: colors.primary[100],
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        padding: "0 50px",
                        height: "100%",
                        textAlign: "center",
                    }}
                >
                    <form>
                        <Typography variant="h1" fontWeight="bold" sx={{ m: "0" }}>
                            Sign In
                        </Typography>
                        <InputField
                            type="email"
                            placeholder="Email"
                            onChange={handleEmailChange}
                        />
                        <InputField
                            type="password"
                            placeholder="Password"
                            onChange={handlePasswordChange}
                        />
                        <Link
                            href="#"
                            sx={{
                                color: colors.textColor[100],
                                fontSize: "14px",
                                textDecoration: "none",
                                margin: "15px 0",
                            }}
                        >
                            Forgot your password?
                        </Link>
                        <ButtonComp
                            value="Sign In"
                            backgroundColor={colors.buttonColor[200]}
                            onClick={handleLoginSubmit}
                        />
                    </form>
                </Box>
            </Box>

            <Box
                sx={{
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    width: "50%",
                    height: "100%",
                    overflow: "hidden",
                    transition: "all 0.6s ease-in-out",
                    zIndex: "100",
                    transform: signIn !== true ? "translateX(-100%)" : null,
                }}
            >
                <Box
                    sx={{
                        background: "linear-gradient(to right, #ff4b2b, #ff4b2b)",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "0 0",
                        color: "#ffffff",
                        position: "relative",
                        left: "-100%",
                        height: "100%",
                        width: "200%",
                        transform: signIn !== true ? "translateX(50%)" : "translateX(0)",
                        transition: "transform 0.6s ease-in-out",
                    }}
                >
                    <OverlayPanel
                        sx={{
                            transform: signIn !== true ? "translateX(0)" : "translateX(-20%)",
                            transition: "transform 0.6s ease-in-out",
                        }}
                    >
                        <Typography variant="h1" fontWeight="bold" sx={{ m: "0" }}>
                            Already have an account!
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: 100,
                                lineHeight: "20px",
                                letterSpacing: "0.5px",
                                margin: "20px 0 30px",
                            }}
                        >
                            Please Sign in with your personal info and access the dashboard
                        </Typography>
                        <ButtonComp
                            backgroundColor="transparent"
                            borderColor="#ffffff"
                            onClick={() => toggle(true)}
                            value="Sign In"
                        ></ButtonComp>
                    </OverlayPanel>

                    <OverlayPanel
                        sx={{
                            right: 0,
                            transform: signIn !== true ? "translateX(20%)" : "translateX(0)",
                            transition: "transform 0.6s ease-in-out",
                        }}
                    >
                        <Typography variant="h1" fontWeight="bold" sx={{ m: "0" }}>
                            Not Registered yet!
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: 100,
                                lineHeight: "20px",
                                letterSpacing: "0.5px",
                                margin: "20px 0 30px",
                            }}
                        >
                            Sin up to register in a go and join your organization
                        </Typography>
                        <ButtonComp
                            backgroundColor="transparent"
                            borderColor="#ffffff"
                            onClick={() => toggle(false)}
                            value="Sign Up"
                        ></ButtonComp>
                    </OverlayPanel>
                </Box>
            </Box>
        </Box>
    );
}

export default LoginRegisterComp;
