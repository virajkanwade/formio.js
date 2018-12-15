"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Base = _interopRequireDefault(require("../base/Base.form"));

var _DayEdit = _interopRequireDefault(require("./editForm/Day.edit.display"));

var _DayEdit2 = _interopRequireDefault(require("./editForm/Day.edit.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Base.default.apply(void 0, [[{
    key: 'display',
    components: _DayEdit.default
  }, {
    key: 'validation',
    components: _DayEdit2.default
  }]].concat(extend));
}