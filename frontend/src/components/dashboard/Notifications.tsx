"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

import { GlassCard } from "@/src/components/ui/GlassCard";

export function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "New follower",
      message: "emma_studio started following you",
      icon: <StarIcon sx={{ fontSize: 20, color: "#ffd700" }} />,
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      title: "Sale completed",
      message: "Your artwork 'Ethereal Dreams' was sold",
      icon: <ShoppingCartIcon sx={{ fontSize: 20, color: "#667eea" }} />,
      time: "5 hours ago",
      unread: true,
    },
    {
      id: 3,
      title: "New like",
      message: "alex_art liked your artwork",
      icon: <FavoriteIcon sx={{ fontSize: 20, color: "#ff6b6b" }} />,
      time: "1 day ago",
      unread: false,
    },
  ];

  return (
    <GlassCard sx={{ p: 3, mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "text.primary" }}
        >
          Notifications
        </Typography>
        <Chip
          label="2 new"
          size="small"
          sx={{
            background: "rgba(99, 102, 241, 0.2)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            color: "primary.light",
            fontWeight: 600,
          }}
        />
      </Box>

      <List sx={{ p: 0 }}>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <>
              <ListItem
                sx={{
                  px: 0,
                  py: 2,
                  transition: "background 0.2s ease",
                  borderRadius: "12px",
                  background: notification.unread ? "rgba(99, 102, 241, 0.05)" : "transparent",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.03)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.05)",
                    mr: 2,
                  }}
                >
                  {notification.icon}
                </Box>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, color: "text.primary" }}
                      >
                        {notification.title}
                      </Typography>
                      {notification.unread && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "primary.main",
                          }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.disabled", mt: 0.5 }}>
                        {notification.time}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < notifications.length - 1 && (
                <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)" }} />
              )}
            </>
          </motion.div>
        ))}
      </List>
    </GlassCard>
  );
}
