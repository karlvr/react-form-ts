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
/**
 * A class to assist with a form that creates a patch request for an object.
 *
 * SOURCE is the type of the original object. PATCH is the type of the patch request, which
 * should have every property as optional.
 *
 * This object is immutable, so it is suitable to be put into a React component state.
 */
var PatchFormState = /** @class */ (function () {
    function PatchFormState(source, patch) {
        this.source = source;
        this.patch = patch;
    }
    /**
     * Return the value of the given property from the patch, or from the source.
     * @param name Property name
     */
    PatchFormState.prototype.get = function (name, defaultValue) {
        var value = this.patch[name];
        if (value !== undefined) {
            return value;
        }
        var sourceValue = this.source[name];
        if (sourceValue !== undefined) {
            return sourceValue;
        }
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        return value;
    };
    /**
     * Return a new form state with the value of the given property set in the patch. If the patch value exactly
     * matches the source value, the value in the patch is cleared.
     * @param name Property name
     * @param value New value
     */
    PatchFormState.prototype.set = function (name, value) {
        var _a;
        return this.merge((_a = {}, _a[name] = value, _a));
    };
    PatchFormState.prototype.push = function (name, value) {
        var array = this.patch[name];
        if (array) {
            array = array.slice();
        }
        else {
            array = [];
        }
        array.push(value);
        return this.set(name, array);
    };
    PatchFormState.prototype.splice = function (name, start, deleteCount) {
        var values = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            values[_i - 3] = arguments[_i];
        }
        var array = this.patch[name];
        if (array) {
            array = array.slice();
        }
        else {
            return this;
        }
        if (deleteCount !== undefined) {
            array.splice.apply(array, [start, deleteCount].concat(values));
        }
        else {
            array.splice(start);
        }
        return this.set(name, array);
    };
    PatchFormState.prototype.apply = function (func) {
        var form = this.getValuesCopy();
        form = func(form);
        return new PatchFormState(this.source, form);
    };
    /**
     * Return a new form state with the values from the given patch merged in to this state.
     * @param other A patch object
     */
    PatchFormState.prototype.merge = function (other) {
        var patch = this.getValuesCopy();
        for (var k in other) {
            if (other.hasOwnProperty(k)) {
                var otherValue = other[k];
                if (otherValue === this.source[k] || otherValue === undefined) {
                    delete patch[k];
                }
                else {
                    patch[k] = other[k];
                }
            }
        }
        return new PatchFormState(this.source, patch);
    };
    /**
     * Returns a copy of the current patch state.
     */
    PatchFormState.prototype.getValues = function () {
        return this.patch;
    };
    PatchFormState.prototype.getValuesCopy = function () {
        return __assign({}, this.patch);
    };
    PatchFormState.prototype.isSame = function (other) {
        return this.getValues() === other.getValues();
    };
    /**
     * Returns true if the patch is empty.
     */
    PatchFormState.prototype.isEmpty = function () {
        for (var k in this.patch) {
            if (this.patch.hasOwnProperty(k)) {
                if (this.patch[k] !== undefined) {
                    return false;
                }
            }
        }
        return true;
    };
    PatchFormState.prototype.sub = function (func) {
        var patch = this.getValues();
        var source = __assign({}, this.source);
        var subsource = func(source);
        var subpatch = func(patch);
        return new PatchFormState(subsource, subpatch);
    };
    PatchFormState.prototype.subProperty = function (name, defaultValue) {
        var form = this.getValues();
        if (form[name] !== undefined) {
            return new PatchFormState(this.source[name], form[name]);
        }
        else if (defaultValue !== undefined) {
            return new PatchFormState(this.source[name], defaultValue);
        }
        else {
            return new PatchFormState(this.source[name], {});
        }
    };
    PatchFormState.prototype.subIndexProperty = function (name, index) {
        var form = this.getValues();
        var formArray = form[name];
        var sourceArray = this.source[name];
        return new PatchFormState(sourceArray[index], formArray !== undefined ? formArray[index] : {});
    };
    PatchFormState.prototype.mergeProperty = function (name, values) {
        var _a;
        var merge = (_a = {}, _a[name] = values, _a);
        return this.merge(merge);
    };
    PatchFormState.prototype.mergeIndexProperty = function (name, index, values) {
        var _a;
        var array = this.patch[name] !== undefined ? this.patch[name].slice() : [];
        var merge = (_a = {}, _a[name] = array, _a);
        array[index] = values;
        return this.merge(merge);
    };
    return PatchFormState;
}());
exports.PatchFormState = PatchFormState;
