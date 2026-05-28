"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Link from "next/link";
import { useState } from "react";

import { ArtworksLoadState } from "@/src/components/home/ArtworksLoadState";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { useUserArtworks } from "@/src/hooks/useUserArtworks";
import {
  deleteArtworkById,
  formatArtworkCreatedDate,
  formatArtworkPrice,
  updateArtworkById,
} from "@/src/lib/firestore/artworks";
import type { UserArtwork } from "@/src/hooks/useUserArtworks";

type SavedArtworksProps = {
  userId?: string;
};

export function SavedArtworks({ userId }: SavedArtworksProps) {
  const { artworks, loading, error } = useUserArtworks(userId);
  const recentArtworks = artworks.slice(0, 6);
  const [editingArtwork, setEditingArtwork] = useState<UserArtwork | null>(null);
  const [deletingArtwork, setDeletingArtwork] = useState<UserArtwork | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "" as string,
  });

  const openEdit = (artwork: UserArtwork) => {
    setFormError(null);
    setEditingArtwork(artwork);
    setForm({
      title: artwork.title,
      description: artwork.description,
      category: artwork.category,
      price: artwork.price == null ? "" : String(artwork.price),
    });
  };

  const submitEdit = async () => {
    if (!editingArtwork) return;

    const title = form.title.trim();
    const category = form.category.trim();
    if (!title || !category) {
      setFormError("Title and category are required.");
      return;
    }

    setSaving(true);
    setFormError(null);
    try {
      await updateArtworkById(editingArtwork.id, {
        title,
        description: form.description.trim(),
        category,
        price: form.price === "" ? null : Number(form.price),
      });
      setEditingArtwork(null);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Failed to update artwork.");
    } finally {
      setSaving(false);
    }
  };

  const submitDelete = async () => {
    if (!deletingArtwork) return;
    setDeleting(true);
    setFormError(null);
    try {
      await deleteArtworkById(deletingArtwork.id);
      setDeletingArtwork(null);
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
        My Uploads
      </Typography>

      <ArtworksLoadState
        loading={loading}
        error={error}
        isEmpty={!loading && !error && recentArtworks.length === 0}
        emptyMessage="You have not uploaded any artworks yet."
      />

      {!loading && !error && recentArtworks.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {recentArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ x: 4 }}
            >
              <Link
                href={`/artwork/${artwork.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "rgba(255, 255, 255, 0.2)",
                      background: "rgba(255, 255, 255, 0.05)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "10px",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, color: "text.primary" }}
                    >
                      {artwork.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                      {artwork.category || "Uncategorized"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                      {formatArtworkPrice(artwork.price)} • {formatArtworkCreatedDate(artwork.createdAt)}
                    </Typography>
                  </Box>

                  <FavoriteIcon sx={{ fontSize: 20, color: "#f43f5e" }} />
                  <IconButton
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      openEdit(artwork);
                    }}
                    size="small"
                    sx={{ color: "text.secondary" }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setFormError(null);
                      setDeletingArtwork(artwork);
                    }}
                    size="small"
                    sx={{ color: "error.main" }}
                  >
                    <DeleteOutlinedIcon fontSize="small" />
                  </IconButton>
                </Card>
              </Link>
            </motion.div>
          ))}
        </Box>
      )}

      <Dialog open={Boolean(editingArtwork)} onClose={() => !saving && setEditingArtwork(null)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Artwork</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
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
            fullWidth
            multiline
            rows={4}
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
            value={form.price}
            onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
            fullWidth
          />
          {formError && <Typography color="error.main">{formError}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingArtwork(null)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={submitEdit} variant="contained" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(deletingArtwork)} onClose={() => !deleting && setDeletingArtwork(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Delete Artwork?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            This will permanently remove this artwork.
          </Typography>
          {formError && (
            <Typography color="error.main" sx={{ mt: 1 }}>
              {formError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletingArtwork(null)} disabled={deleting}>
            Cancel
          </Button>
          <Button onClick={submitDelete} color="error" variant="contained" disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </GlassCard>
  );
}
