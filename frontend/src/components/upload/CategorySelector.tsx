"use client";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import { GlassCard } from "@/src/components/ui/GlassCard";

interface CategorySelectorProps {
  value: string;
  onChange: (category: string) => void;
}

const categories = [
  "Digital Art",
  "Painting",
  "Photography",
  "Sculpture",
  "Illustration",
  "Mixed Media",
  "NFT",
  "Print",
];

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 600, mb: 1.5, color: "text.primary" }}
      >
        Category
      </Typography>
      <FormControl fullWidth>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          displayEmpty
          sx={{
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.02)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.2)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.3)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          }}
        >
          <MenuItem value="">Select a category</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
