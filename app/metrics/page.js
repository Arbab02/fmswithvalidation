'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ListComponent() {
  const [metrics, setMetrics] = useState([]);
  const [filteredMetrics, setFilteredMetrics] = useState([]);
  const [searchMonth, setSearchMonth] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/metrics');
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
        setFilteredMetrics(data);
      } else {
        console.error('Failed to fetch metrics');
      }
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  useEffect(() => {
    if (searchMonth) {
      setFilteredMetrics(
        metrics.filter((metric) => metric.month.toLowerCase() === searchMonth.toLowerCase())
      );
    } else {
      setFilteredMetrics(metrics);
    }
  }, [searchMonth, metrics]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/metrics/${id}`, { method: 'DELETE' });
      if (res.ok) fetchMetrics();
      else console.error('Error deleting metric');
    } catch (error) {
      console.error('Failed to delete metric:', error);
    }
  };

  const handleEdit = (id) => {
    router.push(`/form?editId=${id}`);
  };

  return (
    <main className="bg-gray-100 px-8 pt-20 w-[82%] ml-[18%] inline-block">
      <h1 className="text-3xl text-indigo-600 font-bold text-center mb-6">
        Financial Metrics
      </h1>
      <div className="mb-4">
        <label htmlFor="searchMonth" className="block text-sm font-medium text-gray-700 mb-1">
          Search by Month
        </label>
        <select
          id="searchMonth"
          value={searchMonth}
          onChange={(e) => setSearchMonth(e.target.value)}
          className="border rounded-2xl p-2 w-full"
        >
          <option value="">All Months</option>
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Loading metrics...</p>
      ) : filteredMetrics.length === 0 ? (
        <p className="text-center text-gray-600">No metrics available.</p>
      ) : (
        <ul className="space-y-4">
          {filteredMetrics.map((metric) => (
            <li key={metric._id} className="p-4 border rounded shadow-sm bg-gray-50">
              <h2 className="text-lg font-bold mb-2">{metric.month} {metric.year}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <p><strong>Revenue:</strong> {metric.revenue}</p>
                <p><strong>Expenses:</strong> {metric.expenses}</p>
                <p><strong>Profit:</strong> {metric.profit}</p>
                <p><strong>Loss:</strong> {metric.loss}</p>
                <p><strong>COGS:</strong> {metric.cogs}</p>
                <p><strong>Gross Margin:</strong> {metric.grossMargin}</p>
                <p><strong>Net Income:</strong> {metric.netIncome}</p>
                <p><strong>CLV:</strong> {metric.clv}</p>
                <p><strong>CAC:</strong> {metric.cac}</p>
                <p><strong>ROI:</strong> {metric.roi}</p>
                <p><strong>Churn Rate:</strong> {metric.churnRate}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(metric._id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(metric._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
