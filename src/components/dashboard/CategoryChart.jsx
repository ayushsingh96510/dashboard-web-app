import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#2563EB', '#7C3AED', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6'];

const CategoryChart = ({ products }) => {
  const { barData, pieData } = useMemo(() => {
    if (!products || products.length === 0) {
      return { barData: [], pieData: [] };
    }

    // Group products by category
    const categoryMap = {};
    products.forEach(product => {
      if (categoryMap[product.category]) {
        categoryMap[product.category].count += 1;
        categoryMap[product.category].stock += product.stock;
      } else {
        categoryMap[product.category] = {
          count: 1,
          stock: product.stock,
        };
      }
    });

    // Prepare bar chart data
    const barData = Object.entries(categoryMap).map(([category, data]) => ({
      category,
      stock: data.stock,
      count: data.count,
    }));

    // Prepare pie chart data
    const pieData = Object.entries(categoryMap).map(([category, data]) => ({
      name: category,
      value: data.count,
    }));

    return { barData, pieData };
  }, [products]);

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">No data available for charts</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart - Stock by Category */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Stock by Category
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="category"
                stroke="#9CA3AF"
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
              />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(31, 41, 55, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F3F4F6',
                }}
              />
              <Legend />
              <Bar dataKey="stock" fill="#2563EB" name="Total Stock" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart - Product Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Product Distribution by Category
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(31, 41, 55, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F3F4F6',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;
