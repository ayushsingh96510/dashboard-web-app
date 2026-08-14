import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

const RatingChart = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">No rating data available</p>
      </div>
    );
  }

  // Calculate average rating per category
  const categoryRatings = {};
  products.forEach(product => {
    if (product.rating) {
      if (categoryRatings[product.category]) {
        categoryRatings[product.category].total += product.rating;
        categoryRatings[product.category].count += 1;
      } else {
        categoryRatings[product.category] = {
          total: product.rating,
          count: 1,
        };
      }
    }
  });

  const data = Object.entries(categoryRatings).map(([category, data]) => ({
    category,
    rating: Math.round((data.total / data.count) * 10) / 10,
    fullRating: data.total / data.count,
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Average Rating by Category
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="category" stroke="#9CA3AF" />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 5]}
              stroke="#9CA3AF"
              tickFormatter={(value) => value.toFixed(1)}
            />
            <Radar
              name="Average Rating"
              dataKey="rating"
              stroke="#7C3AED"
              fill="#7C3AED"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RatingChart;
