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
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onNewFormState = function (index, newState, name) {
            if (newState === undefined) {
                _this.props.onNewFormState(_this.props.formState.splice(_this.props.name, index, 1));
                return;
            }
            var values = newState.getValues();
            if (_this.props.processChange) {
                var processedValues = _this.props.processChange(index, values, name);
                if (!processedValues) {
                    return;
                }
                values = processedValues;
            }
            _this.props.onNewFormState(_this.props.formState.mergeIndexProperty(_this.props.name, index, values));
        };
        return _this;
    }
    List.prototype.render = function () {
        var _this = this;
        var array = this.props.formState.get(this.props.name);
        if (!array) {
            return this.props.renderEmpty ? this.props.renderEmpty() : null;
        }
        var count = 0;
        var startIndex = this.props.start !== undefined ? this.props.start : 0;
        var endIndex = this.props.howMany !== undefined ? startIndex + this.props.howMany : array.length;
        if (startIndex >= endIndex) {
            return this.props.renderEmpty ? this.props.renderEmpty() : null;
        }
        return (React.createElement(React.Fragment, null,
            this.props.renderBefore && this.props.renderBefore(),
            array.map(function (el, index) {
                if (index < startIndex || index >= endIndex) {
                    return;
                }
                var formState = _this.props.formState.subIndexProperty(_this.props.name, index);
                var info = {
                    index: index,
                    count: count,
                    first: count === 0,
                    last: index === endIndex - 1,
                };
                count += 1;
                return _this.props.render(info, formState, _this.onNewFormState.bind(_this, index));
            }),
            this.props.renderAfter && this.props.renderAfter()));
    };
    return List;
}(React.Component));
exports.default = List;
