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
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onNewFormState = function (newState) {
            _this.props.onNewFormState(_this.props.formState.mergeProperty(_this.props.name, newState.getValues()));
        };
        return _this;
    }
    Child.prototype.render = function () {
        var formState = this.props.formState.subProperty(this.props.name, this.props.defaultValue);
        if (!formState) {
            return this.props.renderEmpty ? this.props.renderEmpty() : null;
        }
        return this.props.render(formState, this.onNewFormState);
    };
    return Child;
}(React.Component));
exports.default = Child;
