import React, { useRef, useEffect } from "react";
import { useTajweedEngine } from "../hooks/useTajweedEngine";
import type { RuleTrees } from "../tajweed/classify";
import "../styles/tajweed.css";

interface QuranAyahPageProps {
  surah: number;
  ayah: number;
  text: string;
  audioUrl?: string;
  videoUrl?: string;
  ruleTrees: RuleTrees;
}

export default function QuranAyahPage({
  surah,
  ayah,
  text,
  audioUrl,
  videoUrl,
  ruleTrees,
}: QuranAyahPageProps) {
  const {
    annotations,
    currentIndex,
    isPlaying,
    mode,
    audioRef,
    videoRef,
    play,
    pause,
    reset,
    selectWord,
    exportJSON,
    toggleMode,
  } = useTajweedEngine({ surah, ayah, text, ruleTrees, audioUrl, videoUrl });

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll automatique sur la lettre active
  useEffect(() => {
    if (!containerRef.current) return;
    const activeLetter = containerRef.current.querySelector(".letter.active");
    if (activeLetter)
      activeLetter.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentIndex]);

  const letters = Array.from(text);

  return (
    <div className={`quran-page ${mode}`} ref={containerRef}>
      <audio ref={audioRef} src={audioUrl} preload="auto" />
      {videoUrl && (
        <video ref={videoRef} src={videoUrl} controls className="quran-video" />
      )}

      <div className="controls">
        <button onClick={play} disabled={isPlaying}>
          ▶ Play
        </button>
        <button onClick={pause} disabled={!isPlaying}>
          ⏸ Pause
        </button>
        <button onClick={reset}>⏹ Reset</button>
        <button onClick={() => console.log(exportJSON())}>
          💾 Export JSON
        </button>
        <button onClick={toggleMode}>🧑‍🏫 / 👶 Mode</button>
      </div>

      <div className="quran-text">
        {letters.map((letter, idx) => {
          const active = idx === currentIndex;
          const annotation = annotations.find(
            (a) => idx >= a.start && idx < a.end
          );
          return (
            <span
              key={idx}
              className={`letter ${active ? "active" : ""}`}
              title={annotation?.rule}
              onClick={() => selectWord(idx)}
            >
              {letter}
            </span>
          );
        })}
      </div>

      <div className="annotation-bar">
        {annotations.map((ann, idx) => (
          <div
            key={idx}
            className={`annotation ${idx === currentIndex ? "highlight" : ""}`}
            style={{
              left: `${(ann.start / text.length) * 100}%`,
              width: `${((ann.end - ann.start) / text.length) * 100}%`,
            }}
            title={ann.rule}
          />
        ))}
      </div>
    </div>
  );
}
