import TooltipRule from "./TooltipRule";

export default function TajweedLetter({ letter, index, annotations }) {
  const rule = annotations.find((a) => index >= a.start && index < a.end);

  return (
    <TooltipRule rule={rule}>
      <span
        className={`tajweed-letter ${rule?.rule ?? ""}`}
        style={{ padding: "2px", cursor: "pointer" }}
      >
        {letter}
      </span>
    </TooltipRule>
  );
}
