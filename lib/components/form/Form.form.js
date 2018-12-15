"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _NestedComponent = _interopRequireDefault(require("../nested/NestedComponent.form"));

var _FormEdit = _interopRequireDefault(require("./editForm/Form.edit.form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _NestedComponent.default.apply(void 0, [[{
    label: 'Form',
    key: 'form',
    weight: 10,
    components: _FormEdit.default
  }]].concat(extend));
}