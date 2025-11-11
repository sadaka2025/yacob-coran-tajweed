export default function TooltipRule({ children, rule }) {
  if (!rule) return children;

  return (
    <span className="tooltip-container">
      {children}
      <span className="tooltip">{rule.rule}</span>
    </span>
  );
}
