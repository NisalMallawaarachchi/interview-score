import { useState } from "react";
import CandidateForm from "./components/CandidateForm/CandidateForm";
import CandidateList from "./components/CandidateList/CandidateList";
import { criteria, roles } from "./constants/criteria";
import { calculateGrandTotal, getGrade, getMaxScore } from "./utils/calculations";
import { generateDetailedReport } from "./components/ReportGenerator/ReportGenerator";

const App = () => {
  const [selectedRole, setSelectedRole] = useState("backend");
  const [candidateName, setCandidateName] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [scores, setScores] = useState({});
  const [notes, setNotes] = useState("");

  const handleScoreChange = (category, item, value) => {
    const key = `${category}-${item}`;
    setScores((prev) => ({
      ...prev,
      [key]: Math.min(
        Math.max(0, parseFloat(value) || 0),
        getMaxScore(category, item, selectedRole, criteria)
      ),
    }));
  };

  const saveCandidate = () => {
    if (!candidateName.trim()) {
      alert("Please enter candidate name");
      return;
    }

    const total = calculateGrandTotal(selectedRole, scores, criteria);
    const result = getGrade(total);

    const newCandidate = {
      name: candidateName,
      role: roles[selectedRole],
      roleKey: selectedRole,
      scores: { ...scores },
      total,
      grade: result.grade,
      decision: result.decision,
      notes: notes,
      timestamp: new Date().toLocaleString(),
    };

    setCandidates((prev) => [...prev, newCandidate]);
    setCandidateName("");
    setScores({});
    setNotes("");
    alert("Candidate saved successfully!");
  };

  const removeCandidate = (index) => {
    setCandidates((prev) => prev.filter((_, i) => i !== index));
  };

  const exportResults = () => {
    const csv = [
      ["Candidate Name", "Role", "Total Score", "Grade", "Decision", "Notes", "Date"],
      ...candidates.map((c) => [
        c.name,
        c.role,
        c.total.toFixed(1),
        c.grade,
        c.decision,
        c.notes || "",
        c.timestamp,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mern_interview_results.csv";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const total = calculateGrandTotal(selectedRole, scores, criteria);
  const result = getGrade(total);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-6">
      <div className="max-w-6xl mx-auto">
        <CandidateForm
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
          candidateName={candidateName}
          onCandidateNameChange={(e) => setCandidateName(e.target.value)} // Fixed this line
          scores={scores}
          onScoreChange={handleScoreChange}
          notes={notes}
          onNotesChange={(e) => setNotes(e.target.value)} // Fixed this line
          totalScore={total}
          gradeResult={result}
          onSaveCandidate={saveCandidate}
        />

        <CandidateList
          candidates={candidates}
          onRemoveCandidate={removeCandidate}
          onExportResults={exportResults}
          onGenerateReport={generateDetailedReport}
        />
      </div>
    </div>
  );
};

export default App;