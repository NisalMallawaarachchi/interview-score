import React from "react";
import CategorySection from "./CategorySection";
import { criteria } from "../../constants/criteria";

const ScoreCard = ({
  selectedRole,
  scores,
  onScoreChange,
  notes,
  onNotesChange, // This should receive the event
}) => {
  const roleCriteria = criteria[selectedRole] || criteria.backend || [];

  return (
    <div className="space-y-6">
      {roleCriteria.map((category) => (
        <CategorySection
          key={category.category}
          category={category}
          scores={scores}
          onScoreChange={onScoreChange}
        />
      ))}

      <div className="mt-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Special Notes / Additional Information:
        </label>
        <textarea
          value={notes}
          onChange={onNotesChange} // Make sure this is the event handler
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="Add any special observations, strengths, weaknesses, or recommendations..."
          rows="4"
        />
      </div>
    </div>
  );
};

export default ScoreCard;
