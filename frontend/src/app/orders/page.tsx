"use client";

import { ProtectedRoute } from "@/src/components/auth/ProtectedRoute";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

import { GlassCard } from "@/src/components/ui/GlassCard";

import { fadeInUp, staggerContainer } from "@/src/lib/motion";

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-2024-001",
      date: "January 15, 2024",
      status: "Delivered",
      total: "$1,250",
      items: [
        { title: "Ethereal Dreams", price: "$1,250", color: "#667eea" },
      ],
    },
    {
      id: "ORD-2024-002",
      date: "January 10, 2024",
      status: "Processing",
      total: "$2,050",
      items: [
        { title: "Cosmic Journey", price: "$950", color: "#764ba2" },
        { title: "Neon Sunset", price: "$1,100", color: "#f093fb" },
      ],
    },
    {
      id: "ORD-2024-003",
      date: "January 5, 2024",
      status: "Delivered",
      total: "$875",
      items: [
        { title: "Abstract Flow", price: "$875", color: "#4ecdc4" },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "rgba(74, 222, 128, 0.2)";
      case "Processing":
        return "rgba(99, 102, 241, 0.2)";
      case "Cancelled":
        return "rgba(244, 63, 94, 0.2)";
      default:
        return "rgba(255, 255, 255, 0.1)";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "#4ade80";
      case "Processing":
        return "#667eea";
      case "Cancelled":
        return "#f43f5e";
      default:
        return "text.secondary";
    }
  };

  return (
    <ProtectedRoute>
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeInUp}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            My Orders
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            Track your purchase history
          </Typography>
        </motion.div>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <GlassCard sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, color: "text.primary" }}
                    >
                      {order.id}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {order.date}
                    </Typography>
                  </Box>
                  <Chip
                    label={order.status}
                    size="small"
                    sx={{
                      background: getStatusColor(order.status),
                      color: getStatusTextColor(order.status),
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 2 }} />

                <List sx={{ mb: 2 }}>
                  {order.items.map((item, itemIndex) => (
                    <ListItem
                      key={itemIndex}
                      sx={{
                        px: 0,
                        py: 1,
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}80 100%)`,
                            fontSize: 20,
                            fontWeight: 700,
                          }}
                        >
                          {itemIndex + 1}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={item.price}
                        sx={{
                          "& .MuiTypography-root": {
                            color: "text.primary",
                          },
                          "& .MuiTypography-secondary": {
                            color: "text.secondary",
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Total
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "primary.light",
                    }}
                  >
                    {order.total}
                  </Typography>
                </Box>
              </GlassCard>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Container>
    </ProtectedRoute>
  );
}
