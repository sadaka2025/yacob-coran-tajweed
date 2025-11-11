"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tree2json = exports.json2tree = void 0;
// Convertit un JSON en arbre
var json2tree = function (node) {
    if ("label" in node) {
        return { label: node.label, count: 0 };
    }
    return {
        attribute: node.attribute,
        value: node.value,
        gt: (0, exports.json2tree)(node.gt),
        lt: (0, exports.json2tree)(node.lt),
    };
};
exports.json2tree = json2tree;
// Convertit un arbre en JSON
var tree2json = function (node) {
    if ("label" in node)
        return { label: node.label };
    return {
        attribute: node.attribute,
        value: node.value,
        gt: (0, exports.tree2json)(node.gt),
        lt: (0, exports.tree2json)(node.lt),
    };
};
exports.tree2json = tree2json;
