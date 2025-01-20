'use client'

import React, { useState } from "react";

export default function DealForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    businessType: "",
    amount: "",
    title: "",
    description: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    business: "",
    status: "Pending",
    startDate: "",
    endDate: "",
    month: "",
    year: "",
    ...initialData,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.keys(formData).map((field) => (
        <div key={field} className="flex flex-col">
          <label className="font-medium">{field}</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
}
