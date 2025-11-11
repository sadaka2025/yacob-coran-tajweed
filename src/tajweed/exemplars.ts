// src/tajweed/exemplars.ts
import { RangeAttributes, attributesFor } from "./attributes";
import { BooleanTreeNode, FinalTreeNode } from "./tree";

export class Exemplar {
  label: string | null;
  attributes: { [key: string]: any };
  count: number;
  constructor(label: string | null, attributes: any, count: number) {
    this.label = label;
    this.attributes = attributes;
    this.count = count;
  }
}

// Génère des exemplaires pour un texte
export const exemplarsFor = function* (rule: string, txt: string) {
  for (let i = 0; i < txt.length; i++) {
    const attr = attributesFor(rule, txt, i);
    yield new Exemplar(null, attr.attributes, 1);
  }
};

// Fonction pour appliquer l'arbre à un exemplaire
export const runTree = (
  tree: BooleanTreeNode | FinalTreeNode,
  exemplar: Exemplar
) => {
  while (!("label" in tree)) {
    tree =
      exemplar.attributes[tree.attribute] >= tree.value ? tree.gt : tree.lt;
  }
  return tree.label;
};
