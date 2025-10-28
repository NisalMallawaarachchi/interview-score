import React from "react";
import { Download } from "lucide-react";
import CandidateRow from "./CandidateRow";

const CandidateList = ({ 
  candidates, 
  onRemoveCandidate, 
  onExportResults, 
  onGenerateReport 
}) => {
  if (candidates.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Evaluated Candidates ({candidates.length})
        </h2>
        <button
          onClick={onExportResults}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-emerald-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Score</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Grade</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Decision</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {candidates.map((candidate, index) => (
              <CandidateRow
                key={index}
                candidate={candidate}
                index={index}
                onRemove={onRemoveCandidate}
                onGenerateReport={onGenerateReport}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateList;