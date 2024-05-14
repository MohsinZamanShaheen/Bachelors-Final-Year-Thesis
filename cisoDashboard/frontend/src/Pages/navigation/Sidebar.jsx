import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.sameColors[200],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        height: "100%",
        overflowY: "auto",
        borderRight: `3px solid  ${colors.elementBorders[100]}`,
        "& .pro-sidebar-inner": {
          background: `${colors.sameColors[100]}`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* ONLY MENU ICON IF COLLAPSED */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.sameColors[200],
            }}
          >
            {/* LOGO AND MENU ICON IF NOT COLLAPSED */}
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.sameColors[200]}>
                  ADMIN
                </Typography>
                <IconButton
                  style={{ color: colors.sameColors[200] }}
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/tst.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
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
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* The ITEM COMPONENT CREATED ABOVE*/}
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Item
                title="Dashboard 2"
                to="/dashboard2"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              /> */}

            <Typography
              variant="h6"
              color={colors.sameColors[200]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.sameColors[200]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              ISO
            </Typography>

            <Item
              title="ISO 2701"
              to="/iso2701"
              icon={<FormatListNumberedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="ISO 27002"
              to="/iso27002"
              icon={<ChecklistOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.sameColors[200]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Events
            </Typography>

            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.sameColors[200]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Users
            </Typography>

            <Item
              title="Profile Form"
              to="/newprofile"
              icon={<GroupAddIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Profile"
              to="/profile"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Settings"
              to="/settings"
              icon={<SettingsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.sameColors[200]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Inventory
            </Typography>

            <Item
              title="Organization Diagram"
              to="/org_diag"
              icon={<CorporateFareIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Network Diagram"
              to="/net_diag"
              icon={<CloudQueueIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.sameColors[200]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Help
            </Typography>

            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
