declare module "tajweed/classify" {
  import type { Annotation, RuleTrees } from "./types";
  export function analyzeAyah(
    surah: number,
    ayah: number,
    text: string,
    ruleTrees: RuleTrees
  ): { annotations: Annotation[] };
}

declare module "tajweed/tree" {
  import type { RuleTreeNode } from "./types";
  export function json2tree(json: any): RuleTreeNode[];
}
