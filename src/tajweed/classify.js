"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeAyah = void 0;
// src/tajweed/classify.ts
var exemplars_1 = require("./exemplars");
var analyzeAyah = function (surah, ayah, text, ruleTrees) {
    var annotations = [];
    for (var ruleName in ruleTrees) {
        var exGen = (0, exemplars_1.exemplarsFor)(ruleName, text);
        var tree = ruleTrees[ruleName];
        var startIndex = null;
        for (var i = 0; i < text.length; i++) {
            var e = exGen.next().value;
            if ((0, exemplars_1.runTree)(tree.start, e))
                startIndex = i;
            if (startIndex !== null && (0, exemplars_1.runTree)(tree.end, e)) {
                annotations.push({ rule: ruleName, start: startIndex, end: i + 1 });
                startIndex = null;
            }
        }
    }
    return { surah: surah, ayah: ayah, annotations: annotations };
};
exports.analyzeAyah = analyzeAyah;
