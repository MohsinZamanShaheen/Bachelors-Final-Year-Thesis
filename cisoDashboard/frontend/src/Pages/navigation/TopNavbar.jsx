import {
  Box,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Toolbar,
  AppBar,
  Hidden,
  Select,
  Avatar,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import DescriptionAlerts from "../notifications";

const TopNavbar = ({ handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { handleLogout } = useContext(AuthContext);
  const [unit, setUnit] = useState("");
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    handleLogout();
  };

  const handleChange = (event) => {
    setUnit(event.target.value);
  };

  const handleSettingsClick = () => {
    navigate("/settings");
    handleClose();
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: theme.palette.mode === "dark" ? colors.primary[100] : "#f1f5f9", }}>
      <Toolbar sx={{ backgroundColor: theme.palette.mode === "dark" ? colors.primary[100] : "#f1f5f9", }}>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            style={{
              color: colors.textColor[100],
            }}
          >
            <MenuIcon />
          </IconButton>
          <FormControl
            variant="filled"
            sx={{ minWidth: 180, ml: 2 }}
          >
            <InputLabel id="demo-simple-select-label">Select Unit</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={unit}
              label="Select Unit"
              onChange={handleChange}
            >
              <MenuItem value={10}>Unit Rehab</MenuItem>
              <MenuItem value={20}>Unit 2</MenuItem>
              <MenuItem value={30}>BCN-Check</MenuItem>
            </Select>
          </FormControl>
        </Hidden>
        <Hidden mdDown>
          <Box display="flex" alignItems="center" mr={2}>
            <img
              src="../../assets/homeLogo2.png"
              alt="Logo"
              style={{ height: "70px"}}
            />
            <FormControl
              variant="filled"
              sx={{ minWidth: 200 }}
            >
              <InputLabel id="demo-simple-select-label">Select Unit</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={unit}
                label="Select Unit"
                onChange={handleChange}
              >
                <MenuItem value={10}>Unit Rehab</MenuItem>
                <MenuItem value={20}>Unit 2</MenuItem>
                <MenuItem value={30}>BCN-Check</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Hidden>
        <Box sx={{ flexGrow: 1 }} />
        <Box display="flex" alignItems="center">
          <Hidden mdDown>
            <Box
              display="flex"
              backgroundColor={colors.primary[100]}
              borderRadius="3px"
              border={`1px solid  ${colors.elementBorders[100]}`}
              mr={2}
            >
              <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
              <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
            </Box>
          </Hidden>
          <IconButton onClick={colorMode.toggleColorMode} sx={{color: colors.textColor[100]}}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <DescriptionAlerts sx={{color: colors.textColor[100]}} />
          <IconButton onClick={handleClick} sx={{color: colors.textColor[100],}}>
            <Avatar alt="User Image" src="../../assets/tst.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>My profile</MenuItem>
            <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
