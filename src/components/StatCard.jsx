function StatCard({
  title,
  value,
  description,
  icon,
  tone = "purple",
}) {
  return (
    <article className="stat-card">
      <div className="stat-card-top">
        <span className="stat-title">{title}</span>

        <span className={`stat-icon ${tone}`} aria-hidden="true">
          {icon}
        </span>
      </div>

      <div className="stat-value">{value}</div>

      <p className="stat-description">{description}</p>
    </article>
  );
}

export default StatCard;