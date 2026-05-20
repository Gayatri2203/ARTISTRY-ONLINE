"use client";

import { ProtectedRoute } from "@/src/components/auth/ProtectedRoute";
import { AppShell } from "@/src/components/layout/AppShell";
import DashboardCartSection from "@/src/sections/DashboardCartSection";

export default function CartPage() {
  return (
    <ProtectedRoute>
      <AppShell>
        <DashboardCartSection />
      </AppShell>
    </ProtectedRoute>
  );
}
