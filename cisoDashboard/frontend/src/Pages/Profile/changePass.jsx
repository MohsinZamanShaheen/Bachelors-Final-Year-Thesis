import React from "react";
import { Card, CardHeader, CardContent, TextField, Button,useTheme } from "@mui/material";
import { tokens } from "../../theme";

const ChangePasswordCard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Card sx={{ marginBottom: 4 }}>
      <CardHeader title="Change Password" 
        sx={{backgroundColor:theme.palette.mode === "dark" ? colors.sameColors[200] : colors.sameColors[100],
        color: theme.palette.mode === "dark" ? colors.sameColors[100] : colors.sameColors[200]}} />
      <CardContent sx={{backgroundColor:colors.primary[100]}}>
        <form>
          <TextField
            id="currentPassword"
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="newPassword"
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordCard;
