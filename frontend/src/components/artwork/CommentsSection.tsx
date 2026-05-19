"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { GlassCard } from "@/src/components/ui/GlassCard";

export function CommentsSection() {
  const [comments, setComments] = useState([
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
  ]);

  const [newComment, setNewComment] = useState("");

  const handleLike = (id: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? { ...comment, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1, isLiked: !comment.isLiked }
          : comment
      )
    );
  };

  const handleSubmit = () => {
    if (newComment.trim()) {
      setComments([
        {
          id: comments.length + 1,
          user: "you",
          avatar: "YO",
          text: newComment,
          time: "Just now",
          likes: 0,
          isLiked: false,
        },
        ...comments,
      ]);
      setNewComment("");
    }
  };

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
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
                  </motion.div>
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
        <AnimatePresence>
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
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
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleLike(comment.id)}
                              sx={{
                                color: comment.isLiked ? "#f43f5e" : "text.secondary",
                              }}
                            >
                              {comment.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </IconButton>
                          </motion.div>
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
            </motion.div>
          ))}
        </AnimatePresence>
      </List>
    </GlassCard>
  );
}
