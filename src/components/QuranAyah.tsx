// src/components/QuranAyah.jsx
import React, { useEffect, useState } from "react";
import {
  classifyAyahByFetching,
  buildAnnotationMap,
  chooseClassForRules,
} from "../tajweed/tajweedEngine";
import "../styles/tajweed.css";

export default function QuranAyah({ surah = 2, ayah = 17 }) {
  const [text, setText] = useState("");
  const [map, setMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const { annotations, text } = await classifyAyahByFetching(surah, ayah);

        if (cancelled) return;

        const annotationMap = buildAnnotationMap(annotations, text.length);

        setText(text);
        setMap(annotationMap);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement de la récitation.");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => (cancelled = true);
  }, [surah, ayah]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  const chars = [...text]; // split by codepoint (harakat stay with following letter)

  return (
    <div className="quran-ayah-container">
      <div className="quran-ayah-text">
        {chars.map((ch, i) => {
          const rules = map[i] || [];
          const classSuffix = chooseClassForRules(rules);
          const className =
            classSuffix !== ""
              ? `tajweed ${"tajweed-" + classSuffix}`
              : "tajweed";

          return (
            <span key={i} className={className}>
              {ch}
            </span>
          );
        })}
      </div>
    </div>
  );
}
