// src/tajweed/tree.ts
export type BooleanTreeNode = {
  attribute: string;
  value: number;
  gt: TreeNode;
  lt: TreeNode;
};

export type FinalTreeNode = {
  label: string;
  count: number;
};

export type TreeNode = BooleanTreeNode | FinalTreeNode;

// Convertit un JSON en arbre
export const json2tree = (node: any): TreeNode => {
  if ("label" in node) {
    return { label: node.label, count: 0 };
  }
  return {
    attribute: node.attribute,
    value: node.value,
    gt: json2tree(node.gt),
    lt: json2tree(node.lt),
  };
};

// Convertit un arbre en JSON
export const tree2json = (node: TreeNode): any => {
  if ("label" in node) return { label: node.label };
  return {
    attribute: node.attribute,
    value: node.value,
    gt: tree2json(node.gt),
    lt: tree2json(node.lt),
  };
};
