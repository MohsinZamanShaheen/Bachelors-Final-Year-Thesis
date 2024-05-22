import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Grid, TextField, useTheme, Divider } from "@mui/material";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import DropZoneComp from "../../Components/Dropzone/DropZone";
import axios from "axios";
import {updateUserInfo, updateUserPhoto, deleteUserPhoto, getCurrentUser} from "../../apiClient";

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [user, setUser] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
    username: "",
    company: "",
    bio: "",
  });

  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getCurrentUser();
        console.log("Fetching current user: ", response)
        setUser(response.data);
        setPhoto(response.data.photo);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async () => {
    try {
      await updateUserInfo(user.id, user);
      if (photo) {
        await updateUserPhoto(user.id, photo);
      }
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Error updating profile");
    }
  };

  const handleDeletePhoto = async () => {
    try {
      await deleteUserPhoto(user.id);
      setPhoto(null);
      alert("Photo deleted successfully");
    } catch (error) {
      console.error("Error deleting photo", error);
      alert("Error deleting photo");
    }
  };

  return (
      <Box sx={{ backgroundColor: colors.primary[100] }}>
        <Box sx={{ backgroundColor: colors.primary[100] }}>
          <Typography variant="h2" gutterBottom padding={2} marginLeft={2}>
            Profile Page
          </Typography>
        </Box>
        <Grid container>
          {/* Left container */}
          <Grid
              item
              xs={12}
              md={7}
              sx={{
                backgroundColor: colors.primary[100],
                marginRight: { md: 1 },
                marginLeft: { md: 2 },
              }}
          >
            <Typography variant="h3" gutterBottom pt={3} pl={3} pb={2}>
              Personal Information
            </Typography>
            <Divider />
            <Box
                padding={4}
                display="grid"
                gap="40px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
            >
              <TextField
                  label="Full Name"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ gridColumn: "span 2", m: 0 }}
              />
              <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ gridColumn: "span 2", m: 0 }}
              />
              <TextField
                  label="Email"
                  name="email"
                  value={user.email}
                  fullWidth
                  disabled
                  sx={{ gridColumn: "span 4", m: 0 }}
              />
              <TextField
                  label="Username"
                  name="username"
                  value={user.username}
                  fullWidth
                  disabled
                  sx={{ gridColumn: "span 4", m: 0 }}
              />
              <TextField
                  label="Company"
                  name="company"
                  value={user.company}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ gridColumn: "span 2", m: 0 }}
              />
              <TextField
                  label="Bio"
                  name="bio"
                  value={user.bio}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={6}
                  sx={{ gridColumn: "span 4", m: 0 }}
              />
              <Box gridColumn="span 4">
                <Box display="flex" justifyContent="flex-end">
                  <Button variant="contained" color="error">
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" sx={{ ml: 1 }} onClick={handleSave}>
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Right container */}
          <Grid item xs={12} md={4}>
            <Box
                sx={{
                  height: "auto",
                  backgroundColor: colors.primary[100],
                  marginLeft: { md: 4 },
                  mt: { xs: 2, md: 0 },
                }}
            >
              <Typography variant="h3" gutterBottom pt={3} pl={3} pb={2}>
                Your Photo
              </Typography>
              <Divider />
              <Box display="flex" flexDirection="row" m={2}>
                <Box>
                  <img
                      src={photo ? `data:${photo.type};base64,${photo.data}` : `../../assets/default-profile.png`}
                      alt="Profile"
                      style={{
                        width: "70px",
                        height: "70px",
                        cursor: "pointer",
                        borderRadius: "50%",
                      }}
                  />
                </Box>
                <Box mt={1}>
                  <Typography variant="h5" sx={{ color: colors.textColor[100], ml: "12px" }}>
                    Edit your photo
                  </Typography>
                  <Box>
                    <Button color="primary" sx={{ p: 0 }} onClick={handleDeletePhoto}>
                      Delete
                    </Button>
                    <Button color="primary" sx={{ p: 0 }}>
                      Update
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box mt={2}>
                <DropZoneComp setPhoto={setPhoto} />
              </Box>
              <Box gridColumn="span 4" pb={4}>
                <Box display="flex" justifyContent="flex-end" mr={2}>
                  <Button variant="contained" color="error">
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" sx={{ ml: 1 }} onClick={handleSave}>
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default Profile;
