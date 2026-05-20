"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export function TagsInput({ value, onChange }: TagsInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleDelete = (tagToDelete: string) => {
    onChange(value.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 600, mb: 1.5, color: "text.primary" }}
      >
        Tags
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          p: 2,
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          background: "rgba(255, 255, 255, 0.02)",
          minHeight: 56,
          alignItems: "center",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.3)",
          },
          "&:focus-within": {
            borderColor: "primary.main",
          },
        }}
      >
        <AnimatePresence>
          {value.map((tag) => (
            <motion.div
              key={tag}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Chip
                label={tag}
                onDelete={() => handleDelete(tag)}
                deleteIcon={
                  <CloseIcon sx={{ fontSize: 16 }} />
                }
                sx={{
                  background: "rgba(99, 102, 241, 0.2)",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  color: "primary.light",
                  fontWeight: 500,
                  borderRadius: "8px",
                  "& .MuiChip-deleteIcon": {
                    color: "primary.light",
                    "&:hover": {
                      color: "primary.main",
                    },
                  },
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? "Add tags (press Enter)" : ""}
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            color: "inherit",
            fontSize: "1rem",
            flex: 1,
            minWidth: 120,
          }}
        />
      </Box>
      <Typography variant="caption" sx={{ color: "text.disabled", mt: 0.5 }}>
        Press Enter to add a tag
      </Typography>
    </Box>
  );
}
