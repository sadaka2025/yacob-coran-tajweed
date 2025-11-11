import { useEffect, useRef } from "react";

export default function AudioPlayerSync({ surah, ayah, annotations }) {
  const ref = useRef();

  useEffect(() => {
    const audio = ref.current;
    if (!audio) return;

    const interval = setInterval(() => {
      const t = audio.currentTime * 1000;

      for (let a of annotations) {
        if (t >= a.timeStart && t < a.timeEnd) {
          document
            .querySelectorAll(".highlight")
            .forEach((e) => e.classList.remove("highlight"));

          for (let i = a.start; i < a.end; i++) {
            const el = document.querySelector(`[data-idx="${i}"]`);
            if (el) el.classList.add("highlight");
          }
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [annotations]);

  return <audio controls ref={ref} src={`/audio/${surah}/${ayah}.mp3`} />;
}
