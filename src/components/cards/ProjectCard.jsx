// =========================================================
//                       ProjectCard
// =========================================================
export default function ProjectCard({ project }) {
  return (
    <article className="group w-[calc(100vw_-_3rem)] flex-shrink-0 snap-center sm:w-[340px]">
      <div className="relative h-48 overflow-hidden rounded-2xl bg-cream-deep sm:h-56">
        <img
          src={project.image}
          alt={`Screenshot of the ${project.title} project`}
          loading="lazy"
          width="340"
          height="224"
          className="h-[130%] w-full object-cover object-top -translate-y-[13%] transition-transform duration-500 ease-out group-hover:translate-y-0"
        />

        {project.visitEnabled ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-teal opacity-0 shadow-soft transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100"
            aria-label={`Visit ${project.title} demo`}
          >
            <i
              className="fa-solid fa-arrow-up-right-from-square text-sm"
              aria-hidden="true"
            />
          </a>
        ) : (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-soft shadow-soft">
            Demo offline
          </span>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-display text-lg font-bold text-ink">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
          {project.description}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-teal-light px-2.5 py-1 text-[11px] font-semibold text-teal-dark"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
