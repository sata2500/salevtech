import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import styles from "./layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className={styles.layout}>
      <AdminSidebar userName={session.user?.name || "Yönetici"} />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
