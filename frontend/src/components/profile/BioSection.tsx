"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";

import { GlassCard } from "@/src/components/ui/GlassCard";

interface BioSectionProps {
  username: string;
}

export function BioSection({ username }: BioSectionProps) {
  const socialLinks = [
    { icon: <InstagramIcon />, href: "#", label: "Instagram" },
    { icon: <TwitterIcon />, href: "#", label: "Twitter" },
    { icon: <LinkedInIcon />, href: "#", label: "LinkedIn" },
    { icon: <LanguageIcon />, href: "#", label: "Website" },
  ];

  return (
    <GlassCard sx={{ p: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mb: 2, color: "text.primary" }}
        >
          About
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            lineHeight: 1.7,
          }}
        >
          Passionate digital artist exploring the intersection of technology and creativity. 
          Specializing in abstract compositions and vibrant color palettes. 
          Always pushing boundaries and experimenting with new techniques.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 3,
        }}
      >
        {socialLinks.map((social, index) => (
          <motion.div
            key={social.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <IconButton
              component={Link}
              href={social.href}
              sx={{
                width: 44,
                height: 44,
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                color: "text.secondary",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(99, 102, 241, 0.2)",
                  borderColor: "rgba(99, 102, 241, 0.5)",
                  color: "primary.light",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {social.icon}
            </IconButton>
          </motion.div>
        ))}
      </Box>
    </GlassCard>
  );
}
