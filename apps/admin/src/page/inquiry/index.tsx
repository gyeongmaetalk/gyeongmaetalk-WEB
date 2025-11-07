"use client";

import { useState } from "react";

import FaqTable from "@/components/inquiry/faq-table";
import InquiryTable from "@/components/inquiry/inquiry-table";
import { cn } from "@gyeongmaetalk/utils";

type TabType = "inquiry" | "faq";

export default function InquiryPage() {
  const [activeTab, setActiveTab] = useState<TabType>("inquiry");

  return (
    <main className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">문의 대시보드</h1>
      </div>

      <div className="border-cool-neutral-95 flex gap-2 border-b">
        <button
          type="button"
          onClick={() => setActiveTab("inquiry")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            activeTab === "inquiry"
              ? "border-primary text-primary border-b-2"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label="유저 문의 탭"
          aria-selected={activeTab === "inquiry"}
        >
          유저 문의
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("faq")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            activeTab === "faq"
              ? "border-primary text-primary border-b-2"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label="자주 묻는 질문 탭"
          aria-selected={activeTab === "faq"}
        >
          자주 묻는 질문
        </button>
      </div>

      <div className="text-nowrap">
        {activeTab === "inquiry" && <InquiryTable />}
        {activeTab === "faq" && <FaqTable />}
      </div>
    </main>
  );
}
