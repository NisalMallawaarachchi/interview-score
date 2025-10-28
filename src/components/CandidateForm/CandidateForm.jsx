import React from "react";
import { Save } from "lucide-react";
import RoleSelector from "../common/RoleSelector";
import ScoreCard from "../ScoreCard/ScoreCard";
import ResultsSummary from "./ResultsSummary";

const CandidateForm = ({
  selectedRole,
  onRoleChange,
  candidateName,
  onCandidateNameChange, // This should receive the event
  scores,
  onScoreChange,
  notes,
  onNotesChange, // This should receive the event
  totalScore,
  gradeResult,
  onSaveCandidate
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          MERN Stack Interview Marking Guide
        </h1>
        <p className="text-gray-600 mb-2">
          MongoDB • Express.js • React • Node.js
        </p>
        <p className="text-sm text-gray-500">
          Standardized evaluation system for MERN stack developers
        </p>
      </div>

      <RoleSelector selectedRole={selectedRole} onRoleChange={onRoleChange} />

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Candidate Name:
        </label>
        <input
          type="text"
          value={candidateName}
          onChange={onCandidateNameChange} // Make sure this is the event handler
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="Enter candidate name"
        />
      </div>

      <ScoreCard
        selectedRole={selectedRole}
        scores={scores}
        onScoreChange={onScoreChange}
        notes={notes}
        onNotesChange={onNotesChange} // Make sure this is the event handler
      />

      <ResultsSummary totalScore={totalScore} gradeResult={gradeResult} />

      <div className="mt-6 flex gap-3">
        <button
          onClick={onSaveCandidate}
          className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
        >
          <Save size={20} />
          Save Candidate
        </button>
      </div>
    </div>
  );
};

export default CandidateForm;