"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PublishIcon from "@mui/icons-material/Publish";
import SaveIcon from "@mui/icons-material/Save";
import toast from "react-hot-toast";

import { GlassCard } from "@/src/components/ui/GlassCard";
import { artworksApi } from "@/src/lib/api/artworks";
import { ROUTES } from "@/src/lib/constants";
import { useUploadContext } from "@/src/features/upload/UploadContext";
import { CategorySelector } from "./CategorySelector";
import { TagsInput } from "./TagsInput";

export function ArtworkForm() {
  const router = useRouter();
  const { imageFile } = useUploadContext();
  const [publishing, setPublishing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    tags: [] as string[],
  });

  const handleSubmit = async (type: "publish" | "draft") => {
    if (type === "draft") {
      toast.success("Draft saved locally");
      return;
    }
    if (!imageFile) {
      toast.error("Please upload an artwork image first");
      return;
    }
    if (!formData.title || !formData.category) {
      toast.error("Title and category are required");
      return;
    }
    setPublishing(true);
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("tags", formData.tags.join(","));
      if (formData.price) form.append("price", formData.price);
      form.append("image", imageFile);
      const artwork = await artworksApi.upload(form);
      toast.success("Artwork published!");
      router.push(ROUTES.artwork(artwork.id));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setPublishing(false);
    }
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
              disabled={publishing}
              sx={{
                borderRadius: "12px",
                fontWeight: 600,
              }}
            >
              {publishing ? "Publishing…" : "Publish Artwork"}
            </Button>
          </motion.div>
        </Box>
      </Box>
    </GlassCard>
  );
}
