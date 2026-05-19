"use client";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import { motion } from "framer-motion";

import { GlassCard } from "@/src/components/ui/GlassCard";

interface TabNavigationProps {
  onTabChange?: (value: number) => void;
}

export function TabNavigation({ onTabChange }: TabNavigationProps) {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onTabChange?.(newValue);
  };

  const tabs = [
    { label: "Collection", icon: "🎨" },
    { label: "Saved", icon: "❤️" },
    { label: "Cart", icon: "🛒" },
    { label: "Orders", icon: "�" },
    { label: "Activity", icon: "📊" },
  ];

  return (
    <GlassCard sx={{ mb: 3 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          minHeight: 56,
          "& .MuiTabs-indicator": {
            background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
            height: 3,
            borderRadius: "3px 3px 0 0",
          },
          "& .MuiTab-root": {
            minHeight: 56,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
            color: "text.secondary",
            transition: "color 0.2s ease",
            "&:hover": {
              color: "text.primary",
            },
            "&.Mui-selected": {
              color: "text.primary",
            },
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab.label}
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </Box>
            }
          />
        ))}
      </Tabs>
    </GlassCard>
  );
}
