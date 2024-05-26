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
import { useContext, useState, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import NotificationsComp from "../notifications";
import { getUserProfilePhoto, getUserOrganizations } from "../../apiClient";
import { useCompany } from "../../Context/CompanyContext";

const TopNavbar = ({ handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { handleLogout, user } = useContext(AuthContext);
  const { selectedCompany, setSelectedCompany } = useCompany();
  const [userPhoto, setUserPhoto] = useState("");
  const [organizations, setOrganizations] = useState([]);

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
    const orgId = event.target.value;
    setSelectedCompany(orgId);
    //window.location.reload();
  };

  const handleSettingsClick = () => {
    navigate("/settings");
    handleClose();
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserProfilePhoto();
        const photo = response.data;
        if (photo && photo.data) {
          const photoUrl = `data:${photo.type};base64,${photo.data}`;
          setUserPhoto(photoUrl);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    const fetchUserOrganizations = async () => {
      try {
        if (user) {
          const response = await getUserOrganizations(user.id);
          console.log("Orgs are: ", response)
          setOrganizations(response.data);
          const defaultOrgId = response.data[0]?.id;
          if (defaultOrgId) {
            setSelectedCompany(defaultOrgId);
          }
        }
      } catch (error) {
        console.error("Error fetching user organizations", error);
      }
    };

    fetchUserData();
    fetchUserOrganizations();
  }, [user]);

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
                  value={selectedCompany || ''}
                  label="Select Unit"
                  onChange={handleChange}
              >
                {organizations.map(org => (
                    <MenuItem key={org.id} value={org.id}>{org.name}</MenuItem>
                ))}
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
                    value={selectedCompany || ''}
                    label="Select Unit"
                    onChange={handleChange}
                >
                  {organizations.map(org => (
                      <MenuItem key={org.id} value={org.id}>{org.name}</MenuItem>
                  ))}
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
            <NotificationsComp sx={{color: colors.textColor[100]}} />
            <IconButton onClick={handleClick} sx={{color: colors.textColor[100],}}>
              <Avatar alt="User Image" src={userPhoto || "../../assets/tst.jpg"} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
              <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
              <MenuItem onClick={logoutUser}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
  );
};

export default TopNavbar;
