// src/tajweed/attributes.ts
export type RangeAttributes = {
  start: number;
  end: number;
  attributes: { [key: string]: any };
};

export const attributesFor = (
  rule: string,
  txt: string,
  i: number,
  includeThis = true,
  auxiliaryStream?: RangeAttributes[]
): RangeAttributes => {
  let start = i;
  while (
    start > 0 &&
    /[\u064B-\u0652]/.test(txt[start]) &&
    !(txt[start] === "ٰ" && txt[start - 1] === "ـ")
  )
    start--;

  let end = start + 1;
  while (
    end < txt.length &&
    /[\u064B-\u0652]/.test(txt[end]) &&
    txt[end] !== "ٰ"
  )
    end++;

  const c = txt[i];
  const cExt = txt.slice(start, end);
  const cBase = txt[start];

  const res: { [key: string]: any } = auxiliaryStream?.[i]?.attributes || {};

  // Exemple simplifié pour ghunnah
  if (rule === "ghunnah") {
    if (includeThis) {
      res.isNoonOrMeem = c === "ن" || c === "م";
      res.isInitial = i === 0 || txt[i - 1] === " ";
    } else {
      res.hasShaddah = cExt.includes("ّ");
      res.baseIsNoonOrMeem = cBase === "ن" || cBase === "م";
    }
  }

  return { start, end, attributes: res };
};
