import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  useTheme,
  Divider,
} from "@mui/material";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import DropZoneComp from "../../Components/Dropzone/DropZone";

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box>
      <Box>
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
              fullWidth
              sx={{ gridColumn: "span 2", m: 0 }}
              defaultValue="John Doe"
            />
            <TextField
              label="Phone Number"
              fullWidth
              sx={{ gridColumn: "span 2", m: 0 }}
              defaultValue="123-456-7890"
            />
            <TextField
              label="Email"
              fullWidth
              sx={{ gridColumn: "span 4", m: 0 }}
              defaultValue="john.doe@example.com"
            />
            <TextField
              label="Username"
              fullWidth
              sx={{ gridColumn: "span 4", m: 0 }}
              defaultValue="johndoe"
            />
            <TextField
              label="Company"
              fullWidth
              sx={{ gridColumn: "span 2", m: 0 }}
              defaultValue="Ntt Data"
            />
            <TextField
              label="Bio"
              fullWidth
              multiline
              rows={6}
              sx={{ gridColumn: "span 4", m: 0 }}
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />

            <Box gridColumn="span 4">
              <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" color="error">
                  Cancel
                </Button>
                <Button variant="contained" color="primary" sx={{ ml: 1 }}>
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right container */}
        <Grid
          item
          xs={12}
          md={4}
        >
          <Box 
          sx={{
            height: "auto",
            backgroundColor: colors.primary[100],
            marginLeft: { md: 4 },
            mt: { xs: 2, md: 0 },
          }}>
            <Typography variant="h3" gutterBottom pt={3} pl={3} pb={2}>
              Your Photo
            </Typography>
            <Divider />
            <Box display="flex" flexDirection="row" m={2}>
              <Box>
                <img
                  src={`../../assets/tst.jpg`}
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
                <Typography variant="h5" sx={{ color: colors.textColor[100], ml:"12px" }}>
                  Edit your photo
                </Typography>
                <Box>
                  <Button color="primary" sx={{ p: 0 }}>
                    Delete
                  </Button>
                  <Button color="primary" sx={{p: 0 }}>Update</Button>
                </Box>
              </Box>
            </Box>
            <Box mt={2}>
                <DropZoneComp />
            </Box>
            
            <Box gridColumn="span 4" pb={4}>
              <Box display="flex" justifyContent="flex-end" mr={2}>
                <Button variant="contained" color="error">
                  Cancel
                </Button>
                <Button variant="contained" color="primary" sx={{ ml: 1 }}>
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