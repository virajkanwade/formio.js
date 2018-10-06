"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  label: 'Button',
  title: 'Button',
  tableView: true,
  type: 'panel',
  input: true,
  key: 'panel',
  weight: 21,
  components: [{
    type: 'textfield',
    input: true,
    key: 'buttonLabel',
    label: 'Label',
    weight: 21
  }, {
    type: 'textfield',
    key: 'buttonLeftIcon',
    label: 'Left Icon',
    input: true,
    placeholder: 'Enter icon classes',
    tooltip: "This is the full icon class string to show the icon. Example: 'fa fa-plus'",
    weight: 22
  }, {
    type: 'textfield',
    key: 'buttonRightIcon',
    label: 'Right Icon',
    input: true,
    placeholder: 'Enter icon classes',
    tooltip: "This is the full icon class string to show the icon. Example: 'fa fa-plus'",
    weight: 23
  }]
}];
exports.default = _default;