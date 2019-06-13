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
var Child2 = /** @class */ (function (_super) {
    __extends(Child2, _super);
    function Child2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (change) {
            var _a;
            var formState = _this.props.formState.subProperty(_this.props.name, _this.props.defaultValue);
            var newFormState = formState.merge(change);
            var mergeUp = (_a = {}, _a[_this.props.name] = newFormState.getValues(), _a);
            _this.props.onFormStateChange(mergeUp);
        };
        return _this;
    }
    Child2.prototype.render = function () {
        var formState = this.props.formState.subProperty(this.props.name, this.props.defaultValue);
        if (!formState) {
            return this.props.renderEmpty ? this.props.renderEmpty() : null;
        }
        return this.props.render(formState, this.onChange);
    };
    Child2.prototype.shouldComponentUpdate = function (nextProps) {
        if (!this.props.formState.isSame(nextProps.formState)) {
            return true;
        }
        if (this.props.name !== nextProps.name) {
            return true;
        }
        if (this.props.defaultValue !== nextProps.defaultValue) {
            return true;
        }
        if (this.props.onFormStateChange !== nextProps.onFormStateChange) {
            return true;
        }
        if (this.props.render !== nextProps.render) {
            return true;
        }
        if (this.props.renderEmpty !== nextProps.renderEmpty) {
            return true;
        }
        return true;
    };
    return Child2;
}(React.Component));
exports.default = Child2;
