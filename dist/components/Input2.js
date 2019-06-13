"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Input2 = /** @class */ (function (_super) {
    __extends(Input2, _super);
    function Input2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (evt) {
            var name = _this.props.name;
            var elementValue = evt.target.value;
            if (_this.props.onValue) {
                var merge = _this.props.onValue(name, elementValue);
                if (merge) {
                    _this.props.onFormStateChange(merge);
                }
            }
            else {
                var merge = {};
                merge[name] = elementValue;
                _this.props.onFormStateChange(merge);
            }
        };
        return _this;
    }
    Input2.prototype.render = function () {
        var _a = this.props, name = _a.name, formState = _a.formState, onValue = _a.onValue, onFormStateChange = _a.onFormStateChange, rest = __rest(_a, ["name", "formState", "onValue", "onFormStateChange"]);
        var value = formState.get(name);
        return (React.createElement("input", __assign({ onChange: this.onChange, value: value !== undefined ? value : '' }, rest)));
    };
    Input2.prototype.shouldComponentUpdate = function (nextProps) {
        var _a = this.props, name = _a.name, formState = _a.formState, onFormStateChange = _a.onFormStateChange, onValue = _a.onValue, rest = __rest(_a, ["name", "formState", "onFormStateChange", "onValue"]);
        var name_ = nextProps.name, formState_ = nextProps.formState, onFormStateChange_ = nextProps.onFormStateChange, onValue_ = nextProps.onValue, rest_ = __rest(nextProps, ["name", "formState", "onFormStateChange", "onValue"]);
        if (name !== name_) {
            return true;
        }
        if (formState.get(name) !== formState_.get(name)) {
            return true;
        }
        if (onFormStateChange !== onFormStateChange_) {
            return true;
        }
        if (onValue !== onValue_) {
            return true;
        }
        if (rest != rest_) {
            return true;
        }
        return false;
    };
    return Input2;
}(React.Component));
exports.default = Input2;
