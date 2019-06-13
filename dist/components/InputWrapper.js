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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var InputWrapper = /** @class */ (function (_super) {
    __extends(InputWrapper, _super);
    function InputWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onValueChange = function (newValue) {
            if (_this.props.onValue) {
                var newFormState = _this.props.onValue(name, newValue);
                if (newFormState) {
                    _this.props.onNewFormState(newFormState, name);
                }
            }
            else {
                _this.props.onNewFormState(_this.props.formState.set(_this.props.name, newValue), name);
            }
        };
        return _this;
    }
    InputWrapper.prototype.render = function () {
        var _a = this.props, name = _a.name, formState = _a.formState, onNewFormState = _a.onNewFormState, onValue = _a.onValue;
        var value = formState.get(name);
        return this.props.children(value, this.onValueChange);
    };
    return InputWrapper;
}(React.Component));
exports.default = InputWrapper;
