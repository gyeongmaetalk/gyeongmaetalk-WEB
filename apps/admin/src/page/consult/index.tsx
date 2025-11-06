import AdminTabs from "@/components/consult/admin-tabs";

export default function ConsultPage() {
  return (
    <main>
      <h1 className="text-2xl font-semibold tracking-tight">상담 관리</h1>
      <div>
        <AdminTabs />
      </div>
    </main>
  );
}
