import { jsPDF } from "jspdf";
import { criteria, roles } from "../../constants/criteria";

// Helper function to get role key from role display name
const getRoleKeyFromRoleName = (roleName) => {
  for (const [key, value] of Object.entries(roles)) {
    if (value === roleName) {
      return key;
    }
  }
  return "backend";
};

export const generateDetailedReport = (candidate) => {
  const roleKey = candidate.roleKey || getRoleKeyFromRoleName(candidate.role);
  const candidateCriteria = criteria[roleKey] || criteria.backend;
  const doc = new jsPDF();
  
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  let y = 15;

  // Modern color palette
  const colors = {
    primary: [41, 128, 185],      // Blue
    accent: [46, 204, 113],        // Green
    dark: [44, 62, 80],            // Dark blue-gray
    light: [236, 240, 241],        // Light gray
    warning: [241, 196, 15],       // Yellow
    danger: [231, 76, 60]          // Red
  };

  // Gradient-style header
  doc.setFillColor(...colors.primary);
  doc.rect(0, 0, pageWidth, 35, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("INTERVIEW ASSESSMENT REPORT", pageWidth / 2, 15, { align: "center" });
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 25, { align: "center" });
  
  y = 42;

  // Candidate Info Cards - Two columns
  doc.setTextColor(...colors.dark);
  const cardHeight = 28;
  const cardWidth = (contentWidth - 5) / 2;
  
  // Left Card - Personal Info
  doc.setFillColor(...colors.light);
  doc.roundedRect(margin, y, cardWidth, cardHeight, 2, 2, 'F');
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("CANDIDATE", margin + 3, y + 6);
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${candidate.name}`, margin + 3, y + 12);
  doc.text(`Position: ${candidate.role}`, margin + 3, y + 18);
  doc.text(`Date: ${candidate.timestamp}`, margin + 3, y + 24);
  
  // Right Card - Score Info
  const rightCardX = margin + cardWidth + 5;
  doc.setFillColor(...colors.accent);
  doc.roundedRect(rightCardX, y, cardWidth, cardHeight, 2, 2, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("ASSESSMENT", rightCardX + 3, y + 6);
  
  doc.setFontSize(16);
  doc.text(`${candidate.total.toFixed(1)}/100`, rightCardX + 3, y + 16);
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Grade: ${candidate.grade} | ${candidate.decision}`, rightCardX + 3, y + 24);
  
  doc.setTextColor(...colors.dark);
  y += cardHeight + 8;

  // Category Performance - Compact Grid
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("PERFORMANCE BREAKDOWN", margin, y);
  y += 7;

  const colWidth = contentWidth / 2;
  let col = 0;
  let startY = y;

  candidateCriteria.forEach((cat, index) => {
    const categoryTotal = cat.items.reduce((sum, item) => {
      const key = `${cat.category}-${item.name}`;
      return sum + (candidate.scores[key] || 0);
    }, 0);
    
    const categoryMax = cat.items.reduce((sum, item) => sum + item.max, 0);
    const percentage = (categoryTotal / categoryMax) * 100;

    // Determine color based on performance
    let barColor;
    if (percentage >= 80) barColor = colors.accent;
    else if (percentage >= 60) barColor = colors.warning;
    else barColor = colors.danger;

    const xPos = margin + (col * colWidth);
    const itemY = startY + (Math.floor(index / 2) * 18);

    // Category name
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(cat.category, xPos, itemY);
    
    // Progress bar
    const barWidth = colWidth - 35;
    const barHeight = 6;
    const barY = itemY + 2;
    
    // Background bar
    doc.setFillColor(220, 220, 220);
    doc.roundedRect(xPos, barY, barWidth, barHeight, 1, 1, 'F');
    
    // Progress bar
    doc.setFillColor(...barColor);
    const progressWidth = (barWidth * percentage) / 100;
    doc.roundedRect(xPos, barY, progressWidth, barHeight, 1, 1, 'F');
    
    // Percentage
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(`${percentage.toFixed(0)}%`, xPos + barWidth + 3, itemY + 5);

    col = (col + 1) % 2;
  });

  y = startY + (Math.ceil(candidateCriteria.length / 2) * 18) + 5;

  // Detailed Scores - Compact Table
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("DETAILED SCORES", margin, y);
  y += 6;

  doc.setFontSize(7);
  const tableStartY = y;
  const colCount = 3;
  const tableColWidth = contentWidth / colCount;
  
  let currentCol = 0;
  let currentRow = 0;
  const rowHeight = 4;
  const maxRows = 12;

  candidateCriteria.forEach((cat) => {
    cat.items.forEach((item) => {
      if (currentRow >= maxRows) {
        currentCol++;
        currentRow = 0;
        if (currentCol >= colCount) return; // Skip if no more space
      }

      const key = `${cat.category}-${item.name}`;
      const score = candidate.scores[key] || 0;
      const xPos = margin + (currentCol * tableColWidth);
      const yPos = tableStartY + (currentRow * rowHeight);

      doc.setFont("helvetica", "normal");
      const itemText = `${item.name.substring(0, 20)}${item.name.length > 20 ? '...' : ''}`;
      doc.text(itemText, xPos, yPos);
      
      doc.setFont("helvetica", "bold");
      doc.text(`${score.toFixed(1)}/${item.max}`, xPos + tableColWidth - 15, yPos);
      
      currentRow++;
    });
  });

  y = tableStartY + (maxRows * rowHeight) + 5;

  // Notes Section - If space available
  if (candidate.notes && y < pageHeight - 40) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("NOTES", margin, y);
    y += 5;
    
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    const noteLines = doc.splitTextToSize(candidate.notes, contentWidth);
    const maxNoteLines = Math.floor((pageHeight - y - 15) / 3);
    const displayLines = noteLines.slice(0, maxNoteLines);
    doc.text(displayLines, margin, y);
  }

  // Footer
  doc.setFillColor(...colors.primary);
  doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.text(`${candidate.name} - ${candidate.role}`, margin, pageHeight - 5);
  doc.text(`Page 1 of 1`, pageWidth - margin, pageHeight - 5, { align: "right" });

  doc.save(`${candidate.name.replace(/\s+/g, "_")}_Stylish_Report.pdf`);
};

