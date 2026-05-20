"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { GlassCard } from "@/src/components/ui/GlassCard";

interface EmptyCartStateProps {
  onBrowseArtworks?: () => void;
}

export function EmptyCartState({ onBrowseArtworks }: EmptyCartStateProps) {
  return (
    <GlassCard
      sx={{
        p: 6,
        textAlign: "center",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(20px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 4,
            position: "relative",
          }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ShoppingBagIcon
              sx={{
                fontSize: 80,
                color: "text.secondary",
                opacity: 0.5,
              }}
            />
          </motion.div>
          
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
              background: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Your cart is empty
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 4,
            maxWidth: 400,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Discover exceptional artworks from talented artists around the world and start building your collection.
        </Typography>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="gradient"
            size="large"
            onClick={onBrowseArtworks}
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderRadius: "12px",
              fontWeight: 700,
              py: 1.5,
              px: 3,
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Browse Artworks
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Box
          sx={{
            mt: 6,
            display: "flex",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {[
            { label: "10K+", sublabel: "Artworks" },
            { label: "5K+", sublabel: "Artists" },
            { label: "50K+", sublabel: "Collectors" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "primary.light",
                    mb: 0.5,
                  }}
                >
                  {stat.label}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary" }}
                >
                  {stat.sublabel}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </GlassCard>
  );
}
