"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { MotionBox } from "@/src/components/home/MotionBox";
import { staggerContainer, staggerItem, viewportOnce } from "@/src/components/home/animations";

import Logo from "./Logo";

const marketplaceLinks = ["Explore", "Categories", "Sell Artwork", "Pricing"];
const companyLinks = ["About", "Careers", "Press", "Contact"];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        zIndex: 1,
        py: { xs: 6, md: 8 },
        borderTop: 1,
        borderColor: "divider",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <MotionBox variants={staggerItem}>
                <Logo />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  A premium marketplace connecting collectors with exceptional
                  contemporary art from around the world.
                </Typography>
              </MotionBox>
            </Grid>

            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <MotionBox variants={staggerItem}>
                <Typography variant="overline" gutterBottom>
                  Marketplace
                </Typography>
                <Stack spacing={1}>
                  {marketplaceLinks.map((item) => (
                    <Typography
                      key={item}
                      component={Link}
                      href="/explore"
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textDecoration: "none",
                        transition: "color 0.2s",
                        "&:hover": { color: "text.primary" },
                      }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Stack>
              </MotionBox>
            </Grid>

            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <MotionBox variants={staggerItem}>
                <Typography variant="overline" gutterBottom>
                  Company
                </Typography>
                <Stack spacing={1}>
                  {companyLinks.map((item) => (
                    <Typography
                      key={item}
                      component={Link}
                      href="/about"
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textDecoration: "none",
                        transition: "color 0.2s",
                        "&:hover": { color: "text.primary" },
                      }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Stack>
              </MotionBox>
            </Grid>

            <Grid size={{ xs: 12, sm: 4, md: 4 }}>
              <MotionBox variants={staggerItem}>
                <Typography variant="overline" gutterBottom>
                  Stay inspired
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Weekly curator picks and artist spotlights in your inbox.
                </Typography>
                <Button variant="gradient" component={Link} href="/newsletter">
                  Subscribe
                </Button>
              </MotionBox>
            </Grid>
          </Grid>
        </MotionBox>

        <Divider sx={{ my: 4 }} />
        <Typography
          variant="caption"
          color="text.disabled"
          align="center"
          sx={{ display: "block" }}
        >
          © {new Date().getFullYear()} Artistry Online. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
