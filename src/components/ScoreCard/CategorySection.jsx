import React from "react";
import ScoreInput from "../common/ScoreInput";
import { calculateCategoryTotal } from "../../utils/calculations";

const CategorySection = ({ 
  category, 
  scores, 
  onScoreChange 
}) => {
  // Add safety check for category.items
  if (!category || !category.items) {
    return null;
  }

  const categoryTotal = calculateCategoryTotal(category.category, scores, category);

  return (
    <div className="bg-linear-to-r from-gray-50 to-emerald-50 rounded-lg p-5 border border-emerald-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          {category.category}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            Weight: {category.weight}%
          </span>
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">
            {categoryTotal.toFixed(1)} / {category.items.reduce((s, i) => s + i.max, 0)}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {category.items.map((item) => (
          <ScoreInput
            key={item.name}
            item={item}
            category={category.category}
            value={scores[`${category.category}-${item.name}`]}
            onChange={onScoreChange}
            maxScore={item.max}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;