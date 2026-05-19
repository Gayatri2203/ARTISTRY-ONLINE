"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

import { GlassCard } from "@/src/components/ui/GlassCard";

export function DragDropUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setUploadedFiles((prev) => [...prev, ...imageFiles]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setUploadedFiles((prev) => [...prev, ...imageFiles]);
  };

  return (
    <GlassCard sx={{ p: 3, mb: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
      >
        Upload Artwork
      </Typography>

      <Box
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          border: "2px dashed",
          borderColor: isDragging ? "primary.main" : "rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
          p: 6,
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
          background: isDragging
            ? "rgba(99, 102, 241, 0.1)"
            : "rgba(255, 255, 255, 0.02)",
          "&:hover": {
            borderColor: "rgba(99, 102, 241, 0.5)",
            background: "rgba(99, 102, 241, 0.05)",
          },
        }}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isDragging ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <CloudUploadIcon
            sx={{
              fontSize: 64,
              color: isDragging ? "primary.main" : "text.secondary",
              mb: 2,
            }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
          >
            Drag and drop your artwork here
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            or click to browse files
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            Supports: JPG, PNG, GIF, WebP (Max 10MB)
          </Typography>
        </motion.div>
      </Box>

      <input
        id="file-upload"
        type="file"
        multiple
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      {uploadedFiles.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, mb: 2, color: "text.primary" }}
          >
            Uploaded Files ({uploadedFiles.length})
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {uploadedFiles.map((file, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: 100,
                  height: 100,
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </GlassCard>
  );
}
