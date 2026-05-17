"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { FooterLinkColumn } from "@/src/components/layout/Footer/FooterLinkColumn";
import Logo from "@/src/components/layout/Logo";
import { StaggerReveal, StaggerRevealItem } from "@/src/components/ui";
import {
  FOOTER_LINK_GROUPS,
  FOOTER_TAGLINE,
} from "@/src/features/landing/data";
import { sectionGridSpacing } from "@/src/theme/responsive";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        zIndex: 1,
        py: { xs: 5, sm: 6, md: 8 },
        pb: { xs: "calc(24px + var(--safe-bottom))", md: 8 },
        borderTop: 1,
        borderColor: "divider",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <StaggerReveal>
          <Grid container spacing={sectionGridSpacing}>
            <Grid size={{ xs: 12, md: 4 }}>
              <StaggerRevealItem>
                <Logo />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 2,
                    fontSize: { xs: "0.875rem", sm: "0.875rem" },
                    lineHeight: 1.65,
                    maxWidth: { xs: "100%", md: 320 },
                  }}
                >
                  {FOOTER_TAGLINE}
                </Typography>
              </StaggerRevealItem>
            </Grid>

            {FOOTER_LINK_GROUPS.map((group) => (
              <Grid key={group.title} size={{ xs: 6, sm: 4, md: 2 }}>
                <StaggerRevealItem>
                  <FooterLinkColumn group={group} />
                </StaggerRevealItem>
              </Grid>
            ))}

            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <StaggerRevealItem>
                <Typography variant="overline" gutterBottom>
                  Stay inspired
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, lineHeight: 1.65 }}
                >
                  Weekly curator picks and artist spotlights in your inbox.
                </Typography>
                <Button
                  variant="gradient"
                  size="large"
                  fullWidth
                  component={Link}
                  href="/newsletter"
                  sx={{ maxWidth: { sm: 240, md: "none" } }}
                >
                  Subscribe
                </Button>
              </StaggerRevealItem>
            </Grid>
          </Grid>
        </StaggerReveal>

        <Divider sx={{ my: { xs: 3, sm: 4 } }} />
        <Typography
          variant="caption"
          color="text.disabled"
          align="center"
          sx={{ display: "block", px: 1 }}
        >
          © {new Date().getFullYear()} Artistry Online. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
