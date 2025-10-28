import React from "react";

const ScoreInput = ({ 
  item, 
  category, 
  value, 
  onChange, 
  maxScore 
}) => {
  return (
    <div className="flex items-center justify-between gap-4 bg-white p-3 rounded">
      <label className="text-sm text-gray-700 flex-1">
        {item.name}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          max={maxScore}
          step="0.5"
          value={value || ""}
          onChange={(e) => onChange(category, item.name, e.target.value)}
          className="w-20 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500"
          placeholder="0"
        />
        <span className="text-sm text-gray-500 w-12">
          / {item.max}
        </span>
      </div>
    </div>
  );
};

export default ScoreInput;