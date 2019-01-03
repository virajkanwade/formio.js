"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/web.dom.iterable");

var _lodash = _interopRequireDefault(require("lodash"));

var _NestedComponent2 = _interopRequireDefault(require("../nested/NestedComponent"));

var _Base = _interopRequireDefault(require("../base/Base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ContainerComponent =
/*#__PURE__*/
function (_NestedComponent) {
  _inherits(ContainerComponent, _NestedComponent);

  _createClass(ContainerComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedComponent2.default.schema.apply(_NestedComponent2.default, [{
        label: 'Container',
        type: 'container',
        key: 'container',
        clearOnHide: true,
        input: true,
        tree: true,
        components: []
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Container',
        icon: 'fa fa-folder-open',
        group: 'data',
        documentation: 'http://help.form.io/userguide/#container',
        weight: 10,
        schema: ContainerComponent.schema()
      };
    }
  }]);

  function ContainerComponent(component, options, data) {
    var _this;

    _classCallCheck(this, ContainerComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContainerComponent).call(this, component, options, data));
    _this.type = 'container';
    return _this;
  }

  _createClass(ContainerComponent, [{
    key: "build",
    value: function build(state) {
      this.createElement();
      var labelAtTheBottom = this.component.labelPosition === 'bottom';

      if (!labelAtTheBottom) {
        this.createLabel(this.element);
      }

      if (!this.hasValue()) {
        this.dataValue = {};
      }

      this.addComponents(this.getContainer(), this.dataValue, null, state);

      if (labelAtTheBottom) {
        this.createLabel(this.element);
      }

      this.attachLogic();
    }
  }, {
    key: "hasChanged",
    value: function hasChanged(before, after) {
      return !_lodash.default.isEqual(before, after);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: "updateValue",
    value: function updateValue(flags, value) {
      // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
      return _Base.default.prototype.updateValue.call(this, flags, value);
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      var _this2 = this;

      flags = this.getFlags.apply(this, arguments);

      if (!value || !_lodash.default.isObject(value)) {
        return;
      }

      var hasValue = this.hasValue();

      if (hasValue && _lodash.default.isEmpty(this.dataValue)) {
        flags.noValidate = true;
      }

      if (!hasValue) {
        // Set the data value and then reset each component to use the new data object.
        this.dataValue = {};
        this.getComponents().forEach(function (component) {
          return component.data = _this2.dataValue;
        });
      }

      return _get(_getPrototypeOf(ContainerComponent.prototype), "setValue", this).call(this, value, flags);
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return ContainerComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return {};
    }
  }]);

  return ContainerComponent;
}(_NestedComponent2.default);

exports.default = ContainerComponent;