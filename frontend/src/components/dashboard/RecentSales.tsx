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

import { GlassCard } from "@/src/components/ui/GlassCard";

export function RecentSales() {
  const sales = [
    {
      id: 1,
      artwork: "Ethereal Dreams",
      buyer: "alex_art",
      price: "$1,250",
      date: "2 hours ago",
      color: "#667eea",
    },
    {
      id: 2,
      artwork: "Cosmic Journey",
      buyer: "sarah_creates",
      price: "$950",
      date: "5 hours ago",
      color: "#764ba2",
    },
    {
      id: 3,
      artwork: "Neon Sunset",
      buyer: "mike_design",
      price: "$1,100",
      date: "1 day ago",
      color: "#f093fb",
    },
  ];

  return (
    <GlassCard sx={{ p: 3, mb: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
      >
        Recent Sales
      </Typography>

      <List sx={{ p: 0 }}>
        {sales.map((sale, index) => (
          <motion.div
            key={sale.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
                      background: `linear-gradient(135deg, ${sale.color} 0%, ${sale.color}80 100%)`,
                      fontSize: 20,
                      fontWeight: 700,
                    }}
                  >
                    {sale.id}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, color: "text.primary" }}
                        >
                          {sale.artwork}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          by {sale.buyer}
                        </Typography>
                      </Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          color: "primary.light",
                        }}
                      >
                        {sale.price}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5 }}>
                      {sale.date}
                    </Typography>
                  }
                />
              </ListItem>
              {index < sales.length - 1 && (
                <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)" }} />
              )}
            </>
          </motion.div>
        ))}
      </List>
    </GlassCard>
  );
}
