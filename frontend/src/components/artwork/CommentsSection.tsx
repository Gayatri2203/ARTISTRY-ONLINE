"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  type DocumentData,
} from "firebase/firestore";

import { GlassCard } from "@/src/components/ui/GlassCard";
import { useAuth } from "@/src/context/AuthContext";
import { createNotification } from "@/src/lib/firestore/notifications";
import { db } from "@/src/lib/firebase";

type FirestoreComment = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string | null;
  text: string;
  createdAt: number | null;
};

const COMMENTS_COLLECTION = "comments" as const;

function parseCreatedAt(value: unknown): number | null {
  if (value instanceof Timestamp) {
    return value.toMillis();
  }
  if (
    value &&
    typeof value === "object" &&
    "seconds" in value &&
    typeof (value as { seconds: number }).seconds === "number"
  ) {
    return (value as { seconds: number }).seconds * 1000;
  }
  return null;
}

function parseCommentDoc(id: string, data: DocumentData): FirestoreComment | null {
  if (
    typeof data.userId !== "string" ||
    typeof data.userName !== "string" ||
    typeof data.text !== "string"
  ) {
    return null;
  }

  return {
    id,
    userId: data.userId,
    userName: data.userName,
    userAvatar: typeof data.userAvatar === "string" ? data.userAvatar : null,
    text: data.text,
    createdAt: parseCreatedAt(data.createdAt),
  };
}

/** Client-only relative time — call after mount to avoid hydration mismatch. */
function formatCommentTimeAgo(createdAtMs: number): string {
  const seconds = Math.floor((Date.now() - createdAtMs) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function getAvatarLabel(comment: FirestoreComment): string {
  if (comment.userAvatar) return "";
  return comment.userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type CommentListProps = {
  comments: FirestoreComment[];
  animated: boolean;
  mounted: boolean;
};

function CommentList({ comments, animated, mounted }: CommentListProps) {
  const items = comments.map((comment, index) => {
    const timeLabel =
      mounted && comment.createdAt ? formatCommentTimeAgo(comment.createdAt) : "Just now";

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
              src={comment.userAvatar ?? undefined}
              sx={{
                width: 48,
                height: 48,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {getAvatarLabel(comment)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {comment.userName}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.disabled" }}>
                  • {timeLabel}
                </Typography>
              </Box>
            }
            secondary={
              <Box>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                  {comment.text}
                </Typography>
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

type CommentsSectionProps = {
  artworkId: string;
  artworkTitle: string;
  artworkOwnerId?: string;
};

export function CommentsSection({
  artworkId,
  artworkTitle,
  artworkOwnerId,
}: CommentsSectionProps) {
  const { user } = useAuth();
  const mounted = typeof window !== "undefined";
  const [comments, setComments] = useState<FirestoreComment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadComments() {
      if (!artworkId) {
        setComments([]);
        setLoadingComments(false);
        return;
      }

      setLoadingComments(true);
      try {
        const commentsQuery = query(
          collection(db, COMMENTS_COLLECTION),
          where("artworkId", "==", artworkId),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(commentsQuery);

        if (cancelled) return;

        const items = snapshot.docs
          .map((docSnap) => parseCommentDoc(docSnap.id, docSnap.data()))
          .filter((item): item is FirestoreComment => item !== null);
        setComments(items);
      } finally {
        if (!cancelled) {
          setLoadingComments(false);
        }
      }
    }

    void loadComments();

    return () => {
      cancelled = true;
    };
  }, [artworkId]);

  const handleSubmit = async () => {
    const text = newComment.trim();
    if (!text || !user || submitting) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, COMMENTS_COLLECTION), {
        artworkId,
        userId: user.uid,
        userName: user.displayName ?? "Anonymous User",
        userAvatar: user.photoURL ?? null,
        text,
        createdAt: serverTimestamp(),
      });

      await createNotification({
        recipientUserId: artworkOwnerId ?? "",
        senderUserId: user.uid,
        senderName: user.displayName ?? user.email?.split("@")[0] ?? "Someone",
        senderAvatar: user.photoURL ?? "",
        type: "comment",
        artworkId,
        artworkTitle: artworkTitle || "your artwork",
      });

      const commentsQuery = query(
        collection(db, COMMENTS_COLLECTION),
        where("artworkId", "==", artworkId),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(commentsQuery);
      const items = snapshot.docs
        .map((docSnap) => parseCommentDoc(docSnap.id, docSnap.data()))
        .filter((item): item is FirestoreComment => item !== null);
      setComments(items);
      setNewComment("");
    } finally {
      setSubmitting(false);
    }
  };

  const inputDisabled = !user || submitting;
  const inputPlaceholder = user
    ? "Share your thoughts about this artwork..."
    : "Login to add a comment";

  const sendButton = submitting ? (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 1 }}>
      <CircularProgress size={18} />
    </Box>
  ) : (
    <IconButton
      onClick={handleSubmit}
      disabled={!newComment.trim() || inputDisabled}
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
          placeholder={inputPlaceholder}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={inputDisabled}
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

      {loadingComments ? (
        <List sx={{ p: 0 }}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Box key={index}>
              <ListItem sx={{ px: 0, py: 2 }}>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={48} height={48} />
                </ListItemAvatar>
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="45%" />
                  <Skeleton variant="text" width="95%" />
                  <Skeleton variant="text" width="60%" />
                </Box>
              </ListItem>
              {index < 2 && (
                <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)" }} />
              )}
            </Box>
          ))}
        </List>
      ) : (
        <List sx={{ p: 0 }}>
          <CommentList
            comments={comments}
            animated={mounted}
            mounted={mounted}
          />
        </List>
      )}
    </GlassCard>
  );
}
