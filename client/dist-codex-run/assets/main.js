var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../genAI-LBS-G5/node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS({
  "../../genAI-LBS-G5/node_modules/react/cjs/react.production.min.js"(exports) {
    "use strict";
    var l2 = /* @__PURE__ */ Symbol.for("react.element");
    var n2 = /* @__PURE__ */ Symbol.for("react.portal");
    var p2 = /* @__PURE__ */ Symbol.for("react.fragment");
    var q2 = /* @__PURE__ */ Symbol.for("react.strict_mode");
    var r2 = /* @__PURE__ */ Symbol.for("react.profiler");
    var t2 = /* @__PURE__ */ Symbol.for("react.provider");
    var u2 = /* @__PURE__ */ Symbol.for("react.context");
    var v2 = /* @__PURE__ */ Symbol.for("react.forward_ref");
    var w2 = /* @__PURE__ */ Symbol.for("react.suspense");
    var x2 = /* @__PURE__ */ Symbol.for("react.memo");
    var y2 = /* @__PURE__ */ Symbol.for("react.lazy");
    var z2 = Symbol.iterator;
    function A2(a2) {
      if (null === a2 || "object" !== typeof a2) return null;
      a2 = z2 && a2[z2] || a2["@@iterator"];
      return "function" === typeof a2 ? a2 : null;
    }
    var B2 = { isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } };
    var C2 = Object.assign;
    var D2 = {};
    function E2(a2, b2, e3) {
      this.props = a2;
      this.context = b2;
      this.refs = D2;
      this.updater = e3 || B2;
    }
    E2.prototype.isReactComponent = {};
    E2.prototype.setState = function(a2, b2) {
      if ("object" !== typeof a2 && "function" !== typeof a2 && null != a2) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, a2, b2, "setState");
    };
    E2.prototype.forceUpdate = function(a2) {
      this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
    };
    function F2() {
    }
    F2.prototype = E2.prototype;
    function G2(a2, b2, e3) {
      this.props = a2;
      this.context = b2;
      this.refs = D2;
      this.updater = e3 || B2;
    }
    var H2 = G2.prototype = new F2();
    H2.constructor = G2;
    C2(H2, E2.prototype);
    H2.isPureReactComponent = true;
    var I2 = Array.isArray;
    var J2 = Object.prototype.hasOwnProperty;
    var K2 = { current: null };
    var L2 = { key: true, ref: true, __self: true, __source: true };
    function M2(a2, b2, e3) {
      var d2, c2 = {}, k2 = null, h2 = null;
      if (null != b2) for (d2 in void 0 !== b2.ref && (h2 = b2.ref), void 0 !== b2.key && (k2 = "" + b2.key), b2) J2.call(b2, d2) && !L2.hasOwnProperty(d2) && (c2[d2] = b2[d2]);
      var g2 = arguments.length - 2;
      if (1 === g2) c2.children = e3;
      else if (1 < g2) {
        for (var f2 = Array(g2), m2 = 0; m2 < g2; m2++) f2[m2] = arguments[m2 + 2];
        c2.children = f2;
      }
      if (a2 && a2.defaultProps) for (d2 in g2 = a2.defaultProps, g2) void 0 === c2[d2] && (c2[d2] = g2[d2]);
      return { $$typeof: l2, type: a2, key: k2, ref: h2, props: c2, _owner: K2.current };
    }
    function N2(a2, b2) {
      return { $$typeof: l2, type: a2.type, key: b2, ref: a2.ref, props: a2.props, _owner: a2._owner };
    }
    function O2(a2) {
      return "object" === typeof a2 && null !== a2 && a2.$$typeof === l2;
    }
    function escape(a2) {
      var b2 = { "=": "=0", ":": "=2" };
      return "$" + a2.replace(/[=:]/g, function(a3) {
        return b2[a3];
      });
    }
    var P2 = /\/+/g;
    function Q2(a2, b2) {
      return "object" === typeof a2 && null !== a2 && null != a2.key ? escape("" + a2.key) : b2.toString(36);
    }
    function R2(a2, b2, e3, d2, c2) {
      var k2 = typeof a2;
      if ("undefined" === k2 || "boolean" === k2) a2 = null;
      var h2 = false;
      if (null === a2) h2 = true;
      else switch (k2) {
        case "string":
        case "number":
          h2 = true;
          break;
        case "object":
          switch (a2.$$typeof) {
            case l2:
            case n2:
              h2 = true;
          }
      }
      if (h2) return h2 = a2, c2 = c2(h2), a2 = "" === d2 ? "." + Q2(h2, 0) : d2, I2(c2) ? (e3 = "", null != a2 && (e3 = a2.replace(P2, "$&/") + "/"), R2(c2, b2, e3, "", function(a3) {
        return a3;
      })) : null != c2 && (O2(c2) && (c2 = N2(c2, e3 + (!c2.key || h2 && h2.key === c2.key ? "" : ("" + c2.key).replace(P2, "$&/") + "/") + a2)), b2.push(c2)), 1;
      h2 = 0;
      d2 = "" === d2 ? "." : d2 + ":";
      if (I2(a2)) for (var g2 = 0; g2 < a2.length; g2++) {
        k2 = a2[g2];
        var f2 = d2 + Q2(k2, g2);
        h2 += R2(k2, b2, e3, f2, c2);
      }
      else if (f2 = A2(a2), "function" === typeof f2) for (a2 = f2.call(a2), g2 = 0; !(k2 = a2.next()).done; ) k2 = k2.value, f2 = d2 + Q2(k2, g2++), h2 += R2(k2, b2, e3, f2, c2);
      else if ("object" === k2) throw b2 = String(a2), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b2 ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b2) + "). If you meant to render a collection of children, use an array instead.");
      return h2;
    }
    function S2(a2, b2, e3) {
      if (null == a2) return a2;
      var d2 = [], c2 = 0;
      R2(a2, d2, "", "", function(a3) {
        return b2.call(e3, a3, c2++);
      });
      return d2;
    }
    function T2(a2) {
      if (-1 === a2._status) {
        var b2 = a2._result;
        b2 = b2();
        b2.then(function(b3) {
          if (0 === a2._status || -1 === a2._status) a2._status = 1, a2._result = b3;
        }, function(b3) {
          if (0 === a2._status || -1 === a2._status) a2._status = 2, a2._result = b3;
        });
        -1 === a2._status && (a2._status = 0, a2._result = b2);
      }
      if (1 === a2._status) return a2._result.default;
      throw a2._result;
    }
    var U2 = { current: null };
    var V2 = { transition: null };
    var W2 = { ReactCurrentDispatcher: U2, ReactCurrentBatchConfig: V2, ReactCurrentOwner: K2 };
    function X2() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    exports.Children = { map: S2, forEach: function(a2, b2, e3) {
      S2(a2, function() {
        b2.apply(this, arguments);
      }, e3);
    }, count: function(a2) {
      var b2 = 0;
      S2(a2, function() {
        b2++;
      });
      return b2;
    }, toArray: function(a2) {
      return S2(a2, function(a3) {
        return a3;
      }) || [];
    }, only: function(a2) {
      if (!O2(a2)) throw Error("React.Children.only expected to receive a single React element child.");
      return a2;
    } };
    exports.Component = E2;
    exports.Fragment = p2;
    exports.Profiler = r2;
    exports.PureComponent = G2;
    exports.StrictMode = q2;
    exports.Suspense = w2;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W2;
    exports.act = X2;
    exports.cloneElement = function(a2, b2, e3) {
      if (null === a2 || void 0 === a2) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a2 + ".");
      var d2 = C2({}, a2.props), c2 = a2.key, k2 = a2.ref, h2 = a2._owner;
      if (null != b2) {
        void 0 !== b2.ref && (k2 = b2.ref, h2 = K2.current);
        void 0 !== b2.key && (c2 = "" + b2.key);
        if (a2.type && a2.type.defaultProps) var g2 = a2.type.defaultProps;
        for (f2 in b2) J2.call(b2, f2) && !L2.hasOwnProperty(f2) && (d2[f2] = void 0 === b2[f2] && void 0 !== g2 ? g2[f2] : b2[f2]);
      }
      var f2 = arguments.length - 2;
      if (1 === f2) d2.children = e3;
      else if (1 < f2) {
        g2 = Array(f2);
        for (var m2 = 0; m2 < f2; m2++) g2[m2] = arguments[m2 + 2];
        d2.children = g2;
      }
      return { $$typeof: l2, type: a2.type, key: c2, ref: k2, props: d2, _owner: h2 };
    };
    exports.createContext = function(a2) {
      a2 = { $$typeof: u2, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
      a2.Provider = { $$typeof: t2, _context: a2 };
      return a2.Consumer = a2;
    };
    exports.createElement = M2;
    exports.createFactory = function(a2) {
      var b2 = M2.bind(null, a2);
      b2.type = a2;
      return b2;
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(a2) {
      return { $$typeof: v2, render: a2 };
    };
    exports.isValidElement = O2;
    exports.lazy = function(a2) {
      return { $$typeof: y2, _payload: { _status: -1, _result: a2 }, _init: T2 };
    };
    exports.memo = function(a2, b2) {
      return { $$typeof: x2, type: a2, compare: void 0 === b2 ? null : b2 };
    };
    exports.startTransition = function(a2) {
      var b2 = V2.transition;
      V2.transition = {};
      try {
        a2();
      } finally {
        V2.transition = b2;
      }
    };
    exports.unstable_act = X2;
    exports.useCallback = function(a2, b2) {
      return U2.current.useCallback(a2, b2);
    };
    exports.useContext = function(a2) {
      return U2.current.useContext(a2);
    };
    exports.useDebugValue = function() {
    };
    exports.useDeferredValue = function(a2) {
      return U2.current.useDeferredValue(a2);
    };
    exports.useEffect = function(a2, b2) {
      return U2.current.useEffect(a2, b2);
    };
    exports.useId = function() {
      return U2.current.useId();
    };
    exports.useImperativeHandle = function(a2, b2, e3) {
      return U2.current.useImperativeHandle(a2, b2, e3);
    };
    exports.useInsertionEffect = function(a2, b2) {
      return U2.current.useInsertionEffect(a2, b2);
    };
    exports.useLayoutEffect = function(a2, b2) {
      return U2.current.useLayoutEffect(a2, b2);
    };
    exports.useMemo = function(a2, b2) {
      return U2.current.useMemo(a2, b2);
    };
    exports.useReducer = function(a2, b2, e3) {
      return U2.current.useReducer(a2, b2, e3);
    };
    exports.useRef = function(a2) {
      return U2.current.useRef(a2);
    };
    exports.useState = function(a2) {
      return U2.current.useState(a2);
    };
    exports.useSyncExternalStore = function(a2, b2, e3) {
      return U2.current.useSyncExternalStore(a2, b2, e3);
    };
    exports.useTransition = function() {
      return U2.current.useTransition();
    };
    exports.version = "18.3.1";
  }
});

// ../../genAI-LBS-G5/node_modules/react/index.js
var require_react = __commonJS({
  "../../genAI-LBS-G5/node_modules/react/index.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_react_production_min();
    } else {
      module.exports = null;
    }
  }
});

// ../../genAI-LBS-G5/node_modules/scheduler/cjs/scheduler.production.min.js
var require_scheduler_production_min = __commonJS({
  "../../genAI-LBS-G5/node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
    "use strict";
    function f2(a2, b2) {
      var c2 = a2.length;
      a2.push(b2);
      a: for (; 0 < c2; ) {
        var d2 = c2 - 1 >>> 1, e3 = a2[d2];
        if (0 < g2(e3, b2)) a2[d2] = b2, a2[c2] = e3, c2 = d2;
        else break a;
      }
    }
    function h2(a2) {
      return 0 === a2.length ? null : a2[0];
    }
    function k2(a2) {
      if (0 === a2.length) return null;
      var b2 = a2[0], c2 = a2.pop();
      if (c2 !== b2) {
        a2[0] = c2;
        a: for (var d2 = 0, e3 = a2.length, w2 = e3 >>> 1; d2 < w2; ) {
          var m2 = 2 * (d2 + 1) - 1, C2 = a2[m2], n2 = m2 + 1, x2 = a2[n2];
          if (0 > g2(C2, c2)) n2 < e3 && 0 > g2(x2, C2) ? (a2[d2] = x2, a2[n2] = c2, d2 = n2) : (a2[d2] = C2, a2[m2] = c2, d2 = m2);
          else if (n2 < e3 && 0 > g2(x2, c2)) a2[d2] = x2, a2[n2] = c2, d2 = n2;
          else break a;
        }
      }
      return b2;
    }
    function g2(a2, b2) {
      var c2 = a2.sortIndex - b2.sortIndex;
      return 0 !== c2 ? c2 : a2.id - b2.id;
    }
    if ("object" === typeof performance && "function" === typeof performance.now) {
      l2 = performance;
      exports.unstable_now = function() {
        return l2.now();
      };
    } else {
      p2 = Date, q2 = p2.now();
      exports.unstable_now = function() {
        return p2.now() - q2;
      };
    }
    var l2;
    var p2;
    var q2;
    var r2 = [];
    var t2 = [];
    var u2 = 1;
    var v2 = null;
    var y2 = 3;
    var z2 = false;
    var A2 = false;
    var B2 = false;
    var D2 = "function" === typeof setTimeout ? setTimeout : null;
    var E2 = "function" === typeof clearTimeout ? clearTimeout : null;
    var F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
    "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function G2(a2) {
      for (var b2 = h2(t2); null !== b2; ) {
        if (null === b2.callback) k2(t2);
        else if (b2.startTime <= a2) k2(t2), b2.sortIndex = b2.expirationTime, f2(r2, b2);
        else break;
        b2 = h2(t2);
      }
    }
    function H2(a2) {
      B2 = false;
      G2(a2);
      if (!A2) if (null !== h2(r2)) A2 = true, I2(J2);
      else {
        var b2 = h2(t2);
        null !== b2 && K2(H2, b2.startTime - a2);
      }
    }
    function J2(a2, b2) {
      A2 = false;
      B2 && (B2 = false, E2(L2), L2 = -1);
      z2 = true;
      var c2 = y2;
      try {
        G2(b2);
        for (v2 = h2(r2); null !== v2 && (!(v2.expirationTime > b2) || a2 && !M2()); ) {
          var d2 = v2.callback;
          if ("function" === typeof d2) {
            v2.callback = null;
            y2 = v2.priorityLevel;
            var e3 = d2(v2.expirationTime <= b2);
            b2 = exports.unstable_now();
            "function" === typeof e3 ? v2.callback = e3 : v2 === h2(r2) && k2(r2);
            G2(b2);
          } else k2(r2);
          v2 = h2(r2);
        }
        if (null !== v2) var w2 = true;
        else {
          var m2 = h2(t2);
          null !== m2 && K2(H2, m2.startTime - b2);
          w2 = false;
        }
        return w2;
      } finally {
        v2 = null, y2 = c2, z2 = false;
      }
    }
    var N2 = false;
    var O2 = null;
    var L2 = -1;
    var P2 = 5;
    var Q2 = -1;
    function M2() {
      return exports.unstable_now() - Q2 < P2 ? false : true;
    }
    function R2() {
      if (null !== O2) {
        var a2 = exports.unstable_now();
        Q2 = a2;
        var b2 = true;
        try {
          b2 = O2(true, a2);
        } finally {
          b2 ? S2() : (N2 = false, O2 = null);
        }
      } else N2 = false;
    }
    var S2;
    if ("function" === typeof F2) S2 = function() {
      F2(R2);
    };
    else if ("undefined" !== typeof MessageChannel) {
      T2 = new MessageChannel(), U2 = T2.port2;
      T2.port1.onmessage = R2;
      S2 = function() {
        U2.postMessage(null);
      };
    } else S2 = function() {
      D2(R2, 0);
    };
    var T2;
    var U2;
    function I2(a2) {
      O2 = a2;
      N2 || (N2 = true, S2());
    }
    function K2(a2, b2) {
      L2 = D2(function() {
        a2(exports.unstable_now());
      }, b2);
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(a2) {
      a2.callback = null;
    };
    exports.unstable_continueExecution = function() {
      A2 || z2 || (A2 = true, I2(J2));
    };
    exports.unstable_forceFrameRate = function(a2) {
      0 > a2 || 125 < a2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a2 ? Math.floor(1e3 / a2) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return y2;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return h2(r2);
    };
    exports.unstable_next = function(a2) {
      switch (y2) {
        case 1:
        case 2:
        case 3:
          var b2 = 3;
          break;
        default:
          b2 = y2;
      }
      var c2 = y2;
      y2 = b2;
      try {
        return a2();
      } finally {
        y2 = c2;
      }
    };
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = function() {
    };
    exports.unstable_runWithPriority = function(a2, b2) {
      switch (a2) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a2 = 3;
      }
      var c2 = y2;
      y2 = a2;
      try {
        return b2();
      } finally {
        y2 = c2;
      }
    };
    exports.unstable_scheduleCallback = function(a2, b2, c2) {
      var d2 = exports.unstable_now();
      "object" === typeof c2 && null !== c2 ? (c2 = c2.delay, c2 = "number" === typeof c2 && 0 < c2 ? d2 + c2 : d2) : c2 = d2;
      switch (a2) {
        case 1:
          var e3 = -1;
          break;
        case 2:
          e3 = 250;
          break;
        case 5:
          e3 = 1073741823;
          break;
        case 4:
          e3 = 1e4;
          break;
        default:
          e3 = 5e3;
      }
      e3 = c2 + e3;
      a2 = { id: u2++, callback: b2, priorityLevel: a2, startTime: c2, expirationTime: e3, sortIndex: -1 };
      c2 > d2 ? (a2.sortIndex = c2, f2(t2, a2), null === h2(r2) && a2 === h2(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c2 - d2))) : (a2.sortIndex = e3, f2(r2, a2), A2 || z2 || (A2 = true, I2(J2)));
      return a2;
    };
    exports.unstable_shouldYield = M2;
    exports.unstable_wrapCallback = function(a2) {
      var b2 = y2;
      return function() {
        var c2 = y2;
        y2 = b2;
        try {
          return a2.apply(this, arguments);
        } finally {
          y2 = c2;
        }
      };
    };
  }
});

// ../../genAI-LBS-G5/node_modules/scheduler/index.js
var require_scheduler = __commonJS({
  "../../genAI-LBS-G5/node_modules/scheduler/index.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_scheduler_production_min();
    } else {
      module.exports = null;
    }
  }
});

// ../../genAI-LBS-G5/node_modules/react-dom/cjs/react-dom.production.min.js
var require_react_dom_production_min = __commonJS({
  "../../genAI-LBS-G5/node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
    "use strict";
    var aa2 = require_react();
    var ca2 = require_scheduler();
    function p2(a2) {
      for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++) b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
      return "Minified React error #" + a2 + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var da2 = /* @__PURE__ */ new Set();
    var ea2 = {};
    function fa2(a2, b2) {
      ha2(a2, b2);
      ha2(a2 + "Capture", b2);
    }
    function ha2(a2, b2) {
      ea2[a2] = b2;
      for (a2 = 0; a2 < b2.length; a2++) da2.add(b2[a2]);
    }
    var ia2 = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
    var ja2 = Object.prototype.hasOwnProperty;
    var ka2 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
    var la2 = {};
    var ma2 = {};
    function oa2(a2) {
      if (ja2.call(ma2, a2)) return true;
      if (ja2.call(la2, a2)) return false;
      if (ka2.test(a2)) return ma2[a2] = true;
      la2[a2] = true;
      return false;
    }
    function pa2(a2, b2, c2, d2) {
      if (null !== c2 && 0 === c2.type) return false;
      switch (typeof b2) {
        case "function":
        case "symbol":
          return true;
        case "boolean":
          if (d2) return false;
          if (null !== c2) return !c2.acceptsBooleans;
          a2 = a2.toLowerCase().slice(0, 5);
          return "data-" !== a2 && "aria-" !== a2;
        default:
          return false;
      }
    }
    function qa(a2, b2, c2, d2) {
      if (null === b2 || "undefined" === typeof b2 || pa2(a2, b2, c2, d2)) return true;
      if (d2) return false;
      if (null !== c2) switch (c2.type) {
        case 3:
          return !b2;
        case 4:
          return false === b2;
        case 5:
          return isNaN(b2);
        case 6:
          return isNaN(b2) || 1 > b2;
      }
      return false;
    }
    function v2(a2, b2, c2, d2, e3, f2, g2) {
      this.acceptsBooleans = 2 === b2 || 3 === b2 || 4 === b2;
      this.attributeName = d2;
      this.attributeNamespace = e3;
      this.mustUseProperty = c2;
      this.propertyName = a2;
      this.type = b2;
      this.sanitizeURL = f2;
      this.removeEmptyString = g2;
    }
    var z2 = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
      z2[a2] = new v2(a2, 0, false, a2, null, false, false);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
      var b2 = a2[0];
      z2[b2] = new v2(b2, 1, false, a2[1], null, false, false);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
      z2[a2] = new v2(a2, 2, false, a2.toLowerCase(), null, false, false);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
      z2[a2] = new v2(a2, 2, false, a2, null, false, false);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
      z2[a2] = new v2(a2, 3, false, a2.toLowerCase(), null, false, false);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a2) {
      z2[a2] = new v2(a2, 3, true, a2, null, false, false);
    });
    ["capture", "download"].forEach(function(a2) {
      z2[a2] = new v2(a2, 4, false, a2, null, false, false);
    });
    ["cols", "rows", "size", "span"].forEach(function(a2) {
      z2[a2] = new v2(a2, 6, false, a2, null, false, false);
    });
    ["rowSpan", "start"].forEach(function(a2) {
      z2[a2] = new v2(a2, 5, false, a2.toLowerCase(), null, false, false);
    });
    var ra2 = /[\-:]([a-z])/g;
    function sa2(a2) {
      return a2[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
      var b2 = a2.replace(
        ra2,
        sa2
      );
      z2[b2] = new v2(b2, 1, false, a2, null, false, false);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
      var b2 = a2.replace(ra2, sa2);
      z2[b2] = new v2(b2, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
      var b2 = a2.replace(ra2, sa2);
      z2[b2] = new v2(b2, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a2) {
      z2[a2] = new v2(a2, 1, false, a2.toLowerCase(), null, false, false);
    });
    z2.xlinkHref = new v2("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
    ["src", "href", "action", "formAction"].forEach(function(a2) {
      z2[a2] = new v2(a2, 1, false, a2.toLowerCase(), null, true, true);
    });
    function ta2(a2, b2, c2, d2) {
      var e3 = z2.hasOwnProperty(b2) ? z2[b2] : null;
      if (null !== e3 ? 0 !== e3.type : d2 || !(2 < b2.length) || "o" !== b2[0] && "O" !== b2[0] || "n" !== b2[1] && "N" !== b2[1]) qa(b2, c2, e3, d2) && (c2 = null), d2 || null === e3 ? oa2(b2) && (null === c2 ? a2.removeAttribute(b2) : a2.setAttribute(b2, "" + c2)) : e3.mustUseProperty ? a2[e3.propertyName] = null === c2 ? 3 === e3.type ? false : "" : c2 : (b2 = e3.attributeName, d2 = e3.attributeNamespace, null === c2 ? a2.removeAttribute(b2) : (e3 = e3.type, c2 = 3 === e3 || 4 === e3 && true === c2 ? "" : "" + c2, d2 ? a2.setAttributeNS(d2, b2, c2) : a2.setAttribute(b2, c2)));
    }
    var ua2 = aa2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    var va2 = /* @__PURE__ */ Symbol.for("react.element");
    var wa2 = /* @__PURE__ */ Symbol.for("react.portal");
    var ya2 = /* @__PURE__ */ Symbol.for("react.fragment");
    var za = /* @__PURE__ */ Symbol.for("react.strict_mode");
    var Aa2 = /* @__PURE__ */ Symbol.for("react.profiler");
    var Ba = /* @__PURE__ */ Symbol.for("react.provider");
    var Ca2 = /* @__PURE__ */ Symbol.for("react.context");
    var Da = /* @__PURE__ */ Symbol.for("react.forward_ref");
    var Ea2 = /* @__PURE__ */ Symbol.for("react.suspense");
    var Fa = /* @__PURE__ */ Symbol.for("react.suspense_list");
    var Ga = /* @__PURE__ */ Symbol.for("react.memo");
    var Ha = /* @__PURE__ */ Symbol.for("react.lazy");
    var Ia2 = /* @__PURE__ */ Symbol.for("react.offscreen");
    var Ja = Symbol.iterator;
    function Ka2(a2) {
      if (null === a2 || "object" !== typeof a2) return null;
      a2 = Ja && a2[Ja] || a2["@@iterator"];
      return "function" === typeof a2 ? a2 : null;
    }
    var A2 = Object.assign;
    var La2;
    function Ma(a2) {
      if (void 0 === La2) try {
        throw Error();
      } catch (c2) {
        var b2 = c2.stack.trim().match(/\n( *(at )?)/);
        La2 = b2 && b2[1] || "";
      }
      return "\n" + La2 + a2;
    }
    var Na = false;
    function Oa2(a2, b2) {
      if (!a2 || Na) return "";
      Na = true;
      var c2 = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (b2) if (b2 = function() {
          throw Error();
        }, Object.defineProperty(b2.prototype, "props", { set: function() {
          throw Error();
        } }), "object" === typeof Reflect && Reflect.construct) {
          try {
            Reflect.construct(b2, []);
          } catch (l2) {
            var d2 = l2;
          }
          Reflect.construct(a2, [], b2);
        } else {
          try {
            b2.call();
          } catch (l2) {
            d2 = l2;
          }
          a2.call(b2.prototype);
        }
        else {
          try {
            throw Error();
          } catch (l2) {
            d2 = l2;
          }
          a2();
        }
      } catch (l2) {
        if (l2 && d2 && "string" === typeof l2.stack) {
          for (var e3 = l2.stack.split("\n"), f2 = d2.stack.split("\n"), g2 = e3.length - 1, h2 = f2.length - 1; 1 <= g2 && 0 <= h2 && e3[g2] !== f2[h2]; ) h2--;
          for (; 1 <= g2 && 0 <= h2; g2--, h2--) if (e3[g2] !== f2[h2]) {
            if (1 !== g2 || 1 !== h2) {
              do
                if (g2--, h2--, 0 > h2 || e3[g2] !== f2[h2]) {
                  var k2 = "\n" + e3[g2].replace(" at new ", " at ");
                  a2.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a2.displayName));
                  return k2;
                }
              while (1 <= g2 && 0 <= h2);
            }
            break;
          }
        }
      } finally {
        Na = false, Error.prepareStackTrace = c2;
      }
      return (a2 = a2 ? a2.displayName || a2.name : "") ? Ma(a2) : "";
    }
    function Pa2(a2) {
      switch (a2.tag) {
        case 5:
          return Ma(a2.type);
        case 16:
          return Ma("Lazy");
        case 13:
          return Ma("Suspense");
        case 19:
          return Ma("SuspenseList");
        case 0:
        case 2:
        case 15:
          return a2 = Oa2(a2.type, false), a2;
        case 11:
          return a2 = Oa2(a2.type.render, false), a2;
        case 1:
          return a2 = Oa2(a2.type, true), a2;
        default:
          return "";
      }
    }
    function Qa(a2) {
      if (null == a2) return null;
      if ("function" === typeof a2) return a2.displayName || a2.name || null;
      if ("string" === typeof a2) return a2;
      switch (a2) {
        case ya2:
          return "Fragment";
        case wa2:
          return "Portal";
        case Aa2:
          return "Profiler";
        case za:
          return "StrictMode";
        case Ea2:
          return "Suspense";
        case Fa:
          return "SuspenseList";
      }
      if ("object" === typeof a2) switch (a2.$$typeof) {
        case Ca2:
          return (a2.displayName || "Context") + ".Consumer";
        case Ba:
          return (a2._context.displayName || "Context") + ".Provider";
        case Da:
          var b2 = a2.render;
          a2 = a2.displayName;
          a2 || (a2 = b2.displayName || b2.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
          return a2;
        case Ga:
          return b2 = a2.displayName || null, null !== b2 ? b2 : Qa(a2.type) || "Memo";
        case Ha:
          b2 = a2._payload;
          a2 = a2._init;
          try {
            return Qa(a2(b2));
          } catch (c2) {
          }
      }
      return null;
    }
    function Ra2(a2) {
      var b2 = a2.type;
      switch (a2.tag) {
        case 24:
          return "Cache";
        case 9:
          return (b2.displayName || "Context") + ".Consumer";
        case 10:
          return (b2._context.displayName || "Context") + ".Provider";
        case 18:
          return "DehydratedFragment";
        case 11:
          return a2 = b2.render, a2 = a2.displayName || a2.name || "", b2.displayName || ("" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
        case 7:
          return "Fragment";
        case 5:
          return b2;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return Qa(b2);
        case 8:
          return b2 === za ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
          if ("function" === typeof b2) return b2.displayName || b2.name || null;
          if ("string" === typeof b2) return b2;
      }
      return null;
    }
    function Sa2(a2) {
      switch (typeof a2) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return a2;
        case "object":
          return a2;
        default:
          return "";
      }
    }
    function Ta2(a2) {
      var b2 = a2.type;
      return (a2 = a2.nodeName) && "input" === a2.toLowerCase() && ("checkbox" === b2 || "radio" === b2);
    }
    function Ua(a2) {
      var b2 = Ta2(a2) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a2.constructor.prototype, b2), d2 = "" + a2[b2];
      if (!a2.hasOwnProperty(b2) && "undefined" !== typeof c2 && "function" === typeof c2.get && "function" === typeof c2.set) {
        var e3 = c2.get, f2 = c2.set;
        Object.defineProperty(a2, b2, { configurable: true, get: function() {
          return e3.call(this);
        }, set: function(a3) {
          d2 = "" + a3;
          f2.call(this, a3);
        } });
        Object.defineProperty(a2, b2, { enumerable: c2.enumerable });
        return { getValue: function() {
          return d2;
        }, setValue: function(a3) {
          d2 = "" + a3;
        }, stopTracking: function() {
          a2._valueTracker = null;
          delete a2[b2];
        } };
      }
    }
    function Va(a2) {
      a2._valueTracker || (a2._valueTracker = Ua(a2));
    }
    function Wa2(a2) {
      if (!a2) return false;
      var b2 = a2._valueTracker;
      if (!b2) return true;
      var c2 = b2.getValue();
      var d2 = "";
      a2 && (d2 = Ta2(a2) ? a2.checked ? "true" : "false" : a2.value);
      a2 = d2;
      return a2 !== c2 ? (b2.setValue(a2), true) : false;
    }
    function Xa(a2) {
      a2 = a2 || ("undefined" !== typeof document ? document : void 0);
      if ("undefined" === typeof a2) return null;
      try {
        return a2.activeElement || a2.body;
      } catch (b2) {
        return a2.body;
      }
    }
    function Ya(a2, b2) {
      var c2 = b2.checked;
      return A2({}, b2, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c2 ? c2 : a2._wrapperState.initialChecked });
    }
    function Za(a2, b2) {
      var c2 = null == b2.defaultValue ? "" : b2.defaultValue, d2 = null != b2.checked ? b2.checked : b2.defaultChecked;
      c2 = Sa2(null != b2.value ? b2.value : c2);
      a2._wrapperState = { initialChecked: d2, initialValue: c2, controlled: "checkbox" === b2.type || "radio" === b2.type ? null != b2.checked : null != b2.value };
    }
    function ab(a2, b2) {
      b2 = b2.checked;
      null != b2 && ta2(a2, "checked", b2, false);
    }
    function bb(a2, b2) {
      ab(a2, b2);
      var c2 = Sa2(b2.value), d2 = b2.type;
      if (null != c2) if ("number" === d2) {
        if (0 === c2 && "" === a2.value || a2.value != c2) a2.value = "" + c2;
      } else a2.value !== "" + c2 && (a2.value = "" + c2);
      else if ("submit" === d2 || "reset" === d2) {
        a2.removeAttribute("value");
        return;
      }
      b2.hasOwnProperty("value") ? cb(a2, b2.type, c2) : b2.hasOwnProperty("defaultValue") && cb(a2, b2.type, Sa2(b2.defaultValue));
      null == b2.checked && null != b2.defaultChecked && (a2.defaultChecked = !!b2.defaultChecked);
    }
    function db(a2, b2, c2) {
      if (b2.hasOwnProperty("value") || b2.hasOwnProperty("defaultValue")) {
        var d2 = b2.type;
        if (!("submit" !== d2 && "reset" !== d2 || void 0 !== b2.value && null !== b2.value)) return;
        b2 = "" + a2._wrapperState.initialValue;
        c2 || b2 === a2.value || (a2.value = b2);
        a2.defaultValue = b2;
      }
      c2 = a2.name;
      "" !== c2 && (a2.name = "");
      a2.defaultChecked = !!a2._wrapperState.initialChecked;
      "" !== c2 && (a2.name = c2);
    }
    function cb(a2, b2, c2) {
      if ("number" !== b2 || Xa(a2.ownerDocument) !== a2) null == c2 ? a2.defaultValue = "" + a2._wrapperState.initialValue : a2.defaultValue !== "" + c2 && (a2.defaultValue = "" + c2);
    }
    var eb = Array.isArray;
    function fb(a2, b2, c2, d2) {
      a2 = a2.options;
      if (b2) {
        b2 = {};
        for (var e3 = 0; e3 < c2.length; e3++) b2["$" + c2[e3]] = true;
        for (c2 = 0; c2 < a2.length; c2++) e3 = b2.hasOwnProperty("$" + a2[c2].value), a2[c2].selected !== e3 && (a2[c2].selected = e3), e3 && d2 && (a2[c2].defaultSelected = true);
      } else {
        c2 = "" + Sa2(c2);
        b2 = null;
        for (e3 = 0; e3 < a2.length; e3++) {
          if (a2[e3].value === c2) {
            a2[e3].selected = true;
            d2 && (a2[e3].defaultSelected = true);
            return;
          }
          null !== b2 || a2[e3].disabled || (b2 = a2[e3]);
        }
        null !== b2 && (b2.selected = true);
      }
    }
    function gb(a2, b2) {
      if (null != b2.dangerouslySetInnerHTML) throw Error(p2(91));
      return A2({}, b2, { value: void 0, defaultValue: void 0, children: "" + a2._wrapperState.initialValue });
    }
    function hb(a2, b2) {
      var c2 = b2.value;
      if (null == c2) {
        c2 = b2.children;
        b2 = b2.defaultValue;
        if (null != c2) {
          if (null != b2) throw Error(p2(92));
          if (eb(c2)) {
            if (1 < c2.length) throw Error(p2(93));
            c2 = c2[0];
          }
          b2 = c2;
        }
        null == b2 && (b2 = "");
        c2 = b2;
      }
      a2._wrapperState = { initialValue: Sa2(c2) };
    }
    function ib(a2, b2) {
      var c2 = Sa2(b2.value), d2 = Sa2(b2.defaultValue);
      null != c2 && (c2 = "" + c2, c2 !== a2.value && (a2.value = c2), null == b2.defaultValue && a2.defaultValue !== c2 && (a2.defaultValue = c2));
      null != d2 && (a2.defaultValue = "" + d2);
    }
    function jb(a2) {
      var b2 = a2.textContent;
      b2 === a2._wrapperState.initialValue && "" !== b2 && null !== b2 && (a2.value = b2);
    }
    function kb(a2) {
      switch (a2) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function lb(a2, b2) {
      return null == a2 || "http://www.w3.org/1999/xhtml" === a2 ? kb(b2) : "http://www.w3.org/2000/svg" === a2 && "foreignObject" === b2 ? "http://www.w3.org/1999/xhtml" : a2;
    }
    var mb;
    var nb = (function(a2) {
      return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b2, c2, d2, e3) {
        MSApp.execUnsafeLocalFunction(function() {
          return a2(b2, c2, d2, e3);
        });
      } : a2;
    })(function(a2, b2) {
      if ("http://www.w3.org/2000/svg" !== a2.namespaceURI || "innerHTML" in a2) a2.innerHTML = b2;
      else {
        mb = mb || document.createElement("div");
        mb.innerHTML = "<svg>" + b2.valueOf().toString() + "</svg>";
        for (b2 = mb.firstChild; a2.firstChild; ) a2.removeChild(a2.firstChild);
        for (; b2.firstChild; ) a2.appendChild(b2.firstChild);
      }
    });
    function ob(a2, b2) {
      if (b2) {
        var c2 = a2.firstChild;
        if (c2 && c2 === a2.lastChild && 3 === c2.nodeType) {
          c2.nodeValue = b2;
          return;
        }
      }
      a2.textContent = b2;
    }
    var pb = {
      animationIterationCount: true,
      aspectRatio: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true
    };
    var qb = ["Webkit", "ms", "Moz", "O"];
    Object.keys(pb).forEach(function(a2) {
      qb.forEach(function(b2) {
        b2 = b2 + a2.charAt(0).toUpperCase() + a2.substring(1);
        pb[b2] = pb[a2];
      });
    });
    function rb(a2, b2, c2) {
      return null == b2 || "boolean" === typeof b2 || "" === b2 ? "" : c2 || "number" !== typeof b2 || 0 === b2 || pb.hasOwnProperty(a2) && pb[a2] ? ("" + b2).trim() : b2 + "px";
    }
    function sb(a2, b2) {
      a2 = a2.style;
      for (var c2 in b2) if (b2.hasOwnProperty(c2)) {
        var d2 = 0 === c2.indexOf("--"), e3 = rb(c2, b2[c2], d2);
        "float" === c2 && (c2 = "cssFloat");
        d2 ? a2.setProperty(c2, e3) : a2[c2] = e3;
      }
    }
    var tb = A2({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
    function ub(a2, b2) {
      if (b2) {
        if (tb[a2] && (null != b2.children || null != b2.dangerouslySetInnerHTML)) throw Error(p2(137, a2));
        if (null != b2.dangerouslySetInnerHTML) {
          if (null != b2.children) throw Error(p2(60));
          if ("object" !== typeof b2.dangerouslySetInnerHTML || !("__html" in b2.dangerouslySetInnerHTML)) throw Error(p2(61));
        }
        if (null != b2.style && "object" !== typeof b2.style) throw Error(p2(62));
      }
    }
    function vb(a2, b2) {
      if (-1 === a2.indexOf("-")) return "string" === typeof b2.is;
      switch (a2) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return false;
        default:
          return true;
      }
    }
    var wb = null;
    function xb(a2) {
      a2 = a2.target || a2.srcElement || window;
      a2.correspondingUseElement && (a2 = a2.correspondingUseElement);
      return 3 === a2.nodeType ? a2.parentNode : a2;
    }
    var yb = null;
    var zb = null;
    var Ab = null;
    function Bb(a2) {
      if (a2 = Cb(a2)) {
        if ("function" !== typeof yb) throw Error(p2(280));
        var b2 = a2.stateNode;
        b2 && (b2 = Db(b2), yb(a2.stateNode, a2.type, b2));
      }
    }
    function Eb(a2) {
      zb ? Ab ? Ab.push(a2) : Ab = [a2] : zb = a2;
    }
    function Fb() {
      if (zb) {
        var a2 = zb, b2 = Ab;
        Ab = zb = null;
        Bb(a2);
        if (b2) for (a2 = 0; a2 < b2.length; a2++) Bb(b2[a2]);
      }
    }
    function Gb(a2, b2) {
      return a2(b2);
    }
    function Hb() {
    }
    var Ib = false;
    function Jb(a2, b2, c2) {
      if (Ib) return a2(b2, c2);
      Ib = true;
      try {
        return Gb(a2, b2, c2);
      } finally {
        if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
      }
    }
    function Kb(a2, b2) {
      var c2 = a2.stateNode;
      if (null === c2) return null;
      var d2 = Db(c2);
      if (null === d2) return null;
      c2 = d2[b2];
      a: switch (b2) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (d2 = !d2.disabled) || (a2 = a2.type, d2 = !("button" === a2 || "input" === a2 || "select" === a2 || "textarea" === a2));
          a2 = !d2;
          break a;
        default:
          a2 = false;
      }
      if (a2) return null;
      if (c2 && "function" !== typeof c2) throw Error(p2(231, b2, typeof c2));
      return c2;
    }
    var Lb = false;
    if (ia2) try {
      Mb = {};
      Object.defineProperty(Mb, "passive", { get: function() {
        Lb = true;
      } });
      window.addEventListener("test", Mb, Mb);
      window.removeEventListener("test", Mb, Mb);
    } catch (a2) {
      Lb = false;
    }
    var Mb;
    function Nb(a2, b2, c2, d2, e3, f2, g2, h2, k2) {
      var l2 = Array.prototype.slice.call(arguments, 3);
      try {
        b2.apply(c2, l2);
      } catch (m2) {
        this.onError(m2);
      }
    }
    var Ob = false;
    var Pb = null;
    var Qb = false;
    var Rb = null;
    var Sb = { onError: function(a2) {
      Ob = true;
      Pb = a2;
    } };
    function Tb(a2, b2, c2, d2, e3, f2, g2, h2, k2) {
      Ob = false;
      Pb = null;
      Nb.apply(Sb, arguments);
    }
    function Ub(a2, b2, c2, d2, e3, f2, g2, h2, k2) {
      Tb.apply(this, arguments);
      if (Ob) {
        if (Ob) {
          var l2 = Pb;
          Ob = false;
          Pb = null;
        } else throw Error(p2(198));
        Qb || (Qb = true, Rb = l2);
      }
    }
    function Vb(a2) {
      var b2 = a2, c2 = a2;
      if (a2.alternate) for (; b2.return; ) b2 = b2.return;
      else {
        a2 = b2;
        do
          b2 = a2, 0 !== (b2.flags & 4098) && (c2 = b2.return), a2 = b2.return;
        while (a2);
      }
      return 3 === b2.tag ? c2 : null;
    }
    function Wb(a2) {
      if (13 === a2.tag) {
        var b2 = a2.memoizedState;
        null === b2 && (a2 = a2.alternate, null !== a2 && (b2 = a2.memoizedState));
        if (null !== b2) return b2.dehydrated;
      }
      return null;
    }
    function Xb(a2) {
      if (Vb(a2) !== a2) throw Error(p2(188));
    }
    function Yb(a2) {
      var b2 = a2.alternate;
      if (!b2) {
        b2 = Vb(a2);
        if (null === b2) throw Error(p2(188));
        return b2 !== a2 ? null : a2;
      }
      for (var c2 = a2, d2 = b2; ; ) {
        var e3 = c2.return;
        if (null === e3) break;
        var f2 = e3.alternate;
        if (null === f2) {
          d2 = e3.return;
          if (null !== d2) {
            c2 = d2;
            continue;
          }
          break;
        }
        if (e3.child === f2.child) {
          for (f2 = e3.child; f2; ) {
            if (f2 === c2) return Xb(e3), a2;
            if (f2 === d2) return Xb(e3), b2;
            f2 = f2.sibling;
          }
          throw Error(p2(188));
        }
        if (c2.return !== d2.return) c2 = e3, d2 = f2;
        else {
          for (var g2 = false, h2 = e3.child; h2; ) {
            if (h2 === c2) {
              g2 = true;
              c2 = e3;
              d2 = f2;
              break;
            }
            if (h2 === d2) {
              g2 = true;
              d2 = e3;
              c2 = f2;
              break;
            }
            h2 = h2.sibling;
          }
          if (!g2) {
            for (h2 = f2.child; h2; ) {
              if (h2 === c2) {
                g2 = true;
                c2 = f2;
                d2 = e3;
                break;
              }
              if (h2 === d2) {
                g2 = true;
                d2 = f2;
                c2 = e3;
                break;
              }
              h2 = h2.sibling;
            }
            if (!g2) throw Error(p2(189));
          }
        }
        if (c2.alternate !== d2) throw Error(p2(190));
      }
      if (3 !== c2.tag) throw Error(p2(188));
      return c2.stateNode.current === c2 ? a2 : b2;
    }
    function Zb(a2) {
      a2 = Yb(a2);
      return null !== a2 ? $b(a2) : null;
    }
    function $b(a2) {
      if (5 === a2.tag || 6 === a2.tag) return a2;
      for (a2 = a2.child; null !== a2; ) {
        var b2 = $b(a2);
        if (null !== b2) return b2;
        a2 = a2.sibling;
      }
      return null;
    }
    var ac = ca2.unstable_scheduleCallback;
    var bc = ca2.unstable_cancelCallback;
    var cc = ca2.unstable_shouldYield;
    var dc = ca2.unstable_requestPaint;
    var B2 = ca2.unstable_now;
    var ec = ca2.unstable_getCurrentPriorityLevel;
    var fc = ca2.unstable_ImmediatePriority;
    var gc = ca2.unstable_UserBlockingPriority;
    var hc = ca2.unstable_NormalPriority;
    var ic = ca2.unstable_LowPriority;
    var jc = ca2.unstable_IdlePriority;
    var kc = null;
    var lc = null;
    function mc(a2) {
      if (lc && "function" === typeof lc.onCommitFiberRoot) try {
        lc.onCommitFiberRoot(kc, a2, void 0, 128 === (a2.current.flags & 128));
      } catch (b2) {
      }
    }
    var oc = Math.clz32 ? Math.clz32 : nc;
    var pc = Math.log;
    var qc = Math.LN2;
    function nc(a2) {
      a2 >>>= 0;
      return 0 === a2 ? 32 : 31 - (pc(a2) / qc | 0) | 0;
    }
    var rc = 64;
    var sc = 4194304;
    function tc(a2) {
      switch (a2 & -a2) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return a2 & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return a2 & 130023424;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 1073741824;
        default:
          return a2;
      }
    }
    function uc(a2, b2) {
      var c2 = a2.pendingLanes;
      if (0 === c2) return 0;
      var d2 = 0, e3 = a2.suspendedLanes, f2 = a2.pingedLanes, g2 = c2 & 268435455;
      if (0 !== g2) {
        var h2 = g2 & ~e3;
        0 !== h2 ? d2 = tc(h2) : (f2 &= g2, 0 !== f2 && (d2 = tc(f2)));
      } else g2 = c2 & ~e3, 0 !== g2 ? d2 = tc(g2) : 0 !== f2 && (d2 = tc(f2));
      if (0 === d2) return 0;
      if (0 !== b2 && b2 !== d2 && 0 === (b2 & e3) && (e3 = d2 & -d2, f2 = b2 & -b2, e3 >= f2 || 16 === e3 && 0 !== (f2 & 4194240))) return b2;
      0 !== (d2 & 4) && (d2 |= c2 & 16);
      b2 = a2.entangledLanes;
      if (0 !== b2) for (a2 = a2.entanglements, b2 &= d2; 0 < b2; ) c2 = 31 - oc(b2), e3 = 1 << c2, d2 |= a2[c2], b2 &= ~e3;
      return d2;
    }
    function vc(a2, b2) {
      switch (a2) {
        case 1:
        case 2:
        case 4:
          return b2 + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return b2 + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function wc(a2, b2) {
      for (var c2 = a2.suspendedLanes, d2 = a2.pingedLanes, e3 = a2.expirationTimes, f2 = a2.pendingLanes; 0 < f2; ) {
        var g2 = 31 - oc(f2), h2 = 1 << g2, k2 = e3[g2];
        if (-1 === k2) {
          if (0 === (h2 & c2) || 0 !== (h2 & d2)) e3[g2] = vc(h2, b2);
        } else k2 <= b2 && (a2.expiredLanes |= h2);
        f2 &= ~h2;
      }
    }
    function xc(a2) {
      a2 = a2.pendingLanes & -1073741825;
      return 0 !== a2 ? a2 : a2 & 1073741824 ? 1073741824 : 0;
    }
    function yc() {
      var a2 = rc;
      rc <<= 1;
      0 === (rc & 4194240) && (rc = 64);
      return a2;
    }
    function zc(a2) {
      for (var b2 = [], c2 = 0; 31 > c2; c2++) b2.push(a2);
      return b2;
    }
    function Ac(a2, b2, c2) {
      a2.pendingLanes |= b2;
      536870912 !== b2 && (a2.suspendedLanes = 0, a2.pingedLanes = 0);
      a2 = a2.eventTimes;
      b2 = 31 - oc(b2);
      a2[b2] = c2;
    }
    function Bc(a2, b2) {
      var c2 = a2.pendingLanes & ~b2;
      a2.pendingLanes = b2;
      a2.suspendedLanes = 0;
      a2.pingedLanes = 0;
      a2.expiredLanes &= b2;
      a2.mutableReadLanes &= b2;
      a2.entangledLanes &= b2;
      b2 = a2.entanglements;
      var d2 = a2.eventTimes;
      for (a2 = a2.expirationTimes; 0 < c2; ) {
        var e3 = 31 - oc(c2), f2 = 1 << e3;
        b2[e3] = 0;
        d2[e3] = -1;
        a2[e3] = -1;
        c2 &= ~f2;
      }
    }
    function Cc(a2, b2) {
      var c2 = a2.entangledLanes |= b2;
      for (a2 = a2.entanglements; c2; ) {
        var d2 = 31 - oc(c2), e3 = 1 << d2;
        e3 & b2 | a2[d2] & b2 && (a2[d2] |= b2);
        c2 &= ~e3;
      }
    }
    var C2 = 0;
    function Dc(a2) {
      a2 &= -a2;
      return 1 < a2 ? 4 < a2 ? 0 !== (a2 & 268435455) ? 16 : 536870912 : 4 : 1;
    }
    var Ec;
    var Fc;
    var Gc;
    var Hc;
    var Ic;
    var Jc = false;
    var Kc = [];
    var Lc = null;
    var Mc = null;
    var Nc = null;
    var Oc = /* @__PURE__ */ new Map();
    var Pc = /* @__PURE__ */ new Map();
    var Qc = [];
    var Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function Sc(a2, b2) {
      switch (a2) {
        case "focusin":
        case "focusout":
          Lc = null;
          break;
        case "dragenter":
        case "dragleave":
          Mc = null;
          break;
        case "mouseover":
        case "mouseout":
          Nc = null;
          break;
        case "pointerover":
        case "pointerout":
          Oc.delete(b2.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Pc.delete(b2.pointerId);
      }
    }
    function Tc(a2, b2, c2, d2, e3, f2) {
      if (null === a2 || a2.nativeEvent !== f2) return a2 = { blockedOn: b2, domEventName: c2, eventSystemFlags: d2, nativeEvent: f2, targetContainers: [e3] }, null !== b2 && (b2 = Cb(b2), null !== b2 && Fc(b2)), a2;
      a2.eventSystemFlags |= d2;
      b2 = a2.targetContainers;
      null !== e3 && -1 === b2.indexOf(e3) && b2.push(e3);
      return a2;
    }
    function Uc(a2, b2, c2, d2, e3) {
      switch (b2) {
        case "focusin":
          return Lc = Tc(Lc, a2, b2, c2, d2, e3), true;
        case "dragenter":
          return Mc = Tc(Mc, a2, b2, c2, d2, e3), true;
        case "mouseover":
          return Nc = Tc(Nc, a2, b2, c2, d2, e3), true;
        case "pointerover":
          var f2 = e3.pointerId;
          Oc.set(f2, Tc(Oc.get(f2) || null, a2, b2, c2, d2, e3));
          return true;
        case "gotpointercapture":
          return f2 = e3.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a2, b2, c2, d2, e3)), true;
      }
      return false;
    }
    function Vc(a2) {
      var b2 = Wc(a2.target);
      if (null !== b2) {
        var c2 = Vb(b2);
        if (null !== c2) {
          if (b2 = c2.tag, 13 === b2) {
            if (b2 = Wb(c2), null !== b2) {
              a2.blockedOn = b2;
              Ic(a2.priority, function() {
                Gc(c2);
              });
              return;
            }
          } else if (3 === b2 && c2.stateNode.current.memoizedState.isDehydrated) {
            a2.blockedOn = 3 === c2.tag ? c2.stateNode.containerInfo : null;
            return;
          }
        }
      }
      a2.blockedOn = null;
    }
    function Xc(a2) {
      if (null !== a2.blockedOn) return false;
      for (var b2 = a2.targetContainers; 0 < b2.length; ) {
        var c2 = Yc(a2.domEventName, a2.eventSystemFlags, b2[0], a2.nativeEvent);
        if (null === c2) {
          c2 = a2.nativeEvent;
          var d2 = new c2.constructor(c2.type, c2);
          wb = d2;
          c2.target.dispatchEvent(d2);
          wb = null;
        } else return b2 = Cb(c2), null !== b2 && Fc(b2), a2.blockedOn = c2, false;
        b2.shift();
      }
      return true;
    }
    function Zc(a2, b2, c2) {
      Xc(a2) && c2.delete(b2);
    }
    function $c() {
      Jc = false;
      null !== Lc && Xc(Lc) && (Lc = null);
      null !== Mc && Xc(Mc) && (Mc = null);
      null !== Nc && Xc(Nc) && (Nc = null);
      Oc.forEach(Zc);
      Pc.forEach(Zc);
    }
    function ad(a2, b2) {
      a2.blockedOn === b2 && (a2.blockedOn = null, Jc || (Jc = true, ca2.unstable_scheduleCallback(ca2.unstable_NormalPriority, $c)));
    }
    function bd(a2) {
      function b2(b3) {
        return ad(b3, a2);
      }
      if (0 < Kc.length) {
        ad(Kc[0], a2);
        for (var c2 = 1; c2 < Kc.length; c2++) {
          var d2 = Kc[c2];
          d2.blockedOn === a2 && (d2.blockedOn = null);
        }
      }
      null !== Lc && ad(Lc, a2);
      null !== Mc && ad(Mc, a2);
      null !== Nc && ad(Nc, a2);
      Oc.forEach(b2);
      Pc.forEach(b2);
      for (c2 = 0; c2 < Qc.length; c2++) d2 = Qc[c2], d2.blockedOn === a2 && (d2.blockedOn = null);
      for (; 0 < Qc.length && (c2 = Qc[0], null === c2.blockedOn); ) Vc(c2), null === c2.blockedOn && Qc.shift();
    }
    var cd = ua2.ReactCurrentBatchConfig;
    var dd = true;
    function ed(a2, b2, c2, d2) {
      var e3 = C2, f2 = cd.transition;
      cd.transition = null;
      try {
        C2 = 1, fd(a2, b2, c2, d2);
      } finally {
        C2 = e3, cd.transition = f2;
      }
    }
    function gd(a2, b2, c2, d2) {
      var e3 = C2, f2 = cd.transition;
      cd.transition = null;
      try {
        C2 = 4, fd(a2, b2, c2, d2);
      } finally {
        C2 = e3, cd.transition = f2;
      }
    }
    function fd(a2, b2, c2, d2) {
      if (dd) {
        var e3 = Yc(a2, b2, c2, d2);
        if (null === e3) hd(a2, b2, d2, id, c2), Sc(a2, d2);
        else if (Uc(e3, a2, b2, c2, d2)) d2.stopPropagation();
        else if (Sc(a2, d2), b2 & 4 && -1 < Rc.indexOf(a2)) {
          for (; null !== e3; ) {
            var f2 = Cb(e3);
            null !== f2 && Ec(f2);
            f2 = Yc(a2, b2, c2, d2);
            null === f2 && hd(a2, b2, d2, id, c2);
            if (f2 === e3) break;
            e3 = f2;
          }
          null !== e3 && d2.stopPropagation();
        } else hd(a2, b2, d2, null, c2);
      }
    }
    var id = null;
    function Yc(a2, b2, c2, d2) {
      id = null;
      a2 = xb(d2);
      a2 = Wc(a2);
      if (null !== a2) if (b2 = Vb(a2), null === b2) a2 = null;
      else if (c2 = b2.tag, 13 === c2) {
        a2 = Wb(b2);
        if (null !== a2) return a2;
        a2 = null;
      } else if (3 === c2) {
        if (b2.stateNode.current.memoizedState.isDehydrated) return 3 === b2.tag ? b2.stateNode.containerInfo : null;
        a2 = null;
      } else b2 !== a2 && (a2 = null);
      id = a2;
      return null;
    }
    function jd(a2) {
      switch (a2) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 4;
        case "message":
          switch (ec()) {
            case fc:
              return 1;
            case gc:
              return 4;
            case hc:
            case ic:
              return 16;
            case jc:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var kd = null;
    var ld = null;
    var md = null;
    function nd() {
      if (md) return md;
      var a2, b2 = ld, c2 = b2.length, d2, e3 = "value" in kd ? kd.value : kd.textContent, f2 = e3.length;
      for (a2 = 0; a2 < c2 && b2[a2] === e3[a2]; a2++) ;
      var g2 = c2 - a2;
      for (d2 = 1; d2 <= g2 && b2[c2 - d2] === e3[f2 - d2]; d2++) ;
      return md = e3.slice(a2, 1 < d2 ? 1 - d2 : void 0);
    }
    function od(a2) {
      var b2 = a2.keyCode;
      "charCode" in a2 ? (a2 = a2.charCode, 0 === a2 && 13 === b2 && (a2 = 13)) : a2 = b2;
      10 === a2 && (a2 = 13);
      return 32 <= a2 || 13 === a2 ? a2 : 0;
    }
    function pd() {
      return true;
    }
    function qd() {
      return false;
    }
    function rd(a2) {
      function b2(b3, d2, e3, f2, g2) {
        this._reactName = b3;
        this._targetInst = e3;
        this.type = d2;
        this.nativeEvent = f2;
        this.target = g2;
        this.currentTarget = null;
        for (var c2 in a2) a2.hasOwnProperty(c2) && (b3 = a2[c2], this[c2] = b3 ? b3(f2) : f2[c2]);
        this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
        this.isPropagationStopped = qd;
        return this;
      }
      A2(b2.prototype, { preventDefault: function() {
        this.defaultPrevented = true;
        var a3 = this.nativeEvent;
        a3 && (a3.preventDefault ? a3.preventDefault() : "unknown" !== typeof a3.returnValue && (a3.returnValue = false), this.isDefaultPrevented = pd);
      }, stopPropagation: function() {
        var a3 = this.nativeEvent;
        a3 && (a3.stopPropagation ? a3.stopPropagation() : "unknown" !== typeof a3.cancelBubble && (a3.cancelBubble = true), this.isPropagationStopped = pd);
      }, persist: function() {
      }, isPersistent: pd });
      return b2;
    }
    var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a2) {
      return a2.timeStamp || Date.now();
    }, defaultPrevented: 0, isTrusted: 0 };
    var td = rd(sd);
    var ud = A2({}, sd, { view: 0, detail: 0 });
    var vd = rd(ud);
    var wd;
    var xd;
    var yd;
    var Ad = A2({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a2) {
      return void 0 === a2.relatedTarget ? a2.fromElement === a2.srcElement ? a2.toElement : a2.fromElement : a2.relatedTarget;
    }, movementX: function(a2) {
      if ("movementX" in a2) return a2.movementX;
      a2 !== yd && (yd && "mousemove" === a2.type ? (wd = a2.screenX - yd.screenX, xd = a2.screenY - yd.screenY) : xd = wd = 0, yd = a2);
      return wd;
    }, movementY: function(a2) {
      return "movementY" in a2 ? a2.movementY : xd;
    } });
    var Bd = rd(Ad);
    var Cd = A2({}, Ad, { dataTransfer: 0 });
    var Dd = rd(Cd);
    var Ed = A2({}, ud, { relatedTarget: 0 });
    var Fd = rd(Ed);
    var Gd = A2({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
    var Hd = rd(Gd);
    var Id = A2({}, sd, { clipboardData: function(a2) {
      return "clipboardData" in a2 ? a2.clipboardData : window.clipboardData;
    } });
    var Jd = rd(Id);
    var Kd = A2({}, sd, { data: 0 });
    var Ld = rd(Kd);
    var Md = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    };
    var Nd = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    var Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
    function Pd(a2) {
      var b2 = this.nativeEvent;
      return b2.getModifierState ? b2.getModifierState(a2) : (a2 = Od[a2]) ? !!b2[a2] : false;
    }
    function zd() {
      return Pd;
    }
    var Qd = A2({}, ud, { key: function(a2) {
      if (a2.key) {
        var b2 = Md[a2.key] || a2.key;
        if ("Unidentified" !== b2) return b2;
      }
      return "keypress" === a2.type ? (a2 = od(a2), 13 === a2 ? "Enter" : String.fromCharCode(a2)) : "keydown" === a2.type || "keyup" === a2.type ? Nd[a2.keyCode] || "Unidentified" : "";
    }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a2) {
      return "keypress" === a2.type ? od(a2) : 0;
    }, keyCode: function(a2) {
      return "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
    }, which: function(a2) {
      return "keypress" === a2.type ? od(a2) : "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
    } });
    var Rd = rd(Qd);
    var Sd = A2({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
    var Td = rd(Sd);
    var Ud = A2({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd });
    var Vd = rd(Ud);
    var Wd = A2({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
    var Xd = rd(Wd);
    var Yd = A2({}, Ad, {
      deltaX: function(a2) {
        return "deltaX" in a2 ? a2.deltaX : "wheelDeltaX" in a2 ? -a2.wheelDeltaX : 0;
      },
      deltaY: function(a2) {
        return "deltaY" in a2 ? a2.deltaY : "wheelDeltaY" in a2 ? -a2.wheelDeltaY : "wheelDelta" in a2 ? -a2.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    });
    var Zd = rd(Yd);
    var $d = [9, 13, 27, 32];
    var ae2 = ia2 && "CompositionEvent" in window;
    var be2 = null;
    ia2 && "documentMode" in document && (be2 = document.documentMode);
    var ce2 = ia2 && "TextEvent" in window && !be2;
    var de2 = ia2 && (!ae2 || be2 && 8 < be2 && 11 >= be2);
    var ee2 = String.fromCharCode(32);
    var fe2 = false;
    function ge2(a2, b2) {
      switch (a2) {
        case "keyup":
          return -1 !== $d.indexOf(b2.keyCode);
        case "keydown":
          return 229 !== b2.keyCode;
        case "keypress":
        case "mousedown":
        case "focusout":
          return true;
        default:
          return false;
      }
    }
    function he2(a2) {
      a2 = a2.detail;
      return "object" === typeof a2 && "data" in a2 ? a2.data : null;
    }
    var ie2 = false;
    function je2(a2, b2) {
      switch (a2) {
        case "compositionend":
          return he2(b2);
        case "keypress":
          if (32 !== b2.which) return null;
          fe2 = true;
          return ee2;
        case "textInput":
          return a2 = b2.data, a2 === ee2 && fe2 ? null : a2;
        default:
          return null;
      }
    }
    function ke2(a2, b2) {
      if (ie2) return "compositionend" === a2 || !ae2 && ge2(a2, b2) ? (a2 = nd(), md = ld = kd = null, ie2 = false, a2) : null;
      switch (a2) {
        case "paste":
          return null;
        case "keypress":
          if (!(b2.ctrlKey || b2.altKey || b2.metaKey) || b2.ctrlKey && b2.altKey) {
            if (b2.char && 1 < b2.char.length) return b2.char;
            if (b2.which) return String.fromCharCode(b2.which);
          }
          return null;
        case "compositionend":
          return de2 && "ko" !== b2.locale ? null : b2.data;
        default:
          return null;
      }
    }
    var le2 = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
    function me2(a2) {
      var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
      return "input" === b2 ? !!le2[a2.type] : "textarea" === b2 ? true : false;
    }
    function ne2(a2, b2, c2, d2) {
      Eb(d2);
      b2 = oe2(b2, "onChange");
      0 < b2.length && (c2 = new td("onChange", "change", null, c2, d2), a2.push({ event: c2, listeners: b2 }));
    }
    var pe2 = null;
    var qe2 = null;
    function re2(a2) {
      se2(a2, 0);
    }
    function te2(a2) {
      var b2 = ue2(a2);
      if (Wa2(b2)) return a2;
    }
    function ve2(a2, b2) {
      if ("change" === a2) return b2;
    }
    var we2 = false;
    if (ia2) {
      if (ia2) {
        ye2 = "oninput" in document;
        if (!ye2) {
          ze2 = document.createElement("div");
          ze2.setAttribute("oninput", "return;");
          ye2 = "function" === typeof ze2.oninput;
        }
        xe2 = ye2;
      } else xe2 = false;
      we2 = xe2 && (!document.documentMode || 9 < document.documentMode);
    }
    var xe2;
    var ye2;
    var ze2;
    function Ae2() {
      pe2 && (pe2.detachEvent("onpropertychange", Be2), qe2 = pe2 = null);
    }
    function Be2(a2) {
      if ("value" === a2.propertyName && te2(qe2)) {
        var b2 = [];
        ne2(b2, qe2, a2, xb(a2));
        Jb(re2, b2);
      }
    }
    function Ce2(a2, b2, c2) {
      "focusin" === a2 ? (Ae2(), pe2 = b2, qe2 = c2, pe2.attachEvent("onpropertychange", Be2)) : "focusout" === a2 && Ae2();
    }
    function De2(a2) {
      if ("selectionchange" === a2 || "keyup" === a2 || "keydown" === a2) return te2(qe2);
    }
    function Ee2(a2, b2) {
      if ("click" === a2) return te2(b2);
    }
    function Fe2(a2, b2) {
      if ("input" === a2 || "change" === a2) return te2(b2);
    }
    function Ge2(a2, b2) {
      return a2 === b2 && (0 !== a2 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
    }
    var He2 = "function" === typeof Object.is ? Object.is : Ge2;
    function Ie2(a2, b2) {
      if (He2(a2, b2)) return true;
      if ("object" !== typeof a2 || null === a2 || "object" !== typeof b2 || null === b2) return false;
      var c2 = Object.keys(a2), d2 = Object.keys(b2);
      if (c2.length !== d2.length) return false;
      for (d2 = 0; d2 < c2.length; d2++) {
        var e3 = c2[d2];
        if (!ja2.call(b2, e3) || !He2(a2[e3], b2[e3])) return false;
      }
      return true;
    }
    function Je2(a2) {
      for (; a2 && a2.firstChild; ) a2 = a2.firstChild;
      return a2;
    }
    function Ke2(a2, b2) {
      var c2 = Je2(a2);
      a2 = 0;
      for (var d2; c2; ) {
        if (3 === c2.nodeType) {
          d2 = a2 + c2.textContent.length;
          if (a2 <= b2 && d2 >= b2) return { node: c2, offset: b2 - a2 };
          a2 = d2;
        }
        a: {
          for (; c2; ) {
            if (c2.nextSibling) {
              c2 = c2.nextSibling;
              break a;
            }
            c2 = c2.parentNode;
          }
          c2 = void 0;
        }
        c2 = Je2(c2);
      }
    }
    function Le2(a2, b2) {
      return a2 && b2 ? a2 === b2 ? true : a2 && 3 === a2.nodeType ? false : b2 && 3 === b2.nodeType ? Le2(a2, b2.parentNode) : "contains" in a2 ? a2.contains(b2) : a2.compareDocumentPosition ? !!(a2.compareDocumentPosition(b2) & 16) : false : false;
    }
    function Me2() {
      for (var a2 = window, b2 = Xa(); b2 instanceof a2.HTMLIFrameElement; ) {
        try {
          var c2 = "string" === typeof b2.contentWindow.location.href;
        } catch (d2) {
          c2 = false;
        }
        if (c2) a2 = b2.contentWindow;
        else break;
        b2 = Xa(a2.document);
      }
      return b2;
    }
    function Ne2(a2) {
      var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
      return b2 && ("input" === b2 && ("text" === a2.type || "search" === a2.type || "tel" === a2.type || "url" === a2.type || "password" === a2.type) || "textarea" === b2 || "true" === a2.contentEditable);
    }
    function Oe2(a2) {
      var b2 = Me2(), c2 = a2.focusedElem, d2 = a2.selectionRange;
      if (b2 !== c2 && c2 && c2.ownerDocument && Le2(c2.ownerDocument.documentElement, c2)) {
        if (null !== d2 && Ne2(c2)) {
          if (b2 = d2.start, a2 = d2.end, void 0 === a2 && (a2 = b2), "selectionStart" in c2) c2.selectionStart = b2, c2.selectionEnd = Math.min(a2, c2.value.length);
          else if (a2 = (b2 = c2.ownerDocument || document) && b2.defaultView || window, a2.getSelection) {
            a2 = a2.getSelection();
            var e3 = c2.textContent.length, f2 = Math.min(d2.start, e3);
            d2 = void 0 === d2.end ? f2 : Math.min(d2.end, e3);
            !a2.extend && f2 > d2 && (e3 = d2, d2 = f2, f2 = e3);
            e3 = Ke2(c2, f2);
            var g2 = Ke2(
              c2,
              d2
            );
            e3 && g2 && (1 !== a2.rangeCount || a2.anchorNode !== e3.node || a2.anchorOffset !== e3.offset || a2.focusNode !== g2.node || a2.focusOffset !== g2.offset) && (b2 = b2.createRange(), b2.setStart(e3.node, e3.offset), a2.removeAllRanges(), f2 > d2 ? (a2.addRange(b2), a2.extend(g2.node, g2.offset)) : (b2.setEnd(g2.node, g2.offset), a2.addRange(b2)));
          }
        }
        b2 = [];
        for (a2 = c2; a2 = a2.parentNode; ) 1 === a2.nodeType && b2.push({ element: a2, left: a2.scrollLeft, top: a2.scrollTop });
        "function" === typeof c2.focus && c2.focus();
        for (c2 = 0; c2 < b2.length; c2++) a2 = b2[c2], a2.element.scrollLeft = a2.left, a2.element.scrollTop = a2.top;
      }
    }
    var Pe2 = ia2 && "documentMode" in document && 11 >= document.documentMode;
    var Qe2 = null;
    var Re2 = null;
    var Se2 = null;
    var Te2 = false;
    function Ue2(a2, b2, c2) {
      var d2 = c2.window === c2 ? c2.document : 9 === c2.nodeType ? c2 : c2.ownerDocument;
      Te2 || null == Qe2 || Qe2 !== Xa(d2) || (d2 = Qe2, "selectionStart" in d2 && Ne2(d2) ? d2 = { start: d2.selectionStart, end: d2.selectionEnd } : (d2 = (d2.ownerDocument && d2.ownerDocument.defaultView || window).getSelection(), d2 = { anchorNode: d2.anchorNode, anchorOffset: d2.anchorOffset, focusNode: d2.focusNode, focusOffset: d2.focusOffset }), Se2 && Ie2(Se2, d2) || (Se2 = d2, d2 = oe2(Re2, "onSelect"), 0 < d2.length && (b2 = new td("onSelect", "select", null, b2, c2), a2.push({ event: b2, listeners: d2 }), b2.target = Qe2)));
    }
    function Ve2(a2, b2) {
      var c2 = {};
      c2[a2.toLowerCase()] = b2.toLowerCase();
      c2["Webkit" + a2] = "webkit" + b2;
      c2["Moz" + a2] = "moz" + b2;
      return c2;
    }
    var We2 = { animationend: Ve2("Animation", "AnimationEnd"), animationiteration: Ve2("Animation", "AnimationIteration"), animationstart: Ve2("Animation", "AnimationStart"), transitionend: Ve2("Transition", "TransitionEnd") };
    var Xe2 = {};
    var Ye2 = {};
    ia2 && (Ye2 = document.createElement("div").style, "AnimationEvent" in window || (delete We2.animationend.animation, delete We2.animationiteration.animation, delete We2.animationstart.animation), "TransitionEvent" in window || delete We2.transitionend.transition);
    function Ze2(a2) {
      if (Xe2[a2]) return Xe2[a2];
      if (!We2[a2]) return a2;
      var b2 = We2[a2], c2;
      for (c2 in b2) if (b2.hasOwnProperty(c2) && c2 in Ye2) return Xe2[a2] = b2[c2];
      return a2;
    }
    var $e2 = Ze2("animationend");
    var af = Ze2("animationiteration");
    var bf = Ze2("animationstart");
    var cf = Ze2("transitionend");
    var df = /* @__PURE__ */ new Map();
    var ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    function ff(a2, b2) {
      df.set(a2, b2);
      fa2(b2, [a2]);
    }
    for (gf = 0; gf < ef.length; gf++) {
      hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
      ff(jf, "on" + kf);
    }
    var hf;
    var jf;
    var kf;
    var gf;
    ff($e2, "onAnimationEnd");
    ff(af, "onAnimationIteration");
    ff(bf, "onAnimationStart");
    ff("dblclick", "onDoubleClick");
    ff("focusin", "onFocus");
    ff("focusout", "onBlur");
    ff(cf, "onTransitionEnd");
    ha2("onMouseEnter", ["mouseout", "mouseover"]);
    ha2("onMouseLeave", ["mouseout", "mouseover"]);
    ha2("onPointerEnter", ["pointerout", "pointerover"]);
    ha2("onPointerLeave", ["pointerout", "pointerover"]);
    fa2("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
    fa2("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
    fa2("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
    fa2("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
    fa2("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
    fa2("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
    var mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
    function nf(a2, b2, c2) {
      var d2 = a2.type || "unknown-event";
      a2.currentTarget = c2;
      Ub(d2, b2, void 0, a2);
      a2.currentTarget = null;
    }
    function se2(a2, b2) {
      b2 = 0 !== (b2 & 4);
      for (var c2 = 0; c2 < a2.length; c2++) {
        var d2 = a2[c2], e3 = d2.event;
        d2 = d2.listeners;
        a: {
          var f2 = void 0;
          if (b2) for (var g2 = d2.length - 1; 0 <= g2; g2--) {
            var h2 = d2[g2], k2 = h2.instance, l2 = h2.currentTarget;
            h2 = h2.listener;
            if (k2 !== f2 && e3.isPropagationStopped()) break a;
            nf(e3, h2, l2);
            f2 = k2;
          }
          else for (g2 = 0; g2 < d2.length; g2++) {
            h2 = d2[g2];
            k2 = h2.instance;
            l2 = h2.currentTarget;
            h2 = h2.listener;
            if (k2 !== f2 && e3.isPropagationStopped()) break a;
            nf(e3, h2, l2);
            f2 = k2;
          }
        }
      }
      if (Qb) throw a2 = Rb, Qb = false, Rb = null, a2;
    }
    function D2(a2, b2) {
      var c2 = b2[of];
      void 0 === c2 && (c2 = b2[of] = /* @__PURE__ */ new Set());
      var d2 = a2 + "__bubble";
      c2.has(d2) || (pf(b2, a2, 2, false), c2.add(d2));
    }
    function qf(a2, b2, c2) {
      var d2 = 0;
      b2 && (d2 |= 4);
      pf(c2, a2, d2, b2);
    }
    var rf = "_reactListening" + Math.random().toString(36).slice(2);
    function sf(a2) {
      if (!a2[rf]) {
        a2[rf] = true;
        da2.forEach(function(b3) {
          "selectionchange" !== b3 && (mf.has(b3) || qf(b3, false, a2), qf(b3, true, a2));
        });
        var b2 = 9 === a2.nodeType ? a2 : a2.ownerDocument;
        null === b2 || b2[rf] || (b2[rf] = true, qf("selectionchange", false, b2));
      }
    }
    function pf(a2, b2, c2, d2) {
      switch (jd(b2)) {
        case 1:
          var e3 = ed;
          break;
        case 4:
          e3 = gd;
          break;
        default:
          e3 = fd;
      }
      c2 = e3.bind(null, b2, c2, a2);
      e3 = void 0;
      !Lb || "touchstart" !== b2 && "touchmove" !== b2 && "wheel" !== b2 || (e3 = true);
      d2 ? void 0 !== e3 ? a2.addEventListener(b2, c2, { capture: true, passive: e3 }) : a2.addEventListener(b2, c2, true) : void 0 !== e3 ? a2.addEventListener(b2, c2, { passive: e3 }) : a2.addEventListener(b2, c2, false);
    }
    function hd(a2, b2, c2, d2, e3) {
      var f2 = d2;
      if (0 === (b2 & 1) && 0 === (b2 & 2) && null !== d2) a: for (; ; ) {
        if (null === d2) return;
        var g2 = d2.tag;
        if (3 === g2 || 4 === g2) {
          var h2 = d2.stateNode.containerInfo;
          if (h2 === e3 || 8 === h2.nodeType && h2.parentNode === e3) break;
          if (4 === g2) for (g2 = d2.return; null !== g2; ) {
            var k2 = g2.tag;
            if (3 === k2 || 4 === k2) {
              if (k2 = g2.stateNode.containerInfo, k2 === e3 || 8 === k2.nodeType && k2.parentNode === e3) return;
            }
            g2 = g2.return;
          }
          for (; null !== h2; ) {
            g2 = Wc(h2);
            if (null === g2) return;
            k2 = g2.tag;
            if (5 === k2 || 6 === k2) {
              d2 = f2 = g2;
              continue a;
            }
            h2 = h2.parentNode;
          }
        }
        d2 = d2.return;
      }
      Jb(function() {
        var d3 = f2, e4 = xb(c2), g3 = [];
        a: {
          var h3 = df.get(a2);
          if (void 0 !== h3) {
            var k3 = td, n2 = a2;
            switch (a2) {
              case "keypress":
                if (0 === od(c2)) break a;
              case "keydown":
              case "keyup":
                k3 = Rd;
                break;
              case "focusin":
                n2 = "focus";
                k3 = Fd;
                break;
              case "focusout":
                n2 = "blur";
                k3 = Fd;
                break;
              case "beforeblur":
              case "afterblur":
                k3 = Fd;
                break;
              case "click":
                if (2 === c2.button) break a;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                k3 = Bd;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                k3 = Dd;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                k3 = Vd;
                break;
              case $e2:
              case af:
              case bf:
                k3 = Hd;
                break;
              case cf:
                k3 = Xd;
                break;
              case "scroll":
                k3 = vd;
                break;
              case "wheel":
                k3 = Zd;
                break;
              case "copy":
              case "cut":
              case "paste":
                k3 = Jd;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                k3 = Td;
            }
            var t2 = 0 !== (b2 & 4), J2 = !t2 && "scroll" === a2, x2 = t2 ? null !== h3 ? h3 + "Capture" : null : h3;
            t2 = [];
            for (var w2 = d3, u2; null !== w2; ) {
              u2 = w2;
              var F2 = u2.stateNode;
              5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
              if (J2) break;
              w2 = w2.return;
            }
            0 < t2.length && (h3 = new k3(h3, n2, null, c2, e4), g3.push({ event: h3, listeners: t2 }));
          }
        }
        if (0 === (b2 & 7)) {
          a: {
            h3 = "mouseover" === a2 || "pointerover" === a2;
            k3 = "mouseout" === a2 || "pointerout" === a2;
            if (h3 && c2 !== wb && (n2 = c2.relatedTarget || c2.fromElement) && (Wc(n2) || n2[uf])) break a;
            if (k3 || h3) {
              h3 = e4.window === e4 ? e4 : (h3 = e4.ownerDocument) ? h3.defaultView || h3.parentWindow : window;
              if (k3) {
                if (n2 = c2.relatedTarget || c2.toElement, k3 = d3, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
              } else k3 = null, n2 = d3;
              if (k3 !== n2) {
                t2 = Bd;
                F2 = "onMouseLeave";
                x2 = "onMouseEnter";
                w2 = "mouse";
                if ("pointerout" === a2 || "pointerover" === a2) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
                J2 = null == k3 ? h3 : ue2(k3);
                u2 = null == n2 ? h3 : ue2(n2);
                h3 = new t2(F2, w2 + "leave", k3, c2, e4);
                h3.target = J2;
                h3.relatedTarget = u2;
                F2 = null;
                Wc(e4) === d3 && (t2 = new t2(x2, w2 + "enter", n2, c2, e4), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
                J2 = F2;
                if (k3 && n2) b: {
                  t2 = k3;
                  x2 = n2;
                  w2 = 0;
                  for (u2 = t2; u2; u2 = vf(u2)) w2++;
                  u2 = 0;
                  for (F2 = x2; F2; F2 = vf(F2)) u2++;
                  for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
                  for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
                  for (; w2--; ) {
                    if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                    t2 = vf(t2);
                    x2 = vf(x2);
                  }
                  t2 = null;
                }
                else t2 = null;
                null !== k3 && wf(g3, h3, k3, t2, false);
                null !== n2 && null !== J2 && wf(g3, J2, n2, t2, true);
              }
            }
          }
          a: {
            h3 = d3 ? ue2(d3) : window;
            k3 = h3.nodeName && h3.nodeName.toLowerCase();
            if ("select" === k3 || "input" === k3 && "file" === h3.type) var na2 = ve2;
            else if (me2(h3)) if (we2) na2 = Fe2;
            else {
              na2 = De2;
              var xa2 = Ce2;
            }
            else (k3 = h3.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h3.type || "radio" === h3.type) && (na2 = Ee2);
            if (na2 && (na2 = na2(a2, d3))) {
              ne2(g3, na2, c2, e4);
              break a;
            }
            xa2 && xa2(a2, h3, d3);
            "focusout" === a2 && (xa2 = h3._wrapperState) && xa2.controlled && "number" === h3.type && cb(h3, "number", h3.value);
          }
          xa2 = d3 ? ue2(d3) : window;
          switch (a2) {
            case "focusin":
              if (me2(xa2) || "true" === xa2.contentEditable) Qe2 = xa2, Re2 = d3, Se2 = null;
              break;
            case "focusout":
              Se2 = Re2 = Qe2 = null;
              break;
            case "mousedown":
              Te2 = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Te2 = false;
              Ue2(g3, c2, e4);
              break;
            case "selectionchange":
              if (Pe2) break;
            case "keydown":
            case "keyup":
              Ue2(g3, c2, e4);
          }
          var $a;
          if (ae2) b: {
            switch (a2) {
              case "compositionstart":
                var ba2 = "onCompositionStart";
                break b;
              case "compositionend":
                ba2 = "onCompositionEnd";
                break b;
              case "compositionupdate":
                ba2 = "onCompositionUpdate";
                break b;
            }
            ba2 = void 0;
          }
          else ie2 ? ge2(a2, c2) && (ba2 = "onCompositionEnd") : "keydown" === a2 && 229 === c2.keyCode && (ba2 = "onCompositionStart");
          ba2 && (de2 && "ko" !== c2.locale && (ie2 || "onCompositionStart" !== ba2 ? "onCompositionEnd" === ba2 && ie2 && ($a = nd()) : (kd = e4, ld = "value" in kd ? kd.value : kd.textContent, ie2 = true)), xa2 = oe2(d3, ba2), 0 < xa2.length && (ba2 = new Ld(ba2, a2, null, c2, e4), g3.push({ event: ba2, listeners: xa2 }), $a ? ba2.data = $a : ($a = he2(c2), null !== $a && (ba2.data = $a))));
          if ($a = ce2 ? je2(a2, c2) : ke2(a2, c2)) d3 = oe2(d3, "onBeforeInput"), 0 < d3.length && (e4 = new Ld("onBeforeInput", "beforeinput", null, c2, e4), g3.push({ event: e4, listeners: d3 }), e4.data = $a);
        }
        se2(g3, b2);
      });
    }
    function tf(a2, b2, c2) {
      return { instance: a2, listener: b2, currentTarget: c2 };
    }
    function oe2(a2, b2) {
      for (var c2 = b2 + "Capture", d2 = []; null !== a2; ) {
        var e3 = a2, f2 = e3.stateNode;
        5 === e3.tag && null !== f2 && (e3 = f2, f2 = Kb(a2, c2), null != f2 && d2.unshift(tf(a2, f2, e3)), f2 = Kb(a2, b2), null != f2 && d2.push(tf(a2, f2, e3)));
        a2 = a2.return;
      }
      return d2;
    }
    function vf(a2) {
      if (null === a2) return null;
      do
        a2 = a2.return;
      while (a2 && 5 !== a2.tag);
      return a2 ? a2 : null;
    }
    function wf(a2, b2, c2, d2, e3) {
      for (var f2 = b2._reactName, g2 = []; null !== c2 && c2 !== d2; ) {
        var h2 = c2, k2 = h2.alternate, l2 = h2.stateNode;
        if (null !== k2 && k2 === d2) break;
        5 === h2.tag && null !== l2 && (h2 = l2, e3 ? (k2 = Kb(c2, f2), null != k2 && g2.unshift(tf(c2, k2, h2))) : e3 || (k2 = Kb(c2, f2), null != k2 && g2.push(tf(c2, k2, h2))));
        c2 = c2.return;
      }
      0 !== g2.length && a2.push({ event: b2, listeners: g2 });
    }
    var xf = /\r\n?/g;
    var yf = /\u0000|\uFFFD/g;
    function zf(a2) {
      return ("string" === typeof a2 ? a2 : "" + a2).replace(xf, "\n").replace(yf, "");
    }
    function Af(a2, b2, c2) {
      b2 = zf(b2);
      if (zf(a2) !== b2 && c2) throw Error(p2(425));
    }
    function Bf() {
    }
    var Cf = null;
    var Df = null;
    function Ef(a2, b2) {
      return "textarea" === a2 || "noscript" === a2 || "string" === typeof b2.children || "number" === typeof b2.children || "object" === typeof b2.dangerouslySetInnerHTML && null !== b2.dangerouslySetInnerHTML && null != b2.dangerouslySetInnerHTML.__html;
    }
    var Ff = "function" === typeof setTimeout ? setTimeout : void 0;
    var Gf = "function" === typeof clearTimeout ? clearTimeout : void 0;
    var Hf = "function" === typeof Promise ? Promise : void 0;
    var Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a2) {
      return Hf.resolve(null).then(a2).catch(If);
    } : Ff;
    function If(a2) {
      setTimeout(function() {
        throw a2;
      });
    }
    function Kf(a2, b2) {
      var c2 = b2, d2 = 0;
      do {
        var e3 = c2.nextSibling;
        a2.removeChild(c2);
        if (e3 && 8 === e3.nodeType) if (c2 = e3.data, "/$" === c2) {
          if (0 === d2) {
            a2.removeChild(e3);
            bd(b2);
            return;
          }
          d2--;
        } else "$" !== c2 && "$?" !== c2 && "$!" !== c2 || d2++;
        c2 = e3;
      } while (c2);
      bd(b2);
    }
    function Lf(a2) {
      for (; null != a2; a2 = a2.nextSibling) {
        var b2 = a2.nodeType;
        if (1 === b2 || 3 === b2) break;
        if (8 === b2) {
          b2 = a2.data;
          if ("$" === b2 || "$!" === b2 || "$?" === b2) break;
          if ("/$" === b2) return null;
        }
      }
      return a2;
    }
    function Mf(a2) {
      a2 = a2.previousSibling;
      for (var b2 = 0; a2; ) {
        if (8 === a2.nodeType) {
          var c2 = a2.data;
          if ("$" === c2 || "$!" === c2 || "$?" === c2) {
            if (0 === b2) return a2;
            b2--;
          } else "/$" === c2 && b2++;
        }
        a2 = a2.previousSibling;
      }
      return null;
    }
    var Nf = Math.random().toString(36).slice(2);
    var Of = "__reactFiber$" + Nf;
    var Pf = "__reactProps$" + Nf;
    var uf = "__reactContainer$" + Nf;
    var of = "__reactEvents$" + Nf;
    var Qf = "__reactListeners$" + Nf;
    var Rf = "__reactHandles$" + Nf;
    function Wc(a2) {
      var b2 = a2[Of];
      if (b2) return b2;
      for (var c2 = a2.parentNode; c2; ) {
        if (b2 = c2[uf] || c2[Of]) {
          c2 = b2.alternate;
          if (null !== b2.child || null !== c2 && null !== c2.child) for (a2 = Mf(a2); null !== a2; ) {
            if (c2 = a2[Of]) return c2;
            a2 = Mf(a2);
          }
          return b2;
        }
        a2 = c2;
        c2 = a2.parentNode;
      }
      return null;
    }
    function Cb(a2) {
      a2 = a2[Of] || a2[uf];
      return !a2 || 5 !== a2.tag && 6 !== a2.tag && 13 !== a2.tag && 3 !== a2.tag ? null : a2;
    }
    function ue2(a2) {
      if (5 === a2.tag || 6 === a2.tag) return a2.stateNode;
      throw Error(p2(33));
    }
    function Db(a2) {
      return a2[Pf] || null;
    }
    var Sf = [];
    var Tf = -1;
    function Uf(a2) {
      return { current: a2 };
    }
    function E2(a2) {
      0 > Tf || (a2.current = Sf[Tf], Sf[Tf] = null, Tf--);
    }
    function G2(a2, b2) {
      Tf++;
      Sf[Tf] = a2.current;
      a2.current = b2;
    }
    var Vf = {};
    var H2 = Uf(Vf);
    var Wf = Uf(false);
    var Xf = Vf;
    function Yf(a2, b2) {
      var c2 = a2.type.contextTypes;
      if (!c2) return Vf;
      var d2 = a2.stateNode;
      if (d2 && d2.__reactInternalMemoizedUnmaskedChildContext === b2) return d2.__reactInternalMemoizedMaskedChildContext;
      var e3 = {}, f2;
      for (f2 in c2) e3[f2] = b2[f2];
      d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = b2, a2.__reactInternalMemoizedMaskedChildContext = e3);
      return e3;
    }
    function Zf(a2) {
      a2 = a2.childContextTypes;
      return null !== a2 && void 0 !== a2;
    }
    function $f() {
      E2(Wf);
      E2(H2);
    }
    function ag(a2, b2, c2) {
      if (H2.current !== Vf) throw Error(p2(168));
      G2(H2, b2);
      G2(Wf, c2);
    }
    function bg(a2, b2, c2) {
      var d2 = a2.stateNode;
      b2 = b2.childContextTypes;
      if ("function" !== typeof d2.getChildContext) return c2;
      d2 = d2.getChildContext();
      for (var e3 in d2) if (!(e3 in b2)) throw Error(p2(108, Ra2(a2) || "Unknown", e3));
      return A2({}, c2, d2);
    }
    function cg(a2) {
      a2 = (a2 = a2.stateNode) && a2.__reactInternalMemoizedMergedChildContext || Vf;
      Xf = H2.current;
      G2(H2, a2);
      G2(Wf, Wf.current);
      return true;
    }
    function dg(a2, b2, c2) {
      var d2 = a2.stateNode;
      if (!d2) throw Error(p2(169));
      c2 ? (a2 = bg(a2, b2, Xf), d2.__reactInternalMemoizedMergedChildContext = a2, E2(Wf), E2(H2), G2(H2, a2)) : E2(Wf);
      G2(Wf, c2);
    }
    var eg = null;
    var fg = false;
    var gg = false;
    function hg(a2) {
      null === eg ? eg = [a2] : eg.push(a2);
    }
    function ig(a2) {
      fg = true;
      hg(a2);
    }
    function jg() {
      if (!gg && null !== eg) {
        gg = true;
        var a2 = 0, b2 = C2;
        try {
          var c2 = eg;
          for (C2 = 1; a2 < c2.length; a2++) {
            var d2 = c2[a2];
            do
              d2 = d2(true);
            while (null !== d2);
          }
          eg = null;
          fg = false;
        } catch (e3) {
          throw null !== eg && (eg = eg.slice(a2 + 1)), ac(fc, jg), e3;
        } finally {
          C2 = b2, gg = false;
        }
      }
      return null;
    }
    var kg = [];
    var lg = 0;
    var mg = null;
    var ng = 0;
    var og = [];
    var pg = 0;
    var qg = null;
    var rg = 1;
    var sg = "";
    function tg(a2, b2) {
      kg[lg++] = ng;
      kg[lg++] = mg;
      mg = a2;
      ng = b2;
    }
    function ug(a2, b2, c2) {
      og[pg++] = rg;
      og[pg++] = sg;
      og[pg++] = qg;
      qg = a2;
      var d2 = rg;
      a2 = sg;
      var e3 = 32 - oc(d2) - 1;
      d2 &= ~(1 << e3);
      c2 += 1;
      var f2 = 32 - oc(b2) + e3;
      if (30 < f2) {
        var g2 = e3 - e3 % 5;
        f2 = (d2 & (1 << g2) - 1).toString(32);
        d2 >>= g2;
        e3 -= g2;
        rg = 1 << 32 - oc(b2) + e3 | c2 << e3 | d2;
        sg = f2 + a2;
      } else rg = 1 << f2 | c2 << e3 | d2, sg = a2;
    }
    function vg(a2) {
      null !== a2.return && (tg(a2, 1), ug(a2, 1, 0));
    }
    function wg(a2) {
      for (; a2 === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
      for (; a2 === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
    }
    var xg = null;
    var yg = null;
    var I2 = false;
    var zg = null;
    function Ag(a2, b2) {
      var c2 = Bg(5, null, null, 0);
      c2.elementType = "DELETED";
      c2.stateNode = b2;
      c2.return = a2;
      b2 = a2.deletions;
      null === b2 ? (a2.deletions = [c2], a2.flags |= 16) : b2.push(c2);
    }
    function Cg(a2, b2) {
      switch (a2.tag) {
        case 5:
          var c2 = a2.type;
          b2 = 1 !== b2.nodeType || c2.toLowerCase() !== b2.nodeName.toLowerCase() ? null : b2;
          return null !== b2 ? (a2.stateNode = b2, xg = a2, yg = Lf(b2.firstChild), true) : false;
        case 6:
          return b2 = "" === a2.pendingProps || 3 !== b2.nodeType ? null : b2, null !== b2 ? (a2.stateNode = b2, xg = a2, yg = null, true) : false;
        case 13:
          return b2 = 8 !== b2.nodeType ? null : b2, null !== b2 ? (c2 = null !== qg ? { id: rg, overflow: sg } : null, a2.memoizedState = { dehydrated: b2, treeContext: c2, retryLane: 1073741824 }, c2 = Bg(18, null, null, 0), c2.stateNode = b2, c2.return = a2, a2.child = c2, xg = a2, yg = null, true) : false;
        default:
          return false;
      }
    }
    function Dg(a2) {
      return 0 !== (a2.mode & 1) && 0 === (a2.flags & 128);
    }
    function Eg(a2) {
      if (I2) {
        var b2 = yg;
        if (b2) {
          var c2 = b2;
          if (!Cg(a2, b2)) {
            if (Dg(a2)) throw Error(p2(418));
            b2 = Lf(c2.nextSibling);
            var d2 = xg;
            b2 && Cg(a2, b2) ? Ag(d2, c2) : (a2.flags = a2.flags & -4097 | 2, I2 = false, xg = a2);
          }
        } else {
          if (Dg(a2)) throw Error(p2(418));
          a2.flags = a2.flags & -4097 | 2;
          I2 = false;
          xg = a2;
        }
      }
    }
    function Fg(a2) {
      for (a2 = a2.return; null !== a2 && 5 !== a2.tag && 3 !== a2.tag && 13 !== a2.tag; ) a2 = a2.return;
      xg = a2;
    }
    function Gg(a2) {
      if (a2 !== xg) return false;
      if (!I2) return Fg(a2), I2 = true, false;
      var b2;
      (b2 = 3 !== a2.tag) && !(b2 = 5 !== a2.tag) && (b2 = a2.type, b2 = "head" !== b2 && "body" !== b2 && !Ef(a2.type, a2.memoizedProps));
      if (b2 && (b2 = yg)) {
        if (Dg(a2)) throw Hg(), Error(p2(418));
        for (; b2; ) Ag(a2, b2), b2 = Lf(b2.nextSibling);
      }
      Fg(a2);
      if (13 === a2.tag) {
        a2 = a2.memoizedState;
        a2 = null !== a2 ? a2.dehydrated : null;
        if (!a2) throw Error(p2(317));
        a: {
          a2 = a2.nextSibling;
          for (b2 = 0; a2; ) {
            if (8 === a2.nodeType) {
              var c2 = a2.data;
              if ("/$" === c2) {
                if (0 === b2) {
                  yg = Lf(a2.nextSibling);
                  break a;
                }
                b2--;
              } else "$" !== c2 && "$!" !== c2 && "$?" !== c2 || b2++;
            }
            a2 = a2.nextSibling;
          }
          yg = null;
        }
      } else yg = xg ? Lf(a2.stateNode.nextSibling) : null;
      return true;
    }
    function Hg() {
      for (var a2 = yg; a2; ) a2 = Lf(a2.nextSibling);
    }
    function Ig() {
      yg = xg = null;
      I2 = false;
    }
    function Jg(a2) {
      null === zg ? zg = [a2] : zg.push(a2);
    }
    var Kg = ua2.ReactCurrentBatchConfig;
    function Lg(a2, b2, c2) {
      a2 = c2.ref;
      if (null !== a2 && "function" !== typeof a2 && "object" !== typeof a2) {
        if (c2._owner) {
          c2 = c2._owner;
          if (c2) {
            if (1 !== c2.tag) throw Error(p2(309));
            var d2 = c2.stateNode;
          }
          if (!d2) throw Error(p2(147, a2));
          var e3 = d2, f2 = "" + a2;
          if (null !== b2 && null !== b2.ref && "function" === typeof b2.ref && b2.ref._stringRef === f2) return b2.ref;
          b2 = function(a3) {
            var b3 = e3.refs;
            null === a3 ? delete b3[f2] : b3[f2] = a3;
          };
          b2._stringRef = f2;
          return b2;
        }
        if ("string" !== typeof a2) throw Error(p2(284));
        if (!c2._owner) throw Error(p2(290, a2));
      }
      return a2;
    }
    function Mg(a2, b2) {
      a2 = Object.prototype.toString.call(b2);
      throw Error(p2(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(b2).join(", ") + "}" : a2));
    }
    function Ng(a2) {
      var b2 = a2._init;
      return b2(a2._payload);
    }
    function Og(a2) {
      function b2(b3, c3) {
        if (a2) {
          var d3 = b3.deletions;
          null === d3 ? (b3.deletions = [c3], b3.flags |= 16) : d3.push(c3);
        }
      }
      function c2(c3, d3) {
        if (!a2) return null;
        for (; null !== d3; ) b2(c3, d3), d3 = d3.sibling;
        return null;
      }
      function d2(a3, b3) {
        for (a3 = /* @__PURE__ */ new Map(); null !== b3; ) null !== b3.key ? a3.set(b3.key, b3) : a3.set(b3.index, b3), b3 = b3.sibling;
        return a3;
      }
      function e3(a3, b3) {
        a3 = Pg(a3, b3);
        a3.index = 0;
        a3.sibling = null;
        return a3;
      }
      function f2(b3, c3, d3) {
        b3.index = d3;
        if (!a2) return b3.flags |= 1048576, c3;
        d3 = b3.alternate;
        if (null !== d3) return d3 = d3.index, d3 < c3 ? (b3.flags |= 2, c3) : d3;
        b3.flags |= 2;
        return c3;
      }
      function g2(b3) {
        a2 && null === b3.alternate && (b3.flags |= 2);
        return b3;
      }
      function h2(a3, b3, c3, d3) {
        if (null === b3 || 6 !== b3.tag) return b3 = Qg(c3, a3.mode, d3), b3.return = a3, b3;
        b3 = e3(b3, c3);
        b3.return = a3;
        return b3;
      }
      function k2(a3, b3, c3, d3) {
        var f3 = c3.type;
        if (f3 === ya2) return m2(a3, b3, c3.props.children, d3, c3.key);
        if (null !== b3 && (b3.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b3.type)) return d3 = e3(b3, c3.props), d3.ref = Lg(a3, b3, c3), d3.return = a3, d3;
        d3 = Rg(c3.type, c3.key, c3.props, null, a3.mode, d3);
        d3.ref = Lg(a3, b3, c3);
        d3.return = a3;
        return d3;
      }
      function l2(a3, b3, c3, d3) {
        if (null === b3 || 4 !== b3.tag || b3.stateNode.containerInfo !== c3.containerInfo || b3.stateNode.implementation !== c3.implementation) return b3 = Sg(c3, a3.mode, d3), b3.return = a3, b3;
        b3 = e3(b3, c3.children || []);
        b3.return = a3;
        return b3;
      }
      function m2(a3, b3, c3, d3, f3) {
        if (null === b3 || 7 !== b3.tag) return b3 = Tg(c3, a3.mode, d3, f3), b3.return = a3, b3;
        b3 = e3(b3, c3);
        b3.return = a3;
        return b3;
      }
      function q2(a3, b3, c3) {
        if ("string" === typeof b3 && "" !== b3 || "number" === typeof b3) return b3 = Qg("" + b3, a3.mode, c3), b3.return = a3, b3;
        if ("object" === typeof b3 && null !== b3) {
          switch (b3.$$typeof) {
            case va2:
              return c3 = Rg(b3.type, b3.key, b3.props, null, a3.mode, c3), c3.ref = Lg(a3, null, b3), c3.return = a3, c3;
            case wa2:
              return b3 = Sg(b3, a3.mode, c3), b3.return = a3, b3;
            case Ha:
              var d3 = b3._init;
              return q2(a3, d3(b3._payload), c3);
          }
          if (eb(b3) || Ka2(b3)) return b3 = Tg(b3, a3.mode, c3, null), b3.return = a3, b3;
          Mg(a3, b3);
        }
        return null;
      }
      function r2(a3, b3, c3, d3) {
        var e4 = null !== b3 ? b3.key : null;
        if ("string" === typeof c3 && "" !== c3 || "number" === typeof c3) return null !== e4 ? null : h2(a3, b3, "" + c3, d3);
        if ("object" === typeof c3 && null !== c3) {
          switch (c3.$$typeof) {
            case va2:
              return c3.key === e4 ? k2(a3, b3, c3, d3) : null;
            case wa2:
              return c3.key === e4 ? l2(a3, b3, c3, d3) : null;
            case Ha:
              return e4 = c3._init, r2(
                a3,
                b3,
                e4(c3._payload),
                d3
              );
          }
          if (eb(c3) || Ka2(c3)) return null !== e4 ? null : m2(a3, b3, c3, d3, null);
          Mg(a3, c3);
        }
        return null;
      }
      function y2(a3, b3, c3, d3, e4) {
        if ("string" === typeof d3 && "" !== d3 || "number" === typeof d3) return a3 = a3.get(c3) || null, h2(b3, a3, "" + d3, e4);
        if ("object" === typeof d3 && null !== d3) {
          switch (d3.$$typeof) {
            case va2:
              return a3 = a3.get(null === d3.key ? c3 : d3.key) || null, k2(b3, a3, d3, e4);
            case wa2:
              return a3 = a3.get(null === d3.key ? c3 : d3.key) || null, l2(b3, a3, d3, e4);
            case Ha:
              var f3 = d3._init;
              return y2(a3, b3, c3, f3(d3._payload), e4);
          }
          if (eb(d3) || Ka2(d3)) return a3 = a3.get(c3) || null, m2(b3, a3, d3, e4, null);
          Mg(b3, d3);
        }
        return null;
      }
      function n2(e4, g3, h3, k3) {
        for (var l3 = null, m3 = null, u2 = g3, w2 = g3 = 0, x2 = null; null !== u2 && w2 < h3.length; w2++) {
          u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
          var n3 = r2(e4, u2, h3[w2], k3);
          if (null === n3) {
            null === u2 && (u2 = x2);
            break;
          }
          a2 && u2 && null === n3.alternate && b2(e4, u2);
          g3 = f2(n3, g3, w2);
          null === m3 ? l3 = n3 : m3.sibling = n3;
          m3 = n3;
          u2 = x2;
        }
        if (w2 === h3.length) return c2(e4, u2), I2 && tg(e4, w2), l3;
        if (null === u2) {
          for (; w2 < h3.length; w2++) u2 = q2(e4, h3[w2], k3), null !== u2 && (g3 = f2(u2, g3, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
          I2 && tg(e4, w2);
          return l3;
        }
        for (u2 = d2(e4, u2); w2 < h3.length; w2++) x2 = y2(u2, e4, w2, h3[w2], k3), null !== x2 && (a2 && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g3 = f2(x2, g3, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
        a2 && u2.forEach(function(a3) {
          return b2(e4, a3);
        });
        I2 && tg(e4, w2);
        return l3;
      }
      function t2(e4, g3, h3, k3) {
        var l3 = Ka2(h3);
        if ("function" !== typeof l3) throw Error(p2(150));
        h3 = l3.call(h3);
        if (null == h3) throw Error(p2(151));
        for (var u2 = l3 = null, m3 = g3, w2 = g3 = 0, x2 = null, n3 = h3.next(); null !== m3 && !n3.done; w2++, n3 = h3.next()) {
          m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
          var t3 = r2(e4, m3, n3.value, k3);
          if (null === t3) {
            null === m3 && (m3 = x2);
            break;
          }
          a2 && m3 && null === t3.alternate && b2(e4, m3);
          g3 = f2(t3, g3, w2);
          null === u2 ? l3 = t3 : u2.sibling = t3;
          u2 = t3;
          m3 = x2;
        }
        if (n3.done) return c2(
          e4,
          m3
        ), I2 && tg(e4, w2), l3;
        if (null === m3) {
          for (; !n3.done; w2++, n3 = h3.next()) n3 = q2(e4, n3.value, k3), null !== n3 && (g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
          I2 && tg(e4, w2);
          return l3;
        }
        for (m3 = d2(e4, m3); !n3.done; w2++, n3 = h3.next()) n3 = y2(m3, e4, w2, n3.value, k3), null !== n3 && (a2 && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
        a2 && m3.forEach(function(a3) {
          return b2(e4, a3);
        });
        I2 && tg(e4, w2);
        return l3;
      }
      function J2(a3, d3, f3, h3) {
        "object" === typeof f3 && null !== f3 && f3.type === ya2 && null === f3.key && (f3 = f3.props.children);
        if ("object" === typeof f3 && null !== f3) {
          switch (f3.$$typeof) {
            case va2:
              a: {
                for (var k3 = f3.key, l3 = d3; null !== l3; ) {
                  if (l3.key === k3) {
                    k3 = f3.type;
                    if (k3 === ya2) {
                      if (7 === l3.tag) {
                        c2(a3, l3.sibling);
                        d3 = e3(l3, f3.props.children);
                        d3.return = a3;
                        a3 = d3;
                        break a;
                      }
                    } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                      c2(a3, l3.sibling);
                      d3 = e3(l3, f3.props);
                      d3.ref = Lg(a3, l3, f3);
                      d3.return = a3;
                      a3 = d3;
                      break a;
                    }
                    c2(a3, l3);
                    break;
                  } else b2(a3, l3);
                  l3 = l3.sibling;
                }
                f3.type === ya2 ? (d3 = Tg(f3.props.children, a3.mode, h3, f3.key), d3.return = a3, a3 = d3) : (h3 = Rg(f3.type, f3.key, f3.props, null, a3.mode, h3), h3.ref = Lg(a3, d3, f3), h3.return = a3, a3 = h3);
              }
              return g2(a3);
            case wa2:
              a: {
                for (l3 = f3.key; null !== d3; ) {
                  if (d3.key === l3) if (4 === d3.tag && d3.stateNode.containerInfo === f3.containerInfo && d3.stateNode.implementation === f3.implementation) {
                    c2(a3, d3.sibling);
                    d3 = e3(d3, f3.children || []);
                    d3.return = a3;
                    a3 = d3;
                    break a;
                  } else {
                    c2(a3, d3);
                    break;
                  }
                  else b2(a3, d3);
                  d3 = d3.sibling;
                }
                d3 = Sg(f3, a3.mode, h3);
                d3.return = a3;
                a3 = d3;
              }
              return g2(a3);
            case Ha:
              return l3 = f3._init, J2(a3, d3, l3(f3._payload), h3);
          }
          if (eb(f3)) return n2(a3, d3, f3, h3);
          if (Ka2(f3)) return t2(a3, d3, f3, h3);
          Mg(a3, f3);
        }
        return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d3 && 6 === d3.tag ? (c2(a3, d3.sibling), d3 = e3(d3, f3), d3.return = a3, a3 = d3) : (c2(a3, d3), d3 = Qg(f3, a3.mode, h3), d3.return = a3, a3 = d3), g2(a3)) : c2(a3, d3);
      }
      return J2;
    }
    var Ug = Og(true);
    var Vg = Og(false);
    var Wg = Uf(null);
    var Xg = null;
    var Yg = null;
    var Zg = null;
    function $g() {
      Zg = Yg = Xg = null;
    }
    function ah(a2) {
      var b2 = Wg.current;
      E2(Wg);
      a2._currentValue = b2;
    }
    function bh(a2, b2, c2) {
      for (; null !== a2; ) {
        var d2 = a2.alternate;
        (a2.childLanes & b2) !== b2 ? (a2.childLanes |= b2, null !== d2 && (d2.childLanes |= b2)) : null !== d2 && (d2.childLanes & b2) !== b2 && (d2.childLanes |= b2);
        if (a2 === c2) break;
        a2 = a2.return;
      }
    }
    function ch(a2, b2) {
      Xg = a2;
      Zg = Yg = null;
      a2 = a2.dependencies;
      null !== a2 && null !== a2.firstContext && (0 !== (a2.lanes & b2) && (dh = true), a2.firstContext = null);
    }
    function eh(a2) {
      var b2 = a2._currentValue;
      if (Zg !== a2) if (a2 = { context: a2, memoizedValue: b2, next: null }, null === Yg) {
        if (null === Xg) throw Error(p2(308));
        Yg = a2;
        Xg.dependencies = { lanes: 0, firstContext: a2 };
      } else Yg = Yg.next = a2;
      return b2;
    }
    var fh = null;
    function gh(a2) {
      null === fh ? fh = [a2] : fh.push(a2);
    }
    function hh(a2, b2, c2, d2) {
      var e3 = b2.interleaved;
      null === e3 ? (c2.next = c2, gh(b2)) : (c2.next = e3.next, e3.next = c2);
      b2.interleaved = c2;
      return ih(a2, d2);
    }
    function ih(a2, b2) {
      a2.lanes |= b2;
      var c2 = a2.alternate;
      null !== c2 && (c2.lanes |= b2);
      c2 = a2;
      for (a2 = a2.return; null !== a2; ) a2.childLanes |= b2, c2 = a2.alternate, null !== c2 && (c2.childLanes |= b2), c2 = a2, a2 = a2.return;
      return 3 === c2.tag ? c2.stateNode : null;
    }
    var jh = false;
    function kh(a2) {
      a2.updateQueue = { baseState: a2.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
    }
    function lh(a2, b2) {
      a2 = a2.updateQueue;
      b2.updateQueue === a2 && (b2.updateQueue = { baseState: a2.baseState, firstBaseUpdate: a2.firstBaseUpdate, lastBaseUpdate: a2.lastBaseUpdate, shared: a2.shared, effects: a2.effects });
    }
    function mh(a2, b2) {
      return { eventTime: a2, lane: b2, tag: 0, payload: null, callback: null, next: null };
    }
    function nh(a2, b2, c2) {
      var d2 = a2.updateQueue;
      if (null === d2) return null;
      d2 = d2.shared;
      if (0 !== (K2 & 2)) {
        var e3 = d2.pending;
        null === e3 ? b2.next = b2 : (b2.next = e3.next, e3.next = b2);
        d2.pending = b2;
        return ih(a2, c2);
      }
      e3 = d2.interleaved;
      null === e3 ? (b2.next = b2, gh(d2)) : (b2.next = e3.next, e3.next = b2);
      d2.interleaved = b2;
      return ih(a2, c2);
    }
    function oh(a2, b2, c2) {
      b2 = b2.updateQueue;
      if (null !== b2 && (b2 = b2.shared, 0 !== (c2 & 4194240))) {
        var d2 = b2.lanes;
        d2 &= a2.pendingLanes;
        c2 |= d2;
        b2.lanes = c2;
        Cc(a2, c2);
      }
    }
    function ph(a2, b2) {
      var c2 = a2.updateQueue, d2 = a2.alternate;
      if (null !== d2 && (d2 = d2.updateQueue, c2 === d2)) {
        var e3 = null, f2 = null;
        c2 = c2.firstBaseUpdate;
        if (null !== c2) {
          do {
            var g2 = { eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null };
            null === f2 ? e3 = f2 = g2 : f2 = f2.next = g2;
            c2 = c2.next;
          } while (null !== c2);
          null === f2 ? e3 = f2 = b2 : f2 = f2.next = b2;
        } else e3 = f2 = b2;
        c2 = { baseState: d2.baseState, firstBaseUpdate: e3, lastBaseUpdate: f2, shared: d2.shared, effects: d2.effects };
        a2.updateQueue = c2;
        return;
      }
      a2 = c2.lastBaseUpdate;
      null === a2 ? c2.firstBaseUpdate = b2 : a2.next = b2;
      c2.lastBaseUpdate = b2;
    }
    function qh(a2, b2, c2, d2) {
      var e3 = a2.updateQueue;
      jh = false;
      var f2 = e3.firstBaseUpdate, g2 = e3.lastBaseUpdate, h2 = e3.shared.pending;
      if (null !== h2) {
        e3.shared.pending = null;
        var k2 = h2, l2 = k2.next;
        k2.next = null;
        null === g2 ? f2 = l2 : g2.next = l2;
        g2 = k2;
        var m2 = a2.alternate;
        null !== m2 && (m2 = m2.updateQueue, h2 = m2.lastBaseUpdate, h2 !== g2 && (null === h2 ? m2.firstBaseUpdate = l2 : h2.next = l2, m2.lastBaseUpdate = k2));
      }
      if (null !== f2) {
        var q2 = e3.baseState;
        g2 = 0;
        m2 = l2 = k2 = null;
        h2 = f2;
        do {
          var r2 = h2.lane, y2 = h2.eventTime;
          if ((d2 & r2) === r2) {
            null !== m2 && (m2 = m2.next = {
              eventTime: y2,
              lane: 0,
              tag: h2.tag,
              payload: h2.payload,
              callback: h2.callback,
              next: null
            });
            a: {
              var n2 = a2, t2 = h2;
              r2 = b2;
              y2 = c2;
              switch (t2.tag) {
                case 1:
                  n2 = t2.payload;
                  if ("function" === typeof n2) {
                    q2 = n2.call(y2, q2, r2);
                    break a;
                  }
                  q2 = n2;
                  break a;
                case 3:
                  n2.flags = n2.flags & -65537 | 128;
                case 0:
                  n2 = t2.payload;
                  r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
                  if (null === r2 || void 0 === r2) break a;
                  q2 = A2({}, q2, r2);
                  break a;
                case 2:
                  jh = true;
              }
            }
            null !== h2.callback && 0 !== h2.lane && (a2.flags |= 64, r2 = e3.effects, null === r2 ? e3.effects = [h2] : r2.push(h2));
          } else y2 = { eventTime: y2, lane: r2, tag: h2.tag, payload: h2.payload, callback: h2.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g2 |= r2;
          h2 = h2.next;
          if (null === h2) if (h2 = e3.shared.pending, null === h2) break;
          else r2 = h2, h2 = r2.next, r2.next = null, e3.lastBaseUpdate = r2, e3.shared.pending = null;
        } while (1);
        null === m2 && (k2 = q2);
        e3.baseState = k2;
        e3.firstBaseUpdate = l2;
        e3.lastBaseUpdate = m2;
        b2 = e3.shared.interleaved;
        if (null !== b2) {
          e3 = b2;
          do
            g2 |= e3.lane, e3 = e3.next;
          while (e3 !== b2);
        } else null === f2 && (e3.shared.lanes = 0);
        rh |= g2;
        a2.lanes = g2;
        a2.memoizedState = q2;
      }
    }
    function sh(a2, b2, c2) {
      a2 = b2.effects;
      b2.effects = null;
      if (null !== a2) for (b2 = 0; b2 < a2.length; b2++) {
        var d2 = a2[b2], e3 = d2.callback;
        if (null !== e3) {
          d2.callback = null;
          d2 = c2;
          if ("function" !== typeof e3) throw Error(p2(191, e3));
          e3.call(d2);
        }
      }
    }
    var th = {};
    var uh = Uf(th);
    var vh = Uf(th);
    var wh = Uf(th);
    function xh(a2) {
      if (a2 === th) throw Error(p2(174));
      return a2;
    }
    function yh(a2, b2) {
      G2(wh, b2);
      G2(vh, a2);
      G2(uh, th);
      a2 = b2.nodeType;
      switch (a2) {
        case 9:
        case 11:
          b2 = (b2 = b2.documentElement) ? b2.namespaceURI : lb(null, "");
          break;
        default:
          a2 = 8 === a2 ? b2.parentNode : b2, b2 = a2.namespaceURI || null, a2 = a2.tagName, b2 = lb(b2, a2);
      }
      E2(uh);
      G2(uh, b2);
    }
    function zh() {
      E2(uh);
      E2(vh);
      E2(wh);
    }
    function Ah(a2) {
      xh(wh.current);
      var b2 = xh(uh.current);
      var c2 = lb(b2, a2.type);
      b2 !== c2 && (G2(vh, a2), G2(uh, c2));
    }
    function Bh(a2) {
      vh.current === a2 && (E2(uh), E2(vh));
    }
    var L2 = Uf(0);
    function Ch(a2) {
      for (var b2 = a2; null !== b2; ) {
        if (13 === b2.tag) {
          var c2 = b2.memoizedState;
          if (null !== c2 && (c2 = c2.dehydrated, null === c2 || "$?" === c2.data || "$!" === c2.data)) return b2;
        } else if (19 === b2.tag && void 0 !== b2.memoizedProps.revealOrder) {
          if (0 !== (b2.flags & 128)) return b2;
        } else if (null !== b2.child) {
          b2.child.return = b2;
          b2 = b2.child;
          continue;
        }
        if (b2 === a2) break;
        for (; null === b2.sibling; ) {
          if (null === b2.return || b2.return === a2) return null;
          b2 = b2.return;
        }
        b2.sibling.return = b2.return;
        b2 = b2.sibling;
      }
      return null;
    }
    var Dh = [];
    function Eh() {
      for (var a2 = 0; a2 < Dh.length; a2++) Dh[a2]._workInProgressVersionPrimary = null;
      Dh.length = 0;
    }
    var Fh = ua2.ReactCurrentDispatcher;
    var Gh = ua2.ReactCurrentBatchConfig;
    var Hh = 0;
    var M2 = null;
    var N2 = null;
    var O2 = null;
    var Ih = false;
    var Jh = false;
    var Kh = 0;
    var Lh = 0;
    function P2() {
      throw Error(p2(321));
    }
    function Mh(a2, b2) {
      if (null === b2) return false;
      for (var c2 = 0; c2 < b2.length && c2 < a2.length; c2++) if (!He2(a2[c2], b2[c2])) return false;
      return true;
    }
    function Nh(a2, b2, c2, d2, e3, f2) {
      Hh = f2;
      M2 = b2;
      b2.memoizedState = null;
      b2.updateQueue = null;
      b2.lanes = 0;
      Fh.current = null === a2 || null === a2.memoizedState ? Oh : Ph;
      a2 = c2(d2, e3);
      if (Jh) {
        f2 = 0;
        do {
          Jh = false;
          Kh = 0;
          if (25 <= f2) throw Error(p2(301));
          f2 += 1;
          O2 = N2 = null;
          b2.updateQueue = null;
          Fh.current = Qh;
          a2 = c2(d2, e3);
        } while (Jh);
      }
      Fh.current = Rh;
      b2 = null !== N2 && null !== N2.next;
      Hh = 0;
      O2 = N2 = M2 = null;
      Ih = false;
      if (b2) throw Error(p2(300));
      return a2;
    }
    function Sh() {
      var a2 = 0 !== Kh;
      Kh = 0;
      return a2;
    }
    function Th() {
      var a2 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
      null === O2 ? M2.memoizedState = O2 = a2 : O2 = O2.next = a2;
      return O2;
    }
    function Uh() {
      if (null === N2) {
        var a2 = M2.alternate;
        a2 = null !== a2 ? a2.memoizedState : null;
      } else a2 = N2.next;
      var b2 = null === O2 ? M2.memoizedState : O2.next;
      if (null !== b2) O2 = b2, N2 = a2;
      else {
        if (null === a2) throw Error(p2(310));
        N2 = a2;
        a2 = { memoizedState: N2.memoizedState, baseState: N2.baseState, baseQueue: N2.baseQueue, queue: N2.queue, next: null };
        null === O2 ? M2.memoizedState = O2 = a2 : O2 = O2.next = a2;
      }
      return O2;
    }
    function Vh(a2, b2) {
      return "function" === typeof b2 ? b2(a2) : b2;
    }
    function Wh(a2) {
      var b2 = Uh(), c2 = b2.queue;
      if (null === c2) throw Error(p2(311));
      c2.lastRenderedReducer = a2;
      var d2 = N2, e3 = d2.baseQueue, f2 = c2.pending;
      if (null !== f2) {
        if (null !== e3) {
          var g2 = e3.next;
          e3.next = f2.next;
          f2.next = g2;
        }
        d2.baseQueue = e3 = f2;
        c2.pending = null;
      }
      if (null !== e3) {
        f2 = e3.next;
        d2 = d2.baseState;
        var h2 = g2 = null, k2 = null, l2 = f2;
        do {
          var m2 = l2.lane;
          if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d2 = l2.hasEagerState ? l2.eagerState : a2(d2, l2.action);
          else {
            var q2 = {
              lane: m2,
              action: l2.action,
              hasEagerState: l2.hasEagerState,
              eagerState: l2.eagerState,
              next: null
            };
            null === k2 ? (h2 = k2 = q2, g2 = d2) : k2 = k2.next = q2;
            M2.lanes |= m2;
            rh |= m2;
          }
          l2 = l2.next;
        } while (null !== l2 && l2 !== f2);
        null === k2 ? g2 = d2 : k2.next = h2;
        He2(d2, b2.memoizedState) || (dh = true);
        b2.memoizedState = d2;
        b2.baseState = g2;
        b2.baseQueue = k2;
        c2.lastRenderedState = d2;
      }
      a2 = c2.interleaved;
      if (null !== a2) {
        e3 = a2;
        do
          f2 = e3.lane, M2.lanes |= f2, rh |= f2, e3 = e3.next;
        while (e3 !== a2);
      } else null === e3 && (c2.lanes = 0);
      return [b2.memoizedState, c2.dispatch];
    }
    function Xh(a2) {
      var b2 = Uh(), c2 = b2.queue;
      if (null === c2) throw Error(p2(311));
      c2.lastRenderedReducer = a2;
      var d2 = c2.dispatch, e3 = c2.pending, f2 = b2.memoizedState;
      if (null !== e3) {
        c2.pending = null;
        var g2 = e3 = e3.next;
        do
          f2 = a2(f2, g2.action), g2 = g2.next;
        while (g2 !== e3);
        He2(f2, b2.memoizedState) || (dh = true);
        b2.memoizedState = f2;
        null === b2.baseQueue && (b2.baseState = f2);
        c2.lastRenderedState = f2;
      }
      return [f2, d2];
    }
    function Yh() {
    }
    function Zh(a2, b2) {
      var c2 = M2, d2 = Uh(), e3 = b2(), f2 = !He2(d2.memoizedState, e3);
      f2 && (d2.memoizedState = e3, dh = true);
      d2 = d2.queue;
      $h(ai2.bind(null, c2, d2, a2), [a2]);
      if (d2.getSnapshot !== b2 || f2 || null !== O2 && O2.memoizedState.tag & 1) {
        c2.flags |= 2048;
        bi2(9, ci2.bind(null, c2, d2, e3, b2), void 0, null);
        if (null === Q2) throw Error(p2(349));
        0 !== (Hh & 30) || di2(c2, b2, e3);
      }
      return e3;
    }
    function di2(a2, b2, c2) {
      a2.flags |= 16384;
      a2 = { getSnapshot: b2, value: c2 };
      b2 = M2.updateQueue;
      null === b2 ? (b2 = { lastEffect: null, stores: null }, M2.updateQueue = b2, b2.stores = [a2]) : (c2 = b2.stores, null === c2 ? b2.stores = [a2] : c2.push(a2));
    }
    function ci2(a2, b2, c2, d2) {
      b2.value = c2;
      b2.getSnapshot = d2;
      ei2(b2) && fi2(a2);
    }
    function ai2(a2, b2, c2) {
      return c2(function() {
        ei2(b2) && fi2(a2);
      });
    }
    function ei2(a2) {
      var b2 = a2.getSnapshot;
      a2 = a2.value;
      try {
        var c2 = b2();
        return !He2(a2, c2);
      } catch (d2) {
        return true;
      }
    }
    function fi2(a2) {
      var b2 = ih(a2, 1);
      null !== b2 && gi2(b2, a2, 1, -1);
    }
    function hi2(a2) {
      var b2 = Th();
      "function" === typeof a2 && (a2 = a2());
      b2.memoizedState = b2.baseState = a2;
      a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a2 };
      b2.queue = a2;
      a2 = a2.dispatch = ii2.bind(null, M2, a2);
      return [b2.memoizedState, a2];
    }
    function bi2(a2, b2, c2, d2) {
      a2 = { tag: a2, create: b2, destroy: c2, deps: d2, next: null };
      b2 = M2.updateQueue;
      null === b2 ? (b2 = { lastEffect: null, stores: null }, M2.updateQueue = b2, b2.lastEffect = a2.next = a2) : (c2 = b2.lastEffect, null === c2 ? b2.lastEffect = a2.next = a2 : (d2 = c2.next, c2.next = a2, a2.next = d2, b2.lastEffect = a2));
      return a2;
    }
    function ji2() {
      return Uh().memoizedState;
    }
    function ki2(a2, b2, c2, d2) {
      var e3 = Th();
      M2.flags |= a2;
      e3.memoizedState = bi2(1 | b2, c2, void 0, void 0 === d2 ? null : d2);
    }
    function li2(a2, b2, c2, d2) {
      var e3 = Uh();
      d2 = void 0 === d2 ? null : d2;
      var f2 = void 0;
      if (null !== N2) {
        var g2 = N2.memoizedState;
        f2 = g2.destroy;
        if (null !== d2 && Mh(d2, g2.deps)) {
          e3.memoizedState = bi2(b2, c2, f2, d2);
          return;
        }
      }
      M2.flags |= a2;
      e3.memoizedState = bi2(1 | b2, c2, f2, d2);
    }
    function mi2(a2, b2) {
      return ki2(8390656, 8, a2, b2);
    }
    function $h(a2, b2) {
      return li2(2048, 8, a2, b2);
    }
    function ni2(a2, b2) {
      return li2(4, 2, a2, b2);
    }
    function oi2(a2, b2) {
      return li2(4, 4, a2, b2);
    }
    function pi2(a2, b2) {
      if ("function" === typeof b2) return a2 = a2(), b2(a2), function() {
        b2(null);
      };
      if (null !== b2 && void 0 !== b2) return a2 = a2(), b2.current = a2, function() {
        b2.current = null;
      };
    }
    function qi2(a2, b2, c2) {
      c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
      return li2(4, 4, pi2.bind(null, b2, a2), c2);
    }
    function ri2() {
    }
    function si2(a2, b2) {
      var c2 = Uh();
      b2 = void 0 === b2 ? null : b2;
      var d2 = c2.memoizedState;
      if (null !== d2 && null !== b2 && Mh(b2, d2[1])) return d2[0];
      c2.memoizedState = [a2, b2];
      return a2;
    }
    function ti2(a2, b2) {
      var c2 = Uh();
      b2 = void 0 === b2 ? null : b2;
      var d2 = c2.memoizedState;
      if (null !== d2 && null !== b2 && Mh(b2, d2[1])) return d2[0];
      a2 = a2();
      c2.memoizedState = [a2, b2];
      return a2;
    }
    function ui2(a2, b2, c2) {
      if (0 === (Hh & 21)) return a2.baseState && (a2.baseState = false, dh = true), a2.memoizedState = c2;
      He2(c2, b2) || (c2 = yc(), M2.lanes |= c2, rh |= c2, a2.baseState = true);
      return b2;
    }
    function vi2(a2, b2) {
      var c2 = C2;
      C2 = 0 !== c2 && 4 > c2 ? c2 : 4;
      a2(true);
      var d2 = Gh.transition;
      Gh.transition = {};
      try {
        a2(false), b2();
      } finally {
        C2 = c2, Gh.transition = d2;
      }
    }
    function wi2() {
      return Uh().memoizedState;
    }
    function xi2(a2, b2, c2) {
      var d2 = yi2(a2);
      c2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
      if (zi2(a2)) Ai2(b2, c2);
      else if (c2 = hh(a2, b2, c2, d2), null !== c2) {
        var e3 = R2();
        gi2(c2, a2, d2, e3);
        Bi2(c2, b2, d2);
      }
    }
    function ii2(a2, b2, c2) {
      var d2 = yi2(a2), e3 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
      if (zi2(a2)) Ai2(b2, e3);
      else {
        var f2 = a2.alternate;
        if (0 === a2.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b2.lastRenderedReducer, null !== f2)) try {
          var g2 = b2.lastRenderedState, h2 = f2(g2, c2);
          e3.hasEagerState = true;
          e3.eagerState = h2;
          if (He2(h2, g2)) {
            var k2 = b2.interleaved;
            null === k2 ? (e3.next = e3, gh(b2)) : (e3.next = k2.next, k2.next = e3);
            b2.interleaved = e3;
            return;
          }
        } catch (l2) {
        } finally {
        }
        c2 = hh(a2, b2, e3, d2);
        null !== c2 && (e3 = R2(), gi2(c2, a2, d2, e3), Bi2(c2, b2, d2));
      }
    }
    function zi2(a2) {
      var b2 = a2.alternate;
      return a2 === M2 || null !== b2 && b2 === M2;
    }
    function Ai2(a2, b2) {
      Jh = Ih = true;
      var c2 = a2.pending;
      null === c2 ? b2.next = b2 : (b2.next = c2.next, c2.next = b2);
      a2.pending = b2;
    }
    function Bi2(a2, b2, c2) {
      if (0 !== (c2 & 4194240)) {
        var d2 = b2.lanes;
        d2 &= a2.pendingLanes;
        c2 |= d2;
        b2.lanes = c2;
        Cc(a2, c2);
      }
    }
    var Rh = { readContext: eh, useCallback: P2, useContext: P2, useEffect: P2, useImperativeHandle: P2, useInsertionEffect: P2, useLayoutEffect: P2, useMemo: P2, useReducer: P2, useRef: P2, useState: P2, useDebugValue: P2, useDeferredValue: P2, useTransition: P2, useMutableSource: P2, useSyncExternalStore: P2, useId: P2, unstable_isNewReconciler: false };
    var Oh = { readContext: eh, useCallback: function(a2, b2) {
      Th().memoizedState = [a2, void 0 === b2 ? null : b2];
      return a2;
    }, useContext: eh, useEffect: mi2, useImperativeHandle: function(a2, b2, c2) {
      c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
      return ki2(
        4194308,
        4,
        pi2.bind(null, b2, a2),
        c2
      );
    }, useLayoutEffect: function(a2, b2) {
      return ki2(4194308, 4, a2, b2);
    }, useInsertionEffect: function(a2, b2) {
      return ki2(4, 2, a2, b2);
    }, useMemo: function(a2, b2) {
      var c2 = Th();
      b2 = void 0 === b2 ? null : b2;
      a2 = a2();
      c2.memoizedState = [a2, b2];
      return a2;
    }, useReducer: function(a2, b2, c2) {
      var d2 = Th();
      b2 = void 0 !== c2 ? c2(b2) : b2;
      d2.memoizedState = d2.baseState = b2;
      a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a2, lastRenderedState: b2 };
      d2.queue = a2;
      a2 = a2.dispatch = xi2.bind(null, M2, a2);
      return [d2.memoizedState, a2];
    }, useRef: function(a2) {
      var b2 = Th();
      a2 = { current: a2 };
      return b2.memoizedState = a2;
    }, useState: hi2, useDebugValue: ri2, useDeferredValue: function(a2) {
      return Th().memoizedState = a2;
    }, useTransition: function() {
      var a2 = hi2(false), b2 = a2[0];
      a2 = vi2.bind(null, a2[1]);
      Th().memoizedState = a2;
      return [b2, a2];
    }, useMutableSource: function() {
    }, useSyncExternalStore: function(a2, b2, c2) {
      var d2 = M2, e3 = Th();
      if (I2) {
        if (void 0 === c2) throw Error(p2(407));
        c2 = c2();
      } else {
        c2 = b2();
        if (null === Q2) throw Error(p2(349));
        0 !== (Hh & 30) || di2(d2, b2, c2);
      }
      e3.memoizedState = c2;
      var f2 = { value: c2, getSnapshot: b2 };
      e3.queue = f2;
      mi2(ai2.bind(
        null,
        d2,
        f2,
        a2
      ), [a2]);
      d2.flags |= 2048;
      bi2(9, ci2.bind(null, d2, f2, c2, b2), void 0, null);
      return c2;
    }, useId: function() {
      var a2 = Th(), b2 = Q2.identifierPrefix;
      if (I2) {
        var c2 = sg;
        var d2 = rg;
        c2 = (d2 & ~(1 << 32 - oc(d2) - 1)).toString(32) + c2;
        b2 = ":" + b2 + "R" + c2;
        c2 = Kh++;
        0 < c2 && (b2 += "H" + c2.toString(32));
        b2 += ":";
      } else c2 = Lh++, b2 = ":" + b2 + "r" + c2.toString(32) + ":";
      return a2.memoizedState = b2;
    }, unstable_isNewReconciler: false };
    var Ph = {
      readContext: eh,
      useCallback: si2,
      useContext: eh,
      useEffect: $h,
      useImperativeHandle: qi2,
      useInsertionEffect: ni2,
      useLayoutEffect: oi2,
      useMemo: ti2,
      useReducer: Wh,
      useRef: ji2,
      useState: function() {
        return Wh(Vh);
      },
      useDebugValue: ri2,
      useDeferredValue: function(a2) {
        var b2 = Uh();
        return ui2(b2, N2.memoizedState, a2);
      },
      useTransition: function() {
        var a2 = Wh(Vh)[0], b2 = Uh().memoizedState;
        return [a2, b2];
      },
      useMutableSource: Yh,
      useSyncExternalStore: Zh,
      useId: wi2,
      unstable_isNewReconciler: false
    };
    var Qh = { readContext: eh, useCallback: si2, useContext: eh, useEffect: $h, useImperativeHandle: qi2, useInsertionEffect: ni2, useLayoutEffect: oi2, useMemo: ti2, useReducer: Xh, useRef: ji2, useState: function() {
      return Xh(Vh);
    }, useDebugValue: ri2, useDeferredValue: function(a2) {
      var b2 = Uh();
      return null === N2 ? b2.memoizedState = a2 : ui2(b2, N2.memoizedState, a2);
    }, useTransition: function() {
      var a2 = Xh(Vh)[0], b2 = Uh().memoizedState;
      return [a2, b2];
    }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi2, unstable_isNewReconciler: false };
    function Ci2(a2, b2) {
      if (a2 && a2.defaultProps) {
        b2 = A2({}, b2);
        a2 = a2.defaultProps;
        for (var c2 in a2) void 0 === b2[c2] && (b2[c2] = a2[c2]);
        return b2;
      }
      return b2;
    }
    function Di2(a2, b2, c2, d2) {
      b2 = a2.memoizedState;
      c2 = c2(d2, b2);
      c2 = null === c2 || void 0 === c2 ? b2 : A2({}, b2, c2);
      a2.memoizedState = c2;
      0 === a2.lanes && (a2.updateQueue.baseState = c2);
    }
    var Ei2 = { isMounted: function(a2) {
      return (a2 = a2._reactInternals) ? Vb(a2) === a2 : false;
    }, enqueueSetState: function(a2, b2, c2) {
      a2 = a2._reactInternals;
      var d2 = R2(), e3 = yi2(a2), f2 = mh(d2, e3);
      f2.payload = b2;
      void 0 !== c2 && null !== c2 && (f2.callback = c2);
      b2 = nh(a2, f2, e3);
      null !== b2 && (gi2(b2, a2, e3, d2), oh(b2, a2, e3));
    }, enqueueReplaceState: function(a2, b2, c2) {
      a2 = a2._reactInternals;
      var d2 = R2(), e3 = yi2(a2), f2 = mh(d2, e3);
      f2.tag = 1;
      f2.payload = b2;
      void 0 !== c2 && null !== c2 && (f2.callback = c2);
      b2 = nh(a2, f2, e3);
      null !== b2 && (gi2(b2, a2, e3, d2), oh(b2, a2, e3));
    }, enqueueForceUpdate: function(a2, b2) {
      a2 = a2._reactInternals;
      var c2 = R2(), d2 = yi2(a2), e3 = mh(c2, d2);
      e3.tag = 2;
      void 0 !== b2 && null !== b2 && (e3.callback = b2);
      b2 = nh(a2, e3, d2);
      null !== b2 && (gi2(b2, a2, d2, c2), oh(b2, a2, d2));
    } };
    function Fi2(a2, b2, c2, d2, e3, f2, g2) {
      a2 = a2.stateNode;
      return "function" === typeof a2.shouldComponentUpdate ? a2.shouldComponentUpdate(d2, f2, g2) : b2.prototype && b2.prototype.isPureReactComponent ? !Ie2(c2, d2) || !Ie2(e3, f2) : true;
    }
    function Gi2(a2, b2, c2) {
      var d2 = false, e3 = Vf;
      var f2 = b2.contextType;
      "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e3 = Zf(b2) ? Xf : H2.current, d2 = b2.contextTypes, f2 = (d2 = null !== d2 && void 0 !== d2) ? Yf(a2, e3) : Vf);
      b2 = new b2(c2, f2);
      a2.memoizedState = null !== b2.state && void 0 !== b2.state ? b2.state : null;
      b2.updater = Ei2;
      a2.stateNode = b2;
      b2._reactInternals = a2;
      d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = e3, a2.__reactInternalMemoizedMaskedChildContext = f2);
      return b2;
    }
    function Hi2(a2, b2, c2, d2) {
      a2 = b2.state;
      "function" === typeof b2.componentWillReceiveProps && b2.componentWillReceiveProps(c2, d2);
      "function" === typeof b2.UNSAFE_componentWillReceiveProps && b2.UNSAFE_componentWillReceiveProps(c2, d2);
      b2.state !== a2 && Ei2.enqueueReplaceState(b2, b2.state, null);
    }
    function Ii2(a2, b2, c2, d2) {
      var e3 = a2.stateNode;
      e3.props = c2;
      e3.state = a2.memoizedState;
      e3.refs = {};
      kh(a2);
      var f2 = b2.contextType;
      "object" === typeof f2 && null !== f2 ? e3.context = eh(f2) : (f2 = Zf(b2) ? Xf : H2.current, e3.context = Yf(a2, f2));
      e3.state = a2.memoizedState;
      f2 = b2.getDerivedStateFromProps;
      "function" === typeof f2 && (Di2(a2, b2, f2, c2), e3.state = a2.memoizedState);
      "function" === typeof b2.getDerivedStateFromProps || "function" === typeof e3.getSnapshotBeforeUpdate || "function" !== typeof e3.UNSAFE_componentWillMount && "function" !== typeof e3.componentWillMount || (b2 = e3.state, "function" === typeof e3.componentWillMount && e3.componentWillMount(), "function" === typeof e3.UNSAFE_componentWillMount && e3.UNSAFE_componentWillMount(), b2 !== e3.state && Ei2.enqueueReplaceState(e3, e3.state, null), qh(a2, c2, e3, d2), e3.state = a2.memoizedState);
      "function" === typeof e3.componentDidMount && (a2.flags |= 4194308);
    }
    function Ji2(a2, b2) {
      try {
        var c2 = "", d2 = b2;
        do
          c2 += Pa2(d2), d2 = d2.return;
        while (d2);
        var e3 = c2;
      } catch (f2) {
        e3 = "\nError generating stack: " + f2.message + "\n" + f2.stack;
      }
      return { value: a2, source: b2, stack: e3, digest: null };
    }
    function Ki2(a2, b2, c2) {
      return { value: a2, source: null, stack: null != c2 ? c2 : null, digest: null != b2 ? b2 : null };
    }
    function Li2(a2, b2) {
      try {
        console.error(b2.value);
      } catch (c2) {
        setTimeout(function() {
          throw c2;
        });
      }
    }
    var Mi2 = "function" === typeof WeakMap ? WeakMap : Map;
    function Ni2(a2, b2, c2) {
      c2 = mh(-1, c2);
      c2.tag = 3;
      c2.payload = { element: null };
      var d2 = b2.value;
      c2.callback = function() {
        Oi2 || (Oi2 = true, Pi2 = d2);
        Li2(a2, b2);
      };
      return c2;
    }
    function Qi2(a2, b2, c2) {
      c2 = mh(-1, c2);
      c2.tag = 3;
      var d2 = a2.type.getDerivedStateFromError;
      if ("function" === typeof d2) {
        var e3 = b2.value;
        c2.payload = function() {
          return d2(e3);
        };
        c2.callback = function() {
          Li2(a2, b2);
        };
      }
      var f2 = a2.stateNode;
      null !== f2 && "function" === typeof f2.componentDidCatch && (c2.callback = function() {
        Li2(a2, b2);
        "function" !== typeof d2 && (null === Ri2 ? Ri2 = /* @__PURE__ */ new Set([this]) : Ri2.add(this));
        var c3 = b2.stack;
        this.componentDidCatch(b2.value, { componentStack: null !== c3 ? c3 : "" });
      });
      return c2;
    }
    function Si2(a2, b2, c2) {
      var d2 = a2.pingCache;
      if (null === d2) {
        d2 = a2.pingCache = new Mi2();
        var e3 = /* @__PURE__ */ new Set();
        d2.set(b2, e3);
      } else e3 = d2.get(b2), void 0 === e3 && (e3 = /* @__PURE__ */ new Set(), d2.set(b2, e3));
      e3.has(c2) || (e3.add(c2), a2 = Ti2.bind(null, a2, b2, c2), b2.then(a2, a2));
    }
    function Ui2(a2) {
      do {
        var b2;
        if (b2 = 13 === a2.tag) b2 = a2.memoizedState, b2 = null !== b2 ? null !== b2.dehydrated ? true : false : true;
        if (b2) return a2;
        a2 = a2.return;
      } while (null !== a2);
      return null;
    }
    function Vi2(a2, b2, c2, d2, e3) {
      if (0 === (a2.mode & 1)) return a2 === b2 ? a2.flags |= 65536 : (a2.flags |= 128, c2.flags |= 131072, c2.flags &= -52805, 1 === c2.tag && (null === c2.alternate ? c2.tag = 17 : (b2 = mh(-1, 1), b2.tag = 2, nh(c2, b2, 1))), c2.lanes |= 1), a2;
      a2.flags |= 65536;
      a2.lanes = e3;
      return a2;
    }
    var Wi2 = ua2.ReactCurrentOwner;
    var dh = false;
    function Xi2(a2, b2, c2, d2) {
      b2.child = null === a2 ? Vg(b2, null, c2, d2) : Ug(b2, a2.child, c2, d2);
    }
    function Yi2(a2, b2, c2, d2, e3) {
      c2 = c2.render;
      var f2 = b2.ref;
      ch(b2, e3);
      d2 = Nh(a2, b2, c2, d2, f2, e3);
      c2 = Sh();
      if (null !== a2 && !dh) return b2.updateQueue = a2.updateQueue, b2.flags &= -2053, a2.lanes &= ~e3, Zi2(a2, b2, e3);
      I2 && c2 && vg(b2);
      b2.flags |= 1;
      Xi2(a2, b2, d2, e3);
      return b2.child;
    }
    function $i2(a2, b2, c2, d2, e3) {
      if (null === a2) {
        var f2 = c2.type;
        if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c2.compare && void 0 === c2.defaultProps) return b2.tag = 15, b2.type = f2, bj(a2, b2, f2, d2, e3);
        a2 = Rg(c2.type, null, d2, b2, b2.mode, e3);
        a2.ref = b2.ref;
        a2.return = b2;
        return b2.child = a2;
      }
      f2 = a2.child;
      if (0 === (a2.lanes & e3)) {
        var g2 = f2.memoizedProps;
        c2 = c2.compare;
        c2 = null !== c2 ? c2 : Ie2;
        if (c2(g2, d2) && a2.ref === b2.ref) return Zi2(a2, b2, e3);
      }
      b2.flags |= 1;
      a2 = Pg(f2, d2);
      a2.ref = b2.ref;
      a2.return = b2;
      return b2.child = a2;
    }
    function bj(a2, b2, c2, d2, e3) {
      if (null !== a2) {
        var f2 = a2.memoizedProps;
        if (Ie2(f2, d2) && a2.ref === b2.ref) if (dh = false, b2.pendingProps = d2 = f2, 0 !== (a2.lanes & e3)) 0 !== (a2.flags & 131072) && (dh = true);
        else return b2.lanes = a2.lanes, Zi2(a2, b2, e3);
      }
      return cj(a2, b2, c2, d2, e3);
    }
    function dj(a2, b2, c2) {
      var d2 = b2.pendingProps, e3 = d2.children, f2 = null !== a2 ? a2.memoizedState : null;
      if ("hidden" === d2.mode) if (0 === (b2.mode & 1)) b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G2(ej, fj), fj |= c2;
      else {
        if (0 === (c2 & 1073741824)) return a2 = null !== f2 ? f2.baseLanes | c2 : c2, b2.lanes = b2.childLanes = 1073741824, b2.memoizedState = { baseLanes: a2, cachePool: null, transitions: null }, b2.updateQueue = null, G2(ej, fj), fj |= a2, null;
        b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
        d2 = null !== f2 ? f2.baseLanes : c2;
        G2(ej, fj);
        fj |= d2;
      }
      else null !== f2 ? (d2 = f2.baseLanes | c2, b2.memoizedState = null) : d2 = c2, G2(ej, fj), fj |= d2;
      Xi2(a2, b2, e3, c2);
      return b2.child;
    }
    function gj(a2, b2) {
      var c2 = b2.ref;
      if (null === a2 && null !== c2 || null !== a2 && a2.ref !== c2) b2.flags |= 512, b2.flags |= 2097152;
    }
    function cj(a2, b2, c2, d2, e3) {
      var f2 = Zf(c2) ? Xf : H2.current;
      f2 = Yf(b2, f2);
      ch(b2, e3);
      c2 = Nh(a2, b2, c2, d2, f2, e3);
      d2 = Sh();
      if (null !== a2 && !dh) return b2.updateQueue = a2.updateQueue, b2.flags &= -2053, a2.lanes &= ~e3, Zi2(a2, b2, e3);
      I2 && d2 && vg(b2);
      b2.flags |= 1;
      Xi2(a2, b2, c2, e3);
      return b2.child;
    }
    function hj(a2, b2, c2, d2, e3) {
      if (Zf(c2)) {
        var f2 = true;
        cg(b2);
      } else f2 = false;
      ch(b2, e3);
      if (null === b2.stateNode) ij(a2, b2), Gi2(b2, c2, d2), Ii2(b2, c2, d2, e3), d2 = true;
      else if (null === a2) {
        var g2 = b2.stateNode, h2 = b2.memoizedProps;
        g2.props = h2;
        var k2 = g2.context, l2 = c2.contextType;
        "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c2) ? Xf : H2.current, l2 = Yf(b2, l2));
        var m2 = c2.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g2.getSnapshotBeforeUpdate;
        q2 || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== d2 || k2 !== l2) && Hi2(b2, g2, d2, l2);
        jh = false;
        var r2 = b2.memoizedState;
        g2.state = r2;
        qh(b2, d2, g2, e3);
        k2 = b2.memoizedState;
        h2 !== d2 || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di2(b2, c2, m2, d2), k2 = b2.memoizedState), (h2 = jh || Fi2(b2, c2, h2, d2, r2, k2, l2)) ? (q2 || "function" !== typeof g2.UNSAFE_componentWillMount && "function" !== typeof g2.componentWillMount || ("function" === typeof g2.componentWillMount && g2.componentWillMount(), "function" === typeof g2.UNSAFE_componentWillMount && g2.UNSAFE_componentWillMount()), "function" === typeof g2.componentDidMount && (b2.flags |= 4194308)) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), b2.memoizedProps = d2, b2.memoizedState = k2), g2.props = d2, g2.state = k2, g2.context = l2, d2 = h2) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), d2 = false);
      } else {
        g2 = b2.stateNode;
        lh(a2, b2);
        h2 = b2.memoizedProps;
        l2 = b2.type === b2.elementType ? h2 : Ci2(b2.type, h2);
        g2.props = l2;
        q2 = b2.pendingProps;
        r2 = g2.context;
        k2 = c2.contextType;
        "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c2) ? Xf : H2.current, k2 = Yf(b2, k2));
        var y2 = c2.getDerivedStateFromProps;
        (m2 = "function" === typeof y2 || "function" === typeof g2.getSnapshotBeforeUpdate) || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== q2 || r2 !== k2) && Hi2(b2, g2, d2, k2);
        jh = false;
        r2 = b2.memoizedState;
        g2.state = r2;
        qh(b2, d2, g2, e3);
        var n2 = b2.memoizedState;
        h2 !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di2(b2, c2, y2, d2), n2 = b2.memoizedState), (l2 = jh || Fi2(b2, c2, l2, d2, r2, n2, k2) || false) ? (m2 || "function" !== typeof g2.UNSAFE_componentWillUpdate && "function" !== typeof g2.componentWillUpdate || ("function" === typeof g2.componentWillUpdate && g2.componentWillUpdate(d2, n2, k2), "function" === typeof g2.UNSAFE_componentWillUpdate && g2.UNSAFE_componentWillUpdate(d2, n2, k2)), "function" === typeof g2.componentDidUpdate && (b2.flags |= 4), "function" === typeof g2.getSnapshotBeforeUpdate && (b2.flags |= 1024)) : ("function" !== typeof g2.componentDidUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b2.flags |= 1024), b2.memoizedProps = d2, b2.memoizedState = n2), g2.props = d2, g2.state = n2, g2.context = k2, d2 = l2) : ("function" !== typeof g2.componentDidUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b2.flags |= 1024), d2 = false);
      }
      return jj(a2, b2, c2, d2, f2, e3);
    }
    function jj(a2, b2, c2, d2, e3, f2) {
      gj(a2, b2);
      var g2 = 0 !== (b2.flags & 128);
      if (!d2 && !g2) return e3 && dg(b2, c2, false), Zi2(a2, b2, f2);
      d2 = b2.stateNode;
      Wi2.current = b2;
      var h2 = g2 && "function" !== typeof c2.getDerivedStateFromError ? null : d2.render();
      b2.flags |= 1;
      null !== a2 && g2 ? (b2.child = Ug(b2, a2.child, null, f2), b2.child = Ug(b2, null, h2, f2)) : Xi2(a2, b2, h2, f2);
      b2.memoizedState = d2.state;
      e3 && dg(b2, c2, true);
      return b2.child;
    }
    function kj(a2) {
      var b2 = a2.stateNode;
      b2.pendingContext ? ag(a2, b2.pendingContext, b2.pendingContext !== b2.context) : b2.context && ag(a2, b2.context, false);
      yh(a2, b2.containerInfo);
    }
    function lj(a2, b2, c2, d2, e3) {
      Ig();
      Jg(e3);
      b2.flags |= 256;
      Xi2(a2, b2, c2, d2);
      return b2.child;
    }
    var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
    function nj(a2) {
      return { baseLanes: a2, cachePool: null, transitions: null };
    }
    function oj(a2, b2, c2) {
      var d2 = b2.pendingProps, e3 = L2.current, f2 = false, g2 = 0 !== (b2.flags & 128), h2;
      (h2 = g2) || (h2 = null !== a2 && null === a2.memoizedState ? false : 0 !== (e3 & 2));
      if (h2) f2 = true, b2.flags &= -129;
      else if (null === a2 || null !== a2.memoizedState) e3 |= 1;
      G2(L2, e3 & 1);
      if (null === a2) {
        Eg(b2);
        a2 = b2.memoizedState;
        if (null !== a2 && (a2 = a2.dehydrated, null !== a2)) return 0 === (b2.mode & 1) ? b2.lanes = 1 : "$!" === a2.data ? b2.lanes = 8 : b2.lanes = 1073741824, null;
        g2 = d2.children;
        a2 = d2.fallback;
        return f2 ? (d2 = b2.mode, f2 = b2.child, g2 = { mode: "hidden", children: g2 }, 0 === (d2 & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g2) : f2 = pj(g2, d2, 0, null), a2 = Tg(a2, d2, c2, null), f2.return = b2, a2.return = b2, f2.sibling = a2, b2.child = f2, b2.child.memoizedState = nj(c2), b2.memoizedState = mj, a2) : qj(b2, g2);
      }
      e3 = a2.memoizedState;
      if (null !== e3 && (h2 = e3.dehydrated, null !== h2)) return rj(a2, b2, g2, d2, h2, e3, c2);
      if (f2) {
        f2 = d2.fallback;
        g2 = b2.mode;
        e3 = a2.child;
        h2 = e3.sibling;
        var k2 = { mode: "hidden", children: d2.children };
        0 === (g2 & 1) && b2.child !== e3 ? (d2 = b2.child, d2.childLanes = 0, d2.pendingProps = k2, b2.deletions = null) : (d2 = Pg(e3, k2), d2.subtreeFlags = e3.subtreeFlags & 14680064);
        null !== h2 ? f2 = Pg(h2, f2) : (f2 = Tg(f2, g2, c2, null), f2.flags |= 2);
        f2.return = b2;
        d2.return = b2;
        d2.sibling = f2;
        b2.child = d2;
        d2 = f2;
        f2 = b2.child;
        g2 = a2.child.memoizedState;
        g2 = null === g2 ? nj(c2) : { baseLanes: g2.baseLanes | c2, cachePool: null, transitions: g2.transitions };
        f2.memoizedState = g2;
        f2.childLanes = a2.childLanes & ~c2;
        b2.memoizedState = mj;
        return d2;
      }
      f2 = a2.child;
      a2 = f2.sibling;
      d2 = Pg(f2, { mode: "visible", children: d2.children });
      0 === (b2.mode & 1) && (d2.lanes = c2);
      d2.return = b2;
      d2.sibling = null;
      null !== a2 && (c2 = b2.deletions, null === c2 ? (b2.deletions = [a2], b2.flags |= 16) : c2.push(a2));
      b2.child = d2;
      b2.memoizedState = null;
      return d2;
    }
    function qj(a2, b2) {
      b2 = pj({ mode: "visible", children: b2 }, a2.mode, 0, null);
      b2.return = a2;
      return a2.child = b2;
    }
    function sj(a2, b2, c2, d2) {
      null !== d2 && Jg(d2);
      Ug(b2, a2.child, null, c2);
      a2 = qj(b2, b2.pendingProps.children);
      a2.flags |= 2;
      b2.memoizedState = null;
      return a2;
    }
    function rj(a2, b2, c2, d2, e3, f2, g2) {
      if (c2) {
        if (b2.flags & 256) return b2.flags &= -257, d2 = Ki2(Error(p2(422))), sj(a2, b2, g2, d2);
        if (null !== b2.memoizedState) return b2.child = a2.child, b2.flags |= 128, null;
        f2 = d2.fallback;
        e3 = b2.mode;
        d2 = pj({ mode: "visible", children: d2.children }, e3, 0, null);
        f2 = Tg(f2, e3, g2, null);
        f2.flags |= 2;
        d2.return = b2;
        f2.return = b2;
        d2.sibling = f2;
        b2.child = d2;
        0 !== (b2.mode & 1) && Ug(b2, a2.child, null, g2);
        b2.child.memoizedState = nj(g2);
        b2.memoizedState = mj;
        return f2;
      }
      if (0 === (b2.mode & 1)) return sj(a2, b2, g2, null);
      if ("$!" === e3.data) {
        d2 = e3.nextSibling && e3.nextSibling.dataset;
        if (d2) var h2 = d2.dgst;
        d2 = h2;
        f2 = Error(p2(419));
        d2 = Ki2(f2, d2, void 0);
        return sj(a2, b2, g2, d2);
      }
      h2 = 0 !== (g2 & a2.childLanes);
      if (dh || h2) {
        d2 = Q2;
        if (null !== d2) {
          switch (g2 & -g2) {
            case 4:
              e3 = 2;
              break;
            case 16:
              e3 = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              e3 = 32;
              break;
            case 536870912:
              e3 = 268435456;
              break;
            default:
              e3 = 0;
          }
          e3 = 0 !== (e3 & (d2.suspendedLanes | g2)) ? 0 : e3;
          0 !== e3 && e3 !== f2.retryLane && (f2.retryLane = e3, ih(a2, e3), gi2(d2, a2, e3, -1));
        }
        tj();
        d2 = Ki2(Error(p2(421)));
        return sj(a2, b2, g2, d2);
      }
      if ("$?" === e3.data) return b2.flags |= 128, b2.child = a2.child, b2 = uj.bind(null, a2), e3._reactRetry = b2, null;
      a2 = f2.treeContext;
      yg = Lf(e3.nextSibling);
      xg = b2;
      I2 = true;
      zg = null;
      null !== a2 && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a2.id, sg = a2.overflow, qg = b2);
      b2 = qj(b2, d2.children);
      b2.flags |= 4096;
      return b2;
    }
    function vj(a2, b2, c2) {
      a2.lanes |= b2;
      var d2 = a2.alternate;
      null !== d2 && (d2.lanes |= b2);
      bh(a2.return, b2, c2);
    }
    function wj(a2, b2, c2, d2, e3) {
      var f2 = a2.memoizedState;
      null === f2 ? a2.memoizedState = { isBackwards: b2, rendering: null, renderingStartTime: 0, last: d2, tail: c2, tailMode: e3 } : (f2.isBackwards = b2, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d2, f2.tail = c2, f2.tailMode = e3);
    }
    function xj(a2, b2, c2) {
      var d2 = b2.pendingProps, e3 = d2.revealOrder, f2 = d2.tail;
      Xi2(a2, b2, d2.children, c2);
      d2 = L2.current;
      if (0 !== (d2 & 2)) d2 = d2 & 1 | 2, b2.flags |= 128;
      else {
        if (null !== a2 && 0 !== (a2.flags & 128)) a: for (a2 = b2.child; null !== a2; ) {
          if (13 === a2.tag) null !== a2.memoizedState && vj(a2, c2, b2);
          else if (19 === a2.tag) vj(a2, c2, b2);
          else if (null !== a2.child) {
            a2.child.return = a2;
            a2 = a2.child;
            continue;
          }
          if (a2 === b2) break a;
          for (; null === a2.sibling; ) {
            if (null === a2.return || a2.return === b2) break a;
            a2 = a2.return;
          }
          a2.sibling.return = a2.return;
          a2 = a2.sibling;
        }
        d2 &= 1;
      }
      G2(L2, d2);
      if (0 === (b2.mode & 1)) b2.memoizedState = null;
      else switch (e3) {
        case "forwards":
          c2 = b2.child;
          for (e3 = null; null !== c2; ) a2 = c2.alternate, null !== a2 && null === Ch(a2) && (e3 = c2), c2 = c2.sibling;
          c2 = e3;
          null === c2 ? (e3 = b2.child, b2.child = null) : (e3 = c2.sibling, c2.sibling = null);
          wj(b2, false, e3, c2, f2);
          break;
        case "backwards":
          c2 = null;
          e3 = b2.child;
          for (b2.child = null; null !== e3; ) {
            a2 = e3.alternate;
            if (null !== a2 && null === Ch(a2)) {
              b2.child = e3;
              break;
            }
            a2 = e3.sibling;
            e3.sibling = c2;
            c2 = e3;
            e3 = a2;
          }
          wj(b2, true, c2, null, f2);
          break;
        case "together":
          wj(b2, false, null, null, void 0);
          break;
        default:
          b2.memoizedState = null;
      }
      return b2.child;
    }
    function ij(a2, b2) {
      0 === (b2.mode & 1) && null !== a2 && (a2.alternate = null, b2.alternate = null, b2.flags |= 2);
    }
    function Zi2(a2, b2, c2) {
      null !== a2 && (b2.dependencies = a2.dependencies);
      rh |= b2.lanes;
      if (0 === (c2 & b2.childLanes)) return null;
      if (null !== a2 && b2.child !== a2.child) throw Error(p2(153));
      if (null !== b2.child) {
        a2 = b2.child;
        c2 = Pg(a2, a2.pendingProps);
        b2.child = c2;
        for (c2.return = b2; null !== a2.sibling; ) a2 = a2.sibling, c2 = c2.sibling = Pg(a2, a2.pendingProps), c2.return = b2;
        c2.sibling = null;
      }
      return b2.child;
    }
    function yj(a2, b2, c2) {
      switch (b2.tag) {
        case 3:
          kj(b2);
          Ig();
          break;
        case 5:
          Ah(b2);
          break;
        case 1:
          Zf(b2.type) && cg(b2);
          break;
        case 4:
          yh(b2, b2.stateNode.containerInfo);
          break;
        case 10:
          var d2 = b2.type._context, e3 = b2.memoizedProps.value;
          G2(Wg, d2._currentValue);
          d2._currentValue = e3;
          break;
        case 13:
          d2 = b2.memoizedState;
          if (null !== d2) {
            if (null !== d2.dehydrated) return G2(L2, L2.current & 1), b2.flags |= 128, null;
            if (0 !== (c2 & b2.child.childLanes)) return oj(a2, b2, c2);
            G2(L2, L2.current & 1);
            a2 = Zi2(a2, b2, c2);
            return null !== a2 ? a2.sibling : null;
          }
          G2(L2, L2.current & 1);
          break;
        case 19:
          d2 = 0 !== (c2 & b2.childLanes);
          if (0 !== (a2.flags & 128)) {
            if (d2) return xj(a2, b2, c2);
            b2.flags |= 128;
          }
          e3 = b2.memoizedState;
          null !== e3 && (e3.rendering = null, e3.tail = null, e3.lastEffect = null);
          G2(L2, L2.current);
          if (d2) break;
          else return null;
        case 22:
        case 23:
          return b2.lanes = 0, dj(a2, b2, c2);
      }
      return Zi2(a2, b2, c2);
    }
    var zj;
    var Aj;
    var Bj;
    var Cj;
    zj = function(a2, b2) {
      for (var c2 = b2.child; null !== c2; ) {
        if (5 === c2.tag || 6 === c2.tag) a2.appendChild(c2.stateNode);
        else if (4 !== c2.tag && null !== c2.child) {
          c2.child.return = c2;
          c2 = c2.child;
          continue;
        }
        if (c2 === b2) break;
        for (; null === c2.sibling; ) {
          if (null === c2.return || c2.return === b2) return;
          c2 = c2.return;
        }
        c2.sibling.return = c2.return;
        c2 = c2.sibling;
      }
    };
    Aj = function() {
    };
    Bj = function(a2, b2, c2, d2) {
      var e3 = a2.memoizedProps;
      if (e3 !== d2) {
        a2 = b2.stateNode;
        xh(uh.current);
        var f2 = null;
        switch (c2) {
          case "input":
            e3 = Ya(a2, e3);
            d2 = Ya(a2, d2);
            f2 = [];
            break;
          case "select":
            e3 = A2({}, e3, { value: void 0 });
            d2 = A2({}, d2, { value: void 0 });
            f2 = [];
            break;
          case "textarea":
            e3 = gb(a2, e3);
            d2 = gb(a2, d2);
            f2 = [];
            break;
          default:
            "function" !== typeof e3.onClick && "function" === typeof d2.onClick && (a2.onclick = Bf);
        }
        ub(c2, d2);
        var g2;
        c2 = null;
        for (l2 in e3) if (!d2.hasOwnProperty(l2) && e3.hasOwnProperty(l2) && null != e3[l2]) if ("style" === l2) {
          var h2 = e3[l2];
          for (g2 in h2) h2.hasOwnProperty(g2) && (c2 || (c2 = {}), c2[g2] = "");
        } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea2.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
        for (l2 in d2) {
          var k2 = d2[l2];
          h2 = null != e3 ? e3[l2] : void 0;
          if (d2.hasOwnProperty(l2) && k2 !== h2 && (null != k2 || null != h2)) if ("style" === l2) if (h2) {
            for (g2 in h2) !h2.hasOwnProperty(g2) || k2 && k2.hasOwnProperty(g2) || (c2 || (c2 = {}), c2[g2] = "");
            for (g2 in k2) k2.hasOwnProperty(g2) && h2[g2] !== k2[g2] && (c2 || (c2 = {}), c2[g2] = k2[g2]);
          } else c2 || (f2 || (f2 = []), f2.push(
            l2,
            c2
          )), c2 = k2;
          else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h2 = h2 ? h2.__html : void 0, null != k2 && h2 !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea2.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D2("scroll", a2), f2 || h2 === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
        }
        c2 && (f2 = f2 || []).push("style", c2);
        var l2 = f2;
        if (b2.updateQueue = l2) b2.flags |= 4;
      }
    };
    Cj = function(a2, b2, c2, d2) {
      c2 !== d2 && (b2.flags |= 4);
    };
    function Dj(a2, b2) {
      if (!I2) switch (a2.tailMode) {
        case "hidden":
          b2 = a2.tail;
          for (var c2 = null; null !== b2; ) null !== b2.alternate && (c2 = b2), b2 = b2.sibling;
          null === c2 ? a2.tail = null : c2.sibling = null;
          break;
        case "collapsed":
          c2 = a2.tail;
          for (var d2 = null; null !== c2; ) null !== c2.alternate && (d2 = c2), c2 = c2.sibling;
          null === d2 ? b2 || null === a2.tail ? a2.tail = null : a2.tail.sibling = null : d2.sibling = null;
      }
    }
    function S2(a2) {
      var b2 = null !== a2.alternate && a2.alternate.child === a2.child, c2 = 0, d2 = 0;
      if (b2) for (var e3 = a2.child; null !== e3; ) c2 |= e3.lanes | e3.childLanes, d2 |= e3.subtreeFlags & 14680064, d2 |= e3.flags & 14680064, e3.return = a2, e3 = e3.sibling;
      else for (e3 = a2.child; null !== e3; ) c2 |= e3.lanes | e3.childLanes, d2 |= e3.subtreeFlags, d2 |= e3.flags, e3.return = a2, e3 = e3.sibling;
      a2.subtreeFlags |= d2;
      a2.childLanes = c2;
      return b2;
    }
    function Ej(a2, b2, c2) {
      var d2 = b2.pendingProps;
      wg(b2);
      switch (b2.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return S2(b2), null;
        case 1:
          return Zf(b2.type) && $f(), S2(b2), null;
        case 3:
          d2 = b2.stateNode;
          zh();
          E2(Wf);
          E2(H2);
          Eh();
          d2.pendingContext && (d2.context = d2.pendingContext, d2.pendingContext = null);
          if (null === a2 || null === a2.child) Gg(b2) ? b2.flags |= 4 : null === a2 || a2.memoizedState.isDehydrated && 0 === (b2.flags & 256) || (b2.flags |= 1024, null !== zg && (Fj(zg), zg = null));
          Aj(a2, b2);
          S2(b2);
          return null;
        case 5:
          Bh(b2);
          var e3 = xh(wh.current);
          c2 = b2.type;
          if (null !== a2 && null != b2.stateNode) Bj(a2, b2, c2, d2, e3), a2.ref !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
          else {
            if (!d2) {
              if (null === b2.stateNode) throw Error(p2(166));
              S2(b2);
              return null;
            }
            a2 = xh(uh.current);
            if (Gg(b2)) {
              d2 = b2.stateNode;
              c2 = b2.type;
              var f2 = b2.memoizedProps;
              d2[Of] = b2;
              d2[Pf] = f2;
              a2 = 0 !== (b2.mode & 1);
              switch (c2) {
                case "dialog":
                  D2("cancel", d2);
                  D2("close", d2);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  D2("load", d2);
                  break;
                case "video":
                case "audio":
                  for (e3 = 0; e3 < lf.length; e3++) D2(lf[e3], d2);
                  break;
                case "source":
                  D2("error", d2);
                  break;
                case "img":
                case "image":
                case "link":
                  D2(
                    "error",
                    d2
                  );
                  D2("load", d2);
                  break;
                case "details":
                  D2("toggle", d2);
                  break;
                case "input":
                  Za(d2, f2);
                  D2("invalid", d2);
                  break;
                case "select":
                  d2._wrapperState = { wasMultiple: !!f2.multiple };
                  D2("invalid", d2);
                  break;
                case "textarea":
                  hb(d2, f2), D2("invalid", d2);
              }
              ub(c2, f2);
              e3 = null;
              for (var g2 in f2) if (f2.hasOwnProperty(g2)) {
                var h2 = f2[g2];
                "children" === g2 ? "string" === typeof h2 ? d2.textContent !== h2 && (true !== f2.suppressHydrationWarning && Af(d2.textContent, h2, a2), e3 = ["children", h2]) : "number" === typeof h2 && d2.textContent !== "" + h2 && (true !== f2.suppressHydrationWarning && Af(
                  d2.textContent,
                  h2,
                  a2
                ), e3 = ["children", "" + h2]) : ea2.hasOwnProperty(g2) && null != h2 && "onScroll" === g2 && D2("scroll", d2);
              }
              switch (c2) {
                case "input":
                  Va(d2);
                  db(d2, f2, true);
                  break;
                case "textarea":
                  Va(d2);
                  jb(d2);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  "function" === typeof f2.onClick && (d2.onclick = Bf);
              }
              d2 = e3;
              b2.updateQueue = d2;
              null !== d2 && (b2.flags |= 4);
            } else {
              g2 = 9 === e3.nodeType ? e3 : e3.ownerDocument;
              "http://www.w3.org/1999/xhtml" === a2 && (a2 = kb(c2));
              "http://www.w3.org/1999/xhtml" === a2 ? "script" === c2 ? (a2 = g2.createElement("div"), a2.innerHTML = "<script><\/script>", a2 = a2.removeChild(a2.firstChild)) : "string" === typeof d2.is ? a2 = g2.createElement(c2, { is: d2.is }) : (a2 = g2.createElement(c2), "select" === c2 && (g2 = a2, d2.multiple ? g2.multiple = true : d2.size && (g2.size = d2.size))) : a2 = g2.createElementNS(a2, c2);
              a2[Of] = b2;
              a2[Pf] = d2;
              zj(a2, b2, false, false);
              b2.stateNode = a2;
              a: {
                g2 = vb(c2, d2);
                switch (c2) {
                  case "dialog":
                    D2("cancel", a2);
                    D2("close", a2);
                    e3 = d2;
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D2("load", a2);
                    e3 = d2;
                    break;
                  case "video":
                  case "audio":
                    for (e3 = 0; e3 < lf.length; e3++) D2(lf[e3], a2);
                    e3 = d2;
                    break;
                  case "source":
                    D2("error", a2);
                    e3 = d2;
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D2(
                      "error",
                      a2
                    );
                    D2("load", a2);
                    e3 = d2;
                    break;
                  case "details":
                    D2("toggle", a2);
                    e3 = d2;
                    break;
                  case "input":
                    Za(a2, d2);
                    e3 = Ya(a2, d2);
                    D2("invalid", a2);
                    break;
                  case "option":
                    e3 = d2;
                    break;
                  case "select":
                    a2._wrapperState = { wasMultiple: !!d2.multiple };
                    e3 = A2({}, d2, { value: void 0 });
                    D2("invalid", a2);
                    break;
                  case "textarea":
                    hb(a2, d2);
                    e3 = gb(a2, d2);
                    D2("invalid", a2);
                    break;
                  default:
                    e3 = d2;
                }
                ub(c2, e3);
                h2 = e3;
                for (f2 in h2) if (h2.hasOwnProperty(f2)) {
                  var k2 = h2[f2];
                  "style" === f2 ? sb(a2, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a2, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c2 || "" !== k2) && ob(a2, k2) : "number" === typeof k2 && ob(a2, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea2.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D2("scroll", a2) : null != k2 && ta2(a2, f2, k2, g2));
                }
                switch (c2) {
                  case "input":
                    Va(a2);
                    db(a2, d2, false);
                    break;
                  case "textarea":
                    Va(a2);
                    jb(a2);
                    break;
                  case "option":
                    null != d2.value && a2.setAttribute("value", "" + Sa2(d2.value));
                    break;
                  case "select":
                    a2.multiple = !!d2.multiple;
                    f2 = d2.value;
                    null != f2 ? fb(a2, !!d2.multiple, f2, false) : null != d2.defaultValue && fb(
                      a2,
                      !!d2.multiple,
                      d2.defaultValue,
                      true
                    );
                    break;
                  default:
                    "function" === typeof e3.onClick && (a2.onclick = Bf);
                }
                switch (c2) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    d2 = !!d2.autoFocus;
                    break a;
                  case "img":
                    d2 = true;
                    break a;
                  default:
                    d2 = false;
                }
              }
              d2 && (b2.flags |= 4);
            }
            null !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
          }
          S2(b2);
          return null;
        case 6:
          if (a2 && null != b2.stateNode) Cj(a2, b2, a2.memoizedProps, d2);
          else {
            if ("string" !== typeof d2 && null === b2.stateNode) throw Error(p2(166));
            c2 = xh(wh.current);
            xh(uh.current);
            if (Gg(b2)) {
              d2 = b2.stateNode;
              c2 = b2.memoizedProps;
              d2[Of] = b2;
              if (f2 = d2.nodeValue !== c2) {
                if (a2 = xg, null !== a2) switch (a2.tag) {
                  case 3:
                    Af(d2.nodeValue, c2, 0 !== (a2.mode & 1));
                    break;
                  case 5:
                    true !== a2.memoizedProps.suppressHydrationWarning && Af(d2.nodeValue, c2, 0 !== (a2.mode & 1));
                }
              }
              f2 && (b2.flags |= 4);
            } else d2 = (9 === c2.nodeType ? c2 : c2.ownerDocument).createTextNode(d2), d2[Of] = b2, b2.stateNode = d2;
          }
          S2(b2);
          return null;
        case 13:
          E2(L2);
          d2 = b2.memoizedState;
          if (null === a2 || null !== a2.memoizedState && null !== a2.memoizedState.dehydrated) {
            if (I2 && null !== yg && 0 !== (b2.mode & 1) && 0 === (b2.flags & 128)) Hg(), Ig(), b2.flags |= 98560, f2 = false;
            else if (f2 = Gg(b2), null !== d2 && null !== d2.dehydrated) {
              if (null === a2) {
                if (!f2) throw Error(p2(318));
                f2 = b2.memoizedState;
                f2 = null !== f2 ? f2.dehydrated : null;
                if (!f2) throw Error(p2(317));
                f2[Of] = b2;
              } else Ig(), 0 === (b2.flags & 128) && (b2.memoizedState = null), b2.flags |= 4;
              S2(b2);
              f2 = false;
            } else null !== zg && (Fj(zg), zg = null), f2 = true;
            if (!f2) return b2.flags & 65536 ? b2 : null;
          }
          if (0 !== (b2.flags & 128)) return b2.lanes = c2, b2;
          d2 = null !== d2;
          d2 !== (null !== a2 && null !== a2.memoizedState) && d2 && (b2.child.flags |= 8192, 0 !== (b2.mode & 1) && (null === a2 || 0 !== (L2.current & 1) ? 0 === T2 && (T2 = 3) : tj()));
          null !== b2.updateQueue && (b2.flags |= 4);
          S2(b2);
          return null;
        case 4:
          return zh(), Aj(a2, b2), null === a2 && sf(b2.stateNode.containerInfo), S2(b2), null;
        case 10:
          return ah(b2.type._context), S2(b2), null;
        case 17:
          return Zf(b2.type) && $f(), S2(b2), null;
        case 19:
          E2(L2);
          f2 = b2.memoizedState;
          if (null === f2) return S2(b2), null;
          d2 = 0 !== (b2.flags & 128);
          g2 = f2.rendering;
          if (null === g2) if (d2) Dj(f2, false);
          else {
            if (0 !== T2 || null !== a2 && 0 !== (a2.flags & 128)) for (a2 = b2.child; null !== a2; ) {
              g2 = Ch(a2);
              if (null !== g2) {
                b2.flags |= 128;
                Dj(f2, false);
                d2 = g2.updateQueue;
                null !== d2 && (b2.updateQueue = d2, b2.flags |= 4);
                b2.subtreeFlags = 0;
                d2 = c2;
                for (c2 = b2.child; null !== c2; ) f2 = c2, a2 = d2, f2.flags &= 14680066, g2 = f2.alternate, null === g2 ? (f2.childLanes = 0, f2.lanes = a2, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g2.childLanes, f2.lanes = g2.lanes, f2.child = g2.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g2.memoizedProps, f2.memoizedState = g2.memoizedState, f2.updateQueue = g2.updateQueue, f2.type = g2.type, a2 = g2.dependencies, f2.dependencies = null === a2 ? null : { lanes: a2.lanes, firstContext: a2.firstContext }), c2 = c2.sibling;
                G2(L2, L2.current & 1 | 2);
                return b2.child;
              }
              a2 = a2.sibling;
            }
            null !== f2.tail && B2() > Gj && (b2.flags |= 128, d2 = true, Dj(f2, false), b2.lanes = 4194304);
          }
          else {
            if (!d2) if (a2 = Ch(g2), null !== a2) {
              if (b2.flags |= 128, d2 = true, c2 = a2.updateQueue, null !== c2 && (b2.updateQueue = c2, b2.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g2.alternate && !I2) return S2(b2), null;
            } else 2 * B2() - f2.renderingStartTime > Gj && 1073741824 !== c2 && (b2.flags |= 128, d2 = true, Dj(f2, false), b2.lanes = 4194304);
            f2.isBackwards ? (g2.sibling = b2.child, b2.child = g2) : (c2 = f2.last, null !== c2 ? c2.sibling = g2 : b2.child = g2, f2.last = g2);
          }
          if (null !== f2.tail) return b2 = f2.tail, f2.rendering = b2, f2.tail = b2.sibling, f2.renderingStartTime = B2(), b2.sibling = null, c2 = L2.current, G2(L2, d2 ? c2 & 1 | 2 : c2 & 1), b2;
          S2(b2);
          return null;
        case 22:
        case 23:
          return Hj(), d2 = null !== b2.memoizedState, null !== a2 && null !== a2.memoizedState !== d2 && (b2.flags |= 8192), d2 && 0 !== (b2.mode & 1) ? 0 !== (fj & 1073741824) && (S2(b2), b2.subtreeFlags & 6 && (b2.flags |= 8192)) : S2(b2), null;
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(p2(156, b2.tag));
    }
    function Ij(a2, b2) {
      wg(b2);
      switch (b2.tag) {
        case 1:
          return Zf(b2.type) && $f(), a2 = b2.flags, a2 & 65536 ? (b2.flags = a2 & -65537 | 128, b2) : null;
        case 3:
          return zh(), E2(Wf), E2(H2), Eh(), a2 = b2.flags, 0 !== (a2 & 65536) && 0 === (a2 & 128) ? (b2.flags = a2 & -65537 | 128, b2) : null;
        case 5:
          return Bh(b2), null;
        case 13:
          E2(L2);
          a2 = b2.memoizedState;
          if (null !== a2 && null !== a2.dehydrated) {
            if (null === b2.alternate) throw Error(p2(340));
            Ig();
          }
          a2 = b2.flags;
          return a2 & 65536 ? (b2.flags = a2 & -65537 | 128, b2) : null;
        case 19:
          return E2(L2), null;
        case 4:
          return zh(), null;
        case 10:
          return ah(b2.type._context), null;
        case 22:
        case 23:
          return Hj(), null;
        case 24:
          return null;
        default:
          return null;
      }
    }
    var Jj = false;
    var U2 = false;
    var Kj = "function" === typeof WeakSet ? WeakSet : Set;
    var V2 = null;
    function Lj(a2, b2) {
      var c2 = a2.ref;
      if (null !== c2) if ("function" === typeof c2) try {
        c2(null);
      } catch (d2) {
        W2(a2, b2, d2);
      }
      else c2.current = null;
    }
    function Mj(a2, b2, c2) {
      try {
        c2();
      } catch (d2) {
        W2(a2, b2, d2);
      }
    }
    var Nj = false;
    function Oj(a2, b2) {
      Cf = dd;
      a2 = Me2();
      if (Ne2(a2)) {
        if ("selectionStart" in a2) var c2 = { start: a2.selectionStart, end: a2.selectionEnd };
        else a: {
          c2 = (c2 = a2.ownerDocument) && c2.defaultView || window;
          var d2 = c2.getSelection && c2.getSelection();
          if (d2 && 0 !== d2.rangeCount) {
            c2 = d2.anchorNode;
            var e3 = d2.anchorOffset, f2 = d2.focusNode;
            d2 = d2.focusOffset;
            try {
              c2.nodeType, f2.nodeType;
            } catch (F2) {
              c2 = null;
              break a;
            }
            var g2 = 0, h2 = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a2, r2 = null;
            b: for (; ; ) {
              for (var y2; ; ) {
                q2 !== c2 || 0 !== e3 && 3 !== q2.nodeType || (h2 = g2 + e3);
                q2 !== f2 || 0 !== d2 && 3 !== q2.nodeType || (k2 = g2 + d2);
                3 === q2.nodeType && (g2 += q2.nodeValue.length);
                if (null === (y2 = q2.firstChild)) break;
                r2 = q2;
                q2 = y2;
              }
              for (; ; ) {
                if (q2 === a2) break b;
                r2 === c2 && ++l2 === e3 && (h2 = g2);
                r2 === f2 && ++m2 === d2 && (k2 = g2);
                if (null !== (y2 = q2.nextSibling)) break;
                q2 = r2;
                r2 = q2.parentNode;
              }
              q2 = y2;
            }
            c2 = -1 === h2 || -1 === k2 ? null : { start: h2, end: k2 };
          } else c2 = null;
        }
        c2 = c2 || { start: 0, end: 0 };
      } else c2 = null;
      Df = { focusedElem: a2, selectionRange: c2 };
      dd = false;
      for (V2 = b2; null !== V2; ) if (b2 = V2, a2 = b2.child, 0 !== (b2.subtreeFlags & 1028) && null !== a2) a2.return = b2, V2 = a2;
      else for (; null !== V2; ) {
        b2 = V2;
        try {
          var n2 = b2.alternate;
          if (0 !== (b2.flags & 1024)) switch (b2.tag) {
            case 0:
            case 11:
            case 15:
              break;
            case 1:
              if (null !== n2) {
                var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b2.stateNode, w2 = x2.getSnapshotBeforeUpdate(b2.elementType === b2.type ? t2 : Ci2(b2.type, t2), J2);
                x2.__reactInternalSnapshotBeforeUpdate = w2;
              }
              break;
            case 3:
              var u2 = b2.stateNode.containerInfo;
              1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
              break;
            case 5:
            case 6:
            case 4:
            case 17:
              break;
            default:
              throw Error(p2(163));
          }
        } catch (F2) {
          W2(b2, b2.return, F2);
        }
        a2 = b2.sibling;
        if (null !== a2) {
          a2.return = b2.return;
          V2 = a2;
          break;
        }
        V2 = b2.return;
      }
      n2 = Nj;
      Nj = false;
      return n2;
    }
    function Pj(a2, b2, c2) {
      var d2 = b2.updateQueue;
      d2 = null !== d2 ? d2.lastEffect : null;
      if (null !== d2) {
        var e3 = d2 = d2.next;
        do {
          if ((e3.tag & a2) === a2) {
            var f2 = e3.destroy;
            e3.destroy = void 0;
            void 0 !== f2 && Mj(b2, c2, f2);
          }
          e3 = e3.next;
        } while (e3 !== d2);
      }
    }
    function Qj(a2, b2) {
      b2 = b2.updateQueue;
      b2 = null !== b2 ? b2.lastEffect : null;
      if (null !== b2) {
        var c2 = b2 = b2.next;
        do {
          if ((c2.tag & a2) === a2) {
            var d2 = c2.create;
            c2.destroy = d2();
          }
          c2 = c2.next;
        } while (c2 !== b2);
      }
    }
    function Rj(a2) {
      var b2 = a2.ref;
      if (null !== b2) {
        var c2 = a2.stateNode;
        switch (a2.tag) {
          case 5:
            a2 = c2;
            break;
          default:
            a2 = c2;
        }
        "function" === typeof b2 ? b2(a2) : b2.current = a2;
      }
    }
    function Sj(a2) {
      var b2 = a2.alternate;
      null !== b2 && (a2.alternate = null, Sj(b2));
      a2.child = null;
      a2.deletions = null;
      a2.sibling = null;
      5 === a2.tag && (b2 = a2.stateNode, null !== b2 && (delete b2[Of], delete b2[Pf], delete b2[of], delete b2[Qf], delete b2[Rf]));
      a2.stateNode = null;
      a2.return = null;
      a2.dependencies = null;
      a2.memoizedProps = null;
      a2.memoizedState = null;
      a2.pendingProps = null;
      a2.stateNode = null;
      a2.updateQueue = null;
    }
    function Tj(a2) {
      return 5 === a2.tag || 3 === a2.tag || 4 === a2.tag;
    }
    function Uj(a2) {
      a: for (; ; ) {
        for (; null === a2.sibling; ) {
          if (null === a2.return || Tj(a2.return)) return null;
          a2 = a2.return;
        }
        a2.sibling.return = a2.return;
        for (a2 = a2.sibling; 5 !== a2.tag && 6 !== a2.tag && 18 !== a2.tag; ) {
          if (a2.flags & 2) continue a;
          if (null === a2.child || 4 === a2.tag) continue a;
          else a2.child.return = a2, a2 = a2.child;
        }
        if (!(a2.flags & 2)) return a2.stateNode;
      }
    }
    function Vj(a2, b2, c2) {
      var d2 = a2.tag;
      if (5 === d2 || 6 === d2) a2 = a2.stateNode, b2 ? 8 === c2.nodeType ? c2.parentNode.insertBefore(a2, b2) : c2.insertBefore(a2, b2) : (8 === c2.nodeType ? (b2 = c2.parentNode, b2.insertBefore(a2, c2)) : (b2 = c2, b2.appendChild(a2)), c2 = c2._reactRootContainer, null !== c2 && void 0 !== c2 || null !== b2.onclick || (b2.onclick = Bf));
      else if (4 !== d2 && (a2 = a2.child, null !== a2)) for (Vj(a2, b2, c2), a2 = a2.sibling; null !== a2; ) Vj(a2, b2, c2), a2 = a2.sibling;
    }
    function Wj(a2, b2, c2) {
      var d2 = a2.tag;
      if (5 === d2 || 6 === d2) a2 = a2.stateNode, b2 ? c2.insertBefore(a2, b2) : c2.appendChild(a2);
      else if (4 !== d2 && (a2 = a2.child, null !== a2)) for (Wj(a2, b2, c2), a2 = a2.sibling; null !== a2; ) Wj(a2, b2, c2), a2 = a2.sibling;
    }
    var X2 = null;
    var Xj = false;
    function Yj(a2, b2, c2) {
      for (c2 = c2.child; null !== c2; ) Zj(a2, b2, c2), c2 = c2.sibling;
    }
    function Zj(a2, b2, c2) {
      if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
        lc.onCommitFiberUnmount(kc, c2);
      } catch (h2) {
      }
      switch (c2.tag) {
        case 5:
          U2 || Lj(c2, b2);
        case 6:
          var d2 = X2, e3 = Xj;
          X2 = null;
          Yj(a2, b2, c2);
          X2 = d2;
          Xj = e3;
          null !== X2 && (Xj ? (a2 = X2, c2 = c2.stateNode, 8 === a2.nodeType ? a2.parentNode.removeChild(c2) : a2.removeChild(c2)) : X2.removeChild(c2.stateNode));
          break;
        case 18:
          null !== X2 && (Xj ? (a2 = X2, c2 = c2.stateNode, 8 === a2.nodeType ? Kf(a2.parentNode, c2) : 1 === a2.nodeType && Kf(a2, c2), bd(a2)) : Kf(X2, c2.stateNode));
          break;
        case 4:
          d2 = X2;
          e3 = Xj;
          X2 = c2.stateNode.containerInfo;
          Xj = true;
          Yj(a2, b2, c2);
          X2 = d2;
          Xj = e3;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (!U2 && (d2 = c2.updateQueue, null !== d2 && (d2 = d2.lastEffect, null !== d2))) {
            e3 = d2 = d2.next;
            do {
              var f2 = e3, g2 = f2.destroy;
              f2 = f2.tag;
              void 0 !== g2 && (0 !== (f2 & 2) ? Mj(c2, b2, g2) : 0 !== (f2 & 4) && Mj(c2, b2, g2));
              e3 = e3.next;
            } while (e3 !== d2);
          }
          Yj(a2, b2, c2);
          break;
        case 1:
          if (!U2 && (Lj(c2, b2), d2 = c2.stateNode, "function" === typeof d2.componentWillUnmount)) try {
            d2.props = c2.memoizedProps, d2.state = c2.memoizedState, d2.componentWillUnmount();
          } catch (h2) {
            W2(c2, b2, h2);
          }
          Yj(a2, b2, c2);
          break;
        case 21:
          Yj(a2, b2, c2);
          break;
        case 22:
          c2.mode & 1 ? (U2 = (d2 = U2) || null !== c2.memoizedState, Yj(a2, b2, c2), U2 = d2) : Yj(a2, b2, c2);
          break;
        default:
          Yj(a2, b2, c2);
      }
    }
    function ak(a2) {
      var b2 = a2.updateQueue;
      if (null !== b2) {
        a2.updateQueue = null;
        var c2 = a2.stateNode;
        null === c2 && (c2 = a2.stateNode = new Kj());
        b2.forEach(function(b3) {
          var d2 = bk.bind(null, a2, b3);
          c2.has(b3) || (c2.add(b3), b3.then(d2, d2));
        });
      }
    }
    function ck(a2, b2) {
      var c2 = b2.deletions;
      if (null !== c2) for (var d2 = 0; d2 < c2.length; d2++) {
        var e3 = c2[d2];
        try {
          var f2 = a2, g2 = b2, h2 = g2;
          a: for (; null !== h2; ) {
            switch (h2.tag) {
              case 5:
                X2 = h2.stateNode;
                Xj = false;
                break a;
              case 3:
                X2 = h2.stateNode.containerInfo;
                Xj = true;
                break a;
              case 4:
                X2 = h2.stateNode.containerInfo;
                Xj = true;
                break a;
            }
            h2 = h2.return;
          }
          if (null === X2) throw Error(p2(160));
          Zj(f2, g2, e3);
          X2 = null;
          Xj = false;
          var k2 = e3.alternate;
          null !== k2 && (k2.return = null);
          e3.return = null;
        } catch (l2) {
          W2(e3, b2, l2);
        }
      }
      if (b2.subtreeFlags & 12854) for (b2 = b2.child; null !== b2; ) dk(b2, a2), b2 = b2.sibling;
    }
    function dk(a2, b2) {
      var c2 = a2.alternate, d2 = a2.flags;
      switch (a2.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ck(b2, a2);
          ek(a2);
          if (d2 & 4) {
            try {
              Pj(3, a2, a2.return), Qj(3, a2);
            } catch (t2) {
              W2(a2, a2.return, t2);
            }
            try {
              Pj(5, a2, a2.return);
            } catch (t2) {
              W2(a2, a2.return, t2);
            }
          }
          break;
        case 1:
          ck(b2, a2);
          ek(a2);
          d2 & 512 && null !== c2 && Lj(c2, c2.return);
          break;
        case 5:
          ck(b2, a2);
          ek(a2);
          d2 & 512 && null !== c2 && Lj(c2, c2.return);
          if (a2.flags & 32) {
            var e3 = a2.stateNode;
            try {
              ob(e3, "");
            } catch (t2) {
              W2(a2, a2.return, t2);
            }
          }
          if (d2 & 4 && (e3 = a2.stateNode, null != e3)) {
            var f2 = a2.memoizedProps, g2 = null !== c2 ? c2.memoizedProps : f2, h2 = a2.type, k2 = a2.updateQueue;
            a2.updateQueue = null;
            if (null !== k2) try {
              "input" === h2 && "radio" === f2.type && null != f2.name && ab(e3, f2);
              vb(h2, g2);
              var l2 = vb(h2, f2);
              for (g2 = 0; g2 < k2.length; g2 += 2) {
                var m2 = k2[g2], q2 = k2[g2 + 1];
                "style" === m2 ? sb(e3, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e3, q2) : "children" === m2 ? ob(e3, q2) : ta2(e3, m2, q2, l2);
              }
              switch (h2) {
                case "input":
                  bb(e3, f2);
                  break;
                case "textarea":
                  ib(e3, f2);
                  break;
                case "select":
                  var r2 = e3._wrapperState.wasMultiple;
                  e3._wrapperState.wasMultiple = !!f2.multiple;
                  var y2 = f2.value;
                  null != y2 ? fb(e3, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                    e3,
                    !!f2.multiple,
                    f2.defaultValue,
                    true
                  ) : fb(e3, !!f2.multiple, f2.multiple ? [] : "", false));
              }
              e3[Pf] = f2;
            } catch (t2) {
              W2(a2, a2.return, t2);
            }
          }
          break;
        case 6:
          ck(b2, a2);
          ek(a2);
          if (d2 & 4) {
            if (null === a2.stateNode) throw Error(p2(162));
            e3 = a2.stateNode;
            f2 = a2.memoizedProps;
            try {
              e3.nodeValue = f2;
            } catch (t2) {
              W2(a2, a2.return, t2);
            }
          }
          break;
        case 3:
          ck(b2, a2);
          ek(a2);
          if (d2 & 4 && null !== c2 && c2.memoizedState.isDehydrated) try {
            bd(b2.containerInfo);
          } catch (t2) {
            W2(a2, a2.return, t2);
          }
          break;
        case 4:
          ck(b2, a2);
          ek(a2);
          break;
        case 13:
          ck(b2, a2);
          ek(a2);
          e3 = a2.child;
          e3.flags & 8192 && (f2 = null !== e3.memoizedState, e3.stateNode.isHidden = f2, !f2 || null !== e3.alternate && null !== e3.alternate.memoizedState || (fk = B2()));
          d2 & 4 && ak(a2);
          break;
        case 22:
          m2 = null !== c2 && null !== c2.memoizedState;
          a2.mode & 1 ? (U2 = (l2 = U2) || m2, ck(b2, a2), U2 = l2) : ck(b2, a2);
          ek(a2);
          if (d2 & 8192) {
            l2 = null !== a2.memoizedState;
            if ((a2.stateNode.isHidden = l2) && !m2 && 0 !== (a2.mode & 1)) for (V2 = a2, m2 = a2.child; null !== m2; ) {
              for (q2 = V2 = m2; null !== V2; ) {
                r2 = V2;
                y2 = r2.child;
                switch (r2.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Pj(4, r2, r2.return);
                    break;
                  case 1:
                    Lj(r2, r2.return);
                    var n2 = r2.stateNode;
                    if ("function" === typeof n2.componentWillUnmount) {
                      d2 = r2;
                      c2 = r2.return;
                      try {
                        b2 = d2, n2.props = b2.memoizedProps, n2.state = b2.memoizedState, n2.componentWillUnmount();
                      } catch (t2) {
                        W2(d2, c2, t2);
                      }
                    }
                    break;
                  case 5:
                    Lj(r2, r2.return);
                    break;
                  case 22:
                    if (null !== r2.memoizedState) {
                      gk(q2);
                      continue;
                    }
                }
                null !== y2 ? (y2.return = r2, V2 = y2) : gk(q2);
              }
              m2 = m2.sibling;
            }
            a: for (m2 = null, q2 = a2; ; ) {
              if (5 === q2.tag) {
                if (null === m2) {
                  m2 = q2;
                  try {
                    e3 = q2.stateNode, l2 ? (f2 = e3.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h2 = q2.stateNode, k2 = q2.memoizedProps.style, g2 = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h2.style.display = rb("display", g2));
                  } catch (t2) {
                    W2(a2, a2.return, t2);
                  }
                }
              } else if (6 === q2.tag) {
                if (null === m2) try {
                  q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
                } catch (t2) {
                  W2(a2, a2.return, t2);
                }
              } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a2) && null !== q2.child) {
                q2.child.return = q2;
                q2 = q2.child;
                continue;
              }
              if (q2 === a2) break a;
              for (; null === q2.sibling; ) {
                if (null === q2.return || q2.return === a2) break a;
                m2 === q2 && (m2 = null);
                q2 = q2.return;
              }
              m2 === q2 && (m2 = null);
              q2.sibling.return = q2.return;
              q2 = q2.sibling;
            }
          }
          break;
        case 19:
          ck(b2, a2);
          ek(a2);
          d2 & 4 && ak(a2);
          break;
        case 21:
          break;
        default:
          ck(
            b2,
            a2
          ), ek(a2);
      }
    }
    function ek(a2) {
      var b2 = a2.flags;
      if (b2 & 2) {
        try {
          a: {
            for (var c2 = a2.return; null !== c2; ) {
              if (Tj(c2)) {
                var d2 = c2;
                break a;
              }
              c2 = c2.return;
            }
            throw Error(p2(160));
          }
          switch (d2.tag) {
            case 5:
              var e3 = d2.stateNode;
              d2.flags & 32 && (ob(e3, ""), d2.flags &= -33);
              var f2 = Uj(a2);
              Wj(a2, f2, e3);
              break;
            case 3:
            case 4:
              var g2 = d2.stateNode.containerInfo, h2 = Uj(a2);
              Vj(a2, h2, g2);
              break;
            default:
              throw Error(p2(161));
          }
        } catch (k2) {
          W2(a2, a2.return, k2);
        }
        a2.flags &= -3;
      }
      b2 & 4096 && (a2.flags &= -4097);
    }
    function hk(a2, b2, c2) {
      V2 = a2;
      ik(a2, b2, c2);
    }
    function ik(a2, b2, c2) {
      for (var d2 = 0 !== (a2.mode & 1); null !== V2; ) {
        var e3 = V2, f2 = e3.child;
        if (22 === e3.tag && d2) {
          var g2 = null !== e3.memoizedState || Jj;
          if (!g2) {
            var h2 = e3.alternate, k2 = null !== h2 && null !== h2.memoizedState || U2;
            h2 = Jj;
            var l2 = U2;
            Jj = g2;
            if ((U2 = k2) && !l2) for (V2 = e3; null !== V2; ) g2 = V2, k2 = g2.child, 22 === g2.tag && null !== g2.memoizedState ? jk(e3) : null !== k2 ? (k2.return = g2, V2 = k2) : jk(e3);
            for (; null !== f2; ) V2 = f2, ik(f2, b2, c2), f2 = f2.sibling;
            V2 = e3;
            Jj = h2;
            U2 = l2;
          }
          kk(a2, b2, c2);
        } else 0 !== (e3.subtreeFlags & 8772) && null !== f2 ? (f2.return = e3, V2 = f2) : kk(a2, b2, c2);
      }
    }
    function kk(a2) {
      for (; null !== V2; ) {
        var b2 = V2;
        if (0 !== (b2.flags & 8772)) {
          var c2 = b2.alternate;
          try {
            if (0 !== (b2.flags & 8772)) switch (b2.tag) {
              case 0:
              case 11:
              case 15:
                U2 || Qj(5, b2);
                break;
              case 1:
                var d2 = b2.stateNode;
                if (b2.flags & 4 && !U2) if (null === c2) d2.componentDidMount();
                else {
                  var e3 = b2.elementType === b2.type ? c2.memoizedProps : Ci2(b2.type, c2.memoizedProps);
                  d2.componentDidUpdate(e3, c2.memoizedState, d2.__reactInternalSnapshotBeforeUpdate);
                }
                var f2 = b2.updateQueue;
                null !== f2 && sh(b2, f2, d2);
                break;
              case 3:
                var g2 = b2.updateQueue;
                if (null !== g2) {
                  c2 = null;
                  if (null !== b2.child) switch (b2.child.tag) {
                    case 5:
                      c2 = b2.child.stateNode;
                      break;
                    case 1:
                      c2 = b2.child.stateNode;
                  }
                  sh(b2, g2, c2);
                }
                break;
              case 5:
                var h2 = b2.stateNode;
                if (null === c2 && b2.flags & 4) {
                  c2 = h2;
                  var k2 = b2.memoizedProps;
                  switch (b2.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      k2.autoFocus && c2.focus();
                      break;
                    case "img":
                      k2.src && (c2.src = k2.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (null === b2.memoizedState) {
                  var l2 = b2.alternate;
                  if (null !== l2) {
                    var m2 = l2.memoizedState;
                    if (null !== m2) {
                      var q2 = m2.dehydrated;
                      null !== q2 && bd(q2);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(p2(163));
            }
            U2 || b2.flags & 512 && Rj(b2);
          } catch (r2) {
            W2(b2, b2.return, r2);
          }
        }
        if (b2 === a2) {
          V2 = null;
          break;
        }
        c2 = b2.sibling;
        if (null !== c2) {
          c2.return = b2.return;
          V2 = c2;
          break;
        }
        V2 = b2.return;
      }
    }
    function gk(a2) {
      for (; null !== V2; ) {
        var b2 = V2;
        if (b2 === a2) {
          V2 = null;
          break;
        }
        var c2 = b2.sibling;
        if (null !== c2) {
          c2.return = b2.return;
          V2 = c2;
          break;
        }
        V2 = b2.return;
      }
    }
    function jk(a2) {
      for (; null !== V2; ) {
        var b2 = V2;
        try {
          switch (b2.tag) {
            case 0:
            case 11:
            case 15:
              var c2 = b2.return;
              try {
                Qj(4, b2);
              } catch (k2) {
                W2(b2, c2, k2);
              }
              break;
            case 1:
              var d2 = b2.stateNode;
              if ("function" === typeof d2.componentDidMount) {
                var e3 = b2.return;
                try {
                  d2.componentDidMount();
                } catch (k2) {
                  W2(b2, e3, k2);
                }
              }
              var f2 = b2.return;
              try {
                Rj(b2);
              } catch (k2) {
                W2(b2, f2, k2);
              }
              break;
            case 5:
              var g2 = b2.return;
              try {
                Rj(b2);
              } catch (k2) {
                W2(b2, g2, k2);
              }
          }
        } catch (k2) {
          W2(b2, b2.return, k2);
        }
        if (b2 === a2) {
          V2 = null;
          break;
        }
        var h2 = b2.sibling;
        if (null !== h2) {
          h2.return = b2.return;
          V2 = h2;
          break;
        }
        V2 = b2.return;
      }
    }
    var lk = Math.ceil;
    var mk = ua2.ReactCurrentDispatcher;
    var nk = ua2.ReactCurrentOwner;
    var ok = ua2.ReactCurrentBatchConfig;
    var K2 = 0;
    var Q2 = null;
    var Y2 = null;
    var Z2 = 0;
    var fj = 0;
    var ej = Uf(0);
    var T2 = 0;
    var pk = null;
    var rh = 0;
    var qk = 0;
    var rk = 0;
    var sk = null;
    var tk = null;
    var fk = 0;
    var Gj = Infinity;
    var uk = null;
    var Oi2 = false;
    var Pi2 = null;
    var Ri2 = null;
    var vk = false;
    var wk = null;
    var xk = 0;
    var yk = 0;
    var zk = null;
    var Ak = -1;
    var Bk = 0;
    function R2() {
      return 0 !== (K2 & 6) ? B2() : -1 !== Ak ? Ak : Ak = B2();
    }
    function yi2(a2) {
      if (0 === (a2.mode & 1)) return 1;
      if (0 !== (K2 & 2) && 0 !== Z2) return Z2 & -Z2;
      if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
      a2 = C2;
      if (0 !== a2) return a2;
      a2 = window.event;
      a2 = void 0 === a2 ? 16 : jd(a2.type);
      return a2;
    }
    function gi2(a2, b2, c2, d2) {
      if (50 < yk) throw yk = 0, zk = null, Error(p2(185));
      Ac(a2, c2, d2);
      if (0 === (K2 & 2) || a2 !== Q2) a2 === Q2 && (0 === (K2 & 2) && (qk |= c2), 4 === T2 && Ck(a2, Z2)), Dk(a2, d2), 1 === c2 && 0 === K2 && 0 === (b2.mode & 1) && (Gj = B2() + 500, fg && jg());
    }
    function Dk(a2, b2) {
      var c2 = a2.callbackNode;
      wc(a2, b2);
      var d2 = uc(a2, a2 === Q2 ? Z2 : 0);
      if (0 === d2) null !== c2 && bc(c2), a2.callbackNode = null, a2.callbackPriority = 0;
      else if (b2 = d2 & -d2, a2.callbackPriority !== b2) {
        null != c2 && bc(c2);
        if (1 === b2) 0 === a2.tag ? ig(Ek.bind(null, a2)) : hg(Ek.bind(null, a2)), Jf(function() {
          0 === (K2 & 6) && jg();
        }), c2 = null;
        else {
          switch (Dc(d2)) {
            case 1:
              c2 = fc;
              break;
            case 4:
              c2 = gc;
              break;
            case 16:
              c2 = hc;
              break;
            case 536870912:
              c2 = jc;
              break;
            default:
              c2 = hc;
          }
          c2 = Fk(c2, Gk.bind(null, a2));
        }
        a2.callbackPriority = b2;
        a2.callbackNode = c2;
      }
    }
    function Gk(a2, b2) {
      Ak = -1;
      Bk = 0;
      if (0 !== (K2 & 6)) throw Error(p2(327));
      var c2 = a2.callbackNode;
      if (Hk() && a2.callbackNode !== c2) return null;
      var d2 = uc(a2, a2 === Q2 ? Z2 : 0);
      if (0 === d2) return null;
      if (0 !== (d2 & 30) || 0 !== (d2 & a2.expiredLanes) || b2) b2 = Ik(a2, d2);
      else {
        b2 = d2;
        var e3 = K2;
        K2 |= 2;
        var f2 = Jk();
        if (Q2 !== a2 || Z2 !== b2) uk = null, Gj = B2() + 500, Kk(a2, b2);
        do
          try {
            Lk();
            break;
          } catch (h2) {
            Mk(a2, h2);
          }
        while (1);
        $g();
        mk.current = f2;
        K2 = e3;
        null !== Y2 ? b2 = 0 : (Q2 = null, Z2 = 0, b2 = T2);
      }
      if (0 !== b2) {
        2 === b2 && (e3 = xc(a2), 0 !== e3 && (d2 = e3, b2 = Nk(a2, e3)));
        if (1 === b2) throw c2 = pk, Kk(a2, 0), Ck(a2, d2), Dk(a2, B2()), c2;
        if (6 === b2) Ck(a2, d2);
        else {
          e3 = a2.current.alternate;
          if (0 === (d2 & 30) && !Ok(e3) && (b2 = Ik(a2, d2), 2 === b2 && (f2 = xc(a2), 0 !== f2 && (d2 = f2, b2 = Nk(a2, f2))), 1 === b2)) throw c2 = pk, Kk(a2, 0), Ck(a2, d2), Dk(a2, B2()), c2;
          a2.finishedWork = e3;
          a2.finishedLanes = d2;
          switch (b2) {
            case 0:
            case 1:
              throw Error(p2(345));
            case 2:
              Pk(a2, tk, uk);
              break;
            case 3:
              Ck(a2, d2);
              if ((d2 & 130023424) === d2 && (b2 = fk + 500 - B2(), 10 < b2)) {
                if (0 !== uc(a2, 0)) break;
                e3 = a2.suspendedLanes;
                if ((e3 & d2) !== d2) {
                  R2();
                  a2.pingedLanes |= a2.suspendedLanes & e3;
                  break;
                }
                a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), b2);
                break;
              }
              Pk(a2, tk, uk);
              break;
            case 4:
              Ck(a2, d2);
              if ((d2 & 4194240) === d2) break;
              b2 = a2.eventTimes;
              for (e3 = -1; 0 < d2; ) {
                var g2 = 31 - oc(d2);
                f2 = 1 << g2;
                g2 = b2[g2];
                g2 > e3 && (e3 = g2);
                d2 &= ~f2;
              }
              d2 = e3;
              d2 = B2() - d2;
              d2 = (120 > d2 ? 120 : 480 > d2 ? 480 : 1080 > d2 ? 1080 : 1920 > d2 ? 1920 : 3e3 > d2 ? 3e3 : 4320 > d2 ? 4320 : 1960 * lk(d2 / 1960)) - d2;
              if (10 < d2) {
                a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), d2);
                break;
              }
              Pk(a2, tk, uk);
              break;
            case 5:
              Pk(a2, tk, uk);
              break;
            default:
              throw Error(p2(329));
          }
        }
      }
      Dk(a2, B2());
      return a2.callbackNode === c2 ? Gk.bind(null, a2) : null;
    }
    function Nk(a2, b2) {
      var c2 = sk;
      a2.current.memoizedState.isDehydrated && (Kk(a2, b2).flags |= 256);
      a2 = Ik(a2, b2);
      2 !== a2 && (b2 = tk, tk = c2, null !== b2 && Fj(b2));
      return a2;
    }
    function Fj(a2) {
      null === tk ? tk = a2 : tk.push.apply(tk, a2);
    }
    function Ok(a2) {
      for (var b2 = a2; ; ) {
        if (b2.flags & 16384) {
          var c2 = b2.updateQueue;
          if (null !== c2 && (c2 = c2.stores, null !== c2)) for (var d2 = 0; d2 < c2.length; d2++) {
            var e3 = c2[d2], f2 = e3.getSnapshot;
            e3 = e3.value;
            try {
              if (!He2(f2(), e3)) return false;
            } catch (g2) {
              return false;
            }
          }
        }
        c2 = b2.child;
        if (b2.subtreeFlags & 16384 && null !== c2) c2.return = b2, b2 = c2;
        else {
          if (b2 === a2) break;
          for (; null === b2.sibling; ) {
            if (null === b2.return || b2.return === a2) return true;
            b2 = b2.return;
          }
          b2.sibling.return = b2.return;
          b2 = b2.sibling;
        }
      }
      return true;
    }
    function Ck(a2, b2) {
      b2 &= ~rk;
      b2 &= ~qk;
      a2.suspendedLanes |= b2;
      a2.pingedLanes &= ~b2;
      for (a2 = a2.expirationTimes; 0 < b2; ) {
        var c2 = 31 - oc(b2), d2 = 1 << c2;
        a2[c2] = -1;
        b2 &= ~d2;
      }
    }
    function Ek(a2) {
      if (0 !== (K2 & 6)) throw Error(p2(327));
      Hk();
      var b2 = uc(a2, 0);
      if (0 === (b2 & 1)) return Dk(a2, B2()), null;
      var c2 = Ik(a2, b2);
      if (0 !== a2.tag && 2 === c2) {
        var d2 = xc(a2);
        0 !== d2 && (b2 = d2, c2 = Nk(a2, d2));
      }
      if (1 === c2) throw c2 = pk, Kk(a2, 0), Ck(a2, b2), Dk(a2, B2()), c2;
      if (6 === c2) throw Error(p2(345));
      a2.finishedWork = a2.current.alternate;
      a2.finishedLanes = b2;
      Pk(a2, tk, uk);
      Dk(a2, B2());
      return null;
    }
    function Qk(a2, b2) {
      var c2 = K2;
      K2 |= 1;
      try {
        return a2(b2);
      } finally {
        K2 = c2, 0 === K2 && (Gj = B2() + 500, fg && jg());
      }
    }
    function Rk(a2) {
      null !== wk && 0 === wk.tag && 0 === (K2 & 6) && Hk();
      var b2 = K2;
      K2 |= 1;
      var c2 = ok.transition, d2 = C2;
      try {
        if (ok.transition = null, C2 = 1, a2) return a2();
      } finally {
        C2 = d2, ok.transition = c2, K2 = b2, 0 === (K2 & 6) && jg();
      }
    }
    function Hj() {
      fj = ej.current;
      E2(ej);
    }
    function Kk(a2, b2) {
      a2.finishedWork = null;
      a2.finishedLanes = 0;
      var c2 = a2.timeoutHandle;
      -1 !== c2 && (a2.timeoutHandle = -1, Gf(c2));
      if (null !== Y2) for (c2 = Y2.return; null !== c2; ) {
        var d2 = c2;
        wg(d2);
        switch (d2.tag) {
          case 1:
            d2 = d2.type.childContextTypes;
            null !== d2 && void 0 !== d2 && $f();
            break;
          case 3:
            zh();
            E2(Wf);
            E2(H2);
            Eh();
            break;
          case 5:
            Bh(d2);
            break;
          case 4:
            zh();
            break;
          case 13:
            E2(L2);
            break;
          case 19:
            E2(L2);
            break;
          case 10:
            ah(d2.type._context);
            break;
          case 22:
          case 23:
            Hj();
        }
        c2 = c2.return;
      }
      Q2 = a2;
      Y2 = a2 = Pg(a2.current, null);
      Z2 = fj = b2;
      T2 = 0;
      pk = null;
      rk = qk = rh = 0;
      tk = sk = null;
      if (null !== fh) {
        for (b2 = 0; b2 < fh.length; b2++) if (c2 = fh[b2], d2 = c2.interleaved, null !== d2) {
          c2.interleaved = null;
          var e3 = d2.next, f2 = c2.pending;
          if (null !== f2) {
            var g2 = f2.next;
            f2.next = e3;
            d2.next = g2;
          }
          c2.pending = d2;
        }
        fh = null;
      }
      return a2;
    }
    function Mk(a2, b2) {
      do {
        var c2 = Y2;
        try {
          $g();
          Fh.current = Rh;
          if (Ih) {
            for (var d2 = M2.memoizedState; null !== d2; ) {
              var e3 = d2.queue;
              null !== e3 && (e3.pending = null);
              d2 = d2.next;
            }
            Ih = false;
          }
          Hh = 0;
          O2 = N2 = M2 = null;
          Jh = false;
          Kh = 0;
          nk.current = null;
          if (null === c2 || null === c2.return) {
            T2 = 1;
            pk = b2;
            Y2 = null;
            break;
          }
          a: {
            var f2 = a2, g2 = c2.return, h2 = c2, k2 = b2;
            b2 = Z2;
            h2.flags |= 32768;
            if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
              var l2 = k2, m2 = h2, q2 = m2.tag;
              if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
                var r2 = m2.alternate;
                r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
              }
              var y2 = Ui2(g2);
              if (null !== y2) {
                y2.flags &= -257;
                Vi2(y2, g2, h2, f2, b2);
                y2.mode & 1 && Si2(f2, l2, b2);
                b2 = y2;
                k2 = l2;
                var n2 = b2.updateQueue;
                if (null === n2) {
                  var t2 = /* @__PURE__ */ new Set();
                  t2.add(k2);
                  b2.updateQueue = t2;
                } else n2.add(k2);
                break a;
              } else {
                if (0 === (b2 & 1)) {
                  Si2(f2, l2, b2);
                  tj();
                  break a;
                }
                k2 = Error(p2(426));
              }
            } else if (I2 && h2.mode & 1) {
              var J2 = Ui2(g2);
              if (null !== J2) {
                0 === (J2.flags & 65536) && (J2.flags |= 256);
                Vi2(J2, g2, h2, f2, b2);
                Jg(Ji2(k2, h2));
                break a;
              }
            }
            f2 = k2 = Ji2(k2, h2);
            4 !== T2 && (T2 = 2);
            null === sk ? sk = [f2] : sk.push(f2);
            f2 = g2;
            do {
              switch (f2.tag) {
                case 3:
                  f2.flags |= 65536;
                  b2 &= -b2;
                  f2.lanes |= b2;
                  var x2 = Ni2(f2, k2, b2);
                  ph(f2, x2);
                  break a;
                case 1:
                  h2 = k2;
                  var w2 = f2.type, u2 = f2.stateNode;
                  if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri2 || !Ri2.has(u2)))) {
                    f2.flags |= 65536;
                    b2 &= -b2;
                    f2.lanes |= b2;
                    var F2 = Qi2(f2, h2, b2);
                    ph(f2, F2);
                    break a;
                  }
              }
              f2 = f2.return;
            } while (null !== f2);
          }
          Sk(c2);
        } catch (na2) {
          b2 = na2;
          Y2 === c2 && null !== c2 && (Y2 = c2 = c2.return);
          continue;
        }
        break;
      } while (1);
    }
    function Jk() {
      var a2 = mk.current;
      mk.current = Rh;
      return null === a2 ? Rh : a2;
    }
    function tj() {
      if (0 === T2 || 3 === T2 || 2 === T2) T2 = 4;
      null === Q2 || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q2, Z2);
    }
    function Ik(a2, b2) {
      var c2 = K2;
      K2 |= 2;
      var d2 = Jk();
      if (Q2 !== a2 || Z2 !== b2) uk = null, Kk(a2, b2);
      do
        try {
          Tk();
          break;
        } catch (e3) {
          Mk(a2, e3);
        }
      while (1);
      $g();
      K2 = c2;
      mk.current = d2;
      if (null !== Y2) throw Error(p2(261));
      Q2 = null;
      Z2 = 0;
      return T2;
    }
    function Tk() {
      for (; null !== Y2; ) Uk(Y2);
    }
    function Lk() {
      for (; null !== Y2 && !cc(); ) Uk(Y2);
    }
    function Uk(a2) {
      var b2 = Vk(a2.alternate, a2, fj);
      a2.memoizedProps = a2.pendingProps;
      null === b2 ? Sk(a2) : Y2 = b2;
      nk.current = null;
    }
    function Sk(a2) {
      var b2 = a2;
      do {
        var c2 = b2.alternate;
        a2 = b2.return;
        if (0 === (b2.flags & 32768)) {
          if (c2 = Ej(c2, b2, fj), null !== c2) {
            Y2 = c2;
            return;
          }
        } else {
          c2 = Ij(c2, b2);
          if (null !== c2) {
            c2.flags &= 32767;
            Y2 = c2;
            return;
          }
          if (null !== a2) a2.flags |= 32768, a2.subtreeFlags = 0, a2.deletions = null;
          else {
            T2 = 6;
            Y2 = null;
            return;
          }
        }
        b2 = b2.sibling;
        if (null !== b2) {
          Y2 = b2;
          return;
        }
        Y2 = b2 = a2;
      } while (null !== b2);
      0 === T2 && (T2 = 5);
    }
    function Pk(a2, b2, c2) {
      var d2 = C2, e3 = ok.transition;
      try {
        ok.transition = null, C2 = 1, Wk(a2, b2, c2, d2);
      } finally {
        ok.transition = e3, C2 = d2;
      }
      return null;
    }
    function Wk(a2, b2, c2, d2) {
      do
        Hk();
      while (null !== wk);
      if (0 !== (K2 & 6)) throw Error(p2(327));
      c2 = a2.finishedWork;
      var e3 = a2.finishedLanes;
      if (null === c2) return null;
      a2.finishedWork = null;
      a2.finishedLanes = 0;
      if (c2 === a2.current) throw Error(p2(177));
      a2.callbackNode = null;
      a2.callbackPriority = 0;
      var f2 = c2.lanes | c2.childLanes;
      Bc(a2, f2);
      a2 === Q2 && (Y2 = Q2 = null, Z2 = 0);
      0 === (c2.subtreeFlags & 2064) && 0 === (c2.flags & 2064) || vk || (vk = true, Fk(hc, function() {
        Hk();
        return null;
      }));
      f2 = 0 !== (c2.flags & 15990);
      if (0 !== (c2.subtreeFlags & 15990) || f2) {
        f2 = ok.transition;
        ok.transition = null;
        var g2 = C2;
        C2 = 1;
        var h2 = K2;
        K2 |= 4;
        nk.current = null;
        Oj(a2, c2);
        dk(c2, a2);
        Oe2(Df);
        dd = !!Cf;
        Df = Cf = null;
        a2.current = c2;
        hk(c2, a2, e3);
        dc();
        K2 = h2;
        C2 = g2;
        ok.transition = f2;
      } else a2.current = c2;
      vk && (vk = false, wk = a2, xk = e3);
      f2 = a2.pendingLanes;
      0 === f2 && (Ri2 = null);
      mc(c2.stateNode, d2);
      Dk(a2, B2());
      if (null !== b2) for (d2 = a2.onRecoverableError, c2 = 0; c2 < b2.length; c2++) e3 = b2[c2], d2(e3.value, { componentStack: e3.stack, digest: e3.digest });
      if (Oi2) throw Oi2 = false, a2 = Pi2, Pi2 = null, a2;
      0 !== (xk & 1) && 0 !== a2.tag && Hk();
      f2 = a2.pendingLanes;
      0 !== (f2 & 1) ? a2 === zk ? yk++ : (yk = 0, zk = a2) : yk = 0;
      jg();
      return null;
    }
    function Hk() {
      if (null !== wk) {
        var a2 = Dc(xk), b2 = ok.transition, c2 = C2;
        try {
          ok.transition = null;
          C2 = 16 > a2 ? 16 : a2;
          if (null === wk) var d2 = false;
          else {
            a2 = wk;
            wk = null;
            xk = 0;
            if (0 !== (K2 & 6)) throw Error(p2(331));
            var e3 = K2;
            K2 |= 4;
            for (V2 = a2.current; null !== V2; ) {
              var f2 = V2, g2 = f2.child;
              if (0 !== (V2.flags & 16)) {
                var h2 = f2.deletions;
                if (null !== h2) {
                  for (var k2 = 0; k2 < h2.length; k2++) {
                    var l2 = h2[k2];
                    for (V2 = l2; null !== V2; ) {
                      var m2 = V2;
                      switch (m2.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Pj(8, m2, f2);
                      }
                      var q2 = m2.child;
                      if (null !== q2) q2.return = m2, V2 = q2;
                      else for (; null !== V2; ) {
                        m2 = V2;
                        var r2 = m2.sibling, y2 = m2.return;
                        Sj(m2);
                        if (m2 === l2) {
                          V2 = null;
                          break;
                        }
                        if (null !== r2) {
                          r2.return = y2;
                          V2 = r2;
                          break;
                        }
                        V2 = y2;
                      }
                    }
                  }
                  var n2 = f2.alternate;
                  if (null !== n2) {
                    var t2 = n2.child;
                    if (null !== t2) {
                      n2.child = null;
                      do {
                        var J2 = t2.sibling;
                        t2.sibling = null;
                        t2 = J2;
                      } while (null !== t2);
                    }
                  }
                  V2 = f2;
                }
              }
              if (0 !== (f2.subtreeFlags & 2064) && null !== g2) g2.return = f2, V2 = g2;
              else b: for (; null !== V2; ) {
                f2 = V2;
                if (0 !== (f2.flags & 2048)) switch (f2.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Pj(9, f2, f2.return);
                }
                var x2 = f2.sibling;
                if (null !== x2) {
                  x2.return = f2.return;
                  V2 = x2;
                  break b;
                }
                V2 = f2.return;
              }
            }
            var w2 = a2.current;
            for (V2 = w2; null !== V2; ) {
              g2 = V2;
              var u2 = g2.child;
              if (0 !== (g2.subtreeFlags & 2064) && null !== u2) u2.return = g2, V2 = u2;
              else b: for (g2 = w2; null !== V2; ) {
                h2 = V2;
                if (0 !== (h2.flags & 2048)) try {
                  switch (h2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(9, h2);
                  }
                } catch (na2) {
                  W2(h2, h2.return, na2);
                }
                if (h2 === g2) {
                  V2 = null;
                  break b;
                }
                var F2 = h2.sibling;
                if (null !== F2) {
                  F2.return = h2.return;
                  V2 = F2;
                  break b;
                }
                V2 = h2.return;
              }
            }
            K2 = e3;
            jg();
            if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
              lc.onPostCommitFiberRoot(kc, a2);
            } catch (na2) {
            }
            d2 = true;
          }
          return d2;
        } finally {
          C2 = c2, ok.transition = b2;
        }
      }
      return false;
    }
    function Xk(a2, b2, c2) {
      b2 = Ji2(c2, b2);
      b2 = Ni2(a2, b2, 1);
      a2 = nh(a2, b2, 1);
      b2 = R2();
      null !== a2 && (Ac(a2, 1, b2), Dk(a2, b2));
    }
    function W2(a2, b2, c2) {
      if (3 === a2.tag) Xk(a2, a2, c2);
      else for (; null !== b2; ) {
        if (3 === b2.tag) {
          Xk(b2, a2, c2);
          break;
        } else if (1 === b2.tag) {
          var d2 = b2.stateNode;
          if ("function" === typeof b2.type.getDerivedStateFromError || "function" === typeof d2.componentDidCatch && (null === Ri2 || !Ri2.has(d2))) {
            a2 = Ji2(c2, a2);
            a2 = Qi2(b2, a2, 1);
            b2 = nh(b2, a2, 1);
            a2 = R2();
            null !== b2 && (Ac(b2, 1, a2), Dk(b2, a2));
            break;
          }
        }
        b2 = b2.return;
      }
    }
    function Ti2(a2, b2, c2) {
      var d2 = a2.pingCache;
      null !== d2 && d2.delete(b2);
      b2 = R2();
      a2.pingedLanes |= a2.suspendedLanes & c2;
      Q2 === a2 && (Z2 & c2) === c2 && (4 === T2 || 3 === T2 && (Z2 & 130023424) === Z2 && 500 > B2() - fk ? Kk(a2, 0) : rk |= c2);
      Dk(a2, b2);
    }
    function Yk(a2, b2) {
      0 === b2 && (0 === (a2.mode & 1) ? b2 = 1 : (b2 = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
      var c2 = R2();
      a2 = ih(a2, b2);
      null !== a2 && (Ac(a2, b2, c2), Dk(a2, c2));
    }
    function uj(a2) {
      var b2 = a2.memoizedState, c2 = 0;
      null !== b2 && (c2 = b2.retryLane);
      Yk(a2, c2);
    }
    function bk(a2, b2) {
      var c2 = 0;
      switch (a2.tag) {
        case 13:
          var d2 = a2.stateNode;
          var e3 = a2.memoizedState;
          null !== e3 && (c2 = e3.retryLane);
          break;
        case 19:
          d2 = a2.stateNode;
          break;
        default:
          throw Error(p2(314));
      }
      null !== d2 && d2.delete(b2);
      Yk(a2, c2);
    }
    var Vk;
    Vk = function(a2, b2, c2) {
      if (null !== a2) if (a2.memoizedProps !== b2.pendingProps || Wf.current) dh = true;
      else {
        if (0 === (a2.lanes & c2) && 0 === (b2.flags & 128)) return dh = false, yj(a2, b2, c2);
        dh = 0 !== (a2.flags & 131072) ? true : false;
      }
      else dh = false, I2 && 0 !== (b2.flags & 1048576) && ug(b2, ng, b2.index);
      b2.lanes = 0;
      switch (b2.tag) {
        case 2:
          var d2 = b2.type;
          ij(a2, b2);
          a2 = b2.pendingProps;
          var e3 = Yf(b2, H2.current);
          ch(b2, c2);
          e3 = Nh(null, b2, d2, a2, e3, c2);
          var f2 = Sh();
          b2.flags |= 1;
          "object" === typeof e3 && null !== e3 && "function" === typeof e3.render && void 0 === e3.$$typeof ? (b2.tag = 1, b2.memoizedState = null, b2.updateQueue = null, Zf(d2) ? (f2 = true, cg(b2)) : f2 = false, b2.memoizedState = null !== e3.state && void 0 !== e3.state ? e3.state : null, kh(b2), e3.updater = Ei2, b2.stateNode = e3, e3._reactInternals = b2, Ii2(b2, d2, a2, c2), b2 = jj(null, b2, d2, true, f2, c2)) : (b2.tag = 0, I2 && f2 && vg(b2), Xi2(null, b2, e3, c2), b2 = b2.child);
          return b2;
        case 16:
          d2 = b2.elementType;
          a: {
            ij(a2, b2);
            a2 = b2.pendingProps;
            e3 = d2._init;
            d2 = e3(d2._payload);
            b2.type = d2;
            e3 = b2.tag = Zk(d2);
            a2 = Ci2(d2, a2);
            switch (e3) {
              case 0:
                b2 = cj(null, b2, d2, a2, c2);
                break a;
              case 1:
                b2 = hj(null, b2, d2, a2, c2);
                break a;
              case 11:
                b2 = Yi2(null, b2, d2, a2, c2);
                break a;
              case 14:
                b2 = $i2(null, b2, d2, Ci2(d2.type, a2), c2);
                break a;
            }
            throw Error(p2(
              306,
              d2,
              ""
            ));
          }
          return b2;
        case 0:
          return d2 = b2.type, e3 = b2.pendingProps, e3 = b2.elementType === d2 ? e3 : Ci2(d2, e3), cj(a2, b2, d2, e3, c2);
        case 1:
          return d2 = b2.type, e3 = b2.pendingProps, e3 = b2.elementType === d2 ? e3 : Ci2(d2, e3), hj(a2, b2, d2, e3, c2);
        case 3:
          a: {
            kj(b2);
            if (null === a2) throw Error(p2(387));
            d2 = b2.pendingProps;
            f2 = b2.memoizedState;
            e3 = f2.element;
            lh(a2, b2);
            qh(b2, d2, null, c2);
            var g2 = b2.memoizedState;
            d2 = g2.element;
            if (f2.isDehydrated) if (f2 = { element: d2, isDehydrated: false, cache: g2.cache, pendingSuspenseBoundaries: g2.pendingSuspenseBoundaries, transitions: g2.transitions }, b2.updateQueue.baseState = f2, b2.memoizedState = f2, b2.flags & 256) {
              e3 = Ji2(Error(p2(423)), b2);
              b2 = lj(a2, b2, d2, c2, e3);
              break a;
            } else if (d2 !== e3) {
              e3 = Ji2(Error(p2(424)), b2);
              b2 = lj(a2, b2, d2, c2, e3);
              break a;
            } else for (yg = Lf(b2.stateNode.containerInfo.firstChild), xg = b2, I2 = true, zg = null, c2 = Vg(b2, null, d2, c2), b2.child = c2; c2; ) c2.flags = c2.flags & -3 | 4096, c2 = c2.sibling;
            else {
              Ig();
              if (d2 === e3) {
                b2 = Zi2(a2, b2, c2);
                break a;
              }
              Xi2(a2, b2, d2, c2);
            }
            b2 = b2.child;
          }
          return b2;
        case 5:
          return Ah(b2), null === a2 && Eg(b2), d2 = b2.type, e3 = b2.pendingProps, f2 = null !== a2 ? a2.memoizedProps : null, g2 = e3.children, Ef(d2, e3) ? g2 = null : null !== f2 && Ef(d2, f2) && (b2.flags |= 32), gj(a2, b2), Xi2(a2, b2, g2, c2), b2.child;
        case 6:
          return null === a2 && Eg(b2), null;
        case 13:
          return oj(a2, b2, c2);
        case 4:
          return yh(b2, b2.stateNode.containerInfo), d2 = b2.pendingProps, null === a2 ? b2.child = Ug(b2, null, d2, c2) : Xi2(a2, b2, d2, c2), b2.child;
        case 11:
          return d2 = b2.type, e3 = b2.pendingProps, e3 = b2.elementType === d2 ? e3 : Ci2(d2, e3), Yi2(a2, b2, d2, e3, c2);
        case 7:
          return Xi2(a2, b2, b2.pendingProps, c2), b2.child;
        case 8:
          return Xi2(a2, b2, b2.pendingProps.children, c2), b2.child;
        case 12:
          return Xi2(a2, b2, b2.pendingProps.children, c2), b2.child;
        case 10:
          a: {
            d2 = b2.type._context;
            e3 = b2.pendingProps;
            f2 = b2.memoizedProps;
            g2 = e3.value;
            G2(Wg, d2._currentValue);
            d2._currentValue = g2;
            if (null !== f2) if (He2(f2.value, g2)) {
              if (f2.children === e3.children && !Wf.current) {
                b2 = Zi2(a2, b2, c2);
                break a;
              }
            } else for (f2 = b2.child, null !== f2 && (f2.return = b2); null !== f2; ) {
              var h2 = f2.dependencies;
              if (null !== h2) {
                g2 = f2.child;
                for (var k2 = h2.firstContext; null !== k2; ) {
                  if (k2.context === d2) {
                    if (1 === f2.tag) {
                      k2 = mh(-1, c2 & -c2);
                      k2.tag = 2;
                      var l2 = f2.updateQueue;
                      if (null !== l2) {
                        l2 = l2.shared;
                        var m2 = l2.pending;
                        null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                        l2.pending = k2;
                      }
                    }
                    f2.lanes |= c2;
                    k2 = f2.alternate;
                    null !== k2 && (k2.lanes |= c2);
                    bh(
                      f2.return,
                      c2,
                      b2
                    );
                    h2.lanes |= c2;
                    break;
                  }
                  k2 = k2.next;
                }
              } else if (10 === f2.tag) g2 = f2.type === b2.type ? null : f2.child;
              else if (18 === f2.tag) {
                g2 = f2.return;
                if (null === g2) throw Error(p2(341));
                g2.lanes |= c2;
                h2 = g2.alternate;
                null !== h2 && (h2.lanes |= c2);
                bh(g2, c2, b2);
                g2 = f2.sibling;
              } else g2 = f2.child;
              if (null !== g2) g2.return = f2;
              else for (g2 = f2; null !== g2; ) {
                if (g2 === b2) {
                  g2 = null;
                  break;
                }
                f2 = g2.sibling;
                if (null !== f2) {
                  f2.return = g2.return;
                  g2 = f2;
                  break;
                }
                g2 = g2.return;
              }
              f2 = g2;
            }
            Xi2(a2, b2, e3.children, c2);
            b2 = b2.child;
          }
          return b2;
        case 9:
          return e3 = b2.type, d2 = b2.pendingProps.children, ch(b2, c2), e3 = eh(e3), d2 = d2(e3), b2.flags |= 1, Xi2(a2, b2, d2, c2), b2.child;
        case 14:
          return d2 = b2.type, e3 = Ci2(d2, b2.pendingProps), e3 = Ci2(d2.type, e3), $i2(a2, b2, d2, e3, c2);
        case 15:
          return bj(a2, b2, b2.type, b2.pendingProps, c2);
        case 17:
          return d2 = b2.type, e3 = b2.pendingProps, e3 = b2.elementType === d2 ? e3 : Ci2(d2, e3), ij(a2, b2), b2.tag = 1, Zf(d2) ? (a2 = true, cg(b2)) : a2 = false, ch(b2, c2), Gi2(b2, d2, e3), Ii2(b2, d2, e3, c2), jj(null, b2, d2, true, a2, c2);
        case 19:
          return xj(a2, b2, c2);
        case 22:
          return dj(a2, b2, c2);
      }
      throw Error(p2(156, b2.tag));
    };
    function Fk(a2, b2) {
      return ac(a2, b2);
    }
    function $k(a2, b2, c2, d2) {
      this.tag = a2;
      this.key = c2;
      this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
      this.index = 0;
      this.ref = null;
      this.pendingProps = b2;
      this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
      this.mode = d2;
      this.subtreeFlags = this.flags = 0;
      this.deletions = null;
      this.childLanes = this.lanes = 0;
      this.alternate = null;
    }
    function Bg(a2, b2, c2, d2) {
      return new $k(a2, b2, c2, d2);
    }
    function aj(a2) {
      a2 = a2.prototype;
      return !(!a2 || !a2.isReactComponent);
    }
    function Zk(a2) {
      if ("function" === typeof a2) return aj(a2) ? 1 : 0;
      if (void 0 !== a2 && null !== a2) {
        a2 = a2.$$typeof;
        if (a2 === Da) return 11;
        if (a2 === Ga) return 14;
      }
      return 2;
    }
    function Pg(a2, b2) {
      var c2 = a2.alternate;
      null === c2 ? (c2 = Bg(a2.tag, b2, a2.key, a2.mode), c2.elementType = a2.elementType, c2.type = a2.type, c2.stateNode = a2.stateNode, c2.alternate = a2, a2.alternate = c2) : (c2.pendingProps = b2, c2.type = a2.type, c2.flags = 0, c2.subtreeFlags = 0, c2.deletions = null);
      c2.flags = a2.flags & 14680064;
      c2.childLanes = a2.childLanes;
      c2.lanes = a2.lanes;
      c2.child = a2.child;
      c2.memoizedProps = a2.memoizedProps;
      c2.memoizedState = a2.memoizedState;
      c2.updateQueue = a2.updateQueue;
      b2 = a2.dependencies;
      c2.dependencies = null === b2 ? null : { lanes: b2.lanes, firstContext: b2.firstContext };
      c2.sibling = a2.sibling;
      c2.index = a2.index;
      c2.ref = a2.ref;
      return c2;
    }
    function Rg(a2, b2, c2, d2, e3, f2) {
      var g2 = 2;
      d2 = a2;
      if ("function" === typeof a2) aj(a2) && (g2 = 1);
      else if ("string" === typeof a2) g2 = 5;
      else a: switch (a2) {
        case ya2:
          return Tg(c2.children, e3, f2, b2);
        case za:
          g2 = 8;
          e3 |= 8;
          break;
        case Aa2:
          return a2 = Bg(12, c2, b2, e3 | 2), a2.elementType = Aa2, a2.lanes = f2, a2;
        case Ea2:
          return a2 = Bg(13, c2, b2, e3), a2.elementType = Ea2, a2.lanes = f2, a2;
        case Fa:
          return a2 = Bg(19, c2, b2, e3), a2.elementType = Fa, a2.lanes = f2, a2;
        case Ia2:
          return pj(c2, e3, f2, b2);
        default:
          if ("object" === typeof a2 && null !== a2) switch (a2.$$typeof) {
            case Ba:
              g2 = 10;
              break a;
            case Ca2:
              g2 = 9;
              break a;
            case Da:
              g2 = 11;
              break a;
            case Ga:
              g2 = 14;
              break a;
            case Ha:
              g2 = 16;
              d2 = null;
              break a;
          }
          throw Error(p2(130, null == a2 ? a2 : typeof a2, ""));
      }
      b2 = Bg(g2, c2, b2, e3);
      b2.elementType = a2;
      b2.type = d2;
      b2.lanes = f2;
      return b2;
    }
    function Tg(a2, b2, c2, d2) {
      a2 = Bg(7, a2, d2, b2);
      a2.lanes = c2;
      return a2;
    }
    function pj(a2, b2, c2, d2) {
      a2 = Bg(22, a2, d2, b2);
      a2.elementType = Ia2;
      a2.lanes = c2;
      a2.stateNode = { isHidden: false };
      return a2;
    }
    function Qg(a2, b2, c2) {
      a2 = Bg(6, a2, null, b2);
      a2.lanes = c2;
      return a2;
    }
    function Sg(a2, b2, c2) {
      b2 = Bg(4, null !== a2.children ? a2.children : [], a2.key, b2);
      b2.lanes = c2;
      b2.stateNode = { containerInfo: a2.containerInfo, pendingChildren: null, implementation: a2.implementation };
      return b2;
    }
    function al(a2, b2, c2, d2, e3) {
      this.tag = b2;
      this.containerInfo = a2;
      this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
      this.timeoutHandle = -1;
      this.callbackNode = this.pendingContext = this.context = null;
      this.callbackPriority = 0;
      this.eventTimes = zc(0);
      this.expirationTimes = zc(-1);
      this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
      this.entanglements = zc(0);
      this.identifierPrefix = d2;
      this.onRecoverableError = e3;
      this.mutableSourceEagerHydrationData = null;
    }
    function bl(a2, b2, c2, d2, e3, f2, g2, h2, k2) {
      a2 = new al(a2, b2, c2, h2, k2);
      1 === b2 ? (b2 = 1, true === f2 && (b2 |= 8)) : b2 = 0;
      f2 = Bg(3, null, null, b2);
      a2.current = f2;
      f2.stateNode = a2;
      f2.memoizedState = { element: d2, isDehydrated: c2, cache: null, transitions: null, pendingSuspenseBoundaries: null };
      kh(f2);
      return a2;
    }
    function cl(a2, b2, c2) {
      var d2 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return { $$typeof: wa2, key: null == d2 ? null : "" + d2, children: a2, containerInfo: b2, implementation: c2 };
    }
    function dl(a2) {
      if (!a2) return Vf;
      a2 = a2._reactInternals;
      a: {
        if (Vb(a2) !== a2 || 1 !== a2.tag) throw Error(p2(170));
        var b2 = a2;
        do {
          switch (b2.tag) {
            case 3:
              b2 = b2.stateNode.context;
              break a;
            case 1:
              if (Zf(b2.type)) {
                b2 = b2.stateNode.__reactInternalMemoizedMergedChildContext;
                break a;
              }
          }
          b2 = b2.return;
        } while (null !== b2);
        throw Error(p2(171));
      }
      if (1 === a2.tag) {
        var c2 = a2.type;
        if (Zf(c2)) return bg(a2, c2, b2);
      }
      return b2;
    }
    function el(a2, b2, c2, d2, e3, f2, g2, h2, k2) {
      a2 = bl(c2, d2, true, a2, e3, f2, g2, h2, k2);
      a2.context = dl(null);
      c2 = a2.current;
      d2 = R2();
      e3 = yi2(c2);
      f2 = mh(d2, e3);
      f2.callback = void 0 !== b2 && null !== b2 ? b2 : null;
      nh(c2, f2, e3);
      a2.current.lanes = e3;
      Ac(a2, e3, d2);
      Dk(a2, d2);
      return a2;
    }
    function fl(a2, b2, c2, d2) {
      var e3 = b2.current, f2 = R2(), g2 = yi2(e3);
      c2 = dl(c2);
      null === b2.context ? b2.context = c2 : b2.pendingContext = c2;
      b2 = mh(f2, g2);
      b2.payload = { element: a2 };
      d2 = void 0 === d2 ? null : d2;
      null !== d2 && (b2.callback = d2);
      a2 = nh(e3, b2, g2);
      null !== a2 && (gi2(a2, e3, g2, f2), oh(a2, e3, g2));
      return g2;
    }
    function gl(a2) {
      a2 = a2.current;
      if (!a2.child) return null;
      switch (a2.child.tag) {
        case 5:
          return a2.child.stateNode;
        default:
          return a2.child.stateNode;
      }
    }
    function hl(a2, b2) {
      a2 = a2.memoizedState;
      if (null !== a2 && null !== a2.dehydrated) {
        var c2 = a2.retryLane;
        a2.retryLane = 0 !== c2 && c2 < b2 ? c2 : b2;
      }
    }
    function il(a2, b2) {
      hl(a2, b2);
      (a2 = a2.alternate) && hl(a2, b2);
    }
    function jl() {
      return null;
    }
    var kl = "function" === typeof reportError ? reportError : function(a2) {
      console.error(a2);
    };
    function ll(a2) {
      this._internalRoot = a2;
    }
    ml.prototype.render = ll.prototype.render = function(a2) {
      var b2 = this._internalRoot;
      if (null === b2) throw Error(p2(409));
      fl(a2, b2, null, null);
    };
    ml.prototype.unmount = ll.prototype.unmount = function() {
      var a2 = this._internalRoot;
      if (null !== a2) {
        this._internalRoot = null;
        var b2 = a2.containerInfo;
        Rk(function() {
          fl(null, a2, null, null);
        });
        b2[uf] = null;
      }
    };
    function ml(a2) {
      this._internalRoot = a2;
    }
    ml.prototype.unstable_scheduleHydration = function(a2) {
      if (a2) {
        var b2 = Hc();
        a2 = { blockedOn: null, target: a2, priority: b2 };
        for (var c2 = 0; c2 < Qc.length && 0 !== b2 && b2 < Qc[c2].priority; c2++) ;
        Qc.splice(c2, 0, a2);
        0 === c2 && Vc(a2);
      }
    };
    function nl(a2) {
      return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType);
    }
    function ol(a2) {
      return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType && (8 !== a2.nodeType || " react-mount-point-unstable " !== a2.nodeValue));
    }
    function pl() {
    }
    function ql(a2, b2, c2, d2, e3) {
      if (e3) {
        if ("function" === typeof d2) {
          var f2 = d2;
          d2 = function() {
            var a3 = gl(g2);
            f2.call(a3);
          };
        }
        var g2 = el(b2, d2, a2, 0, null, false, false, "", pl);
        a2._reactRootContainer = g2;
        a2[uf] = g2.current;
        sf(8 === a2.nodeType ? a2.parentNode : a2);
        Rk();
        return g2;
      }
      for (; e3 = a2.lastChild; ) a2.removeChild(e3);
      if ("function" === typeof d2) {
        var h2 = d2;
        d2 = function() {
          var a3 = gl(k2);
          h2.call(a3);
        };
      }
      var k2 = bl(a2, 0, false, null, null, false, false, "", pl);
      a2._reactRootContainer = k2;
      a2[uf] = k2.current;
      sf(8 === a2.nodeType ? a2.parentNode : a2);
      Rk(function() {
        fl(b2, k2, c2, d2);
      });
      return k2;
    }
    function rl(a2, b2, c2, d2, e3) {
      var f2 = c2._reactRootContainer;
      if (f2) {
        var g2 = f2;
        if ("function" === typeof e3) {
          var h2 = e3;
          e3 = function() {
            var a3 = gl(g2);
            h2.call(a3);
          };
        }
        fl(b2, g2, a2, e3);
      } else g2 = ql(c2, b2, a2, e3, d2);
      return gl(g2);
    }
    Ec = function(a2) {
      switch (a2.tag) {
        case 3:
          var b2 = a2.stateNode;
          if (b2.current.memoizedState.isDehydrated) {
            var c2 = tc(b2.pendingLanes);
            0 !== c2 && (Cc(b2, c2 | 1), Dk(b2, B2()), 0 === (K2 & 6) && (Gj = B2() + 500, jg()));
          }
          break;
        case 13:
          Rk(function() {
            var b3 = ih(a2, 1);
            if (null !== b3) {
              var c3 = R2();
              gi2(b3, a2, 1, c3);
            }
          }), il(a2, 1);
      }
    };
    Fc = function(a2) {
      if (13 === a2.tag) {
        var b2 = ih(a2, 134217728);
        if (null !== b2) {
          var c2 = R2();
          gi2(b2, a2, 134217728, c2);
        }
        il(a2, 134217728);
      }
    };
    Gc = function(a2) {
      if (13 === a2.tag) {
        var b2 = yi2(a2), c2 = ih(a2, b2);
        if (null !== c2) {
          var d2 = R2();
          gi2(c2, a2, b2, d2);
        }
        il(a2, b2);
      }
    };
    Hc = function() {
      return C2;
    };
    Ic = function(a2, b2) {
      var c2 = C2;
      try {
        return C2 = a2, b2();
      } finally {
        C2 = c2;
      }
    };
    yb = function(a2, b2, c2) {
      switch (b2) {
        case "input":
          bb(a2, c2);
          b2 = c2.name;
          if ("radio" === c2.type && null != b2) {
            for (c2 = a2; c2.parentNode; ) c2 = c2.parentNode;
            c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b2) + '][type="radio"]');
            for (b2 = 0; b2 < c2.length; b2++) {
              var d2 = c2[b2];
              if (d2 !== a2 && d2.form === a2.form) {
                var e3 = Db(d2);
                if (!e3) throw Error(p2(90));
                Wa2(d2);
                bb(d2, e3);
              }
            }
          }
          break;
        case "textarea":
          ib(a2, c2);
          break;
        case "select":
          b2 = c2.value, null != b2 && fb(a2, !!c2.multiple, b2, false);
      }
    };
    Gb = Qk;
    Hb = Rk;
    var sl = { usingClientEntryPoint: false, Events: [Cb, ue2, Db, Eb, Fb, Qk] };
    var tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
    var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua2.ReactCurrentDispatcher, findHostInstanceByFiber: function(a2) {
      a2 = Zb(a2);
      return null === a2 ? null : a2.stateNode;
    }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
    if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
      vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!vl.isDisabled && vl.supportsFiber) try {
        kc = vl.inject(ul), lc = vl;
      } catch (a2) {
      }
    }
    var vl;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
    exports.createPortal = function(a2, b2) {
      var c2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (!nl(b2)) throw Error(p2(200));
      return cl(a2, b2, null, c2);
    };
    exports.createRoot = function(a2, b2) {
      if (!nl(a2)) throw Error(p2(299));
      var c2 = false, d2 = "", e3 = kl;
      null !== b2 && void 0 !== b2 && (true === b2.unstable_strictMode && (c2 = true), void 0 !== b2.identifierPrefix && (d2 = b2.identifierPrefix), void 0 !== b2.onRecoverableError && (e3 = b2.onRecoverableError));
      b2 = bl(a2, 1, false, null, null, c2, false, d2, e3);
      a2[uf] = b2.current;
      sf(8 === a2.nodeType ? a2.parentNode : a2);
      return new ll(b2);
    };
    exports.findDOMNode = function(a2) {
      if (null == a2) return null;
      if (1 === a2.nodeType) return a2;
      var b2 = a2._reactInternals;
      if (void 0 === b2) {
        if ("function" === typeof a2.render) throw Error(p2(188));
        a2 = Object.keys(a2).join(",");
        throw Error(p2(268, a2));
      }
      a2 = Zb(b2);
      a2 = null === a2 ? null : a2.stateNode;
      return a2;
    };
    exports.flushSync = function(a2) {
      return Rk(a2);
    };
    exports.hydrate = function(a2, b2, c2) {
      if (!ol(b2)) throw Error(p2(200));
      return rl(null, a2, b2, true, c2);
    };
    exports.hydrateRoot = function(a2, b2, c2) {
      if (!nl(a2)) throw Error(p2(405));
      var d2 = null != c2 && c2.hydratedSources || null, e3 = false, f2 = "", g2 = kl;
      null !== c2 && void 0 !== c2 && (true === c2.unstable_strictMode && (e3 = true), void 0 !== c2.identifierPrefix && (f2 = c2.identifierPrefix), void 0 !== c2.onRecoverableError && (g2 = c2.onRecoverableError));
      b2 = el(b2, null, a2, 1, null != c2 ? c2 : null, e3, false, f2, g2);
      a2[uf] = b2.current;
      sf(a2);
      if (d2) for (a2 = 0; a2 < d2.length; a2++) c2 = d2[a2], e3 = c2._getVersion, e3 = e3(c2._source), null == b2.mutableSourceEagerHydrationData ? b2.mutableSourceEagerHydrationData = [c2, e3] : b2.mutableSourceEagerHydrationData.push(
        c2,
        e3
      );
      return new ml(b2);
    };
    exports.render = function(a2, b2, c2) {
      if (!ol(b2)) throw Error(p2(200));
      return rl(null, a2, b2, false, c2);
    };
    exports.unmountComponentAtNode = function(a2) {
      if (!ol(a2)) throw Error(p2(40));
      return a2._reactRootContainer ? (Rk(function() {
        rl(null, null, a2, false, function() {
          a2._reactRootContainer = null;
          a2[uf] = null;
        });
      }), true) : false;
    };
    exports.unstable_batchedUpdates = Qk;
    exports.unstable_renderSubtreeIntoContainer = function(a2, b2, c2, d2) {
      if (!ol(c2)) throw Error(p2(200));
      if (null == a2 || void 0 === a2._reactInternals) throw Error(p2(38));
      return rl(a2, b2, c2, false, d2);
    };
    exports.version = "18.3.1-next-f1338f8080-20240426";
  }
});

// ../../genAI-LBS-G5/node_modules/react-dom/index.js
var require_react_dom = __commonJS({
  "../../genAI-LBS-G5/node_modules/react-dom/index.js"(exports, module) {
    "use strict";
    function checkDCE() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
        return;
      }
      if (false) {
        throw new Error("^_^");
      }
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
    }
    if (true) {
      checkDCE();
      module.exports = require_react_dom_production_min();
    } else {
      module.exports = null;
    }
  }
});

// ../../genAI-LBS-G5/node_modules/react-dom/client.js
var require_client = __commonJS({
  "../../genAI-LBS-G5/node_modules/react-dom/client.js"(exports) {
    "use strict";
    var m2 = require_react_dom();
    if (true) {
      exports.createRoot = m2.createRoot;
      exports.hydrateRoot = m2.hydrateRoot;
    } else {
      i2 = m2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      exports.createRoot = function(c2, o2) {
        i2.usingClientEntryPoint = true;
        try {
          return m2.createRoot(c2, o2);
        } finally {
          i2.usingClientEntryPoint = false;
        }
      };
      exports.hydrateRoot = function(c2, h2, o2) {
        i2.usingClientEntryPoint = true;
        try {
          return m2.hydrateRoot(c2, h2, o2);
        } finally {
          i2.usingClientEntryPoint = false;
        }
      };
    }
    var i2;
  }
});

// ../../genAI-LBS-G5/node_modules/react/cjs/react-jsx-runtime.production.min.js
var require_react_jsx_runtime_production_min = __commonJS({
  "../../genAI-LBS-G5/node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
    "use strict";
    var f2 = require_react();
    var k2 = /* @__PURE__ */ Symbol.for("react.element");
    var l2 = /* @__PURE__ */ Symbol.for("react.fragment");
    var m2 = Object.prototype.hasOwnProperty;
    var n2 = f2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
    var p2 = { key: true, ref: true, __self: true, __source: true };
    function q2(c2, a2, g2) {
      var b2, d2 = {}, e3 = null, h2 = null;
      void 0 !== g2 && (e3 = "" + g2);
      void 0 !== a2.key && (e3 = "" + a2.key);
      void 0 !== a2.ref && (h2 = a2.ref);
      for (b2 in a2) m2.call(a2, b2) && !p2.hasOwnProperty(b2) && (d2[b2] = a2[b2]);
      if (c2 && c2.defaultProps) for (b2 in a2 = c2.defaultProps, a2) void 0 === d2[b2] && (d2[b2] = a2[b2]);
      return { $$typeof: k2, type: c2, key: e3, ref: h2, props: d2, _owner: n2.current };
    }
    exports.Fragment = l2;
    exports.jsx = q2;
    exports.jsxs = q2;
  }
});

// ../../genAI-LBS-G5/node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "../../genAI-LBS-G5/node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_react_jsx_runtime_production_min();
    } else {
      module.exports = null;
    }
  }
});

// client/src/main.tsx
var import_react7 = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);

// ../../genAI-LBS-G5/node_modules/react-router-dom/dist/index.js
var React2 = __toESM(require_react());
var ReactDOM = __toESM(require_react_dom());

// ../../genAI-LBS-G5/node_modules/react-router/dist/index.js
var React = __toESM(require_react());

// ../../genAI-LBS-G5/node_modules/@remix-run/router/dist/router.js
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
var PopStateEventType = "popstate";
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window2, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window2.location;
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createBrowserHref(window2, to2) {
    return typeof to2 === "string" ? to2 : createPath(to2);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e3) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index
  };
}
function createLocation(current, to2, state, key) {
  if (state === void 0) {
    state = null;
  }
  let location = _extends({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to2 === "string" ? parsePath(to2) : to2, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to2 && to2.key || key || createKey()
  });
  return location;
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window: window2 = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window2.history;
  let action = Action.Pop;
  let listener = null;
  let index = getIndex();
  if (index == null) {
    index = 0;
    globalHistory.replaceState(_extends({}, globalHistory.state, {
      idx: index
    }), "");
  }
  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }
  function push(to2, state) {
    action = Action.Push;
    let location = createLocation(history.location, to2, state);
    if (validateLocation) validateLocation(location, to2);
    index = getIndex() + 1;
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }
  function replace2(to2, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to2, state);
    if (validateLocation) validateLocation(location, to2);
    index = getIndex();
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }
  function createURL(to2) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
    let href = typeof to2 === "string" ? to2 : createPath(to2);
    href = href.replace(/ $/, "%20");
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn2) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn2;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to2) {
      return createHref(window2, to2);
    },
    createURL,
    encodeLocation(to2) {
      let url = createURL(to2);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace: replace2,
    go(n2) {
      return globalHistory.go(n2);
    }
  };
  return history;
}
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i2 = 0; matches == null && i2 < branches.length; ++i2) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(branches[i2], decoded, allowPartial);
  }
  return matches;
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = (route, index, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a2, b2) => a2.score !== b2.score ? b2.score - a2.score : compareIndexes(a2.routesMeta.map((meta) => meta.childrenIndex), b2.routesMeta.map((meta) => meta.childrenIndex)));
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s2) => s2 === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s2) => !isSplat(s2)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a2, b2) {
  let siblings = a2.length === b2.length && a2.slice(0, -1).every((n2, i2) => n2 === b2[i2]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a2[a2.length - 1] - b2[b2.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname, allowPartial) {
  if (allowPartial === void 0) {
    allowPartial = false;
  }
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i2 = 0; i2 < routesMeta.length; ++i2) {
    let meta = routesMeta[i2];
    let end = i2 === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath({
        path: meta.relativePath,
        caseSensitive: meta.caseSensitive,
        end: false
      }, remainingPathname);
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce((memo2, _ref, index) => {
    let {
      paramName,
      isOptional
    } = _ref;
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    const value = captureGroups[index];
    if (isOptional && !value) {
      memo2[paramName] = void 0;
    } else {
      memo2[paramName] = (value || "").replace(/%2F/g, "/");
    }
    return memo2;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_2, paramName, isOptional) => {
    params.push({
      paramName,
      isOptional: isOptional != null
    });
    return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    params.push({
      paramName: "*"
    });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v2) => decodeURIComponent(v2).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
var ABSOLUTE_URL_REGEX$1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX$1.test(url);
function resolvePath(to2, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to2 === "string" ? parsePath(to2) : to2;
  let pathname;
  if (toPathname) {
    if (isAbsoluteUrl(toPathname)) {
      pathname = toPathname;
    } else {
      if (toPathname.includes("//")) {
        let oldPathname = toPathname;
        toPathname = toPathname.replace(/\/\/+/g, "/");
        warning(false, "Pathnames cannot have embedded double slashes - normalizing " + (oldPathname + " -> " + toPathname));
      }
      if (toPathname.startsWith("/")) {
        pathname = resolvePathname(toPathname.substring(1), "/");
      } else {
        pathname = resolvePathname(toPathname, fromPathname);
      }
    }
  } else {
    pathname = fromPathname;
  }
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function getResolveToMatches(matches, v7_relativeSplatPath) {
  let pathMatches = getPathContributingMatches(matches);
  if (v7_relativeSplatPath) {
    return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
  }
  return pathMatches.map((match) => match.pathnameBase);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to2;
  if (typeof toArg === "string") {
    to2 = parsePath(toArg);
  } else {
    to2 = _extends({}, toArg);
    invariant(!to2.pathname || !to2.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to2));
    invariant(!to2.pathname || !to2.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to2));
    invariant(!to2.search || !to2.search.includes("#"), getInvalidPathError("#", "search", "hash", to2));
  }
  let isEmptyPath = toArg === "" || to2.pathname === "";
  let toPathname = isEmptyPath ? "/" : to2.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to2.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to2, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
var normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
var validMutationMethodsArr = ["post", "put", "patch", "delete"];
var validMutationMethods = new Set(validMutationMethodsArr);
var validRequestMethodsArr = ["get", ...validMutationMethodsArr];
var validRequestMethods = new Set(validRequestMethodsArr);

// ../../genAI-LBS-G5/node_modules/react-router/dist/index.js
function _extends2() {
  _extends2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends2.apply(this, arguments);
}
var DataRouterContext = /* @__PURE__ */ React.createContext(null);
if (false) {
  DataRouterContext.displayName = "DataRouter";
}
var DataRouterStateContext = /* @__PURE__ */ React.createContext(null);
if (false) {
  DataRouterStateContext.displayName = "DataRouterState";
}
if (false) {
  AwaitContext.displayName = "Await";
}
var NavigationContext = /* @__PURE__ */ React.createContext(null);
if (false) {
  NavigationContext.displayName = "Navigation";
}
var LocationContext = /* @__PURE__ */ React.createContext(null);
if (false) {
  LocationContext.displayName = "Location";
}
var RouteContext = /* @__PURE__ */ React.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
if (false) {
  RouteContext.displayName = "Route";
}
var RouteErrorContext = /* @__PURE__ */ React.createContext(null);
if (false) {
  RouteErrorContext.displayName = "RouteError";
}
function useHref(to2, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  !useInRouterContext() ? false ? invariant(
    false,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : invariant(false) : void 0;
  let {
    basename,
    navigator: navigator2
  } = React.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to2, {
    relative
  });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator2.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
function useInRouterContext() {
  return React.useContext(LocationContext) != null;
}
function useLocation() {
  !useInRouterContext() ? false ? invariant(
    false,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : invariant(false) : void 0;
  return React.useContext(LocationContext).location;
}
function useIsomorphicLayoutEffect(cb) {
  let isStatic = React.useContext(NavigationContext).static;
  if (!isStatic) {
    React.useLayoutEffect(cb);
  }
}
function useNavigate() {
  let {
    isDataRoute
  } = React.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  !useInRouterContext() ? false ? invariant(
    false,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : invariant(false) : void 0;
  let dataRouterContext = React.useContext(DataRouterContext);
  let {
    basename,
    future,
    navigator: navigator2
  } = React.useContext(NavigationContext);
  let {
    matches
  } = React.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
  let activeRef = React.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = React.useCallback(function(to2, options) {
    if (options === void 0) {
      options = {};
    }
    false ? warning(activeRef.current, navigateEffectWarning) : void 0;
    if (!activeRef.current) return;
    if (typeof to2 === "number") {
      navigator2.go(to2);
      return;
    }
    let path = resolveTo(to2, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    if (dataRouterContext == null && basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator2.replace : navigator2.push)(path, options.state, options);
  }, [basename, navigator2, routePathnamesJson, locationPathname, dataRouterContext]);
  return navigate;
}
function useResolvedPath(to2, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    future
  } = React.useContext(NavigationContext);
  let {
    matches
  } = React.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
  return React.useMemo(() => resolveTo(to2, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to2, routePathnamesJson, locationPathname, relative]);
}
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
  !useInRouterContext() ? false ? invariant(
    false,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  ) : invariant(false) : void 0;
  let {
    navigator: navigator2
  } = React.useContext(NavigationContext);
  let {
    matches: parentMatches
  } = React.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  if (false) {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + parentPathname + '" (under <Route path="' + parentPath + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + parentPath + '"> to <Route ') + ('path="' + (parentPath === "/" ? "*" : parentPath + "/*") + '">.'));
  }
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? false ? invariant(false, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + parentPathnameBase + '" ') + ('but pathname "' + parsedLocationArg.pathname + '" was given in the `location` prop.')) : invariant(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  if (false) {
    false ? warning(parentRoute || matches != null, 'No routes matched location "' + location.pathname + location.search + location.hash + '" ') : void 0;
    false ? warning(matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + location.pathname + location.search + location.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.') : void 0;
  }
  let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathname).pathname : match.pathname
    ]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
    ])
  })), parentMatches, dataRouterState, future);
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ React.createElement(LocationContext.Provider, {
      value: {
        location: _extends2({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: Action.Pop
      }
    }, renderedMatches);
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let codeStyles = {
    padding: "2px 4px",
    backgroundColor: lightgrey
  };
  let devInfo = null;
  if (false) {
    console.error("Error handled by React Router default ErrorBoundary:", error);
    devInfo = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "\u{1F4BF} Hey developer \u{1F44B}"), /* @__PURE__ */ React.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ React.createElement("code", {
      style: codeStyles
    }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ React.createElement("code", {
      style: codeStyles
    }, "errorElement"), " prop on your route."));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ React.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /* @__PURE__ */ React.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
var defaultErrorElement = /* @__PURE__ */ React.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ React.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ React.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
};
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataRouterContext = React.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ React.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState, future) {
  var _dataRouterState;
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (dataRouterState === void 0) {
    dataRouterState = null;
  }
  if (future === void 0) {
    future = null;
  }
  if (matches == null) {
    var _future;
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if ((_future = future) != null && _future.v7_partialHydration && parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = (_dataRouterState = dataRouterState) == null ? void 0 : _dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m2) => m2.route.id && (errors == null ? void 0 : errors[m2.route.id]) !== void 0);
    !(errorIndex >= 0) ? false ? invariant(false, "Could not find a matching route for errors on route IDs: " + Object.keys(errors).join(",")) : invariant(false) : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState && future && future.v7_partialHydration) {
    for (let i2 = 0; i2 < renderedMatches.length; i2++) {
      let match = renderedMatches[i2];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i2;
      }
      if (match.route.id) {
        let {
          loaderData,
          errors: errors2
        } = dataRouterState;
        let needsToRunLoader = match.route.loader && loaderData[match.route.id] === void 0 && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  return renderedMatches.reduceRight((outlet, match, index) => {
    let error;
    let shouldRenderHydrateFallback = false;
    let errorElement = null;
    let hydrateFallbackElement = null;
    if (dataRouterState) {
      error = errors && match.route.id ? errors[match.route.id] : void 0;
      errorElement = match.route.errorElement || defaultErrorElement;
      if (renderFallback) {
        if (fallbackIndex < 0 && index === 0) {
          warningOnce("route-fallback", false, "No `HydrateFallback` element provided to render during initial hydration");
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = null;
        } else if (fallbackIndex === index) {
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = match.route.hydrateFallbackElement || null;
        }
      }
    }
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
    let getChildren = () => {
      let children;
      if (error) {
        children = errorElement;
      } else if (shouldRenderHydrateFallback) {
        children = hydrateFallbackElement;
      } else if (match.route.Component) {
        children = /* @__PURE__ */ React.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /* @__PURE__ */ React.createElement(RenderedRoute, {
        match,
        routeContext: {
          outlet,
          matches: matches2,
          isDataRoute: dataRouterState != null
        },
        children
      });
    };
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ React.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches: matches2,
        isDataRoute: true
      }
    }) : getChildren();
  }, null);
}
var DataRouterHook = /* @__PURE__ */ (function(DataRouterHook3) {
  DataRouterHook3["UseBlocker"] = "useBlocker";
  DataRouterHook3["UseRevalidator"] = "useRevalidator";
  DataRouterHook3["UseNavigateStable"] = "useNavigate";
  return DataRouterHook3;
})(DataRouterHook || {});
var DataRouterStateHook = /* @__PURE__ */ (function(DataRouterStateHook3) {
  DataRouterStateHook3["UseBlocker"] = "useBlocker";
  DataRouterStateHook3["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook3["UseActionData"] = "useActionData";
  DataRouterStateHook3["UseRouteError"] = "useRouteError";
  DataRouterStateHook3["UseNavigation"] = "useNavigation";
  DataRouterStateHook3["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook3["UseMatches"] = "useMatches";
  DataRouterStateHook3["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook3["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook3["UseRouteId"] = "useRouteId";
  return DataRouterStateHook3;
})(DataRouterStateHook || {});
function useDataRouterContext(hookName) {
  let ctx = React.useContext(DataRouterContext);
  !ctx ? false ? invariant(false, getDataRouterConsoleError(hookName)) : invariant(false) : void 0;
  return ctx;
}
function useDataRouterState(hookName) {
  let state = React.useContext(DataRouterStateContext);
  !state ? false ? invariant(false, getDataRouterConsoleError(hookName)) : invariant(false) : void 0;
  return state;
}
function useRouteContext(hookName) {
  let route = React.useContext(RouteContext);
  !route ? false ? invariant(false, getDataRouterConsoleError(hookName)) : invariant(false) : void 0;
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ? false ? invariant(false, hookName + ' can only be used on routes that contain a unique "id"') : invariant(false) : void 0;
  return thisRoute.route.id;
}
function useRouteError() {
  var _state$errors;
  let error = React.useContext(RouteErrorContext);
  let state = useDataRouterState(DataRouterStateHook.UseRouteError);
  let routeId = useCurrentRouteId(DataRouterStateHook.UseRouteError);
  if (error !== void 0) {
    return error;
  }
  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseNavigateStable);
  let id = useCurrentRouteId(DataRouterStateHook.UseNavigateStable);
  let activeRef = React.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = React.useCallback(function(to2, options) {
    if (options === void 0) {
      options = {};
    }
    false ? warning(activeRef.current, navigateEffectWarning) : void 0;
    if (!activeRef.current) return;
    if (typeof to2 === "number") {
      router.navigate(to2);
    } else {
      router.navigate(to2, _extends2({
        fromRouteId: id
      }, options));
    }
  }, [router, id]);
  return navigate;
}
var alreadyWarned$1 = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned$1[key]) {
    alreadyWarned$1[key] = true;
    false ? warning(false, message) : void 0;
  }
}
function warnOnce(key, message) {
  if (false) {
    alreadyWarned[message] = true;
    console.warn(message);
  }
}
var logDeprecation = (flag, msg, link) => warnOnce(flag, "\u26A0\uFE0F React Router Future Flag Warning: " + msg + ". " + ("You can use the `" + flag + "` future flag to opt-in early. ") + ("For more information, see " + link + "."));
function logV6DeprecationWarnings(renderFuture, routerFuture) {
  if ((renderFuture == null ? void 0 : renderFuture.v7_startTransition) === void 0) {
    logDeprecation("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition");
  }
  if ((renderFuture == null ? void 0 : renderFuture.v7_relativeSplatPath) === void 0 && (!routerFuture || routerFuture.v7_relativeSplatPath === void 0)) {
    logDeprecation("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
  }
  if (routerFuture) {
    if (routerFuture.v7_fetcherPersist === void 0) {
      logDeprecation("v7_fetcherPersist", "The persistence behavior of fetchers is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist");
    }
    if (routerFuture.v7_normalizeFormMethod === void 0) {
      logDeprecation("v7_normalizeFormMethod", "Casing of `formMethod` fields is being normalized to uppercase in v7", "https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod");
    }
    if (routerFuture.v7_partialHydration === void 0) {
      logDeprecation("v7_partialHydration", "`RouterProvider` hydration behavior is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_partialhydration");
    }
    if (routerFuture.v7_skipActionErrorRevalidation === void 0) {
      logDeprecation("v7_skipActionErrorRevalidation", "The revalidation behavior after 4xx/5xx `action` responses is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation");
    }
  }
}
var START_TRANSITION = "startTransition";
var startTransitionImpl = React[START_TRANSITION];
function Navigate(_ref4) {
  let {
    to: to2,
    replace: replace2,
    state,
    relative
  } = _ref4;
  !useInRouterContext() ? false ? invariant(
    false,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  ) : invariant(false) : void 0;
  let {
    future,
    static: isStatic
  } = React.useContext(NavigationContext);
  false ? warning(!isStatic, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.") : void 0;
  let {
    matches
  } = React.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let navigate = useNavigate();
  let path = resolveTo(to2, getResolveToMatches(matches, future.v7_relativeSplatPath), locationPathname, relative === "path");
  let jsonPath = JSON.stringify(path);
  React.useEffect(() => navigate(JSON.parse(jsonPath), {
    replace: replace2,
    state,
    relative
  }), [navigate, jsonPath, relative, replace2, state]);
  return null;
}
function Route(_props) {
  false ? invariant(false, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.") : invariant(false);
}
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator: navigator2,
    static: staticProp = false,
    future
  } = _ref5;
  !!useInRouterContext() ? false ? invariant(false, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : invariant(false) : void 0;
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = React.useMemo(() => ({
    basename,
    navigator: navigator2,
    static: staticProp,
    future: _extends2({
      v7_relativeSplatPath: false
    }, future)
  }), [basename, future, navigator2, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = React.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  false ? warning(locationContext != null, '<Router basename="' + basename + '"> is not able to match the URL ' + ('"' + pathname + search + hash + '" because it does not start with the ') + "basename, so the <Router> won't render anything.") : void 0;
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ React.createElement(LocationContext.Provider, {
    children,
    value: locationContext
  }));
}
function Routes(_ref6) {
  let {
    children,
    location
  } = _ref6;
  return useRoutes(createRoutesFromChildren(children), location);
}
var neverSettledPromise = new Promise(() => {
});
function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  let routes = [];
  React.Children.forEach(children, (element, index) => {
    if (!/* @__PURE__ */ React.isValidElement(element)) {
      return;
    }
    let treePath = [...parentPath, index];
    if (element.type === React.Fragment) {
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
      return;
    }
    !(element.type === Route) ? false ? invariant(false, "[" + (typeof element.type === "string" ? element.type : element.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : invariant(false) : void 0;
    !(!element.props.index || !element.props.children) ? false ? invariant(false, "An index route cannot have child routes.") : invariant(false) : void 0;
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }
    routes.push(route);
  });
  return routes;
}

// ../../genAI-LBS-G5/node_modules/react-router-dom/dist/index.js
function _extends3() {
  _extends3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends3.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
var _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"];
var _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"];
var REACT_ROUTER_VERSION = "6";
try {
  window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e3) {
}
var ViewTransitionContext = /* @__PURE__ */ React2.createContext({
  isTransitioning: false
});
if (false) {
  ViewTransitionContext.displayName = "ViewTransition";
}
if (false) {
  FetchersContext.displayName = "Fetchers";
}
var START_TRANSITION2 = "startTransition";
var startTransitionImpl2 = React2[START_TRANSITION2];
var FLUSH_SYNC = "flushSync";
var flushSyncImpl = ReactDOM[FLUSH_SYNC];
var USE_ID = "useId";
var useIdImpl = React2[USE_ID];
function BrowserRouter(_ref4) {
  let {
    basename,
    children,
    future,
    window: window2
  } = _ref4;
  let historyRef = React2.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({
      window: window2,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = React2.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = React2.useCallback((newState) => {
    v7_startTransition && startTransitionImpl2 ? startTransitionImpl2(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  React2.useLayoutEffect(() => history.listen(setState), [history, setState]);
  React2.useEffect(() => logV6DeprecationWarnings(future), [future]);
  return /* @__PURE__ */ React2.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future
  });
}
if (false) {
  HistoryRouter.displayName = "unstable_HistoryRouter";
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Link = /* @__PURE__ */ React2.forwardRef(function LinkWithRef(_ref7, ref) {
  let {
    onClick,
    relative,
    reloadDocument,
    replace: replace2,
    state,
    target,
    to: to2,
    preventScrollReset,
    viewTransition
  } = _ref7, rest = _objectWithoutPropertiesLoose(_ref7, _excluded);
  let {
    basename
  } = React2.useContext(NavigationContext);
  let absoluteHref;
  let isExternal = false;
  if (typeof to2 === "string" && ABSOLUTE_URL_REGEX.test(to2)) {
    absoluteHref = to2;
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to2.startsWith("//") ? new URL(currentUrl.protocol + to2) : new URL(to2);
        let path = stripBasename(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          to2 = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e3) {
        false ? warning(false, '<Link to="' + to2 + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.') : void 0;
      }
    }
  }
  let href = useHref(to2, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to2, {
    replace: replace2,
    state,
    target,
    preventScrollReset,
    relative,
    viewTransition
  });
  function handleClick(event) {
    if (onClick) onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ React2.createElement("a", _extends3({}, rest, {
      href: absoluteHref || href,
      onClick: isExternal || reloadDocument ? onClick : handleClick,
      ref,
      target
    }))
  );
});
if (false) {
  Link.displayName = "Link";
}
var NavLink = /* @__PURE__ */ React2.forwardRef(function NavLinkWithRef(_ref8, ref) {
  let {
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to: to2,
    viewTransition,
    children
  } = _ref8, rest = _objectWithoutPropertiesLoose(_ref8, _excluded2);
  let path = useResolvedPath(to2, {
    relative: rest.relative
  });
  let location = useLocation();
  let routerState = React2.useContext(DataRouterStateContext);
  let {
    navigator: navigator2,
    basename
  } = React2.useContext(NavigationContext);
  let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useViewTransitionState(path) && viewTransition === true;
  let toPathname = navigator2.encodeLocation ? navigator2.encodeLocation(path).pathname : path.pathname;
  let locationPathname = location.pathname;
  let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
    toPathname = toPathname.toLowerCase();
  }
  if (nextLocationPathname && basename) {
    nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
  }
  const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
  let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
  let renderProps = {
    isActive,
    isPending,
    isTransitioning
  };
  let ariaCurrent = isActive ? ariaCurrentProp : void 0;
  let className;
  if (typeof classNameProp === "function") {
    className = classNameProp(renderProps);
  } else {
    className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null, isTransitioning ? "transitioning" : null].filter(Boolean).join(" ");
  }
  let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
  return /* @__PURE__ */ React2.createElement(Link, _extends3({}, rest, {
    "aria-current": ariaCurrent,
    className,
    ref,
    style,
    to: to2,
    viewTransition
  }), typeof children === "function" ? children(renderProps) : children);
});
if (false) {
  NavLink.displayName = "NavLink";
}
if (false) {
  Form.displayName = "Form";
}
if (false) {
  ScrollRestoration.displayName = "ScrollRestoration";
}
var DataRouterHook2;
(function(DataRouterHook3) {
  DataRouterHook3["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook3["UseSubmit"] = "useSubmit";
  DataRouterHook3["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook3["UseFetcher"] = "useFetcher";
  DataRouterHook3["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook2 || (DataRouterHook2 = {}));
var DataRouterStateHook2;
(function(DataRouterStateHook3) {
  DataRouterStateHook3["UseFetcher"] = "useFetcher";
  DataRouterStateHook3["UseFetchers"] = "useFetchers";
  DataRouterStateHook3["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook2 || (DataRouterStateHook2 = {}));
function useDataRouterContext2(hookName) {
  let ctx = React2.useContext(DataRouterContext);
  !ctx ? false ? invariant(false, getDataRouterConsoleError(hookName)) : invariant(false) : void 0;
  return ctx;
}
function useLinkClickHandler(to2, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative,
    viewTransition
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to2, {
    relative
  });
  return React2.useCallback((event) => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
      navigate(to2, {
        replace: replace2,
        state,
        preventScrollReset,
        relative,
        viewTransition
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to2, preventScrollReset, relative, viewTransition]);
}
function useViewTransitionState(to2, opts) {
  if (opts === void 0) {
    opts = {};
  }
  let vtContext = React2.useContext(ViewTransitionContext);
  !(vtContext != null) ? false ? invariant(false, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : invariant(false) : void 0;
  let {
    basename
  } = useDataRouterContext2(DataRouterHook2.useViewTransitionState);
  let path = useResolvedPath(to2, {
    relative: opts.relative
  });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}

// ../../genAI-LBS-G5/node_modules/@auth0/auth0-react/dist/auth0-react.esm.js
var import_react = __toESM(require_react());
var extendStatics = function(d2, b2) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b3) {
    d3.__proto__ = b3;
  } || function(d3, b3) {
    for (var p2 in b3) if (Object.prototype.hasOwnProperty.call(b3, p2)) d3[p2] = b3[p2];
  };
  return extendStatics(d2, b2);
};
function __extends(d2, b2) {
  if (typeof b2 !== "function" && b2 !== null)
    throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
  extendStatics(d2, b2);
  function __() {
    this.constructor = d2;
  }
  d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2)) t2[p2] = s2[p2];
    }
    return t2;
  };
  return __assign.apply(this, arguments);
};
function __rest(s2, e3) {
  var t2 = {};
  for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e3.indexOf(p2) < 0)
    t2[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e3.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2]))
        t2[p2[i2]] = s2[p2[i2]];
    }
  return t2;
}
function __awaiter(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _2 = { label: 0, sent: function() {
    if (t2[0] & 1) throw t2[1];
    return t2[1];
  }, trys: [], ops: [] }, f2, y2, t2, g2 = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g2.next = verb(0), g2["throw"] = verb(1), g2["return"] = verb(2), typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
    return this;
  }), g2;
  function verb(n2) {
    return function(v2) {
      return step([n2, v2]);
    };
  }
  function step(op) {
    if (f2) throw new TypeError("Generator is already executing.");
    while (g2 && (g2 = 0, op[0] && (_2 = 0)), _2) try {
      if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done) return t2;
      if (y2 = 0, t2) op = [op[0] & 2, t2.value];
      switch (op[0]) {
        case 0:
        case 1:
          t2 = op;
          break;
        case 4:
          _2.label++;
          return { value: op[1], done: false };
        case 5:
          _2.label++;
          y2 = op[1];
          op = [0];
          continue;
        case 7:
          op = _2.ops.pop();
          _2.trys.pop();
          continue;
        default:
          if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _2 = 0;
            continue;
          }
          if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
            _2.label = op[1];
            break;
          }
          if (op[0] === 6 && _2.label < t2[1]) {
            _2.label = t2[1];
            t2 = op;
            break;
          }
          if (t2 && _2.label < t2[2]) {
            _2.label = t2[2];
            _2.ops.push(op);
            break;
          }
          if (t2[2]) _2.ops.pop();
          _2.trys.pop();
          continue;
      }
      op = body.call(thisArg, _2);
    } catch (e3) {
      op = [6, e3];
      y2 = 0;
    } finally {
      f2 = t2 = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __spreadArray(to2, from, pack) {
  if (pack || arguments.length === 2) for (var i2 = 0, l2 = from.length, ar2; i2 < l2; i2++) {
    if (ar2 || !(i2 in from)) {
      if (!ar2) ar2 = Array.prototype.slice.call(from, 0, i2);
      ar2[i2] = from[i2];
    }
  }
  return to2.concat(ar2 || Array.prototype.slice.call(from));
}
function e(e3, t2) {
  var n2 = {};
  for (var o2 in e3) Object.prototype.hasOwnProperty.call(e3, o2) && t2.indexOf(o2) < 0 && (n2[o2] = e3[o2]);
  if (null != e3 && "function" == typeof Object.getOwnPropertySymbols) {
    var r2 = 0;
    for (o2 = Object.getOwnPropertySymbols(e3); r2 < o2.length; r2++) t2.indexOf(o2[r2]) < 0 && Object.prototype.propertyIsEnumerable.call(e3, o2[r2]) && (n2[o2[r2]] = e3[o2[r2]]);
  }
  return n2;
}
function t(e3, t2) {
  this.v = e3, this.k = t2;
}
function n(e3, t2) {
  (null == t2 || t2 > e3.length) && (t2 = e3.length);
  for (var n2 = 0, o2 = Array(t2); n2 < t2; n2++) o2[n2] = e3[n2];
  return o2;
}
function o(e3, t2, n2) {
  if ("function" == typeof e3 ? e3 === t2 : e3.has(t2)) return arguments.length < 3 ? t2 : n2;
  throw new TypeError("Private element is not present on this object");
}
function r(e3) {
  return new t(e3, 0);
}
function i(e3, t2) {
  if (t2.has(e3)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function a(e3, t2) {
  return e3.get(o(e3, t2));
}
function s(e3, t2, n2) {
  i(e3, t2), t2.set(e3, n2);
}
function c(e3, t2, n2) {
  return e3.set(o(e3, t2), n2), n2;
}
function u(e3, t2, n2) {
  return (t2 = (function(e4) {
    var t3 = (function(e5, t4) {
      if ("object" != typeof e5 || !e5) return e5;
      var n3 = e5[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var o2 = n3.call(e5, t4 || "default");
        if ("object" != typeof o2) return o2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t4 ? String : Number)(e5);
    })(e4, "string");
    return "symbol" == typeof t3 ? t3 : t3 + "";
  })(t2)) in e3 ? Object.defineProperty(e3, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t2] = n2, e3;
}
function l(e3, t2) {
  var n2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e3);
    t2 && (o2 = o2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
    })), n2.push.apply(n2, o2);
  }
  return n2;
}
function h(e3) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? l(Object(n2), true).forEach(function(t3) {
      u(e3, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : l(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e3;
}
function d(e3, t2) {
  if (null == e3) return {};
  var n2, o2, r2 = (function(e4, t3) {
    if (null == e4) return {};
    var n3 = {};
    for (var o3 in e4) if ({}.hasOwnProperty.call(e4, o3)) {
      if (-1 !== t3.indexOf(o3)) continue;
      n3[o3] = e4[o3];
    }
    return n3;
  })(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e3);
    for (o2 = 0; o2 < i2.length; o2++) n2 = i2[o2], -1 === t2.indexOf(n2) && {}.propertyIsEnumerable.call(e3, n2) && (r2[n2] = e3[n2]);
  }
  return r2;
}
function p(e3, t2) {
  return (function(e4) {
    if (Array.isArray(e4)) return e4;
  })(e3) || (function(e4, t3) {
    var n2 = null == e4 ? null : "undefined" != typeof Symbol && e4[Symbol.iterator] || e4["@@iterator"];
    if (null != n2) {
      var o2, r2, i2, a2, s2 = [], c2 = true, u2 = false;
      try {
        if (i2 = (n2 = n2.call(e4)).next, 0 === t3) {
          if (Object(n2) !== n2) return;
          c2 = false;
        } else for (; !(c2 = (o2 = i2.call(n2)).done) && (s2.push(o2.value), s2.length !== t3); c2 = true) ;
      } catch (e5) {
        u2 = true, r2 = e5;
      } finally {
        try {
          if (!c2 && null != n2.return && (a2 = n2.return(), Object(a2) !== a2)) return;
        } finally {
          if (u2) throw r2;
        }
      }
      return s2;
    }
  })(e3, t2) || (function(e4, t3) {
    if (e4) {
      if ("string" == typeof e4) return n(e4, t3);
      var o2 = {}.toString.call(e4).slice(8, -1);
      return "Object" === o2 && e4.constructor && (o2 = e4.constructor.name), "Map" === o2 || "Set" === o2 ? Array.from(e4) : "Arguments" === o2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o2) ? n(e4, t3) : void 0;
    }
  })(e3, t2) || (function() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  })();
}
function f(e3) {
  return function() {
    return new m(e3.apply(this, arguments));
  };
}
function m(e3) {
  var n2, o2;
  function r2(n3, o3) {
    try {
      var a2 = e3[n3](o3), s2 = a2.value, c2 = s2 instanceof t;
      Promise.resolve(c2 ? s2.v : s2).then(function(t2) {
        if (c2) {
          var o4 = "return" === n3 && s2.k ? n3 : "next";
          if (!s2.k || t2.done) return r2(o4, t2);
          t2 = e3[o4](t2).value;
        }
        i2(!!a2.done, t2);
      }, function(e4) {
        r2("throw", e4);
      });
    } catch (e4) {
      i2(2, e4);
    }
  }
  function i2(e4, t2) {
    2 === e4 ? n2.reject(t2) : n2.resolve({ value: t2, done: e4 }), (n2 = n2.next) ? r2(n2.key, n2.arg) : o2 = null;
  }
  this._invoke = function(e4, t2) {
    return new Promise(function(i3, a2) {
      var s2 = { key: e4, arg: t2, resolve: i3, reject: a2, next: null };
      o2 ? o2 = o2.next = s2 : (n2 = o2 = s2, r2(e4, t2));
    });
  }, "function" != typeof e3.return && (this.return = void 0);
}
"function" == typeof SuppressedError && SuppressedError, m.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
  return this;
}, m.prototype.next = function(e3) {
  return this._invoke("next", e3);
}, m.prototype.throw = function(e3) {
  return this._invoke("throw", e3);
}, m.prototype.return = function(e3) {
  return this._invoke("return", e3);
};
var y = { timeoutInSeconds: 60 };
var w = 1e4;
var g = "memory";
var v = { name: "auth0-spa-js", version: "2.20.0" };
var b = () => Date.now();
var k = "default";
var _ = class __ extends Error {
  constructor(e3, t2) {
    super(t2), this.error = e3, this.error_description = t2, Object.setPrototypeOf(this, __.prototype);
  }
  static fromPayload(e3) {
    let t2 = e3.error, n2 = e3.error_description;
    return new __(t2, n2);
  }
};
var S = class _S extends _ {
  constructor(e3, t2, n2) {
    let o2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
    super(e3, t2), this.state = n2, this.appState = o2, Object.setPrototypeOf(this, _S.prototype);
  }
};
var T = class _T extends _ {
  constructor(e3, t2, n2, o2) {
    let r2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
    super(e3, t2), this.connection = n2, this.state = o2, this.appState = r2, Object.setPrototypeOf(this, _T.prototype);
  }
};
var E = class _E extends _ {
  constructor() {
    super("timeout", "Timeout"), Object.setPrototypeOf(this, _E.prototype);
  }
};
var P = class _P extends E {
  constructor(e3) {
    super(), this.popup = e3, Object.setPrototypeOf(this, _P.prototype);
  }
};
var A = class _A extends _ {
  constructor(e3) {
    super("cancelled", "Popup closed"), this.popup = e3, Object.setPrototypeOf(this, _A.prototype);
  }
};
var I = class _I extends _ {
  constructor() {
    super("popup_open", "Unable to open a popup for loginWithPopup - window.open returned `null`"), Object.setPrototypeOf(this, _I.prototype);
  }
};
var R = class _R extends _ {
  constructor(e3, t2, n2, o2) {
    super(e3, t2), this.mfa_token = n2, this.mfa_requirements = o2, Object.setPrototypeOf(this, _R.prototype);
  }
};
var x = class _x extends _ {
  constructor(e3, t2) {
    super("missing_refresh_token", "Missing Refresh Token (audience: '".concat(j(e3, ["default"]), "', scope: '").concat(j(t2), "')")), this.audience = e3, this.scope = t2, Object.setPrototypeOf(this, _x.prototype);
  }
};
var C = class _C extends _ {
  constructor(e3, t2) {
    super("missing_scopes", "Missing requested scopes after refresh (audience: '".concat(j(e3, ["default"]), "', missing scope: '").concat(j(t2), "')")), this.audience = e3, this.scope = t2, Object.setPrototypeOf(this, _C.prototype);
  }
};
var O = class _O extends _ {
  constructor(e3) {
    super("use_dpop_nonce", "Server rejected DPoP proof: wrong nonce"), this.newDpopNonce = e3, Object.setPrototypeOf(this, _O.prototype);
  }
};
function j(e3) {
  return e3 && !(arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []).includes(e3) ? e3 : "";
}
var W = () => window.crypto;
var K = () => {
  const e3 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_~.";
  let t2 = "";
  for (; t2.length < 43; ) {
    const n2 = W().getRandomValues(new Uint8Array(43 - t2.length));
    for (const o2 of n2) t2.length < 43 && o2 < 198 && (t2 += e3[o2 % 66]);
  }
  return t2;
};
var L = (e3) => btoa(e3);
var U = [{ key: "name", type: ["string"] }, { key: "version", type: ["string", "number"] }, { key: "env", type: ["object"] }];
var D = function(e3) {
  let t2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
  return Object.keys(e3).reduce((n2, o2) => {
    if (t2 && "env" === o2) return n2;
    const r2 = U.find((e4) => e4.key === o2);
    return r2 && r2.type.includes(typeof e3[o2]) && (n2[o2] = e3[o2]), n2;
  }, {});
};
var N = (t2) => {
  var n2 = t2.clientId, o2 = e(t2, ["clientId"]);
  return new URLSearchParams(((e3) => Object.keys(e3).filter((t3) => void 0 !== e3[t3]).reduce((t3, n3) => Object.assign(Object.assign({}, t3), { [n3]: e3[n3] }), {}))(Object.assign({ client_id: n2 }, o2))).toString();
};
var H = async (e3) => {
  const t2 = W().subtle.digest({ name: "SHA-256" }, new TextEncoder().encode(e3));
  return await t2;
};
var Z = (e3) => ((e4) => decodeURIComponent(atob(e4).split("").map((e5) => "%" + ("00" + e5.charCodeAt(0).toString(16)).slice(-2)).join("")))(e3.replace(/_/g, "/").replace(/-/g, "+"));
var J = (e3) => {
  const t2 = new Uint8Array(e3);
  return ((e4) => {
    const t3 = { "+": "-", "/": "_", "=": "" };
    return e4.replace(/[+/=]/g, (e5) => t3[e5]);
  })(window.btoa(String.fromCharCode(...Array.from(t2))));
};
var z = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
var M = {};
var X = {};
Object.defineProperty(X, "__esModule", { value: true });
var V = (function() {
  function e3() {
    var e4 = this;
    this.locked = /* @__PURE__ */ new Map(), this.addToLocked = function(t2, n2) {
      var o2 = e4.locked.get(t2);
      void 0 === o2 ? void 0 === n2 ? e4.locked.set(t2, []) : e4.locked.set(t2, [n2]) : void 0 !== n2 && (o2.unshift(n2), e4.locked.set(t2, o2));
    }, this.isLocked = function(t2) {
      return e4.locked.has(t2);
    }, this.lock = function(t2) {
      return new Promise(function(n2, o2) {
        e4.isLocked(t2) ? e4.addToLocked(t2, n2) : (e4.addToLocked(t2), n2());
      });
    }, this.unlock = function(t2) {
      var n2 = e4.locked.get(t2);
      if (void 0 !== n2 && 0 !== n2.length) {
        var o2 = n2.pop();
        e4.locked.set(t2, n2), void 0 !== o2 && setTimeout(o2, 0);
      } else e4.locked.delete(t2);
    };
  }
  return e3.getInstance = function() {
    return void 0 === e3.instance && (e3.instance = new e3()), e3.instance;
  }, e3;
})();
X.default = function() {
  return V.getInstance();
};
var F = z && z.__awaiter || function(e3, t2, n2, o2) {
  return new (n2 || (n2 = Promise))(function(r2, i2) {
    function a2(e4) {
      try {
        c2(o2.next(e4));
      } catch (e5) {
        i2(e5);
      }
    }
    function s2(e4) {
      try {
        c2(o2.throw(e4));
      } catch (e5) {
        i2(e5);
      }
    }
    function c2(e4) {
      e4.done ? r2(e4.value) : new n2(function(t3) {
        t3(e4.value);
      }).then(a2, s2);
    }
    c2((o2 = o2.apply(e3, t2 || [])).next());
  });
};
var G = z && z.__generator || function(e3, t2) {
  var n2, o2, r2, i2, a2 = { label: 0, sent: function() {
    if (1 & r2[0]) throw r2[1];
    return r2[1];
  }, trys: [], ops: [] };
  return i2 = { next: s2(0), throw: s2(1), return: s2(2) }, "function" == typeof Symbol && (i2[Symbol.iterator] = function() {
    return this;
  }), i2;
  function s2(i3) {
    return function(s3) {
      return (function(i4) {
        if (n2) throw new TypeError("Generator is already executing.");
        for (; a2; ) try {
          if (n2 = 1, o2 && (r2 = 2 & i4[0] ? o2.return : i4[0] ? o2.throw || ((r2 = o2.return) && r2.call(o2), 0) : o2.next) && !(r2 = r2.call(o2, i4[1])).done) return r2;
          switch (o2 = 0, r2 && (i4 = [2 & i4[0], r2.value]), i4[0]) {
            case 0:
            case 1:
              r2 = i4;
              break;
            case 4:
              return a2.label++, { value: i4[1], done: false };
            case 5:
              a2.label++, o2 = i4[1], i4 = [0];
              continue;
            case 7:
              i4 = a2.ops.pop(), a2.trys.pop();
              continue;
            default:
              if (!(r2 = a2.trys, (r2 = r2.length > 0 && r2[r2.length - 1]) || 6 !== i4[0] && 2 !== i4[0])) {
                a2 = 0;
                continue;
              }
              if (3 === i4[0] && (!r2 || i4[1] > r2[0] && i4[1] < r2[3])) {
                a2.label = i4[1];
                break;
              }
              if (6 === i4[0] && a2.label < r2[1]) {
                a2.label = r2[1], r2 = i4;
                break;
              }
              if (r2 && a2.label < r2[2]) {
                a2.label = r2[2], a2.ops.push(i4);
                break;
              }
              r2[2] && a2.ops.pop(), a2.trys.pop();
              continue;
          }
          i4 = t2.call(e3, a2);
        } catch (e4) {
          i4 = [6, e4], o2 = 0;
        } finally {
          n2 = r2 = 0;
        }
        if (5 & i4[0]) throw i4[1];
        return { value: i4[0] ? i4[1] : void 0, done: true };
      })([i3, s3]);
    };
  }
};
var Y = z;
Object.defineProperty(M, "__esModule", { value: true });
var B = X;
var q = "browser-tabs-lock-key";
var Q = { key: function(e3) {
  return F(Y, void 0, void 0, function() {
    return G(this, function(e4) {
      throw new Error("Unsupported");
    });
  });
}, getItem: function(e3) {
  return F(Y, void 0, void 0, function() {
    return G(this, function(e4) {
      throw new Error("Unsupported");
    });
  });
}, clear: function() {
  return F(Y, void 0, void 0, function() {
    return G(this, function(e3) {
      return [2, window.localStorage.clear()];
    });
  });
}, removeItem: function(e3) {
  return F(Y, void 0, void 0, function() {
    return G(this, function(e4) {
      throw new Error("Unsupported");
    });
  });
}, setItem: function(e3, t2) {
  return F(Y, void 0, void 0, function() {
    return G(this, function(e4) {
      throw new Error("Unsupported");
    });
  });
}, keySync: function(e3) {
  return window.localStorage.key(e3);
}, getItemSync: function(e3) {
  return window.localStorage.getItem(e3);
}, clearSync: function() {
  return window.localStorage.clear();
}, removeItemSync: function(e3) {
  return window.localStorage.removeItem(e3);
}, setItemSync: function(e3, t2) {
  return window.localStorage.setItem(e3, t2);
} };
function $(e3) {
  return new Promise(function(t2) {
    return setTimeout(t2, e3);
  });
}
function ee(e3) {
  for (var t2 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz", n2 = "", o2 = 0; o2 < e3; o2++) {
    n2 += t2[Math.floor(61 * Math.random())];
  }
  return n2;
}
var te = (function() {
  function e3(t2) {
    this.acquiredIatSet = /* @__PURE__ */ new Set(), this.storageHandler = void 0, this.id = Date.now().toString() + ee(15), this.acquireLock = this.acquireLock.bind(this), this.releaseLock = this.releaseLock.bind(this), this.releaseLock__private__ = this.releaseLock__private__.bind(this), this.waitForSomethingToChange = this.waitForSomethingToChange.bind(this), this.refreshLockWhileAcquired = this.refreshLockWhileAcquired.bind(this), this.storageHandler = t2, void 0 === e3.waiters && (e3.waiters = []);
  }
  return e3.prototype.acquireLock = function(t2, n2) {
    return void 0 === n2 && (n2 = 5e3), F(this, void 0, void 0, function() {
      var o2, r2, i2, a2, s2, c2, u2;
      return G(this, function(l2) {
        switch (l2.label) {
          case 0:
            o2 = Date.now() + ee(4), r2 = Date.now() + n2, i2 = q + "-" + t2, a2 = void 0 === this.storageHandler ? Q : this.storageHandler, l2.label = 1;
          case 1:
            return Date.now() < r2 ? [4, $(30)] : [3, 8];
          case 2:
            return l2.sent(), null !== a2.getItemSync(i2) ? [3, 5] : (s2 = this.id + "-" + t2 + "-" + o2, [4, $(Math.floor(25 * Math.random()))]);
          case 3:
            return l2.sent(), a2.setItemSync(i2, JSON.stringify({ id: this.id, iat: o2, timeoutKey: s2, timeAcquired: Date.now(), timeRefreshed: Date.now() })), [4, $(30)];
          case 4:
            return l2.sent(), null !== (c2 = a2.getItemSync(i2)) && (u2 = JSON.parse(c2)).id === this.id && u2.iat === o2 ? (this.acquiredIatSet.add(o2), this.refreshLockWhileAcquired(i2, o2), [2, true]) : [3, 7];
          case 5:
            return e3.lockCorrector(void 0 === this.storageHandler ? Q : this.storageHandler), [4, this.waitForSomethingToChange(r2)];
          case 6:
            l2.sent(), l2.label = 7;
          case 7:
            return o2 = Date.now() + ee(4), [3, 1];
          case 8:
            return [2, false];
        }
      });
    });
  }, e3.prototype.refreshLockWhileAcquired = function(e4, t2) {
    return F(this, void 0, void 0, function() {
      var n2 = this;
      return G(this, function(o2) {
        return setTimeout(function() {
          return F(n2, void 0, void 0, function() {
            var n3, o3, r2;
            return G(this, function(i2) {
              switch (i2.label) {
                case 0:
                  return [4, B.default().lock(t2)];
                case 1:
                  return i2.sent(), this.acquiredIatSet.has(t2) ? (n3 = void 0 === this.storageHandler ? Q : this.storageHandler, null === (o3 = n3.getItemSync(e4)) ? (B.default().unlock(t2), [2]) : ((r2 = JSON.parse(o3)).timeRefreshed = Date.now(), n3.setItemSync(e4, JSON.stringify(r2)), B.default().unlock(t2), this.refreshLockWhileAcquired(e4, t2), [2])) : (B.default().unlock(t2), [2]);
              }
            });
          });
        }, 1e3), [2];
      });
    });
  }, e3.prototype.waitForSomethingToChange = function(t2) {
    return F(this, void 0, void 0, function() {
      return G(this, function(n2) {
        switch (n2.label) {
          case 0:
            return [4, new Promise(function(n3) {
              var o2 = false, r2 = Date.now(), i2 = false;
              function a2() {
                if (i2 || (window.removeEventListener("storage", a2), e3.removeFromWaiting(a2), clearTimeout(s2), i2 = true), !o2) {
                  o2 = true;
                  var t3 = 50 - (Date.now() - r2);
                  t3 > 0 ? setTimeout(n3, t3) : n3(null);
                }
              }
              window.addEventListener("storage", a2), e3.addToWaiting(a2);
              var s2 = setTimeout(a2, Math.max(0, t2 - Date.now()));
            })];
          case 1:
            return n2.sent(), [2];
        }
      });
    });
  }, e3.addToWaiting = function(t2) {
    this.removeFromWaiting(t2), void 0 !== e3.waiters && e3.waiters.push(t2);
  }, e3.removeFromWaiting = function(t2) {
    void 0 !== e3.waiters && (e3.waiters = e3.waiters.filter(function(e4) {
      return e4 !== t2;
    }));
  }, e3.notifyWaiters = function() {
    void 0 !== e3.waiters && e3.waiters.slice().forEach(function(e4) {
      return e4();
    });
  }, e3.prototype.releaseLock = function(e4) {
    return F(this, void 0, void 0, function() {
      return G(this, function(t2) {
        switch (t2.label) {
          case 0:
            return [4, this.releaseLock__private__(e4)];
          case 1:
            return [2, t2.sent()];
        }
      });
    });
  }, e3.prototype.releaseLock__private__ = function(t2) {
    return F(this, void 0, void 0, function() {
      var n2, o2, r2, i2;
      return G(this, function(a2) {
        switch (a2.label) {
          case 0:
            return n2 = void 0 === this.storageHandler ? Q : this.storageHandler, o2 = q + "-" + t2, null === (r2 = n2.getItemSync(o2)) ? [2] : (i2 = JSON.parse(r2)).id !== this.id ? [3, 2] : [4, B.default().lock(i2.iat)];
          case 1:
            a2.sent(), this.acquiredIatSet.delete(i2.iat), n2.removeItemSync(o2), B.default().unlock(i2.iat), e3.notifyWaiters(), a2.label = 2;
          case 2:
            return [2];
        }
      });
    });
  }, e3.lockCorrector = function(t2) {
    for (var n2 = Date.now() - 5e3, o2 = t2, r2 = [], i2 = 0; ; ) {
      var a2 = o2.keySync(i2);
      if (null === a2) break;
      r2.push(a2), i2++;
    }
    for (var s2 = false, c2 = 0; c2 < r2.length; c2++) {
      var u2 = r2[c2];
      if (u2.includes(q)) {
        var l2 = o2.getItemSync(u2);
        if (null !== l2) {
          var h2 = JSON.parse(l2);
          (void 0 === h2.timeRefreshed && h2.timeAcquired < n2 || void 0 !== h2.timeRefreshed && h2.timeRefreshed < n2) && (o2.removeItemSync(u2), s2 = true);
        }
      }
    }
    s2 && e3.notifyWaiters();
  }, e3.waiters = void 0, e3;
})();
var ne = M.default = te;
var oe = class {
  async runWithLock(e3, t2, n2) {
    const o2 = new AbortController(), r2 = setTimeout(() => o2.abort(), t2);
    try {
      return await navigator.locks.request(e3, { mode: "exclusive", signal: o2.signal }, async (e4) => {
        if (clearTimeout(r2), !e4) throw new Error("Lock not available");
        return await n2();
      });
    } catch (e4) {
      if (clearTimeout(r2), "AbortError" === (null == e4 ? void 0 : e4.name)) throw new E();
      throw e4;
    }
  }
};
var re = class {
  constructor() {
    this.activeLocks = /* @__PURE__ */ new Set(), this.lock = new ne(), this.pagehideHandler = () => {
      this.activeLocks.forEach((e3) => this.lock.releaseLock(e3)), this.activeLocks.clear();
    };
  }
  async runWithLock(e3, t2, n2) {
    let o2 = false;
    for (let n3 = 0; n3 < 10 && !o2; n3++) o2 = await this.lock.acquireLock(e3, t2);
    if (!o2) throw new E();
    this.activeLocks.add(e3), 1 === this.activeLocks.size && "undefined" != typeof window && window.addEventListener("pagehide", this.pagehideHandler);
    try {
      return await n2();
    } finally {
      this.activeLocks.delete(e3), await this.lock.releaseLock(e3), 0 === this.activeLocks.size && "undefined" != typeof window && window.removeEventListener("pagehide", this.pagehideHandler);
    }
  }
};
function ie() {
  return "undefined" != typeof navigator && "function" == typeof (null === (e3 = navigator.locks) || void 0 === e3 ? void 0 : e3.request) ? new oe() : new re();
  var e3;
}
var ae = null;
var se = new TextEncoder();
var ce = new TextDecoder();
function ue(e3) {
  return "string" == typeof e3 ? se.encode(e3) : ce.decode(e3);
}
function le(e3) {
  if ("number" != typeof e3.modulusLength || e3.modulusLength < 2048) throw new me(`${e3.name} modulusLength must be at least 2048 bits`);
}
async function he(e3, t2, n2) {
  if (false === n2.usages.includes("sign")) throw new TypeError('private CryptoKey instances used for signing assertions must include "sign" in their "usages"');
  const o2 = `${pe(ue(JSON.stringify(e3)))}.${pe(ue(JSON.stringify(t2)))}`;
  return `${o2}.${pe(await crypto.subtle.sign((function(e4) {
    switch (e4.algorithm.name) {
      case "ECDSA":
        return { name: e4.algorithm.name, hash: "SHA-256" };
      case "RSA-PSS":
        return le(e4.algorithm), { name: e4.algorithm.name, saltLength: 32 };
      case "RSASSA-PKCS1-v1_5":
        return le(e4.algorithm), { name: e4.algorithm.name };
      case "Ed25519":
        return { name: e4.algorithm.name };
    }
    throw new fe();
  })(n2), n2, ue(o2)))}`;
}
var de;
if (Uint8Array.prototype.toBase64) de = (e3) => (e3 instanceof ArrayBuffer && (e3 = new Uint8Array(e3)), e3.toBase64({ alphabet: "base64url", omitPadding: true }));
else {
  const e3 = 32768;
  de = (t2) => {
    t2 instanceof ArrayBuffer && (t2 = new Uint8Array(t2));
    const n2 = [];
    for (let o2 = 0; o2 < t2.byteLength; o2 += e3) n2.push(String.fromCharCode.apply(null, t2.subarray(o2, o2 + e3)));
    return btoa(n2.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  };
}
function pe(e3) {
  return de(e3);
}
var fe = class extends Error {
  constructor(e3) {
    var t2;
    super(null != e3 ? e3 : "operation not supported"), this.name = this.constructor.name, null === (t2 = Error.captureStackTrace) || void 0 === t2 || t2.call(Error, this, this.constructor);
  }
};
var me = class extends Error {
  constructor(e3) {
    var t2;
    super(e3), this.name = this.constructor.name, null === (t2 = Error.captureStackTrace) || void 0 === t2 || t2.call(Error, this, this.constructor);
  }
};
function ye(e3) {
  switch (e3.algorithm.name) {
    case "RSA-PSS":
      return (function(e4) {
        if ("SHA-256" === e4.algorithm.hash.name) return "PS256";
        throw new fe("unsupported RsaHashedKeyAlgorithm hash name");
      })(e3);
    case "RSASSA-PKCS1-v1_5":
      return (function(e4) {
        if ("SHA-256" === e4.algorithm.hash.name) return "RS256";
        throw new fe("unsupported RsaHashedKeyAlgorithm hash name");
      })(e3);
    case "ECDSA":
      return (function(e4) {
        if ("P-256" === e4.algorithm.namedCurve) return "ES256";
        throw new fe("unsupported EcKeyAlgorithm namedCurve");
      })(e3);
    case "Ed25519":
      return "Ed25519";
    default:
      throw new fe("unsupported CryptoKey algorithm name");
  }
}
function we(e3) {
  return e3 instanceof CryptoKey;
}
function ge(e3) {
  return we(e3) && "public" === e3.type;
}
async function ve(e3, t2, n2, o2, r2, i2) {
  const a2 = null == e3 ? void 0 : e3.privateKey, s2 = null == e3 ? void 0 : e3.publicKey;
  if (!we(c2 = a2) || "private" !== c2.type) throw new TypeError('"keypair.privateKey" must be a private CryptoKey');
  var c2;
  if (!ge(s2)) throw new TypeError('"keypair.publicKey" must be a public CryptoKey');
  if (true !== s2.extractable) throw new TypeError('"keypair.publicKey.extractable" must be true');
  if ("string" != typeof t2) throw new TypeError('"htu" must be a string');
  if ("string" != typeof n2) throw new TypeError('"htm" must be a string');
  if (void 0 !== o2 && "string" != typeof o2) throw new TypeError('"nonce" must be a string or undefined');
  if (void 0 !== r2 && "string" != typeof r2) throw new TypeError('"accessToken" must be a string or undefined');
  if (void 0 !== i2 && ("object" != typeof i2 || null === i2 || Array.isArray(i2))) throw new TypeError('"additional" must be an object');
  return he({ alg: ye(a2), typ: "dpop+jwt", jwk: await be(s2) }, Object.assign(Object.assign({}, i2), { iat: Math.floor(Date.now() / 1e3), jti: crypto.randomUUID(), htm: n2, nonce: o2, htu: t2, ath: r2 ? pe(await crypto.subtle.digest("SHA-256", ue(r2))) : void 0 }), a2);
}
async function be(e3) {
  const { kty: t2, e: n2, n: o2, x: r2, y: i2, crv: a2 } = await crypto.subtle.exportKey("jwk", e3);
  return { kty: t2, crv: a2, e: n2, n: o2, x: r2, y: i2 };
}
var ke = "dpop-nonce";
var _e = ["authorization_code", "refresh_token", "urn:ietf:params:oauth:grant-type:token-exchange", "http://auth0.com/oauth/grant-type/mfa-oob", "http://auth0.com/oauth/grant-type/mfa-otp", "http://auth0.com/oauth/grant-type/mfa-recovery-code"];
function Se() {
  return (async function(e3, t2) {
    var n2;
    let o2;
    if ("string" != typeof e3 || 0 === e3.length) throw new TypeError('"alg" must be a non-empty string');
    switch (e3) {
      case "PS256":
        o2 = { name: "RSA-PSS", hash: "SHA-256", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]) };
        break;
      case "RS256":
        o2 = { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]) };
        break;
      case "ES256":
        o2 = { name: "ECDSA", namedCurve: "P-256" };
        break;
      case "Ed25519":
        o2 = { name: "Ed25519" };
        break;
      default:
        throw new fe();
    }
    return crypto.subtle.generateKey(o2, null !== (n2 = null == t2 ? void 0 : t2.extractable) && void 0 !== n2 && n2, ["sign", "verify"]);
  })("ES256", { extractable: false });
}
function Te(e3) {
  return (async function(e4) {
    if (!ge(e4)) throw new TypeError('"publicKey" must be a public CryptoKey');
    if (true !== e4.extractable) throw new TypeError('"publicKey.extractable" must be true');
    const t2 = await be(e4);
    let n2;
    switch (t2.kty) {
      case "EC":
        n2 = { crv: t2.crv, kty: t2.kty, x: t2.x, y: t2.y };
        break;
      case "OKP":
        n2 = { crv: t2.crv, kty: t2.kty, x: t2.x };
        break;
      case "RSA":
        n2 = { e: t2.e, kty: t2.kty, n: t2.n };
        break;
      default:
        throw new fe("unsupported JWK kty");
    }
    return pe(await crypto.subtle.digest({ name: "SHA-256" }, ue(JSON.stringify(n2))));
  })(e3.publicKey);
}
function Ee(e3) {
  let t2 = e3.keyPair, n2 = e3.url, o2 = e3.method, r2 = e3.nonce, i2 = e3.accessToken;
  const a2 = (function(e4) {
    const t3 = new URL(e4);
    return t3.search = "", t3.hash = "", t3.href;
  })(n2);
  return ve(t2, a2, o2, r2, i2);
}
var Pe = (e3, t2) => new Promise(function(n2, o2) {
  const r2 = new MessageChannel();
  r2.port1.onmessage = function(e4) {
    e4.data.error ? o2(new Error(e4.data.error)) : n2(e4.data), r2.port1.close();
  }, t2.postMessage(e3, [r2.port2]);
});
var Ae = (e3, t2, n2) => {
  const o2 = new AbortController();
  let r2;
  return t2.signal = o2.signal, Promise.race([fetch(e3, t2), new Promise((e4, t3) => {
    r2 = setTimeout(() => {
      o2.abort(), t3(new Error("Timeout when executing 'fetch'"));
    }, n2);
  })]).finally(() => {
    clearTimeout(r2);
  });
};
var Ie = async function(e3, t2, n2, o2, r2, i2) {
  let a2 = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : w;
  return r2 ? (async (e4, t3, n3, o3, r3, i3, a3, s2, c2) => Pe({ type: "refresh", auth: { audience: t3, scope: n3 }, timeout: r3, fetchUrl: e4, fetchOptions: o3, useFormData: a3, useMrrt: s2, skipTokenStorage: c2 }, i3))(e3, t2, n2, o2, a2, r2, i2, arguments.length > 7 ? arguments[7] : void 0, arguments.length > 8 ? arguments[8] : void 0) : (async (e4, t3, n3) => {
    const o3 = await Ae(e4, t3, n3);
    return { ok: o3.ok, json: await o3.json(), headers: (r3 = o3.headers, [...r3].reduce((e5, t4) => {
      let n4 = p(t4, 2), o4 = n4[0], r4 = n4[1];
      return e5[o4] = r4, e5;
    }, {})) };
    var r3;
  })(e3, o2, a2);
};
async function Re(t2, n2, o2, r2, i2, a2, s2, c2, u2, l2, h2) {
  if (u2) {
    const e3 = await u2.generateProof({ url: t2, method: i2.method || "GET", nonce: await u2.getNonce() });
    i2.headers = Object.assign(Object.assign({}, i2.headers), { dpop: e3 });
  }
  let d2, p2 = null;
  for (let e3 = 0; e3 < 3; e3++) try {
    d2 = await Ie(t2, o2, r2, i2, a2, s2, n2, c2, h2), p2 = null;
    break;
  } catch (e4) {
    p2 = e4;
  }
  if (p2) throw p2;
  const f2 = d2.json, m2 = f2.error, y2 = f2.error_description, w2 = e(f2, ["error", "error_description"]), g2 = d2, v2 = g2.headers, b2 = g2.ok;
  let k2;
  if (u2 && (k2 = v2[ke], k2 && await u2.setNonce(k2)), !b2) {
    const e3 = y2 || "HTTP error. Unable to fetch ".concat(t2);
    if ("mfa_required" === m2) throw new R(m2, e3, w2.mfa_token, w2.mfa_requirements);
    if ("missing_refresh_token" === m2) throw new x(o2, r2);
    if ("use_dpop_nonce" === m2) {
      if (!u2 || !k2 || l2) throw new O(k2);
      return Re(t2, n2, o2, r2, i2, a2, s2, c2, u2, true, h2);
    }
    throw new _(m2 || "request_error", e3);
  }
  return w2;
}
async function xe(t2, n2, o2) {
  var r2 = t2.baseUrl, i2 = t2.timeout, a2 = t2.audience, s2 = t2.scope, c2 = t2.auth0Client, u2 = t2.useFormData, l2 = t2.useMrrt, h2 = t2.dpop, d2 = e(t2, ["baseUrl", "timeout", "audience", "scope", "auth0Client", "useFormData", "useMrrt", "dpop"]);
  const p2 = "urn:ietf:params:oauth:grant-type:token-exchange" === d2.grant_type, f2 = "refresh_token" === d2.grant_type && l2, m2 = Object.assign(Object.assign(Object.assign(Object.assign({}, d2), p2 && a2 && { audience: a2 }), p2 && s2 && { scope: s2 }), f2 && { audience: a2, scope: s2 }), y2 = u2 ? N(m2) : JSON.stringify(m2), w2 = (g2 = d2.grant_type, _e.includes(g2));
  var g2;
  return await Re("".concat(r2, "/oauth/token"), i2, a2 || k, s2, { method: "POST", body: y2, headers: { "Content-Type": u2 ? "application/x-www-form-urlencoded" : "application/json", "Auth0-Client": btoa(JSON.stringify(D(c2 || v))) } }, n2, u2, l2, w2 ? h2 : void 0, void 0, o2);
}
var Ce = function() {
  for (var e3 = arguments.length, t2 = new Array(e3), n2 = 0; n2 < e3; n2++) t2[n2] = arguments[n2];
  return (o2 = t2.filter(Boolean).join(" ").trim().split(/\s+/), Array.from(new Set(o2))).join(" ");
  var o2;
};
var Oe = (e3, t2, n2) => {
  let o2;
  return n2 && (o2 = e3[n2]), o2 || (o2 = e3[k]), Ce(o2, t2);
};
var je = "@@auth0spajs@@";
var We = "@@user@@";
var Ke = class _Ke {
  constructor(e3) {
    let t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : je, n2 = arguments.length > 2 ? arguments[2] : void 0;
    this.prefix = t2, this.suffix = n2, this.clientId = e3.clientId, this.scope = e3.scope, this.audience = e3.audience;
  }
  toKey() {
    return [this.prefix, this.clientId, this.audience, this.scope, this.suffix].filter(Boolean).join("::");
  }
  static fromKey(e3) {
    const t2 = p(e3.split("::"), 4), n2 = t2[0], o2 = t2[1], r2 = t2[2], i2 = t2[3];
    return new _Ke({ clientId: o2, scope: i2, audience: r2 }, n2);
  }
  static fromCacheEntry(e3) {
    const t2 = e3.scope, n2 = e3.audience, o2 = e3.client_id;
    return new _Ke({ scope: t2, audience: n2, clientId: o2 });
  }
};
var Le = class {
  set(e3, t2) {
    localStorage.setItem(e3, JSON.stringify(t2));
  }
  get(e3) {
    const t2 = window.localStorage.getItem(e3);
    if (t2) try {
      return JSON.parse(t2);
    } catch (e4) {
      return;
    }
  }
  remove(e3) {
    localStorage.removeItem(e3);
  }
  allKeys() {
    return Object.keys(window.localStorage).filter((e3) => e3.startsWith(je));
  }
};
var Ue = class {
  constructor() {
    this.enclosedCache = /* @__PURE__ */ (function() {
      let e3 = {};
      return { set(t2, n2) {
        e3[t2] = n2;
      }, get(t2) {
        const n2 = e3[t2];
        if (n2) return n2;
      }, remove(t2) {
        delete e3[t2];
      }, allKeys: () => Object.keys(e3) };
    })();
  }
};
var De = class {
  constructor(e3, t2, n2) {
    this.cache = e3, this.keyManifest = t2, this.nowProvider = n2 || b;
  }
  async setIdToken(e3, t2, n2) {
    var o2;
    const r2 = this.getIdTokenCacheKey(e3);
    await this.cache.set(r2, { id_token: t2, decodedToken: n2 }), await (null === (o2 = this.keyManifest) || void 0 === o2 ? void 0 : o2.add(r2));
  }
  async getIdToken(e3) {
    const t2 = await this.cache.get(this.getIdTokenCacheKey(e3.clientId));
    if (!t2 && e3.scope && e3.audience) {
      const t3 = await this.get(e3);
      if (!t3) return;
      if (!t3.id_token || !t3.decodedToken) return;
      return { id_token: t3.id_token, decodedToken: t3.decodedToken };
    }
    if (t2) return { id_token: t2.id_token, decodedToken: t2.decodedToken };
  }
  async get(e3) {
    let t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], o2 = arguments.length > 3 ? arguments[3] : void 0;
    var r2;
    let i2 = await this.cache.get(e3.toKey()), a2 = e3;
    if (!i2) {
      const t3 = await this.getCacheKeys();
      if (!t3) return;
      const r3 = this.matchExistingCacheKey(e3, t3);
      if (r3 && (i2 = await this.cache.get(r3), a2 = Ke.fromKey(r3)), !i2 && n2 && "cache-only" !== o2) return this.getEntryWithRefreshToken(e3, t3);
    }
    if (!i2) return;
    const s2 = await this.nowProvider(), c2 = Math.floor(s2 / 1e3);
    return i2.expiresAt - t2 < c2 ? i2.body.refresh_token ? this.modifiedCachedEntry(i2, a2) : (await this.cache.remove(a2.toKey()), void await (null === (r2 = this.keyManifest) || void 0 === r2 ? void 0 : r2.remove(a2.toKey()))) : i2.body;
  }
  async modifiedCachedEntry(e3, t2) {
    const n2 = { refresh_token: e3.body.refresh_token, audience: e3.body.audience, scope: e3.body.scope }, o2 = { body: n2, expiresAt: e3.expiresAt };
    return await this.cache.set(t2.toKey(), o2), { refresh_token: n2.refresh_token, audience: n2.audience, scope: n2.scope };
  }
  async set(e3) {
    var t2;
    const n2 = new Ke({ clientId: e3.client_id, scope: e3.scope, audience: e3.audience }), o2 = await this.wrapCacheEntry(e3);
    await this.cache.set(n2.toKey(), o2), await (null === (t2 = this.keyManifest) || void 0 === t2 ? void 0 : t2.add(n2.toKey()));
  }
  async remove(e3, t2, n2) {
    const o2 = new Ke({ clientId: e3, scope: n2, audience: t2 });
    await this.cache.remove(o2.toKey());
  }
  async stripRefreshToken(e3) {
    var t2;
    const n2 = await this.getCacheKeys();
    if (n2) for (const o2 of n2) {
      const n3 = await this.cache.get(o2);
      (null === (t2 = null == n3 ? void 0 : n3.body) || void 0 === t2 ? void 0 : t2.refresh_token) === e3 && (delete n3.body.refresh_token, await this.cache.set(o2, n3));
    }
  }
  async clear(e3) {
    var t2;
    const n2 = await this.getCacheKeys();
    n2 && (await n2.filter((t3) => !e3 || t3.includes(e3)).reduce(async (e4, t3) => {
      await e4, await this.cache.remove(t3);
    }, Promise.resolve()), await (null === (t2 = this.keyManifest) || void 0 === t2 ? void 0 : t2.clear()));
  }
  async wrapCacheEntry(e3) {
    const t2 = await this.nowProvider();
    return { body: e3, expiresAt: Math.floor(t2 / 1e3) + e3.expires_in };
  }
  async getCacheKeys() {
    var e3;
    return this.keyManifest ? null === (e3 = await this.keyManifest.get()) || void 0 === e3 ? void 0 : e3.keys : this.cache.allKeys ? this.cache.allKeys() : void 0;
  }
  getIdTokenCacheKey(e3) {
    return new Ke({ clientId: e3 }, je, We).toKey();
  }
  matchExistingCacheKey(e3, t2) {
    return t2.filter((t3) => {
      var n2;
      const o2 = Ke.fromKey(t3), r2 = new Set(o2.scope && o2.scope.split(" ")), i2 = (null === (n2 = e3.scope) || void 0 === n2 ? void 0 : n2.split(" ")) || [], a2 = o2.scope && i2.reduce((e4, t4) => e4 && r2.has(t4), true);
      return o2.prefix === je && o2.clientId === e3.clientId && o2.audience === e3.audience && a2;
    })[0];
  }
  async getEntryWithRefreshToken(e3, t2) {
    var n2;
    for (const o2 of t2) {
      const t3 = Ke.fromKey(o2);
      if (t3.prefix === je && t3.clientId === e3.clientId) {
        const e4 = await this.cache.get(o2);
        if (null === (n2 = null == e4 ? void 0 : e4.body) || void 0 === n2 ? void 0 : n2.refresh_token) return { refresh_token: e4.body.refresh_token, audience: e4.body.audience, scope: e4.body.scope };
      }
    }
  }
  async getRefreshTokensByAudience(e3, t2) {
    var n2;
    const o2 = await this.getCacheKeys();
    if (!o2) return [];
    const r2 = /* @__PURE__ */ new Set();
    for (const i2 of o2) {
      const o3 = Ke.fromKey(i2);
      if (o3.prefix === je && o3.clientId === t2 && o3.audience === e3) {
        const e4 = await this.cache.get(i2);
        (null === (n2 = null == e4 ? void 0 : e4.body) || void 0 === n2 ? void 0 : n2.refresh_token) && r2.add(e4.body.refresh_token);
      }
    }
    return Array.from(r2);
  }
  async updateEntry(e3, t2) {
    var n2;
    const o2 = await this.getCacheKeys();
    if (o2) for (const r2 of o2) {
      const o3 = await this.cache.get(r2);
      (null === (n2 = null == o3 ? void 0 : o3.body) || void 0 === n2 ? void 0 : n2.refresh_token) === e3 && (o3.body.refresh_token = t2, await this.cache.set(r2, o3));
    }
  }
};
var Ne = class {
  constructor(e3, t2, n2) {
    this.storage = e3, this.clientId = t2, this.cookieDomain = n2, this.storageKey = "".concat("a0.spajs.txs", ".").concat(this.clientId);
  }
  create(e3) {
    this.storage.save(this.storageKey, e3, { daysUntilExpire: 1, cookieDomain: this.cookieDomain });
  }
  get() {
    return this.storage.get(this.storageKey);
  }
  remove() {
    this.storage.remove(this.storageKey, { cookieDomain: this.cookieDomain });
  }
};
var He = (e3) => "number" == typeof e3;
var Ze = ["iss", "aud", "exp", "nbf", "iat", "jti", "azp", "nonce", "auth_time", "at_hash", "c_hash", "acr", "amr", "sub_jwk", "cnf", "sip_from_tag", "sip_date", "sip_callid", "sip_cseq_num", "sip_via_branch", "orig", "dest", "mky", "events", "toe", "txn", "rph", "sid", "vot", "vtm"];
var Je = (e3) => {
  if (!e3.id_token) throw new Error("ID token is required but missing");
  const t2 = ((e4) => {
    const t3 = e4.split("."), n3 = p(t3, 3), o3 = n3[0], r3 = n3[1], i2 = n3[2];
    if (3 !== t3.length || !o3 || !r3 || !i2) throw new Error("ID token could not be decoded");
    const a2 = JSON.parse(Z(r3)), s2 = { __raw: e4 }, c2 = {};
    return Object.keys(a2).forEach((e5) => {
      s2[e5] = a2[e5], Ze.includes(e5) || (c2[e5] = a2[e5]);
    }), { encoded: { header: o3, payload: r3, signature: i2 }, header: JSON.parse(Z(o3)), claims: s2, user: c2 };
  })(e3.id_token);
  if (!t2.claims.iss) throw new Error("Issuer (iss) claim must be a string present in the ID token");
  if (t2.claims.iss !== e3.iss) throw new Error('Issuer (iss) claim mismatch in the ID token; expected "'.concat(e3.iss, '", found "').concat(t2.claims.iss, '"'));
  if (!t2.user.sub) throw new Error("Subject (sub) claim must be a string present in the ID token");
  if ("RS256" !== t2.header.alg) throw new Error('Signature algorithm of "'.concat(t2.header.alg, '" is not supported. Expected the ID token to be signed with "RS256".'));
  if (!t2.claims.aud || "string" != typeof t2.claims.aud && !Array.isArray(t2.claims.aud)) throw new Error("Audience (aud) claim must be a string or array of strings present in the ID token");
  if (Array.isArray(t2.claims.aud)) {
    if (!t2.claims.aud.includes(e3.aud)) throw new Error('Audience (aud) claim mismatch in the ID token; expected "'.concat(e3.aud, '" but was not one of "').concat(t2.claims.aud.join(", "), '"'));
    if (t2.claims.aud.length > 1) {
      if (!t2.claims.azp) throw new Error("Authorized Party (azp) claim must be a string present in the ID token when Audience (aud) claim has multiple values");
      if (t2.claims.azp !== e3.aud) throw new Error('Authorized Party (azp) claim mismatch in the ID token; expected "'.concat(e3.aud, '", found "').concat(t2.claims.azp, '"'));
    }
  } else if (t2.claims.aud !== e3.aud) throw new Error('Audience (aud) claim mismatch in the ID token; expected "'.concat(e3.aud, '" but found "').concat(t2.claims.aud, '"'));
  if (e3.nonce) {
    if (!t2.claims.nonce) throw new Error("Nonce (nonce) claim must be a string present in the ID token");
    if (t2.claims.nonce !== e3.nonce) throw new Error('Nonce (nonce) claim mismatch in the ID token; expected "'.concat(e3.nonce, '", found "').concat(t2.claims.nonce, '"'));
  }
  if (e3.max_age && !He(t2.claims.auth_time)) throw new Error("Authentication Time (auth_time) claim must be a number present in the ID token when Max Age (max_age) is specified");
  if (null == t2.claims.exp || !He(t2.claims.exp)) throw new Error("Expiration Time (exp) claim must be a number present in the ID token");
  if (!He(t2.claims.iat)) throw new Error("Issued At (iat) claim must be a number present in the ID token");
  const n2 = e3.leeway || 60, o2 = new Date(e3.now || Date.now()), r2 = /* @__PURE__ */ new Date(0);
  if (r2.setUTCSeconds(t2.claims.exp + n2), o2 > r2) throw new Error("Expiration Time (exp) claim error in the ID token; current time (".concat(o2, ") is after expiration time (").concat(r2, ")"));
  if (null != t2.claims.nbf && He(t2.claims.nbf)) {
    const e4 = /* @__PURE__ */ new Date(0);
    if (e4.setUTCSeconds(t2.claims.nbf - n2), o2 < e4) throw new Error("Not Before time (nbf) claim in the ID token indicates that this token can't be used just yet. Current time (".concat(o2, ") is before ").concat(e4));
  }
  if (null != t2.claims.auth_time && He(t2.claims.auth_time)) {
    const r3 = /* @__PURE__ */ new Date(0);
    if (r3.setUTCSeconds(parseInt(t2.claims.auth_time) + e3.max_age + n2), o2 > r3) throw new Error("Authentication Time (auth_time) claim in the ID token indicates that too much time has passed since the last end-user authentication. Current time (".concat(o2, ") is after last auth at ").concat(r3));
  }
  if (e3.organization) {
    const n3 = e3.organization.trim();
    if (n3.startsWith("org_")) {
      const e4 = n3;
      if (!t2.claims.org_id) throw new Error("Organization ID (org_id) claim must be a string present in the ID token");
      if (e4 !== t2.claims.org_id) throw new Error('Organization ID (org_id) claim mismatch in the ID token; expected "'.concat(e4, '", found "').concat(t2.claims.org_id, '"'));
    } else {
      const e4 = n3.toLowerCase();
      if (!t2.claims.org_name) throw new Error("Organization Name (org_name) claim must be a string present in the ID token");
      if (e4 !== t2.claims.org_name) throw new Error('Organization Name (org_name) claim mismatch in the ID token; expected "'.concat(e4, '", found "').concat(t2.claims.org_name, '"'));
    }
  }
  return t2;
};
var ze = z && z.__assign || function() {
  return ze = Object.assign || function(e3) {
    for (var t2, n2 = 1, o2 = arguments.length; n2 < o2; n2++) for (var r2 in t2 = arguments[n2]) Object.prototype.hasOwnProperty.call(t2, r2) && (e3[r2] = t2[r2]);
    return e3;
  }, ze.apply(this, arguments);
};
function Me(e3, t2) {
  if (!t2) return "";
  var n2 = "; " + e3;
  return true === t2 ? n2 : n2 + "=" + t2;
}
function Xe(e3, t2, n2) {
  return encodeURIComponent(e3).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/\(/g, "%28").replace(/\)/g, "%29") + "=" + encodeURIComponent(t2).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent) + (function(e4) {
    if ("number" == typeof e4.expires) {
      var t3 = /* @__PURE__ */ new Date();
      t3.setMilliseconds(t3.getMilliseconds() + 864e5 * e4.expires), e4.expires = t3;
    }
    return Me("Expires", e4.expires ? e4.expires.toUTCString() : "") + Me("Domain", e4.domain) + Me("Path", e4.path) + Me("Secure", e4.secure) + Me("SameSite", e4.sameSite);
  })(n2);
}
function Ve() {
  return (function(e3) {
    for (var t2 = {}, n2 = e3 ? e3.split("; ") : [], o2 = /(%[\dA-F]{2})+/gi, r2 = 0; r2 < n2.length; r2++) {
      var i2 = n2[r2].split("="), a2 = i2.slice(1).join("=");
      '"' === a2.charAt(0) && (a2 = a2.slice(1, -1));
      try {
        t2[i2[0].replace(o2, decodeURIComponent)] = a2.replace(o2, decodeURIComponent);
      } catch (e4) {
      }
    }
    return t2;
  })(document.cookie);
}
var Fe = function(e3) {
  return Ve()[e3];
};
function Ge(e3, t2, n2) {
  document.cookie = Xe(e3, t2, ze({ path: "/" }, n2));
}
var Ye = Ge;
var Be = function(e3, t2) {
  Ge(e3, "", ze(ze({}, t2), { expires: -1 }));
};
var qe = { get(e3) {
  const t2 = Fe(e3);
  if (void 0 !== t2) return JSON.parse(t2);
}, save(e3, t2, n2) {
  let o2 = {};
  "https:" === window.location.protocol && (o2 = { secure: true, sameSite: "none" }), (null == n2 ? void 0 : n2.daysUntilExpire) && (o2.expires = n2.daysUntilExpire), (null == n2 ? void 0 : n2.cookieDomain) && (o2.domain = n2.cookieDomain), Ye(e3, JSON.stringify(t2), o2);
}, remove(e3, t2) {
  let n2 = {};
  (null == t2 ? void 0 : t2.cookieDomain) && (n2.domain = t2.cookieDomain), Be(e3, n2);
} };
var Qe = "_legacy_";
var $e = { get(e3) {
  const t2 = qe.get(e3);
  return t2 || qe.get("".concat(Qe).concat(e3));
}, save(e3, t2, n2) {
  let o2 = {};
  "https:" === window.location.protocol && (o2 = { secure: true }), (null == n2 ? void 0 : n2.daysUntilExpire) && (o2.expires = n2.daysUntilExpire), (null == n2 ? void 0 : n2.cookieDomain) && (o2.domain = n2.cookieDomain), Ye("".concat(Qe).concat(e3), JSON.stringify(t2), o2), qe.save(e3, t2, n2);
}, remove(e3, t2) {
  let n2 = {};
  (null == t2 ? void 0 : t2.cookieDomain) && (n2.domain = t2.cookieDomain), Be(e3, n2), qe.remove(e3, t2), qe.remove("".concat(Qe).concat(e3), t2);
} };
var et = { get(e3) {
  if ("undefined" == typeof sessionStorage) return;
  const t2 = sessionStorage.getItem(e3);
  return null != t2 ? JSON.parse(t2) : void 0;
}, save(e3, t2) {
  sessionStorage.setItem(e3, JSON.stringify(t2));
}, remove(e3) {
  sessionStorage.removeItem(e3);
} };
var tt;
!(function(e3) {
  e3.Code = "code", e3.ConnectCode = "connect_code";
})(tt || (tt = {}));
function ot(e3, t2, n2) {
  var o2 = void 0 === t2 ? null : t2, r2 = (function(e4, t3) {
    var n3 = atob(e4);
    if (t3) {
      for (var o3 = new Uint8Array(n3.length), r3 = 0, i3 = n3.length; r3 < i3; ++r3) o3[r3] = n3.charCodeAt(r3);
      return String.fromCharCode.apply(null, new Uint16Array(o3.buffer));
    }
    return n3;
  })(e3, void 0 !== n2 && n2), i2 = r2.indexOf("\n", 10) + 1, a2 = r2.substring(i2) + (o2 ? "//# sourceMappingURL=" + o2 : ""), s2 = new Blob([a2], { type: "application/javascript" });
  return URL.createObjectURL(s2);
}
var rt;
var it;
var at;
var st;
var ct = (rt = "Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwohZnVuY3Rpb24oKXsidXNlIHN0cmljdCI7ZnVuY3Rpb24gZShlLHQpeyhudWxsPT10fHx0PmUubGVuZ3RoKSYmKHQ9ZS5sZW5ndGgpO2Zvcih2YXIgcj0wLG89QXJyYXkodCk7cjx0O3IrKylvW3JdPWVbcl07cmV0dXJuIG99ZnVuY3Rpb24gdCh0LHIpe3JldHVybiBmdW5jdGlvbihlKXtpZihBcnJheS5pc0FycmF5KGUpKXJldHVybiBlfSh0KXx8ZnVuY3Rpb24oZSx0KXt2YXIgcj1udWxsPT1lP251bGw6InVuZGVmaW5lZCIhPXR5cGVvZiBTeW1ib2wmJmVbU3ltYm9sLml0ZXJhdG9yXXx8ZVsiQEBpdGVyYXRvciJdO2lmKG51bGwhPXIpe3ZhciBvLG4scyxpLGE9W10sYz0hMCxsPSExO3RyeXtpZihzPShyPXIuY2FsbChlKSkubmV4dCwwPT09dCl7aWYoT2JqZWN0KHIpIT09cilyZXR1cm47Yz0hMX1lbHNlIGZvcig7IShjPShvPXMuY2FsbChyKSkuZG9uZSkmJihhLnB1c2goby52YWx1ZSksYS5sZW5ndGghPT10KTtjPSEwKTt9Y2F0Y2goZSl7bD0hMCxuPWV9ZmluYWxseXt0cnl7aWYoIWMmJm51bGwhPXIucmV0dXJuJiYoaT1yLnJldHVybigpLE9iamVjdChpKSE9PWkpKXJldHVybn1maW5hbGx5e2lmKGwpdGhyb3cgbn19cmV0dXJuIGF9fSh0LHIpfHxmdW5jdGlvbih0LHIpe2lmKHQpe2lmKCJzdHJpbmciPT10eXBlb2YgdClyZXR1cm4gZSh0LHIpO3ZhciBvPXt9LnRvU3RyaW5nLmNhbGwodCkuc2xpY2UoOCwtMSk7cmV0dXJuIk9iamVjdCI9PT1vJiZ0LmNvbnN0cnVjdG9yJiYobz10LmNvbnN0cnVjdG9yLm5hbWUpLCJNYXAiPT09b3x8IlNldCI9PT1vP0FycmF5LmZyb20odCk6IkFyZ3VtZW50cyI9PT1vfHwvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChvKT9lKHQscik6dm9pZCAwfX0odCxyKXx8ZnVuY3Rpb24oKXt0aHJvdyBuZXcgVHlwZUVycm9yKCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLiIpfSgpfWNsYXNzIHIgZXh0ZW5kcyBFcnJvcntjb25zdHJ1Y3RvcihlLHQpe3N1cGVyKHQpLHRoaXMuZXJyb3I9ZSx0aGlzLmVycm9yX2Rlc2NyaXB0aW9uPXQsT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsci5wcm90b3R5cGUpfXN0YXRpYyBmcm9tUGF5bG9hZChlKXtsZXQgdD1lLmVycm9yLG89ZS5lcnJvcl9kZXNjcmlwdGlvbjtyZXR1cm4gbmV3IHIodCxvKX19Y2xhc3MgbyBleHRlbmRzIHJ7Y29uc3RydWN0b3IoZSx0KXtzdXBlcigibWlzc2luZ19yZWZyZXNoX3Rva2VuIiwiTWlzc2luZyBSZWZyZXNoIFRva2VuIChhdWRpZW5jZTogJyIuY29uY2F0KG4oZSxbImRlZmF1bHQiXSksIicsIHNjb3BlOiAnIikuY29uY2F0KG4odCksIicpIikpLHRoaXMuYXVkaWVuY2U9ZSx0aGlzLnNjb3BlPXQsT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsby5wcm90b3R5cGUpfX1mdW5jdGlvbiBuKGUpe3JldHVybiBlJiYhKGFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTpbXSkuaW5jbHVkZXMoZSk/ZToiIn0iZnVuY3Rpb24iPT10eXBlb2YgU3VwcHJlc3NlZEVycm9yJiZTdXBwcmVzc2VkRXJyb3I7Y29uc3Qgcz1lPT57dmFyIHQ9ZS5jbGllbnRJZCxyPWZ1bmN0aW9uKGUsdCl7dmFyIHI9e307Zm9yKHZhciBvIGluIGUpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsbykmJnQuaW5kZXhPZihvKTwwJiYocltvXT1lW29dKTtpZihudWxsIT1lJiYiZnVuY3Rpb24iPT10eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyl7dmFyIG49MDtmb3Iobz1PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGUpO248by5sZW5ndGg7bisrKXQuaW5kZXhPZihvW25dKTwwJiZPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoZSxvW25dKSYmKHJbb1tuXV09ZVtvW25dXSl9cmV0dXJuIHJ9KGUsWyJjbGllbnRJZCJdKTtyZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcygoZT0+T2JqZWN0LmtleXMoZSkuZmlsdGVyKHQ9PnZvaWQgMCE9PWVbdF0pLnJlZHVjZSgodCxyKT0+T2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LHQpLHtbcl06ZVtyXX0pLHt9KSkoT2JqZWN0LmFzc2lnbih7Y2xpZW50X2lkOnR9LHIpKSkudG9TdHJpbmcoKX07bGV0IGk9e30sYT1udWxsO2NvbnN0IGM9KGUsdCk9PiIiLmNvbmNhdChlLCJ8IikuY29uY2F0KHQpLGw9KGUsdCk9PnQuc3RhcnRzV2l0aCgiIi5jb25jYXQoZSwifCIpKSx1PWU9PntPYmplY3QuZW50cmllcyhpKS5mb3JFYWNoKHI9PntsZXQgbz10KHIsMiksbj1vWzBdO29bMV09PT1lJiZkZWxldGUgaVtuXX0pfSxmPWU9Pntjb25zdCB0PW5ldyBVUkxTZWFyY2hQYXJhbXMoZSkscj17fTtyZXR1cm4gdC5mb3JFYWNoKChlLHQpPT57clt0XT1lfSkscn0sZD1hc3luYyBlPT57bGV0IHIsbixhPWUuZGF0YSx1PWEudGltZW91dCxkPWEuYXV0aCxoPWEuZmV0Y2hVcmwscD1hLmZldGNoT3B0aW9ucyx5PWEudXNlRm9ybURhdGEsZz1hLnVzZU1ycnQsYj1hLnNraXBUb2tlblN0b3JhZ2UsTz10KGUucG9ydHMsMSlbMF0saz17fTtjb25zdCBtPWR8fHt9LGo9bS5hdWRpZW5jZSx2PW0uc2NvcGU7dHJ5e2NvbnN0IGU9eT9mKHAuYm9keSk6SlNPTi5wYXJzZShwLmJvZHkpO2lmKCFlLnJlZnJlc2hfdG9rZW4mJiJyZWZyZXNoX3Rva2VuIj09PWUuZ3JhbnRfdHlwZSl7aWYobj0oKGUsdCk9PmlbYyhlLHQpXSkoaix2KSwhbiYmZyl7Y29uc3QgZT1pLmxhdGVzdF9yZWZyZXNoX3Rva2VuLHQ9KChlLHQpPT4hIU9iamVjdC5rZXlzKGkpLmZpbmQocj0+e2lmKCJsYXRlc3RfcmVmcmVzaF90b2tlbiIhPT1yKXtjb25zdCBvPWwodCxyKSxuPXIuc3BsaXQoInwiKVsxXS5zcGxpdCgiICIpLHM9ZS5zcGxpdCgiICIpLmV2ZXJ5KGU9Pm4uaW5jbHVkZXMoZSkpO3JldHVybiBvJiZzfX0pKSh2LGopO2UmJiF0JiYobj1lKX1pZighbil0aHJvdyBuZXcgbyhqLHYpO3AuYm9keT15P3MoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LGUpLHtyZWZyZXNoX3Rva2VuOm59KSk6SlNPTi5zdHJpbmdpZnkoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LGUpLHtyZWZyZXNoX3Rva2VuOm59KSl9bGV0IGEsZDsiZnVuY3Rpb24iPT10eXBlb2YgQWJvcnRDb250cm9sbGVyJiYoYT1uZXcgQWJvcnRDb250cm9sbGVyLHAuc2lnbmFsPWEuc2lnbmFsKTt0cnl7ZD1hd2FpdCBQcm9taXNlLnJhY2UoWyhNPXUsbmV3IFByb21pc2UoZT0+c2V0VGltZW91dChlLE0pKSksZmV0Y2goaCxPYmplY3QuYXNzaWduKHt9LHApKV0pfWNhdGNoKGUpe3JldHVybiB2b2lkIE8ucG9zdE1lc3NhZ2Uoe2Vycm9yOmUubWVzc2FnZX0pfWlmKCFkKXJldHVybiBhJiZhLmFib3J0KCksdm9pZCBPLnBvc3RNZXNzYWdlKHtlcnJvcjoiVGltZW91dCB3aGVuIGV4ZWN1dGluZyAnZmV0Y2gnIn0pO2lmKFM9ZC5oZWFkZXJzLGs9Wy4uLlNdLnJlZHVjZSgoZSxyKT0+e2xldCBvPXQociwyKSxuPW9bMF0scz1vWzFdO3JldHVybiBlW25dPXMsZX0se30pLHI9YXdhaXQgZC5qc29uKCksYilyZXR1cm4gZGVsZXRlIHIucmVmcmVzaF90b2tlbix2b2lkIE8ucG9zdE1lc3NhZ2Uoe29rOmQub2ssanNvbjpyLGhlYWRlcnM6a30pO3IucmVmcmVzaF90b2tlbj8oZyYmKGkubGF0ZXN0X3JlZnJlc2hfdG9rZW49ci5yZWZyZXNoX3Rva2VuLF89bix3PXIucmVmcmVzaF90b2tlbixPYmplY3QuZW50cmllcyhpKS5mb3JFYWNoKGU9PntsZXQgcj10KGUsMiksbz1yWzBdO3JbMV09PT1fJiYoaVtvXT13KX0pKSwoKGUsdCxyKT0+e2lbYyh0LHIpXT1lfSkoci5yZWZyZXNoX3Rva2VuLGosdiksZGVsZXRlIHIucmVmcmVzaF90b2tlbik6KChlLHQpPT57ZGVsZXRlIGlbYyhlLHQpXX0pKGosdiksTy5wb3N0TWVzc2FnZSh7b2s6ZC5vayxqc29uOnIsaGVhZGVyczprfSl9Y2F0Y2goZSl7Ty5wb3N0TWVzc2FnZSh7b2s6ITEsanNvbjp7ZXJyb3I6ZS5lcnJvcixlcnJvcl9kZXNjcmlwdGlvbjplLm1lc3NhZ2V9LGhlYWRlcnM6a30pfXZhciBfLHcsUyxNfSxoPWFzeW5jIGU9PntsZXQgcj1lLmRhdGEsbz1yLnRpbWVvdXQsbj1yLmF1dGgsYT1yLmZldGNoVXJsLGM9ci5mZXRjaE9wdGlvbnMsZD1yLnVzZUZvcm1EYXRhLGg9dChlLnBvcnRzLDEpWzBdO2NvbnN0IHA9KG58fHt9KS5hdWRpZW5jZTt0cnl7Y29uc3QgZT0oZT0+e2NvbnN0IHI9bmV3IFNldDtyZXR1cm4gT2JqZWN0LmVudHJpZXMoaSkuZm9yRWFjaChvPT57bGV0IG49dChvLDIpLHM9blswXSxpPW5bMV07bChlLHMpJiZyLmFkZChpKX0pLEFycmF5LmZyb20ocil9KShwKTtpZigwPT09ZS5sZW5ndGgpcmV0dXJuIHZvaWQgaC5wb3N0TWVzc2FnZSh7b2s6ITB9KTtjb25zdCByPWQ/ZihjLmJvZHkpOkpTT04ucGFyc2UoYy5ib2R5KTtmb3IoY29uc3QgdCBvZiBlKXtjb25zdCBlPWQ/cyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30scikse3Rva2VuOnR9KSk6SlNPTi5zdHJpbmdpZnkoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LHIpLHt0b2tlbjp0fSkpO2xldCBuLGksbCxmOyJmdW5jdGlvbiI9PXR5cGVvZiBBYm9ydENvbnRyb2xsZXImJihuPW5ldyBBYm9ydENvbnRyb2xsZXIsaT1uLnNpZ25hbCk7dHJ5e2Y9YXdhaXQgUHJvbWlzZS5yYWNlKFtuZXcgUHJvbWlzZShlPT57bD1zZXRUaW1lb3V0KGUsbyl9KSxmZXRjaChhLE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSxjKSx7Ym9keTplLHNpZ25hbDppfSkpXSkuZmluYWxseSgoKT0+Y2xlYXJUaW1lb3V0KGwpKX1jYXRjaChlKXtyZXR1cm4gdm9pZCBoLnBvc3RNZXNzYWdlKHtlcnJvcjplLm1lc3NhZ2V9KX1pZighZilyZXR1cm4gbiYmbi5hYm9ydCgpLHZvaWQgaC5wb3N0TWVzc2FnZSh7ZXJyb3I6IlRpbWVvdXQgd2hlbiBleGVjdXRpbmcgJ2ZldGNoJyJ9KTtpZighZi5vayl7bGV0IGU7dHJ5e2NvbnN0IHQ9SlNPTi5wYXJzZShhd2FpdCBmLnRleHQoKSk7ZT10LmVycm9yX2Rlc2NyaXB0aW9ufWNhdGNoKGUpe31yZXR1cm4gdm9pZCBoLnBvc3RNZXNzYWdlKHtlcnJvcjplfHwiSFRUUCBlcnJvciAiLmNvbmNhdChmLnN0YXR1cyl9KX11KHQpfWgucG9zdE1lc3NhZ2Uoe29rOiEwfSl9Y2F0Y2goZSl7aC5wb3N0TWVzc2FnZSh7ZXJyb3I6ZS5tZXNzYWdlfHwiVW5rbm93biBlcnJvciBkdXJpbmcgdG9rZW4gcmV2b2NhdGlvbiJ9KX19LHA9KGUsdCk9PntpZighYSlyZXR1cm4hMTt0cnl7Y29uc3Qgcj1uZXcgVVJMKGEpLm9yaWdpbixvPW5ldyBVUkwoZS5mZXRjaFVybCk7cmV0dXJuIG8ub3JpZ2luPT09ciYmby5wYXRobmFtZT09PXR9Y2F0Y2goZSl7cmV0dXJuITF9fTthZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIixlPT57Y29uc3Qgcj1lLmRhdGEsbz10KGUucG9ydHMsMSlbMF07aWYoISgidHlwZSJpbiByKXx8ImluaXQiIT09ci50eXBlKXJldHVybiJ0eXBlImluIHImJiJjbGVhciI9PT1yLnR5cGU/KGk9e30sdm9pZChudWxsPT1vfHxvLnBvc3RNZXNzYWdlKHtvazohMH0pKSk6InR5cGUiaW4gciYmInJldm9rZSI9PT1yLnR5cGU/cChyLCIvb2F1dGgvcmV2b2tlIik/dm9pZCBoKGUpOnZvaWQobnVsbD09b3x8by5wb3N0TWVzc2FnZSh7b2s6ITEsanNvbjp7ZXJyb3I6ImludmFsaWRfZmV0Y2hfdXJsIixlcnJvcl9kZXNjcmlwdGlvbjoiVW5hdXRob3JpemVkIGZldGNoIFVSTCJ9LGhlYWRlcnM6e319KSk6dm9pZCgiZmV0Y2hVcmwiaW4gciYmcChyLCIvb2F1dGgvdG9rZW4iKT9kKGUpOm51bGw9PW98fG8ucG9zdE1lc3NhZ2Uoe29rOiExLGpzb246e2Vycm9yOiJpbnZhbGlkX2ZldGNoX3VybCIsZXJyb3JfZGVzY3JpcHRpb246IlVuYXV0aG9yaXplZCBmZXRjaCBVUkwifSxoZWFkZXJzOnt9fSkpO2lmKG51bGw9PT1hKXRyeXtuZXcgVVJMKHIuYWxsb3dlZEJhc2VVcmwpLGE9ci5hbGxvd2VkQmFzZVVybH1jYXRjaChlKXtyZXR1cm59fSl9KCk7Cgo=", it = null, at = false, function(e3) {
  return st = st || ot(rt, it, at), new Worker(st, e3);
});
var ut = {};
var lt = class {
  constructor(e3, t2) {
    this.cache = e3, this.clientId = t2, this.manifestKey = this.createManifestKeyFrom(this.clientId);
  }
  async add(e3) {
    var t2;
    const n2 = new Set((null === (t2 = await this.cache.get(this.manifestKey)) || void 0 === t2 ? void 0 : t2.keys) || []);
    n2.add(e3), await this.cache.set(this.manifestKey, { keys: [...n2] });
  }
  async remove(e3) {
    const t2 = await this.cache.get(this.manifestKey);
    if (t2) {
      const n2 = new Set(t2.keys);
      return n2.delete(e3), n2.size > 0 ? await this.cache.set(this.manifestKey, { keys: [...n2] }) : await this.cache.remove(this.manifestKey);
    }
  }
  get() {
    return this.cache.get(this.manifestKey);
  }
  clear() {
    return this.cache.remove(this.manifestKey);
  }
  createManifestKeyFrom(e3) {
    return "".concat(je, "::").concat(e3);
  }
};
var ht = "auth0.is.authenticated";
var dt = { memory: () => new Ue().enclosedCache, localstorage: () => new Le() };
var pt = (e3) => dt[e3];
var ft = (t2) => {
  const n2 = t2.openUrl, o2 = t2.onRedirect, r2 = e(t2, ["openUrl", "onRedirect"]);
  return Object.assign(Object.assign({}, r2), { openUrl: false === n2 || n2 ? n2 : o2 });
};
var mt = (e3, t2) => {
  const n2 = (null == t2 ? void 0 : t2.split(" ")) || [];
  return ((null == e3 ? void 0 : e3.split(" ")) || []).every((e4) => n2.includes(e4));
};
var yt = { NONCE: "nonce", KEYPAIR: "keypair" };
var wt = class {
  constructor(e3) {
    this.clientId = e3;
  }
  getVersion() {
    return 1;
  }
  createDbHandle() {
    const e3 = window.indexedDB.open("auth0-spa-js", this.getVersion());
    return new Promise((t2, n2) => {
      e3.onupgradeneeded = () => Object.values(yt).forEach((t3) => e3.result.createObjectStore(t3)), e3.onerror = () => n2(e3.error), e3.onsuccess = () => t2(e3.result);
    });
  }
  async getDbHandle() {
    return this.dbHandle || (this.dbHandle = await this.createDbHandle()), this.dbHandle;
  }
  async executeDbRequest(e3, t2, n2) {
    const o2 = n2((await this.getDbHandle()).transaction(e3, t2).objectStore(e3));
    return new Promise((e4, t3) => {
      o2.onsuccess = () => e4(o2.result), o2.onerror = () => t3(o2.error);
    });
  }
  buildKey(e3) {
    const t2 = e3 ? "_".concat(e3) : "auth0";
    return "".concat(this.clientId, "::").concat(t2);
  }
  setNonce(e3, t2) {
    return this.save(yt.NONCE, this.buildKey(t2), e3);
  }
  setKeyPair(e3) {
    return this.save(yt.KEYPAIR, this.buildKey(), e3);
  }
  async save(e3, t2, n2) {
    await this.executeDbRequest(e3, "readwrite", (e4) => e4.put(n2, t2));
  }
  findNonce(e3) {
    return this.find(yt.NONCE, this.buildKey(e3));
  }
  findKeyPair() {
    return this.find(yt.KEYPAIR, this.buildKey());
  }
  find(e3, t2) {
    return this.executeDbRequest(e3, "readonly", (e4) => e4.get(t2));
  }
  async deleteBy(e3, t2) {
    const n2 = await this.executeDbRequest(e3, "readonly", (e4) => e4.getAllKeys());
    await Promise.all((null == n2 ? void 0 : n2.filter(t2).map((t3) => this.executeDbRequest(e3, "readwrite", (e4) => e4.delete(t3)))) || []);
  }
  deleteByClientId(e3, t2) {
    return this.deleteBy(e3, (e4) => "string" == typeof e4 && e4.startsWith("".concat(t2, "::")));
  }
  clearNonces() {
    return this.deleteByClientId(yt.NONCE, this.clientId);
  }
  clearKeyPairs() {
    return this.deleteByClientId(yt.KEYPAIR, this.clientId);
  }
};
var gt = class {
  constructor(e3) {
    this.storage = new wt(e3);
  }
  getNonce(e3) {
    return this.storage.findNonce(e3);
  }
  setNonce(e3, t2) {
    return this.storage.setNonce(e3, t2);
  }
  async getOrGenerateKeyPair() {
    let e3 = await this.storage.findKeyPair();
    return e3 || (e3 = await Se(), await this.storage.setKeyPair(e3)), e3;
  }
  async generateProof(e3) {
    const t2 = await this.getOrGenerateKeyPair();
    return Ee(Object.assign({ keyPair: t2 }, e3));
  }
  async calculateThumbprint() {
    return Te(await this.getOrGenerateKeyPair());
  }
  async clear() {
    await Promise.all([this.storage.clearNonces(), this.storage.clearKeyPairs()]);
  }
};
var vt;
!(function(e3) {
  e3.Bearer = "Bearer", e3.DPoP = "DPoP";
})(vt || (vt = {}));
var bt = class {
  constructor(e3, t2) {
    this.hooks = t2, this.config = Object.assign(Object.assign({}, e3), { fetch: e3.fetch || ("undefined" == typeof window ? fetch : window.fetch.bind(window)) });
  }
  isAbsoluteUrl(e3) {
    return /^(https?:)?\/\//i.test(e3);
  }
  buildUrl(e3, t2) {
    if (t2) {
      if (this.isAbsoluteUrl(t2)) return t2;
      if (e3) return "".concat(e3.replace(/\/?\/$/, ""), "/").concat(t2.replace(/^\/+/, ""));
    }
    throw new TypeError("`url` must be absolute or `baseUrl` non-empty.");
  }
  getAccessToken(e3) {
    return this.config.getAccessToken ? this.config.getAccessToken(e3) : this.hooks.getAccessToken(e3);
  }
  extractUrl(e3) {
    return "string" == typeof e3 ? e3 : e3 instanceof URL ? e3.href : e3.url;
  }
  buildBaseRequest(e3, t2) {
    if (!this.config.baseUrl) return new Request(e3, t2);
    const n2 = this.buildUrl(this.config.baseUrl, this.extractUrl(e3)), o2 = e3 instanceof Request ? new Request(n2, e3) : n2;
    return new Request(o2, t2);
  }
  setAuthorizationHeader(e3, t2) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : vt.Bearer;
    e3.headers.set("authorization", "".concat(n2, " ").concat(t2));
  }
  async setDpopProofHeader(e3, t2) {
    if (!this.config.dpopNonceId) return;
    const n2 = await this.hooks.getDpopNonce(), o2 = await this.hooks.generateDpopProof({ accessToken: t2, method: e3.method, nonce: n2, url: e3.url });
    e3.headers.set("dpop", o2);
  }
  async prepareRequest(e3, t2) {
    const n2 = await this.getAccessToken(t2);
    let o2, r2;
    "string" == typeof n2 ? (o2 = this.config.dpopNonceId ? vt.DPoP : vt.Bearer, r2 = n2) : (o2 = n2.token_type, r2 = n2.access_token), this.setAuthorizationHeader(e3, r2, o2), o2 === vt.DPoP && await this.setDpopProofHeader(e3, r2);
  }
  getHeader(e3, t2) {
    return Array.isArray(e3) ? new Headers(e3).get(t2) || "" : "function" == typeof e3.get ? e3.get(t2) || "" : e3[t2] || "";
  }
  hasUseDpopNonceError(e3) {
    if (401 !== e3.status) return false;
    const t2 = this.getHeader(e3.headers, "www-authenticate");
    return t2.includes("invalid_dpop_nonce") || t2.includes("use_dpop_nonce");
  }
  async handleResponse(e3, t2) {
    const n2 = this.getHeader(e3.headers, ke);
    if (n2 && await this.hooks.setDpopNonce(n2), !this.hasUseDpopNonceError(e3)) return e3;
    if (!n2 || !t2.onUseDpopNonceError) throw new O(n2);
    return t2.onUseDpopNonceError();
  }
  async internalFetchWithAuth(e3, t2, n2, o2) {
    const r2 = this.buildBaseRequest(e3, t2);
    await this.prepareRequest(r2, o2);
    const i2 = await this.config.fetch(r2);
    return this.handleResponse(i2, n2);
  }
  fetchWithAuth(e3, t2, n2) {
    const o2 = { onUseDpopNonceError: () => this.internalFetchWithAuth(e3, t2, Object.assign(Object.assign({}, o2), { onUseDpopNonceError: void 0 }), n2) };
    return this.internalFetchWithAuth(e3, t2, o2, n2);
  }
};
var kt = class {
  constructor(e3, t2) {
    this.myAccountFetcher = e3, this.apiBase = t2;
  }
  async connectAccount(e3) {
    const t2 = await this.myAccountFetcher.fetchWithAuth("".concat(this.apiBase, "v1/connected-accounts/connect"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(e3) });
    return this._handleResponse(t2);
  }
  async completeAccount(e3) {
    const t2 = await this.myAccountFetcher.fetchWithAuth("".concat(this.apiBase, "v1/connected-accounts/complete"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(e3) });
    return this._handleResponse(t2);
  }
  async _handleResponse(e3) {
    let t2;
    try {
      t2 = await e3.text(), t2 = JSON.parse(t2);
    } catch (n2) {
      throw new _t({ type: "invalid_json", status: e3.status, title: "Invalid JSON response", detail: t2 || String(n2) });
    }
    if (e3.ok) return t2;
    throw new _t(t2);
  }
};
var _t = class __t extends Error {
  constructor(e3) {
    let t2 = e3.type, n2 = e3.status, o2 = e3.title, r2 = e3.detail, i2 = e3.validation_errors;
    super(r2), this.name = "MyAccountApiError", this.type = t2, this.status = n2, this.title = o2, this.detail = r2, this.validation_errors = i2, Object.setPrototypeOf(this, __t.prototype);
  }
};
var St = { otp: { authenticatorTypes: ["otp"] }, sms: { authenticatorTypes: ["oob"], oobChannels: ["sms"] }, email: { authenticatorTypes: ["oob"], oobChannels: ["email"] }, push: { authenticatorTypes: ["oob"], oobChannels: ["auth0"] }, voice: { authenticatorTypes: ["oob"], oobChannels: ["voice"] } };
var Tt = "http://auth0.com/oauth/grant-type/mfa-otp";
var Et = "http://auth0.com/oauth/grant-type/mfa-oob";
var Pt = "http://auth0.com/oauth/grant-type/mfa-recovery-code";
var At;
var It;
var Rt;
if ("undefined" == typeof navigator || null === (At = navigator.userAgent) || void 0 === At || null === (It = At.startsWith) || void 0 === It || !It.call(At, "Mozilla/5.0 ")) {
  const e3 = "v3.8.6";
  Rt = "".concat("oauth4webapi", "/").concat(e3);
}
function xt(e3, t2) {
  if (null == e3) return false;
  try {
    return e3 instanceof t2 || Object.getPrototypeOf(e3)[Symbol.toStringTag] === t2.prototype[Symbol.toStringTag];
  } catch (e4) {
    return false;
  }
}
var Ct = "ERR_INVALID_ARG_VALUE";
var Ot = "ERR_INVALID_ARG_TYPE";
function jt(e3, t2, n2) {
  const o2 = new TypeError(e3, { cause: n2 });
  return Object.assign(o2, { code: t2 }), o2;
}
var Wt = /* @__PURE__ */ Symbol();
var Kt = /* @__PURE__ */ Symbol();
var Lt = /* @__PURE__ */ Symbol();
var Ut = /* @__PURE__ */ Symbol();
var Dt = /* @__PURE__ */ Symbol();
var Nt = /* @__PURE__ */ Symbol();
var Ht = new TextEncoder();
var Zt = new TextDecoder();
function Jt(e3) {
  return "string" == typeof e3 ? Ht.encode(e3) : Zt.decode(e3);
}
var zt;
var Mt;
if (Uint8Array.prototype.toBase64) zt = (e3) => (e3 instanceof ArrayBuffer && (e3 = new Uint8Array(e3)), e3.toBase64({ alphabet: "base64url", omitPadding: true }));
else {
  const e3 = 32768;
  zt = (t2) => {
    t2 instanceof ArrayBuffer && (t2 = new Uint8Array(t2));
    const n2 = [];
    for (let o2 = 0; o2 < t2.byteLength; o2 += e3) n2.push(String.fromCharCode.apply(null, t2.subarray(o2, o2 + e3)));
    return btoa(n2.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  };
}
function Xt(e3) {
  return "string" == typeof e3 ? Mt(e3) : zt(e3);
}
Mt = Uint8Array.fromBase64 ? (e3) => {
  try {
    return Uint8Array.fromBase64(e3, { alphabet: "base64url" });
  } catch (e4) {
    throw jt("The input to be decoded is not correctly encoded.", Ct, e4);
  }
} : (e3) => {
  try {
    const t2 = atob(e3.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")), n2 = new Uint8Array(t2.length);
    for (let e4 = 0; e4 < t2.length; e4++) n2[e4] = t2.charCodeAt(e4);
    return n2;
  } catch (e4) {
    throw jt("The input to be decoded is not correctly encoded.", Ct, e4);
  }
};
var Vt = class extends Error {
  constructor(e3, t2) {
    var n2;
    super(e3, t2), u(this, "code", void 0), this.name = this.constructor.name, this.code = Gn, null === (n2 = Error.captureStackTrace) || void 0 === n2 || n2.call(Error, this, this.constructor);
  }
};
var Ft = class extends Error {
  constructor(e3, t2) {
    var n2;
    super(e3, t2), u(this, "code", void 0), this.name = this.constructor.name, null != t2 && t2.code && (this.code = null == t2 ? void 0 : t2.code), null === (n2 = Error.captureStackTrace) || void 0 === n2 || n2.call(Error, this, this.constructor);
  }
};
function Gt(e3, t2, n2) {
  return new Ft(e3, { code: t2, cause: n2 });
}
function Yt(e3, t2) {
  if ((function(e4, t3) {
    if (!(e4 instanceof CryptoKey)) throw jt("".concat(t3, " must be a CryptoKey"), Ot);
  })(e3, t2), "private" !== e3.type) throw jt("".concat(t2, " must be a private CryptoKey"), Ct);
}
function Bt(e3) {
  return null !== e3 && "object" == typeof e3 && !Array.isArray(e3);
}
function qt(e3) {
  xt(e3, Headers) && (e3 = Object.fromEntries(e3.entries()));
  const t2 = new Headers(null != e3 ? e3 : {});
  if (Rt && !t2.has("user-agent") && t2.set("user-agent", Rt), t2.has("authorization")) throw jt('"options.headers" must not include the "authorization" header name', Ct);
  return t2;
}
function Qt(e3, t2) {
  if (void 0 !== t2) {
    if ("function" == typeof t2 && (t2 = t2(e3.href)), !(t2 instanceof AbortSignal)) throw jt('"options.signal" must return or be an instance of AbortSignal', Ot);
    return t2;
  }
}
function $t(e3) {
  return e3.includes("//") ? e3.replace("//", "/") : e3;
}
async function en(e3, t2) {
  return (async function(e4, t3, n2, o2) {
    if (!(e4 instanceof URL)) throw jt('"'.concat(t3, '" must be an instance of URL'), Ot);
    mn(e4, true !== (null == o2 ? void 0 : o2[Wt]));
    const r2 = n2(new URL(e4.href)), i2 = qt(null == o2 ? void 0 : o2.headers);
    return i2.set("accept", "application/json"), ((null == o2 ? void 0 : o2[Ut]) || fetch)(r2.href, { body: void 0, headers: Object.fromEntries(i2.entries()), method: "GET", redirect: "manual", signal: Qt(r2, null == o2 ? void 0 : o2.signal) });
  })(e3, "issuerIdentifier", (e4) => {
    switch (null == t2 ? void 0 : t2.algorithm) {
      case void 0:
      case "oidc":
        !(function(e5, t3) {
          e5.pathname = $t("".concat(e5.pathname, "/").concat(t3));
        })(e4, ".well-known/openid-configuration");
        break;
      case "oauth2":
        !(function(e5, t3) {
          let n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          "/" === e5.pathname ? e5.pathname = t3 : e5.pathname = $t("".concat(t3, "/").concat(n2 ? e5.pathname : e5.pathname.replace(/(\/)$/, "")));
        })(e4, ".well-known/oauth-authorization-server");
        break;
      default:
        throw jt('"options.algorithm" must be "oidc" (default), or "oauth2"', Ct);
    }
    return e4;
  }, t2);
}
function tn(e3, t2, n2, o2, r2) {
  try {
    if ("number" != typeof e3 || !Number.isFinite(e3)) throw jt("".concat(n2, " must be a number"), Ot, r2);
    if (e3 > 0) return;
    if (t2) {
      if (0 !== e3) throw jt("".concat(n2, " must be a non-negative number"), Ct, r2);
      return;
    }
    throw jt("".concat(n2, " must be a positive number"), Ct, r2);
  } catch (e4) {
    if (o2) throw Gt(e4.message, o2, r2);
    throw e4;
  }
}
function nn(e3, t2, n2, o2) {
  try {
    if ("string" != typeof e3) throw jt("".concat(t2, " must be a string"), Ot, o2);
    if (0 === e3.length) throw jt("".concat(t2, " must not be empty"), Ct, o2);
  } catch (e4) {
    if (n2) throw Gt(e4.message, n2, o2);
    throw e4;
  }
}
function on(e3) {
  !(function(e4, t2) {
    if (xn(e4) !== t2) throw (function(e5) {
      let t3 = '"response" content-type must be ';
      for (var n2 = arguments.length, o2 = new Array(n2 > 1 ? n2 - 1 : 0), r2 = 1; r2 < n2; r2++) o2[r2 - 1] = arguments[r2];
      if (o2.length > 2) {
        const e6 = o2.pop();
        t3 += "".concat(o2.join(", "), ", or ").concat(e6);
      } else 2 === o2.length ? t3 += "".concat(o2[0], " or ").concat(o2[1]) : t3 += o2[0];
      return Gt(t3, Qn, e5);
    })(e4, t2);
  })(e3, "application/json");
}
function rn() {
  return Xt(crypto.getRandomValues(new Uint8Array(32)));
}
function an(e3) {
  switch (e3.algorithm.name) {
    case "RSA-PSS":
      return (function(e4) {
        switch (e4.algorithm.hash.name) {
          case "SHA-256":
            return "PS256";
          case "SHA-384":
            return "PS384";
          case "SHA-512":
            return "PS512";
          default:
            throw new Vt("unsupported RsaHashedKeyAlgorithm hash name", { cause: e4 });
        }
      })(e3);
    case "RSASSA-PKCS1-v1_5":
      return (function(e4) {
        switch (e4.algorithm.hash.name) {
          case "SHA-256":
            return "RS256";
          case "SHA-384":
            return "RS384";
          case "SHA-512":
            return "RS512";
          default:
            throw new Vt("unsupported RsaHashedKeyAlgorithm hash name", { cause: e4 });
        }
      })(e3);
    case "ECDSA":
      return (function(e4) {
        switch (e4.algorithm.namedCurve) {
          case "P-256":
            return "ES256";
          case "P-384":
            return "ES384";
          case "P-521":
            return "ES512";
          default:
            throw new Vt("unsupported EcKeyAlgorithm namedCurve", { cause: e4 });
        }
      })(e3);
    case "Ed25519":
    case "ML-DSA-44":
    case "ML-DSA-65":
    case "ML-DSA-87":
      return e3.algorithm.name;
    case "EdDSA":
      return "Ed25519";
    default:
      throw new Vt("unsupported CryptoKey algorithm name", { cause: e3 });
  }
}
function sn(e3) {
  const t2 = null == e3 ? void 0 : e3[Kt];
  return "number" == typeof t2 && Number.isFinite(t2) ? t2 : 0;
}
function cn(e3) {
  const t2 = null == e3 ? void 0 : e3[Lt];
  return "number" == typeof t2 && Number.isFinite(t2) && -1 !== Math.sign(t2) ? t2 : 30;
}
function un() {
  return Math.floor(Date.now() / 1e3);
}
function ln(e3) {
  if ("object" != typeof e3 || null === e3) throw jt('"as" must be an object', Ot);
  nn(e3.issuer, '"as.issuer"');
}
function hn(e3) {
  if ("object" != typeof e3 || null === e3) throw jt('"client" must be an object', Ot);
  nn(e3.client_id, '"client.client_id"');
}
function dn(e3) {
  return nn(e3, '"clientSecret"'), (t2, n2, o2, r2) => {
    o2.set("client_id", n2.client_id), o2.set("client_secret", e3);
  };
}
function pn(e3, t2) {
  const n2 = (i2 = e3) instanceof CryptoKey ? { key: i2 } : (null == i2 ? void 0 : i2.key) instanceof CryptoKey ? (void 0 !== i2.kid && nn(i2.kid, '"kid"'), { key: i2.key, kid: i2.kid }) : {}, o2 = n2.key, r2 = n2.kid;
  var i2;
  return Yt(o2, '"clientPrivateKey.key"'), async (e4, n3, i3, a2) => {
    var s2;
    const c2 = { alg: an(o2), kid: r2 }, u2 = (function(e5, t3) {
      const n4 = un() + sn(t3);
      return { jti: rn(), aud: e5.issuer, exp: n4 + 60, iat: n4, nbf: n4, iss: t3.client_id, sub: t3.client_id };
    })(e4, n3);
    null == t2 || null === (s2 = t2[Dt]) || void 0 === s2 || s2.call(t2, c2, u2), i3.set("client_id", n3.client_id), i3.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), i3.set("client_assertion", await (async function(e5, t3, n4) {
      if (!n4.usages.includes("sign")) throw jt('CryptoKey instances used for signing assertions must include "sign" in their "usages"', Ct);
      const o3 = "".concat(Xt(Jt(JSON.stringify(e5))), ".").concat(Xt(Jt(JSON.stringify(t3)))), r3 = Xt(await crypto.subtle.sign((function(e6) {
        switch (e6.algorithm.name) {
          case "ECDSA":
            return { name: e6.algorithm.name, hash: uo(e6) };
          case "RSA-PSS":
            switch (co(e6), e6.algorithm.hash.name) {
              case "SHA-256":
              case "SHA-384":
              case "SHA-512":
                return { name: e6.algorithm.name, saltLength: parseInt(e6.algorithm.hash.name.slice(-3), 10) >> 3 };
              default:
                throw new Vt("unsupported RSA-PSS hash name", { cause: e6 });
            }
          case "RSASSA-PKCS1-v1_5":
            return co(e6), e6.algorithm.name;
          case "ML-DSA-44":
          case "ML-DSA-65":
          case "ML-DSA-87":
          case "Ed25519":
            return e6.algorithm.name;
        }
        throw new Vt("unsupported CryptoKey algorithm name", { cause: e6 });
      })(n4), n4, Jt(o3)));
      return "".concat(o3, ".").concat(r3);
    })(c2, u2, o2));
  };
}
var fn = URL.parse ? (e3, t2) => URL.parse(e3, t2) : (e3, t2) => {
  try {
    return new URL(e3, t2);
  } catch (e4) {
    return null;
  }
};
function mn(e3, t2) {
  if (t2 && "https:" !== e3.protocol) throw Gt("only requests to HTTPS are allowed", eo, e3);
  if ("https:" !== e3.protocol && "http:" !== e3.protocol) throw Gt("only HTTP and HTTPS requests are allowed", to, e3);
}
function yn(e3, t2, n2, o2) {
  let r2;
  if ("string" != typeof e3 || !(r2 = fn(e3))) throw Gt("authorization server metadata does not contain a valid ".concat(n2 ? '"as.mtls_endpoint_aliases.'.concat(t2, '"') : '"as.'.concat(t2, '"')), void 0 === e3 ? io : ao, { attribute: n2 ? "mtls_endpoint_aliases.".concat(t2) : t2 });
  return mn(r2, o2), r2;
}
function wn(e3, t2, n2, o2) {
  return n2 && e3.mtls_endpoint_aliases && t2 in e3.mtls_endpoint_aliases ? yn(e3.mtls_endpoint_aliases[t2], t2, n2, o2) : yn(e3[t2], t2, n2, o2);
}
var gn = class extends Error {
  constructor(e3, t2) {
    var n2;
    super(e3, t2), u(this, "cause", void 0), u(this, "code", void 0), u(this, "error", void 0), u(this, "status", void 0), u(this, "error_description", void 0), u(this, "response", void 0), this.name = this.constructor.name, this.code = Fn, this.cause = t2.cause, this.error = t2.cause.error, this.status = t2.response.status, this.error_description = t2.cause.error_description, Object.defineProperty(this, "response", { enumerable: false, value: t2.response }), null === (n2 = Error.captureStackTrace) || void 0 === n2 || n2.call(Error, this, this.constructor);
  }
};
var vn = class extends Error {
  constructor(e3, t2) {
    var n2, o2;
    super(e3, t2), u(this, "cause", void 0), u(this, "code", void 0), u(this, "error", void 0), u(this, "error_description", void 0), this.name = this.constructor.name, this.code = Yn, this.cause = t2.cause, this.error = t2.cause.get("error"), this.error_description = null !== (n2 = t2.cause.get("error_description")) && void 0 !== n2 ? n2 : void 0, null === (o2 = Error.captureStackTrace) || void 0 === o2 || o2.call(Error, this, this.constructor);
  }
};
var bn = class extends Error {
  constructor(e3, t2) {
    var n2;
    super(e3, t2), u(this, "cause", void 0), u(this, "code", void 0), u(this, "response", void 0), u(this, "status", void 0), this.name = this.constructor.name, this.code = Vn, this.cause = t2.cause, this.status = t2.response.status, this.response = t2.response, Object.defineProperty(this, "response", { enumerable: false }), null === (n2 = Error.captureStackTrace) || void 0 === n2 || n2.call(Error, this, this.constructor);
  }
};
var kn = "[a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+";
var _n = "(" + kn + ')\\s*=\\s*"((?:[^"\\\\]|\\\\[\\s\\S])*)"';
var Sn = "(" + kn + ")\\s*=\\s*(" + kn + ")";
var Tn = new RegExp("^[,\\s]*(" + kn + ")");
var En = new RegExp("^[,\\s]*" + _n + "[,\\s]*(.*)");
var Pn = new RegExp("^[,\\s]*" + Sn + "[,\\s]*(.*)");
var An = new RegExp("^([a-zA-Z0-9\\-\\._\\~\\+\\/]+={0,2})(?:$|[,\\s])(.*)");
async function In(e3, t2, n2) {
  if (e3.status !== t2) {
    let t3;
    var o2;
    if ((function(e4) {
      let t4;
      if (t4 = (function(e5) {
        if (!xt(e5, Response)) throw jt('"response" must be an instance of Response', Ot);
        const t5 = e5.headers.get("www-authenticate");
        if (null === t5) return;
        const n3 = [];
        let o3 = t5;
        for (; o3; ) {
          var r2;
          let e6 = o3.match(Tn);
          const t6 = null === (r2 = e6) || void 0 === r2 ? void 0 : r2[1].toLowerCase();
          if (!t6) return;
          const c2 = o3.substring(e6[0].length);
          if (c2 && !c2.match(/^[\s,]/)) return;
          const u2 = c2.match(/^\s+(.*)$/), l2 = !!u2;
          o3 = u2 ? u2[1] : void 0;
          const h2 = {};
          let d2;
          if (l2) for (; o3; ) {
            let t7, n4;
            if (e6 = o3.match(En)) {
              var i2 = p(e6, 4);
              if (t7 = i2[1], n4 = i2[2], o3 = i2[3], n4.includes("\\")) try {
                n4 = JSON.parse('"'.concat(n4, '"'));
              } catch (e7) {
              }
              h2[t7.toLowerCase()] = n4;
            } else {
              if (!(e6 = o3.match(Pn))) {
                if (e6 = o3.match(An)) {
                  if (Object.keys(h2).length) break;
                  var a2 = p(e6, 3);
                  d2 = a2[1], o3 = a2[2];
                  break;
                }
                return;
              }
              var s2 = p(e6, 4);
              t7 = s2[1], n4 = s2[2], o3 = s2[3], h2[t7.toLowerCase()] = n4;
            }
          }
          else o3 = c2 || void 0;
          const f2 = { scheme: t6, parameters: h2 };
          d2 && (f2.token68 = d2), n3.push(f2);
        }
        return n3.length ? n3 : void 0;
      })(e4)) throw new bn("server responded with a challenge in the WWW-Authenticate HTTP Header", { cause: t4, response: e4 });
    })(e3), t3 = await (async function(e4) {
      if (e4.status > 399 && e4.status < 500) {
        so(e4), on(e4);
        try {
          const t4 = await e4.clone().json();
          if (Bt(t4) && "string" == typeof t4.error && t4.error.length) return t4;
        } catch (e5) {
        }
      }
    })(e3)) throw await (null === (o2 = e3.body) || void 0 === o2 ? void 0 : o2.cancel()), new gn("server responded with an error in the response body", { cause: t3, response: e3 });
    throw Gt('"response" is not a conform '.concat(n2, " response (unexpected HTTP status code)"), $n, e3);
  }
}
function Rn(e3) {
  if (!Nn.has(e3)) throw jt('"options.DPoP" is not a valid DPoPHandle', Ct);
}
function xn(e3) {
  var t2;
  return null === (t2 = e3.headers.get("content-type")) || void 0 === t2 ? void 0 : t2.split(";")[0];
}
async function Cn(e3, t2, n2, o2, r2, i2, a2) {
  return await n2(e3, t2, r2, i2), i2.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), ((null == a2 ? void 0 : a2[Ut]) || fetch)(o2.href, { body: r2, headers: Object.fromEntries(i2.entries()), method: "POST", redirect: "manual", signal: Qt(o2, null == a2 ? void 0 : a2.signal) });
}
async function On(e3, t2, n2, o2, r2, i2) {
  var a2;
  const s2 = wn(e3, "token_endpoint", t2.use_mtls_endpoint_aliases, true !== (null == i2 ? void 0 : i2[Wt]));
  r2.set("grant_type", o2);
  const c2 = qt(null == i2 ? void 0 : i2.headers);
  c2.set("accept", "application/json"), void 0 !== (null == i2 ? void 0 : i2.DPoP) && (Rn(i2.DPoP), await i2.DPoP.addProof(s2, c2, "POST"));
  const u2 = await Cn(e3, t2, n2, s2, r2, c2, i2);
  return null == i2 || null === (a2 = i2.DPoP) || void 0 === a2 || a2.cacheNonce(u2, s2), u2;
}
var jn = /* @__PURE__ */ new WeakMap();
var Wn = /* @__PURE__ */ new WeakMap();
function Kn(e3) {
  if (!e3.id_token) return;
  const t2 = jn.get(e3);
  if (!t2) throw jt('"ref" was already garbage collected or did not resolve from the proper sources', Ct);
  return t2;
}
async function Ln(e3, t2, n2, o2, r2, i2) {
  if (ln(e3), hn(t2), !xt(n2, Response)) throw jt('"response" must be an instance of Response', Ot);
  await In(n2, 200, "Token Endpoint"), so(n2);
  const a2 = await wo(n2);
  if (nn(a2.access_token, '"response" body "access_token" property', qn, { body: a2 }), nn(a2.token_type, '"response" body "token_type" property', qn, { body: a2 }), a2.token_type = a2.token_type.toLowerCase(), void 0 !== a2.expires_in) {
    let e4 = "number" != typeof a2.expires_in ? parseFloat(a2.expires_in) : a2.expires_in;
    tn(e4, true, '"response" body "expires_in" property', qn, { body: a2 }), a2.expires_in = e4;
  }
  if (void 0 !== a2.refresh_token && nn(a2.refresh_token, '"response" body "refresh_token" property', qn, { body: a2 }), void 0 !== a2.scope && "string" != typeof a2.scope) throw Gt('"response" body "scope" property must be a string', qn, { body: a2 });
  if (void 0 !== a2.id_token) {
    nn(a2.id_token, '"response" body "id_token" property', qn, { body: a2 });
    const i3 = ["aud", "exp", "iat", "iss", "sub"];
    true === t2.require_auth_time && i3.push("auth_time"), void 0 !== t2.default_max_age && (tn(t2.default_max_age, true, '"client.default_max_age"'), i3.push("auth_time")), null != o2 && o2.length && i3.push(...o2);
    const s2 = await (async function(e4, t3, n3, o3, r3) {
      let i4, a3, s3 = e4.split("."), c3 = s3[0], u3 = s3[1], l2 = s3.length;
      if (5 === l2) {
        if (void 0 === r3) throw new Vt("JWE decryption is not configured", { cause: e4 });
        var h2 = (e4 = await r3(e4)).split(".");
        c3 = h2[0], u3 = h2[1], l2 = h2.length;
      }
      if (3 !== l2) throw Gt("Invalid JWT", qn, e4);
      try {
        i4 = JSON.parse(Jt(Xt(c3)));
      } catch (e5) {
        throw Gt("failed to parse JWT Header body as base64url encoded JSON", Bn, e5);
      }
      if (!Bt(i4)) throw Gt("JWT Header must be a top level object", qn, e4);
      if (t3(i4), void 0 !== i4.crit) throw new Vt('no JWT "crit" header parameter extensions are supported', { cause: { header: i4 } });
      try {
        a3 = JSON.parse(Jt(Xt(u3)));
      } catch (e5) {
        throw Gt("failed to parse JWT Payload body as base64url encoded JSON", Bn, e5);
      }
      if (!Bt(a3)) throw Gt("JWT Payload must be a top level object", qn, e4);
      const d2 = un() + n3;
      if (void 0 !== a3.exp) {
        if ("number" != typeof a3.exp) throw Gt('unexpected JWT "exp" (expiration time) claim type', qn, { claims: a3 });
        if (a3.exp <= d2 - o3) throw Gt('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', no, { claims: a3, now: d2, tolerance: o3, claim: "exp" });
      }
      if (void 0 !== a3.iat && "number" != typeof a3.iat) throw Gt('unexpected JWT "iat" (issued at) claim type', qn, { claims: a3 });
      if (void 0 !== a3.iss && "string" != typeof a3.iss) throw Gt('unexpected JWT "iss" (issuer) claim type', qn, { claims: a3 });
      if (void 0 !== a3.nbf) {
        if ("number" != typeof a3.nbf) throw Gt('unexpected JWT "nbf" (not before) claim type', qn, { claims: a3 });
        if (a3.nbf > d2 + o3) throw Gt('unexpected JWT "nbf" (not before) claim value', no, { claims: a3, now: d2, tolerance: o3, claim: "nbf" });
      }
      if (void 0 !== a3.aud && "string" != typeof a3.aud && !Array.isArray(a3.aud)) throw Gt('unexpected JWT "aud" (audience) claim type', qn, { claims: a3 });
      return { header: i4, claims: a3, jwt: e4 };
    })(a2.id_token, ho.bind(void 0, t2.id_token_signed_response_alg, e3.id_token_signing_alg_values_supported, "RS256"), sn(t2), cn(t2), r2).then(Jn.bind(void 0, i3)).then(Dn.bind(void 0, e3)).then(Un.bind(void 0, t2.client_id)), c2 = s2.claims, u2 = s2.jwt;
    if (Array.isArray(c2.aud) && 1 !== c2.aud.length) {
      if (void 0 === c2.azp) throw Gt('ID Token "aud" (audience) claim includes additional untrusted audiences', oo, { claims: c2, claim: "aud" });
      if (c2.azp !== t2.client_id) throw Gt('unexpected ID Token "azp" (authorized party) claim value', oo, { expected: t2.client_id, claims: c2, claim: "azp" });
    }
    void 0 !== c2.auth_time && tn(c2.auth_time, true, 'ID Token "auth_time" (authentication time)', qn, { claims: c2 }), Wn.set(n2, u2), jn.set(a2, c2);
  }
  if (void 0 !== (null == i2 ? void 0 : i2[a2.token_type])) i2[a2.token_type](n2, a2);
  else if ("dpop" !== a2.token_type && "bearer" !== a2.token_type) throw new Vt("unsupported `token_type` value", { cause: { body: a2 } });
  return a2;
}
function Un(e3, t2) {
  if (Array.isArray(t2.claims.aud)) {
    if (!t2.claims.aud.includes(e3)) throw Gt('unexpected JWT "aud" (audience) claim value', oo, { expected: e3, claims: t2.claims, claim: "aud" });
  } else if (t2.claims.aud !== e3) throw Gt('unexpected JWT "aud" (audience) claim value', oo, { expected: e3, claims: t2.claims, claim: "aud" });
  return t2;
}
function Dn(e3, t2) {
  var n2, o2;
  const r2 = null !== (n2 = null === (o2 = e3[vo]) || void 0 === o2 ? void 0 : o2.call(e3, t2)) && void 0 !== n2 ? n2 : e3.issuer;
  if (t2.claims.iss !== r2) throw Gt('unexpected JWT "iss" (issuer) claim value', oo, { expected: r2, claims: t2.claims, claim: "iss" });
  return t2;
}
var Nn = /* @__PURE__ */ new WeakSet();
var Hn = /* @__PURE__ */ Symbol();
var Zn = { aud: "audience", c_hash: "code hash", client_id: "client id", exp: "expiration time", iat: "issued at", iss: "issuer", jti: "jwt id", nonce: "nonce", s_hash: "state hash", sub: "subject", ath: "access token hash", htm: "http method", htu: "http uri", cnf: "confirmation", auth_time: "authentication time" };
function Jn(e3, t2) {
  for (const n2 of e3) if (void 0 === t2.claims[n2]) throw Gt('JWT "'.concat(n2, '" (').concat(Zn[n2], ") claim missing"), qn, { claims: t2.claims });
  return t2;
}
var zn = /* @__PURE__ */ Symbol();
var Mn = /* @__PURE__ */ Symbol();
async function Xn(e3, t2, n2, o2) {
  return "string" == typeof (null == o2 ? void 0 : o2.expectedNonce) || "number" == typeof (null == o2 ? void 0 : o2.maxAge) || null != o2 && o2.requireIdToken ? (async function(e4, t3, n3, o3, r2, i2, a2) {
    const s2 = [];
    switch (o3) {
      case void 0:
        o3 = zn;
        break;
      case zn:
        break;
      default:
        nn(o3, '"expectedNonce" argument'), s2.push("nonce");
    }
    switch (null != r2 || (r2 = t3.default_max_age), r2) {
      case void 0:
        r2 = Mn;
        break;
      case Mn:
        break;
      default:
        tn(r2, true, '"maxAge" argument'), s2.push("auth_time");
    }
    const c2 = await Ln(e4, t3, n3, s2, i2, a2);
    nn(c2.id_token, '"response" body "id_token" property', qn, { body: c2 });
    const u2 = Kn(c2);
    if (r2 !== Mn) {
      const e5 = un() + sn(t3), n4 = cn(t3);
      if (u2.auth_time + r2 < e5 - n4) throw Gt("too much time has elapsed since the last End-User authentication", no, { claims: u2, now: e5, tolerance: n4, claim: "auth_time" });
    }
    if (o3 === zn) {
      if (void 0 !== u2.nonce) throw Gt('unexpected ID Token "nonce" claim value', oo, { expected: void 0, claims: u2, claim: "nonce" });
    } else if (u2.nonce !== o3) throw Gt('unexpected ID Token "nonce" claim value', oo, { expected: o3, claims: u2, claim: "nonce" });
    return c2;
  })(e3, t2, n2, o2.expectedNonce, o2.maxAge, o2[Nt], o2.recognizedTokenTypes) : (async function(e4, t3, n3, o3, r2) {
    const i2 = await Ln(e4, t3, n3, void 0, o3, r2), a2 = Kn(i2);
    if (a2) {
      if (void 0 !== t3.default_max_age) {
        tn(t3.default_max_age, true, '"client.default_max_age"');
        const e5 = un() + sn(t3), n4 = cn(t3);
        if (a2.auth_time + t3.default_max_age < e5 - n4) throw Gt("too much time has elapsed since the last End-User authentication", no, { claims: a2, now: e5, tolerance: n4, claim: "auth_time" });
      }
      if (void 0 !== a2.nonce) throw Gt('unexpected ID Token "nonce" claim value', oo, { expected: void 0, claims: a2, claim: "nonce" });
    }
    return i2;
  })(e3, t2, n2, null == o2 ? void 0 : o2[Nt], null == o2 ? void 0 : o2.recognizedTokenTypes);
}
var Vn = "OAUTH_WWW_AUTHENTICATE_CHALLENGE";
var Fn = "OAUTH_RESPONSE_BODY_ERROR";
var Gn = "OAUTH_UNSUPPORTED_OPERATION";
var Yn = "OAUTH_AUTHORIZATION_RESPONSE_ERROR";
var Bn = "OAUTH_PARSE_ERROR";
var qn = "OAUTH_INVALID_RESPONSE";
var Qn = "OAUTH_RESPONSE_IS_NOT_JSON";
var $n = "OAUTH_RESPONSE_IS_NOT_CONFORM";
var eo = "OAUTH_HTTP_REQUEST_FORBIDDEN";
var to = "OAUTH_REQUEST_PROTOCOL_FORBIDDEN";
var no = "OAUTH_JWT_TIMESTAMP_CHECK_FAILED";
var oo = "OAUTH_JWT_CLAIM_COMPARISON_FAILED";
var ro = "OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED";
var io = "OAUTH_MISSING_SERVER_METADATA";
var ao = "OAUTH_INVALID_SERVER_METADATA";
function so(e3) {
  if (e3.bodyUsed) throw jt('"response" body has been used already', Ct);
}
function co(e3) {
  const t2 = e3.algorithm;
  if ("number" != typeof t2.modulusLength || t2.modulusLength < 2048) throw new Vt("unsupported ".concat(t2.name, " modulusLength"), { cause: e3 });
}
function uo(e3) {
  switch (e3.algorithm.namedCurve) {
    case "P-256":
      return "SHA-256";
    case "P-384":
      return "SHA-384";
    case "P-521":
      return "SHA-512";
    default:
      throw new Vt("unsupported ECDSA namedCurve", { cause: e3 });
  }
}
async function lo(e3) {
  if ("POST" !== e3.method) throw jt("form_post responses are expected to use the POST method", Ct, { cause: e3 });
  if ("application/x-www-form-urlencoded" !== xn(e3)) throw jt("form_post responses are expected to use the application/x-www-form-urlencoded content-type", Ct, { cause: e3 });
  return (async function(e4) {
    if (e4.bodyUsed) throw jt("form_post Request instances must contain a readable body", Ct, { cause: e4 });
    return e4.text();
  })(e3);
}
function ho(e3, t2, n2, o2) {
  if (void 0 === e3) if (Array.isArray(t2)) {
    if (!t2.includes(o2.alg)) throw Gt('unexpected JWT "alg" header parameter', qn, { header: o2, expected: t2, reason: "authorization server metadata" });
  } else {
    if (void 0 === n2) throw Gt('missing client or server configuration to verify used JWT "alg" header parameter', void 0, { client: e3, issuer: t2, fallback: n2 });
    if ("string" == typeof n2 ? o2.alg !== n2 : "function" == typeof n2 ? !n2(o2.alg) : !n2.includes(o2.alg)) throw Gt('unexpected JWT "alg" header parameter', qn, { header: o2, expected: n2, reason: "default value" });
  }
  else if ("string" == typeof e3 ? o2.alg !== e3 : !e3.includes(o2.alg)) throw Gt('unexpected JWT "alg" header parameter', qn, { header: o2, expected: e3, reason: "client configuration" });
}
function po(e3, t2) {
  const n2 = e3.getAll(t2), o2 = n2[0];
  if (n2.length > 1) throw Gt('"'.concat(t2, '" parameter must be provided only once'), qn);
  return o2;
}
var fo = /* @__PURE__ */ Symbol();
var mo = /* @__PURE__ */ Symbol();
function yo(e3, t2, n2, o2) {
  if (ln(e3), hn(t2), n2 instanceof URL && (n2 = n2.searchParams), !(n2 instanceof URLSearchParams)) throw jt('"parameters" must be an instance of URLSearchParams, or URL', Ot);
  if (po(n2, "response")) throw Gt('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', qn, { parameters: n2 });
  const r2 = po(n2, "iss"), i2 = po(n2, "state");
  if (!r2 && e3.authorization_response_iss_parameter_supported) throw Gt('response parameter "iss" (issuer) missing', qn, { parameters: n2 });
  if (r2 && r2 !== e3.issuer) throw Gt('unexpected "iss" (issuer) response parameter value', qn, { expected: e3.issuer, parameters: n2 });
  switch (o2) {
    case void 0:
    case mo:
      if (void 0 !== i2) throw Gt('unexpected "state" response parameter encountered', qn, { expected: void 0, parameters: n2 });
      break;
    case fo:
      break;
    default:
      if (nn(o2, '"expectedState" argument'), i2 !== o2) throw Gt(void 0 === i2 ? 'response parameter "state" missing' : 'unexpected "state" response parameter value', qn, { expected: o2, parameters: n2 });
  }
  if (po(n2, "error")) throw new vn("authorization response from the server is an error", { cause: n2 });
  const a2 = po(n2, "id_token"), s2 = po(n2, "token");
  if (void 0 !== a2 || void 0 !== s2) throw new Vt("implicit and hybrid flows are not supported");
  return c2 = new URLSearchParams(n2), Nn.add(c2), c2;
  var c2;
}
async function wo(e3) {
  let t2, n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : on;
  try {
    t2 = await e3.json();
  } catch (t3) {
    throw n2(e3), Gt('failed to parse "response" body as JSON', Bn, t3);
  }
  if (!Bt(t2)) throw Gt('"response" body must be a top level object', qn, { body: t2 });
  return t2;
}
var go = /* @__PURE__ */ Symbol();
var vo = /* @__PURE__ */ Symbol();
var bo = new TextEncoder();
var ko = new TextDecoder();
function _o(e3) {
  const t2 = new Uint8Array(e3.length);
  for (let n2 = 0; n2 < e3.length; n2++) {
    const o2 = e3.charCodeAt(n2);
    if (o2 > 127) throw new TypeError("non-ASCII string encountered in encode()");
    t2[n2] = o2;
  }
  return t2;
}
function So(e3) {
  if (Uint8Array.fromBase64) return Uint8Array.fromBase64(e3);
  const t2 = atob(e3), n2 = new Uint8Array(t2.length);
  for (let e4 = 0; e4 < t2.length; e4++) n2[e4] = t2.charCodeAt(e4);
  return n2;
}
function To(e3) {
  if (Uint8Array.fromBase64) return Uint8Array.fromBase64("string" == typeof e3 ? e3 : ko.decode(e3), { alphabet: "base64url" });
  let t2 = e3;
  t2 instanceof Uint8Array && (t2 = ko.decode(t2)), t2 = t2.replace(/-/g, "+").replace(/_/g, "/");
  try {
    return So(t2);
  } catch (e4) {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
}
var Eo = function(e3) {
  return new TypeError("CryptoKey does not support this operation, its ".concat(arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "algorithm.name", " must be ").concat(e3));
};
var Po = (e3, t2) => e3.name === t2;
function Ao(e3, t2) {
  var n2;
  if ((n2 = e3.hash, parseInt(n2.name.slice(4), 10)) !== t2) throw Eo("SHA-".concat(t2), "algorithm.hash");
}
function Io(e3, t2, n2) {
  switch (t2) {
    case "HS256":
    case "HS384":
    case "HS512":
      if (!Po(e3.algorithm, "HMAC")) throw Eo("HMAC");
      Ao(e3.algorithm, parseInt(t2.slice(2), 10));
      break;
    case "RS256":
    case "RS384":
    case "RS512":
      if (!Po(e3.algorithm, "RSASSA-PKCS1-v1_5")) throw Eo("RSASSA-PKCS1-v1_5");
      Ao(e3.algorithm, parseInt(t2.slice(2), 10));
      break;
    case "PS256":
    case "PS384":
    case "PS512":
      if (!Po(e3.algorithm, "RSA-PSS")) throw Eo("RSA-PSS");
      Ao(e3.algorithm, parseInt(t2.slice(2), 10));
      break;
    case "Ed25519":
    case "EdDSA":
      if (!Po(e3.algorithm, "Ed25519")) throw Eo("Ed25519");
      break;
    case "ML-DSA-44":
    case "ML-DSA-65":
    case "ML-DSA-87":
      if (!Po(e3.algorithm, t2)) throw Eo(t2);
      break;
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!Po(e3.algorithm, "ECDSA")) throw Eo("ECDSA");
      const n3 = (function(e4) {
        switch (e4) {
          case "ES256":
            return "P-256";
          case "ES384":
            return "P-384";
          case "ES512":
            return "P-521";
          default:
            throw new Error("unreachable");
        }
      })(t2);
      if (e3.algorithm.namedCurve !== n3) throw Eo(n3, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  !(function(e4, t3) {
    if (t3 && !e4.usages.includes(t3)) throw new TypeError("CryptoKey does not support this operation, its usages must include ".concat(t3, "."));
  })(e3, n2);
}
function Ro(e3, t2) {
  for (var n2 = arguments.length, o2 = new Array(n2 > 2 ? n2 - 2 : 0), r2 = 2; r2 < n2; r2++) o2[r2 - 2] = arguments[r2];
  if ((o2 = o2.filter(Boolean)).length > 2) {
    const t3 = o2.pop();
    e3 += "one of type ".concat(o2.join(", "), ", or ").concat(t3, ".");
  } else 2 === o2.length ? e3 += "one of type ".concat(o2[0], " or ").concat(o2[1], ".") : e3 += "of type ".concat(o2[0], ".");
  if (null == t2) e3 += " Received ".concat(t2);
  else if ("function" == typeof t2 && t2.name) e3 += " Received function ".concat(t2.name);
  else if ("object" == typeof t2 && null != t2) {
    var i2;
    null !== (i2 = t2.constructor) && void 0 !== i2 && i2.name && (e3 += " Received an instance of ".concat(t2.constructor.name));
  }
  return e3;
}
var xo = function(e3, t2) {
  for (var n2 = arguments.length, o2 = new Array(n2 > 2 ? n2 - 2 : 0), r2 = 2; r2 < n2; r2++) o2[r2 - 2] = arguments[r2];
  return Ro("Key for the ".concat(e3, " algorithm must be "), t2, ...o2);
};
var Co = class extends Error {
  constructor(e3, t2) {
    var n2;
    super(e3, t2), u(this, "code", "ERR_JOSE_GENERIC"), this.name = this.constructor.name, null === (n2 = Error.captureStackTrace) || void 0 === n2 || n2.call(Error, this, this.constructor);
  }
};
u(Co, "code", "ERR_JOSE_GENERIC");
var Oo = class extends Co {
  constructor(e3, t2) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "unspecified", o2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "unspecified";
    super(e3, { cause: { claim: n2, reason: o2, payload: t2 } }), u(this, "code", "ERR_JWT_CLAIM_VALIDATION_FAILED"), u(this, "claim", void 0), u(this, "reason", void 0), u(this, "payload", void 0), this.claim = n2, this.reason = o2, this.payload = t2;
  }
};
u(Oo, "code", "ERR_JWT_CLAIM_VALIDATION_FAILED");
var jo = class extends Co {
  constructor(e3, t2) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "unspecified", o2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "unspecified";
    super(e3, { cause: { claim: n2, reason: o2, payload: t2 } }), u(this, "code", "ERR_JWT_EXPIRED"), u(this, "claim", void 0), u(this, "reason", void 0), u(this, "payload", void 0), this.claim = n2, this.reason = o2, this.payload = t2;
  }
};
u(jo, "code", "ERR_JWT_EXPIRED");
var Wo = class extends Co {
  constructor() {
    super(...arguments), u(this, "code", "ERR_JOSE_ALG_NOT_ALLOWED");
  }
};
u(Wo, "code", "ERR_JOSE_ALG_NOT_ALLOWED");
var Ko = class extends Co {
  constructor() {
    super(...arguments), u(this, "code", "ERR_JOSE_NOT_SUPPORTED");
  }
};
u(Ko, "code", "ERR_JOSE_NOT_SUPPORTED");
u(class extends Co {
  constructor() {
    super(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "decryption operation failed", arguments.length > 1 ? arguments[1] : void 0), u(this, "code", "ERR_JWE_DECRYPTION_FAILED");
  }
}, "code", "ERR_JWE_DECRYPTION_FAILED");
u(class extends Co {
  constructor() {
    super(...arguments), u(this, "code", "ERR_JWE_INVALID");
  }
}, "code", "ERR_JWE_INVALID");
var Lo = class extends Co {
  constructor() {
    super(...arguments), u(this, "code", "ERR_JWS_INVALID");
  }
};
u(Lo, "code", "ERR_JWS_INVALID");
var Uo = class extends Co {
  constructor() {
    super(...arguments), u(this, "code", "ERR_JWT_INVALID");
  }
};
u(Uo, "code", "ERR_JWT_INVALID");
u(class extends Co {
  constructor() {
    super(...arguments), u(this, "code", "ERR_JWK_INVALID");
  }
}, "code", "ERR_JWK_INVALID");
var Do = class extends Co {
  constructor() {
    super(...arguments), u(this, "code", "ERR_JWKS_INVALID");
  }
};
u(Do, "code", "ERR_JWKS_INVALID");
var No = class extends Co {
  constructor() {
    super(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "no applicable key found in the JSON Web Key Set", arguments.length > 1 ? arguments[1] : void 0), u(this, "code", "ERR_JWKS_NO_MATCHING_KEY");
  }
};
u(No, "code", "ERR_JWKS_NO_MATCHING_KEY");
var Ho = class extends Co {
  constructor() {
    super(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "multiple matching keys found in the JSON Web Key Set", arguments.length > 1 ? arguments[1] : void 0), u(this, Symbol.asyncIterator, void 0), u(this, "code", "ERR_JWKS_MULTIPLE_MATCHING_KEYS");
  }
};
u(Ho, "code", "ERR_JWKS_MULTIPLE_MATCHING_KEYS");
var Zo = class extends Co {
  constructor() {
    super(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "request timed out", arguments.length > 1 ? arguments[1] : void 0), u(this, "code", "ERR_JWKS_TIMEOUT");
  }
};
u(Zo, "code", "ERR_JWKS_TIMEOUT");
var Jo = class extends Co {
  constructor() {
    super(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "signature verification failed", arguments.length > 1 ? arguments[1] : void 0), u(this, "code", "ERR_JWS_SIGNATURE_VERIFICATION_FAILED");
  }
};
u(Jo, "code", "ERR_JWS_SIGNATURE_VERIFICATION_FAILED");
var zo = (e3) => {
  if ("CryptoKey" === (null == e3 ? void 0 : e3[Symbol.toStringTag])) return true;
  try {
    return e3 instanceof CryptoKey;
  } catch (e4) {
    return false;
  }
};
var Mo = (e3) => "KeyObject" === (null == e3 ? void 0 : e3[Symbol.toStringTag]);
var Xo = (e3) => zo(e3) || Mo(e3);
function Vo(e3, t2, n2) {
  try {
    return To(e3);
  } catch (e4) {
    throw new n2("Failed to base64url decode the ".concat(t2));
  }
}
function Fo(e3) {
  if ("object" != typeof (t2 = e3) || null === t2 || "[object Object]" !== Object.prototype.toString.call(e3)) return false;
  var t2;
  if (null === Object.getPrototypeOf(e3)) return true;
  let n2 = e3;
  for (; null !== Object.getPrototypeOf(n2); ) n2 = Object.getPrototypeOf(n2);
  return Object.getPrototypeOf(e3) === n2;
}
var Go = (e3) => Fo(e3) && "string" == typeof e3.kty;
async function Yo(e3, t2, n2) {
  if (t2 instanceof Uint8Array) {
    if (!e3.startsWith("HS")) throw new TypeError((function(e4) {
      for (var t3 = arguments.length, n3 = new Array(t3 > 1 ? t3 - 1 : 0), o2 = 1; o2 < t3; o2++) n3[o2 - 1] = arguments[o2];
      return Ro("Key must be ", e4, ...n3);
    })(t2, "CryptoKey", "KeyObject", "JSON Web Key"));
    return crypto.subtle.importKey("raw", t2, { hash: "SHA-".concat(e3.slice(-3)), name: "HMAC" }, false, [n2]);
  }
  return Io(t2, e3, n2), t2;
}
async function Bo(e3, t2, n2, o2) {
  const r2 = await Yo(e3, t2, "verify");
  !(function(e4, t3) {
    if (e4.startsWith("RS") || e4.startsWith("PS")) {
      const n3 = t3.algorithm.modulusLength;
      if ("number" != typeof n3 || n3 < 2048) throw new TypeError("".concat(e4, " requires key modulusLength to be 2048 bits or larger"));
    }
  })(e3, r2);
  const i2 = (function(e4, t3) {
    const n3 = "SHA-".concat(e4.slice(-3));
    switch (e4) {
      case "HS256":
      case "HS384":
      case "HS512":
        return { hash: n3, name: "HMAC" };
      case "PS256":
      case "PS384":
      case "PS512":
        return { hash: n3, name: "RSA-PSS", saltLength: parseInt(e4.slice(-3), 10) >> 3 };
      case "RS256":
      case "RS384":
      case "RS512":
        return { hash: n3, name: "RSASSA-PKCS1-v1_5" };
      case "ES256":
      case "ES384":
      case "ES512":
        return { hash: n3, name: "ECDSA", namedCurve: t3.namedCurve };
      case "Ed25519":
      case "EdDSA":
        return { name: "Ed25519" };
      case "ML-DSA-44":
      case "ML-DSA-65":
      case "ML-DSA-87":
        return { name: e4 };
      default:
        throw new Ko("alg ".concat(e4, " is not supported either by JOSE or your javascript runtime"));
    }
  })(e3, r2.algorithm);
  try {
    return await crypto.subtle.verify(i2, r2, n2, o2);
  } catch (e4) {
    return false;
  }
}
var qo = 'Invalid or unsupported JWK "alg" (Algorithm) Parameter value';
async function Qo(e3) {
  var t2, n2;
  if (!e3.alg) throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  const o2 = (function(e4) {
    let t3, n3;
    switch (e4.kty) {
      case "AKP":
        switch (e4.alg) {
          case "ML-DSA-44":
          case "ML-DSA-65":
          case "ML-DSA-87":
            t3 = { name: e4.alg }, n3 = e4.priv ? ["sign"] : ["verify"];
            break;
          default:
            throw new Ko(qo);
        }
        break;
      case "RSA":
        switch (e4.alg) {
          case "PS256":
          case "PS384":
          case "PS512":
            t3 = { name: "RSA-PSS", hash: "SHA-".concat(e4.alg.slice(-3)) }, n3 = e4.d ? ["sign"] : ["verify"];
            break;
          case "RS256":
          case "RS384":
          case "RS512":
            t3 = { name: "RSASSA-PKCS1-v1_5", hash: "SHA-".concat(e4.alg.slice(-3)) }, n3 = e4.d ? ["sign"] : ["verify"];
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            t3 = { name: "RSA-OAEP", hash: "SHA-".concat(parseInt(e4.alg.slice(-3), 10) || 1) }, n3 = e4.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
            break;
          default:
            throw new Ko(qo);
        }
        break;
      case "EC":
        switch (e4.alg) {
          case "ES256":
          case "ES384":
          case "ES512":
            t3 = { name: "ECDSA", namedCurve: { ES256: "P-256", ES384: "P-384", ES512: "P-521" }[e4.alg] }, n3 = e4.d ? ["sign"] : ["verify"];
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW":
            t3 = { name: "ECDH", namedCurve: e4.crv }, n3 = e4.d ? ["deriveBits"] : [];
            break;
          default:
            throw new Ko(qo);
        }
        break;
      case "OKP":
        switch (e4.alg) {
          case "Ed25519":
          case "EdDSA":
            t3 = { name: "Ed25519" }, n3 = e4.d ? ["sign"] : ["verify"];
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW":
            t3 = { name: e4.crv }, n3 = e4.d ? ["deriveBits"] : [];
            break;
          default:
            throw new Ko(qo);
        }
        break;
      default:
        throw new Ko('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
    }
    return { algorithm: t3, keyUsages: n3 };
  })(e3), r2 = o2.algorithm, i2 = o2.keyUsages, a2 = h({}, e3);
  return "AKP" !== a2.kty && delete a2.alg, delete a2.use, crypto.subtle.importKey("jwk", a2, r2, null !== (t2 = e3.ext) && void 0 !== t2 ? t2 : !e3.d && !e3.priv, null !== (n2 = e3.key_ops) && void 0 !== n2 ? n2 : i2);
}
var $o = "given KeyObject instance cannot be used for this algorithm";
var er;
var tr = async function(e3, t2, n2) {
  let o2 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
  er || (er = /* @__PURE__ */ new WeakMap());
  let r2 = er.get(e3);
  if (null != r2 && r2[n2]) return r2[n2];
  const i2 = await Qo(h(h({}, t2), {}, { alg: n2 }));
  return o2 && Object.freeze(e3), r2 ? r2[n2] = i2 : er.set(e3, { [n2]: i2 }), i2;
};
async function nr(e3, t2) {
  if (e3 instanceof Uint8Array) return e3;
  if (zo(e3)) return e3;
  if (Mo(e3)) {
    if ("secret" === e3.type) return e3.export();
    if ("toCryptoKey" in e3 && "function" == typeof e3.toCryptoKey) try {
      return ((e4, t3) => {
        er || (er = /* @__PURE__ */ new WeakMap());
        let n3 = er.get(e4);
        if (null != n3 && n3[t3]) return n3[t3];
        const o2 = "public" === e4.type, r2 = !!o2;
        let i2;
        if ("x25519" === e4.asymmetricKeyType) {
          switch (t3) {
            case "ECDH-ES":
            case "ECDH-ES+A128KW":
            case "ECDH-ES+A192KW":
            case "ECDH-ES+A256KW":
              break;
            default:
              throw new TypeError($o);
          }
          i2 = e4.toCryptoKey(e4.asymmetricKeyType, r2, o2 ? [] : ["deriveBits"]);
        }
        if ("ed25519" === e4.asymmetricKeyType) {
          if ("EdDSA" !== t3 && "Ed25519" !== t3) throw new TypeError($o);
          i2 = e4.toCryptoKey(e4.asymmetricKeyType, r2, [o2 ? "verify" : "sign"]);
        }
        switch (e4.asymmetricKeyType) {
          case "ml-dsa-44":
          case "ml-dsa-65":
          case "ml-dsa-87":
            if (t3 !== e4.asymmetricKeyType.toUpperCase()) throw new TypeError($o);
            i2 = e4.toCryptoKey(e4.asymmetricKeyType, r2, [o2 ? "verify" : "sign"]);
        }
        if ("rsa" === e4.asymmetricKeyType) {
          let n4;
          switch (t3) {
            case "RSA-OAEP":
              n4 = "SHA-1";
              break;
            case "RS256":
            case "PS256":
            case "RSA-OAEP-256":
              n4 = "SHA-256";
              break;
            case "RS384":
            case "PS384":
            case "RSA-OAEP-384":
              n4 = "SHA-384";
              break;
            case "RS512":
            case "PS512":
            case "RSA-OAEP-512":
              n4 = "SHA-512";
              break;
            default:
              throw new TypeError($o);
          }
          if (t3.startsWith("RSA-OAEP")) return e4.toCryptoKey({ name: "RSA-OAEP", hash: n4 }, r2, o2 ? ["encrypt"] : ["decrypt"]);
          i2 = e4.toCryptoKey({ name: t3.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5", hash: n4 }, r2, [o2 ? "verify" : "sign"]);
        }
        if ("ec" === e4.asymmetricKeyType) {
          var a2;
          const n4 = (/* @__PURE__ */ new Map([["prime256v1", "P-256"], ["secp384r1", "P-384"], ["secp521r1", "P-521"]])).get(null === (a2 = e4.asymmetricKeyDetails) || void 0 === a2 ? void 0 : a2.namedCurve);
          if (!n4) throw new TypeError($o);
          const s2 = { ES256: "P-256", ES384: "P-384", ES512: "P-521" };
          s2[t3] && n4 === s2[t3] && (i2 = e4.toCryptoKey({ name: "ECDSA", namedCurve: n4 }, r2, [o2 ? "verify" : "sign"])), t3.startsWith("ECDH-ES") && (i2 = e4.toCryptoKey({ name: "ECDH", namedCurve: n4 }, r2, o2 ? [] : ["deriveBits"]));
        }
        if (!i2) throw new TypeError($o);
        return n3 ? n3[t3] = i2 : er.set(e4, { [t3]: i2 }), i2;
      })(e3, t2);
    } catch (e4) {
      if (e4 instanceof TypeError) throw e4;
    }
    let n2 = e3.export({ format: "jwk" });
    return tr(e3, n2, t2);
  }
  if (Go(e3)) return e3.k ? To(e3.k) : tr(e3, e3, t2, true);
  throw new Error("unreachable");
}
var or = (e3, t2) => {
  if (e3.byteLength !== t2.length) return false;
  for (let n2 = 0; n2 < e3.byteLength; n2++) if (e3[n2] !== t2[n2]) return false;
  return true;
};
var rr = (e3) => {
  const t2 = e3.data[e3.pos++];
  if (128 & t2) {
    const n2 = 127 & t2;
    let o2 = 0;
    for (let t3 = 0; t3 < n2; t3++) o2 = o2 << 8 | e3.data[e3.pos++];
    return o2;
  }
  return t2;
};
var ir = (e3, t2, n2) => {
  if (e3.data[e3.pos++] !== t2) throw new Error(n2);
};
var ar = (e3, t2) => {
  const n2 = e3.data.subarray(e3.pos, e3.pos + t2);
  return e3.pos += t2, n2;
};
var sr = (e3) => {
  const t2 = ((e4) => {
    ir(e4, 6, "Expected algorithm OID");
    const t3 = rr(e4);
    return ar(e4, t3);
  })(e3);
  if (or(t2, [43, 101, 110])) return "X25519";
  if (!or(t2, [42, 134, 72, 206, 61, 2, 1])) throw new Error("Unsupported key algorithm");
  ir(e3, 6, "Expected curve OID");
  const n2 = rr(e3), o2 = ar(e3, n2);
  for (const e4 of [{ name: "P-256", oid: [42, 134, 72, 206, 61, 3, 1, 7] }, { name: "P-384", oid: [43, 129, 4, 0, 34] }, { name: "P-521", oid: [43, 129, 4, 0, 35] }]) {
    const t3 = e4.name, n3 = e4.oid;
    if (or(o2, n3)) return t3;
  }
  throw new Error("Unsupported named curve");
};
var cr = async (e3, t2, n2, o2) => {
  var r2;
  let i2, a2;
  const s2 = "spki" === e3, c2 = () => s2 ? ["verify"] : ["sign"];
  switch (n2) {
    case "PS256":
    case "PS384":
    case "PS512":
      i2 = { name: "RSA-PSS", hash: "SHA-".concat(n2.slice(-3)) }, a2 = c2();
      break;
    case "RS256":
    case "RS384":
    case "RS512":
      i2 = { name: "RSASSA-PKCS1-v1_5", hash: "SHA-".concat(n2.slice(-3)) }, a2 = c2();
      break;
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512":
      i2 = { name: "RSA-OAEP", hash: "SHA-".concat(parseInt(n2.slice(-3), 10) || 1) }, a2 = s2 ? ["encrypt", "wrapKey"] : ["decrypt", "unwrapKey"];
      break;
    case "ES256":
    case "ES384":
    case "ES512":
      i2 = { name: "ECDSA", namedCurve: { ES256: "P-256", ES384: "P-384", ES512: "P-521" }[n2] }, a2 = c2();
      break;
    case "ECDH-ES":
    case "ECDH-ES+A128KW":
    case "ECDH-ES+A192KW":
    case "ECDH-ES+A256KW":
      try {
        const e4 = o2.getNamedCurve(t2);
        i2 = "X25519" === e4 ? { name: "X25519" } : { name: "ECDH", namedCurve: e4 };
      } catch (e4) {
        throw new Ko("Invalid or unsupported key format");
      }
      a2 = s2 ? [] : ["deriveBits"];
      break;
    case "Ed25519":
    case "EdDSA":
      i2 = { name: "Ed25519" }, a2 = c2();
      break;
    case "ML-DSA-44":
    case "ML-DSA-65":
    case "ML-DSA-87":
      i2 = { name: n2 }, a2 = c2();
      break;
    default:
      throw new Ko('Invalid or unsupported "alg" (Algorithm) value');
  }
  return crypto.subtle.importKey(e3, t2, i2, null !== (r2 = null == o2 ? void 0 : o2.extractable) && void 0 !== r2 ? r2 : !!s2, a2);
};
var ur = (e3, t2, n2) => {
  var o2;
  const r2 = ((e4, t3) => So(e4.replace(t3, "")))(e3, /(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g);
  let i2 = n2;
  return null != t2 && null !== (o2 = t2.startsWith) && void 0 !== o2 && o2.call(t2, "ECDH-ES") && (i2 || (i2 = {}), i2.getNamedCurve = (e4) => {
    const t3 = { data: e4, pos: 0 };
    return (function(e5) {
      ir(e5, 48, "Invalid PKCS#8 structure"), rr(e5), ir(e5, 2, "Expected version field");
      const t4 = rr(e5);
      e5.pos += t4, ir(e5, 48, "Expected algorithm identifier");
      rr(e5);
      e5.pos;
    })(t3), sr(t3);
  }), cr("pkcs8", r2, t2, i2);
};
var lr = (e3) => null == e3 ? void 0 : e3[Symbol.toStringTag];
var hr = (e3, t2, n2) => {
  if (void 0 !== t2.use) {
    let e4;
    switch (n2) {
      case "sign":
      case "verify":
        e4 = "sig";
        break;
      case "encrypt":
      case "decrypt":
        e4 = "enc";
    }
    if (t2.use !== e4) throw new TypeError('Invalid key for this operation, its "use" must be "'.concat(e4, '" when present'));
  }
  if (void 0 !== t2.alg && t2.alg !== e3) throw new TypeError('Invalid key for this operation, its "alg" must be "'.concat(e3, '" when present'));
  if (Array.isArray(t2.key_ops)) {
    var o2, r2;
    let i2;
    switch (true) {
      case ("sign" === n2 || "verify" === n2):
      case "dir" === e3:
      case e3.includes("CBC-HS"):
        i2 = n2;
        break;
      case e3.startsWith("PBES2"):
        i2 = "deriveBits";
        break;
      case /^A\d{3}(?:GCM)?(?:KW)?$/.test(e3):
        i2 = !e3.includes("GCM") && e3.endsWith("KW") ? "encrypt" === n2 ? "wrapKey" : "unwrapKey" : n2;
        break;
      case ("encrypt" === n2 && e3.startsWith("RSA")):
        i2 = "wrapKey";
        break;
      case "decrypt" === n2:
        i2 = e3.startsWith("RSA") ? "unwrapKey" : "deriveBits";
    }
    if (i2 && false === (null === (o2 = t2.key_ops) || void 0 === o2 || null === (r2 = o2.includes) || void 0 === r2 ? void 0 : r2.call(o2, i2))) throw new TypeError('Invalid key for this operation, its "key_ops" must include "'.concat(i2, '" when present'));
  }
  return true;
};
function dr(e3, t2, n2) {
  switch (e3.substring(0, 2)) {
    case "A1":
    case "A2":
    case "di":
    case "HS":
    case "PB":
      ((e4, t3, n3) => {
        if (!(t3 instanceof Uint8Array)) {
          if (Go(t3)) {
            if (((e5) => "oct" === e5.kty && "string" == typeof e5.k)(t3) && hr(e4, t3, n3)) return;
            throw new TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
          }
          if (!Xo(t3)) throw new TypeError(xo(e4, t3, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
          if ("secret" !== t3.type) throw new TypeError("".concat(lr(t3), ' instances for symmetric algorithms must be of type "secret"'));
        }
      })(e3, t2, n2);
      break;
    default:
      ((e4, t3, n3) => {
        if (Go(t3)) switch (n3) {
          case "decrypt":
          case "sign":
            if (((e5) => "oct" !== e5.kty && ("AKP" === e5.kty && "string" == typeof e5.priv || "string" == typeof e5.d))(t3) && hr(e4, t3, n3)) return;
            throw new TypeError("JSON Web Key for this operation must be a private JWK");
          case "encrypt":
          case "verify":
            if (((e5) => "oct" !== e5.kty && void 0 === e5.d && void 0 === e5.priv)(t3) && hr(e4, t3, n3)) return;
            throw new TypeError("JSON Web Key for this operation must be a public JWK");
        }
        if (!Xo(t3)) throw new TypeError(xo(e4, t3, "CryptoKey", "KeyObject", "JSON Web Key"));
        if ("secret" === t3.type) throw new TypeError("".concat(lr(t3), ' instances for asymmetric algorithms must not be of type "secret"'));
        if ("public" === t3.type) switch (n3) {
          case "sign":
            throw new TypeError("".concat(lr(t3), ' instances for asymmetric algorithm signing must be of type "private"'));
          case "decrypt":
            throw new TypeError("".concat(lr(t3), ' instances for asymmetric algorithm decryption must be of type "private"'));
        }
        if ("private" === t3.type) switch (n3) {
          case "verify":
            throw new TypeError("".concat(lr(t3), ' instances for asymmetric algorithm verifying must be of type "public"'));
          case "encrypt":
            throw new TypeError("".concat(lr(t3), ' instances for asymmetric algorithm encryption must be of type "public"'));
        }
      })(e3, t2, n2);
  }
}
var pr;
var fr;
var mr;
var yr;
if ("undefined" == typeof navigator || null === (pr = navigator.userAgent) || void 0 === pr || null === (fr = pr.startsWith) || void 0 === fr || !fr.call(pr, "Mozilla/5.0 ")) {
  const e3 = "v6.8.4";
  yr = "".concat("openid-client", "/").concat(e3), mr = { "user-agent": yr };
}
var wr = (e3) => gr.get(e3);
var gr;
var vr;
function br(e3) {
  return void 0 !== e3 ? dn(e3) : (vr || (vr = /* @__PURE__ */ new WeakMap()), (e4, t2, n2, o2) => {
    let r2;
    return (r2 = vr.get(t2)) || (!(function(e5, t3) {
      if ("string" != typeof e5) throw Tr("".concat(t3, " must be a string"), Sr);
      if (0 === e5.length) throw Tr("".concat(t3, " must not be empty"), _r);
    })(t2.client_secret, '"metadata.client_secret"'), r2 = dn(t2.client_secret), vr.set(t2, r2)), r2(e4, t2, n2, o2);
  });
}
var kr = Ut;
var _r = "ERR_INVALID_ARG_VALUE";
var Sr = "ERR_INVALID_ARG_TYPE";
function Tr(e3, t2, n2) {
  const o2 = new TypeError(e3, { cause: n2 });
  return Object.assign(o2, { code: t2 }), o2;
}
function Er(e3) {
  return (async function(e4) {
    return nn(e4, "codeVerifier"), Xt(await crypto.subtle.digest("SHA-256", Jt(e4)));
  })(e3);
}
function Pr() {
  return rn();
}
var Ar = class extends Error {
  constructor(e3, t2) {
    var n2;
    super(e3, t2), u(this, "code", void 0), this.name = this.constructor.name, this.code = null == t2 ? void 0 : t2.code, null === (n2 = Error.captureStackTrace) || void 0 === n2 || n2.call(Error, this, this.constructor);
  }
};
function Ir(e3, t2, n2) {
  return new Ar(e3, { cause: t2, code: n2 });
}
function Rr(e3) {
  if (e3 instanceof TypeError || e3 instanceof Ar || e3 instanceof gn || e3 instanceof vn || e3 instanceof bn) throw e3;
  if (e3 instanceof Ft) switch (e3.code) {
    case eo:
      throw Ir("only requests to HTTPS are allowed", e3, e3.code);
    case to:
      throw Ir("only requests to HTTP or HTTPS are allowed", e3, e3.code);
    case $n:
      throw Ir("unexpected HTTP response status code", e3.cause, e3.code);
    case Qn:
      throw Ir("unexpected response content-type", e3.cause, e3.code);
    case Bn:
      throw Ir("parsing error occured", e3, e3.code);
    case qn:
      throw Ir("invalid response encountered", e3, e3.code);
    case oo:
      throw Ir("unexpected JWT claim value encountered", e3, e3.code);
    case ro:
      throw Ir("unexpected JSON attribute value encountered", e3, e3.code);
    case no:
      throw Ir("JWT timestamp claim value failed validation", e3, e3.code);
    default:
      throw Ir(e3.message, e3, e3.code);
  }
  if (e3 instanceof Vt) throw Ir("unsupported operation", e3, e3.code);
  if (e3 instanceof DOMException) switch (e3.name) {
    case "OperationError":
      throw Ir("runtime operation error", e3, Gn);
    case "NotSupportedError":
      throw Ir("runtime unsupported operation", e3, Gn);
    case "TimeoutError":
      throw Ir("operation timed out", e3, "OAUTH_TIMEOUT");
    case "AbortError":
      throw Ir("operation aborted", e3, "OAUTH_ABORT");
  }
  throw new Ar("something went wrong", { cause: e3 });
}
async function xr(e3, t2, n2, o2, r2) {
  const i2 = await (async function(e4, t3) {
    var n3, o3;
    if (!(e4 instanceof URL)) throw Tr('"server" must be an instance of URL', Sr);
    const r3 = !e4.href.includes("/.well-known/"), i3 = null !== (n3 = null == t3 ? void 0 : t3.timeout) && void 0 !== n3 ? n3 : 30, a3 = AbortSignal.timeout(1e3 * i3), s3 = await (r3 ? en(e4, { algorithm: null == t3 ? void 0 : t3.algorithm, [Ut]: null == t3 ? void 0 : t3[kr], [Wt]: null == t3 || null === (o3 = t3.execute) || void 0 === o3 ? void 0 : o3.includes(Dr), signal: a3, headers: new Headers(mr) }) : ((null == t3 ? void 0 : t3[kr]) || fetch)((mn(e4, null == t3 || null === (c2 = t3.execute) || void 0 === c2 || !c2.includes(Dr)), e4.href), { headers: Object.fromEntries(new Headers(h({ accept: "application/json" }, mr)).entries()), body: void 0, method: "GET", redirect: "manual", signal: a3 })).then((e5) => (async function(e6, t4) {
      const n4 = e6;
      if (!(n4 instanceof URL) && n4 !== go) throw jt('"expectedIssuerIdentifier" must be an instance of URL', Ot);
      if (!xt(t4, Response)) throw jt('"response" must be an instance of Response', Ot);
      if (200 !== t4.status) throw Gt('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', $n, t4);
      so(t4);
      const o4 = await wo(t4);
      if (nn(o4.issuer, '"response" body "issuer" property', qn, { body: o4 }), n4 !== go && new URL(o4.issuer).href !== n4.href) throw Gt('"response" body "issuer" property does not match the expected value', ro, { expected: n4.href, body: o4, attribute: "issuer" });
      return o4;
    })(go, e5)).catch(Rr);
    var c2;
    r3 && new URL(s3.issuer).href !== e4.href && ((function(e5, t4, n4) {
      return !("https://login.microsoftonline.com" !== e5.origin || null != n4 && n4.algorithm && "oidc" !== n4.algorithm || (t4[Cr] = true, 0));
    })(e4, s3, t3) || (function(e5, t4) {
      return !(!e5.hostname.endsWith(".b2clogin.com") || null != t4 && t4.algorithm && "oidc" !== t4.algorithm);
    })(e4, t3) || (() => {
      throw new Ar("discovered metadata issuer does not match the expected issuer", { code: ro, cause: { expected: e4.href, body: s3, attribute: "issuer" } });
    })());
    return s3;
  })(e3, r2), a2 = new Or(i2, t2, n2, o2);
  let s2 = wr(a2);
  if (null != r2 && r2[kr] && (s2.fetch = r2[kr]), null != r2 && r2.timeout && (s2.timeout = r2.timeout), null != r2 && r2.execute) for (const e4 of r2.execute) e4(a2);
  return a2;
}
new TextDecoder();
var Cr = /* @__PURE__ */ Symbol();
var Or = class {
  constructor(e3, t2, n2, o2) {
    var r2, i2, a2, s2, c2;
    if ("string" != typeof t2 || !t2.length) throw Tr('"clientId" must be a non-empty string', Sr);
    if ("string" == typeof n2 && (n2 = { client_secret: n2 }), void 0 !== (null === (r2 = n2) || void 0 === r2 ? void 0 : r2.client_id) && t2 !== n2.client_id) throw Tr('"clientId" and "metadata.client_id" must be the same', _r);
    const u2 = h(h({}, structuredClone(n2)), {}, { client_id: t2 });
    let l2;
    u2[Kt] = null !== (i2 = null === (a2 = n2) || void 0 === a2 ? void 0 : a2[Kt]) && void 0 !== i2 ? i2 : 0, u2[Lt] = null !== (s2 = null === (c2 = n2) || void 0 === c2 ? void 0 : c2[Lt]) && void 0 !== s2 ? s2 : 30, l2 = o2 || ("string" == typeof u2.client_secret && u2.client_secret.length ? br(u2.client_secret) : (e4, t3, n3, o3) => {
      n3.set("client_id", t3.client_id);
    });
    let d2 = Object.freeze(u2);
    const p2 = structuredClone(e3);
    Cr in e3 && (p2[vo] = (t3) => {
      let n3 = t3.claims.tid;
      return e3.issuer.replace("{tenantid}", n3);
    });
    let f2 = Object.freeze(p2);
    gr || (gr = /* @__PURE__ */ new WeakMap()), gr.set(this, { __proto__: null, as: f2, c: d2, auth: l2, tlsOnly: true, jwksCache: {} });
  }
  serverMetadata() {
    const e3 = structuredClone(wr(this).as);
    return (function(e4) {
      Object.defineProperties(e4, /* @__PURE__ */ (function(e5) {
        return { supportsPKCE: { __proto__: null, value() {
          var t2;
          let n2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "S256";
          return true === (null === (t2 = e5.code_challenge_methods_supported) || void 0 === t2 ? void 0 : t2.includes(n2));
        } } };
      })(e4));
    })(e3), e3;
  }
  clientMetadata() {
    return structuredClone(wr(this).c);
  }
  get timeout() {
    return wr(this).timeout;
  }
  set timeout(e3) {
    wr(this).timeout = e3;
  }
  get [kr]() {
    return wr(this).fetch;
  }
  set [kr](e3) {
    wr(this).fetch = e3;
  }
};
function jr(e3) {
  Object.defineProperties(e3, (function(e4) {
    let t2;
    if (void 0 !== e4.expires_in) {
      const n2 = /* @__PURE__ */ new Date();
      n2.setSeconds(n2.getSeconds() + e4.expires_in), t2 = n2.getTime();
    }
    return { expiresIn: { __proto__: null, value() {
      if (t2) {
        const e5 = Date.now();
        return t2 > e5 ? Math.floor((t2 - e5) / 1e3) : 0;
      }
    } }, claims: { __proto__: null, value() {
      try {
        return Kn(this);
      } catch (e5) {
        return;
      }
    } } };
  })(e3));
}
async function Wr(e3, t2, n2) {
  var o2;
  let r2 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
  const i2 = null === (o2 = e3.headers.get("retry-after")) || void 0 === o2 ? void 0 : o2.trim();
  if (void 0 === i2) return;
  let a2;
  if (/^\d+$/.test(i2)) a2 = parseInt(i2, 10);
  else {
    const e4 = new Date(i2);
    if (Number.isFinite(e4.getTime())) {
      const t3 = /* @__PURE__ */ new Date(), n3 = e4.getTime() - t3.getTime();
      n3 > 0 && (a2 = Math.ceil(n3 / 1e3));
    }
  }
  if (r2 && !Number.isFinite(a2)) throw new Ft("invalid Retry-After header value", { cause: e3 });
  a2 > t2 && await Kr(a2 - t2, n2);
}
function Kr(e3, t2) {
  return new Promise((n2, o2) => {
    const r2 = (e4) => {
      try {
        t2.throwIfAborted();
      } catch (e5) {
        return void o2(e5);
      }
      if (e4 <= 0) return void n2();
      const i2 = Math.min(e4, 5);
      setTimeout(() => r2(e4 - i2), 1e3 * i2);
    };
    r2(e3);
  });
}
async function Lr(e3, t2) {
  Mr(e3);
  const n2 = wr(e3), o2 = n2.as, r2 = n2.c, i2 = n2.auth, a2 = n2.fetch, s2 = n2.tlsOnly, c2 = n2.timeout;
  return (async function(e4, t3, n3, o3, r3) {
    ln(e4), hn(t3);
    const i3 = wn(e4, "backchannel_authentication_endpoint", t3.use_mtls_endpoint_aliases, true !== (null == r3 ? void 0 : r3[Wt])), a3 = new URLSearchParams(o3);
    a3.set("client_id", t3.client_id);
    const s3 = qt(null == r3 ? void 0 : r3.headers);
    return s3.set("accept", "application/json"), Cn(e4, t3, n3, i3, a3, s3, r3);
  })(o2, r2, i2, t2, { [Ut]: a2, [Wt]: !s2, headers: new Headers(mr), signal: Xr(c2) }).then((e4) => (async function(e5, t3, n3) {
    if (ln(e5), hn(t3), !xt(n3, Response)) throw jt('"response" must be an instance of Response', Ot);
    await In(n3, 200, "Backchannel Authentication Endpoint"), so(n3);
    const o3 = await wo(n3);
    nn(o3.auth_req_id, '"response" body "auth_req_id" property', qn, { body: o3 });
    let r3 = "number" != typeof o3.expires_in ? parseFloat(o3.expires_in) : o3.expires_in;
    return tn(r3, true, '"response" body "expires_in" property', qn, { body: o3 }), o3.expires_in = r3, void 0 !== o3.interval && tn(o3.interval, false, '"response" body "interval" property', qn, { body: o3 }), o3;
  })(o2, r2, e4)).catch(Rr);
}
async function Ur(e3, t2, n2, o2) {
  var r2, i2;
  Mr(e3), n2 = new URLSearchParams(n2);
  let a2 = null !== (r2 = t2.interval) && void 0 !== r2 ? r2 : 5;
  const s2 = null !== (i2 = null == o2 ? void 0 : o2.signal) && void 0 !== i2 ? i2 : AbortSignal.timeout(1e3 * t2.expires_in);
  try {
    await Kr(a2, s2);
  } catch (e4) {
    Rr(e4);
  }
  const c2 = wr(e3), u2 = c2.as, l2 = c2.c, d2 = c2.auth, p2 = c2.fetch, f2 = c2.tlsOnly, m2 = c2.nonRepudiation, y2 = c2.timeout, w2 = c2.decrypt, g2 = (r3, i3) => Ur(e3, h(h({}, t2), {}, { interval: r3 }), n2, h(h({}, o2), {}, { signal: s2, flag: i3 })), v2 = (function(e4, t3) {
    const n3 = Xr(t3);
    if (!n3) return { signal: e4, cleanup() {
    } };
    const o3 = new AbortController(), r3 = (e5) => {
      const t4 = e5.target;
      o3.abort(t4.reason);
    };
    return e4.aborted ? o3.abort(e4.reason) : n3.aborted ? o3.abort(n3.reason) : (e4.addEventListener("abort", r3, { once: true }), n3.addEventListener("abort", r3, { once: true })), { signal: o3.signal, cleanup() {
      e4.removeEventListener("abort", r3), n3.removeEventListener("abort", r3);
    } };
  })(s2, y2), b2 = await (async function(e4, t3, n3, o3, r3) {
    ln(e4), hn(t3), nn(o3, '"authReqId"');
    const i3 = new URLSearchParams(null == r3 ? void 0 : r3.additionalParameters);
    return i3.set("auth_req_id", o3), On(e4, t3, n3, "urn:openid:params:grant-type:ciba", i3, r3);
  })(u2, l2, d2, t2.auth_req_id, { [Ut]: p2, [Wt]: !f2, additionalParameters: n2, DPoP: null == o2 ? void 0 : o2.DPoP, headers: new Headers(mr), signal: v2.signal }).catch(Rr).finally(v2.cleanup);
  var k2;
  if (503 === b2.status && b2.headers.has("retry-after")) return await Wr(b2, a2, s2, true), await (null === (k2 = b2.body) || void 0 === k2 ? void 0 : k2.cancel()), g2(a2);
  const _2 = (async function(e4, t3, n3, o3) {
    return Ln(e4, t3, n3, void 0, null == o3 ? void 0 : o3[Nt], null == o3 ? void 0 : o3.recognizedTokenTypes);
  })(u2, l2, b2, { [Nt]: w2 });
  let S2;
  try {
    S2 = await _2;
  } catch (e4) {
    if (Vr(e4, o2)) return g2(a2, Fr);
    if (e4 instanceof gn) switch (e4.error) {
      case "slow_down":
        a2 += 5;
      case "authorization_pending":
        return await Wr(e4.response, a2, s2), g2(a2);
    }
    Rr(e4);
  }
  return S2.id_token && await (null == m2 ? void 0 : m2(b2)), jr(S2), S2;
}
function Dr(e3) {
  wr(e3).tlsOnly = false;
}
async function Nr(e3, t2, n2, o2, r2) {
  if (Mr(e3), !((null == r2 ? void 0 : r2.flag) === Fr || t2 instanceof URL || (function(e4, t3) {
    try {
      return Object.getPrototypeOf(e4)[Symbol.toStringTag] === t3;
    } catch (e5) {
      return false;
    }
  })(t2, "Request"))) throw Tr('"currentUrl" must be an instance of URL, or Request', Sr);
  let i2, a2;
  const s2 = wr(e3), c2 = s2.as, u2 = s2.c, l2 = s2.auth, d2 = s2.fetch, f2 = s2.tlsOnly, m2 = s2.jarm, y2 = s2.hybrid, w2 = s2.nonRepudiation, g2 = s2.timeout, v2 = s2.decrypt, b2 = s2.implicit;
  if ((null == r2 ? void 0 : r2.flag) === Fr) i2 = r2.authResponse, a2 = r2.redirectUri;
  else {
    if (!(t2 instanceof URL)) {
      const e4 = t2;
      switch (t2 = new URL(t2.url), e4.method) {
        case "GET":
          break;
        case "POST":
          const n3 = new URLSearchParams(await lo(e4));
          if (y2) t2.hash = n3.toString();
          else for (const e5 of n3.entries()) {
            var k2 = p(e5, 2);
            const n4 = k2[0], o3 = k2[1];
            t2.searchParams.append(n4, o3);
          }
          break;
        default:
          throw Tr("unexpected Request HTTP method", _r);
      }
    }
    switch (a2 = (function(e4) {
      return (e4 = new URL(e4)).search = "", e4.hash = "", e4.href;
    })(t2), true) {
      case !!m2:
        i2 = await m2(t2, null == n2 ? void 0 : n2.expectedState);
        break;
      case !!y2:
        i2 = await y2(t2, null == n2 ? void 0 : n2.expectedNonce, null == n2 ? void 0 : n2.expectedState, null == n2 ? void 0 : n2.maxAge);
        break;
      case !!b2:
        throw new TypeError("authorizationCodeGrant() cannot be used by response_type=id_token clients");
      default:
        try {
          i2 = yo(c2, u2, t2.searchParams, null == n2 ? void 0 : n2.expectedState);
        } catch (e4) {
          Rr(e4);
        }
    }
  }
  const _2 = await (async function(e4, t3, n3, o3, r3, i3, a3) {
    if (ln(e4), hn(t3), !Nn.has(o3)) throw jt('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', Ct);
    nn(r3, '"redirectUri"');
    const s3 = po(o3, "code");
    if (!s3) throw Gt('no authorization code in "callbackParameters"', qn);
    const c3 = new URLSearchParams(null == a3 ? void 0 : a3.additionalParameters);
    return c3.set("redirect_uri", r3), c3.set("code", s3), i3 !== Hn && (nn(i3, '"codeVerifier"'), c3.set("code_verifier", i3)), On(e4, t3, n3, "authorization_code", c3, a3);
  })(c2, u2, l2, i2, a2, (null == n2 ? void 0 : n2.pkceCodeVerifier) || Hn, { additionalParameters: o2, [Ut]: d2, [Wt]: !f2, DPoP: null == r2 ? void 0 : r2.DPoP, headers: new Headers(mr), signal: Xr(g2) }).catch(Rr);
  "string" != typeof (null == n2 ? void 0 : n2.expectedNonce) && "number" != typeof (null == n2 ? void 0 : n2.maxAge) || (n2.idTokenExpected = true);
  const S2 = Xn(c2, u2, _2, { expectedNonce: null == n2 ? void 0 : n2.expectedNonce, maxAge: null == n2 ? void 0 : n2.maxAge, requireIdToken: null == n2 ? void 0 : n2.idTokenExpected, [Nt]: v2 });
  let T2;
  try {
    T2 = await S2;
  } catch (t3) {
    if (Vr(t3, r2)) return Nr(e3, void 0, n2, o2, h(h({}, r2), {}, { flag: Fr, authResponse: i2, redirectUri: a2 }));
    Rr(t3);
  }
  return T2.id_token && await (null == w2 ? void 0 : w2(_2)), jr(T2), T2;
}
async function Hr(e3, t2, n2, o2) {
  Mr(e3), n2 = new URLSearchParams(n2);
  const r2 = wr(e3), i2 = r2.as, a2 = r2.c, s2 = r2.auth, c2 = r2.fetch, u2 = r2.tlsOnly, l2 = r2.nonRepudiation, d2 = r2.timeout, p2 = r2.decrypt, f2 = await (async function(e4, t3, n3, o3, r3) {
    ln(e4), hn(t3), nn(o3, '"refreshToken"');
    const i3 = new URLSearchParams(null == r3 ? void 0 : r3.additionalParameters);
    return i3.set("refresh_token", o3), On(e4, t3, n3, "refresh_token", i3, r3);
  })(i2, a2, s2, t2, { [Ut]: c2, [Wt]: !u2, additionalParameters: n2, DPoP: null == o2 ? void 0 : o2.DPoP, headers: new Headers(mr), signal: Xr(d2) }).catch(Rr), m2 = (async function(e4, t3, n3, o3) {
    return Ln(e4, t3, n3, void 0, null == o3 ? void 0 : o3[Nt], null == o3 ? void 0 : o3.recognizedTokenTypes);
  })(i2, a2, f2, { [Nt]: p2 });
  let y2;
  try {
    y2 = await m2;
  } catch (r3) {
    if (Vr(r3, o2)) return Hr(e3, t2, n2, h(h({}, o2), {}, { flag: Fr }));
    Rr(r3);
  }
  return y2.id_token && await (null == l2 ? void 0 : l2(f2)), jr(y2), y2;
}
async function Zr(e3, t2, n2) {
  Mr(e3), t2 = new URLSearchParams(t2);
  const o2 = wr(e3), r2 = o2.as, i2 = o2.c, a2 = o2.auth, s2 = o2.fetch, c2 = o2.tlsOnly, u2 = o2.timeout, l2 = await (async function(e4, t3, n3, o3, r3) {
    return ln(e4), hn(t3), On(e4, t3, n3, "client_credentials", new URLSearchParams(o3), r3);
  })(r2, i2, a2, t2, { [Ut]: s2, [Wt]: !c2, DPoP: null == n2 ? void 0 : n2.DPoP, headers: new Headers(mr), signal: Xr(u2) }).catch(Rr), d2 = (async function(e4, t3, n3, o3) {
    return Ln(e4, t3, n3, void 0, null == o3 ? void 0 : o3[Nt], null == o3 ? void 0 : o3.recognizedTokenTypes);
  })(r2, i2, l2);
  let p2;
  try {
    p2 = await d2;
  } catch (o3) {
    if (Vr(o3, n2)) return Zr(e3, t2, h(h({}, n2), {}, { flag: Fr }));
    Rr(o3);
  }
  return jr(p2), p2;
}
function Jr(e3, t2) {
  Mr(e3);
  const n2 = wr(e3), o2 = n2.as, r2 = n2.c, i2 = n2.tlsOnly, a2 = n2.hybrid, s2 = n2.jarm, c2 = n2.implicit, u2 = wn(o2, "authorization_endpoint", false, i2);
  if ((t2 = new URLSearchParams(t2)).has("client_id") || t2.set("client_id", r2.client_id), !t2.has("request_uri") && !t2.has("request")) {
    if (t2.has("response_type") || t2.set("response_type", a2 ? "code id_token" : c2 ? "id_token" : "code"), c2 && !t2.has("nonce")) throw Tr("response_type=id_token clients must provide a nonce parameter in their authorization request parameters", _r);
    s2 && t2.set("response_mode", "jwt");
  }
  for (const e4 of t2.entries()) {
    var l2 = p(e4, 2);
    const t3 = l2[0], n3 = l2[1];
    u2.searchParams.append(t3, n3);
  }
  return u2;
}
async function zr(e3, t2, n2) {
  Mr(e3);
  const o2 = Jr(e3, t2), r2 = wr(e3), i2 = r2.as, a2 = r2.c, s2 = r2.auth, c2 = r2.fetch, u2 = r2.tlsOnly, l2 = r2.timeout, d2 = await (async function(e4, t3, n3, o3, r3) {
    var i3;
    ln(e4), hn(t3);
    const a3 = wn(e4, "pushed_authorization_request_endpoint", t3.use_mtls_endpoint_aliases, true !== (null == r3 ? void 0 : r3[Wt])), s3 = new URLSearchParams(o3);
    s3.set("client_id", t3.client_id);
    const c3 = qt(null == r3 ? void 0 : r3.headers);
    c3.set("accept", "application/json"), void 0 !== (null == r3 ? void 0 : r3.DPoP) && (Rn(r3.DPoP), await r3.DPoP.addProof(a3, c3, "POST"));
    const u3 = await Cn(e4, t3, n3, a3, s3, c3, r3);
    return null == r3 || null === (i3 = r3.DPoP) || void 0 === i3 || i3.cacheNonce(u3, a3), u3;
  })(i2, a2, s2, o2.searchParams, { [Ut]: c2, [Wt]: !u2, DPoP: null == n2 ? void 0 : n2.DPoP, headers: new Headers(mr), signal: Xr(l2) }).catch(Rr), p2 = (async function(e4, t3, n3) {
    if (ln(e4), hn(t3), !xt(n3, Response)) throw jt('"response" must be an instance of Response', Ot);
    await In(n3, 201, "Pushed Authorization Request Endpoint"), so(n3);
    const o3 = await wo(n3);
    nn(o3.request_uri, '"response" body "request_uri" property', qn, { body: o3 });
    let r3 = "number" != typeof o3.expires_in ? parseFloat(o3.expires_in) : o3.expires_in;
    return tn(r3, true, '"response" body "expires_in" property', qn, { body: o3 }), o3.expires_in = r3, o3;
  })(i2, a2, d2);
  let f2;
  try {
    f2 = await p2;
  } catch (o3) {
    if (Vr(o3, n2)) return zr(e3, t2, h(h({}, n2), {}, { flag: Fr }));
    Rr(o3);
  }
  return Jr(e3, { request_uri: f2.request_uri });
}
function Mr(e3) {
  if (!(e3 instanceof Or)) throw Tr('"config" must be an instance of Configuration', Sr);
  if (Object.getPrototypeOf(e3) !== Or.prototype) throw Tr("subclassing Configuration is not allowed", _r);
}
function Xr(e3) {
  return e3 ? AbortSignal.timeout(1e3 * e3) : void 0;
}
function Vr(e3, t2) {
  return !(null == t2 || !t2.DPoP || t2.flag === Fr) && (function(e4) {
    if (e4 instanceof bn) {
      const t3 = e4.cause, n2 = t3[0];
      return 1 === t3.length && "dpop" === n2.scheme && "use_dpop_nonce" === n2.parameters.error;
    }
    return e4 instanceof gn && "use_dpop_nonce" === e4.error;
  })(e3);
}
Object.freeze(Or.prototype);
var Fr = /* @__PURE__ */ Symbol();
async function Gr(e3, t2, n2, o2) {
  Mr(e3);
  const r2 = wr(e3), i2 = r2.as, a2 = r2.c, s2 = r2.auth, c2 = r2.fetch, u2 = r2.tlsOnly, l2 = r2.timeout, d2 = r2.decrypt, p2 = r2.nonRepudiation, f2 = await (async function(e4, t3, n3, o3, r3, i3) {
    return ln(e4), hn(t3), nn(o3, '"grantType"'), On(e4, t3, n3, o3, new URLSearchParams(r3), i3);
  })(i2, a2, s2, t2, new URLSearchParams(n2), { [Ut]: c2, [Wt]: !u2, DPoP: null == o2 ? void 0 : o2.DPoP, headers: new Headers(mr), signal: Xr(l2) }).catch(Rr);
  let m2;
  "urn:ietf:params:oauth:grant-type:token-exchange" === t2 && (m2 = { n_a: () => {
  } });
  const y2 = (async function(e4, t3, n3, o3) {
    return Ln(e4, t3, n3, void 0, null == o3 ? void 0 : o3[Nt], null == o3 ? void 0 : o3.recognizedTokenTypes);
  })(i2, a2, f2, { [Nt]: d2, recognizedTokenTypes: m2 });
  let w2;
  try {
    w2 = await y2;
  } catch (r3) {
    if (Vr(r3, o2)) return Gr(e3, t2, n2, h(h({}, o2), {}, { flag: Fr }));
    Rr(r3);
  }
  return w2.id_token && await (null == p2 ? void 0 : p2(f2)), jr(w2), w2;
}
async function Yr(e3, t2, n2) {
  if (!Fo(e3)) throw new Lo("Flattened JWS must be an object");
  if (void 0 === e3.protected && void 0 === e3.header) throw new Lo('Flattened JWS must have either of the "protected" or "header" members');
  if (void 0 !== e3.protected && "string" != typeof e3.protected) throw new Lo("JWS Protected Header incorrect type");
  if (void 0 === e3.payload) throw new Lo("JWS Payload missing");
  if ("string" != typeof e3.signature) throw new Lo("JWS Signature missing or incorrect type");
  if (void 0 !== e3.header && !Fo(e3.header)) throw new Lo("JWS Unprotected Header incorrect type");
  let o2 = {};
  if (e3.protected) try {
    const t3 = To(e3.protected);
    o2 = JSON.parse(ko.decode(t3));
  } catch (e4) {
    throw new Lo("JWS Protected Header is invalid");
  }
  if (!(function() {
    for (var e4 = arguments.length, t3 = new Array(e4), n3 = 0; n3 < e4; n3++) t3[n3] = arguments[n3];
    const o3 = t3.filter(Boolean);
    if (0 === o3.length || 1 === o3.length) return true;
    let r3;
    for (const e5 of o3) {
      const t4 = Object.keys(e5);
      if (r3 && 0 !== r3.size) for (const e6 of t4) {
        if (r3.has(e6)) return false;
        r3.add(e6);
      }
      else r3 = new Set(t4);
    }
    return true;
  })(o2, e3.header)) throw new Lo("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
  const r2 = h(h({}, o2), e3.header), i2 = (function(e4, t3, n3, o3, r3) {
    if (void 0 !== r3.crit && void 0 === (null == o3 ? void 0 : o3.crit)) throw new e4('"crit" (Critical) Header Parameter MUST be integrity protected');
    if (!o3 || void 0 === o3.crit) return /* @__PURE__ */ new Set();
    if (!Array.isArray(o3.crit) || 0 === o3.crit.length || o3.crit.some((e5) => "string" != typeof e5 || 0 === e5.length)) throw new e4('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
    let i3;
    i3 = void 0 !== n3 ? new Map([...Object.entries(n3), ...t3.entries()]) : t3;
    for (const t4 of o3.crit) {
      if (!i3.has(t4)) throw new Ko('Extension Header Parameter "'.concat(t4, '" is not recognized'));
      if (void 0 === r3[t4]) throw new e4('Extension Header Parameter "'.concat(t4, '" is missing'));
      if (i3.get(t4) && void 0 === o3[t4]) throw new e4('Extension Header Parameter "'.concat(t4, '" MUST be integrity protected'));
    }
    return new Set(o3.crit);
  })(Lo, /* @__PURE__ */ new Map([["b64", true]]), null == n2 ? void 0 : n2.crit, o2, r2);
  let a2 = true;
  if (i2.has("b64") && (a2 = o2.b64, "boolean" != typeof a2)) throw new Lo('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
  const s2 = r2.alg;
  if ("string" != typeof s2 || !s2) throw new Lo('JWS "alg" (Algorithm) Header Parameter missing or invalid');
  const c2 = n2 && (function(e4, t3) {
    if (void 0 !== t3 && (!Array.isArray(t3) || t3.some((e5) => "string" != typeof e5))) throw new TypeError('"'.concat(e4, '" option must be an array of strings'));
    if (t3) return new Set(t3);
  })("algorithms", n2.algorithms);
  if (c2 && !c2.has(s2)) throw new Wo('"alg" (Algorithm) Header Parameter value not allowed');
  if (a2) {
    if ("string" != typeof e3.payload) throw new Lo("JWS Payload must be a string");
  } else if ("string" != typeof e3.payload && !(e3.payload instanceof Uint8Array)) throw new Lo("JWS Payload must be a string or an Uint8Array instance");
  let u2 = false;
  "function" == typeof t2 && (t2 = await t2(o2, e3), u2 = true), dr(s2, t2, "verify");
  const l2 = (function() {
    for (var e4 = arguments.length, t3 = new Array(e4), n3 = 0; n3 < e4; n3++) t3[n3] = arguments[n3];
    const o3 = t3.reduce((e5, t4) => e5 + t4.length, 0), r3 = new Uint8Array(o3);
    let i3 = 0;
    for (const e5 of t3) r3.set(e5, i3), i3 += e5.length;
    return r3;
  })(void 0 !== e3.protected ? _o(e3.protected) : new Uint8Array(), _o("."), "string" == typeof e3.payload ? a2 ? _o(e3.payload) : bo.encode(e3.payload) : e3.payload), d2 = Vo(e3.signature, "signature", Lo), p2 = await nr(t2, s2);
  if (!await Bo(s2, p2, d2, l2)) throw new Jo();
  let f2;
  f2 = a2 ? Vo(e3.payload, "payload", Lo) : "string" == typeof e3.payload ? bo.encode(e3.payload) : e3.payload;
  const m2 = { payload: f2 };
  return void 0 !== e3.protected && (m2.protectedHeader = o2), void 0 !== e3.header && (m2.unprotectedHeader = e3.header), u2 ? h(h({}, m2), {}, { key: p2 }) : m2;
}
var Br = 86400;
var qr = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
function Qr(e3) {
  const t2 = qr.exec(e3);
  if (!t2 || t2[4] && t2[1]) throw new TypeError("Invalid time period format");
  const n2 = parseFloat(t2[2]);
  let o2;
  switch (t2[3].toLowerCase()) {
    case "sec":
    case "secs":
    case "second":
    case "seconds":
    case "s":
      o2 = Math.round(n2);
      break;
    case "minute":
    case "minutes":
    case "min":
    case "mins":
    case "m":
      o2 = Math.round(60 * n2);
      break;
    case "hour":
    case "hours":
    case "hr":
    case "hrs":
    case "h":
      o2 = Math.round(3600 * n2);
      break;
    case "day":
    case "days":
    case "d":
      o2 = Math.round(n2 * Br);
      break;
    case "week":
    case "weeks":
    case "w":
      o2 = Math.round(604800 * n2);
      break;
    default:
      o2 = Math.round(31557600 * n2);
  }
  return "-" === t2[1] || "ago" === t2[4] ? -o2 : o2;
}
var $r = (e3) => e3.includes("/") ? e3.toLowerCase() : "application/".concat(e3.toLowerCase());
function ei(e3, t2) {
  let n2, o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  try {
    n2 = JSON.parse(ko.decode(t2));
  } catch (e4) {
  }
  if (!Fo(n2)) throw new Uo("JWT Claims Set must be a top-level JSON object");
  const r2 = o2.typ;
  if (r2 && ("string" != typeof e3.typ || $r(e3.typ) !== $r(r2))) throw new Oo('unexpected "typ" JWT header value', n2, "typ", "check_failed");
  const i2 = o2.requiredClaims, a2 = void 0 === i2 ? [] : i2, s2 = o2.issuer, c2 = o2.subject, u2 = o2.audience, l2 = o2.maxTokenAge, h2 = [...a2];
  void 0 !== l2 && h2.push("iat"), void 0 !== u2 && h2.push("aud"), void 0 !== c2 && h2.push("sub"), void 0 !== s2 && h2.push("iss");
  for (const e4 of new Set(h2.reverse())) if (!(e4 in n2)) throw new Oo('missing required "'.concat(e4, '" claim'), n2, e4, "missing");
  if (s2 && !(Array.isArray(s2) ? s2 : [s2]).includes(n2.iss)) throw new Oo('unexpected "iss" claim value', n2, "iss", "check_failed");
  if (c2 && n2.sub !== c2) throw new Oo('unexpected "sub" claim value', n2, "sub", "check_failed");
  if (u2 && (d2 = n2.aud, p2 = "string" == typeof u2 ? [u2] : u2, !("string" == typeof d2 ? p2.includes(d2) : Array.isArray(d2) && p2.some(Set.prototype.has.bind(new Set(d2)))))) throw new Oo('unexpected "aud" claim value', n2, "aud", "check_failed");
  var d2, p2;
  let f2;
  switch (typeof o2.clockTolerance) {
    case "string":
      f2 = Qr(o2.clockTolerance);
      break;
    case "number":
      f2 = o2.clockTolerance;
      break;
    case "undefined":
      f2 = 0;
      break;
    default:
      throw new TypeError("Invalid clockTolerance option type");
  }
  const m2 = o2.currentDate, y2 = (w2 = m2 || /* @__PURE__ */ new Date(), Math.floor(w2.getTime() / 1e3));
  var w2;
  if ((void 0 !== n2.iat || l2) && "number" != typeof n2.iat) throw new Oo('"iat" claim must be a number', n2, "iat", "invalid");
  if (void 0 !== n2.nbf) {
    if ("number" != typeof n2.nbf) throw new Oo('"nbf" claim must be a number', n2, "nbf", "invalid");
    if (n2.nbf > y2 + f2) throw new Oo('"nbf" claim timestamp check failed', n2, "nbf", "check_failed");
  }
  if (void 0 !== n2.exp) {
    if ("number" != typeof n2.exp) throw new Oo('"exp" claim must be a number', n2, "exp", "invalid");
    if (n2.exp <= y2 - f2) throw new jo('"exp" claim timestamp check failed', n2, "exp", "check_failed");
  }
  if (l2) {
    const e4 = y2 - n2.iat;
    if (e4 - f2 > ("number" == typeof l2 ? l2 : Qr(l2))) throw new jo('"iat" claim timestamp check failed (too far in the past)', n2, "iat", "check_failed");
    if (e4 < 0 - f2) throw new Oo('"iat" claim timestamp check failed (it should be in the past)', n2, "iat", "check_failed");
  }
  return n2;
}
async function ti(e3, t2, n2) {
  var o2;
  const r2 = await (async function(e4, t3, n3) {
    if (e4 instanceof Uint8Array && (e4 = ko.decode(e4)), "string" != typeof e4) throw new Lo("Compact JWS must be a string or Uint8Array");
    const o3 = e4.split("."), r3 = o3[0], i3 = o3[1], a2 = o3[2];
    if (3 !== o3.length) throw new Lo("Invalid Compact JWS");
    const s2 = await Yr({ payload: i3, protected: r3, signature: a2 }, t3, n3), c2 = { payload: s2.payload, protectedHeader: s2.protectedHeader };
    return "function" == typeof t3 ? h(h({}, c2), {}, { key: s2.key }) : c2;
  })(e3, t2, n2);
  if (null !== (o2 = r2.protectedHeader.crit) && void 0 !== o2 && o2.includes("b64") && false === r2.protectedHeader.b64) throw new Uo("JWTs MUST NOT use unencoded payload");
  const i2 = { payload: ei(r2.protectedHeader, r2.payload, n2), protectedHeader: r2.protectedHeader };
  return "function" == typeof t2 ? h(h({}, i2), {}, { key: r2.key }) : i2;
}
function ni(e3) {
  return Fo(e3);
}
var oi;
var ri;
var ii = /* @__PURE__ */ new WeakMap();
var ai = /* @__PURE__ */ new WeakMap();
var si = class {
  constructor(e3) {
    if (s(this, ii, void 0), s(this, ai, /* @__PURE__ */ new WeakMap()), !(function(e4) {
      return e4 && "object" == typeof e4 && Array.isArray(e4.keys) && e4.keys.every(ni);
    })(e3)) throw new Do("JSON Web Key Set malformed");
    c(ii, this, structuredClone(e3));
  }
  jwks() {
    return a(ii, this);
  }
  async getKey(e3, t2) {
    const n2 = h(h({}, e3), null == t2 ? void 0 : t2.header), o2 = n2.alg, i2 = n2.kid, s2 = (function(e4) {
      switch ("string" == typeof e4 && e4.slice(0, 2)) {
        case "RS":
        case "PS":
          return "RSA";
        case "ES":
          return "EC";
        case "Ed":
          return "OKP";
        case "ML":
          return "AKP";
        default:
          throw new Ko('Unsupported "alg" value for a JSON Web Key Set');
      }
    })(o2), c2 = a(ii, this).keys.filter((e4) => {
      let t3 = s2 === e4.kty;
      if (t3 && "string" == typeof i2 && (t3 = i2 === e4.kid), !t3 || "string" != typeof e4.alg && "AKP" !== s2 || (t3 = o2 === e4.alg), t3 && "string" == typeof e4.use && (t3 = "sig" === e4.use), t3 && Array.isArray(e4.key_ops) && (t3 = e4.key_ops.includes("verify")), t3) switch (o2) {
        case "ES256":
          t3 = "P-256" === e4.crv;
          break;
        case "ES384":
          t3 = "P-384" === e4.crv;
          break;
        case "ES512":
          t3 = "P-521" === e4.crv;
          break;
        case "Ed25519":
        case "EdDSA":
          t3 = "Ed25519" === e4.crv;
      }
      return t3;
    }), u2 = c2[0], l2 = c2.length;
    if (0 === l2) throw new No();
    if (1 !== l2) {
      const e4 = new Ho(), t3 = a(ai, this);
      throw e4[Symbol.asyncIterator] = f(function* () {
        for (const e5 of c2) try {
          yield yield r(ci(t3, e5, o2));
        } catch (e6) {
        }
      }), e4;
    }
    return ci(a(ai, this), u2, o2);
  }
};
async function ci(e3, t2, n2) {
  const o2 = e3.get(t2) || e3.set(t2, {}).get(t2);
  if (void 0 === o2[n2]) {
    const e4 = await (async function(e5, t3, n3) {
      var o3;
      if (!Fo(e5)) throw new TypeError("JWK must be an object");
      let r2;
      switch (null != t3 || (t3 = e5.alg), null != r2 || (r2 = null !== (o3 = null == n3 ? void 0 : n3.extractable) && void 0 !== o3 ? o3 : e5.ext), e5.kty) {
        case "oct":
          if ("string" != typeof e5.k || !e5.k) throw new TypeError('missing "k" (Key Value) Parameter value');
          return To(e5.k);
        case "RSA":
          if ("oth" in e5 && void 0 !== e5.oth) throw new Ko('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
          return Qo(h(h({}, e5), {}, { alg: t3, ext: r2 }));
        case "AKP":
          if ("string" != typeof e5.alg || !e5.alg) throw new TypeError('missing "alg" (Algorithm) Parameter value');
          if (void 0 !== t3 && t3 !== e5.alg) throw new TypeError("JWK alg and alg option value mismatch");
          return Qo(h(h({}, e5), {}, { ext: r2 }));
        case "EC":
        case "OKP":
          return Qo(h(h({}, e5), {}, { alg: t3, ext: r2 }));
        default:
          throw new Ko('Unsupported "kty" (Key Type) Parameter value');
      }
    })(h(h({}, t2), {}, { ext: true }), n2);
    if (e4 instanceof Uint8Array || "public" !== e4.type) throw new Do("JSON Web Key Set members must be public keys");
    o2[n2] = e4;
  }
  return o2[n2];
}
function ui(e3) {
  const t2 = new si(e3), n2 = async (e4, n3) => t2.getKey(e4, n3);
  return Object.defineProperties(n2, { jwks: { value: () => structuredClone(t2.jwks()), enumerable: false, configurable: false, writable: false } }), n2;
}
var li;
if ("undefined" == typeof navigator || null === (oi = navigator.userAgent) || void 0 === oi || null === (ri = oi.startsWith) || void 0 === ri || !ri.call(oi, "Mozilla/5.0 ")) {
  const e3 = "v6.2.3";
  li = "".concat("jose", "/").concat(e3);
}
var hi = /* @__PURE__ */ Symbol();
var di = /* @__PURE__ */ Symbol();
var pi = /* @__PURE__ */ new WeakMap();
var fi = /* @__PURE__ */ new WeakMap();
var mi = /* @__PURE__ */ new WeakMap();
var yi = /* @__PURE__ */ new WeakMap();
var wi = /* @__PURE__ */ new WeakMap();
var gi = /* @__PURE__ */ new WeakMap();
var vi = /* @__PURE__ */ new WeakMap();
var bi = /* @__PURE__ */ new WeakMap();
var ki = /* @__PURE__ */ new WeakMap();
var _i = /* @__PURE__ */ new WeakMap();
var Si = class {
  constructor(e3, t2) {
    if (s(this, pi, void 0), s(this, fi, void 0), s(this, mi, void 0), s(this, yi, void 0), s(this, wi, void 0), s(this, gi, void 0), s(this, vi, void 0), s(this, bi, void 0), s(this, ki, void 0), s(this, _i, void 0), !(e3 instanceof URL)) throw new TypeError("url must be an instance of URL");
    var n2, o2;
    c(pi, this, new URL(e3.href)), c(fi, this, "number" == typeof (null == t2 ? void 0 : t2.timeoutDuration) ? null == t2 ? void 0 : t2.timeoutDuration : 5e3), c(mi, this, "number" == typeof (null == t2 ? void 0 : t2.cooldownDuration) ? null == t2 ? void 0 : t2.cooldownDuration : 3e4), c(yi, this, "number" == typeof (null == t2 ? void 0 : t2.cacheMaxAge) ? null == t2 ? void 0 : t2.cacheMaxAge : 6e5), c(vi, this, new Headers(null == t2 ? void 0 : t2.headers)), li && !a(vi, this).has("User-Agent") && a(vi, this).set("User-Agent", li), a(vi, this).has("accept") || (a(vi, this).set("accept", "application/json"), a(vi, this).append("accept", "application/jwk-set+json")), c(bi, this, null == t2 ? void 0 : t2[hi]), void 0 !== (null == t2 ? void 0 : t2[di]) && (c(_i, this, null == t2 ? void 0 : t2[di]), n2 = null == t2 ? void 0 : t2[di], o2 = a(yi, this), "object" == typeof n2 && null !== n2 && "uat" in n2 && "number" == typeof n2.uat && !(Date.now() - n2.uat >= o2) && "jwks" in n2 && Fo(n2.jwks) && Array.isArray(n2.jwks.keys) && Array.prototype.every.call(n2.jwks.keys, Fo) && (c(wi, this, a(_i, this).uat), c(ki, this, ui(a(_i, this).jwks))));
  }
  pendingFetch() {
    return !!a(gi, this);
  }
  coolingDown() {
    return "number" == typeof a(wi, this) && Date.now() < a(wi, this) + a(mi, this);
  }
  fresh() {
    return "number" == typeof a(wi, this) && Date.now() < a(wi, this) + a(yi, this);
  }
  jwks() {
    var e3;
    return null === (e3 = a(ki, this)) || void 0 === e3 ? void 0 : e3.jwks();
  }
  async getKey(e3, t2) {
    a(ki, this) && this.fresh() || await this.reload();
    try {
      return await a(ki, this).call(this, e3, t2);
    } catch (n2) {
      if (n2 instanceof No && false === this.coolingDown()) return await this.reload(), a(ki, this).call(this, e3, t2);
      throw n2;
    }
  }
  async reload() {
    a(gi, this) && ("undefined" != typeof WebSocketPair || "undefined" != typeof navigator && "Cloudflare-Workers" === navigator.userAgent || "undefined" != typeof EdgeRuntime && "vercel" === EdgeRuntime) && c(gi, this, void 0), a(gi, this) || c(gi, this, (async function(e3, t2, n2) {
      let o2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : fetch;
      const r2 = await o2(e3, { method: "GET", signal: n2, redirect: "manual", headers: t2 }).catch((e4) => {
        if ("TimeoutError" === e4.name) throw new Zo();
        throw e4;
      });
      if (200 !== r2.status) throw new Co("Expected 200 OK from the JSON Web Key Set HTTP response");
      try {
        return await r2.json();
      } catch (e4) {
        throw new Co("Failed to parse the JSON Web Key Set HTTP response as JSON");
      }
    })(a(pi, this).href, a(vi, this), AbortSignal.timeout(a(fi, this)), a(bi, this)).then((e3) => {
      c(ki, this, ui(e3)), a(_i, this) && (a(_i, this).uat = Date.now(), a(_i, this).jwks = e3), c(wi, this, Date.now()), c(gi, this, void 0);
    }).catch((e3) => {
      throw c(gi, this, void 0), e3;
    })), await a(gi, this);
  }
};
var Ti = ["mfaToken"];
var Ei = ["mfaToken"];
var Pi;
var Ai;
var Ii;
var Ri;
var xi;
var Ci;
var Oi;
var ji;
var Wi;
var Ki;
var Li;
var Ui;
var Di;
var Ni;
var Hi;
var Zi;
var Ji = class extends Error {
  constructor(e3, t2) {
    super(t2), u(this, "code", void 0), this.name = "NotSupportedError", this.code = e3;
  }
};
var zi = class extends Error {
  constructor(e3, t2, n2) {
    super(t2), u(this, "cause", void 0), u(this, "code", void 0), this.code = e3, this.cause = n2 && { error: n2.error, error_description: n2.error_description, message: n2.message };
  }
};
var Mi = class extends zi {
  constructor(e3, t2) {
    super("token_by_code_error", e3, t2), this.name = "TokenByCodeError";
  }
};
var Xi = class extends zi {
  constructor(e3, t2) {
    super("token_by_client_credentials_error", e3, t2), this.name = "TokenByClientCredentialsError";
  }
};
var Vi = class extends zi {
  constructor(e3, t2) {
    super("token_by_refresh_token_error", e3, t2), this.name = "TokenByRefreshTokenError";
  }
};
var Fi = class extends zi {
  constructor(e3, t2) {
    super("token_by_password_error", e3, t2), this.name = "TokenByPasswordError";
  }
};
var Gi = class extends zi {
  constructor(e3, t2) {
    super("token_for_connection_error", e3, t2), this.name = "TokenForConnectionErrorCode";
  }
};
var Yi = class extends zi {
  constructor(e3, t2) {
    super("token_exchange_error", e3, t2), this.name = "TokenExchangeError";
  }
};
var Bi = class extends Error {
  constructor(e3) {
    super(e3), u(this, "code", "verify_logout_token_error"), this.name = "VerifyLogoutTokenError";
  }
};
var qi = class extends zi {
  constructor(e3) {
    super("backchannel_authentication_error", "There was an error when trying to use Client-Initiated Backchannel Authentication.", e3), u(this, "code", "backchannel_authentication_error"), this.name = "BackchannelAuthenticationError";
  }
};
var Qi = class extends zi {
  constructor(e3) {
    super("build_authorization_url_error", "There was an error when trying to build the authorization URL.", e3), this.name = "BuildAuthorizationUrlError";
  }
};
var $i = class extends zi {
  constructor(e3) {
    super("build_link_user_url_error", "There was an error when trying to build the Link User URL.", e3), this.name = "BuildLinkUserUrlError";
  }
};
var ea = class extends zi {
  constructor(e3) {
    super("build_unlink_user_url_error", "There was an error when trying to build the Unlink User URL.", e3), this.name = "BuildUnlinkUserUrlError";
  }
};
var ta = class extends Error {
  constructor() {
    super("The client secret or client assertion signing key must be provided."), u(this, "code", "missing_client_auth_error"), this.name = "MissingClientAuthError";
  }
};
function na(e3) {
  return Object.entries(e3).filter((e4) => void 0 !== p(e4, 2)[1]).reduce((e4, t2) => h(h({}, e4), {}, { [t2[0]]: t2[1] }), {});
}
var oa = class extends Error {
  constructor(e3, t2, n2) {
    super(t2), u(this, "cause", void 0), u(this, "code", void 0), this.code = e3, this.cause = n2 && { error: n2.error, error_description: n2.error_description, message: n2.message };
  }
};
var ra = class extends oa {
  constructor(e3, t2) {
    super("mfa_list_authenticators_error", e3, t2), this.name = "MfaListAuthenticatorsError";
  }
};
var ia = class extends oa {
  constructor(e3, t2) {
    super("mfa_enrollment_error", e3, t2), this.name = "MfaEnrollmentError";
  }
};
var aa = class extends oa {
  constructor(e3, t2) {
    super("mfa_delete_authenticator_error", e3, t2), this.name = "MfaDeleteAuthenticatorError";
  }
};
var sa = class extends oa {
  constructor(e3, t2) {
    super("mfa_challenge_error", e3, t2), this.name = "MfaChallengeError";
  }
};
function ca(e3) {
  return { id: e3.id, authenticatorType: e3.authenticator_type, active: e3.active, name: e3.name, oobChannels: e3.oob_channels, type: e3.type };
}
var ua = (Pi = /* @__PURE__ */ new WeakMap(), Ai = /* @__PURE__ */ new WeakMap(), Ii = /* @__PURE__ */ new WeakMap(), class {
  constructor(e3) {
    var t2;
    s(this, Pi, void 0), s(this, Ai, void 0), s(this, Ii, void 0), c(Pi, this, "https://".concat(e3.domain)), c(Ai, this, e3.clientId), c(Ii, this, null !== (t2 = e3.customFetch) && void 0 !== t2 ? t2 : function() {
      return fetch(...arguments);
    });
  }
  async listAuthenticators(e3) {
    const t2 = "".concat(a(Pi, this), "/mfa/authenticators"), n2 = e3.mfaToken, o2 = await a(Ii, this).call(this, t2, { method: "GET", headers: { Authorization: "Bearer ".concat(n2), "Content-Type": "application/json" } });
    if (!o2.ok) {
      const e4 = await o2.json();
      throw new ra(e4.error_description || "Failed to list authenticators", e4);
    }
    return (await o2.json()).map(ca);
  }
  async enrollAuthenticator(e3) {
    const t2 = "".concat(a(Pi, this), "/mfa/associate"), n2 = e3.mfaToken, o2 = d(e3, Ti), r2 = { authenticator_types: o2.authenticatorTypes };
    "oobChannels" in o2 && (r2.oob_channels = o2.oobChannels), "phoneNumber" in o2 && o2.phoneNumber && (r2.phone_number = o2.phoneNumber), "email" in o2 && o2.email && (r2.email = o2.email);
    const i2 = await a(Ii, this).call(this, t2, { method: "POST", headers: { Authorization: "Bearer ".concat(n2), "Content-Type": "application/json" }, body: JSON.stringify(r2) });
    if (!i2.ok) {
      const e4 = await i2.json();
      throw new ia(e4.error_description || "Failed to enroll authenticator", e4);
    }
    return (function(e4) {
      if ("otp" === e4.authenticator_type) return { authenticatorType: "otp", secret: e4.secret, barcodeUri: e4.barcode_uri, recoveryCodes: e4.recovery_codes, id: e4.id };
      if ("oob" === e4.authenticator_type) return { authenticatorType: "oob", oobChannel: e4.oob_channel, oobCode: e4.oob_code, bindingMethod: e4.binding_method, id: e4.id, barcodeUri: e4.barcode_uri, recoveryCodes: e4.recovery_codes };
      throw new Error("Unexpected authenticator type: ".concat(e4.authenticator_type));
    })(await i2.json());
  }
  async deleteAuthenticator(e3) {
    const t2 = e3.authenticatorId, n2 = e3.mfaToken, o2 = "".concat(a(Pi, this), "/mfa/authenticators/").concat(encodeURIComponent(t2)), r2 = await a(Ii, this).call(this, o2, { method: "DELETE", headers: { Authorization: "Bearer ".concat(n2), "Content-Type": "application/json" } });
    if (!r2.ok) {
      const e4 = await r2.json();
      throw new aa(e4.error_description || "Failed to delete authenticator", e4);
    }
  }
  async challengeAuthenticator(e3) {
    const t2 = "".concat(a(Pi, this), "/mfa/challenge"), n2 = e3.mfaToken, o2 = d(e3, Ei), r2 = { mfa_token: n2, client_id: a(Ai, this), challenge_type: o2.challengeType };
    o2.authenticatorId && (r2.authenticator_id = o2.authenticatorId);
    const i2 = await a(Ii, this).call(this, t2, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r2) });
    if (!i2.ok) {
      const e4 = await i2.json();
      throw new sa(e4.error_description || "Failed to challenge authenticator", e4);
    }
    return (function(e4) {
      const t3 = { challengeType: e4.challenge_type };
      return void 0 !== e4.oob_code && (t3.oobCode = e4.oob_code), void 0 !== e4.binding_method && (t3.bindingMethod = e4.binding_method), t3;
    })(await i2.json());
  }
});
var la = class e2 {
  constructor(e3, t2, n2, o2, r2, i2, a2) {
    u(this, "accessToken", void 0), u(this, "idToken", void 0), u(this, "refreshToken", void 0), u(this, "expiresAt", void 0), u(this, "scope", void 0), u(this, "claims", void 0), u(this, "authorizationDetails", void 0), u(this, "tokenType", void 0), u(this, "issuedTokenType", void 0), this.accessToken = e3, this.idToken = n2, this.refreshToken = o2, this.expiresAt = t2, this.scope = r2, this.claims = i2, this.authorizationDetails = a2;
  }
  static fromTokenEndpointResponse(t2) {
    const n2 = t2.id_token ? t2.claims() : void 0, o2 = new e2(t2.access_token, Math.floor(Date.now() / 1e3) + Number(t2.expires_in), t2.id_token, t2.refresh_token, t2.scope, n2, t2.authorization_details);
    return o2.tokenType = t2.token_type, o2.issuedTokenType = t2.issued_token_type, o2;
  }
};
var ha = (Ri = /* @__PURE__ */ new WeakMap(), xi = /* @__PURE__ */ new WeakMap(), Ci = /* @__PURE__ */ new WeakMap(), class {
  constructor(e3, t2) {
    s(this, Ri, /* @__PURE__ */ new Map()), s(this, xi, void 0), s(this, Ci, void 0), c(Ci, this, Math.max(1, Math.floor(e3))), c(xi, this, Math.max(0, Math.floor(t2)));
  }
  get(e3) {
    const t2 = a(Ri, this).get(e3);
    if (t2) {
      if (!(Date.now() >= t2.expiresAt)) return a(Ri, this).delete(e3), a(Ri, this).set(e3, t2), t2.value;
      a(Ri, this).delete(e3);
    }
  }
  set(e3, t2) {
    for (a(Ri, this).has(e3) && a(Ri, this).delete(e3), a(Ri, this).set(e3, { value: t2, expiresAt: Date.now() + a(xi, this) }); a(Ri, this).size > a(Ci, this); ) {
      const e4 = a(Ri, this).keys().next().value;
      if (void 0 === e4) break;
      a(Ri, this).delete(e4);
    }
  }
});
var da = /* @__PURE__ */ new Map();
function pa(e3) {
  return { ttlMs: 1e3 * ("number" == typeof (null == e3 ? void 0 : e3.ttl) ? e3.ttl : 600), maxEntries: "number" == typeof (null == e3 ? void 0 : e3.maxEntries) && e3.maxEntries > 0 ? e3.maxEntries : 100 };
}
var fa = class {
  static createDiscoveryCache(e3) {
    const t2 = (n2 = e3.maxEntries, o2 = e3.ttlMs, "".concat(n2, ":").concat(o2));
    var n2, o2;
    let r2 = (i2 = t2, da.get(i2));
    var i2;
    return r2 || (r2 = new ha(e3.maxEntries, e3.ttlMs), da.set(t2, r2)), r2;
  }
  static createJwksCache() {
    return {};
  }
};
var ma = "openid profile email offline_access";
var ya = Object.freeze(/* @__PURE__ */ new Set(["grant_type", "client_id", "client_secret", "client_assertion", "client_assertion_type", "subject_token", "subject_token_type", "requested_token_type", "actor_token", "actor_token_type", "audience", "aud", "resource", "resources", "resource_indicator", "scope", "connection", "login_hint", "organization", "assertion"]));
function wa(e3) {
  if (null == e3) throw new Yi("subject_token is required");
  if ("string" != typeof e3) throw new Yi("subject_token must be a string");
  if (0 === e3.trim().length) throw new Yi("subject_token cannot be blank or whitespace");
  if (e3 !== e3.trim()) throw new Yi("subject_token must not include leading or trailing whitespace");
  if (/^bearer\s+/i.test(e3)) throw new Yi("subject_token must not include the 'Bearer ' prefix");
}
function ga(e3, t2) {
  if (t2) for (const o2 of Object.entries(t2)) {
    var n2 = p(o2, 2);
    const t3 = n2[0], r2 = n2[1];
    if (!ya.has(t3)) if (Array.isArray(r2)) {
      if (r2.length > 20) throw new Yi("Parameter '".concat(t3, "' exceeds maximum array size of ").concat(20));
      r2.forEach((n3) => {
        e3.append(t3, n3);
      });
    } else e3.append(t3, r2);
  }
}
var va = "urn:ietf:params:oauth:token-type:access_token";
var ba = (Oi = /* @__PURE__ */ new WeakMap(), ji = /* @__PURE__ */ new WeakMap(), Wi = /* @__PURE__ */ new WeakMap(), Ki = /* @__PURE__ */ new WeakMap(), Li = /* @__PURE__ */ new WeakMap(), Ui = /* @__PURE__ */ new WeakMap(), Di = /* @__PURE__ */ new WeakMap(), Ni = /* @__PURE__ */ new WeakMap(), Hi = /* @__PURE__ */ new WeakMap(), Zi = /* @__PURE__ */ new WeakSet(), class {
  constructor(e3) {
    var t2, n2, o2, r2;
    if ((function(e4, t3) {
      i(e4, t3), t3.add(e4);
    })(this, Zi), s(this, Oi, void 0), s(this, ji, void 0), s(this, Wi, void 0), s(this, Ki, void 0), s(this, Li, void 0), s(this, Ui, void 0), s(this, Di, void 0), s(this, Ni, void 0), s(this, Hi, void 0), u(this, "mfa", void 0), c(Ki, this, e3), e3.useMtls && !e3.customFetch) throw new Ji("mtls_without_custom_fetch_not_supported", "Using mTLS without a custom fetch implementation is not supported");
    c(Li, this, (function(e4, t3) {
      if (false === t3.enabled) return e4;
      const n3 = { name: t3.name, version: t3.version }, o3 = btoa(JSON.stringify(n3));
      return async (t4, n4) => {
        const r3 = t4 instanceof Request ? new Headers(t4.headers) : new Headers();
        return null != n4 && n4.headers && new Headers(n4.headers).forEach((e5, t5) => {
          r3.set(t5, e5);
        }), r3.set("Auth0-Client", o3), e4(t4, h(h({}, n4), {}, { headers: r3 }));
      };
    })(null !== (t2 = e3.customFetch) && void 0 !== t2 ? t2 : function() {
      return fetch(...arguments);
    }, false === (null == (n2 = e3.telemetry) ? void 0 : n2.enabled) ? n2 : { enabled: true, name: null !== (o2 = null == n2 ? void 0 : n2.name) && void 0 !== o2 ? o2 : "@auth0/auth0-auth-js", version: null !== (r2 = null == n2 ? void 0 : n2.version) && void 0 !== r2 ? r2 : "1.6.0" }));
    const l2 = pa(e3.discoveryCache);
    c(Di, this, fa.createDiscoveryCache(l2)), c(Ni, this, /* @__PURE__ */ new Map()), c(Hi, this, fa.createJwksCache()), this.mfa = new ua({ domain: a(Ki, this).domain, clientId: a(Ki, this).clientId, customFetch: a(Li, this) });
  }
  async getServerMetadata() {
    return (await o(Zi, this, Sa).call(this)).serverMetadata;
  }
  async buildAuthorizationUrl(e3) {
    const t2 = (await o(Zi, this, Sa).call(this)).serverMetadata;
    if (null != e3 && e3.pushedAuthorizationRequests && !t2.pushed_authorization_request_endpoint) throw new Ji("par_not_supported_error", "The Auth0 tenant does not have pushed authorization requests enabled. Learn how to enable it here: https://auth0.com/docs/get-started/applications/configure-par");
    try {
      return await o(Zi, this, Aa).call(this, e3);
    } catch (e4) {
      throw new Qi(e4);
    }
  }
  async buildLinkUserUrl(e3) {
    try {
      const t2 = await o(Zi, this, Aa).call(this, { authorizationParams: h(h({}, e3.authorizationParams), {}, { requested_connection: e3.connection, requested_connection_scope: e3.connectionScope, scope: "openid link_account offline_access", id_token_hint: e3.idToken }) });
      return { linkUserUrl: t2.authorizationUrl, codeVerifier: t2.codeVerifier };
    } catch (e4) {
      throw new $i(e4);
    }
  }
  async buildUnlinkUserUrl(e3) {
    try {
      const t2 = await o(Zi, this, Aa).call(this, { authorizationParams: h(h({}, e3.authorizationParams), {}, { requested_connection: e3.connection, scope: "openid unlink_account", id_token_hint: e3.idToken }) });
      return { unlinkUserUrl: t2.authorizationUrl, codeVerifier: t2.codeVerifier };
    } catch (e4) {
      throw new ea(e4);
    }
  }
  async backchannelAuthentication(e3) {
    const t2 = await o(Zi, this, Sa).call(this), n2 = t2.configuration, r2 = t2.serverMetadata, i2 = na(h(h({}, a(Ki, this).authorizationParams), null == e3 ? void 0 : e3.authorizationParams)), s2 = new URLSearchParams(h(h({ scope: ma }, i2), {}, { client_id: a(Ki, this).clientId, binding_message: e3.bindingMessage, login_hint: JSON.stringify({ format: "iss_sub", iss: r2.issuer, sub: e3.loginHint.sub }) }));
    e3.requestedExpiry && s2.append("requested_expiry", e3.requestedExpiry.toString()), e3.authorizationDetails && s2.append("authorization_details", JSON.stringify(e3.authorizationDetails));
    try {
      const e4 = await Lr(n2, s2), t3 = await Ur(n2, e4);
      return la.fromTokenEndpointResponse(t3);
    } catch (e4) {
      throw new qi(e4);
    }
  }
  async initiateBackchannelAuthentication(e3) {
    const t2 = await o(Zi, this, Sa).call(this), n2 = t2.configuration, r2 = t2.serverMetadata, i2 = na(h(h({}, a(Ki, this).authorizationParams), null == e3 ? void 0 : e3.authorizationParams)), s2 = new URLSearchParams(h(h({ scope: ma }, i2), {}, { client_id: a(Ki, this).clientId, binding_message: e3.bindingMessage, login_hint: JSON.stringify({ format: "iss_sub", iss: r2.issuer, sub: e3.loginHint.sub }) }));
    e3.requestedExpiry && s2.append("requested_expiry", e3.requestedExpiry.toString()), e3.authorizationDetails && s2.append("authorization_details", JSON.stringify(e3.authorizationDetails));
    try {
      const e4 = await Lr(n2, s2);
      return { authReqId: e4.auth_req_id, expiresIn: e4.expires_in, interval: e4.interval };
    } catch (e4) {
      throw new qi(e4);
    }
  }
  async backchannelAuthenticationGrant(e3) {
    let t2 = e3.authReqId;
    const n2 = (await o(Zi, this, Sa).call(this)).configuration, r2 = new URLSearchParams({ auth_req_id: t2 });
    try {
      const e4 = await Gr(n2, "urn:openid:params:grant-type:ciba", r2);
      return la.fromTokenEndpointResponse(e4);
    } catch (e4) {
      throw new qi(e4);
    }
  }
  async getTokenForConnection(e3) {
    var t2;
    if (e3.refreshToken && e3.accessToken) throw new Gi("Either a refresh or access token should be specified, but not both.");
    const n2 = null !== (t2 = e3.accessToken) && void 0 !== t2 ? t2 : e3.refreshToken;
    if (!n2) throw new Gi("Either a refresh or access token must be specified.");
    try {
      return await this.exchangeToken({ connection: e3.connection, subjectToken: n2, subjectTokenType: e3.accessToken ? va : "urn:ietf:params:oauth:token-type:refresh_token", loginHint: e3.loginHint });
    } catch (e4) {
      if (e4 instanceof Yi) throw new Gi(e4.message, e4.cause);
      throw e4;
    }
  }
  async exchangeToken(e3) {
    return "connection" in e3 ? o(Zi, this, Ta).call(this, e3) : o(Zi, this, Ea).call(this, e3);
  }
  async getTokenByCode(e3, t2) {
    const n2 = (await o(Zi, this, Sa).call(this)).configuration;
    try {
      const o2 = await Nr(n2, e3, { pkceCodeVerifier: t2.codeVerifier });
      return la.fromTokenEndpointResponse(o2);
    } catch (e4) {
      throw new Mi("There was an error while trying to request a token.", e4);
    }
  }
  async getTokenByRefreshToken(e3) {
    const t2 = (await o(Zi, this, Sa).call(this)).configuration, n2 = new URLSearchParams();
    e3.audience && n2.append("audience", e3.audience), e3.scope && n2.append("scope", e3.scope);
    try {
      const o2 = await Hr(t2, e3.refreshToken, n2);
      return la.fromTokenEndpointResponse(o2);
    } catch (e4) {
      throw new Vi("The access token has expired and there was an error while trying to refresh it.", e4);
    }
  }
  async getTokenByPassword(e3) {
    const t2 = (await o(Zi, this, Sa).call(this)).configuration, n2 = new URLSearchParams({ username: e3.username, password: e3.password });
    e3.audience && n2.append("audience", e3.audience), e3.scope && n2.append("scope", e3.scope), e3.realm && n2.append("realm", e3.realm);
    let r2 = t2;
    if (e3.auth0ForwardedFor) {
      const n3 = await o(Zi, this, Pa).call(this);
      r2 = new Or(t2.serverMetadata(), a(Ki, this).clientId, a(Ki, this).clientSecret, n3), r2[kr] = (t3, n4) => a(Li, this).call(this, t3, h(h({}, n4), {}, { headers: h(h({}, n4.headers), {}, { "auth0-forwarded-for": e3.auth0ForwardedFor }) }));
    }
    try {
      const e4 = await Gr(r2, "password", n2);
      return la.fromTokenEndpointResponse(e4);
    } catch (e4) {
      throw new Fi("There was an error while trying to request a token.", e4);
    }
  }
  async getTokenByClientCredentials(e3) {
    const t2 = (await o(Zi, this, Sa).call(this)).configuration;
    try {
      const n2 = new URLSearchParams({ audience: e3.audience });
      e3.organization && n2.append("organization", e3.organization);
      const o2 = await Zr(t2, n2);
      return la.fromTokenEndpointResponse(o2);
    } catch (e4) {
      throw new Xi("There was an error while trying to request a token.", e4);
    }
  }
  async buildLogoutUrl(e3) {
    const t2 = await o(Zi, this, Sa).call(this), n2 = t2.configuration;
    if (!t2.serverMetadata.end_session_endpoint) {
      const t3 = new URL("https://".concat(a(Ki, this).domain, "/v2/logout"));
      return t3.searchParams.set("returnTo", e3.returnTo), t3.searchParams.set("client_id", a(Ki, this).clientId), t3;
    }
    return (function(e4, t3) {
      Mr(e4);
      const n3 = wr(e4), o2 = n3.as, r2 = n3.c, i2 = wn(o2, "end_session_endpoint", false, n3.tlsOnly);
      (t3 = new URLSearchParams(t3)).has("client_id") || t3.set("client_id", r2.client_id);
      for (const e5 of t3.entries()) {
        var a2 = p(e5, 2);
        const t4 = a2[0], n4 = a2[1];
        i2.searchParams.append(t4, n4);
      }
      return i2;
    })(n2, { post_logout_redirect_uri: e3.returnTo });
  }
  async verifyLogoutToken(e3) {
    const t2 = (await o(Zi, this, Sa).call(this)).serverMetadata, n2 = pa(a(Ki, this).discoveryCache), r2 = t2.jwks_uri;
    a(Ui, this) || c(Ui, this, (function(e4, t3) {
      const n3 = new Si(e4, t3), o2 = async (e5, t4) => n3.getKey(e5, t4);
      return Object.defineProperties(o2, { coolingDown: { get: () => n3.coolingDown(), enumerable: true, configurable: false }, fresh: { get: () => n3.fresh(), enumerable: true, configurable: false }, reload: { value: () => n3.reload(), enumerable: true, configurable: false, writable: false }, reloading: { get: () => n3.pendingFetch(), enumerable: true, configurable: false }, jwks: { value: () => n3.jwks(), enumerable: true, configurable: false, writable: false } }), o2;
    })(new URL(r2), { cacheMaxAge: n2.ttlMs, [hi]: a(Li, this), [di]: a(Hi, this) }));
    const i2 = (await ti(e3.logoutToken, a(Ui, this), { issuer: t2.issuer, audience: a(Ki, this).clientId, algorithms: ["RS256"], requiredClaims: ["iat"] })).payload;
    if (!("sid" in i2) && !("sub" in i2)) throw new Bi('either "sid" or "sub" (or both) claims must be present');
    if ("sid" in i2 && "string" != typeof i2.sid) throw new Bi('"sid" claim must be a string');
    if ("sub" in i2 && "string" != typeof i2.sub) throw new Bi('"sub" claim must be a string');
    if ("nonce" in i2) throw new Bi('"nonce" claim is prohibited');
    if (!("events" in i2)) throw new Bi('"events" claim is missing');
    if ("object" != typeof i2.events || null === i2.events) throw new Bi('"events" claim must be an object');
    if (!("http://schemas.openid.net/event/backchannel-logout" in i2.events)) throw new Bi('"http://schemas.openid.net/event/backchannel-logout" member is missing in the "events" claim');
    if ("object" != typeof i2.events["http://schemas.openid.net/event/backchannel-logout"]) throw new Bi('"http://schemas.openid.net/event/backchannel-logout" member in the "events" claim must be an object');
    return { sid: i2.sid, sub: i2.sub };
  }
});
function ka() {
  const e3 = a(Ki, this).domain.toLowerCase();
  return "".concat(e3, "|mtls:").concat(a(Ki, this).useMtls ? "1" : "0");
}
async function _a(e3) {
  const t2 = await o(Zi, this, Pa).call(this), n2 = new Or(e3, a(Ki, this).clientId, a(Ki, this).clientSecret, t2);
  return n2[kr] = a(Li, this), n2;
}
async function Sa() {
  if (a(Oi, this) && a(ji, this)) return { configuration: a(Oi, this), serverMetadata: a(ji, this) };
  const e3 = o(Zi, this, ka).call(this), t2 = a(Di, this).get(e3);
  if (t2) return c(ji, this, t2.serverMetadata), c(Oi, this, await o(Zi, this, _a).call(this, t2.serverMetadata)), { configuration: a(Oi, this), serverMetadata: a(ji, this) };
  const n2 = a(Ni, this).get(e3);
  if (n2) {
    const e4 = await n2;
    return c(ji, this, e4.serverMetadata), c(Oi, this, await o(Zi, this, _a).call(this, e4.serverMetadata)), { configuration: a(Oi, this), serverMetadata: a(ji, this) };
  }
  const r2 = (async () => {
    const t3 = await o(Zi, this, Pa).call(this), n3 = await xr(new URL("https://".concat(a(Ki, this).domain)), a(Ki, this).clientId, { use_mtls_endpoint_aliases: a(Ki, this).useMtls }, t3, { [kr]: a(Li, this) }), r3 = n3.serverMetadata();
    return a(Di, this).set(e3, { serverMetadata: r3 }), { configuration: n3, serverMetadata: r3 };
  })(), i2 = r2.then((e4) => ({ serverMetadata: e4.serverMetadata }));
  i2.catch(() => {
  }), a(Ni, this).set(e3, i2);
  try {
    const e4 = await r2, t3 = e4.configuration, n3 = e4.serverMetadata;
    c(Oi, this, t3), c(ji, this, n3), a(Oi, this)[kr] = a(Li, this);
  } finally {
    a(Ni, this).delete(e3);
  }
  return { configuration: a(Oi, this), serverMetadata: a(ji, this) };
}
async function Ta(e3) {
  var t2, n2;
  const r2 = (await o(Zi, this, Sa).call(this)).configuration;
  if ("audience" in e3 || "resource" in e3) throw new Yi("audience and resource parameters are not supported for Token Vault exchanges");
  wa(e3.subjectToken);
  const i2 = new URLSearchParams({ connection: e3.connection, subject_token: e3.subjectToken, subject_token_type: null !== (t2 = e3.subjectTokenType) && void 0 !== t2 ? t2 : va, requested_token_type: null !== (n2 = e3.requestedTokenType) && void 0 !== n2 ? n2 : "http://auth0.com/oauth/token-type/federated-connection-access-token" });
  e3.loginHint && i2.append("login_hint", e3.loginHint), e3.scope && i2.append("scope", e3.scope), ga(i2, e3.extra);
  try {
    const e4 = await Gr(r2, "urn:auth0:params:oauth:grant-type:token-exchange:federated-connection-access-token", i2);
    return la.fromTokenEndpointResponse(e4);
  } catch (t3) {
    throw new Yi("Failed to exchange token for connection '".concat(e3.connection, "'."), t3);
  }
}
async function Ea(e3) {
  const t2 = (await o(Zi, this, Sa).call(this)).configuration;
  wa(e3.subjectToken);
  const n2 = new URLSearchParams({ subject_token_type: e3.subjectTokenType, subject_token: e3.subjectToken });
  e3.audience && n2.append("audience", e3.audience), e3.scope && n2.append("scope", e3.scope), e3.requestedTokenType && n2.append("requested_token_type", e3.requestedTokenType), e3.organization && n2.append("organization", e3.organization), ga(n2, e3.extra);
  try {
    const e4 = await Gr(t2, "urn:ietf:params:oauth:grant-type:token-exchange", n2);
    return la.fromTokenEndpointResponse(e4);
  } catch (t3) {
    throw new Yi("Failed to exchange token of type '".concat(e3.subjectTokenType, "'").concat(e3.audience ? " for audience '".concat(e3.audience, "'") : "", "."), t3);
  }
}
async function Pa() {
  return a(Wi, this) || c(Wi, this, (async () => {
    if (!a(Ki, this).clientSecret && !a(Ki, this).clientAssertionSigningKey && !a(Ki, this).useMtls) throw new ta();
    if (a(Ki, this).useMtls) return (e4, t2, n2, o2) => {
      n2.set("client_id", t2.client_id);
    };
    let e3 = a(Ki, this).clientAssertionSigningKey;
    return !e3 || e3 instanceof CryptoKey || (e3 = await (async function(e4, t2, n2) {
      if ("string" != typeof e4 || 0 !== e4.indexOf("-----BEGIN PRIVATE KEY-----")) throw new TypeError('"pkcs8" must be PKCS#8 formatted string');
      return ur(e4, t2, n2);
    })(e3, a(Ki, this).clientAssertionSigningAlg || "RS256")), e3 ? (function(e4, t2) {
      return pn(e4, t2);
    })(e3) : br(a(Ki, this).clientSecret);
  })().catch((e3) => {
    throw c(Wi, this, void 0), e3;
  })), a(Wi, this);
}
async function Aa(e3) {
  const t2 = (await o(Zi, this, Sa).call(this)).configuration, n2 = Pr(), r2 = await Er(n2), i2 = na(h(h({}, a(Ki, this).authorizationParams), null == e3 ? void 0 : e3.authorizationParams)), s2 = new URLSearchParams(h(h({ scope: ma }, i2), {}, { client_id: a(Ki, this).clientId, code_challenge: r2, code_challenge_method: "S256" }));
  return { authorizationUrl: null != e3 && e3.pushedAuthorizationRequests ? await zr(t2, s2) : await Jr(t2, s2), codeVerifier: n2 };
}
var Ia = class _Ia extends _ {
  constructor(e3, t2) {
    super(e3, t2), Object.setPrototypeOf(this, _Ia.prototype);
  }
  static fromPayload(e3) {
    let t2 = e3.error, n2 = e3.error_description;
    return new _Ia(t2, n2);
  }
};
var Ra = class _Ra extends Ia {
  constructor(e3, t2) {
    super(e3, t2), Object.setPrototypeOf(this, _Ra.prototype);
  }
};
var xa = class _xa extends Ia {
  constructor(e3, t2) {
    super(e3, t2), Object.setPrototypeOf(this, _xa.prototype);
  }
};
var Ca = class _Ca extends Ia {
  constructor(e3, t2) {
    super(e3, t2), Object.setPrototypeOf(this, _Ca.prototype);
  }
};
var Oa = class _Oa extends Ia {
  constructor(e3, t2) {
    super(e3, t2), Object.setPrototypeOf(this, _Oa.prototype);
  }
};
var ja = class _ja extends Ia {
  constructor(e3, t2) {
    super(e3, t2), Object.setPrototypeOf(this, _ja.prototype);
  }
};
var Wa = class {
  constructor() {
    let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 6e5;
    this.contexts = /* @__PURE__ */ new Map(), this.ttlMs = e3;
  }
  set(e3, t2) {
    this.cleanup(), this.contexts.set(e3, Object.assign(Object.assign({}, t2), { createdAt: Date.now() }));
  }
  get(e3) {
    const t2 = this.contexts.get(e3);
    if (t2) {
      if (!(Date.now() - t2.createdAt > this.ttlMs)) return t2;
      this.contexts.delete(e3);
    }
  }
  remove(e3) {
    this.contexts.delete(e3);
  }
  cleanup() {
    const e3 = Date.now();
    for (const n2 of this.contexts) {
      var t2 = p(n2, 2);
      const o2 = t2[0];
      e3 - t2[1].createdAt > this.ttlMs && this.contexts.delete(o2);
    }
  }
  get size() {
    return this.contexts.size;
  }
};
var Ka = class {
  constructor(e3, t2) {
    this.authJsMfaClient = e3, this.auth0Client = t2, this.contextManager = new Wa();
  }
  setMFAAuthDetails(e3, t2, n2, o2) {
    this.contextManager.set(e3, { scope: t2, audience: n2, mfaRequirements: o2 });
  }
  async getAuthenticators(e3) {
    var t2, n2;
    const o2 = this.contextManager.get(e3);
    if (!(null === (t2 = null == o2 ? void 0 : o2.mfaRequirements) || void 0 === t2 ? void 0 : t2.challenge) || 0 === o2.mfaRequirements.challenge.length) throw new Ra("invalid_request", "challengeType is required and must contain at least one challenge type, please check mfa_required error payload");
    const r2 = o2.mfaRequirements.challenge.map((e4) => e4.type);
    try {
      return (await this.authJsMfaClient.listAuthenticators({ mfaToken: e3 })).filter((e4) => !!e4.type && r2.includes(e4.type));
    } catch (e4) {
      if (e4 instanceof ra) throw new Ra(null === (n2 = e4.cause) || void 0 === n2 ? void 0 : n2.error, e4.message);
      throw e4;
    }
  }
  async enroll(e3) {
    var t2;
    const n2 = (function(e4) {
      const t3 = St[e4.factorType];
      return Object.assign(Object.assign(Object.assign({ mfaToken: e4.mfaToken, authenticatorTypes: t3.authenticatorTypes }, t3.oobChannels && { oobChannels: t3.oobChannels }), "phoneNumber" in e4 && { phoneNumber: e4.phoneNumber }), "email" in e4 && { email: e4.email });
    })(e3);
    try {
      return await this.authJsMfaClient.enrollAuthenticator(n2);
    } catch (e4) {
      if (e4 instanceof ia) throw new xa(null === (t2 = e4.cause) || void 0 === t2 ? void 0 : t2.error, e4.message);
      throw e4;
    }
  }
  async challenge(e3) {
    var t2;
    try {
      const t3 = { challengeType: e3.challengeType, mfaToken: e3.mfaToken };
      return e3.authenticatorId && (t3.authenticatorId = e3.authenticatorId), await this.authJsMfaClient.challengeAuthenticator(t3);
    } catch (e4) {
      if (e4 instanceof sa) throw new Ca(null === (t2 = e4.cause) || void 0 === t2 ? void 0 : t2.error, e4.message);
      throw e4;
    }
  }
  async getEnrollmentFactors(e3) {
    const t2 = this.contextManager.get(e3);
    if (!t2 || !t2.mfaRequirements) throw new ja("mfa_context_not_found", "MFA context not found for this MFA token. Please retry the original request to get a new MFA token.");
    return t2.mfaRequirements.enroll && 0 !== t2.mfaRequirements.enroll.length ? t2.mfaRequirements.enroll : [];
  }
  async verify(e3) {
    const t2 = this.contextManager.get(e3.mfaToken);
    if (!t2) throw new Oa("mfa_context_not_found", "MFA context not found for this MFA token. Please retry the original request to get a new MFA token.");
    const n2 = (function(e4) {
      return "otp" in e4 && e4.otp ? Tt : "oobCode" in e4 && e4.oobCode ? Et : "recoveryCode" in e4 && e4.recoveryCode ? Pt : void 0;
    })(e3);
    if (!n2) throw new Oa("invalid_request", "Unable to determine grant type. Provide one of: otp, oobCode, or recoveryCode.");
    const o2 = t2.scope, r2 = t2.audience;
    try {
      const t3 = await this.auth0Client._requestTokenForMfa({ grant_type: n2, mfaToken: e3.mfaToken, scope: o2, audience: r2, otp: e3.otp, oob_code: e3.oobCode, binding_code: e3.bindingCode, recovery_code: e3.recoveryCode });
      return this.contextManager.remove(e3.mfaToken), t3;
    } catch (e4) {
      if (e4 instanceof R) this.setMFAAuthDetails(e4.mfa_token, o2, r2, e4.mfa_requirements);
      else if (e4 instanceof Oa) throw new Oa(e4.error, e4.error_description);
      throw e4;
    }
  }
};
var La = class {
  constructor(e3) {
    let t2, n2;
    if (this.userCache = new Ue().enclosedCache, this.defaultOptions = { authorizationParams: { scope: "openid profile email" }, useRefreshTokensFallback: false, useFormData: true }, this.options = Object.assign(Object.assign(Object.assign({}, this.defaultOptions), e3), { authorizationParams: Object.assign(Object.assign({}, this.defaultOptions.authorizationParams), e3.authorizationParams) }), "undefined" != typeof window && (() => {
      if (!W()) throw new Error("For security reasons, `window.crypto` is required to run `auth0-spa-js`.");
      if (void 0 === W().subtle) throw new Error("\n      auth0-spa-js must run on a secure origin. See https://github.com/auth0/auth0-spa-js/blob/main/FAQ.md#why-do-i-get-auth0-spa-js-must-run-on-a-secure-origin for more information.\n    ");
    })(), this.lockManager = (ae || (ae = ie()), ae), e3.cache && e3.cacheLocation && console.warn("Both `cache` and `cacheLocation` options have been specified in the Auth0Client configuration; ignoring `cacheLocation` and using `cache`."), e3.cache) n2 = e3.cache;
    else {
      if (t2 = e3.cacheLocation || g, !pt(t2)) throw new Error('Invalid cache location "'.concat(t2, '"'));
      n2 = pt(t2)();
    }
    var o2;
    this.httpTimeoutMs = e3.httpTimeoutInSeconds ? 1e3 * e3.httpTimeoutInSeconds : w, this.cookieStorage = false === e3.legacySameSiteCookie ? qe : $e, this.orgHintCookieName = (o2 = this.options.clientId, "auth0.".concat(o2, ".organization_hint")), this.isAuthenticatedCookieName = ((e4) => "auth0.".concat(e4, ".is.authenticated"))(this.options.clientId), this.sessionCheckExpiryDays = e3.sessionCheckExpiryDays || 1;
    const r2 = e3.useCookiesForTransactions ? this.cookieStorage : et;
    var i2;
    this.scope = (function(e4, t3) {
      for (var n3 = arguments.length, o3 = new Array(n3 > 2 ? n3 - 2 : 0), r3 = 2; r3 < n3; r3++) o3[r3 - 2] = arguments[r3];
      if ("object" != typeof e4) return { [k]: Ce(t3, e4, ...o3) };
      let i3 = { [k]: Ce(t3, ...o3) };
      return Object.keys(e4).forEach((n4) => {
        const r4 = e4[n4];
        i3[n4] = Ce(t3, r4, ...o3);
      }), i3;
    })(this.options.authorizationParams.scope, "openid", this.options.useRefreshTokens ? "offline_access" : ""), this.transactionManager = new Ne(r2, this.options.clientId, this.options.cookieDomain), this.nowProvider = this.options.nowProvider || b, this.cacheManager = new De(n2, n2.allKeys ? void 0 : new lt(n2, this.options.clientId), this.nowProvider), this.dpop = this.options.useDpop ? new gt(this.options.clientId) : void 0, this.domainUrl = (i2 = this.options.domain, /^https?:\/\//.test(i2) ? i2 : "https://".concat(i2)), this.tokenIssuer = ((e4, t3) => e4 ? e4.startsWith("https://") ? e4 : "https://".concat(e4, "/") : "".concat(t3, "/"))(this.options.issuer, this.domainUrl);
    const a2 = "".concat(this.domainUrl, "/me/"), s2 = this.createFetcher(Object.assign(Object.assign({}, this.options.useDpop && { dpopNonceId: "__auth0_my_account_api__" }), { getAccessToken: () => this.getTokenSilently({ authorizationParams: { scope: "create:me:connected_accounts", audience: a2 }, detailedResponse: true }) }));
    this.myAccountApi = new kt(s2, a2), this.authJsClient = new ba({ domain: this.options.domain, clientId: this.options.clientId }), this.mfa = new Ka(this.authJsClient.mfa, this), "undefined" != typeof window && window.Worker && this.options.useRefreshTokens && t2 === g && (this.options.workerUrl ? this.worker = new Worker(this.options.workerUrl) : this.worker = new ct(), this.worker.postMessage({ type: "init", allowedBaseUrl: this.domainUrl }));
  }
  getConfiguration() {
    return Object.freeze({ domain: this.options.domain, clientId: this.options.clientId });
  }
  _url(e3) {
    const t2 = this.options.auth0Client || v, n2 = D(t2, true), o2 = encodeURIComponent(btoa(JSON.stringify(n2)));
    return "".concat(this.domainUrl).concat(e3, "&auth0Client=").concat(o2);
  }
  _authorizeUrl(e3) {
    return this._url("/authorize?".concat(N(e3)));
  }
  async _verifyIdToken(e3, t2, n2) {
    const o2 = await this.nowProvider();
    return Je({ iss: this.tokenIssuer, aud: this.options.clientId, id_token: e3, nonce: t2, organization: n2, leeway: this.options.leeway, max_age: (r2 = this.options.authorizationParams.max_age, "string" != typeof r2 ? r2 : parseInt(r2, 10) || void 0), now: o2 });
    var r2;
  }
  _processOrgHint(e3) {
    e3 ? this.cookieStorage.save(this.orgHintCookieName, e3, { daysUntilExpire: this.sessionCheckExpiryDays, cookieDomain: this.options.cookieDomain }) : this.cookieStorage.remove(this.orgHintCookieName, { cookieDomain: this.options.cookieDomain });
  }
  _extractSessionTransferToken(e3) {
    return new URLSearchParams(window.location.search).get(e3) || void 0;
  }
  _clearSessionTransferTokenFromUrl(e3) {
    try {
      const t2 = new URL(window.location.href);
      t2.searchParams.has(e3) && (t2.searchParams.delete(e3), window.history.replaceState({}, "", t2.toString()));
    } catch (e4) {
    }
  }
  _applySessionTransferToken(e3) {
    const t2 = this.options.sessionTransferTokenQueryParamName;
    if (!t2 || e3.session_transfer_token) return e3;
    const n2 = this._extractSessionTransferToken(t2);
    return n2 ? (this._clearSessionTransferTokenFromUrl(t2), Object.assign(Object.assign({}, e3), { session_transfer_token: n2 })) : e3;
  }
  async _prepareAuthorizeUrl(e3, t2, n2) {
    var o2;
    const r2 = L(K()), i2 = L(K()), a2 = K(), s2 = await H(a2), c2 = J(s2), u2 = await (null === (o2 = this.dpop) || void 0 === o2 ? void 0 : o2.calculateThumbprint()), l2 = ((e4, t3, n3, o3, r3, i3, a3, s3, c3) => Object.assign(Object.assign(Object.assign({ client_id: e4.clientId }, e4.authorizationParams), n3), { scope: Oe(t3, n3.scope, n3.audience), response_type: "code", response_mode: s3 || "query", state: o3, nonce: r3, redirect_uri: a3 || e4.authorizationParams.redirect_uri, code_challenge: i3, code_challenge_method: "S256", dpop_jkt: c3 }))(this.options, this.scope, e3, r2, i2, c2, e3.redirect_uri || this.options.authorizationParams.redirect_uri || n2, null == t2 ? void 0 : t2.response_mode, u2), h2 = this._authorizeUrl(l2);
    return { nonce: i2, code_verifier: a2, scope: l2.scope, audience: l2.audience || k, redirect_uri: l2.redirect_uri, state: r2, url: h2 };
  }
  async loginWithPopup(e3, t2) {
    var n2;
    if (e3 = e3 || {}, !(t2 = t2 || {}).popup && (t2.popup = ((e4) => {
      const t3 = window.screenX + (window.innerWidth - 400) / 2, n3 = window.screenY + (window.innerHeight - 600) / 2;
      return window.open(e4, "auth0:authorize:popup", "left=".concat(t3, ",top=").concat(n3, ",width=").concat(400, ",height=").concat(600, ",resizable,scrollbars=yes,status=1"));
    })(""), !t2.popup)) throw new I();
    const o2 = this._applySessionTransferToken(e3.authorizationParams || {}), r2 = await this._prepareAuthorizeUrl(o2, { response_mode: "web_message" }, window.location.origin);
    t2.popup.location.href = r2.url;
    const i2 = await ((e4, t3) => new Promise((n3, o3) => {
      let r3;
      const i3 = setInterval(() => {
        e4.popup && e4.popup.closed && (clearInterval(i3), clearTimeout(a3), window.removeEventListener("message", r3, false), o3(new A(e4.popup)));
      }, 1e3), a3 = setTimeout(() => {
        clearInterval(i3), o3(new P(e4.popup)), window.removeEventListener("message", r3, false);
      }, 1e3 * (e4.timeoutInSeconds || 60));
      r3 = function(s2) {
        if (s2.origin === t3 && s2.data && "authorization_response" === s2.data.type) {
          if (clearTimeout(a3), clearInterval(i3), window.removeEventListener("message", r3, false), false !== e4.closePopup && e4.popup.close(), s2.data.response.error) return o3(_.fromPayload(s2.data.response));
          n3(s2.data.response);
        }
      }, window.addEventListener("message", r3);
    }))(Object.assign(Object.assign({}, t2), { timeoutInSeconds: t2.timeoutInSeconds || this.options.authorizeTimeoutInSeconds || 60 }), new URL(r2.url).origin);
    if (r2.state !== i2.state) throw new _("state_mismatch", "Invalid state");
    const a2 = (null === (n2 = e3.authorizationParams) || void 0 === n2 ? void 0 : n2.organization) || this.options.authorizationParams.organization;
    await this._requestToken({ audience: r2.audience, scope: r2.scope, code_verifier: r2.code_verifier, grant_type: "authorization_code", code: i2.code, redirect_uri: r2.redirect_uri }, { nonceIn: r2.nonce, organization: a2 });
  }
  async getUser() {
    var e3;
    const t2 = await this._getIdTokenFromCache();
    return null === (e3 = null == t2 ? void 0 : t2.decodedToken) || void 0 === e3 ? void 0 : e3.user;
  }
  async getIdTokenClaims() {
    var e3;
    const t2 = await this._getIdTokenFromCache();
    return null === (e3 = null == t2 ? void 0 : t2.decodedToken) || void 0 === e3 ? void 0 : e3.claims;
  }
  async loginWithRedirect() {
    var t2;
    const n2 = ft(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}), o2 = n2.openUrl, r2 = n2.fragment, i2 = n2.appState, a2 = e(n2, ["openUrl", "fragment", "appState"]), s2 = (null === (t2 = a2.authorizationParams) || void 0 === t2 ? void 0 : t2.organization) || this.options.authorizationParams.organization, c2 = this._applySessionTransferToken(a2.authorizationParams || {}), u2 = await this._prepareAuthorizeUrl(c2), l2 = u2.url, h2 = e(u2, ["url"]);
    this.transactionManager.create(Object.assign(Object.assign(Object.assign({}, h2), { appState: i2, response_type: tt.Code }), s2 && { organization: s2 }));
    const d2 = r2 ? "".concat(l2, "#").concat(r2) : l2;
    o2 ? await o2(d2) : window.location.assign(d2);
  }
  async handleRedirectCallback() {
    const e3 = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.href).split("?").slice(1);
    if (0 === e3.length) throw new Error("There are no query params available for parsing.");
    const t2 = this.transactionManager.get();
    if (!t2) throw new _("missing_transaction", "Invalid state");
    this.transactionManager.remove();
    const n2 = ((e4) => {
      e4.indexOf("#") > -1 && (e4 = e4.substring(0, e4.indexOf("#")));
      const t3 = new URLSearchParams(e4);
      return { state: t3.get("state"), code: t3.get("code") || void 0, connect_code: t3.get("connect_code") || void 0, error: t3.get("error") || void 0, error_description: t3.get("error_description") || void 0 };
    })(e3.join(""));
    return t2.response_type === tt.ConnectCode ? this._handleConnectAccountRedirectCallback(n2, t2) : this._handleLoginRedirectCallback(n2, t2);
  }
  async _handleLoginRedirectCallback(e3, t2) {
    const n2 = e3.code, o2 = e3.state, r2 = e3.error, i2 = e3.error_description;
    if (r2) throw new S(r2, i2 || r2, o2, t2.appState);
    if (!t2.code_verifier || t2.state && t2.state !== o2) throw new _("state_mismatch", "Invalid state");
    const a2 = t2.organization, s2 = t2.nonce, c2 = t2.redirect_uri;
    return await this._requestToken(Object.assign({ audience: t2.audience, scope: t2.scope, code_verifier: t2.code_verifier, grant_type: "authorization_code", code: n2 }, c2 ? { redirect_uri: c2 } : {}), { nonceIn: s2, organization: a2 }), { appState: t2.appState, response_type: tt.Code };
  }
  async _handleConnectAccountRedirectCallback(e3, t2) {
    const n2 = e3.connect_code, o2 = e3.state, r2 = e3.error, i2 = e3.error_description;
    if (r2) throw new T(r2, i2 || r2, t2.connection, o2, t2.appState);
    if (!n2) throw new _("missing_connect_code", "Missing connect code");
    if (!(t2.code_verifier && t2.state && t2.auth_session && t2.redirect_uri && t2.state === o2)) throw new _("state_mismatch", "Invalid state");
    const a2 = await this.myAccountApi.completeAccount({ auth_session: t2.auth_session, connect_code: n2, redirect_uri: t2.redirect_uri, code_verifier: t2.code_verifier });
    return Object.assign(Object.assign({}, a2), { appState: t2.appState, response_type: tt.ConnectCode });
  }
  async checkSession(e3) {
    if (!this.cookieStorage.get(this.isAuthenticatedCookieName)) {
      if (!this.cookieStorage.get(ht)) return;
      this.cookieStorage.save(this.isAuthenticatedCookieName, true, { daysUntilExpire: this.sessionCheckExpiryDays, cookieDomain: this.options.cookieDomain }), this.cookieStorage.remove(ht);
    }
    try {
      await this.getTokenSilently(e3);
    } catch (e4) {
    }
  }
  async getTokenSilently() {
    let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    var t2, n2;
    const o2 = Object.assign(Object.assign({ cacheMode: "on" }, e3), { authorizationParams: Object.assign(Object.assign(Object.assign({}, this.options.authorizationParams), e3.authorizationParams), { scope: Oe(this.scope, null === (t2 = e3.authorizationParams) || void 0 === t2 ? void 0 : t2.scope, (null === (n2 = e3.authorizationParams) || void 0 === n2 ? void 0 : n2.audience) || this.options.authorizationParams.audience) }) }), r2 = await ((e4, t3) => {
      let n3 = ut[t3];
      return n3 || (n3 = e4().finally(() => {
        delete ut[t3], n3 = null;
      }), ut[t3] = n3), n3;
    })(() => this._getTokenSilently(o2), "".concat(this.options.clientId, "::").concat(o2.authorizationParams.audience, "::").concat(o2.authorizationParams.scope));
    return e3.detailedResponse ? r2 : null == r2 ? void 0 : r2.access_token;
  }
  async _getTokenSilently(t2) {
    const n2 = t2.cacheMode, o2 = e(t2, ["cacheMode"]);
    if ("off" !== n2) {
      const e3 = await this._getEntryFromCache({ scope: o2.authorizationParams.scope, audience: o2.authorizationParams.audience || k, clientId: this.options.clientId, cacheMode: n2 });
      if (e3) return e3;
    }
    if ("cache-only" === n2) return;
    const r2 = (i2 = this.options.clientId, a2 = o2.authorizationParams.audience || "default", "".concat("auth0.lock.getTokenSilently", ".").concat(i2, ".").concat(a2));
    var i2, a2;
    try {
      return await this.lockManager.runWithLock(r2, 5e3, async () => {
        if ("off" !== n2) {
          const e4 = await this._getEntryFromCache({ scope: o2.authorizationParams.scope, audience: o2.authorizationParams.audience || k, clientId: this.options.clientId });
          if (e4) return e4;
        }
        const e3 = this.options.useRefreshTokens ? await this._getTokenUsingRefreshToken(o2) : await this._getTokenFromIFrame(o2), t3 = e3.id_token, r3 = e3.token_type, i3 = e3.access_token, a3 = e3.oauthTokenScope, s2 = e3.expires_in;
        return Object.assign(Object.assign({ id_token: t3, token_type: r3, access_token: i3 }, a3 ? { scope: a3 } : null), { expires_in: s2 });
      });
    } catch (e3) {
      if (this._isInteractiveError(e3) && "popup" === this.options.interactiveErrorHandler) return await this._handleInteractiveErrorWithPopup(o2);
      throw e3;
    }
  }
  _isInteractiveError(e3) {
    return e3 instanceof R || e3 instanceof _ && this._isIframeMfaError(e3);
  }
  _isIframeMfaError(e3) {
    return "login_required" === e3.error && "Multifactor authentication required" === e3.error_description;
  }
  async _handleInteractiveErrorWithPopup(e3) {
    try {
      await this.loginWithPopup({ authorizationParams: e3.authorizationParams });
      const t2 = await this._getEntryFromCache({ scope: e3.authorizationParams.scope, audience: e3.authorizationParams.audience || k, clientId: this.options.clientId });
      if (!t2) throw new _("interactive_handler_cache_miss", "Token not found in cache after interactive authentication");
      return t2;
    } catch (e4) {
      throw e4;
    }
  }
  async getTokenWithPopup() {
    let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    var n2, o2;
    const r2 = Object.assign(Object.assign({}, e3), { authorizationParams: Object.assign(Object.assign(Object.assign({}, this.options.authorizationParams), e3.authorizationParams), { scope: Oe(this.scope, null === (n2 = e3.authorizationParams) || void 0 === n2 ? void 0 : n2.scope, (null === (o2 = e3.authorizationParams) || void 0 === o2 ? void 0 : o2.audience) || this.options.authorizationParams.audience) }) });
    t2 = Object.assign(Object.assign({}, y), t2), await this.loginWithPopup(r2, t2);
    return (await this.cacheManager.get(new Ke({ scope: r2.authorizationParams.scope, audience: r2.authorizationParams.audience || k, clientId: this.options.clientId }), void 0, this.options.useMrrt)).access_token;
  }
  async isAuthenticated() {
    return !!await this.getUser();
  }
  _buildLogoutUrl(t2) {
    null !== t2.clientId ? t2.clientId = t2.clientId || this.options.clientId : delete t2.clientId;
    const n2 = t2.logoutParams || {}, o2 = n2.federated, r2 = e(n2, ["federated"]), i2 = o2 ? "&federated" : "";
    return this._url("/v2/logout?".concat(N(Object.assign({ clientId: t2.clientId }, r2)))) + i2;
  }
  async revokeRefreshToken() {
    let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    if (!this.options.useRefreshTokens) return;
    const t2 = e3.audience || this.options.authorizationParams.audience || k, n2 = await this.cacheManager.getRefreshTokensByAudience(t2, this.options.clientId);
    await (async function(e4, t3) {
      let n3 = e4.baseUrl, o2 = e4.timeout, r2 = e4.auth0Client, i2 = e4.useFormData, a2 = e4.refreshTokens, s2 = e4.audience, c2 = e4.client_id, u2 = e4.onRefreshTokenRevoked;
      const l2 = o2 || w, h2 = "refresh_token", d2 = "".concat(n3, "/oauth/revoke"), p2 = { "Content-Type": i2 ? "application/x-www-form-urlencoded" : "application/json", "Auth0-Client": btoa(JSON.stringify(D(r2 || v))) };
      if (t3) {
        const e5 = { client_id: c2, token_type_hint: h2 }, n4 = i2 ? N(e5) : JSON.stringify(e5);
        try {
          return await Pe({ type: "revoke", timeout: l2, fetchUrl: d2, fetchOptions: { method: "POST", body: n4, headers: p2 }, useFormData: i2, auth: { audience: null != s2 ? s2 : k } }, t3);
        } catch (e6) {
          throw new _("revoke_error", e6.message);
        }
      }
      for (const e5 of a2) {
        const t4 = { client_id: c2, token_type_hint: h2, token: e5 }, n4 = i2 ? N(t4) : JSON.stringify(t4), o3 = await Ae(d2, { method: "POST", body: n4, headers: p2 }, l2);
        if (!o3.ok) {
          let e6, t5;
          try {
            var f2 = JSON.parse(await o3.text());
            e6 = f2.error, t5 = f2.error_description;
          } catch (e7) {
          }
          throw new _(e6 || "revoke_error", t5 || "HTTP error ".concat(o3.status));
        }
        await (null == u2 ? void 0 : u2(e5));
      }
    })({ baseUrl: this.domainUrl, timeout: this.httpTimeoutMs, auth0Client: this.options.auth0Client, useFormData: this.options.useFormData, client_id: this.options.clientId, refreshTokens: n2, audience: t2, onRefreshTokenRevoked: (e4) => this.cacheManager.stripRefreshToken(e4) }, this.worker);
  }
  async logout() {
    let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    var n2;
    const o2 = ft(t2), r2 = o2.openUrl, i2 = e(o2, ["openUrl"]);
    null === t2.clientId ? await this.cacheManager.clear() : await this.cacheManager.clear(t2.clientId || this.options.clientId), this.cookieStorage.remove(this.orgHintCookieName, { cookieDomain: this.options.cookieDomain }), this.cookieStorage.remove(this.isAuthenticatedCookieName, { cookieDomain: this.options.cookieDomain }), this.userCache.remove(We);
    try {
      await (null === (n2 = this.dpop) || void 0 === n2 ? void 0 : n2.clear());
    } catch (e3) {
    }
    if (this.worker) try {
      await Pe({ type: "clear" }, this.worker);
    } catch (e3) {
    }
    const a2 = this._buildLogoutUrl(i2);
    r2 ? await r2(a2) : false !== r2 && window.location.assign(a2);
  }
  async _getTokenFromIFrame(e3) {
    const t2 = (n2 = this.options.clientId, "".concat("auth0.lock.getTokenFromIFrame", ".").concat(n2));
    var n2;
    try {
      return await this.lockManager.runWithLock(t2, 5e3, async () => {
        const t3 = Object.assign(Object.assign({}, e3.authorizationParams), { prompt: "none" }), n3 = this.cookieStorage.get(this.orgHintCookieName);
        n3 && !t3.organization && (t3.organization = n3);
        const o2 = await this._prepareAuthorizeUrl(t3, { response_mode: "web_message" }, window.location.origin), r2 = o2.url, i2 = o2.state, a2 = o2.nonce, s2 = o2.code_verifier, c2 = o2.redirect_uri, u2 = o2.scope, l2 = o2.audience;
        if (window.crossOriginIsolated) throw new _("login_required", "The application is running in a Cross-Origin Isolated context, silently retrieving a token without refresh token is not possible.");
        const h2 = e3.timeoutInSeconds || this.options.authorizeTimeoutInSeconds;
        let d2;
        try {
          d2 = new URL(this.domainUrl).origin;
        } catch (e4) {
          d2 = this.domainUrl;
        }
        const p2 = await (function(e4, t4) {
          let n4 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 60;
          return new Promise((o3, r3) => {
            const i3 = window.document.createElement("iframe");
            i3.setAttribute("width", "0"), i3.setAttribute("height", "0"), i3.style.display = "none";
            const a3 = () => {
              window.document.body.contains(i3) && (window.document.body.removeChild(i3), window.removeEventListener("message", s3, false));
            };
            let s3;
            const c3 = setTimeout(() => {
              r3(new E()), a3();
            }, 1e3 * n4);
            s3 = function(e5) {
              if (e5.origin != t4) return;
              if (!e5.data || "authorization_response" !== e5.data.type) return;
              const n5 = e5.source;
              n5 && n5.close(), e5.data.response.error ? r3(_.fromPayload(e5.data.response)) : o3(e5.data.response), clearTimeout(c3), window.removeEventListener("message", s3, false), setTimeout(a3, 2e3);
            }, window.addEventListener("message", s3, false), window.document.body.appendChild(i3), i3.setAttribute("src", e4);
          });
        })(r2, d2, h2);
        if (i2 !== p2.state) throw new _("state_mismatch", "Invalid state");
        const f2 = await this._requestToken(Object.assign(Object.assign({}, e3.authorizationParams), { code_verifier: s2, code: p2.code, grant_type: "authorization_code", redirect_uri: c2, timeout: e3.authorizationParams.timeout || this.httpTimeoutMs }), { nonceIn: a2, organization: t3.organization });
        return Object.assign(Object.assign({}, f2), { scope: u2, oauthTokenScope: f2.scope, audience: l2 });
      });
    } catch (e4) {
      if ("login_required" === e4.error) {
        e4 instanceof _ && this._isIframeMfaError(e4) && "popup" === this.options.interactiveErrorHandler || this.logout({ openUrl: false });
      }
      throw e4;
    }
  }
  async _getTokenUsingRefreshToken(e3) {
    var t2, n2;
    const o2 = await this.cacheManager.get(new Ke({ scope: e3.authorizationParams.scope, audience: e3.authorizationParams.audience || k, clientId: this.options.clientId }), void 0, this.options.useMrrt);
    if (!(o2 && o2.refresh_token || this.worker)) {
      if (this.options.useRefreshTokensFallback) return await this._getTokenFromIFrame(e3);
      throw new x(e3.authorizationParams.audience || k, e3.authorizationParams.scope);
    }
    const r2 = e3.authorizationParams.redirect_uri || this.options.authorizationParams.redirect_uri || window.location.origin, i2 = "number" == typeof e3.timeoutInSeconds ? 1e3 * e3.timeoutInSeconds : null, a2 = ((e4, t3, n3, o3) => {
      var r3;
      if (e4 && n3 && o3) {
        if (t3.audience !== n3) return t3.scope;
        const e5 = o3.split(" "), i3 = (null === (r3 = t3.scope) || void 0 === r3 ? void 0 : r3.split(" ")) || [], a3 = i3.every((t4) => e5.includes(t4));
        return e5.length >= i3.length && a3 ? o3 : t3.scope;
      }
      return t3.scope;
    })(this.options.useMrrt, e3.authorizationParams, null == o2 ? void 0 : o2.audience, null == o2 ? void 0 : o2.scope);
    try {
      const t3 = await this._requestToken(Object.assign(Object.assign(Object.assign({}, e3.authorizationParams), { grant_type: "refresh_token", refresh_token: o2 && o2.refresh_token, redirect_uri: r2 }), i2 && { timeout: i2 }), { scopesToRequest: a2 });
      if (t3.refresh_token && (null == o2 ? void 0 : o2.refresh_token) && await this.cacheManager.updateEntry(o2.refresh_token, t3.refresh_token), this.options.useMrrt) {
        if (s2 = null == o2 ? void 0 : o2.audience, c2 = null == o2 ? void 0 : o2.scope, u2 = e3.authorizationParams.audience, l2 = e3.authorizationParams.scope, s2 !== u2 || !mt(l2, c2)) {
          if (!mt(a2, t3.scope)) {
            if (this.options.useRefreshTokensFallback) return await this._getTokenFromIFrame(e3);
            await this.cacheManager.remove(this.options.clientId, e3.authorizationParams.audience, e3.authorizationParams.scope);
            const n3 = ((e4, t4) => {
              const n4 = (null == e4 ? void 0 : e4.split(" ")) || [], o3 = (null == t4 ? void 0 : t4.split(" ")) || [];
              return n4.filter((e5) => -1 == o3.indexOf(e5)).join(",");
            })(a2, t3.scope);
            throw new C(e3.authorizationParams.audience || "default", n3);
          }
        }
      }
      return Object.assign(Object.assign({}, t3), { scope: e3.authorizationParams.scope, oauthTokenScope: t3.scope, audience: e3.authorizationParams.audience || k });
    } catch (o3) {
      if (o3.message) {
        if (o3.message.includes("user is blocked")) throw await this.logout({ openUrl: false }), o3;
        if ((o3.message.includes("Missing Refresh Token") || o3.message.includes("invalid refresh token")) && this.options.useRefreshTokensFallback) return await this._getTokenFromIFrame(e3);
      }
      throw o3 instanceof R && this.mfa.setMFAAuthDetails(o3.mfa_token, null === (t2 = e3.authorizationParams) || void 0 === t2 ? void 0 : t2.scope, null === (n2 = e3.authorizationParams) || void 0 === n2 ? void 0 : n2.audience, o3.mfa_requirements), o3;
    }
    var s2, c2, u2, l2;
  }
  async _saveEntryInCache(t2) {
    const n2 = t2.id_token, o2 = t2.decodedToken, r2 = e(t2, ["id_token", "decodedToken"]);
    this.userCache.set(We, { id_token: n2, decodedToken: o2 }), await this.cacheManager.setIdToken(this.options.clientId, t2.id_token, t2.decodedToken), await this.cacheManager.set(r2);
  }
  async _getIdTokenFromCache() {
    const e3 = this.options.authorizationParams.audience || k, t2 = this.scope[e3], n2 = await this.cacheManager.getIdToken(new Ke({ clientId: this.options.clientId, audience: e3, scope: t2 })), o2 = this.userCache.get(We);
    return n2 && n2.id_token === (null == o2 ? void 0 : o2.id_token) ? o2 : (this.userCache.set(We, n2), n2);
  }
  async _getEntryFromCache(e3) {
    let t2 = e3.scope, n2 = e3.audience, o2 = e3.clientId, r2 = e3.cacheMode;
    const i2 = await this.cacheManager.get(new Ke({ scope: t2, audience: n2, clientId: o2 }), 60, this.options.useMrrt, r2);
    if (i2 && i2.access_token) {
      const e4 = i2.token_type, t3 = i2.access_token, n3 = i2.oauthTokenScope, o3 = i2.expires_in, r3 = await this._getIdTokenFromCache();
      return r3 && Object.assign(Object.assign({ id_token: r3.id_token, token_type: e4 || "Bearer", access_token: t3 }, n3 ? { scope: n3 } : null), { expires_in: o3 });
    }
  }
  async _requestToken(e3, t2) {
    var n2, o2;
    const r2 = t2 || {}, i2 = r2.nonceIn, a2 = r2.organization, s2 = r2.scopesToRequest, c2 = await xe(Object.assign(Object.assign({ baseUrl: this.domainUrl, client_id: this.options.clientId, auth0Client: this.options.auth0Client, useFormData: this.options.useFormData, timeout: this.httpTimeoutMs, useMrrt: this.options.useMrrt, dpop: this.dpop }, e3), { scope: s2 || e3.scope }), this.worker), u2 = await this._verifyIdToken(c2.id_token, i2, a2);
    if ("authorization_code" === e3.grant_type) {
      const e4 = await this._getIdTokenFromCache();
      (null === (o2 = null === (n2 = null == e4 ? void 0 : e4.decodedToken) || void 0 === n2 ? void 0 : n2.claims) || void 0 === o2 ? void 0 : o2.sub) && e4.decodedToken.claims.sub !== u2.claims.sub && (await this.cacheManager.clear(this.options.clientId), this.userCache.remove(We));
    }
    return await this._saveEntryInCache(Object.assign(Object.assign(Object.assign(Object.assign({}, c2), { decodedToken: u2, scope: e3.scope, audience: e3.audience || k }), c2.scope ? { oauthTokenScope: c2.scope } : null), { client_id: this.options.clientId })), this.cookieStorage.save(this.isAuthenticatedCookieName, true, { daysUntilExpire: this.sessionCheckExpiryDays, cookieDomain: this.options.cookieDomain }), this._processOrgHint(a2 || u2.claims.org_id), Object.assign(Object.assign({}, c2), { decodedToken: u2 });
  }
  _buildTokenExchangeParams(e3) {
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, e3), { grant_type: "urn:ietf:params:oauth:grant-type:token-exchange", subject_token: e3.subject_token, subject_token_type: e3.subject_token_type }), e3.actor_token && { actor_token: e3.actor_token }), e3.actor_token_type && { actor_token_type: e3.actor_token_type }), { scope: Oe(this.scope, e3.scope, e3.audience || this.options.authorizationParams.audience), audience: e3.audience || this.options.authorizationParams.audience, organization: e3.organization || this.options.authorizationParams.organization });
  }
  async loginWithCustomTokenExchange(e3) {
    return this._requestToken(this._buildTokenExchangeParams(e3));
  }
  async customTokenExchange(e3) {
    const t2 = await xe(Object.assign(Object.assign({}, this._buildTokenExchangeParams(e3)), { baseUrl: this.domainUrl, client_id: this.options.clientId, auth0Client: this.options.auth0Client, useFormData: this.options.useFormData, timeout: this.httpTimeoutMs, dpop: this.dpop }), this.worker, true);
    return t2.id_token && await this._verifyIdToken(t2.id_token, void 0, e3.organization), t2;
  }
  async exchangeToken(e3) {
    return this.loginWithCustomTokenExchange(e3);
  }
  _assertDpop(e3) {
    if (!e3) throw new Error("`useDpop` option must be enabled before using DPoP.");
  }
  getDpopNonce(e3) {
    return this._assertDpop(this.dpop), this.dpop.getNonce(e3);
  }
  setDpopNonce(e3, t2) {
    return this._assertDpop(this.dpop), this.dpop.setNonce(e3, t2);
  }
  generateDpopProof(e3) {
    return this._assertDpop(this.dpop), this.dpop.generateProof(e3);
  }
  createFetcher() {
    let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return new bt(e3, { isDpopEnabled: () => !!this.options.useDpop, getAccessToken: (e4) => {
      var t2;
      return this.getTokenSilently({ authorizationParams: { scope: null === (t2 = null == e4 ? void 0 : e4.scope) || void 0 === t2 ? void 0 : t2.join(" "), audience: null == e4 ? void 0 : e4.audience }, detailedResponse: true });
    }, getDpopNonce: () => this.getDpopNonce(e3.dpopNonceId), setDpopNonce: (t2) => this.setDpopNonce(t2, e3.dpopNonceId), generateDpopProof: (e4) => this.generateDpopProof(e4) });
  }
  async connectAccountWithRedirect(e3) {
    const t2 = e3.openUrl, n2 = e3.appState, o2 = e3.connection, r2 = e3.scopes, i2 = e3.authorization_params, a2 = e3.redirectUri, s2 = void 0 === a2 ? this.options.authorizationParams.redirect_uri || window.location.origin : a2;
    if (!o2) throw new Error("connection is required");
    const c2 = L(K()), u2 = K(), l2 = await H(u2), h2 = J(l2), d2 = await this.myAccountApi.connectAccount({ connection: o2, scopes: r2, redirect_uri: s2, state: c2, code_challenge: h2, code_challenge_method: "S256", authorization_params: i2 }), p2 = d2.connect_uri, f2 = d2.connect_params, m2 = d2.auth_session;
    this.transactionManager.create({ state: c2, code_verifier: u2, auth_session: m2, redirect_uri: s2, appState: n2, connection: o2, response_type: tt.ConnectCode });
    const y2 = new URL(p2);
    y2.searchParams.set("ticket", f2.ticket), t2 ? await t2(y2.toString()) : window.location.assign(y2);
  }
  async _requestTokenForMfa(t2, n2) {
    const o2 = t2.mfaToken, r2 = e(t2, ["mfaToken"]);
    return this._requestToken(Object.assign(Object.assign({}, r2), { mfa_token: o2 }), n2);
  }
};
var initialAuthState = {
  isAuthenticated: false,
  isLoading: true,
  error: void 0,
  user: void 0
};
var stub = function() {
  throw new Error("You forgot to wrap your component in <Auth0Provider>.");
};
var initialContext = __assign(__assign({}, initialAuthState), { buildAuthorizeUrl: stub, buildLogoutUrl: stub, getAccessTokenSilently: stub, getAccessTokenWithPopup: stub, getIdTokenClaims: stub, loginWithCustomTokenExchange: stub, customTokenExchange: stub, exchangeToken: stub, loginWithRedirect: stub, loginWithPopup: stub, connectAccountWithRedirect: stub, logout: stub, handleRedirectCallback: stub, getDpopNonce: stub, setDpopNonce: stub, generateDpopProof: stub, createFetcher: stub, getConfiguration: stub, mfa: {
  getAuthenticators: stub,
  enroll: stub,
  challenge: stub,
  verify: stub,
  getEnrollmentFactors: stub
} });
var Auth0Context = (0, import_react.createContext)(initialContext);
var OAuthError = (
  /** @class */
  (function(_super) {
    __extends(OAuthError2, _super);
    function OAuthError2(error, error_description) {
      var _this = _super.call(this, error_description !== null && error_description !== void 0 ? error_description : error) || this;
      _this.error = error;
      _this.error_description = error_description;
      Object.setPrototypeOf(_this, OAuthError2.prototype);
      return _this;
    }
    return OAuthError2;
  })(Error)
);
var CODE_RE = /[?&](?:connect_)?code=[^&]+/;
var STATE_RE = /[?&]state=[^&]+/;
var ERROR_RE = /[?&]error=[^&]+/;
var hasAuthParams = function(searchParams) {
  if (searchParams === void 0) {
    searchParams = window.location.search;
  }
  return (CODE_RE.test(searchParams) || ERROR_RE.test(searchParams)) && STATE_RE.test(searchParams);
};
var normalizeErrorFn = function(fallbackMessage) {
  return function(error) {
    if (error instanceof Error) {
      return error;
    }
    if (error !== null && typeof error === "object" && "error" in error && typeof error.error === "string") {
      if ("error_description" in error && typeof error.error_description === "string") {
        var e_1 = error;
        return new OAuthError(e_1.error, e_1.error_description);
      }
      var e3 = error;
      return new OAuthError(e3.error);
    }
    return new Error(fallbackMessage);
  };
};
var loginError = normalizeErrorFn("Login failed");
var tokenError = normalizeErrorFn("Get access token failed");
var deprecateRedirectUri = function(options) {
  var _a2, _b;
  if (options === null || options === void 0 ? void 0 : options.redirectUri) {
    console.warn("Using `redirectUri` has been deprecated, please use `authorizationParams.redirect_uri` instead as `redirectUri` will be no longer supported in a future version");
    options.authorizationParams = (_a2 = options.authorizationParams) !== null && _a2 !== void 0 ? _a2 : {};
    options.authorizationParams.redirect_uri = options.redirectUri;
    delete options.redirectUri;
  }
  if ((_b = options === null || options === void 0 ? void 0 : options.authorizationParams) === null || _b === void 0 ? void 0 : _b.redirectUri) {
    console.warn("Using `authorizationParams.redirectUri` has been deprecated, please use `authorizationParams.redirect_uri` instead as `authorizationParams.redirectUri` will be removed in a future version");
    options.authorizationParams.redirect_uri = options.authorizationParams.redirectUri;
    delete options.authorizationParams.redirectUri;
  }
};
var reducer = function(state, action) {
  switch (action.type) {
    case "LOGIN_POPUP_STARTED":
      return __assign(__assign({}, state), { isLoading: true });
    case "LOGIN_POPUP_COMPLETE":
    case "INITIALISED":
      return __assign(__assign({}, state), { isAuthenticated: !!action.user, user: action.user, isLoading: false, error: void 0 });
    case "HANDLE_REDIRECT_COMPLETE":
    case "GET_ACCESS_TOKEN_COMPLETE":
      if (state.user === action.user) {
        return state;
      }
      return __assign(__assign({}, state), { isAuthenticated: !!action.user, user: action.user });
    case "LOGOUT":
      return __assign(__assign({}, state), { isAuthenticated: false, user: void 0 });
    case "ERROR":
      return __assign(__assign({}, state), { isLoading: false, error: action.error });
  }
};
var toAuth0ClientOptions = function(opts) {
  deprecateRedirectUri(opts);
  return __assign(__assign({}, opts), { auth0Client: {
    name: "auth0-react",
    version: "2.17.0"
  } });
};
var defaultOnRedirectCallback = function(appState) {
  var _a2;
  window.history.replaceState({}, document.title, (_a2 = appState.returnTo) !== null && _a2 !== void 0 ? _a2 : window.location.pathname);
};
var Auth0Provider = function(opts) {
  var _a2 = opts, children = _a2.children, skipRedirectCallback = _a2.skipRedirectCallback, _b = _a2.onRedirectCallback, onRedirectCallback = _b === void 0 ? defaultOnRedirectCallback : _b, _c = _a2.context, context = _c === void 0 ? Auth0Context : _c, providedClient = _a2.client, clientOpts = __rest(_a2, ["children", "skipRedirectCallback", "onRedirectCallback", "context", "client"]);
  if (providedClient && (clientOpts.domain || clientOpts.clientId)) {
    console.warn("Auth0Provider: the `client` prop takes precedence over `domain`/`clientId` and other configuration options. Remove `domain`, `clientId`, and any other Auth0Client configuration props when using the `client` prop.");
  }
  var client = (0, import_react.useState)(function() {
    return providedClient !== null && providedClient !== void 0 ? providedClient : new La(toAuth0ClientOptions(clientOpts));
  })[0];
  var _d = (0, import_react.useReducer)(reducer, initialAuthState), state = _d[0], dispatch = _d[1];
  var didInitialise = (0, import_react.useRef)(false);
  var handleError = (0, import_react.useCallback)(function(error) {
    dispatch({ type: "ERROR", error });
    return error;
  }, []);
  (0, import_react.useEffect)(function() {
    if (didInitialise.current) {
      return;
    }
    didInitialise.current = true;
    (function() {
      return __awaiter(void 0, void 0, void 0, function() {
        var user, _a3, _b2, appState, response_type, result, error_1;
        return __generator(this, function(_c2) {
          switch (_c2.label) {
            case 0:
              _c2.trys.push([0, 7, , 8]);
              user = void 0;
              if (!(hasAuthParams() && !skipRedirectCallback)) return [3, 3];
              return [4, client.handleRedirectCallback()];
            case 1:
              _a3 = _c2.sent(), _b2 = _a3.appState, appState = _b2 === void 0 ? {} : _b2, response_type = _a3.response_type, result = __rest(_a3, ["appState", "response_type"]);
              return [4, client.getUser()];
            case 2:
              user = _c2.sent();
              appState.response_type = response_type;
              if (response_type === tt.ConnectCode) {
                appState.connectedAccount = result;
              }
              onRedirectCallback(appState, user);
              return [3, 6];
            case 3:
              return [4, client.checkSession()];
            case 4:
              _c2.sent();
              return [4, client.getUser()];
            case 5:
              user = _c2.sent();
              _c2.label = 6;
            case 6:
              dispatch({ type: "INITIALISED", user });
              return [3, 8];
            case 7:
              error_1 = _c2.sent();
              handleError(loginError(error_1));
              return [3, 8];
            case 8:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    })();
  }, [client, onRedirectCallback, skipRedirectCallback, handleError]);
  var loginWithRedirect = (0, import_react.useCallback)(function(opts2) {
    deprecateRedirectUri(opts2);
    return client.loginWithRedirect(opts2);
  }, [client]);
  var loginWithPopup = (0, import_react.useCallback)(function(options, config) {
    return __awaiter(void 0, void 0, void 0, function() {
      var error_2, user;
      return __generator(this, function(_a3) {
        switch (_a3.label) {
          case 0:
            dispatch({ type: "LOGIN_POPUP_STARTED" });
            _a3.label = 1;
          case 1:
            _a3.trys.push([1, 3, , 4]);
            return [4, client.loginWithPopup(options, config)];
          case 2:
            _a3.sent();
            return [3, 4];
          case 3:
            error_2 = _a3.sent();
            handleError(loginError(error_2));
            return [
              2
              /*return*/
            ];
          case 4:
            return [4, client.getUser()];
          case 5:
            user = _a3.sent();
            dispatch({ type: "LOGIN_POPUP_COMPLETE", user });
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }, [client, handleError]);
  var logout = (0, import_react.useCallback)(function() {
    var args_1 = [];
    for (var _i2 = 0; _i2 < arguments.length; _i2++) {
      args_1[_i2] = arguments[_i2];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function(opts2) {
      if (opts2 === void 0) {
        opts2 = {};
      }
      return __generator(this, function(_a3) {
        switch (_a3.label) {
          case 0:
            return [4, client.logout(opts2)];
          case 1:
            _a3.sent();
            if (opts2.openUrl || opts2.openUrl === false) {
              dispatch({ type: "LOGOUT" });
            }
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }, [client]);
  var getAccessTokenSilently = (0, import_react.useCallback)(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function(opts2) {
      return __awaiter(void 0, void 0, void 0, function() {
        var token, error_3, _a3;
        var _b2;
        return __generator(this, function(_c2) {
          switch (_c2.label) {
            case 0:
              _c2.trys.push([0, 2, 3, 5]);
              return [4, client.getTokenSilently(opts2)];
            case 1:
              token = _c2.sent();
              return [3, 5];
            case 2:
              error_3 = _c2.sent();
              throw tokenError(error_3);
            case 3:
              _a3 = dispatch;
              _b2 = {
                type: "GET_ACCESS_TOKEN_COMPLETE"
              };
              return [4, client.getUser()];
            case 4:
              _a3.apply(void 0, [(_b2.user = _c2.sent(), _b2)]);
              return [
                7
                /*endfinally*/
              ];
            case 5:
              return [2, token];
          }
        });
      });
    },
    [client]
  );
  var getAccessTokenWithPopup = (0, import_react.useCallback)(function(opts2, config) {
    return __awaiter(void 0, void 0, void 0, function() {
      var token, error_4, _a3;
      var _b2;
      return __generator(this, function(_c2) {
        switch (_c2.label) {
          case 0:
            _c2.trys.push([0, 2, 3, 5]);
            return [4, client.getTokenWithPopup(opts2, config)];
          case 1:
            token = _c2.sent();
            return [3, 5];
          case 2:
            error_4 = _c2.sent();
            throw tokenError(error_4);
          case 3:
            _a3 = dispatch;
            _b2 = {
              type: "GET_ACCESS_TOKEN_COMPLETE"
            };
            return [4, client.getUser()];
          case 4:
            _a3.apply(void 0, [(_b2.user = _c2.sent(), _b2)]);
            return [
              7
              /*endfinally*/
            ];
          case 5:
            return [2, token];
        }
      });
    });
  }, [client]);
  var connectAccountWithRedirect = (0, import_react.useCallback)(function(options) {
    return client.connectAccountWithRedirect(options);
  }, [client]);
  var getIdTokenClaims = (0, import_react.useCallback)(function() {
    return client.getIdTokenClaims();
  }, [client]);
  var loginWithCustomTokenExchange = (0, import_react.useCallback)(function(options) {
    return __awaiter(void 0, void 0, void 0, function() {
      var tokenResponse, error_5, _a3;
      var _b2;
      return __generator(this, function(_c2) {
        switch (_c2.label) {
          case 0:
            _c2.trys.push([0, 2, 3, 5]);
            return [4, client.loginWithCustomTokenExchange(options)];
          case 1:
            tokenResponse = _c2.sent();
            return [3, 5];
          case 2:
            error_5 = _c2.sent();
            throw tokenError(error_5);
          case 3:
            _a3 = dispatch;
            _b2 = {
              type: "GET_ACCESS_TOKEN_COMPLETE"
            };
            return [4, client.getUser()];
          case 4:
            _a3.apply(void 0, [(_b2.user = _c2.sent(), _b2)]);
            return [
              7
              /*endfinally*/
            ];
          case 5:
            return [2, tokenResponse];
        }
      });
    });
  }, [client]);
  var customTokenExchange = (0, import_react.useCallback)(function(options) {
    return client.customTokenExchange(options);
  }, [client]);
  var exchangeToken = (0, import_react.useCallback)(function(options) {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a3) {
        return [2, loginWithCustomTokenExchange(options)];
      });
    });
  }, [loginWithCustomTokenExchange]);
  var handleRedirectCallback = (0, import_react.useCallback)(function(url) {
    return __awaiter(void 0, void 0, void 0, function() {
      var error_6, _a3;
      var _b2;
      return __generator(this, function(_c2) {
        switch (_c2.label) {
          case 0:
            _c2.trys.push([0, 2, 3, 5]);
            return [4, client.handleRedirectCallback(url)];
          case 1:
            return [2, _c2.sent()];
          case 2:
            error_6 = _c2.sent();
            throw tokenError(error_6);
          case 3:
            _a3 = dispatch;
            _b2 = {
              type: "HANDLE_REDIRECT_COMPLETE"
            };
            return [4, client.getUser()];
          case 4:
            _a3.apply(void 0, [(_b2.user = _c2.sent(), _b2)]);
            return [
              7
              /*endfinally*/
            ];
          case 5:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }, [client]);
  var getDpopNonce = (0, import_react.useCallback)(function(id) {
    return client.getDpopNonce(id);
  }, [client]);
  var setDpopNonce = (0, import_react.useCallback)(function(nonce, id) {
    return client.setDpopNonce(nonce, id);
  }, [client]);
  var generateDpopProof = (0, import_react.useCallback)(function(params) {
    return client.generateDpopProof(params);
  }, [client]);
  var createFetcher = (0, import_react.useCallback)(function(config) {
    return client.createFetcher(config);
  }, [client]);
  var getConfiguration = (0, import_react.useCallback)(function() {
    return client.getConfiguration();
  }, [client]);
  var mfa = (0, import_react.useMemo)(function() {
    return client.mfa;
  }, [client]);
  var contextValue = (0, import_react.useMemo)(function() {
    return __assign(__assign({}, state), { getAccessTokenSilently, getAccessTokenWithPopup, getIdTokenClaims, loginWithCustomTokenExchange, customTokenExchange, exchangeToken, loginWithRedirect, loginWithPopup, connectAccountWithRedirect, logout, handleRedirectCallback, getDpopNonce, setDpopNonce, generateDpopProof, createFetcher, getConfiguration, mfa });
  }, [
    state,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
    getIdTokenClaims,
    loginWithCustomTokenExchange,
    customTokenExchange,
    exchangeToken,
    loginWithRedirect,
    loginWithPopup,
    connectAccountWithRedirect,
    logout,
    handleRedirectCallback,
    getDpopNonce,
    setDpopNonce,
    generateDpopProof,
    createFetcher,
    getConfiguration,
    mfa
  ]);
  return import_react.default.createElement(context.Provider, { value: contextValue }, children);
};
var useAuth0 = function(context) {
  if (context === void 0) {
    context = Auth0Context;
  }
  return (0, import_react.useContext)(context);
};

// client/src/auth/authConfig.ts
var requiredEnv = {
  domain: "lbsaisolutions.uk.auth0.com",
  clientId: "dXZLvedqkvVdFfK4QFVD1vefusHaMmSP",
  audience: "https://genaielective_sum26_api/",
  apiBaseUrl: "http://localhost:3001",
  appOrigin: "http://localhost:3000"
};
var authConfig = {
  domain: requiredEnv.domain,
  clientId: requiredEnv.clientId,
  authorizationParams: {
    audience: requiredEnv.audience,
    redirect_uri: requiredEnv.appOrigin || window.location.origin
  },
  logoutParams: {
    returnTo: requiredEnv.appOrigin || window.location.origin
  }
};
var appConfig = {
  apiBaseUrl: requiredEnv.apiBaseUrl || "http://localhost:3001",
  missingEnv: Object.entries(requiredEnv).filter(([, value]) => !value).map(([key]) => key)
};

// client/src/auth/AuthProvider.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function AuthProvider({ children }) {
  const navigate = useNavigate();
  if (!authConfig.domain || !authConfig.clientId || !authConfig.authorizationParams.audience) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { className: "configuration-message", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Authentication configuration is incomplete" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Add the required Vite Auth0 variable names to the root .env file." })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Auth0Provider,
    {
      domain: authConfig.domain,
      clientId: authConfig.clientId,
      authorizationParams: authConfig.authorizationParams,
      cacheLocation: "memory",
      onRedirectCallback: (appState) => navigate(appState?.returnTo || window.location.pathname),
      children
    }
  );
}

// client/src/assets/lbs-logo.jpg
var lbs_logo_default = "./assets/lbs-logo-YU5R22ZD.jpg";

// client/src/components/AppShell.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function AppShell({ children }) {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "app-frame", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("header", { className: "topbar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(NavLink, { to: "/", className: "brand-link", "aria-label": "London Business School GenAI home", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: lbs_logo_default, alt: "London Business School" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "GenAI Course Prototype" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("nav", { className: "nav-links", "aria-label": "Primary navigation", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(NavLink, { to: "/health", children: "Health" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(NavLink, { to: "/dashboard", children: "Dashboard" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(NavLink, { to: "/ws4-demo", children: "WS4 Demo" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(NavLink, { to: "/admin", children: "Admin" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "auth-actions", children: isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "user-label", children: user?.name || user?.email || "Signed in" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", onClick: () => logout({ logoutParams: { returnTo: window.location.origin } }), children: "Logout" })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", onClick: () => loginWithRedirect(), children: "Login" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("main", { className: "page-content", children })
  ] });
}

// client/src/auth/ProtectedRoute.tsx
var import_react2 = __toESM(require_react(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
function decodePermissions(token) {
  const [, payload] = token.split(".");
  if (!payload) return [];
  const json2 = JSON.parse(window.atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  return Array.isArray(json2.permissions) ? json2.permissions : [];
}
function ProtectedRoute({ allowedPermissions, children }) {
  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [permissions, setPermissions] = (0, import_react2.useState)(null);
  const required = (0, import_react2.useMemo)(() => new Set(allowedPermissions), [allowedPermissions]);
  (0, import_react2.useEffect)(() => {
    if (!isLoading && !isAuthenticated) {
      void loginWithRedirect({ appState: { returnTo: window.location.pathname } });
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);
  (0, import_react2.useEffect)(() => {
    let isMounted = true;
    async function loadPermissions() {
      if (!isAuthenticated) return;
      const token = await getAccessTokenSilently();
      if (isMounted) setPermissions(decodePermissions(token));
    }
    void loadPermissions().catch(() => {
      if (isMounted) setPermissions([]);
    });
    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, isAuthenticated]);
  if (isLoading || !isAuthenticated || permissions === null) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "status-panel", children: "Checking access..." });
  }
  const canAccess = permissions.some((permission) => required.has(permission));
  if (!canAccess) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "status-panel", children: "You are signed in, but this page needs additional Auth0 permission." });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children });
}

// client/src/pages/HomePage.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
function HomePage() {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("section", { className: "page-section", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "eyebrow", children: "London Business School" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h1", { children: "Generative AI elective prototype" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "lead", children: "A secure full-stack starting point for the group project, ready for Auth0-protected workflows, PostgreSQL-backed data, and backend-only AI features." }),
    appConfig.missingEnv.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "notice", children: [
      "Missing browser-safe environment variable names: ",
      appConfig.missingEnv.join(", "),
      "."
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "button-row", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Link, { className: "primary-link", to: "/dashboard", children: "Open dashboard" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Link, { className: "secondary-link", to: "/health", children: "Check system health" })
    ] })
  ] });
}

// client/src/pages/DashboardPage.tsx
var import_react3 = __toESM(require_react(), 1);

// client/src/services/api.ts
async function readError(response) {
  try {
    const body = await response.json();
    if (body && typeof body === "object" && "error" in body && typeof body.error === "string") {
      return body.error;
    }
  } catch {
  }
  return `API request failed with status ${response.status}`;
}
async function apiGet(path, token) {
  const response = await fetch(`${appConfig.apiBaseUrl}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : void 0
  });
  if (!response.ok) {
    throw new Error(await readError(response));
  }
  return response.json();
}
async function apiPost(path, body, token) {
  const response = await fetch(`${appConfig.apiBaseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...token ? { Authorization: `Bearer ${token}` } : {}
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new Error(await readError(response));
  }
  return response.json();
}

// client/src/pages/DashboardPage.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
function DashboardPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = (0, import_react3.useState)(null);
  const [error, setError] = (0, import_react3.useState)(null);
  (0, import_react3.useEffect)(() => {
    async function loadProfile() {
      const token = await getAccessTokenSilently();
      const data = await apiGet("/api/me", token);
      setProfile(data);
    }
    void loadProfile().catch((requestError) => setError(requestError.message));
  }, [getAccessTokenSilently]);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "page-section", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "eyebrow", children: "Authenticated area" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h1", { children: "Course project dashboard" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "lead", children: "This route requires Auth0 login and a normal or admin permission." }),
    profile ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "data-panel", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
        "Auth0 subject: ",
        profile.subject
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
        "Permissions: ",
        profile.permissions.join(", ") || "none in token"
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "status-panel", children: error || "Loading your verified token claims..." })
  ] });
}

// client/src/pages/AdminPage.tsx
var import_react4 = __toESM(require_react(), 1);
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
function AdminPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [result, setResult] = (0, import_react4.useState)(null);
  const [error, setError] = (0, import_react4.useState)(null);
  (0, import_react4.useEffect)(() => {
    async function loadAdminCheck() {
      const token = await getAccessTokenSilently();
      const data = await apiGet("/api/admin/check", token);
      setResult(data);
    }
    void loadAdminCheck().catch((requestError) => setError(requestError.message));
  }, [getAccessTokenSilently]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("section", { className: "page-section", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "eyebrow", children: "Admin area" }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h1", { children: "Admin permission check" }),
    result ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "data-panel", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
        "Backend authorised: ",
        String(result.ok)
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
        "Required permission: ",
        result.requiredPermission
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "status-panel", children: error || "Checking admin permission..." })
  ] });
}

// client/src/pages/HealthPage.tsx
var import_react5 = __toESM(require_react(), 1);
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
function HealthPage() {
  const [health, setHealth] = (0, import_react5.useState)(null);
  const [error, setError] = (0, import_react5.useState)(null);
  (0, import_react5.useEffect)(() => {
    void apiGet("/api/health").then(setHealth).catch((requestError) => setError(requestError.message));
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("section", { className: "page-section", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "eyebrow", children: "System status" }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h1", { children: "Backend health" }),
    health ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "data-panel", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { children: [
        "Status: ",
        health.status
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { children: [
        "Service: ",
        health.service
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { children: [
        "Checked: ",
        new Date(health.timestamp).toLocaleString()
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "status-panel", children: error || "Checking backend..." })
  ] });
}

// client/src/pages/Ws4DemoPage.tsx
var import_react6 = __toESM(require_react(), 1);

// client/src/data/ws4Scenarios.ts
var emptySpeaker = {
  name: "",
  organization: "",
  role_title: "",
  is_external: true,
  is_vip: false,
  is_politically_sensitive: false,
  requires_security_review: false,
  notes: ""
};
var baseEvent = {
  event_id: "evt_ws4_demo",
  status: "draft",
  created_at: "2026-05-26T09:00:00Z",
  updated_at: "2026-05-26T09:00:00Z",
  organizer: {
    name: "Student Organiser",
    email: "organiser@example.com",
    club_or_department: "Student Club",
    role: "Club officer",
    deputy_name: "",
    deputy_email: ""
  },
  event_basics: {
    title: "Untitled event",
    description: "",
    purpose: "",
    lifecycle_phase: "ideation",
    monday_status_hint: "requested",
    event_type: "unknown",
    is_recurring: false,
    previous_event_reference: "",
    target_date: "2026-06-18",
    start_time: "18:00",
    end_time: "19:30",
    is_multi_day: false,
    expected_attendance: null,
    actual_attendance: null,
    registration_link: "",
    attendance_estimate_type: "unknown",
    audience_types: ["students"],
    external_audience: false
  },
  space_and_setup: {
    space_confirmed: false,
    preferred_space: "",
    space_requirements: "",
    layout_preference: "",
    needs_booths: false,
    number_of_booths: null,
    needs_cloakroom: false,
    needs_signage: false,
    setup_notes: ""
  },
  catering: {
    needs_catering: false,
    catering_style: "none",
    needs_alcohol: false,
    dietary_requirements_known: false,
    external_caterer: false,
    catering_notes: "",
    budget_estimate: null
  },
  av_and_tech: {
    needs_av: false,
    microphones: false,
    projector_or_screen: false,
    recording: false,
    livestreaming: false,
    hybrid: false,
    complex_av: false,
    av_notes: ""
  },
  speakers_and_guests: {
    has_external_speakers: false,
    speakers: [],
    faculty_attending: [],
    total_faculty_hours: null,
    alumni_speakers: false,
    dean_attendance_requested: false,
    vip_or_embassy_presence: false,
    media_expected: false,
    guest_list_required: false,
    sensitive_topic: "unknown"
  },
  sponsorship_and_external_parties: {
    has_sponsors: false,
    sponsor_names: [],
    has_external_vendors: false,
    vendor_notes: "",
    requires_booth_or_branding: false
  },
  planning_and_governance: {
    business_case_required: false,
    business_case_link: "",
    crib_sheet_link: "",
    dean_attendance_status: "",
    security_review_status: "",
    advancement_review_status: "",
    editorial_content_tags: [],
    editorial_theme: "",
    content_priority: "",
    free_or_paid: "",
    events_oversight_review_date: "",
    dean_review_date: "",
    editorial_review_date: "",
    event_promo_review_date: "",
    ccn_review_date: "",
    ep_review_date: "",
    photography_requested: false,
    event_overview_tags: []
  },
  process_context: {
    monday_handoff_intent: "unknown",
    organizer_uses_monday: false,
    staff_visibility_requested: false,
    known_monday_item_id: "",
    process_notes: "Most organisers do not actively use Monday; treat Monday as optional staff-side handoff."
  },
  intake_state: {
    source: "manual",
    completeness_score: null,
    missing_fields: [],
    assumptions: []
  }
};
function clone(event) {
  return JSON.parse(JSON.stringify(event));
}
var ws4Scenarios = {
  workshop: clone({
    ...baseEvent,
    event_id: "evt_small_workshop",
    event_basics: {
      ...baseEvent.event_basics,
      title: "Small Internal Skills Workshop",
      description: "A small student-only skills workshop with an internal facilitator.",
      purpose: "Skills development for club members.",
      event_type: "workshop",
      expected_attendance: 25,
      attendance_estimate_type: "rough_estimate",
      audience_types: ["students"],
      external_audience: false
    },
    space_and_setup: {
      ...baseEvent.space_and_setup,
      space_confirmed: true,
      preferred_space: "Standard classroom",
      layout_preference: "Classroom"
    }
  }),
  alumniReception: clone({
    ...baseEvent,
    event_id: "evt_alumni_reception",
    event_basics: {
      ...baseEvent.event_basics,
      title: "Alumni Networking Reception",
      description: "Evening networking reception for students and alumni.",
      purpose: "Relationship building and career networking.",
      lifecycle_phase: "detailed_planning",
      monday_status_hint: "tentative",
      event_type: "networking",
      expected_attendance: 80,
      attendance_estimate_type: "rough_estimate",
      audience_types: ["students", "alumni"],
      external_audience: false
    },
    catering: {
      ...baseEvent.catering,
      needs_catering: true,
      catering_style: "reception",
      needs_alcohol: true,
      catering_notes: "Evening drinks and light food."
    },
    speakers_and_guests: {
      ...baseEvent.speakers_and_guests,
      alumni_speakers: true
    },
    planning_and_governance: {
      ...baseEvent.planning_and_governance,
      advancement_review_status: "Speakers shared with Advancement",
      event_overview_tags: ["Speakers Shared with Advancement"]
    }
  }),
  externalSpeaker: clone({
    ...baseEvent,
    event_id: "evt_external_speaker",
    event_basics: {
      ...baseEvent.event_basics,
      title: "External Speaker Fireside Chat",
      description: "A named external speaker speaking to students and guests.",
      purpose: "Sector insight and discussion.",
      lifecycle_phase: "detailed_planning",
      monday_status_hint: "can_progress",
      event_type: "speaker",
      expected_attendance: 60,
      audience_types: ["students", "external_guests"],
      external_audience: true
    },
    av_and_tech: {
      ...baseEvent.av_and_tech,
      needs_av: true,
      microphones: true,
      projector_or_screen: true,
      av_notes: "Speaker microphone and slides."
    },
    speakers_and_guests: {
      ...baseEvent.speakers_and_guests,
      has_external_speakers: true,
      guest_list_required: true,
      sensitive_topic: "no",
      speakers: [
        {
          ...emptySpeaker,
          name: "External Speaker",
          organization: "Example Organisation",
          role_title: "Senior Leader"
        }
      ]
    },
    planning_and_governance: {
      ...baseEvent.planning_and_governance,
      security_review_status: "Speakers shared with Security",
      editorial_content_tags: ["PR Managers", "Event Promo Group"],
      event_promo_review_date: "2026-06-01",
      event_overview_tags: ["Speakers shared with Security", "Shared with PR"]
    }
  }),
  careersFair: clone({
    ...baseEvent,
    event_id: "evt_careers_fair",
    event_basics: {
      ...baseEvent.event_basics,
      title: "Multi-Club Careers Fair",
      description: "Careers fair with employer booths, sponsors, catering, and student attendance.",
      purpose: "Employer engagement and recruitment.",
      lifecycle_phase: "detailed_planning",
      monday_status_hint: "confirmed",
      event_type: "careers",
      expected_attendance: 200,
      audience_types: ["students", "corporate_partners"],
      external_audience: true
    },
    space_and_setup: {
      ...baseEvent.space_and_setup,
      needs_booths: true,
      number_of_booths: 20,
      needs_signage: true,
      setup_notes: "Multiple employer booths and registration table."
    },
    catering: {
      ...baseEvent.catering,
      needs_catering: true,
      catering_style: "buffet",
      budget_estimate: 2500
    },
    sponsorship_and_external_parties: {
      ...baseEvent.sponsorship_and_external_parties,
      has_sponsors: true,
      sponsor_names: ["Example Sponsor"],
      requires_booth_or_branding: true
    },
    planning_and_governance: {
      ...baseEvent.planning_and_governance,
      business_case_required: true,
      business_case_link: "Mock business case link",
      free_or_paid: "Free",
      event_overview_tags: ["Business case required", "Sponsorship Support Requested"]
    },
    process_context: {
      ...baseEvent.process_context,
      monday_handoff_intent: "optional",
      staff_visibility_requested: true
    }
  }),
  vipLeader: clone({
    ...baseEvent,
    event_id: "evt_vip_leader",
    event_basics: {
      ...baseEvent.event_basics,
      title: "VIP Public Leader Event",
      description: "High-profile public leader event with external guests and possible media interest.",
      purpose: "Flagship speaker engagement.",
      lifecycle_phase: "editorial_content_planning",
      monday_status_hint: "confirmed_subject_to_business_case",
      event_type: "speaker",
      registration_link: "https://example.com/register",
      expected_attendance: 120,
      audience_types: ["students", "faculty", "vip", "public"],
      external_audience: true
    },
    av_and_tech: {
      ...baseEvent.av_and_tech,
      needs_av: true,
      microphones: true,
      projector_or_screen: true,
      recording: true,
      complex_av: true,
      av_notes: "Multiple microphones, recording, and staging support."
    },
    speakers_and_guests: {
      ...baseEvent.speakers_and_guests,
      has_external_speakers: true,
      dean_attendance_requested: true,
      faculty_attending: ["Example Faculty Member"],
      total_faculty_hours: 2,
      vip_or_embassy_presence: true,
      media_expected: true,
      guest_list_required: true,
      sensitive_topic: "yes",
      speakers: [
        {
          ...emptySpeaker,
          name: "VIP Public Leader",
          organization: "Public Institution",
          role_title: "Senior Public Leader",
          is_vip: true,
          is_politically_sensitive: true,
          requires_security_review: true
        }
      ]
    },
    planning_and_governance: {
      ...baseEvent.planning_and_governance,
      business_case_required: true,
      business_case_link: "Mock business case link",
      dean_attendance_status: "Requested",
      security_review_status: "Security issues",
      editorial_content_tags: ["Editorial Content", "Event Promo Group", "Social", "CC Network"],
      editorial_theme: "Leadership and policy",
      content_priority: "Gold",
      free_or_paid: "Free",
      events_oversight_review_date: "2026-06-02",
      dean_review_date: "2026-06-03",
      editorial_review_date: "2026-06-04",
      event_promo_review_date: "2026-06-05",
      ccn_review_date: "2026-06-06",
      ep_review_date: "2026-06-07",
      photography_requested: true,
      event_overview_tags: ["Business case required", "Security issues", "Shared with PR", "Photography agreed"]
    },
    process_context: {
      ...baseEvent.process_context,
      monday_handoff_intent: "requested",
      staff_visibility_requested: true,
      process_notes: "High-visibility event likely needs staff triage before any optional Monday handoff."
    }
  })
};

// client/src/pages/Ws4DemoPage.tsx
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var scenarioOptions = [
  ["workshop", "Small internal workshop"],
  ["alumniReception", "Alumni reception"],
  ["externalSpeaker", "External speaker"],
  ["careersFair", "Careers fair"],
  ["vipLeader", "VIP/public leader"]
];
var scenarioGuide = [
  {
    key: "workshop",
    name: "Small internal workshop",
    description: "Low-complexity student session with confirmed classroom space and no external dependencies.",
    expected: "Mostly space confirmation; no security or catering."
  },
  {
    key: "alumniReception",
    name: "Alumni reception",
    description: "Evening networking event with alumni, catering, and alcohol.",
    expected: "Catering and campus operations coordination."
  },
  {
    key: "externalSpeaker",
    name: "External speaker",
    description: "Student event with a named external speaker, guest list, and basic AV.",
    expected: "AV plus editorial/stakeholder visibility."
  },
  {
    key: "careersFair",
    name: "Careers fair",
    description: "Large multi-club event with employer booths, sponsors, catering, and setup needs.",
    expected: "Space, sponsorship, SA operations, and catering."
  },
  {
    key: "vipLeader",
    name: "VIP/public leader",
    description: "High-profile speaker event with public audience, media sensitivity, and guest control.",
    expected: "High-complexity tiering, security, and editorial planning."
  }
];
var eventTypes = ["panel", "conference", "workshop", "networking", "social", "speaker", "careers", "other", "unknown"];
var lifecyclePhases = ["ideation", "feasibility", "detailed_planning", "editorial_content_planning", "pre_event_execution", "event_day", "post_event", "unknown"];
var mondayStatusHints = [
  "requested",
  "proposed",
  "tbd",
  "more_info_required",
  "can_progress",
  "tentative",
  "date_to_be_confirmed",
  "confirmed_subject_to_business_case",
  "confirmed",
  "confirmed_space_check",
  "stuck_issues",
  "changing_plans",
  "cancelled_moved",
  "not_happening",
  "unknown"
];
var attendanceTypes = ["unknown", "rough_estimate", "confirmed_estimate", "capacity_limit"];
var audienceTypes = ["students", "faculty", "staff", "alumni", "external_guests", "corporate_partners", "public", "vip", "mixed"];
var cateringStyles = ["none", "refreshments", "buffet", "plated", "reception", "bespoke", "unknown"];
var sensitiveTopicOptions = ["yes", "no", "unknown"];
var statuses = ["draft", "ready_for_review", "submitted"];
var intakeSources = ["manual", "document_upload", "email_extract", "unknown"];
var mondayHandoffIntents = ["none", "optional", "requested", "already_tracked", "unknown"];
function cloneEvent(eventRequest) {
  return JSON.parse(JSON.stringify(eventRequest));
}
function linesToList(value) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}
function listToLines(value) {
  return value.join("\n");
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("label", { className: "form-field", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: label }),
    children
  ] });
}
function TextInput({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Field, { label, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("input", { value, onChange: (event) => onChange(event.target.value) }) });
}
function TextArea({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Field, { label, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("textarea", { value, onChange: (event) => onChange(event.target.value), rows: 3 }) });
}
function NumberInput({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Field, { label, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    "input",
    {
      type: "number",
      value: value ?? "",
      onChange: (event) => onChange(event.target.value === "" ? null : Number(event.target.value))
    }
  ) });
}
function SelectInput({
  label,
  value,
  options,
  onChange
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Field, { label, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("select", { value, onChange: (event) => onChange(event.target.value), children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: option, children: option }, option)) }) });
}
function CheckboxInput({
  label,
  checked,
  onChange
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("label", { className: "checkbox-field", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("input", { type: "checkbox", checked, onChange: (event) => onChange(event.target.checked) }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: label })
  ] });
}
function ResponsePanel({ title, value, error }) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { className: "response-panel", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h3", { children: title }),
    error ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("pre", { className: "error-output", children: error }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("pre", { children: value ? JSON.stringify(value, null, 2) : "No response yet." })
  ] });
}
function Ws4DemoPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [scenario, setScenario] = (0, import_react6.useState)("externalSpeaker");
  const [eventRequest, setEventRequest] = (0, import_react6.useState)(() => cloneEvent(ws4Scenarios.externalSpeaker));
  const [results, setResults] = (0, import_react6.useState)({});
  const [errors, setErrors] = (0, import_react6.useState)({});
  const [busyAction, setBusyAction] = (0, import_react6.useState)(null);
  const eventPayload = (0, import_react6.useMemo)(() => ({ event_request: eventRequest }), [eventRequest]);
  function updateRoot(key, value) {
    setEventRequest((current) => ({ ...current, [key]: value }));
  }
  function updateSection(section, field, value) {
    setEventRequest((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value
      }
    }));
  }
  function loadScenario(value) {
    setScenario(value);
    setEventRequest(cloneEvent(ws4Scenarios[value]));
    setResults({});
    setErrors({});
  }
  function setResult(key, value) {
    setResults((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: void 0 }));
  }
  function setError(key, error) {
    setErrors((current) => ({ ...current, [key]: error instanceof Error ? error.message : String(error) }));
  }
  async function withBusy(action, task) {
    setBusyAction(action);
    try {
      await task();
    } finally {
      setBusyAction(null);
    }
  }
  async function getToken() {
    return getAccessTokenSilently();
  }
  async function checkAuth() {
    await withBusy("auth", async () => {
      const token = await getToken();
      const me2 = await apiGet("/api/me", token);
      const normal = await apiGet("/api/normal/check", token);
      setResult("auth", { me: me2, normal });
    }).catch((error) => setError("auth", error));
  }
  async function checkAiStatus() {
    await withBusy("ai", async () => {
      const token = await getToken();
      setResult("ai", await apiGet("/api/ai/status", token));
    }).catch((error) => setError("ai", error));
  }
  async function classifyTier() {
    await withBusy("classification", async () => {
      const token = await getToken();
      setResult("classification", await apiPost("/api/tiering/classify", eventPayload, token));
    }).catch((error) => setError("classification", error));
  }
  async function buildRouting(classificationOverride = results.classification) {
    const token = await getToken();
    const payload = {
      event_request: eventRequest,
      ...classificationOverride ? { classification: classificationOverride } : {}
    };
    const routing = await apiPost("/api/routing/stakeholder-packets", payload, token);
    setResult("routing", routing);
    return routing;
  }
  async function buildStakeholderPackets() {
    await withBusy("routing", async () => {
      await buildRouting();
    }).catch((error) => setError("routing", error));
  }
  async function buildMondayPayload(routingOverride = results.routing, classificationOverride = results.classification) {
    const token = await getToken();
    const payload = {
      event_request: eventRequest,
      ...classificationOverride ? { classification: classificationOverride } : {},
      ...routingOverride ? { stakeholder_packets: routingOverride } : {}
    };
    const monday = await apiPost("/api/integrations/monday/build-payload", payload, token);
    setResult("monday", monday);
    return monday;
  }
  async function buildMonday() {
    await withBusy("monday", async () => {
      await buildMondayPayload();
    }).catch((error) => setError("monday", error));
  }
  async function runFullFlow() {
    await withBusy("fullFlow", async () => {
      let classification;
      try {
        const token = await getToken();
        classification = await apiPost("/api/tiering/classify", eventPayload, token);
        setResult("classification", classification);
      } catch (error) {
        setError("classification", error);
      }
      const routing = await buildRouting(classification);
      await buildMondayPayload(routing, classification);
      setErrors((current) => ({ ...current, fullFlow: void 0 }));
    }).catch((error) => setError("fullFlow", error));
  }
  function updateAudience(type, checked) {
    const current = eventRequest.event_basics.audience_types;
    updateSection(
      "event_basics",
      "audience_types",
      checked ? [.../* @__PURE__ */ new Set([...current, type])] : current.filter((item) => item !== type)
    );
  }
  function updateSpeaker(index, field, value) {
    const speakers = eventRequest.speakers_and_guests.speakers.map(
      (speaker, speakerIndex) => speakerIndex === index ? { ...speaker, [field]: value } : speaker
    );
    updateSection("speakers_and_guests", "speakers", speakers);
  }
  function removeSpeaker(index) {
    updateSection(
      "speakers_and_guests",
      "speakers",
      eventRequest.speakers_and_guests.speakers.filter((_2, speakerIndex) => speakerIndex !== index)
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { className: "ws4-demo", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "ws4-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "eyebrow", children: "WS4 testing harness" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h1", { children: "Event request tester" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "scenario-control", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        SelectInput,
        {
          label: "Scenario",
          value: scenario,
          options: scenarioOptions.map(([value]) => value),
          onChange: (value) => loadScenario(value)
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "scenario-guide", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("table", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("caption", { children: "Scenario guide" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("th", { children: "Scenario" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("th", { children: "What it is" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("th", { children: "What to expect" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("tbody", { children: scenarioGuide.map((item) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("tr", { className: scenario === item.key ? "active-scenario" : void 0, children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("td", { children: item.name }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("td", { children: item.description }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("td", { children: item.expected })
      ] }, item.key)) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "button-row ws4-actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", onClick: () => void checkAuth(), disabled: busyAction !== null, children: "Check Auth/API" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", onClick: () => void checkAiStatus(), disabled: busyAction !== null, children: "Check AI Status" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", onClick: () => void classifyTier(), disabled: busyAction !== null, children: "Classify Tier" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", onClick: () => void buildStakeholderPackets(), disabled: busyAction !== null, children: "Build Stakeholder Packets" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", onClick: () => void buildMonday(), disabled: busyAction !== null, children: "Build Monday Mock Payload" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", onClick: () => void runFullFlow(), disabled: busyAction !== null, children: "Run Full Flow" })
    ] }),
    busyAction ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "status-panel", children: [
      "Running ",
      busyAction,
      "..."
    ] }) : null,
    errors.fullFlow ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "status-panel", children: errors.fullFlow }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "ws4-layout", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("form", { className: "ws4-form", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { className: "form-section", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h2", { children: "Root" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "form-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "event_id", value: eventRequest.event_id, onChange: (value) => updateRoot("event_id", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectInput, { label: "status", value: eventRequest.status, options: statuses, onChange: (value) => updateRoot("status", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "created_at", value: eventRequest.created_at, onChange: (value) => updateRoot("created_at", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "updated_at", value: eventRequest.updated_at, onChange: (value) => updateRoot("updated_at", value) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { className: "form-section", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h2", { children: "Organiser" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "form-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "name", value: eventRequest.organizer.name, onChange: (value) => updateSection("organizer", "name", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "email", value: eventRequest.organizer.email, onChange: (value) => updateSection("organizer", "email", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "club_or_department", value: eventRequest.organizer.club_or_department, onChange: (value) => updateSection("organizer", "club_or_department", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "role", value: eventRequest.organizer.role, onChange: (value) => updateSection("organizer", "role", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "deputy_name", value: eventRequest.organizer.deputy_name, onChange: (value) => updateSection("organizer", "deputy_name", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "deputy_email", value: eventRequest.organizer.deputy_email, onChange: (value) => updateSection("organizer", "deputy_email", value) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { className: "form-section", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h2", { children: "Event basics" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "form-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "title", value: eventRequest.event_basics.title, onChange: (value) => updateSection("event_basics", "title", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectInput, { label: "lifecycle_phase", value: eventRequest.event_basics.lifecycle_phase, options: lifecyclePhases, onChange: (value) => updateSection("event_basics", "lifecycle_phase", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectInput, { label: "monday_status_hint", value: eventRequest.event_basics.monday_status_hint, options: mondayStatusHints, onChange: (value) => updateSection("event_basics", "monday_status_hint", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectInput, { label: "event_type", value: eventRequest.event_basics.event_type, options: eventTypes, onChange: (value) => updateSection("event_basics", "event_type", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "target_date", value: eventRequest.event_basics.target_date, onChange: (value) => updateSection("event_basics", "target_date", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "start_time", value: eventRequest.event_basics.start_time, onChange: (value) => updateSection("event_basics", "start_time", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "end_time", value: eventRequest.event_basics.end_time, onChange: (value) => updateSection("event_basics", "end_time", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(NumberInput, { label: "expected_attendance", value: eventRequest.event_basics.expected_attendance, onChange: (value) => updateSection("event_basics", "expected_attendance", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(NumberInput, { label: "actual_attendance", value: eventRequest.event_basics.actual_attendance, onChange: (value) => updateSection("event_basics", "actual_attendance", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "registration_link", value: eventRequest.event_basics.registration_link, onChange: (value) => updateSection("event_basics", "registration_link", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectInput, { label: "attendance_estimate_type", value: eventRequest.event_basics.attendance_estimate_type, options: attendanceTypes, onChange: (value) => updateSection("event_basics", "attendance_estimate_type", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "previous_event_reference", value: eventRequest.event_basics.previous_event_reference, onChange: (value) => updateSection("event_basics", "previous_event_reference", value) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextArea, { label: "description", value: eventRequest.event_basics.description, onChange: (value) => updateSection("event_basics", "description", value) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextArea, { label: "purpose", value: eventRequest.event_basics.purpose, onChange: (value) => updateSection("event_basics", "purpose", value) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "checkbox-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "is_recurring", checked: eventRequest.event_basics.is_recurring, onChange: (value) => updateSection("event_basics", "is_recurring", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "is_multi_day", checked: eventRequest.event_basics.is_multi_day, onChange: (value) => updateSection("event_basics", "is_multi_day", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "external_audience", checked: eventRequest.event_basics.external_audience, onChange: (value) => updateSection("event_basics", "external_audience", value) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "multi-select", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: "audience_types" }),
            audienceTypes.map((type) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              CheckboxInput,
              {
                label: type,
                checked: eventRequest.event_basics.audience_types.includes(type),
                onChange: (checked) => updateAudience(type, checked)
              },
              type
            ))
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { className: "form-section", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h2", { children: "Space and setup" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "form-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "preferred_space", value: eventRequest.space_and_setup.preferred_space, onChange: (value) => updateSection("space_and_setup", "preferred_space", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "layout_preference", value: eventRequest.space_and_setup.layout_preference, onChange: (value) => updateSection("space_and_setup", "layout_preference", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(NumberInput, { label: "number_of_booths", value: eventRequest.space_and_setup.number_of_booths, onChange: (value) => updateSection("space_and_setup", "number_of_booths", value) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextArea, { label: "space_requirements", value: eventRequest.space_and_setup.space_requirements, onChange: (value) => updateSection("space_and_setup", "space_requirements", value) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextArea, { label: "setup_notes", value: eventRequest.space_and_setup.setup_notes, onChange: (value) => updateSection("space_and_setup", "setup_notes", value) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "checkbox-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "space_confirmed", checked: eventRequest.space_and_setup.space_confirmed, onChange: (value) => updateSection("space_and_setup", "space_confirmed", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "needs_booths", checked: eventRequest.space_and_setup.needs_booths, onChange: (value) => updateSection("space_and_setup", "needs_booths", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "needs_cloakroom", checked: eventRequest.space_and_setup.needs_cloakroom, onChange: (value) => updateSection("space_and_setup", "needs_cloakroom", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "needs_signage", checked: eventRequest.space_and_setup.needs_signage, onChange: (value) => updateSection("space_and_setup", "needs_signage", value) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { className: "form-section", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h2", { children: "Catering" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "form-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectInput, { label: "catering_style", value: eventRequest.catering.catering_style, options: cateringStyles, onChange: (value) => updateSection("catering", "catering_style", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(NumberInput, { label: "budget_estimate", value: eventRequest.catering.budget_estimate, onChange: (value) => updateSection("catering", "budget_estimate", value) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextArea, { label: "catering_notes", value: eventRequest.catering.catering_notes, onChange: (value) => updateSection("catering", "catering_notes", value) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "checkbox-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "needs_catering", checked: eventRequest.catering.needs_catering, onChange: (value) => updateSection("catering", "needs_catering", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "needs_alcohol", checked: eventRequest.catering.needs_alcohol, onChange: (value) => updateSection("catering", "needs_alcohol", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "dietary_requirements_known", checked: eventRequest.catering.dietary_requirements_known, onChange: (value) => updateSection("catering", "dietary_requirements_known", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "external_caterer", checked: eventRequest.catering.external_caterer, onChange: (value) => updateSection("catering", "external_caterer", value) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { className: "form-section", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h2", { children: "AV and tech" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextArea, { label: "av_notes", value: eventRequest.av_and_tech.av_notes, onChange: (value) => updateSection("av_and_tech", "av_notes", value) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "checkbox-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "needs_av", checked: eventRequest.av_and_tech.needs_av, onChange: (value) => updateSection("av_and_tech", "needs_av", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "microphones", checked: eventRequest.av_and_tech.microphones, onChange: (value) => updateSection("av_and_tech", "microphones", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "projector_or_screen", checked: eventRequest.av_and_tech.projector_or_screen, onChange: (value) => updateSection("av_and_tech", "projector_or_screen", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "recording", checked: eventRequest.av_and_tech.recording, onChange: (value) => updateSection("av_and_tech", "recording", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "livestreaming", checked: eventRequest.av_and_tech.livestreaming, onChange: (value) => updateSection("av_and_tech", "livestreaming", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "hybrid", checked: eventRequest.av_and_tech.hybrid, onChange: (value) => updateSection("av_and_tech", "hybrid", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "complex_av", checked: eventRequest.av_and_tech.complex_av, onChange: (value) => updateSection("av_and_tech", "complex_av", value) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { className: "form-section", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h2", { children: "Speakers and guests" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "form-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectInput, { label: "sensitive_topic", value: eventRequest.speakers_and_guests.sensitive_topic, options: sensitiveTopicOptions, onChange: (value) => updateSection("speakers_and_guests", "sensitive_topic", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(NumberInput, { label: "total_faculty_hours", value: eventRequest.speakers_and_guests.total_faculty_hours, onChange: (value) => updateSection("speakers_and_guests", "total_faculty_hours", value) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextArea, { label: "faculty_attending", value: listToLines(eventRequest.speakers_and_guests.faculty_attending), onChange: (value) => updateSection("speakers_and_guests", "faculty_attending", linesToList(value)) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "checkbox-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "has_external_speakers", checked: eventRequest.speakers_and_guests.has_external_speakers, onChange: (value) => updateSection("speakers_and_guests", "has_external_speakers", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "alumni_speakers", checked: eventRequest.speakers_and_guests.alumni_speakers, onChange: (value) => updateSection("speakers_and_guests", "alumni_speakers", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "dean_attendance_requested", checked: eventRequest.speakers_and_guests.dean_attendance_requested, onChange: (value) => updateSection("speakers_and_guests", "dean_attendance_requested", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "vip_or_embassy_presence", checked: eventRequest.speakers_and_guests.vip_or_embassy_presence, onChange: (value) => updateSection("speakers_and_guests", "vip_or_embassy_presence", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "media_expected", checked: eventRequest.speakers_and_guests.media_expected, onChange: (value) => updateSection("speakers_and_guests", "media_expected", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "guest_list_required", checked: eventRequest.speakers_and_guests.guest_list_required, onChange: (value) => updateSection("speakers_and_guests", "guest_list_required", value) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "array-header", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h3", { children: "speakers" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", onClick: () => updateSection("speakers_and_guests", "speakers", [...eventRequest.speakers_and_guests.speakers, { ...emptySpeaker }]), children: "Add speaker" })
          ] }),
          eventRequest.speakers_and_guests.speakers.map((speaker, index) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "array-item", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "form-grid", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "name", value: speaker.name, onChange: (value) => updateSpeaker(index, "name", value) }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "organization", value: speaker.organization, onChange: (value) => updateSpeaker(index, "organization", value) }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "role_title", value: speaker.role_title, onChange: (value) => updateSpeaker(index, "role_title", value) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextArea, { label: "notes", value: speaker.notes, onChange: (value) => updateSpeaker(index, "notes", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "checkbox-grid", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "is_external", checked: speaker.is_external, onChange: (value) => updateSpeaker(index, "is_external", value) }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "is_vip", checked: speaker.is_vip, onChange: (value) => updateSpeaker(index, "is_vip", value) }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "is_politically_sensitive", checked: speaker.is_politically_sensitive, onChange: (value) => updateSpeaker(index, "is_politically_sensitive", value) }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "requires_security_review", checked: speaker.requires_security_review, onChange: (value) => updateSpeaker(index, "requires_security_review", value) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", onClick: () => removeSpeaker(index), children: "Remove speaker" })
          ] }, `${index}-${speaker.name}`))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { className: "form-section", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h2", { children: "Sponsorship and external parties" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextArea, { label: "sponsor_names", value: listToLines(eventRequest.sponsorship_and_external_parties.sponsor_names), onChange: (value) => updateSection("sponsorship_and_external_parties", "sponsor_names", linesToList(value)) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextArea, { label: "vendor_notes", value: eventRequest.sponsorship_and_external_parties.vendor_notes, onChange: (value) => updateSection("sponsorship_and_external_parties", "vendor_notes", value) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "checkbox-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "has_sponsors", checked: eventRequest.sponsorship_and_external_parties.has_sponsors, onChange: (value) => updateSection("sponsorship_and_external_parties", "has_sponsors", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "has_external_vendors", checked: eventRequest.sponsorship_and_external_parties.has_external_vendors, onChange: (value) => updateSection("sponsorship_and_external_parties", "has_external_vendors", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "requires_booth_or_branding", checked: eventRequest.sponsorship_and_external_parties.requires_booth_or_branding, onChange: (value) => updateSection("sponsorship_and_external_parties", "requires_booth_or_branding", value) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { className: "form-section", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h2", { children: "Planning and governance" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "form-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "business_case_link", value: eventRequest.planning_and_governance.business_case_link, onChange: (value) => updateSection("planning_and_governance", "business_case_link", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "crib_sheet_link", value: eventRequest.planning_and_governance.crib_sheet_link, onChange: (value) => updateSection("planning_and_governance", "crib_sheet_link", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "dean_attendance_status", value: eventRequest.planning_and_governance.dean_attendance_status, onChange: (value) => updateSection("planning_and_governance", "dean_attendance_status", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "security_review_status", value: eventRequest.planning_and_governance.security_review_status, onChange: (value) => updateSection("planning_and_governance", "security_review_status", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "advancement_review_status", value: eventRequest.planning_and_governance.advancement_review_status, onChange: (value) => updateSection("planning_and_governance", "advancement_review_status", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "editorial_theme", value: eventRequest.planning_and_governance.editorial_theme, onChange: (value) => updateSection("planning_and_governance", "editorial_theme", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "content_priority", value: eventRequest.planning_and_governance.content_priority, onChange: (value) => updateSection("planning_and_governance", "content_priority", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "free_or_paid", value: eventRequest.planning_and_governance.free_or_paid, onChange: (value) => updateSection("planning_and_governance", "free_or_paid", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "events_oversight_review_date", value: eventRequest.planning_and_governance.events_oversight_review_date, onChange: (value) => updateSection("planning_and_governance", "events_oversight_review_date", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "dean_review_date", value: eventRequest.planning_and_governance.dean_review_date, onChange: (value) => updateSection("planning_and_governance", "dean_review_date", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "editorial_review_date", value: eventRequest.planning_and_governance.editorial_review_date, onChange: (value) => updateSection("planning_and_governance", "editorial_review_date", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "event_promo_review_date", value: eventRequest.planning_and_governance.event_promo_review_date, onChange: (value) => updateSection("planning_and_governance", "event_promo_review_date", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "ccn_review_date", value: eventRequest.planning_and_governance.ccn_review_date, onChange: (value) => updateSection("planning_and_governance", "ccn_review_date", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "ep_review_date", value: eventRequest.planning_and_governance.ep_review_date, onChange: (value) => updateSection("planning_and_governance", "ep_review_date", value) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextArea, { label: "editorial_content_tags", value: listToLines(eventRequest.planning_and_governance.editorial_content_tags), onChange: (value) => updateSection("planning_and_governance", "editorial_content_tags", linesToList(value)) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextArea, { label: "event_overview_tags", value: listToLines(eventRequest.planning_and_governance.event_overview_tags), onChange: (value) => updateSection("planning_and_governance", "event_overview_tags", linesToList(value)) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "checkbox-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "business_case_required", checked: eventRequest.planning_and_governance.business_case_required, onChange: (value) => updateSection("planning_and_governance", "business_case_required", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "photography_requested", checked: eventRequest.planning_and_governance.photography_requested, onChange: (value) => updateSection("planning_and_governance", "photography_requested", value) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { className: "form-section", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h2", { children: "Process context" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "form-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              SelectInput,
              {
                label: "monday_handoff_intent",
                value: eventRequest.process_context.monday_handoff_intent,
                options: mondayHandoffIntents,
                onChange: (value) => updateSection("process_context", "monday_handoff_intent", value)
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextInput, { label: "known_monday_item_id", value: eventRequest.process_context.known_monday_item_id, onChange: (value) => updateSection("process_context", "known_monday_item_id", value) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextArea, { label: "process_notes", value: eventRequest.process_context.process_notes, onChange: (value) => updateSection("process_context", "process_notes", value) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "checkbox-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "organizer_uses_monday", checked: eventRequest.process_context.organizer_uses_monday, onChange: (value) => updateSection("process_context", "organizer_uses_monday", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckboxInput, { label: "staff_visibility_requested", checked: eventRequest.process_context.staff_visibility_requested, onChange: (value) => updateSection("process_context", "staff_visibility_requested", value) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { className: "form-section", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h2", { children: "Intake state" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "form-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectInput, { label: "source", value: eventRequest.intake_state.source, options: intakeSources, onChange: (value) => updateSection("intake_state", "source", value) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(NumberInput, { label: "completeness_score", value: eventRequest.intake_state.completeness_score, onChange: (value) => updateSection("intake_state", "completeness_score", value) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextArea, { label: "missing_fields", value: listToLines(eventRequest.intake_state.missing_fields), onChange: (value) => updateSection("intake_state", "missing_fields", linesToList(value)) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TextArea, { label: "assumptions", value: listToLines(eventRequest.intake_state.assumptions), onChange: (value) => updateSection("intake_state", "assumptions", linesToList(value)) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("aside", { className: "ws4-output", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ResponsePanel, { title: "Auth/API", value: results.auth, error: errors.auth }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ResponsePanel, { title: "AI status", value: results.ai, error: errors.ai }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ResponsePanel, { title: "Tiering result", value: results.classification, error: errors.classification }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ResponsePanel, { title: "Stakeholder packets", value: results.routing, error: errors.routing }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ResponsePanel, { title: "Monday mock payload", value: results.monday, error: errors.monday }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { className: "response-panel", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h3", { children: "Current request JSON" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("pre", { children: JSON.stringify(eventPayload, null, 2) })
        ] })
      ] })
    ] })
  ] });
}

// client/src/App.tsx
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
function App() {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Routes, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Route, { path: "/", element: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(HomePage, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Route, { path: "/health", element: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(HealthPage, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      Route,
      {
        path: "/dashboard",
        element: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ProtectedRoute, { allowedPermissions: ["user_normal", "user_admin"], children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(DashboardPage, {}) })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      Route,
      {
        path: "/admin",
        element: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ProtectedRoute, { allowedPermissions: ["user_admin"], children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(AdminPage, {}) })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      Route,
      {
        path: "/ws4-demo",
        element: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ProtectedRoute, { allowedPermissions: ["user_normal", "user_admin"], children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Ws4DemoPage, {}) })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Route, { path: "*", element: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Navigate, { to: "/", replace: true }) })
  ] }) });
}

// client/src/main.tsx
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
import_client.default.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react7.default.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(BrowserRouter, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(App, {}) }) }) })
);
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@remix-run/router/dist/router.js:
  (**
   * @remix-run/router v1.23.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router/dist/index.js:
  (**
   * React Router v6.30.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router-dom/dist/index.js:
  (**
   * React Router DOM v6.30.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
