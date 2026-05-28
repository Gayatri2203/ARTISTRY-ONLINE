"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRouter } from "next/navigation";

import { GlassCard } from "@/src/components/ui/GlassCard";
import { useAuth } from "@/src/context/AuthContext";
import { useArtworkLikes } from "@/src/hooks/useArtworkLikes";
import {
  deleteArtworkById,
  updateArtworkById,
  type ArtworkUpdateInput,
} from "@/src/lib/firestore/artworks";

export type ActionButtonsProps = {
  priceLabel: string;
  artworkId: string;
  artworkOwnerId?: string;
  initialValues: {
    title: string;
    description: string;
    category: string;
    price: number | null;
  };
  onUpdated?: () => Promise<void> | void;
};

export function ActionButtons({
  priceLabel,
  artworkId,
  artworkOwnerId,
  initialValues,
  onUpdated,
}: ActionButtonsProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { likesCount, isLiked, toggling, canLike, toggleLike } = useArtworkLikes(artworkId);
  const [isSaved, setIsSaved] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [form, setForm] = useState<ArtworkUpdateInput>({
    title: initialValues.title,
    description: initialValues.description,
    category: initialValues.category,
    price: initialValues.price,
  });

  const isOwner = Boolean(user?.uid && artworkOwnerId && user.uid === artworkOwnerId);

  const handleEditSubmit = async () => {
    setFormError(null);

    const title = form.title.trim();
    const category = form.category.trim();
    const description = form.description.trim();
    const price =
      form.price === null || Number.isNaN(form.price) ? null : Number(form.price);

    if (!title || !category) {
      setFormError("Title and category are required.");
      return;
    }

    setSaving(true);
    try {
      await updateArtworkById(artworkId, {
        title,
        category,
        description,
        price,
      });
      setEditOpen(false);
      if (onUpdated) {
        await onUpdated();
      }
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Failed to update artwork.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setFormError(null);
    try {
      await deleteArtworkById(artworkId);
      setDeleteOpen(false);
      router.push("/dashboard");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Failed to delete artwork.");
      setDeleting(false);
    }
  };

  return (
    <GlassCard sx={{ p: 3, mb: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
      >
        Price & Actions
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" sx={{ color: "text.secondary", mb: 0.5, display: "block" }}>
          Price
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {priceLabel}
        </Typography>
      </Box>

      <Stack spacing={2}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="gradient"
            fullWidth
            size="large"
            startIcon={<ShoppingCartIcon />}
            sx={{
              borderRadius: "12px",
              fontWeight: 600,
              py: 1.5,
            }}
          >
            Add to Cart
          </Button>
        </motion.div>

        <Stack direction="row" spacing={2}>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ flex: 1 }}>
            <Button
              variant={isLiked ? "gradient" : "glass"}
              fullWidth
              size="large"
              onClick={toggleLike}
              disabled={!canLike || toggling}
              startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              sx={{
                borderRadius: "12px",
                fontWeight: 600,
                py: 1.5,
              }}
            >
              {toggling ? "..." : likesCount}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ flex: 1 }}>
            <Button
              variant={isSaved ? "gradient" : "glass"}
              fullWidth
              size="large"
              onClick={() => setIsSaved(!isSaved)}
              startIcon={isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              sx={{
                borderRadius: "12px",
                fontWeight: 600,
                py: 1.5,
              }}
            >
              Save
            </Button>
          </motion.div>
        </Stack>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="glass"
            fullWidth
            size="large"
            startIcon={<ShareIcon />}
            sx={{
              borderRadius: "12px",
              fontWeight: 600,
              py: 1.5,
            }}
          >
            Share Artwork
          </Button>
        </motion.div>

        {isOwner && (
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="glass"
              fullWidth
              startIcon={<EditOutlinedIcon />}
              onClick={() => {
                setForm({
                  title: initialValues.title,
                  description: initialValues.description,
                  category: initialValues.category,
                  price: initialValues.price,
                });
                setFormError(null);
                setEditOpen(true);
              }}
            >
              Edit Artwork
            </Button>
            <Button
              variant="glass"
              color="error"
              fullWidth
              startIcon={<DeleteOutlineIcon />}
              onClick={() => {
                setFormError(null);
                setDeleteOpen(true);
              }}
            >
              Delete Artwork
            </Button>
          </Stack>
        )}
      </Stack>

      <Dialog open={editOpen} onClose={() => !saving && setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Artwork</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1.5 }}>
          <TextField
            label="Title"
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            fullWidth
          />
          <TextField
            label="Description"
            value={form.description}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, description: event.target.value }))
            }
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            label="Category"
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
            fullWidth
          />
          <TextField
            label="Price"
            type="number"
            value={form.price ?? ""}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                price: event.target.value === "" ? null : Number(event.target.value),
              }))
            }
            fullWidth
          />
          {formError && <Typography color="error.main">{formError}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} variant="contained" disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => !deleting && setDeleteOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Delete Artwork?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            This action cannot be undone.
          </Typography>
          {formError && (
            <Typography color="error.main" sx={{ mt: 1 }}>
              {formError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </GlassCard>
  );
}
