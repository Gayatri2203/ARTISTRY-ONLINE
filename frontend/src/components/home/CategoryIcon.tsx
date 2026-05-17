import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";

import type { CategoryItem } from "./types";

export default function CategoryIcon({
  name,
}: {
  name: CategoryItem["iconName"];
}) {
  const props = { fontSize: "small" as const };

  switch (name) {
    case "brush":
      return <BrushOutlinedIcon {...props} />;
    case "digital":
      return <AutoAwesomeOutlinedIcon {...props} />;
    case "photo":
      return <CameraAltOutlinedIcon {...props} />;
    case "sculpture":
      return <ViewInArOutlinedIcon {...props} />;
    default:
      return <BrushOutlinedIcon {...props} />;
  }
}
