"use client";

import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { memo } from "react";

import { GlassCard, tapLinkStyle } from "@/src/components/ui";

import type { CategoryItem } from "../types";
import CategoryIcon from "./CategoryIcon";

function CategoryCardComponent(category: CategoryItem) {
  return (
    <Link href={`/explore?category=${category.id}`} style={tapLinkStyle}>
      <GlassCard sx={{ height: "100%" }}>
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Box
            sx={{
              width: { xs: 48, sm: 52 },
              height: { xs: 48, sm: 52 },
              borderRadius: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              background: category.gradient,
              color: "#fff",
              boxShadow: (theme) => theme.palette.artistry.shadows.sm,
            }}
          >
            <CategoryIcon name={category.iconName} />
          </Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}
          >
            {category.label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {category.count}
          </Typography>
        </CardContent>
      </GlassCard>
    </Link>
  );
}

export const CategoryCard = memo(CategoryCardComponent);
