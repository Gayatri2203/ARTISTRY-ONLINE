"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

import { ArtworkCard } from "@/src/components/ecommerce/ArtworkCard";

import { fadeInUp, staggerContainer } from "@/src/lib/motion";

export default function WishlistPage() {
  const wishlistItems = [
    { id: "1", title: "Abstract Flow", price: "$1,350", color: "#4ecdc4", likes: 189, views: 1205 },
    { id: "2", title: "Quantum Leap", price: "$875", color: "#45b7d1", likes: 156, views: 987 },
    { id: "3", title: "Digital Dreams", price: "$1,100", color: "#96ceb4", likes: 312, views: 1456 },
    { id: "4", title: "Neon Nights", price: "$925", color: "#ff6b6b", likes: 278, views: 1134 },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeInUp}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Wishlist
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            Your saved artworks ({wishlistItems.length})
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 2,
          }}
        >
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ArtworkCard
                id={item.id}
                title={item.title}
                price={item.price}
                color={item.color}
                likes={item.likes}
                views={item.views}
                isLiked={true}
              />
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Container>
  );
}
