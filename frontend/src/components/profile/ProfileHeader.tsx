"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import Link from "next/link";

import { GlassCard } from "@/src/components/ui/GlassCard";
import { ROUTES } from "@/src/lib/constants";
import { useAuth } from "@/src/context/AuthContext";

interface ProfileHeaderProps {
  username: string;
}

export function ProfileHeader({ username }: ProfileHeaderProps) {
  const { user } = useAuth();
  const isOwnProfile = isAuthenticated && user?.username === username;
  return (
    <Box sx={{ position: "relative", mb: 4 }}>
      {/* Cover Banner */}
      <Box
        sx={{
          height: { xs: 200, md: 300 },
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          borderRadius: { xs: "0 0 24px 24px", md: "24px" },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          },
        }}
      >
        <Button
          component={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "white",
            borderRadius: "12px",
            px: 2,
            py: 1,
            "&:hover": {
              background: "rgba(255, 255, 255, 0.2)",
            },
          }}
          startIcon={<CameraAltOutlinedIcon />}
        >
          Edit Cover
        </Button>
      </Box>

      {/* Avatar and User Info */}
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{
            mt: { xs: -12, md: -16 },
            position: "relative",
            zIndex: 1,
            alignItems: { xs: "center", md: "flex-end" },
          }}
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                sx={{
                  width: { xs: 120, md: 160 },
                  height: { xs: 120, md: 160 },
                  border: "4px solid",
                  borderColor: "background.paper",
                  boxShadow: (theme) => `0 8px 32px ${theme.palette.gradients.primary.replace(")", ", 0.3)")}`,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  fontSize: { xs: 48, md: 64 },
                }}
              >
                {username.charAt(0).toUpperCase()}
              </Avatar>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  minWidth: 36,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  p: 0,
                }}
              >
                <CameraAltOutlinedIcon sx={{ fontSize: 18, color: "white" }} />
              </Button>
            </Box>
          </motion.div>

          {/* User Info */}
          <Stack
            spacing={1}
            sx={{
              flex: 1,
              alignItems: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {username}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              Digital Artist & Collector
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              {isOwnProfile && (
              <Button
                variant="gradient"
                component={Link}
                href={ROUTES.profileEdit}
                startIcon={<EditOutlinedIcon />}
                sx={{
                  borderRadius: "12px",
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                Edit Profile
              </Button>
              )}
              <Button
                variant="glass"
                sx={{
                  borderRadius: "12px",
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                Share Profile
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
