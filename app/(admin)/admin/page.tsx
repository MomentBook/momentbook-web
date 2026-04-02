import { redirect } from "next/navigation";
import { ADMIN_LOGIN_PATH, ADMIN_REVIEWS_PATH } from "@/lib/admin/paths";
import { getAdminSession } from "@/lib/admin/session";

export default async function AdminIndexPage() {
  const session = await getAdminSession();

  redirect(session ? ADMIN_REVIEWS_PATH : ADMIN_LOGIN_PATH);
}
