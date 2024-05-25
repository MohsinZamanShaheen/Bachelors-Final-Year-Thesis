import React, { useState } from "react";
import { Box, Tab, Tabs, Divider, Grid, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import Profile from "../Profile/profile";
import ChangePasswordCard from "../Profile/changePass";
import HomeIcon from "@mui/icons-material/Home";
import Header from "../../Components/global/Header";
import UsersComponent from "./UsersComponent";

const Settings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <Box mt={5} sx={{ height: "90vh" }}>
          <Grid container spacing={2} height="100%">
            <Grid item xs={12} md={3}>
              <Paper
                  sx={{ height: "100%", backgroundColor: colors.primary[100] }}
              >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    sx={{
                      borderRight: 1,
                      borderColor: "divider",
                      backgroundColor: colors.primary[100],
                    }}
                >
                  <Tab
                      sx={{ minWidth: "100%", fontWeight: "bold" }}
                      label="General Profile"
                  />
                  <Divider />
                  <Tab
                      sx={{ minWidth: "100%", fontWeight: "bold" }}
                      label="Change Password"
                  />
                  <Divider />
                  <Tab
                      sx={{ minWidth: "100%", fontWeight: "bold" }}
                      label="Users and Roles"
                  />
                  <Divider />
                  <Tab
                      sx={{ minWidth: "100%", fontWeight: "bold" }}
                      label="Reports"
                  />
                  <Divider />
                  <Tab
                      sx={{ minWidth: "100%", fontWeight: "bold" }}
                      label="Logs"
                  />
                </Tabs>
              </Paper>
            </Grid>
            <Grid item xs={12} md={9}>
              <Paper
                  sx={{ height: "100%", p: 2, backgroundColor: colors.primary[100] }}
              >
                {value === 0 && <Profile />}
                {value === 2 && <ChangePasswordCard />}
                {value === 4 && <UsersComponent />}
                {value === 6 && <div>Reports</div>}
                {value === 8 && <div>Logs Content</div>}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
  );
};

export default Settings;
