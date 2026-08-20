"use client";

const ResumeViewer = ({ heading, className }) => {
  const resumeUrl = "/Sourav-Paitandy.pdf";

  return (
    <a
      href={resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className || "cursor-pointer inline-block"}
    >
      {heading}
    </a>
  );
};

export default ResumeViewer;
