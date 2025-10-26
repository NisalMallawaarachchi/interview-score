import React, { useState } from 'react';
import { Download, Plus, X, Save } from 'lucide-react';

const App = () => {
  const [selectedRole, setSelectedRole] = useState('backend');
  const [candidateName, setCandidateName] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [scores, setScores] = useState({});

  const roles = {
    backend: 'Backend Developer',
    frontend: 'Frontend Developer',
    fullstack: 'SE Intern (Fullstack)'
  };

  const criteria = {
    backend: [
      { category: 'Technical Skills', weight: 35, items: [
        { name: 'Data Structures & Algorithms', max: 10 },
        { name: 'Database Knowledge (SQL/NoSQL)', max: 10 },
        { name: 'API Design & RESTful Services', max: 8 },
        { name: 'Server-side Language Proficiency', max: 7 }
      ]},
      { category: 'Problem Solving', weight: 25, items: [
        { name: 'Analytical Thinking', max: 13 },
        { name: 'Coding Challenge Performance', max: 12 }
      ]},
      { category: 'Theoretical Knowledge', weight: 15, items: [
        { name: 'System Design Basics', max: 8 },
        { name: 'Security Fundamentals', max: 7 }
      ]},
      { category: 'Communication & Soft Skills', weight: 15, items: [
        { name: 'Technical Communication', max: 8 },
        { name: 'Team Collaboration', max: 7 }
      ]},
      { category: 'Learning & Attitude', weight: 10, items: [
        { name: 'Willingness to Learn', max: 5 },
        { name: 'Initiative & Curiosity', max: 5 }
      ]}
    ],
    frontend: [
      { category: 'Technical Skills', weight: 35, items: [
        { name: 'HTML/CSS Proficiency', max: 9 },
        { name: 'JavaScript/Framework Knowledge', max: 12 },
        { name: 'Responsive Design Understanding', max: 7 },
        { name: 'UI/UX Awareness', max: 7 }
      ]},
      { category: 'Problem Solving', weight: 25, items: [
        { name: 'UI Problem Solving', max: 13 },
        { name: 'Coding Challenge Performance', max: 12 }
      ]},
      { category: 'Theoretical Knowledge', weight: 15, items: [
        { name: 'Web Performance Optimization', max: 8 },
        { name: 'Browser Compatibility & Accessibility', max: 7 }
      ]},
      { category: 'Communication & Soft Skills', weight: 15, items: [
        { name: 'Design Communication', max: 8 },
        { name: 'Team Collaboration', max: 7 }
      ]},
      { category: 'Learning & Attitude', weight: 10, items: [
        { name: 'Willingness to Learn', max: 5 },
        { name: 'Initiative & Curiosity', max: 5 }
      ]}
    ],
    fullstack: [
      { category: 'Technical Skills', weight: 40, items: [
        { name: 'Frontend Technologies', max: 10 },
        { name: 'Backend Technologies', max: 10 },
        { name: 'Database Knowledge', max: 8 },
        { name: 'API Integration', max: 7 },
        { name: 'Version Control (Git)', max: 5 }
      ]},
      { category: 'Problem Solving', weight: 25, items: [
        { name: 'End-to-End Thinking', max: 13 },
        { name: 'Coding Challenge Performance', max: 12 }
      ]},
      { category: 'Theoretical Knowledge', weight: 15, items: [
        { name: 'Full Stack Architecture', max: 8 },
        { name: 'DevOps Basics', max: 7 }
      ]},
      { category: 'Communication & Soft Skills', weight: 12, items: [
        { name: 'Cross-functional Communication', max: 7 },
        { name: 'Team Collaboration', max: 5 }
      ]},
      { category: 'Learning & Attitude', weight: 8, items: [
        { name: 'Adaptability', max: 4 },
        { name: 'Initiative & Curiosity', max: 4 }
      ]}
    ]
  };

  const handleScoreChange = (category, item, value) => {
    const key = `${category}-${item}`;
    setScores(prev => ({
      ...prev,
      [key]: Math.min(Math.max(0, parseFloat(value) || 0), getMaxScore(category, item))
    }));
  };

  const getMaxScore = (category, item) => {
    const cat = criteria[selectedRole].find(c => c.category === category);
    const itm = cat?.items.find(i => i.name === item);
    return itm?.max || 0;
  };

  const calculateCategoryTotal = (category) => {
    const cat = criteria[selectedRole].find(c => c.category === category);
    return cat.items.reduce((sum, item) => {
      const key = `${category}-${item.name}`;
      return sum + (scores[key] || 0);
    }, 0);
  };

  const calculateGrandTotal = () => {
    return criteria[selectedRole].reduce((sum, cat) => sum + calculateCategoryTotal(cat.category), 0);
  };

  const getGrade = (total) => {
    if (total >= 85) return { grade: 'A', color: 'text-green-600', decision: 'Strong Hire' };
    if (total >= 70) return { grade: 'B', color: 'text-blue-600', decision: 'Hire' };
    if (total >= 55) return { grade: 'C', color: 'text-yellow-600', decision: 'Maybe' };
    return { grade: 'D', color: 'text-red-600', decision: 'No Hire' };
  };

  const saveCandidate = () => {
    if (!candidateName.trim()) {
      alert('Please enter candidate name');
      return;
    }

    const total = calculateGrandTotal();
    const result = getGrade(total);
    
    setCandidates(prev => [...prev, {
      name: candidateName,
      role: selectedRole,
      scores: {...scores},
      total,
      grade: result.grade,
      decision: result.decision,
      timestamp: new Date().toLocaleString()
    }]);

    setCandidateName('');
    setScores({});
    alert('Candidate saved successfully!');
  };

  const removeCandidate = (index) => {
    setCandidates(prev => prev.filter((_, i) => i !== index));
  };

  const exportResults = () => {
    const csv = [
      ['Candidate Name', 'Role', 'Total Score', 'Grade', 'Decision', 'Date'],
      ...candidates.map(c => [c.name, roles[c.role], c.total.toFixed(1), c.grade, c.decision, c.timestamp])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interview_results.csv';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const total = calculateGrandTotal();
  const result = getGrade(total);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Technical Intern Interview Marking Guide</h1>
          <p className="text-gray-600 mb-6">Standardized evaluation system for consistent candidate assessment</p>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Select Role:</label>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(roles).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => { setSelectedRole(key); setScores({}); }}
                  className={`p-4 rounded-lg font-medium transition-all ${
                    selectedRole === key
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Candidate Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Candidate Name:</label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter candidate name"
            />
          </div>

          {/* Scoring Sections */}
          <div className="space-y-6">
            {criteria[selectedRole].map((cat) => (
              <div key={cat.category} className="bg-gray-50 rounded-lg p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">{cat.category}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Weight: {cat.weight}%</span>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold">
                      {calculateCategoryTotal(cat.category).toFixed(1)} / {cat.items.reduce((s, i) => s + i.max, 0)}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex items-center justify-between gap-4">
                      <label className="text-sm text-gray-700 flex-1">{item.name}</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max={item.max}
                          step="0.5"
                          value={scores[`${cat.category}-${item.name}`] || ''}
                          onChange={(e) => handleScoreChange(cat.category, item.name, e.target.value)}
                          className="w-20 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                          placeholder="0"
                        />
                        <span className="text-sm text-gray-500 w-12">/ {item.max}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Results */}
          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border-2 border-indigo-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Total Score: {total.toFixed(1)} / 100</h3>
                <p className="text-gray-600 mt-1">Grade: <span className={`font-bold ${result.color}`}>{result.grade}</span></p>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${result.color}`}>{result.decision}</div>
                <p className="text-sm text-gray-500 mt-1">Recommendation</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={saveCandidate}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Save Candidate
            </button>
          </div>
        </div>

        {/* Saved Candidates */}
        {candidates.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Evaluated Candidates ({candidates.length})</h2>
              <button
                onClick={exportResults}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Download size={18} />
                Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Score</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Grade</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Decision</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {candidates.map((candidate, index) => {
                    const gradeInfo = getGrade(candidate.total);
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{candidate.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{roles[candidate.role]}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">{candidate.total.toFixed(1)}</td>
                        <td className="px-4 py-3">
                          <span className={`font-bold ${gradeInfo.color}`}>{candidate.grade}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            candidate.decision === 'Strong Hire' ? 'bg-green-100 text-green-700' :
                            candidate.decision === 'Hire' ? 'bg-blue-100 text-blue-700' :
                            candidate.decision === 'Maybe' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {candidate.decision}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{candidate.timestamp}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => removeCandidate(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;