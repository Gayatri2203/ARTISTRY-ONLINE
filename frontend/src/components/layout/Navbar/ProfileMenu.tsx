"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useAuthStore } from "@/src/store/authStore";
import { ROUTES } from "@/src/lib/constants";

export function ProfileMenu() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  const navigate = (path: string) => {
    handleClose();
    router.push(path);
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
    router.push(ROUTES.home);
  };

  const username = user?.username ?? "user";
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0.5 }}>
        <Avatar
          src={user?.avatarUrl}
          alt={username}
          sx={{
            width: 40,
            height: 40,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            fontWeight: 700,
          }}
        >
          {initials}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 200,
              mt: 1,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            },
          },
        }}
      >
        <MenuItem onClick={() => navigate(ROUTES.profile(username))}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          My Profile
        </MenuItem>
        <MenuItem onClick={() => navigate(ROUTES.dashboard)}>
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <MenuItem onClick={() => navigate(ROUTES.upload)}>
          <ListItemIcon>
            <CloudUploadIcon fontSize="small" />
          </ListItemIcon>
          Upload Artwork
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
