import { RImg, Arrow } from "./Lines";
import { STATUS_LABEL, projectHref } from "@/lib/portfolio";

/** Portfolio project card — image, location, type, status and an "Explore Project" link. */
export default function ProjectCard({ p, index, size = "", dir }) {
  const cat = p.category === "residential" ? "Residential" : "Commercial";
  return (
    <a href={projectHref(p)} className={`pcard card-hover ${size}`}>
      <div className="pcard-media">
        <RImg src={p.cover} alt={`${p.title} — ${p.location}`} dir={dir} />
        {p.status && <span className={`pbadge ${p.status}`}>{STATUS_LABEL[p.status]}</span>}
      </div>
      <div className="pcard-body">
        <div className="pcard-meta">
          {index != null && <b>{String(index).padStart(2, "0")}</b>}
          <span>{cat}</span><i />
          <span>{p.location}</span>
        </div>
        <h3 className="display h4">{p.title}</h3>
        <p>{p.subtitle || p.concept}</p>
        <span className="link-arrow">Explore Project <span className="arr"><Arrow /></span></span>
      </div>
    </a>
  );
}
