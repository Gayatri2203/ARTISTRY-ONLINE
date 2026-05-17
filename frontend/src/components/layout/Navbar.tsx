"use client";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { NAV_LINKS } from "@/src/components/home/data";

import Logo from "./Logo";

const MotionListItem = motion.create(ListItem);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  const mobileNav = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        backgroundImage: (t) =>
          `linear-gradient(180deg, rgba(99,102,241,0.08) 0%, ${t.palette.background.paper} 40%)`,
      }}
      role="presentation"
    >
      <Stack
        direction="row"
        sx={{
          px: 2.5,
          py: 2,
          borderBottom: 1,
          borderColor: "divider",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo size="small" />
        <IconButton onClick={closeMobile} aria-label="Close menu" edge="end">
          <CloseIcon />
        </IconButton>
      </Stack>

      <List sx={{ flex: 1, px: 1.5, py: 2 }}>
        <AnimatePresence>
          {mobileOpen &&
            NAV_LINKS.map((link, i) => (
              <MotionListItem
                key={link.label}
                disablePadding
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
              >
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={closeMobile}
                  sx={{ borderRadius: 2, mb: 0.5 }}
                >
                  <ListItemText
                    primary={link.label}
                    slotProps={{ primary: { sx: { fontWeight: 500 } } }}
                  />
                </ListItemButton>
              </MotionListItem>
            ))}
        </AnimatePresence>
      </List>

      <Stack spacing={1.5} sx={{ p: 2.5, borderTop: 1, borderColor: "divider" }}>
        <Button
          variant="glass"
          fullWidth
          component={Link}
          href="/login"
          onClick={closeMobile}
        >
          Login
        </Button>
        <Button
          variant="gradient"
          fullWidth
          component={Link}
          href="/signup"
          onClick={closeMobile}
        >
          Sign up
        </Button>
      </Stack>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: { xs: 0.5, md: 1 }, gap: 2 }}>
            <Logo />

            <Stack
              direction="row"
              spacing={3}
              sx={{ display: { xs: "none", md: "flex" }, flex: 1, ml: 4 }}
            >
              {NAV_LINKS.map((link) => (
                <Typography
                  key={link.label}
                  component={Link}
                  href={link.href}
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    textDecoration: "none",
                    fontWeight: 500,
                    position: "relative",
                    transition: "color 0.2s",
                    "&:hover": { color: "text.primary" },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      width: 0,
                      height: 2,
                      borderRadius: 1,
                      background: (t) => t.palette.gradients.primary,
                      transition: "width 0.25s ease",
                    },
                    "&:hover::after": { width: "100%" },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{ ml: "auto", display: { xs: "none", md: "flex" } }}
            >
              <Button variant="glass" size="small" component={Link} href="/login">
                Login
              </Button>
              <Button
                variant="gradient"
                size="small"
                component={Link}
                href="/signup"
              >
                Sign up
              </Button>
            </Stack>

            <IconButton
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { md: "none" }, ml: "auto" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={closeMobile}
        slotProps={{
          root: { keepMounted: true },
          paper: {
            sx: {
              bgcolor: "transparent",
              boxShadow: "none",
              backgroundImage: "none",
            },
          },
        }}
      >
        {mobileNav}
      </Drawer>
    </>
  );
}
