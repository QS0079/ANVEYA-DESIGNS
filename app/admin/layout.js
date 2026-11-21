import "../admin.css";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = { title: "Admin | Anveya Designs", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }) {
  const jar = await cookies();
  const session = await verifySession(jar.get(SESSION_COOKIE)?.value);
  return <AdminShell user={session ? { email: session.email, name: session.name } : null}>{children}</AdminShell>;
}
