"use client";

import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { memo } from "react";

import { AuthNavButtons } from "@/src/components/layout/Navbar/AuthNavButtons";
import { ProfileMenu } from "@/src/components/layout/Navbar/ProfileMenu";
import Logo from "@/src/components/layout/Logo";
import type { NavLink } from "@/src/features/landing/types";
import { touchIconButton } from "@/src/theme/responsive";

const MotionListItem = motion.create(ListItem);

export type MobileNavDrawerProps = {
  links: readonly NavLink[];
  open: boolean;
  onClose: () => void;
  isLoggedIn?: boolean;
  username?: string;
};

function MobileNavDrawerComponent({
  links,
  open,
  onClose,
  isLoggedIn = false,
  username = "user",
}: MobileNavDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(0, 0, 0, 0.55)",
            backdropFilter: "blur(4px)",
          },
        },
        paper: {
          sx: {
            width: { xs: "min(100%, 360px)", sm: 320 },
            maxWidth: "100%",
            bgcolor: "transparent",
            boxShadow: (theme) => theme.palette.artistry.shadows.lg,
            backgroundImage: "none",
          },
        },
      }}
      sx={{ display: { md: "none" } }}
    >
      <Box
        sx={{
          width: { xs: "100vw", sm: 320 },
          maxWidth: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
          backgroundImage: (theme) =>
            `linear-gradient(180deg, rgba(99,102,241,0.08) 0%, ${theme.palette.background.paper} 40%)`,
          pt: "var(--safe-top)",
          pb: "calc(16px + var(--safe-bottom))",
        }}
        role="presentation"
      >
        <Stack
          direction="row"
          sx={{
            px: { xs: 2, sm: 2.5 },
            py: 2,
            borderBottom: 1,
            borderColor: "divider",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 56,
          }}
        >
          <Logo size="small" />
          <IconButton
            onClick={onClose}
            aria-label="Close menu"
            edge="end"
            sx={touchIconButton}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <List sx={{ flex: 1, px: { xs: 1.5, sm: 2 }, py: 2, overflowY: "auto" }}>
          <AnimatePresence>
            {open &&
              links.map((link, index) => (
                <MotionListItem
                  key={link.label}
                  disablePadding
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <ListItemButton
                    component={Link}
                    href={link.href}
                    onClick={onClose}
                    sx={{ borderRadius: 2, mb: 0.5, py: 1.5, px: 2 }}
                  >
                    <ListItemText
                      primary={link.label}
                      slotProps={{
                        primary: {
                          sx: { fontWeight: 500, fontSize: "1.0625rem" },
                        },
                      }}
                    />
                  </ListItemButton>
                </MotionListItem>
              ))}
          </AnimatePresence>
        </List>

        <Stack
          spacing={1.5}
          sx={{ p: { xs: 2, sm: 2.5 }, borderTop: 1, borderColor: "divider" }}
        >
          {isLoggedIn ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
              <ProfileMenu />
            </Box>
          ) : (
            <AuthNavButtons
              size="large"
              fullWidth
              orientation="vertical"
              onNavigate={onClose}
            />
          )}
        </Stack>
      </Box>
    </Drawer>
  );
}

export const MobileNavDrawer = memo(MobileNavDrawerComponent);
