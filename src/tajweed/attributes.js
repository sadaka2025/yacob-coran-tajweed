"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attributesFor = void 0;
var attributesFor = function (rule, txt, i, includeThis, auxiliaryStream) {
    var _a;
    if (includeThis === void 0) { includeThis = true; }
    var start = i;
    while (start > 0 &&
        /[\u064B-\u0652]/.test(txt[start]) &&
        !(txt[start] === "ٰ" && txt[start - 1] === "ـ"))
        start--;
    var end = start + 1;
    while (end < txt.length &&
        /[\u064B-\u0652]/.test(txt[end]) &&
        txt[end] !== "ٰ")
        end++;
    var c = txt[i];
    var cExt = txt.slice(start, end);
    var cBase = txt[start];
    var res = ((_a = auxiliaryStream === null || auxiliaryStream === void 0 ? void 0 : auxiliaryStream[i]) === null || _a === void 0 ? void 0 : _a.attributes) || {};
    // Exemple simplifié pour ghunnah
    if (rule === "ghunnah") {
        if (includeThis) {
            res.isNoonOrMeem = c === "ن" || c === "م";
            res.isInitial = i === 0 || txt[i - 1] === " ";
        }
        else {
            res.hasShaddah = cExt.includes("ّ");
            res.baseIsNoonOrMeem = cBase === "ن" || cBase === "م";
        }
    }
    return { start: start, end: end, attributes: res };
};
exports.attributesFor = attributesFor;
