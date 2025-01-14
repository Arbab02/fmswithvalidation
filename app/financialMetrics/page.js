'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FormComponent({ initialForm = null, editId = null }) {
  const router = useRouter();
  const [form, setForm] = useState(
    initialForm || {
      revenue: '',
      expenses: '',
      profit: '',
      loss: '',
      cogs: '',
      grossMargin: '',
      netIncome: '',
      clv: '',
      cac: '',
      roi: '',
      churnRate: '',
      month: '',
      year: '',
    }
  );

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(editId ? `/api/metrics/${editId}` : '/api/metrics', {
        method: editId ? 'PUT' : 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        router.push('/metrics'); // Redirect to metrics list
      } else {
        console.error('Error creating or updating financial metric');
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  return (
    <main className="bg-gray-200 px-8 pt-28">
      <h1 className="text-3xl text-indigo-600 font-bold text-center mb-6">
        {editId ? 'Edit Financial Metric' : 'Add Financial Metric'}
      </h1>
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(form).map((key) => (
          key !== 'month' ? (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </label>
              <input
                id={key}
                type={key === 'year' ? 'number' : 'text'}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                required
                className="border rounded-2xl p-3 w-full"
                placeholder={`Enter ${key}`}
              />
            </div>
          ) : (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <select
                id={key}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                required
                className="border rounded-md p-2 w-full"
              >
                <option value="">Select Month</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </select>
            </div>
          )
        ))}
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700"
        >
          {editId ? 'Update Financial Metric' : 'Add Financial Metric'}
        </button>
      </form>
    </main>
  );
}
