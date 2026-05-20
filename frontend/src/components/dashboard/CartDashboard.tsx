"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { CartItem } from "./CartItem";
import { OrderSummary } from "./OrderSummary";
import { EmptyCartState } from "./EmptyCartState";

import { fadeInUp, staggerContainer } from "@/src/lib/motion";

interface CartItemData {
  id: string;
  title: string;
  artist: string;
  category: string;
  price: string;
  color: string;
  quantity: number;
}

export function CartDashboard() {
  const [cartItems, setCartItems] = useState<CartItemData[]>([
    {
      id: "1",
      title: "Ethereal Dreams",
      artist: "John Doe",
      category: "Digital Art",
      price: "$1,250",
      color: "#667eea",
      quantity: 1,
    },
    {
      id: "2",
      title: "Cosmic Journey",
      artist: "Jane Smith",
      category: "Abstract",
      price: "$950",
      color: "#764ba2",
      quantity: 2,
    },
    {
      id: "3",
      title: "Neon Sunset",
      artist: "Alex Artist",
      category: "Surrealism",
      price: "$1,100",
      color: "#f093fb",
      quantity: 1,
    },
  ]);

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleSaveItem = (id: string) => {
    console.log("Saved item:", id);
  };

  const handleApplyPromo = (code: string) => {
    console.log("Applied promo code:", code);
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout");
  };

  const handleBrowseArtworks = () => {
    console.log("Browsing artworks");
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + parseInt(item.price.replace(/[$,]/g, "")) * item.quantity,
      0
    );
    const platformFee = Math.round(subtotal * 0.05);
    const taxes = Math.round(subtotal * 0.08);
    const total = subtotal + platformFee + taxes;

    return {
      subtotal: `$${subtotal.toLocaleString()}`,
      platformFee: `$${platformFee.toLocaleString()}`,
      taxes: `$${taxes.toLocaleString()}`,
      total: `$${total.toLocaleString()}`,
    };
  };

  const totals = calculateTotals();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
            My Cart
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </Typography>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div variants={fadeInUp}>
            <EmptyCartState onBrowseArtworks={handleBrowseArtworks} />
          </motion.div>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: 3,
            }}
          >
            <Box sx={{ flex: { xs: 1, lg: 2 } }}>
              <AnimatePresence mode="popLayout">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    layout
                  >
                    <CartItem
                      id={item.id}
                      title={item.title}
                      artist={item.artist}
                      category={item.category}
                      price={item.price}
                      color={item.color}
                      quantity={item.quantity}
                      onRemove={() => handleRemoveItem(item.id)}
                      onSave={() => handleSaveItem(item.id)}
                      onUpdateQuantity={(qty) => handleUpdateQuantity(item.id, qty)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </Box>

            <Box sx={{ flex: { xs: 1, lg: 1 } }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <OrderSummary
                  subtotal={totals.subtotal}
                  platformFee={totals.platformFee}
                  taxes={totals.taxes}
                  total={totals.total}
                  onCheckout={handleCheckout}
                  onApplyPromo={handleApplyPromo}
                />
              </motion.div>
            </Box>
          </Box>
        )}
      </motion.div>
    </Container>
  );
}
