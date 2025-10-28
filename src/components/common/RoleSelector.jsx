import React from "react";
import { roles } from "../../constants/criteria"; // Correct import path

const RoleSelector = ({ selectedRole, onRoleChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Select Role:
      </label>
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(roles).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onRoleChange(key)}
            className={`p-4 rounded-lg font-medium transition-all ${
              selectedRole === key
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
