import React from "react";
import { FileText, X } from "lucide-react";
import { getGrade } from "../../utils/calculations";

const CandidateRow = ({ candidate, index, onRemove, onGenerateReport }) => {
  const gradeInfo = getGrade(candidate.total);

  const handleGenerateReport = () => {
    console.log("Generating report for:", candidate); // Debug log
    try {
      onGenerateReport(candidate);
      console.log("Report generation function called"); // Debug log
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Error generating report. Check console for details.");
    }
  };

  return (
    <tr key={index} className="hover:bg-emerald-50">
      <td className="px-4 py-3 text-sm font-medium text-gray-900">
        {candidate.name}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {candidate.role}
      </td>
      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
        {candidate.total.toFixed(1)}
      </td>
      <td className="px-4 py-3">
        <span className={`font-bold ${gradeInfo.color}`}>
          {candidate.grade}
        </span>
      </td>
      <td className="px-4 py-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            candidate.decision === "Strong Hire"
              ? "bg-green-100 text-green-700"
              : candidate.decision === "Hire"
              ? "bg-blue-100 text-blue-700"
              : candidate.decision === "Maybe"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {candidate.decision}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {candidate.timestamp}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleGenerateReport}
            className="text-emerald-600 hover:text-emerald-800 transition-colors"
            title="Generate Report"
          >
            <FileText size={18} />
          </button>
          <button
            onClick={() => onRemove(index)}
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Remove"
          >
            <X size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CandidateRow;