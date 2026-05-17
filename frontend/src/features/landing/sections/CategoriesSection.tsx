"use client";

import Grid from "@mui/material/Grid";

import { SectionShell, StaggerReveal, StaggerRevealItem } from "@/src/components/ui";
import { sectionGridSpacing } from "@/src/theme/responsive";

import { CategoryCard, SectionHeader } from "../components";
import { CATEGORIES } from "../data";

export default function CategoriesSection() {
  return (
    <SectionShell id="categories">
      <SectionHeader
        overline="Browse by medium"
        title="Explore categories"
        description="From classical paintings to cutting-edge digital pieces — find art that speaks to you."
      />

      <StaggerReveal>
        <Grid container spacing={sectionGridSpacing}>
          {CATEGORIES.map((category) => (
            <Grid key={category.id} size={{ xs: 12, sm: 6, lg: 3 }}>
              <StaggerRevealItem sx={{ height: "100%" }}>
                <CategoryCard {...category} />
              </StaggerRevealItem>
            </Grid>
          ))}
        </Grid>
      </StaggerReveal>
    </SectionShell>
  );
}
