'use client';

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function DealsTable({ deals, onEdit, onDelete }) {
  if (deals.length === 0) {
    return <p className="text-center p-4 text-lg text-gray-600">No deals available.</p>;
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {deals.map((deal) => (
        <div
          key={deal._id}
          className="flex flex-col bg-white border border-gray-300 rounded-lg p-6 shadow-md w-full sm:w-80 md:w-96"
        >
          {/* Deal Details */}
          <div className="space-y-2 mb-4">
            {Object.entries(deal).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-semibold text-gray-600">{key}:</span>
                <span className="text-gray-800">{value}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => onEdit(deal)}
              className="text-blue-500 flex items-center space-x-1 hover:text-blue-700"
              aria-label={`Edit deal ${deal._id}`}
            >
              <FaEdit className="text-lg" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => onDelete(deal._id)}
              className="text-red-500 flex items-center space-x-1 hover:text-red-700"
              aria-label={`Delete deal ${deal._id}`}
            >
              <FaTrash className="text-lg" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
