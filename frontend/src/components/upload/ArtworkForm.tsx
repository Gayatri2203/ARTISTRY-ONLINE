"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { motion } from "framer-motion";
import PublishIcon from "@mui/icons-material/Publish";
import SaveIcon from "@mui/icons-material/Save";

import { GlassCard } from "@/src/components/ui/GlassCard";
import { CategorySelector } from "./CategorySelector";
import { TagsInput } from "./TagsInput";

export function ArtworkForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    tags: [] as string[],
  });

  const handleSubmit = (type: "publish" | "draft") => {
    console.log(type, formData);
  };

  return (
    <GlassCard sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
      >
        Artwork Details
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          fullWidth
          label="Artwork Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter a catchy title for your artwork"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Tell the story behind your artwork..."
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />

        <CategorySelector
          value={formData.category}
          onChange={(category: string) =>
            setFormData({ ...formData, category })
          }
        />

        <TagsInput
          value={formData.tags}
          onChange={(tags: string[]) => setFormData({ ...formData, tags })}
        />

        <TextField
          fullWidth
          label="Price (USD)"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          placeholder="0.00"
          slotProps={{
            input: {
              startAdornment: <span style={{ marginRight: 8 }}>$</span>,
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
          }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="glass"
              fullWidth
              size="large"
              startIcon={<SaveIcon />}
              onClick={() => handleSubmit("draft")}
              sx={{
                borderRadius: "12px",
                fontWeight: 600,
              }}
            >
              Save as Draft
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="gradient"
              fullWidth
              size="large"
              startIcon={<PublishIcon />}
              onClick={() => handleSubmit("publish")}
              sx={{
                borderRadius: "12px",
                fontWeight: 600,
              }}
            >
              Publish Artwork
            </Button>
          </motion.div>
        </Box>
      </Box>
    </GlassCard>
  );
}
