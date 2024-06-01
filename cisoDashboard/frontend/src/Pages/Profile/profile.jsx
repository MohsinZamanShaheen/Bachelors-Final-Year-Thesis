import React, {useState, useEffect, useContext} from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  useTheme,
  Divider,
  MenuItem,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery
} from "@mui/material";
import { tokens } from "../../theme";
import DropZoneComp from "../../Components/Dropzone/DropZone";
import {
  updateUserInfo,
  updateUserPhoto,
  deleteUserPhoto,
  getCurrentUser,
  createOrganization,
  getUserOrganizations
} from "../../apiClient";
import { useCompany } from "../../Context/CompanyContext";
import {AuthContext} from "../../Context/AuthContext";

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { selectedCompany, setSelectedCompany } = useCompany();
  const { user:authUser } = useContext(AuthContext);
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
  const [companies, setCompanies] = useState([]);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data);
        setPhoto(response.data.photo);

        const orgResponse = await getUserOrganizations(response.data.id);
        setCompanies(orgResponse.data);
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

  const handleSaveUserInfo = async () => {
    try {
      await updateUserInfo(user);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Error updating profile");
    }
  };

  const handleSaveUserPhoto = async () => {
    if (photo) {
      try {
        const formData = new FormData();
        formData.append("file", photo);
        const response = await updateUserPhoto(formData);
        setPhoto(response.data);
        alert("Photo updated successfully");
      } catch (error) {
        console.error("Error updating photo", error);
        alert("Error updating photo");
      }
    } else {
      alert("Please select a valid photo.");
    }
  };

  const handleDeletePhoto = async () => {
    try {
      await deleteUserPhoto();
      setPhoto(null);
      alert("Photo deleted successfully");
    } catch (error) {
      console.error("Error deleting photo", error);
      alert("Error deleting photo");
    }
  };

  const handleCreateCompany = async () => {
    try {
      const response = await createOrganization({ name: newCompanyName });
      setCompanies([...companies, response.data]);
      setOpenDialog(false);
      setNewCompanyName("");
      alert("Company created successfully");
    } catch (error) {
      console.error("Error creating company", error);
      alert("Error creating company");
    }
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
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
                  fullWidth={true}
                  sx={{ gridColumn: "span 2", m: 0 }}
              />
              <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleInputChange}
                  fullWidth={true}
                  sx={{ gridColumn: "span 2", m: 0 }}
              />
              <TextField
                  label="Email"
                  name="email"
                  value={user.email}
                  fullWidth={true}
                  disabled
                  sx={{ gridColumn: "span 4", m: 0 }}
              />
              <TextField
                  label="Username"
                  name="username"
                  value={user.username}
                  fullWidth={true}
                  disabled
                  sx={{ gridColumn: "span 4", m: 0 }}
              />
              <Box sx={{ gridColumn: "span 4", display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1" sx={{ mr: 2 }}>Company:</Typography>
                <Select
                    value={selectedCompany || ""}
                    onChange={handleCompanyChange}
                    displayEmpty
                    sx={{ flexGrow: 1 }}
                >
                  {companies.map((company) => (
                      <MenuItem key={company.id} value={company.id}>
                        {company.name}
                      </MenuItem>
                  ))}
                  {authUser.role === 'ADMIN' && (
                  <MenuItem value="">
                    <Button onClick={() => setOpenDialog(true)}>Create New Company</Button>
                  </MenuItem>
                  )}
                </Select>
              </Box>
              <TextField
                  label="Bio"
                  name="bio"
                  value={user.bio}
                  onChange={handleInputChange}
                  fullWidth={true}
                  multiline
                  rows={6}
                  sx={{ gridColumn: "span 4", m: 0 }}
              />
              <Box gridColumn="span 4">
                <Box display="flex" justifyContent="flex-end">
                  <Button variant="contained" color="primary" sx={{ ml: 1 }} onClick={handleSaveUserInfo}>
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
                      src={photo && photo.data ? `data:${photo.type};base64,${photo.data}` : `../../assets/tst.jpg`}
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
                    <Button color="primary" sx={{ p: 0 }} onClick={handleSaveUserPhoto}>
                      Update
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box mt={2}>
                <DropZoneComp setPhoto={setPhoto} />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Dialog for creating new company */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Create New Company</DialogTitle>
          <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="Company Name"
                type="text"
                fullWidth
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateCompany}>Create</Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};

export default Profile;