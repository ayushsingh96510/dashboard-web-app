import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ProductTrendsChart = ({ products }) => {
  const data = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }

    // Group products by month
    const monthMap = {};
    products.forEach(product => {
      const date = new Date(product.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      
      if (monthMap[monthKey]) {
        monthMap[monthKey].count += 1;
        monthMap[monthKey].totalValue += product.price;
      } else {
        monthMap[monthKey] = {
          month: monthLabel,
          count: 1,
          totalValue: product.price,
        };
      }
    });

    // Convert to array and sort by month
    return Object.entries(monthMap)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([_, data]) => data);
  }, [products]);

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">No trend data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Product Trends
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis yAxisId="left" stroke="#9CA3AF" />
            <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.9)',
                border: 'none',
                borderRadius: '8px',
                color: '#F3F4F6',
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="count"
              stroke="#2563EB"
              name="Products Added"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="totalValue"
              stroke="#10B981"
              name="Total Value (₹)"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductTrendsChart;