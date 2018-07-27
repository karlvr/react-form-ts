"use strict";
/**
 * A class to assist with a form that creates an object.
 *
 * FORM is the type of the object to be populated.
 *
 * This object is immutable, so it is suitable to be put into a React component state.
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        var form = __assign({}, this.form, (_a = {}, _a[name] = value, _a));
        return new SimpleFormState(form);
    };
    SimpleFormState.prototype.apply = function (func) {
        var form = this.getValues();
        form = func(form);
        return new SimpleFormState(form);
    };
    /**
     * Return a new form state with the values from the given patch merged in to this state.
     * @param other A patch object
     */
    SimpleFormState.prototype.merge = function (other) {
        var working = this;
        for (var k in other) {
            if (other.hasOwnProperty(k)) {
                /* tslint:disable-next-line:no-any */
                working = working.set(k, other[k]);
            }
        }
        return working;
    };
    /**
     * Returns a copy of the current patch state.
     */
    SimpleFormState.prototype.getValues = function () {
        return __assign({}, this.form);
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
    SimpleFormState.prototype.subProperty = function (name) {
        var form = this.getValues();
        return new SimpleFormState(form[name]);
    };
    SimpleFormState.prototype.subIndexProperty = function (name, index) {
        var form = this.getValues();
        /* tslint:disable-next-line:no-any */
        var array = form[name];
        return new SimpleFormState(array[index]);
    };
    SimpleFormState.prototype.mergeProperty = function (name, values) {
        var _a;
        var merge = (_a = {}, _a[name] = values, _a);
        return this.merge(merge);
    };
    SimpleFormState.prototype.mergeIndexProperty = function (name, index, values) {
        var _a;
        /* tslint:disable-next-line:no-any */
        var merge = (_a = {}, _a[name] = this.form[name].slice(), _a);
        var array = merge[name];
        array[index] = values;
        return this.merge(merge);
    };
    return SimpleFormState;
}());
exports.SimpleFormState = SimpleFormState;
