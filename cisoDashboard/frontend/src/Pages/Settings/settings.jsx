import React from "react";
import { useState } from "react";
import { Box, Tab, Tabs, Button, useTheme, Divider, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Profile from "../Profile/profile";
import ChangePasswordCard from "../Profile/changePass";
import HomeIcon from "@mui/icons-material/Home";
import Header from "../../Components/global/Header";

const Settings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = useState(0);
  const [subValue, setSubValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubChange = (event, newValue) => {
    setSubValue(newValue);
  }

  return (
    <Box m="20px">
      <Header
        title="Account Settings"
        subtitle="Make any necessary modification to your info."
        items={[
          { label: "Home", href: "/", icon: HomeIcon },
          { label: "settings", href: "/settings"},
        ]}
      />
      <Box m={5} mb={10} sx={{ height: '90vh', display: 'flex', flexDirection: 'column' }}>
        <Box
          display="flex"
          border={1}
          borderColor="grey.500"
          height="100%"
          width="100%"
        >
          <Box width={1 / 4} bgcolor={colors.primary[100]} overflow="auto">
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
            >
              <Tab sx={{minWidth: "100%"}}  label="General Profile" value={0} />
              <Divider />
              <Tab sx={{minWidth: "100%"}} label="Change password" value={1} />
              <Divider />
              <Tab sx={{minWidth: "100%"}} label="Users and Permissions"value={2}/>
              <Divider />
              <Tab sx={{minWidth: "100%"}} label="Social links" value={3} />
              <Divider />
              <Tab sx={{minWidth: "100%"}} label="Connections" value={4} />
              <Divider />
              <Tab sx={{minWidth: "100%"}} label="Logs" value={5} />
              <Divider />
            </Tabs>
          </Box>
          <Box width={3 / 4} p={2} overflow="auto">
            {value === 0 && 
            <Box height="100%">
              <Profile />
            </Box>}
            {value === 1 && 
            <Box height="100%">
              <ChangePasswordCard />
            </Box>}
            {value === 2 && (
              <Box height="100%">
                <Tabs value={subValue} onChange={handleSubChange}>
                  <Tab label="Users" />
                  <Tab label="Roles" />
                  <Tab label="Groups" />
                </Tabs>
                {subValue === 0 && <div>Users Content</div>}
                {subValue === 1 && <div>Permissions Content</div>}
                {subValue === 2 && <div>Other Content</div>}
              </Box>
            )}
            {value === 3 && <div>Social Links Content</div>}
            {value === 4 && <div>Connections Content</div>}
            {value === 5 && <div>Notifications Content</div>}
          </Box>
        </Box>
      </Box>
      </Box>
  );
};

export default Settings;
