"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

import { ProtectedRoute } from "@/src/components/auth/ProtectedRoute";
import { AppShell } from "@/src/components/layout/AppShell";
import { GlassCard } from "@/src/components/ui/GlassCard";

import { useAuth } from "@/src/context/AuthContext";
import { uploadImageToCloudinary } from "@/src/features/upload/uploadImageToCloudinary";
import { db } from "@/src/lib/firebase";

type UserProfileDoc = {
  uid: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  email: string;
  socialLinks: {
    website?: string;
    instagram?: string;
    twitter?: string;
  };
  updatedAt: unknown;
};

function EditProfileContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      if (!user) {
        if (!cancelled) setInitializing(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(userRef);

        if (cancelled) return;

        if (snapshot.exists()) {
          const data = snapshot.data() as Partial<UserProfileDoc>;
          setDisplayName(data.displayName ?? user.displayName ?? "");
          setBio(data.bio ?? "");
          setAvatarUrl(data.avatarUrl ?? user.photoURL ?? "");
          setWebsite(data.socialLinks?.website ?? "");
          setInstagram(data.socialLinks?.instagram ?? "");
          setTwitter(data.socialLinks?.twitter ?? "");
        } else {
          setDisplayName(user.displayName ?? "");
          setAvatarUrl(user.photoURL ?? "");
        }
      } catch {
        if (!cancelled) {
          toast.error("Could not load profile");
        }
      } finally {
        if (!cancelled) setInitializing(false);
      }
    }

    void loadProfile();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const avatarPreview =
    avatarFile != null ? URL.createObjectURL(avatarFile) : avatarUrl;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const trimmedName = displayName.trim();
    if (!trimmedName) {
      setFormError("Display name is required.");
      return;
    }

    setLoading(true);
    setFormError(null);

    try {
      let nextAvatarUrl = avatarUrl;
      if (avatarFile) {
        setUploadingAvatar(true);
        nextAvatarUrl = await uploadImageToCloudinary(avatarFile);
        setUploadingAvatar(false);
      }

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          displayName: trimmedName,
          bio: bio.trim(),
          avatarUrl: nextAvatarUrl,
          email: user.email ?? "",
          socialLinks: {
            website: website.trim() || undefined,
            instagram: instagram.trim() || undefined,
            twitter: twitter.trim() || undefined,
          },
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      await updateProfile(user, {
        displayName: trimmedName,
        photoURL: nextAvatarUrl || null,
      });

      toast.success("Profile updated");
      router.push(`/profile/${user.uid}`);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Update failed");
      toast.error("Update failed");
    } finally {
      setUploadingAvatar(false);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Edit Profile
      </Typography>
      <GlassCard sx={{ p: 3 }}>
        {initializing ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={30} />
          </Box>
        ) : (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={avatarPreview || undefined}
              sx={{
                width: 72,
                height: 72,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              {!avatarPreview ? (displayName.charAt(0) || "U").toUpperCase() : null}
            </Avatar>
            <Button variant="glass" component="label" disabled={uploadingAvatar || loading}>
              {uploadingAvatar ? "Uploading..." : "Upload Avatar"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setAvatarFile(file);
                }}
              />
            </Button>
          </Box>
          <TextField
            label="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            fullWidth
          />
          <TextField label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} multiline rows={4} fullWidth />
          <TextField label="Website" value={website} onChange={(e) => setWebsite(e.target.value)} fullWidth />
          <TextField
            label="Instagram (optional)"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            fullWidth
          />
          <TextField
            label="Twitter/X (optional)"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            fullWidth
          />
          {formError && (
            <Typography color="error.main" variant="body2">
              {formError}
            </Typography>
          )}
          <Button type="submit" variant="gradient" disabled={loading}>
            {loading ? "Saving…" : "Save Changes"}
          </Button>
          <Button variant="glass" onClick={() => router.back()}>
            Cancel
          </Button>
        </Box>
        )}
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
