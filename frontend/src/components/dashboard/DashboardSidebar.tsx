"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaletteIcon from "@mui/icons-material/Palette";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import UploadIcon from "@mui/icons-material/Upload";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { GlassCard } from "@/src/components/ui/GlassCard";
import { useAuthStore } from "@/src/store/authStore";
import { ROUTES } from "@/src/lib/constants";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: <DashboardIcon />, label: "Overview", href: "/dashboard" },
    { icon: <PaletteIcon />, label: "My Artworks", href: user ? ROUTES.profile(user.username) : "/login" },
    { icon: <FavoriteIcon />, label: "Wishlist", href: "/dashboard/wishlist" },
    { icon: <ShoppingBagIcon />, label: "Orders", href: "/dashboard/orders" },
    { icon: <ShoppingCartIcon />, label: "Cart", href: "/dashboard/cart" },
    { icon: <AnalyticsIcon />, label: "Analytics", href: "/dashboard/analytics" },
    { icon: <UploadIcon />, label: "Upload Artwork", href: "/upload" },
    { icon: <SettingsIcon />, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <GlassCard
      sx={{
        width: isCollapsed ? 80 : 280,
        minHeight: "100vh",
        p: isCollapsed ? 2 : 3,
        transition: "width 0.3s ease",
        position: "sticky",
        top: 0,
        height: "100vh",
        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 0,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Artistry
            </Typography>
          </motion.div>
        )}
        <IconButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          sx={{
            color: "text.secondary",
            "&:hover": {
              color: "text.primary",
              background: "rgba(255, 255, 255, 0.05)",
            },
          }}
        >
          {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      {/* User Profile */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.03)",
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              JD
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                John Doe
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Artist
              </Typography>
            </Box>
          </Box>
        </motion.div>
      )}

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 2 }} />

      {/* Navigation */}
      <List sx={{ p: 0 }}>
        {menuItems.map((item) => (
          <motion.div
            key={item.label}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                selected={pathname === item.href}
                sx={{
                  borderRadius: "12px",
                  px: 2,
                  py: 1.5,
                  transition: "all 0.2s ease",
                  "&.Mui-selected": {
                    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                  },
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.05)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: pathname === item.href ? "primary.light" : "text.secondary",
                    minWidth: isCollapsed ? "auto" : 40,
                    justifyContent: isCollapsed ? "center" : "flex-start",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      <ListItemText
                        primary={item.label}
                        sx={{
                          "& .MuiTypography-root": {
                            fontWeight: pathname === item.href ? 600 : 400,
                            color: pathname === item.href ? "text.primary" : "text.secondary",
                          },
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>
    </GlassCard>
  );
}
