'use client'

import React, { useEffect, useState } from "react";
import DealsTable from "@/components/DealsTable";
import { useRouter } from "next/navigation";

export default function Home() {
  const [deals, setDeals] = useState([]);
  const router = useRouter();

  const fetchDeals = async () => {
    try {
      const res = await fetch("/api/deals");
      if (!res.ok) {
        throw new Error(`Failed to fetch deals: ${res.statusText}`);
      }
      const data = await res.json();
      setDeals(data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };
  

  const handleDelete = async (id) => {
    await fetch("/api/deals", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchDeals();
  };

  const handleEdit = (deal) => {
    router.push(`/deals/edit/${deal._id}`);
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Deals Management</h1>
      <button
        onClick={() => router.push("/add")}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Deal
      </button>
      {deals.length > 0 ? (
        <DealsTable deals={deals} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <p>No deals found. Add a new deal!</p>
      )}
    </div>
  );
}
