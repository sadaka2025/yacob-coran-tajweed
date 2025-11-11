// src/hooks/useTajweedEngine.ts
import { useState, useRef } from "react";
import type { RuleTrees } from "../tajweed/classify";

interface Annotation {
  start: number;
  end: number;
  rule: string;
  extra?: any;
}

interface UseTajweedEngineProps {
  surah: number;
  ayah: number;
  text: string;
  ruleTrees: RuleTrees;
  audioUrl?: string;
  videoUrl?: string;
}

export function useTajweedEngine({
  surah,
  ayah,
  text,
  ruleTrees,
  audioUrl,
  videoUrl,
}: UseTajweedEngineProps) {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<"teacher" | "student">("teacher");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Fonctions de contrôle
  const play = () => {
    setIsPlaying(true);
    audioRef.current?.play();
    videoRef.current?.play();
  };

  const pause = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
    videoRef.current?.pause();
  };

  const reset = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
    if (audioRef.current) audioRef.current.currentTime = 0;
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  const selectWord = (idx: number) => setCurrentIndex(idx);
  const exportJSON = () => JSON.stringify(annotations, null, 2);
  const toggleMode = () =>
    setMode((prev) => (prev === "teacher" ? "student" : "teacher"));

  return {
    annotations,
    currentIndex,
    isPlaying,
    mode,
    audioRef,
    videoRef,
    setCurrentIndex,
    setIsPlaying,
    play,
    pause,
    reset,
    selectWord,
    exportJSON,
    toggleMode,
  };
}