export const generateQuickReport = (candidate) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  let y = 20;

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("INTERVIEW SUMMARY REPORT", pageWidth / 2, y, { align: "center" });
  y += 15;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Candidate: ${candidate.name}`, margin, y); y += 7;
  doc.text(`Position: ${candidate.role}`, margin, y); y += 7;
  doc.text(`Date: ${candidate.timestamp}`, margin, y); y += 7;
  doc.text(`Score: ${candidate.total.toFixed(1)} / 100`, margin, y); y += 7;
  doc.text(`Grade: ${candidate.grade}`, margin, y); y += 7;
  doc.text(`Decision: ${candidate.decision}`, margin, y); y += 15;

  if (candidate.notes) {
    doc.setFont("helvetica", "bold");
    doc.text("Notes:", margin, y); y += 7;
    doc.setFont("helvetica", "normal");
    const splitNotes = doc.splitTextToSize(candidate.notes, pageWidth - (margin * 2));
    doc.text(splitNotes, margin, y);
    y += splitNotes.length * 6;
  }

  doc.setFontSize(8);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, margin, doc.internal.pageSize.height - 10);

  doc.save(`${candidate.name.replace(/\s+/g, "_")}_Quick_Report.pdf`);
};

export const generatePerformanceReport = (candidate) => {
  const roleKey = candidate.roleKey || getRoleKeyFromRoleName(candidate.role);
  const candidateCriteria = criteria[roleKey] || criteria.backend;
  const doc = new jsPDF();
  
  let y = 20;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("PERFORMANCE ANALYSIS REPORT", pageWidth / 2, y, { align: "center" });
  y += 20;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Candidate: ${candidate.name}`, margin, y); y += 6;
  doc.text(`Position: ${candidate.role}`, margin, y); y += 6;
  doc.text(`Overall Score: ${candidate.total.toFixed(1)}/100 (${candidate.grade})`, margin, y); y += 6;
  doc.text(`Recommendation: ${candidate.decision}`, margin, y); y += 15;

  doc.setFont("helvetica", "bold");
  doc.text("PERFORMANCE SUMMARY", margin, y);
  y += 10;

  const strengths = [];
  const improvements = [];

  candidateCriteria.forEach((cat) => {
    const categoryTotal = cat.items.reduce((sum, item) => {
      const key = `${cat.category}-${item.name}`;
      return sum + (candidate.scores[key] || 0);
    }, 0);
    
    const categoryMax = cat.items.reduce((sum, item) => sum + item.max, 0);
    const percentage = (categoryTotal / categoryMax) * 100;

    if (percentage >= 80) {
      strengths.push({ category: cat.category, score: percentage });
    } else if (percentage <= 60) {
      improvements.push({ category: cat.category, score: percentage });
    }
  });

  doc.setFont("helvetica", "bold");
  doc.text("Key Strengths:", margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  if (strengths.length > 0) {
    strengths.forEach(strength => {
      doc.text(`• ${strength.category}: ${strength.score.toFixed(1)}%`, margin + 5, y);
      y += 5;
    });
  } else {
    doc.text("No significant strengths identified", margin + 5, y);
    y += 5;
  }
  y += 5;

  doc.setFont("helvetica", "bold");
  doc.text("Areas for Improvement:", margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  if (improvements.length > 0) {
    improvements.forEach(improvement => {
      doc.text(`• ${improvement.category}: ${improvement.score.toFixed(1)}%`, margin + 5, y);
      y += 5;
    });
  } else {
    doc.text("No major areas for improvement identified", margin + 5, y);
    y += 5;
  }

  doc.save(`${candidate.name.replace(/\s+/g, "_")}_Performance_Analysis.pdf`);
};