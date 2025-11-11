import fs from "fs/promises";
import path from "path";

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function main() {
  const inputFile = process.argv[2];
  const outDir = process.argv[3] || "public/data/mushaf";

  if (!inputFile) {
    console.log("Usage: node split-mushaf.js quran-uthmani.txt [output]");
    process.exit(1);
  }

  console.log("📥 Lecture du fichier...");
  const content = await fs.readFile(inputFile, "utf8");

  const lines = content.split(/\r?\n/).filter(Boolean);

  console.log("🔍 Parsing...");
  const lineRegex = /^(\d{1,3})\|(\d{1,4})\|(.*)$/u;

  const map = {};

  for (const line of lines) {
    const m = line.match(lineRegex);
    if (!m) continue;

    const surah = Number(m[1]);
    const ayah = Number(m[2]);
    const text = m[3].trim();

    if (!map[surah]) map[surah] = {};
    map[surah][ayah] = text;
  }

  console.log("📂 Création des dossiers...");
  await ensureDir(outDir);

  console.log("✍️ Écriture des fichiers JSON...");
  let total = 0;

  for (const s of Object.keys(map)) {
    const surahDir = path.join(outDir, s);
    await ensureDir(surahDir);

    for (const a of Object.keys(map[s])) {
      const obj = {
        surah: Number(s),
        ayah: Number(a),
        text: map[s][a],
      };

      const filePath = path.join(surahDir, `${a}.json`);
      await fs.writeFile(filePath, JSON.stringify(obj, null, 2), "utf8");

      total++;
    }
  }

  console.log(`✅ Terminé ! ${total} ayahs générées.`);
  console.log(`📁 Destination : ${outDir}`);
}

main().catch((err) => {
  console.error("❌ Erreur :", err);
});
