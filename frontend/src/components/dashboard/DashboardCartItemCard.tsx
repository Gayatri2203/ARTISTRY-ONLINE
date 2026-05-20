"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { AnimatePresence, motion } from "framer-motion";

import { GlassCard } from "@/src/components/ui/GlassCard";

export type DashboardCartItem = {
  id: string;
  title: string;
  artistName: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
};

type DashboardCartItemCardProps = {
  item: DashboardCartItem;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onSaveForLater: (id: string) => void;
};

export function DashboardCartItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onSaveForLater,
}: DashboardCartItemCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={item.id}
        layout
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, x: 42, scale: 0.96 }}
        transition={{ duration: 0.25 }}
      >
        <GlassCard
          sx={{
            p: 2,
            border: "1px solid",
            borderColor: "divider",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))",
            backdropFilter: "blur(24px)",
            boxShadow: "0 12px 38px rgba(0,0,0,0.32)",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ alignItems: { sm: "center" } }}
          >
            <Box
              component={motion.img}
              whileHover={{ scale: 1.03 }}
              src={item.image}
              alt={item.title}
              sx={{
                width: { xs: "100%", sm: 132 },
                height: { xs: 220, sm: 132 },
                borderRadius: 2,
                objectFit: "cover",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            />

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }} noWrap>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                by {item.artistName}
              </Typography>
              <Chip
                size="small"
                label={item.category}
                sx={{
                  mt: 1,
                  border: "1px solid rgba(255,255,255,0.18)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
              />
            </Box>

            <Stack
              direction={{ xs: "row", sm: "column" }}
              spacing={1}
              sx={{
                minWidth: { sm: 180 },
                alignItems: { xs: "center", sm: "flex-end" },
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, color: "secondary.light" }}>
                ${item.price.toLocaleString()}
              </Typography>

              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <IconButton
                  size="small"
                  onClick={() => onDecrease(item.id)}
                  sx={{ border: "1px solid rgba(255,255,255,0.16)" }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: "rgba(255,255,255,0.08)",
                    color: "text.primary",
                    fontSize: 14,
                  }}
                >
                  {item.quantity}
                </Avatar>
                <IconButton
                  size="small"
                  onClick={() => onIncrease(item.id)}
                  sx={{ border: "1px solid rgba(255,255,255,0.16)" }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Stack>

              <Stack direction="row" spacing={0.5}>
                <IconButton
                  size="small"
                  onClick={() => onSaveForLater(item.id)}
                  sx={{ color: "text.secondary" }}
                >
                  <BookmarkBorderIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => onRemove(item.id)} sx={{ color: "error.main" }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </GlassCard>
      </motion.div>
    </AnimatePresence>
  );
}
