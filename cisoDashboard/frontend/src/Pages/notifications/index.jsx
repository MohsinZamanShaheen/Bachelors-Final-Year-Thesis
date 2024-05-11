import { useState } from "react";
import {
  Alert,
  Badge,
  Box,
  Button,
  Fade,
  FormControlLabel,
  FormGroup,
  IconButton,
  Popper,
  Stack,
  Switch,
  Typography,
  useTheme,
  Divider
} from "@mui/material";
import { tokens } from "../../theme";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import CheckIcon from "@mui/icons-material/Check";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";

const DescriptionAlerts = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    notifications,
    clear,
    markAllAsRead,
    markAsRead,
    unreadCount
  } = useNotificationCenter();
  
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleNotificationCenter = (event) => {

    setAnchorEl(event.currentTarget);
    setIsOpen(!isOpen);
  };

  const toggleFilter = () => {
    setShowUnreadOnly(!showUnreadOnly);
  };

  return (
    <Box>
      <IconButton onClick={toggleNotificationCenter}>
        <Badge badgeContent={unreadCount} color="primary">
          <NotificationsOutlinedIcon />
        </Badge>
      </IconButton>

      <Popper open={isOpen} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box mr={15} mt={2} border={`1px solid  ${colors.elementBorders[100]}`} borderRadius= "8px" >
              <Box
                sx={{
                  background: "#666",
                  padding: "8px",
                  display: "flex",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: colors.primary[100],
                }}
              >
                <Typography variant="h5" color={colors.textColor[100]}>
                  Notification center
                </Typography>
                <FormGroup >
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        onChange={toggleFilter}
                        checked={showUnreadOnly}
                      />
                    }
                    label="Show unread only"
                  />
                </FormGroup>
              </Box>
              <Divider />
              <Stack
                sx={{
                  height: "400px",
                  width: "min(60ch, 100ch)",
                  padding: "12px",
                  background: "#f1f1f1",
                  overflowY: "auto",
                  backgroundColor: colors.primary[100]
                }}
                spacing={2}
              >
                {(!notifications.length ||
                  (unreadCount === 0 && showUnreadOnly)) && (
                  <h4>
                    No Notification to show!
                  </h4>
                )}
                {(showUnreadOnly
                  ? notifications.filter((v) => !v.read)
                  : notifications
                ).map((notification) => (
                  <Alert
                    severity={notification.type || "info"}
                    action={
                      notification.read ? (
                        <CheckIcon />
                      ) : (
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <MarkChatReadIcon />
                        </IconButton>
                      )
                    }
                  >
                    {notification.content}
                  </Alert>
                ))}
              </Stack>
              <Box
                sx={{
                  background: "#666",
                  padding: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                  backgroundColor: theme.palette.mode === "dark" ? colors.sameColors[200] : colors.sameColors[100],
                }}
              >
                <Button sx={{backgroundColor: colors.buttonColor[100], color: colors.sameColors[200]}}  variant="contained" onClick={clear}>
                  Clear All
                </Button>

                <Button sx={{backgroundColor: colors.buttonColor[100], color: colors.sameColors[200]}} variant="contained" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}

export default DescriptionAlerts;
