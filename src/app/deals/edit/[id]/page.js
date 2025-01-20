'use client'

import React, { useEffect, useState } from "react";
import DealForm from "@/components/DealForm";
import { useRouter } from "next/navigation";

export default function EditDeal({ params }) {
  const { id } = params;
  const router = useRouter();
  const [deal, setDeal] = useState(null);

  useEffect(() => {
    const fetchDeal = async () => {
      const res = await fetch(`/api/deals?id=${id}`);
      const data = await res.json();
      setDeal(data);
    };
    fetchDeal();
  }, [id]);

  const handleSubmit = async (formData) => {
    await fetch("/api/deals", {
      method: "PUT",
      body: JSON.stringify({ id, ...formData }),
    });
    router.push("/");
  };

  if (!deal) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Deal</h1>
      <DealForm initialData={deal} onSubmit={handleSubmit} />
    </div>
  );
}
