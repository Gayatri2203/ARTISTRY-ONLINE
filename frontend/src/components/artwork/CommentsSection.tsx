"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { GlassCard } from "@/src/components/ui/GlassCard";

export type Comment = {
  id: number;
  user: string;
  avatar: string;
  text: string;
  /** Display label — use fixed strings or client-formatted relative time */
  time: string;
  likes: number;
  isLiked: boolean;
};

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 1,
    user: "alex_art",
    avatar: "AA",
    text: "Absolutely stunning piece! The color palette is mesmerizing.",
    time: "2 hours ago",
    likes: 24,
    isLiked: false,
  },
  {
    id: 2,
    user: "sarah_creates",
    avatar: "SC",
    text: "Love the abstract composition. Would love to see more work like this!",
    time: "5 hours ago",
    likes: 18,
    isLiked: false,
  },
];

/** Client-only relative time — call after mount to avoid hydration mismatch. */
export function formatCommentTimeAgo(createdAtMs: number): string {
  const seconds = Math.floor((Date.now() - createdAtMs) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

type CommentListProps = {
  comments: Comment[];
  onLike: (id: number) => void;
  animated: boolean;
};

function CommentList({ comments, onLike, animated }: CommentListProps) {
  const items = comments.map((comment, index) => {
    const row = (
      <>
        <ListItem
          sx={{
            px: 0,
            py: 2,
            transition: "background 0.2s ease",
            borderRadius: "12px",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.03)",
            },
          }}
        >
          <ListItemAvatar>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {comment.avatar}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {comment.user}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.disabled" }}>
                  • {comment.time}
                </Typography>
              </Box>
            }
            secondary={
              <Box>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                  {comment.text}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <IconButton
                    size="small"
                    onClick={() => onLike(comment.id)}
                    sx={{
                      color: comment.isLiked ? "#f43f5e" : "text.secondary",
                    }}
                  >
                    {comment.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {comment.likes}
                  </Typography>
                </Box>
              </Box>
            }
          />
        </ListItem>
        {index < comments.length - 1 && (
          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)" }} />
        )}
      </>
    );

    if (!animated) {
      return <Box key={comment.id}>{row}</Box>;
    }

    return (
      <motion.div
        key={comment.id}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {row}
      </motion.div>
    );
  });

  if (!animated) {
    return <>{items}</>;
  }

  return <AnimatePresence initial={false}>{items}</AnimatePresence>;
}

export function CommentsSection() {
  const [mounted, setMounted] = useState(false);
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLike = (id: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked,
            }
          : comment
      )
    );
  };

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    setComments((prev) => [
      {
        id: prev.length > 0 ? Math.max(...prev.map((c) => c.id)) + 1 : 1,
        user: "you",
        avatar: "YO",
        text: newComment.trim(),
        time: "Just now",
        likes: 0,
        isLiked: false,
      },
      ...prev,
    ]);
    setNewComment("");
  };

  const sendButton = (
    <IconButton
      onClick={handleSubmit}
      disabled={!newComment.trim()}
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        "&:hover": {
          background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
        },
        "&:disabled": {
          opacity: 0.5,
        },
      }}
    >
      <SendIcon />
    </IconButton>
  );

  return (
    <GlassCard sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
      >
        Comments ({comments.length})
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Share your thoughts about this artwork..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  {mounted ? (
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      {sendButton}
                    </motion.div>
                  ) : (
                    sendButton
                  )}
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />
      </Box>

      <List sx={{ p: 0 }}>
        <CommentList
          comments={comments}
          onLike={handleLike}
          animated={mounted}
        />
      </List>
    </GlassCard>
  );
}
