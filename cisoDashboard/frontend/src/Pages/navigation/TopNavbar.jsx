import {
  Box,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from "../../Context/AuthContext";
import Select from "@mui/material/Select";
import DescriptionAlerts from "../notifications";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {
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
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      paddingLeft={"10px"}
    >
      {/* SELECT UNIT */}
      <Box sx={{ minWidth: 200}}>
        <FormControl fullWidth variant="filled">
          <InputLabel id="demo-simple-select-label">Select Unit</InputLabel>
          <Select color="primary"
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
      <Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        <Box
          display="flex"
          backgroundColor={colors.primary[100]}
          borderRadius="3px"
          border={`1px solid  ${colors.elementBorders[100]}`}
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* ICONS TO OTHER PAGES */}
        <Box display="flex" ml={2}>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <DescriptionAlerts />
          <IconButton onClick={handleClick} >
            <PersonOutlinedIcon/>
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
      </Box>
    </Box>
  );
};

export default TopNavbar;
