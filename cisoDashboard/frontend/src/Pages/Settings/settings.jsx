import React, { useState } from "react";
import { Box, Tab, Tabs, Divider, Typography, Grid, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
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
  };

  return (
    <Box m="20px">
      <Header
        title="Account Settings"
        subtitle="Make any necessary modification to your info."
        items={[
          { label: "Home", href: "/", icon: HomeIcon },
          { label: "Settings", href: "/settings" },
        ]}
      />
      <Box mt={5} sx={{ height: '90vh' }}>
        <Grid container spacing={2} height="100%">
          <Grid item xs={12} md={3}>
            <Paper sx={{ height: '100%' }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: 'divider' }}
              >
                <Tab sx={{ minWidth: "100%", fontWeight: "bold" }} label="General Profile" />
                <Divider />
                <Tab sx={{ minWidth: "100%", fontWeight: "bold" }} label="Change Password" />
                <Divider />
                <Tab sx={{ minWidth: "100%", fontWeight: "bold" }} label="Users and Permissions" />
                <Divider />
                <Tab sx={{ minWidth: "100%", fontWeight: "bold" }} label="Social Links" />
                <Divider />
                <Tab sx={{ minWidth: "100%", fontWeight: "bold" }} label="Connections" />
                <Divider />
                <Tab sx={{ minWidth: "100%", fontWeight: "bold" }} label="Logs" />
              </Tabs>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper sx={{ height: '100%', p: 2 }}>
              {value === 0 && <Profile />}
              {value === 1 && <ChangePasswordCard />}
              {value === 2 && (
                <>
                  <Tabs value={subValue} onChange={handleSubChange}>
                    <Tab label="Users" />
                    <Tab label="Roles" />
                    <Tab label="Groups" />
                  </Tabs>
                  {subValue === 0 && <div>Users Content</div>}
                {subValue === 1 && <div>Permissions Content</div>}
                {subValue === 2 && <div>Other Content</div>}
                </>
              )}
              {value === 3 && <div>Social Links Content</div>}
              {value === 4 && <div>Connections Content</div>}
              {value === 5 && <div>Logs Content</div>}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Settings;
