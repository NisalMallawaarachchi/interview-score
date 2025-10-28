export const calculateCategoryTotal = (category, scores, criteria) => {
  return criteria.items.reduce((sum, item) => {
    const key = `${category}-${item.name}`;
    return sum + (scores[key] || 0);
  }, 0);
};

export const calculateGrandTotal = (selectedRole, scores, criteria) => {
  return criteria[selectedRole].reduce(
    (sum, cat) => sum + calculateCategoryTotal(cat.category, scores, cat),
    0
  );
};

export const getGrade = (total) => {
  if (total >= 85) return { grade: "A", color: "text-green-600", decision: "Strong Hire" };
  if (total >= 70) return { grade: "B", color: "text-blue-600", decision: "Hire" };
  if (total >= 55) return { grade: "C", color: "text-yellow-600", decision: "Maybe" };
  return { grade: "D", color: "text-red-600", decision: "No Hire" };
};

export const getMaxScore = (category, item, selectedRole, criteria) => {
  const cat = criteria[selectedRole].find((c) => c.category === category);
  const itm = cat?.items.find((i) => i.name === item);
  return itm?.max || 0;
};