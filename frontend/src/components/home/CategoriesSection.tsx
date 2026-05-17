"use client";

import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { CATEGORIES } from "./data";
import CategoryIcon from "./CategoryIcon";
import GlassCard from "./GlassCard";
import SectionHeader from "./SectionHeader";
import { MotionBox } from "./MotionBox";
import { staggerContainer, staggerItem, viewportOnce } from "./animations";

export default function CategoriesSection() {
  return (
    <Box
      id="categories"
      component="section"
      sx={{ position: "relative", zIndex: 1, py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="lg">
        <SectionHeader
          overline="Browse by medium"
          title="Explore categories"
          description="From classical paintings to cutting-edge digital pieces — find art that speaks to you."
        />

        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <Grid container spacing={3}>
            {CATEGORIES.map((cat) => (
              <Grid key={cat.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <MotionBox variants={staggerItem} sx={{ height: "100%" }}>
                  <Link
                    href={`/explore?category=${cat.id}`}
                    style={{ textDecoration: "none", display: "block", height: "100%" }}
                  >
                  <GlassCard sx={{ height: "100%" }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: 2.5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                          background: cat.gradient,
                          color: "#fff",
                          boxShadow: (t) => t.palette.artistry.shadows.sm,
                        }}
                      >
                        <CategoryIcon name={cat.iconName} />
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {cat.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {cat.count}
                      </Typography>
                    </CardContent>
                  </GlassCard>
                  </Link>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
}
