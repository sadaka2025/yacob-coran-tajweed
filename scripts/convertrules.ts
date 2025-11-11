import * as fs from "fs";

import { analyzeAyah, Annotation, RuleTrees } from "../src/tajweed/classify";
import { json2tree } from "../src/tajweed/tree";

const ruleFiles = ["ghunnah", "madd_2"];
const ruleTrees: RuleTrees = {};

for (const rule of ruleFiles) {
  ruleTrees[rule] = {
    start: json2tree(
      JSON.parse(
        fs.readFileSync(`public/data/tajweed/${rule}.start.json`, "utf8")
      )
    ),
    end: json2tree(
      JSON.parse(
        fs.readFileSync(`public/data/tajweed/${rule}.end.json`, "utf8")
      )
    ),
  };
}

const surah = 1;
const ayah = 1;
const text = "بسم الله الرحمن الرحيم";

const analysis = analyzeAyah(surah, ayah, text, ruleTrees);

// ⚡ Adapter pour correspondre à l'interface Annotation
const annotations: Annotation[] = analysis.annotations.map((a) => ({
  start: a.start ?? 0, // utiliser 'start' au lieu de 'startTime'
  end: a.end ?? 0, // utiliser 'end' au lieu de 'endTime'
  rule: a.rule,
}));

fs.writeFileSync(
  `public/data/mushaf/${surah}_${ayah}.json`,
  JSON.stringify({ surah, ayah, text, annotations }, null, 2)
);

console.log(`✅ Ayah ${surah}:${ayah} convertie !`);
