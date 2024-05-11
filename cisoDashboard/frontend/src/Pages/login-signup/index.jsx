import { useState, useContext } from "react";
import { tokens } from "../../theme";
import { Typography, Box, Button, useTheme, TextField,} from "@mui/material";
import Link from "@mui/material/Link";
import styled from "styled-components";
import { AuthContext } from "../../Context/AuthContext";

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

function LoginComp() {
  const [signIn, toggle] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {handleLogin} = useContext(AuthContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email: ", email);
    console.log("Password, ", password);
    if (email === "" && password === "") {
      handleLogin();
    } else {
      alert("Invalid email or password");
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
        marginTop: "20px"
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
            <Typography variant="h1" fontWeight="bold" sx={{ m: "0" }}>
              Create Account
            </Typography>
            <InputField type="text" placeholder="Name" />
            <InputField type="email" placeholder="Email" />
            <InputField type="password" placeholder="Password" />
            <ButtonComp value="Sign Up" backgroundColor="#ff4b2b" />
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
            backgroundColor: colors.textColor[100],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "0 50px",
            height: "100%",
            textAlign: "center",
          }}
        >
          <form onSubmit={handleSubmit}>
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
              backgroundColor="#ff4b2b"
              onClick={handleSubmit}
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
              Welcome Back!
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
              To keep connected with us please login with your personal info
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
              Hello, Friend!
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
              Enter Your personal details and start journey with us
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
export default LoginComp;
