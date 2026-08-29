// =========================================================
//                         Button
// ---------------------------------------------------------
// Shared button/link component. Renders an <a> when `href`
// is provided, otherwise a <button>. Keeps CTA styling
// consistent across the entire site.
// =========================================================
export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  icon,
  download,
  type = "button",
  className = "",
  ...rest
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  const variants = {
    primary:
      "bg-teal text-cream shadow-soft hover:bg-teal-dark hover:shadow-card active:scale-[0.97]",
    secondary:
      "bg-transparent text-teal border border-teal/30 hover:border-teal hover:bg-teal-light active:scale-[0.97]",
    ghost: "bg-white/70 text-ink hover:bg-white active:scale-[0.97]",
  };

  const classes = `${base} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        onClick={onClick}
        {...rest}
      >
        {icon && <i className={icon} aria-hidden="true" />}
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {icon && <i className={icon} aria-hidden="true" />}
      {children}
    </button>
  );
}
