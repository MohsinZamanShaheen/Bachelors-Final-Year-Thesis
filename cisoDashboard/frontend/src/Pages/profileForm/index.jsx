import { Box, Button, TextField, useTheme, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Components/global/Header";
import { tokens } from "../../theme";
import {registerNormalUser} from "../../apiClient";
import {useCompany} from "../../Context/CompanyContext";

const CreateUserForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const { selectedCompany } = useCompany();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = async (values) => {
    if(selectedCompany) {
      try {
        await registerNormalUser(values,selectedCompany);
        alert("Profile successfully registered");
      } catch (error) {
        console.error("Error creating profile", error);
        alert("Error registering profile");
      }
    }
  };

  return (
      <Box m="20px">
        <Header title="CREATE USER" subtitle="Create a New User Profile" />
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
        >
          {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                >
                  <TextField
                      fullWidth={true}
                      variant="filled"
                      type="text"
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={!!touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                      sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                      fullWidth={true}
                      variant="filled"
                      type="text"
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={!!touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                      sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                      fullWidth={true}
                      variant="filled"
                      type="text"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                      fullWidth={true}
                      variant="filled"
                      type="text"
                      label="Contact Number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact}
                      name="contact"
                      error={!!touched.contact && !!errors.contact}
                      helperText={touched.contact && errors.contact}
                      sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                      fullWidth={true}
                      variant="filled"
                      type="text"
                      label="Username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                      name="username"
                      error={!!touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
                      sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                      fullWidth={true}
                      variant="filled"
                      type="password"
                      label="Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      sx={{ gridColumn: "span 4" }}
                  />
                  <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                    <InputLabel>Role</InputLabel>
                    <Select
                        label="Role"
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                    >
                      <MenuItem value="USER">User</MenuItem>
                      <MenuItem value="ADMIN">Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                      type="submit"
                      sx={{
                        backgroundColor: theme.palette.mode === "dark" ? colors.sameColors[200] : colors.sameColors[100],
                        color: theme.palette.mode === "dark" ? colors.sameColors[100] : colors.sameColors[200],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        "&:hover": {
                          backgroundColor: theme.palette.mode === "dark" ? colors.sameColors[200] : colors.sameColors[100],
                        },
                      }}
                  >
                    Create New User
                  </Button>
                </Box>
              </form>
          )}
        </Formik>
      </Box>
  );
};

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"),
  username: yup.string().required("required"),
  password: yup.string().required("required"),
  role: yup.string().required("required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  username: "",
  password: "",
  role: "USER",
};

export default CreateUserForm;
