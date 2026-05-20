"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";

import { ProtectedRoute } from "@/src/components/auth/ProtectedRoute";
import { AppShell } from "@/src/components/layout/AppShell";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { usersApi } from "@/src/lib/api/users";
import { ROUTES } from "@/src/lib/constants";
import { useAuthStore } from "@/src/store/authStore";

function EditProfileContent() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setBio(user.bio ?? "");
      setWebsite(user.socialLinks?.website ?? "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await usersApi.updateProfile({
        username,
        bio,
        socialLinks: { website },
      });
      setUser(updated);
      toast.success("Profile updated");
      router.push(ROUTES.profile(updated.username));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Edit Profile
      </Typography>
      <GlassCard sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required fullWidth />
          <TextField label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} multiline rows={4} fullWidth />
          <TextField label="Website" value={website} onChange={(e) => setWebsite(e.target.value)} fullWidth />
          <Button type="submit" variant="gradient" disabled={loading}>
            {loading ? "Saving…" : "Save Changes"}
          </Button>
          <Button variant="glass" onClick={() => router.back()}>
            Cancel
          </Button>
        </Box>
      </GlassCard>
    </Container>
  );
}

export default function EditProfilePage() {
  return (
    <ProtectedRoute>
      <AppShell>
        <EditProfileContent />
      </AppShell>
    </ProtectedRoute>
  );
}
