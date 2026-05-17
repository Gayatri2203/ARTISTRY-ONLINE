"use client";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function AuthDivider() {
  return (
    <Divider
      sx={{
        my: 2.5,
        "&::before, &::after": { borderColor: "rgba(255,255,255,0.08)" },
      }}
    >
      <Typography variant="caption" color="text.disabled" sx={{ px: 1.5 }}>
        or continue with
      </Typography>
    </Divider>
  );
}
