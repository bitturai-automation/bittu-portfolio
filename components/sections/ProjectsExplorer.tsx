"use client";
import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import TagFilter from "@/components/ui/TagFilter";
import { ProjectList } from "@/components/sections/ProjectStack";
import { projects, tagsOf, type Tag } from "@/lib/data";

/** /projects: a filter bar under the hero. "All" keeps the three animated showcases (children); picking a type swaps them for a flat list of just that type. */
export default function ProjectsExplorer({ children }: { children: React.ReactNode }) {
  const [tag, setTag] = useState<Tag | null>(null);
  const shown = tag ? projects.filter((p) => tagsOf(p).includes(tag)) : projects;
  return (
    <>
      <section className="sec dark pf" aria-label="Filter projects">
        <Reveal y={16}>
          <p className="eyebrow">Filter by type of work</p>
          <TagFilter items={projects} value={tag} onChange={setTag} label="Filter all projects by type" />
          <p className="tf-count" role="status" aria-live="polite">{tag ? `Showing ${shown.length} of ${projects.length} projects: ${tag}` : `Showing all ${projects.length} projects, grouped by discipline below.`}</p>
        </Reveal>
      </section>
      {tag ? (
        <section className="sec paper ps ps-all" aria-label={`${tag} projects`}>
          <ProjectList items={shown} />
        </section>
      ) : children}
    </>
  );
}
