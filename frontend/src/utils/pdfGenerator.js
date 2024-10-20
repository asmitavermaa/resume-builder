import { jsPDF } from "jspdf";

// Helper function to split text and handle line breaks
const splitText = (doc, text, maxWidth) => {
  return doc.splitTextToSize(text, maxWidth);
};

export const generatePDF = (resumeData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;

  // Set title
  doc.setFontSize(22);
  doc.text("Resume", margin, 20);

  doc.setFontSize(16);

  // Variable to track the current Y position
  let currentY = 40;

  // Function to add new pages if needed
  const checkPageEnd = (doc, currentY, margin) => {
    const pageHeight = doc.internal.pageSize.getHeight();
    if (currentY >= pageHeight - margin) {
      doc.addPage();
      return margin;
    }
    return currentY;
  };

  // Add Professional Summary Section
  doc.text("Professional Summary:", margin, currentY);
  currentY += 10;
  if (resumeData?.summary) {
    const summaryText = splitText(doc, resumeData.summary, maxWidth);
    doc.text(summaryText, margin, currentY);
    currentY += summaryText.length * 10;
  } else {
    doc.text("No professional summary available.", margin, currentY);
    currentY += 20;
  }

  // Add Career Objective Section
  currentY = checkPageEnd(doc, currentY, margin);
  doc.text("Career Objective:", margin, currentY);
  currentY += 10;
  if (resumeData?.careerObjective) {
    const careerText = splitText(doc, resumeData.careerObjective, maxWidth);
    doc.text(careerText, margin, currentY);
    currentY += careerText.length * 10;
  } else {
    doc.text("No career objective available.", margin, currentY);
    currentY += 20;
  }

  // Add Education Section
  currentY = checkPageEnd(doc, currentY, margin);
  doc.text("Education:", margin, currentY);
  currentY += 10;
  if (Array.isArray(resumeData?.education) && resumeData.education.length > 0) {
    resumeData.education.forEach((edu) => {
      doc.text(`${edu.degree} at ${edu.institution} (${edu.year})`, margin, currentY);
      currentY += 10;
      currentY = checkPageEnd(doc, currentY, margin);
      currentY += 10
    });
  } else {
    doc.text("No education data available.", margin, currentY);
    currentY += 20;
  }

  // Add Experience Section
  currentY = checkPageEnd(doc, currentY, margin);
  doc.text("Experience:", margin, currentY);
  currentY += 10;
  if (Array.isArray(resumeData?.experience) && resumeData.experience.length > 0) {
    resumeData.experience.forEach((exp) => {
      doc.text(`${exp.position} at ${exp.company} (${exp.duration})`, margin, currentY);
      currentY += 10;
      currentY = checkPageEnd(doc, currentY, margin);
      currentY += 10
    });
  } else {
    doc.text("No experience data available.", margin, currentY);
    currentY += 20;
  }

  // Add Skills Section
  currentY = checkPageEnd(doc, currentY, margin);
  doc.text("Skills:", margin, currentY);
  currentY += 10;
  if (Array.isArray(resumeData?.skills) && resumeData.skills.length > 0) {
    resumeData.skills.forEach((skill) => {
      doc.text(skill, margin, currentY);
      currentY += 10;
      currentY = checkPageEnd(doc, currentY, margin);
      currentY += 10
    });
  } else {
    doc.text("No skills data available.", margin, currentY);
    currentY += 20;
  }

  // Add Achievements Section
  currentY = checkPageEnd(doc, currentY, margin);
  doc.text("Achievements:", margin, currentY);
  currentY += 10;
  if (Array.isArray(resumeData?.achievements) && resumeData.achievements.length > 0) {
    resumeData.achievements.forEach((achievement) => {
      doc.text(achievement, margin, currentY);
      currentY += 10;
      currentY = checkPageEnd(doc, currentY, margin);
      currentY += 10
    });
  } else {
    doc.text("No achievements data available.", margin, currentY);
    currentY += 20;
  }

  // Save the PDF
  doc.save("resume.pdf");
};
