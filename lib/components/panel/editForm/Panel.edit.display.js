"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  key: 'label',
  hidden: true,
  calculateValue: 'value = data.title'
}, {
  weight: 1,
  type: 'textfield',
  input: true,
  placeholder: 'Panel Title',
  label: 'Title',
  key: 'title',
  tooltip: 'The title text that appears in the header of this panel.'
}, {
  weight: 20,
  type: 'textarea',
  input: true,
  key: 'tooltip',
  label: 'Tooltip',
  placeholder: 'To add a tooltip to this field, enter text here.',
  tooltip: 'Adds a tooltip to the side of this field.'
}, {
  weight: 30,
  type: 'select',
  input: true,
  label: 'Theme',
  key: 'theme',
  dataSrc: 'values',
  data: {
    values: [{
      label: 'Default',
      value: 'default'
    }, {
      label: 'Primary',
      value: 'primary'
    }, {
      label: 'Info',
      value: 'info'
    }, {
      label: 'Success',
      value: 'success'
    }, {
      label: 'Danger',
      value: 'danger'
    }, {
      label: 'Warning',
      value: 'warning'
    }]
  }
}, {
  weight: 40,
  type: 'select',
  input: true,
  label: 'Show Breadcrumb',
  key: 'breadcrumb',
  dataSrc: 'values',
  data: {
    values: [{
      label: 'Yes',
      value: 'default'
    }, {
      label: 'No',
      value: 'none'
    }]
  }
}, {
  weight: 650,
  type: 'checkbox',
  label: 'Collapsible',
  tooltip: 'If checked, this will turn this Panel into a collapsible panel.',
  key: 'collapsible',
  input: true
}, {
  weight: 651,
  type: 'checkbox',
  label: 'Initially Collapsed',
  tooltip: 'Determines the initial collapsed state of this Panel.',
  key: 'collapsed',
  input: true,
  conditional: {
    json: {
      '===': [{
        var: 'data.collapsible'
      }, true]
    }
  }
}];
exports.default = _default;