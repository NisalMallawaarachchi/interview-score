import React from "react";

const ReportTemplate = ({ candidate, criteria, roles }) => {
  // This component can be used for HTML-based reports
  // For PDF generation, we'll enhance the existing jsPDF function
  
  const candidateCriteria = criteria[candidate.role];
  
  return (
    <div className="p-8 bg-white">
      <h1 className="text-3xl font-bold text-center mb-6">DETAILED INTERVIEW REPORT</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Candidate Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><strong>Name:</strong> {candidate.name}</div>
          <div><strong>Position:</strong> {roles[candidate.role]}</div>
          <div><strong>Interview Date:</strong> {candidate.timestamp}</div>
          <div><strong>Overall Score:</strong> {candidate.total.toFixed(1)} / 100</div>
          <div><strong>Grade:</strong> {candidate.grade}</div>
          <div><strong>Decision:</strong> {candidate.decision}</div>
        </div>
      </div>

      {candidate.notes && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Special Notes</h2>
          <p className="text-gray-700">{candidate.notes}</p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Detailed Breakdown</h2>
        {candidateCriteria.map((cat) => {
          const categoryTotal = cat.items.reduce((sum, item) => {
            const key = `${cat.category}-${item.name}`;
            return sum + (candidate.scores[key] || 0);
          }, 0);
          const categoryMax = cat.items.reduce((sum, item) => sum + item.max, 0);
          const percentage = ((categoryTotal / categoryMax) * 100).toFixed(1);

          return (
            <div key={cat.category} className="mb-4 p-4 border rounded">
              <h3 className="font-semibold text-lg">{cat.category}</h3>
              <p className="text-sm text-gray-600">
                Weight: {cat.weight}% | Score: {categoryTotal.toFixed(1)}/{categoryMax} ({percentage}%)
              </p>
              <div className="mt-2">
                {cat.items.map((item) => {
                  const key = `${cat.category}-${item.name}`;
                  const score = candidate.scores[key] || 0;
                  const itemPercentage = ((score / item.max) * 100).toFixed(0);
                  return (
                    <div key={item.name} className="flex justify-between text-sm">
                      <span>• {item.name}</span>
                      <span>{score.toFixed(1)}/{item.max} ({itemPercentage}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p><strong>Total Score:</strong> {candidate.total.toFixed(1)} / 100</p>
        <p><strong>Final Grade:</strong> {candidate.grade}</p>
        <p><strong>Recommendation:</strong> {candidate.decision}</p>
      </div>
    </div>
  );
};

export default ReportTemplate;