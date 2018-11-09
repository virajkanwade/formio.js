"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.find-index");

var _lodash = _interopRequireDefault(require("lodash"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _utils = require("../../utils/utils");

var _Base = _interopRequireDefault(require("../base/Base"));

var _Components = _interopRequireDefault(require("../Components"));

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

var NestedComponent =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(NestedComponent, _BaseComponent);

  _createClass(NestedComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.default.schema.apply(_Base.default, [{}].concat(extend));
    }
  }]);

  function NestedComponent(component, options, data) {
    var _this;

    _classCallCheck(this, NestedComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NestedComponent).call(this, component, options, data));
    _this.type = 'components';
    _this.components = [];
    _this.hidden = [];
    _this.collapsed = !!_this.component.collapsed;
    return _this;
  }

  _createClass(NestedComponent, [{
    key: "build",
    value: function build(state, showLabel) {
      this.createElement();

      if (showLabel) {
        this.createLabel(this.element);
      }

      this.addComponents(null, null, null, state);
      this.attachLogic();
    }
  }, {
    key: "getComponents",
    value: function getComponents() {
      return this.components;
    }
  }, {
    key: "getAllComponents",
    value: function getAllComponents() {
      return this.getComponents().reduce(function (components, component) {
        var result = component;

        if (component && component.getAllComponents) {
          result = component.getAllComponents();
        }

        return components.concat(result);
      }, []);
    }
    /**
     * Perform a deep iteration over every component, including those
     * within other container based components.
     *
     * @param {function} fn - Called for every component.
     */

  }, {
    key: "everyComponent",
    value: function everyComponent(fn) {
      var components = this.getComponents();

      _lodash.default.each(components, function (component, index) {
        if (fn(component, components, index) === false) {
          return false;
        }

        if (typeof component.everyComponent === 'function') {
          if (component.everyComponent(fn) === false) {
            return false;
          }
        }
      });
    }
    /**
     * Perform an iteration over each component within this container component.
     *
     * @param {function} fn - Called for each component
     */

  }, {
    key: "eachComponent",
    value: function eachComponent(fn) {
      _lodash.default.each(this.getComponents(), function (component, index) {
        if (fn(component, index) === false) {
          return false;
        }
      });
    }
    /**
     * Returns a component provided a key. This performs a deep search within the
     * component tree.
     *
     * @param {string} key - The key of the component to retrieve.
     * @param {function} fn - Called with the component once found.
     * @return {Object} - The component that is located.
     */

  }, {
    key: "getComponent",
    value: function getComponent(key, fn) {
      var comp = null;
      this.everyComponent(function (component, components) {
        if (component.component.key === key) {
          comp = component;

          if (fn) {
            fn(component, components);
          }

          return false;
        }
      });
      return comp;
    }
    /**
     * Return a component provided the Id of the component.
     *
     * @param {string} id - The Id of the component.
     * @param {function} fn - Called with the component once it is retrieved.
     * @return {Object} - The component retrieved.
     */

  }, {
    key: "getComponentById",
    value: function getComponentById(id, fn) {
      var comp = null;
      this.everyComponent(function (component, components) {
        if (component.id === id) {
          comp = component;

          if (fn) {
            fn(component, components);
          }

          return false;
        }
      });
      return comp;
    }
    /**
     * Create a new component and add it to the components array.
     *
     * @param component
     * @param data
     */

  }, {
    key: "createComponent",
    value: function createComponent(component, options, data, before, state) {
      options = options || this.options;
      data = data || this.data;

      var comp = _Components.default.create(component, options, data, true);

      comp.parent = this;
      comp.root = this.root || this;
      comp.build(state);
      comp.isBuilt = true;

      if (component.internal) {
        return comp;
      }

      if (before) {
        var index = _lodash.default.findIndex(this.components, {
          id: before.id
        });

        if (index !== -1) {
          this.components.splice(index, 0, comp);
        } else {
          this.components.push(comp);
        }
      } else {
        this.components.push(comp);
      }

      return comp;
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.element;
    }
    /**
     * Add a new component to the components array.
     *
     * @param {Object} component - The component JSON schema to add.
     * @param {HTMLElement} element - The DOM element to append this child to.
     * @param {Object} data - The submission data object to house the data for this component.
     * @param {HTMLElement} before - A DOM element to insert this element before.
     * @param {Boolean} noAdd - If this component should just be created and not added to this nested component.
     * @param {Object} state - The state of the component getting created.
     * @return {BaseComponent} - The created component instance.
     */

  }, {
    key: "addComponent",
    value: function addComponent(component, element, data, before, noAdd, state) {
      element = element || this.getContainer();
      data = data || this.data;
      var comp = this.createComponent(component, this.options, data, before ? before.component : null, state);

      if (noAdd) {
        return comp;
      }

      element = this.hook('addComponent', element, comp, this);
      var compElement = comp.getElement();

      if (!compElement) {
        console.warn("Component ".concat(component.key, " has no element."));
        return comp;
      }

      if (before) {
        element.insertBefore(compElement, before);
      } else {
        element.appendChild(compElement);
      }

      this.setHidden(comp);
      return comp;
    }
    /**
     * Remove a component from the components array.
     *
     * @param {BaseComponent} component - The component to remove from the components.
     * @param {Array<BaseComponent>} components - An array of components to remove this component from.
     */

  }, {
    key: "removeComponent",
    value: function removeComponent(component, components) {
      components = components || this.components;
      var state = component.destroy();
      var element = component.getElement();

      if (element && element.parentNode) {
        this.removeChildFrom(element, element.parentNode);
      }

      _lodash.default.remove(components, {
        id: component.id
      });

      return state;
    }
    /**
     * Removes a component provided the API key of that component.
     *
     * @param {string} key - The API key of the component to remove.
     * @param {function} fn - Called once the component is removed.
     * @return {null}
     */

  }, {
    key: "removeComponentByKey",
    value: function removeComponentByKey(key, fn) {
      var _this2 = this;

      var comp = this.getComponent(key, function (component, components) {
        _this2.removeComponent(component, components);

        if (fn) {
          fn(component, components);
        }
      });

      if (!comp) {
        if (fn) {
          fn(null);
        }

        return null;
      }
    }
    /**
     * Removes a component provided the Id of the component.
     *
     * @param {string} id - The Id of the component to remove.
     * @param {function} fn - Called when the component is removed.
     * @return {null}
     */

  }, {
    key: "removeComponentById",
    value: function removeComponentById(id, fn) {
      var _this3 = this;

      var comp = this.getComponentById(id, function (component, components) {
        _this3.removeComponent(component, components);

        if (fn) {
          fn(component, components);
        }
      });

      if (!comp) {
        if (fn) {
          fn(null);
        }

        return null;
      }
    }
  }, {
    key: "addComponents",

    /**
     *
     * @param element
     * @param data
     */
    value: function addComponents(element, data, options, state) {
      var _this4 = this;

      element = element || this.getContainer();
      data = data || this.data;
      options = options || this.options;
      state = state || {};

      if (options.components) {
        this.components = options.components;
      } else {
        var components = this.hook('addComponents', this.componentComponents, this) || [];
        components.forEach(function (component) {
          var compState = {};

          if (state && state.components && state.components[component.key]) {
            compState = state.components[component.key];
          }

          _this4.addComponent(component, element, data, null, null, compState);
        });
      }
    }
  }, {
    key: "updateValue",
    value: function updateValue(flags) {
      return this.components.reduce(function (changed, comp) {
        return comp.updateValue(flags) || changed;
      }, false);
    }
  }, {
    key: "hasChanged",
    value: function hasChanged() {
      return false;
    }
    /**
     * A more performant way to check the conditions, calculations, and validity of
     * a submission once it has been changed.
     *
     * @param data
     * @param flags
     */

  }, {
    key: "checkData",
    value: function checkData(data, flags) {
      flags = flags || {};
      var valid = true;

      if (flags.noCheck) {
        return;
      } // Update the value.


      var changed = this.updateValue({
        noUpdateEvent: true
      }); // Iterate through all components and check conditions, and calculate values.

      this.getComponents().forEach(function (comp) {
        changed |= comp.calculateValue(data, {
          noUpdateEvent: true
        });
        comp.checkConditions(data);

        if (!flags.noValidate) {
          valid &= comp.checkValidity(data);
        }
      }); // Trigger the change if the values changed.

      if (changed) {
        this.triggerChange(flags);
      } // Return if the value is valid.


      return valid;
    }
  }, {
    key: "checkConditions",
    value: function checkConditions(data) {
      this.getComponents().forEach(function (comp) {
        return comp.checkConditions(data);
      });
      return _get(_getPrototypeOf(NestedComponent.prototype), "checkConditions", this).call(this, data);
    }
  }, {
    key: "clearOnHide",
    value: function clearOnHide(show) {
      _get(_getPrototypeOf(NestedComponent.prototype), "clearOnHide", this).call(this, show);

      this.getComponents().forEach(function (component) {
        return component.clearOnHide(show);
      });
    }
  }, {
    key: "show",
    value: function show(_show) {
      var shown = _get(_getPrototypeOf(NestedComponent.prototype), "show", this).call(this, _show);

      var forceShow = this.options.show && this.options.show[this.component.key];
      var forceHide = this.options.hide && this.options.hide[this.component.key];

      if (forceShow || forceHide) {
        this.getComponents().forEach(function (component) {
          if (forceShow) {
            component.show(true);
          } else if (forceHide) {
            component.show(false);
          }
        });
      } // If hiding a nested component, clear all errors below.


      if (!shown) {
        this.getAllComponents().forEach(function (component) {
          component.error = '';
        });
      }

      return shown;
    }
    /**
     * Allow components to hook into the next page trigger to perform their own logic.
     *
     * @return {*}
     */

  }, {
    key: "beforeNext",
    value: function beforeNext() {
      return _nativePromiseOnly.default.all(this.getComponents().map(function (comp) {
        return comp.beforeNext();
      }));
    }
    /**
     * Allow components to hook into the submission to provide their own async data.
     *
     * @return {*}
     */

  }, {
    key: "beforeSubmit",
    value: function beforeSubmit() {
      return _nativePromiseOnly.default.all(this.getComponents().map(function (comp) {
        return comp.beforeSubmit();
      }));
    }
  }, {
    key: "calculateValue",
    value: function calculateValue(data, flags) {
      // Do not iterate into children and calculateValues if this nested component is conditionally hidden.
      if (!this.conditionallyVisible()) {
        return false;
      }

      return this.getComponents().reduce(function (changed, comp) {
        return comp.calculateValue(data, flags) || changed;
      }, _get(_getPrototypeOf(NestedComponent.prototype), "calculateValue", this).call(this, data, flags));
    }
  }, {
    key: "isValid",
    value: function isValid(data, dirty) {
      return this.getComponents().reduce(function (valid, comp) {
        return comp.isValid(data, dirty) && valid;
      }, _get(_getPrototypeOf(NestedComponent.prototype), "isValid", this).call(this, data, dirty));
    }
  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty) {
      if (!(0, _utils.checkCondition)(this.component, data, this.data, this.root ? this.root._form : {}, this)) {
        this.setCustomValidity('');
        return true;
      }

      return this.getComponents().reduce(function (check, comp) {
        return comp.checkValidity(data, dirty) && check;
      }, _get(_getPrototypeOf(NestedComponent.prototype), "checkValidity", this).call(this, data, dirty));
    }
  }, {
    key: "setPristine",
    value: function setPristine(pristine) {
      _get(_getPrototypeOf(NestedComponent.prototype), "setPristine", this).call(this, pristine);

      this.getComponents().forEach(function (comp) {
        return comp.setPristine(pristine);
      });
    }
    /**
     * Destroys this component.
     *
     * @param state
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var state = _get(_getPrototypeOf(NestedComponent.prototype), "destroy", this).call(this) || {};
      this.destroyComponents(state);
      return state;
    }
  }, {
    key: "destroyComponents",
    value: function destroyComponents(state) {
      var _this5 = this;

      state = state || {};
      state.components = state.components || {};
      var components = this.components.slice();
      components.forEach(function (comp) {
        var compState = _this5.removeComponent(comp, _this5.components);

        if (comp.key && compState) {
          state.components[comp.key] = compState;
        }
      });
      this.components = [];
      this.hidden = [];
      return state;
    }
  }, {
    key: "setHidden",
    value: function setHidden(component) {
      if (component.component.hidden || this.hidden && this.hidden.includes(component.key) || !component.conditionallyVisible()) {
        component.show(false, true);
      }
    }
  }, {
    key: "hideComponents",
    value: function hideComponents(hidden) {
      var _this6 = this;

      this.hidden = hidden;
      this.eachComponent(function (component) {
        return _this6.setHidden(component);
      });
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.data;
    }
  }, {
    key: "resetValue",
    value: function resetValue() {
      this.getComponents().forEach(function (comp) {
        return comp.resetValue();
      });

      _lodash.default.unset(this.data, this.key);

      this.setPristine(true);
    }
  }, {
    key: "setNestedValue",
    value: function setNestedValue(component, value, flags, changed) {
      if (component.type === 'button') {
        return false;
      }

      if (component.type === 'components') {
        return component.setValue(value, flags) || changed;
      } else if (value && component.hasValue(value)) {
        return component.setValue(_lodash.default.get(value, component.key), flags) || changed;
      } else {
        flags.noValidate = true;
        return component.setValue(component.defaultValue, flags) || changed;
      }
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      var _this7 = this;

      if (!value) {
        return false;
      }

      flags = this.getFlags.apply(this, arguments);
      return this.getComponents().reduce(function (changed, component) {
        return _this7.setNestedValue(component, value, flags, changed);
      }, false);
    }
  }, {
    key: "setCollapseHeader",
    value: function setCollapseHeader(header) {
      var _this8 = this;

      if (this.component.collapsible) {
        this.addClass(header, 'formio-clickable');
        this.addEventListener(header, 'click', function () {
          return _this8.toggleCollapse();
        });
      }
    }
  }, {
    key: "setCollapsed",
    value: function setCollapsed(element) {
      if (!this.component.collapsible || this.options.builder) {
        return;
      }

      var container = element || this.getContainer();

      if (this.collapsed) {
        container.setAttribute('hidden', true);
        container.style.visibility = 'hidden';
      } else {
        container.removeAttribute('hidden');
        container.style.visibility = 'visible';
      }
    }
  }, {
    key: "toggleCollapse",
    value: function toggleCollapse() {
      this.collapsed = !this.collapsed;
      this.setCollapsed();
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return NestedComponent.schema();
    }
  }, {
    key: "schema",
    get: function get() {
      var schema = _get(_getPrototypeOf(NestedComponent.prototype), "schema", this);

      schema.components = [];
      this.eachComponent(function (component) {
        return schema.components.push(component.schema);
      });
      return schema;
    }
  }, {
    key: "componentComponents",
    get: function get() {
      return this.component.components;
    }
  }, {
    key: "disabled",
    set: function set(disabled) {
      this.components.forEach(function (component) {
        return component.disabled = disabled;
      });
    }
  }, {
    key: "errors",
    get: function get() {
      return this.getAllComponents().reduce(function (errors, comp) {
        return errors.concat(comp.errors || []);
      }, []);
    }
  }, {
    key: "dataReady",
    get: function get() {
      return _nativePromiseOnly.default.all(this.getComponents().map(function (component) {
        return component.dataReady;
      }));
    }
  }]);

  return NestedComponent;
}(_Base.default);

exports.default = NestedComponent;