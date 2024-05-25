import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  useTheme,
  Box,
} from "@mui/material";
import { tokens } from "../../theme";

const ChangePasswordCard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Card sx={{ marginBottom: 4 }}>
      <CardHeader
        title="Change Password"
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? colors.sameColors[200]
              : colors.sameColors[100],
          color:
            theme.palette.mode === "dark"
              ? colors.sameColors[100]
              : colors.sameColors[200],
        }}
      />
      <CardContent sx={{ backgroundColor: colors.primary[100] }}>
        <form>
          <TextField
            id="currentPassword"
            label="Current Password"
            type="password"
            fullWidth={true}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="newPassword"
            label="New Password"
            type="password"
            fullWidth={true}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth={true}
            margin="normal"
            variant="outlined"
          />
          <Box  display="flex" justifyContent="flex-end" mt={2}>
            <Button type="submit"  sx={{
              backgroundColor:  theme.palette.mode === "dark"
              ? colors.sameColors[200]
              : colors.sameColors[100],
              color: theme.palette.mode === "dark"
              ? colors.sameColors[100]
              : colors.sameColors[200],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? colors.sameColors[200]
                    : colors.sameColors[100],
              },
            }}>
              Save
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordCard;
