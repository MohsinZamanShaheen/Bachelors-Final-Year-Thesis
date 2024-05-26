import { useState, useEffect } from "react";
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
  Divider,
  ClickAwayListener
} from "@mui/material";
import { tokens } from "../../theme";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import CheckIcon from "@mui/icons-material/Check";
import { getNotifications, markNotificationAsRead, clearAllNotifications } from "../../apiClient";
import { useCompany } from "../../Context/CompanyContext";

const NotificationsComp = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedCompany } = useCompany();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (selectedCompany) {
      fetchNotifications(selectedCompany);
    }
  }, [selectedCompany]);

  const fetchNotifications = async (organizationId) => {
    try {
      const response = await getNotifications(organizationId);
      setNotifications(response.data);
      setUnreadCount(response.data.filter(n => !n.read).length);
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  const toggleNotificationCenter = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen((prevOpen) => !prevOpen);
  };

  const toggleFilter = () => {
    setShowUnreadOnly(!showUnreadOnly);
  };

  const handleMarkAsRead = async (id) => {
    try {
      if (selectedCompany) {
        await markNotificationAsRead(id, selectedCompany);
        fetchNotifications(selectedCompany);
      }
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  const handleClearAll = async () => {
    try {
      if (selectedCompany) {
        await clearAllNotifications(selectedCompany);
        fetchNotifications(selectedCompany);
      }
    } catch (error) {
      console.error("Error clearing notifications", error);
    }
  };

  const handleClickAway = (event) => {
    if (anchorEl && !anchorEl.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      if (selectedCompany) {
        for (const notification of notifications.filter(n => !n.read)) {
          await markNotificationAsRead(notification.id, selectedCompany);
        }
        fetchNotifications(selectedCompany);
      }
    } catch (error) {
      console.error("Error marking all notifications as read", error);
    }
  };

  return (
      <Box>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <IconButton onClick={toggleNotificationCenter}>
              <Badge badgeContent={unreadCount} color="primary">
                <NotificationsOutlinedIcon sx={{ color: colors.textColor[100] }} />
              </Badge>
            </IconButton>
            <Popper open={isOpen} anchorEl={anchorEl} transition>
              {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Box mr={15} mt={3} border={`1px solid ${colors.elementBorders[100]}`} borderRadius="8px">
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
                        <FormGroup>
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
                        ).map((notification, index) => (
                            <div key={notification.id}>
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
                                            onClick={() => handleMarkAsRead(notification.id)}
                                        >
                                          <MarkChatReadIcon />
                                        </IconButton>
                                    )
                                  }
                              >
                                {notification.content}
                              </Alert>
                              {index < notifications.length - 1 && <Divider />}
                            </div>
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
                        <Button sx={{ backgroundColor: colors.buttonColor[100], color: colors.sameColors[200] }} variant="contained" onClick={handleClearAll}>
                          Clear All
                        </Button>

                        <Button sx={{ backgroundColor: colors.buttonColor[100], color: colors.sameColors[200] }} variant="contained" onClick={handleMarkAllAsRead}>
                          Mark all as read
                        </Button>
                      </Box>
                    </Box>
                  </Fade>
              )}
            </Popper>
          </div>
        </ClickAwayListener>
      </Box>
  );
};

export default NotificationsComp;
