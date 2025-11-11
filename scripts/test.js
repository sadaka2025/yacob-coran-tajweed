import * as fs from "fs";
import path from "path";

// Chemin vers le Mushaf Uthmani
const mushafPath = path.join("public", "data", "mushaf", "quran-uthmani.txt");

// Lire tout le texte
const mushafText = fs.readFileSync(mushafPath, "utf8");

// Séparer surahs (chaque surah commence par "1:" ou "2:" … selon ton fichier)
const surahs = mushafText.split(/\n(?=\d+:)/);

surahs.forEach((surahText) => {
  // Extraire le numéro de surah et ses ayahs
  const lines = surahText.split("\n");
  const surahNumberMatch = lines[0].match(/^(\d+):/);
  if (!surahNumberMatch) return;

  const surahNumber = parseInt(surahNumberMatch[1], 10);
  const surahDir = path.join(
    "public",
    "data",
    "mushaf",
    surahNumber.toString()
  );

  if (!fs.existsSync(surahDir)) fs.mkdirSync(surahDir, { recursive: true });

  lines.forEach((line) => {
    const ayahMatch = line.match(/^(\d+):(.+)$/);
    if (!ayahMatch) return;

    const ayahNumber = parseInt(ayahMatch[1], 10);
    const ayahText = ayahMatch[2].trim();

    const json = {
      surah: surahNumber,
      ayah: ayahNumber,
      text: ayahText,
      annotations: [], // tu pourras remplir avec analyse Tajweed plus tard
    };

    fs.writeFileSync(
      path.join(surahDir, `${ayahNumber}.json`),
      JSON.stringify(json, null, 2),
      "utf8"
    );
  });
});

console.log("✅ Mushaf converti en JSON !");
