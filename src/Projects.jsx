import React from "react";
import { projectsList } from "./data/projects";
import ProjectsInteractive from "./Components/client/ProjectsInteractive";
import ProjectTextBlockStatic from "./Components/server/ProjectTextBlockStatic";

export default function Projects({ dict, lang }) {
  const textBlocks = projectsList.map((project, index) => (
    <ProjectTextBlockStatic key={project.id} project={project} index={index} dict={dict} lang={lang} />
  ));

  return (
    <section id="project-section" className="relative bg-white dark:bg-rich-black transition-colors duration-300">
      <ProjectsInteractive projectsData={projectsList} textBlocks={textBlocks} dict={dict} />
    </section>
  );
}
