import { redirect } from "next/navigation";

/** Trending uses the explore feed with trending sort — reuse explore route. */
export default function TrendingPage() {
  redirect("/explore");
}
