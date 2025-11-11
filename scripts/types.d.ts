export interface Annotation {
  letter: string;
  rule: string;
  startTime: number;
  endTime: number;
  extra?: any;
}

export interface RuleTreeNode {
  letter: string;
  children?: RuleTreeNode[];
  rule?: string;
}

export interface RuleTrees {
  [rule: string]: {
    start: RuleTreeNode[];
    end: RuleTreeNode[];
  };
}
