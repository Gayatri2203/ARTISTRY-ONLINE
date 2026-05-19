"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CommentIcon from "@mui/icons-material/Comment";
import StarIcon from "@mui/icons-material/Star";

import { GlassCard } from "@/src/components/ui/GlassCard";

export function ActivitySection() {
  const activities = [
    {
      id: 1,
      user: "alex_art",
      action: "liked your artwork",
      target: "Ethereal Dreams",
      icon: <FavoriteIcon sx={{ fontSize: 20, color: "#ff6b6b" }} />,
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "sarah_creates",
      action: "purchased",
      target: "Cosmic Journey",
      icon: <ShoppingBagIcon sx={{ fontSize: 20, color: "#667eea" }} />,
      time: "5 hours ago",
    },
    {
      id: 3,
      user: "mike_design",
      action: "commented on",
      target: "Neon Sunset",
      icon: <CommentIcon sx={{ fontSize: 20, color: "#f093fb" }} />,
      time: "1 day ago",
    },
    {
      id: 4,
      user: "emma_studio",
      action: "started following you",
      target: "",
      icon: <StarIcon sx={{ fontSize: 20, color: "#ffd700" }} />,
      time: "2 days ago",
    },
  ];

  return (
    <GlassCard sx={{ p: 3, mb: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
      >
        Recent Activity
      </Typography>

      <List sx={{ p: 0 }}>
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
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
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.03)",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      fontSize: 20,
                      fontWeight: 600,
                    }}
                  >
                    {activity.user.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, color: "text.primary" }}
                      >
                        {activity.user}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {activity.action}
                      </Typography>
                      {activity.target && (
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            color: "primary.light",
                            cursor: "pointer",
                            "&:hover": {
                              color: "secondary.light",
                            },
                          }}
                        >
                          {activity.target}
                        </Typography>
                      )}
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      {activity.icon}
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {activity.time}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < activities.length - 1 && (
                <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)" }} />
              )}
            </>
          </motion.div>
        ))}
      </List>
    </GlassCard>
  );
}
