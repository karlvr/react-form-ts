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
var functions_1 = require("./functions");
/**
 * A class to assist with a form that creates an object.
 *
 * FORM is the type of the object to be populated.
 *
 * This object is immutable, so it is suitable to be put into a React component state.
 */
var SimpleFormState = /** @class */ (function () {
    function SimpleFormState(source) {
        this.form = source;
    }
    /**
     * Return the value of the given property.
     * @param name Property name
     */
    SimpleFormState.prototype.get = function (name, defaultValue) {
        var value = this.form[name];
        if (value !== undefined) {
            return value;
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
    SimpleFormState.prototype.set = function (name, value) {
        var _a;
        return this.merge((_a = {}, _a[name] = value, _a));
    };
    SimpleFormState.prototype.push = function (name, value) {
        var array = this.form[name];
        if (array) {
            array = array.slice();
        }
        else {
            array = [];
        }
        array.push(value);
        return this.set(name, array);
    };
    SimpleFormState.prototype.splice = function (name, start, deleteCount) {
        var values = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            values[_i - 3] = arguments[_i];
        }
        var array = this.form[name];
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
    SimpleFormState.prototype.apply = function (func) {
        var form = this.getValuesCopy();
        form = func(form);
        return new SimpleFormState(form);
    };
    /**
     * Return a new form state with the values from the given patch merged in to this state.
     * @param other A patch object
     */
    SimpleFormState.prototype.merge = function (other) {
        return new SimpleFormState(functions_1.mergeObjects(this.getValues(), other));
    };
    SimpleFormState.prototype.deepMerge = function (other) {
        return new SimpleFormState(functions_1.deepMergeObjects(this.getValues(), other));
    };
    /**
     * Returns a copy of the current patch state.
     */
    SimpleFormState.prototype.getValues = function () {
        return this.form;
    };
    SimpleFormState.prototype.getValuesCopy = function () {
        return __assign({}, this.form);
    };
    SimpleFormState.prototype.isSame = function (other) {
        return this.getValues() === other.getValues();
    };
    /**
     * Returns true if the patch is empty.
     */
    SimpleFormState.prototype.isEmpty = function () {
        if (!this.form) {
            return true;
        }
        for (var k in this.form) {
            if (this.form.hasOwnProperty(k)) {
                if (this.form[k] !== undefined) {
                    return false;
                }
            }
        }
        return true;
    };
    SimpleFormState.prototype.sub = function (func) {
        var form = this.getValues();
        var subform = func(form);
        return new SimpleFormState(subform);
    };
    SimpleFormState.prototype.subProperty = function (name, defaultValue) {
        var form = this.getValues();
        if (form[name] !== undefined) {
            return new SimpleFormState(form[name]);
        }
        else if (defaultValue !== undefined) {
            return new SimpleFormState(defaultValue);
        }
        else {
            return undefined;
        }
    };
    SimpleFormState.prototype.subIndexProperty = function (name, index) {
        var form = this.getValues();
        var array = form[name];
        if (array !== undefined) {
            var value = array[index];
            if (value !== undefined) {
                return new SimpleFormState(array[index]);
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    };
    SimpleFormState.prototype.mergeProperty = function (name, values) {
        var _a;
        var merge = (_a = {}, _a[name] = values, _a);
        return this.merge(merge);
    };
    SimpleFormState.prototype.mergeIndexProperty = function (name, index, values) {
        var _a;
        var merge = (_a = {}, _a[name] = (this.form[name] ? this.form[name] : []).slice(), _a);
        var array = merge[name];
        array[index] = values;
        return this.merge(merge);
    };
    return SimpleFormState;
}());
exports.SimpleFormState = SimpleFormState;
