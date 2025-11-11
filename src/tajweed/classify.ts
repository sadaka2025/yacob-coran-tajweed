// src/tajweed/classify.ts
import { exemplarsFor, runTree, Exemplar } from "./exemplars";
import type { BooleanTreeNode, FinalTreeNode, TreeNode } from "./tree";

export type RuleTrees = {
  [key: string]: { start: TreeNode; end: TreeNode };
};

export type Annotation = {
  rule: string;
  start: number;
  end: number;
};

export const analyzeAyah = (
  surah: number,
  ayah: number,
  text: string,
  ruleTrees: RuleTrees
): { surah: number; ayah: number; annotations: Annotation[] } => {
  const annotations: Annotation[] = [];

  for (const ruleName in ruleTrees) {
    const exGen = exemplarsFor(ruleName, text);
    const tree = ruleTrees[ruleName];

    let startIndex: number | null = null;

    for (let i = 0; i < text.length; i++) {
      const e = exGen.next().value as Exemplar;
      if (runTree(tree.start as any, e)) startIndex = i;
      if (startIndex !== null && runTree(tree.end as any, e)) {
        annotations.push({ rule: ruleName, start: startIndex, end: i + 1 });
        startIndex = null;
      }
    }
  }

  return { surah, ayah, annotations };
};
