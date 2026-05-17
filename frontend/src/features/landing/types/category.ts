export type CategoryIconName = "brush" | "digital" | "photo" | "sculpture";

export type CategoryItem = {
  id: string;
  label: string;
  count: string;
  gradient: string;
  iconName: CategoryIconName;
};
