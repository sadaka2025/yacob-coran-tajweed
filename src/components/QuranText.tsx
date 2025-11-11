import TajweedLetter from "./TajweedLetter";

export default function QuranText({ text, annotations }) {
  return (
    <div style={{ fontSize: 36, lineHeight: "70px", direction: "rtl" }}>
      {text.split("").map((letter, i) => (
        <TajweedLetter
          key={i}
          letter={letter}
          index={i}
          annotations={annotations}
        />
      ))}
    </div>
  );
}
