import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-(--color-bg-primary) flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-5 sm:p-8 lg:p-10">{children}</main>
    </div>
  );
}
