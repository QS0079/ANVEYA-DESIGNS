"use client";
import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";

const FILTERS = [
  ["all", "All Projects"],
  ["residential", "Residential"],
  ["commercial", "Commercial"],
  ["completed", "Completed"],
  ["ongoing", "Ongoing"],
];

/** All-projects grid with Residential / Commercial / status filters. */
export default function PortfolioGrid({ projects }) {
  const [f, setF] = useState("all");
  const list = useMemo(
    () => projects.filter((p) => f === "all" || p.category === f || p.status === f),
    [projects, f]
  );
  const count = (k) => projects.filter((p) => k === "all" || p.category === k || p.status === k).length;
  return (
    <>
      <div className="pfilter" role="tablist" aria-label="Filter projects">
        {FILTERS.filter(([k]) => count(k) > 0).map(([k, label]) => (
          <button key={k} role="tab" aria-selected={f === k} className={f === k ? "on" : ""} onClick={() => setF(k)}>
            {label} <sup>{count(k)}</sup>
          </button>
        ))}
      </div>
      <div className="pgrid" key={f}>
        {list.map((p, i) => <ProjectCard key={p.slug} p={p} index={i + 1} dir={i % 2 ? "down" : undefined} />)}
      </div>
    </>
  );
}
