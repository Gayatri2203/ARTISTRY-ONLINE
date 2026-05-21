"use client";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";

import { AuthNavButtons } from "@/src/components/layout/Navbar/AuthNavButtons";
import { DesktopNavLinks } from "@/src/components/layout/Navbar/DesktopNavLinks";
import { MobileNavDrawer } from "@/src/components/layout/Navbar/MobileNavDrawer";
import { ProfileMenu } from "@/src/components/layout/Navbar/ProfileMenu";
import Logo from "@/src/components/layout/Logo";
import { NAV_LINKS } from "@/src/features/landing/data";
import { useMobileNav } from "@/src/hooks/useMobileNav";
import { useAuth } from "@/src/context/AuthContext";
import { touchIconButton } from "@/src/theme/responsive";

export default function Navbar() {
  const { isOpen, open, close } = useMobileNav();
  const { user } = useAuth();

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          pt: "var(--safe-top)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              py: { xs: 0.75, sm: 1 },
              gap: { xs: 1, sm: 2 },
              minHeight: { xs: 56, md: 64 },
            }}
          >
            <Logo />
            <DesktopNavLinks links={NAV_LINKS} />

            <Stack
              direction="row"
              spacing={1}
              sx={{ ml: "auto", display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              {isAuthenticated ? (
                <ProfileMenu />
              ) : (
                <AuthNavButtons />
              )}
            </Stack>

            <IconButton
              aria-label="Open menu"
              aria-expanded={isOpen}
              onClick={open}
              sx={{
                display: { md: "none" },
                ml: "auto",
                ...touchIconButton,
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <MobileNavDrawer
        links={NAV_LINKS}
        open={isOpen}
        onClose={close}
        isLoggedIn={isAuthenticated}
        username={user?.username}
      />
    </>
  );
}
