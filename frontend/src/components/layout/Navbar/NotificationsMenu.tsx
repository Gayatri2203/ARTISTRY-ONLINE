"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Typography from "@mui/material/Typography";

import { useAuth } from "@/src/context/AuthContext";
import {
  fetchNotifications,
  markNotificationRead,
  type AppNotification,
} from "@/src/lib/firestore/notifications";

function notificationText(item: AppNotification): string {
  if (item.type === "like") return `${item.senderName} liked your artwork`;
  return `${item.senderName} commented on your artwork`;
}

export function NotificationsMenu() {
  const router = useRouter();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [items, setItems] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(false);

  const open = Boolean(anchorEl);
  const unreadCount = useMemo(
    () => items.filter((item) => !item.read).length,
    [items]
  );

  const loadNotifications = async () => {
    if (!user?.uid) return;
    setLoading(true);
    try {
      const result = await fetchNotifications(user.uid);
      setItems(result);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    await loadNotifications();
  };

  const handleClose = () => setAnchorEl(null);

  const handleClickItem = async (item: AppNotification) => {
    if (!item.read) {
      await markNotificationRead(item.id);
      setItems((prev) =>
        prev.map((notification) =>
          notification.id === item.id
            ? { ...notification, read: true }
            : notification
        )
      );
    }
    handleClose();
    router.push(`/artwork/${item.artworkId}`);
  };

  if (!user) return null;

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ color: "text.primary" }}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsNoneOutlinedIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            sx: {
              width: 340,
              maxWidth: "92vw",
              mt: 1,
              p: 1,
              border: "1px solid",
              borderColor: "divider",
            },
          },
        }}
      >
        <Typography variant="subtitle2" sx={{ px: 1.5, py: 1, fontWeight: 700 }}>
          Notifications
        </Typography>
        {loading ? (
          <Box sx={{ py: 4, display: "flex", justifyContent: "center" }}>
            <CircularProgress size={24} />
          </Box>
        ) : items.length === 0 ? (
          <Box sx={{ py: 3, px: 1.5 }}>
            <Typography variant="body2" color="text.secondary">
              No notifications yet.
            </Typography>
          </Box>
        ) : (
          <List sx={{ py: 0 }}>
            {items.map((item) => (
              <ListItemButton
                key={item.id}
                onClick={() => void handleClickItem(item)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  bgcolor: item.read ? "transparent" : "rgba(99,102,241,0.12)",
                }}
              >
                <ListItemText
                  primary={notificationText(item)}
                  secondary={item.artworkTitle}
                  slotProps={{
                    primary: {
                      sx: { fontSize: "0.9rem", fontWeight: item.read ? 500 : 700 },
                    },
                    secondary: { sx: { fontSize: "0.78rem" } },
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </Menu>
    </>
  );
}

