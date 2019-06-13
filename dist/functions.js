"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function mergeObjects(existing, incoming) {
    var result = __assign({}, existing);
    for (var k in incoming) {
        if (incoming.hasOwnProperty(k)) {
            var value = incoming[k];
            if (value !== undefined) {
                result[k] = value;
            }
            else {
                delete result[k];
            }
        }
    }
    return result;
}
exports.mergeObjects = mergeObjects;
function deepMergeObjects(existing, incoming) {
    var result = __assign({}, existing);
    for (var k in incoming) {
        if (incoming.hasOwnProperty(k)) {
            var value = incoming[k];
            if (value !== undefined) {
                if (typeof value === 'object') {
                    result[k] = deepMergeObjects(result[k], value);
                }
                else {
                    result[k] = value;
                }
            }
            else {
                delete result[k];
            }
        }
    }
    return result;
}
exports.deepMergeObjects = deepMergeObjects;
