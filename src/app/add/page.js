'use client'

import React from "react";
import DealForm from "@/components/DealForm";
import { useRouter } from "next/navigation";

export default function AddDeal() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    await fetch("/api/deals", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    router.push("/");
  };

  return (
    <div className="container w-[75%] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Deal</h1>
      <DealForm onSubmit={handleSubmit} />
    </div>
  );
}
