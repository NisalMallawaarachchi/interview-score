import React from "react";

const ResultsSummary = ({ totalScore, gradeResult }) => {
  return (
    <div className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 border-2 border-emerald-200">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">
            Total Score: {totalScore.toFixed(1)} / 100
          </h3>
          <p className="text-gray-600 mt-1">
            Grade:{" "}
            <span className={`font-bold ${gradeResult.color}`}>
              {gradeResult.grade}
            </span>
          </p>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${gradeResult.color}`}>
            {gradeResult.decision}
          </div>
          <p className="text-sm text-gray-500 mt-1">Recommendation</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;