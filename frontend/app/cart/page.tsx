"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

import { CartItem } from "@/src/components/ecommerce/CartItem";
import { PricingSection } from "@/src/components/ecommerce/PricingSection";

import { fadeInUp, staggerContainer } from "@/src/lib/motion";

export default function CartPage() {
  const cartItems = [
    { id: "1", title: "Ethereal Dreams", price: "$1,250", color: "#667eea", quantity: 1 },
    { id: "2", title: "Cosmic Journey", price: "$950", color: "#764ba2", quantity: 1 },
    { id: "3", title: "Neon Sunset", price: "$1,100", color: "#f093fb", quantity: 2 },
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
            Shopping Cart
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            Review your selected artworks
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 3,
          }}
        >
          <Box sx={{ flex: { xs: 1, lg: 2 } }}>
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <CartItem
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  color={item.color}
                  quantity={item.quantity}
                />
              </motion.div>
            ))}
          </Box>

          <Box sx={{ flex: { xs: 1, lg: 1 } }}>
            <motion.div variants={fadeInUp}>
              <PricingSection
                subtotal="$4,450"
                shipping="$0"
                tax="$356"
                total="$4,806"
              />
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
}
