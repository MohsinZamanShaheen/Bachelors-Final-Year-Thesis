import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  useTheme,
  Box,
  Alert
} from "@mui/material";
import { tokens } from "../../theme";
import { changePassword } from "../../apiClient";

const ChangePasswordCard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword
      });
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response.data);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <TextField
                id="currentPassword"
                label="Current Password"
                type="password"
                fullWidth={true}
                margin="normal"
                variant="outlined"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
                id="newPassword"
                label="New Password"
                type="password"
                fullWidth={true}
                margin="normal"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth={true}
                margin="normal"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {message && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  {message}
                </Alert>
            )}
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                  type="submit"
                  sx={{
                    backgroundColor: theme.palette.mode === "dark"
                        ? colors.sameColors[200]
                        : colors.sameColors[100],
                    color: theme.palette.mode === "dark"
                        ? colors.sameColors[100]
                        : colors.sameColors[200],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === "dark"
                          ? colors.sameColors[200]
                          : colors.sameColors[100],
                    },
                  }}
              >
                Save
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
  );
};

export default ChangePasswordCard;
