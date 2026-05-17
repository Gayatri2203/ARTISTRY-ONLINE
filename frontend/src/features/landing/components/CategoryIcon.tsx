import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";

import type { ReactElement } from "react";

import type { CategoryIconName } from "../types";

const iconProps = { fontSize: "small" as const };

const CATEGORY_ICONS: Record<CategoryIconName, ReactElement> = {
  brush: <BrushOutlinedIcon {...iconProps} />,
  digital: <AutoAwesomeOutlinedIcon {...iconProps} />,
  photo: <CameraAltOutlinedIcon {...iconProps} />,
  sculpture: <ViewInArOutlinedIcon {...iconProps} />,
};

export type CategoryIconProps = {
  name: CategoryIconName;
};

export default function CategoryIcon({ name }: CategoryIconProps) {
  return CATEGORY_ICONS[name] ?? CATEGORY_ICONS.brush;
}
