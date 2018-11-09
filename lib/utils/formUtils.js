"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLayoutComponent = isLayoutComponent;
exports.eachComponent = eachComponent;
exports.matchComponent = matchComponent;
exports.getComponent = getComponent;
exports.findComponents = findComponents;
exports.flattenComponents = flattenComponents;
exports.hasCondition = hasCondition;
exports.parseFloatExt = parseFloatExt;
exports.formatAsCurrency = formatAsCurrency;
exports.escapeRegExCharacters = escapeRegExCharacters;
exports.getValue = getValue;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/web.dom.iterable");

var _get = _interopRequireDefault(require("lodash/get"));

var _has = _interopRequireDefault(require("lodash/has"));

var _clone = _interopRequireDefault(require("lodash/clone"));

var _forOwn = _interopRequireDefault(require("lodash/forOwn"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _isNaN = _interopRequireDefault(require("lodash/isNaN"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _round = _interopRequireDefault(require("lodash/round"));

var _chunk = _interopRequireDefault(require("lodash/chunk"));

var _pad = _interopRequireDefault(require("lodash/pad"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Determine if a component is a layout component or not.
 *
 * @param {Object} component
 *   The component to check.
 *
 * @returns {Boolean}
 *   Whether or not the component is a layout component.
 */
function isLayoutComponent(component) {
  return Boolean(component.columns && Array.isArray(component.columns) || component.rows && Array.isArray(component.rows) || component.components && Array.isArray(component.components));
}
/**
 * Iterate through each component within a form.
 *
 * @param {Object} components
 *   The components to iterate.
 * @param {Function} fn
 *   The iteration function to invoke for each component.
 * @param {Boolean} includeAll
 *   Whether or not to include layout components.
 * @param {String} path
 *   The current data path of the element. Example: data.user.firstName
 * @param {Object} parent
 *   The parent object.
 */


function eachComponent(components, fn, includeAll, path, parent) {
  if (!components) return;
  path = path || '';
  components.forEach(function (component) {
    if (!component) {
      return;
    }

    var hasColumns = component.columns && Array.isArray(component.columns);
    var hasRows = component.rows && Array.isArray(component.rows);
    var hasComps = component.components && Array.isArray(component.components);
    var noRecurse = false;
    var newPath = component.key ? path ? "".concat(path, ".").concat(component.key) : component.key : ''; // Keep track of parent references.

    if (parent) {
      // Ensure we don't create infinite JSON structures.
      component.parent = (0, _clone.default)(parent);
      delete component.parent.components;
      delete component.parent.componentMap;
      delete component.parent.columns;
      delete component.parent.rows;
    }

    if (includeAll || component.tree || !hasColumns && !hasRows && !hasComps) {
      noRecurse = fn(component, newPath);
    }

    var subPath = function subPath() {
      if (component.key && !['panel', 'table', 'well', 'columns', 'fieldset', 'tabs', 'form'].includes(component.type) && (['datagrid', 'container', 'editgrid'].includes(component.type) || component.tree)) {
        return newPath;
      } else if (component.key && component.type === 'form') {
        return "".concat(newPath, ".data");
      }

      return path;
    };

    if (!noRecurse) {
      if (hasColumns) {
        component.columns.forEach(function (column) {
          return eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null);
        });
      } else if (hasRows) {
        component.rows.forEach(function (row) {
          if (Array.isArray(row)) {
            row.forEach(function (column) {
              return eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null);
            });
          }
        });
      } else if (hasComps) {
        eachComponent(component.components, fn, includeAll, subPath(), parent ? component : null);
      }
    }
  });
}
/**
 * Matches if a component matches the query.
 *
 * @param component
 * @param query
 * @return {boolean}
 */


function matchComponent(component, query) {
  if ((0, _isString.default)(query)) {
    return component.key === query;
  } else {
    var matches = false;
    (0, _forOwn.default)(query, function (value, key) {
      matches = (0, _get.default)(component, key) === value;

      if (!matches) {
        return false;
      }
    });
    return matches;
  }
}
/**
 * Get a component by its key
 *
 * @param {Object} components
 *   The components to iterate.
 * @param {String|Object} key
 *   The key of the component to get, or a query of the component to search.
 *
 * @returns {Object}
 *   The component that matches the given key, or undefined if not found.
 */


function getComponent(components, key, includeAll) {
  var result;
  eachComponent(components, function (component, path) {
    if (path === key) {
      component.path = path;
      result = component;
      return true;
    }
  }, includeAll);
  return result;
}
/**
 * Finds a component provided a query of properties of that component.
 *
 * @param components
 * @param query
 * @return {*}
 */


function findComponents(components, query) {
  var results = [];
  eachComponent(components, function (component, path) {
    if (matchComponent(component, query)) {
      component.path = path;
      results.push(component);
    }
  }, true);
  return results;
}
/**
 * Flatten the form components for data manipulation.
 *
 * @param {Object} components
 *   The components to iterate.
 * @param {Boolean} includeAll
 *   Whether or not to include layout components.
 *
 * @returns {Object}
 *   The flattened components map.
 */


function flattenComponents(components, includeAll) {
  var flattened = {};
  eachComponent(components, function (component, path) {
    flattened[path] = component;
  }, includeAll);
  return flattened;
}
/**
 * Returns if this component has a conditional statement.
 *
 * @param component - The component JSON schema.
 *
 * @returns {boolean} - TRUE - This component has a conditional, FALSE - No conditional provided.
 */


function hasCondition(component) {
  return Boolean(component.customConditional || component.conditional && component.conditional.when || component.conditional && component.conditional.json);
}
/**
 * Extension of standard #parseFloat(value) function, that also clears input string.
 *
 * @param {any} value
 *   The value to parse.
 *
 * @returns {Number}
 *   Parsed value.
 */


function parseFloatExt(value) {
  return parseFloat((0, _isString.default)(value) ? value.replace(/[^\de.+-]/gi, '') : value);
}
/**
 * Formats provided value in way how Currency component uses it.
 *
 * @param {any} value
 *   The value to format.
 *
 * @returns {String}
 *   Value formatted for Currency component.
 */


function formatAsCurrency(value) {
  var parsedValue = parseFloatExt(value);

  if ((0, _isNaN.default)(parsedValue)) {
    return '';
  }

  var parts = (0, _round.default)(parsedValue, 2).toString().split('.');
  parts[0] = (0, _chunk.default)(Array.from(parts[0]).reverse(), 3).reverse().map(function (part) {
    return part.reverse().join('');
  }).join(',');
  parts[1] = (0, _pad.default)(parts[1], 2, '0');
  return parts.join('.');
}
/**
 * Escapes RegEx characters in provided String value.
 *
 * @param {String} value
 *   String for escaping RegEx characters.
 * @returns {string}
 *   String with escaped RegEx characters.
 */


function escapeRegExCharacters(value) {
  return value.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}
/**
 * Get the value for a component key, in the given submission.
 *
 * @param {Object} submission
 *   A submission object to search.
 * @param {String} key
 *   A for components API key to search for.
 */


function getValue(submission, key) {
  var search = function search(data) {
    if ((0, _isPlainObject.default)(data)) {
      if ((0, _has.default)(data, key)) {
        return data[key];
      }

      var value = null;
      (0, _forOwn.default)(data, function (prop) {
        var result = search(prop);

        if (!(0, _isNil.default)(result)) {
          value = result;
          return false;
        }
      });
      return value;
    } else {
      return null;
    }
  };

  return search(submission.data);
}