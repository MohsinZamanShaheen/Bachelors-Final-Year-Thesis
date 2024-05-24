import { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  Typography,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import { tokens } from "../../theme";
import {getUserProfilePhoto} from "../../apiClient";

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [selected, setSelected] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userPhoto, setUserPhoto] = useState("");


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
    fetchUserData();
  }, []);

  useEffect(() => {
    // Reset the collapsed state when screen size changes
    if (!isMdUp) {
      setIsCollapsed(false);
    }
  }, [isMdUp]);

  const Item = ({ title, to, icon }) => (
    <ListItem
      button
      component={Link}
      to={to}
      selected={selected === title}
      onClick={() => setSelected(title)}
      style={{
        color: colors.sameColors[200],
        padding: "8px 20px",
      }}
    >
      <ListItemIcon
        style={{
          color: colors.sameColors[200],
          minWidth: "40px",
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );

  const drawer = (
    <div>
      <Toolbar>
        {isMdUp ? (
          <IconButton
            onClick={() => setIsCollapsed(!isCollapsed)}
            edge="start"
            style={{
              color: colors.sameColors[200],
            }}
          >
            <MenuOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleDrawerToggle} edge="start">
            <MenuOutlinedIcon />
          </IconButton>
        )}
      </Toolbar>

      {!isCollapsed && (
        <Box mb="25px" mt="15px" sx={{ textAlign: "center" }}>
          <Avatar
            alt="profile-user"
            src={userPhoto || "../../assets/tst.jpg"}
            sx={{ width: 100, height: 100, margin: "0 auto" }}
          />
          <Typography
            variant="h2"
            color={colors.sameColors[200]}
            fontWeight="bold"
            sx={{ m: "10px 0 0 0" }}
          >
            Mohsin
          </Typography>
          <Typography variant="h5" color={colors.sameColors[200]}>
            Ciso
          </Typography>
        </Box>
      )}
      <List>
        <Item title="Dashboard" to="/dashboard" icon={<HomeOutlinedIcon />} />
        {!isCollapsed && (
          <Typography
            variant="h6"
            color={colors.sameColors[200]}
            sx={{ mt: "15px", mb: "5px", ml: "16px" }}
          >
            Data
          </Typography>
        )}
        <Item title="Manage Team" to="/team" icon={<PeopleOutlinedIcon />} />
        <Item
          title="Providers Information"
          to="/providers"
          icon={<ContactsOutlinedIcon />}
        />
        <Item
          title="Invoices Balances"
          to="/invoices"
          icon={<ReceiptOutlinedIcon />}
        /> 
        {!isCollapsed && (
          <Typography
            variant="h6"
            color={colors.sameColors[200]}
            sx={{ mt: "15px", mb: "5px", ml: "16px" }}
          >
            ISO
          </Typography>
        )}
        <Item
          title="ISO 2701"
          to="/iso2701"
          icon={<FormatListNumberedIcon />}
        />
        <Item
          title="ISO 27002"
          to="/iso27002"
          icon={<ChecklistOutlinedIcon />}
        /> 
        {!isCollapsed && (
          <Typography
            variant="h6"
            color={colors.sameColors[200]}
            sx={{ mt: "15px", mb: "5px", ml: "16px" }}
          >
            Alerts
          </Typography>
        )}
        <Item
          title="Alerts"
          to="/detailedAlerts"
          icon={<FormatListNumberedIcon />}
        /> 
        {!isCollapsed && (
          <Typography
            variant="h6"
            color={colors.sameColors[200]}
            sx={{ mt: "15px", mb: "5px", ml: "16px" }}
          >
            Inventory
          </Typography>
        )}
        <Item
          title="Organization Diagram"
          to="/org_diag"
          icon={<CorporateFareIcon />}
        />
        <Item
          title="Network Diagram"
          to="/net_diag"
          icon={<CloudQueueIcon />}
        /> 
        {!isCollapsed && (
          <Typography
            variant="h6"
            color={colors.sameColors[200]}
            sx={{ mt: "15px", mb: "5px", ml: "16px" }}
          >
            Events
          </Typography>
        )}
        <Item
          title="Calendar"
          to="/calendar"
          icon={<CalendarTodayOutlinedIcon />}
        />
        {!isCollapsed && (
          <Typography
            variant="h6"
            color={colors.sameColors[200]}
            sx={{ mt: "15px", mb: "5px", ml: "16px" }}
          >
            Users
          </Typography>
        )}
        <Item title="Profile Form" to="/newprofile" icon={<GroupAddIcon />} />
        <Item title="Settings" to="/settings" icon={<SettingsOutlinedIcon />} /> 
        {!isCollapsed && (
          <Typography
            variant="h6"
            color={colors.sameColors[200]}
            sx={{ mt: "15px", mb: "5px", ml: "16px" }}
          >
            Help
          </Typography>
        )}
        <Item title="FAQ Page" to="/faq" icon={<HelpOutlineOutlinedIcon />} />
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: isCollapsed ? 60 : drawerWidth },
        flexShrink: { md: 0 },
        backgroundColor: colors.sameColors[100]
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth,  backgroundColor: colors.sameColors[100] },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: isCollapsed ? 60 : drawerWidth,
            overflowX: "hidden",
            overflowY: "auto",
            transition: "width 0.3s",
            backgroundColor: colors.sameColors[100],
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
