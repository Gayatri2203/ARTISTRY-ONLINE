"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

import { GlassCard } from "@/src/components/ui/GlassCard";

export function ChartPlaceholder() {
  return (
    <GlassCard sx={{ p: 3, mb: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
      >
        Sales Analytics
      </Typography>

      <Box
        sx={{
          height: 300,
          borderRadius: "16px",
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
          border: "2px dashed rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)",
          }}
        />

        <Box sx={{ position: "relative", textAlign: "center", zIndex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "text.secondary",
              mb: 1,
            }}
          >
            📊
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Chart visualization coming soon
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled", mt: 0.5 }}>
            Sales data will be displayed here
          </Typography>
        </Box>
      </Box>

      {/* Stats below chart */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          mt: 3,
          pt: 3,
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
            $12,450
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Total Revenue
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
            24
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Total Sales
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
            +23%
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Growth
          </Typography>
        </Box>
      </Box>
    </GlassCard>
  );
}
