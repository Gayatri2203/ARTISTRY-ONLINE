"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedIcon from "@mui/icons-material/Verified";
import Link from "next/link";

import { GlassCard } from "@/src/components/ui/GlassCard";
import { ROUTES } from "@/src/lib/constants";

export type ArtistInfoProps = {
  artistUsername?: string;
  artistName?: string;
};

export function ArtistInfo({
  artistUsername = "johndoe",
  artistName = "John Doe",
}: ArtistInfoProps) {
  return (
    <GlassCard sx={{ p: 3, mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <motion.div whileHover={{ scale: 1.05 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              fontSize: 32,
              fontWeight: 700,
              border: "3px solid",
              borderColor: "primary.main",
            }}
          >
            JD
          </Avatar>
        </motion.div>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography
              component={Link}
              href={ROUTES.profile(artistUsername)}
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {artistName}
            </Typography>
            <VerifiedIcon sx={{ fontSize: 20, color: "primary.light" }} />
          </Box>
          
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
            Digital Artist • 156 Artworks
          </Typography>

          <Stack direction="row" spacing={1}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="gradient"
                size="small"
                sx={{
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
              >
                Follow
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="glass"
                size="small"
                sx={{
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
              >
                Message
              </Button>
            </motion.div>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 3,
          pt: 3,
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
            12.5K
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Followers
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
            842
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Following
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
            156
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Artworks
          </Typography>
        </Box>
      </Box>
    </GlassCard>
  );
}
