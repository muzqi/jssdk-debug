// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/helpers/error-msgs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLATFORM_NO_SUPPORT = exports.CMIOT_NO_EXIST = void 0;
var CMIOT_NO_EXIST = {
  resultCode: "100001",
  resultMsg: "环境异常"
};
exports.CMIOT_NO_EXIST = CMIOT_NO_EXIST;
var PLATFORM_NO_SUPPORT = {
  resultCode: "100002",
  resultMsg: "当前平台不支持该方法"
};
exports.PLATFORM_NO_SUPPORT = PLATFORM_NO_SUPPORT;
},{}],"../src/helpers/tools.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUuid = void 0;

/**
 * 生成32位唯一码
 * @param  {Number} len  生成 uid 长度
 * @return {String} uuid
 */
var getUuid = function getUuid() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;

  /* eslint-disable no-multi-assign,no-bitwise */
  var radix = 16; // 16进制

  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  var uuid = [];
  var i;
  radix = radix || chars.length;

  if (len) {
    for (i = 0; i < len; i += 1) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    for (i = 0; i < 36; i += 1) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[i === 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }

  return uuid.join("");
};

exports.getUuid = getUuid;
},{}],"../src/jssdk.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errorMsgs = require("./helpers/error-msgs");

var _tools = require("./helpers/tools");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var JSSdk = /*#__PURE__*/function () {
  function JSSdk() {
    _classCallCheck(this, JSSdk);

    window.CMIOT = {};
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    this.platform = "";

    if (isAndroid) {
      this.platform = "Android";
    }

    if (isiOS) {
      this.platform = "IOS";
    }
  }

  _createClass(JSSdk, [{
    key: "doctor",
    value: function doctor() {
      switch (this.platform) {
        case "Android":
          return !!window.cmiot;

        case "IOS":
          return !!window.webkit && !!window.webkit.messageHandlers && !!window.webkit.messageHandlers.cmiot && !!window.webkit.messageHandlers.cmiot.postMessage;

        default:
          return false;
      }
    }
  }, {
    key: "dealResult",
    value: function dealResult(result) {
      switch (this.platform) {
        case "Android":
          return JSON.parse(result);

        case "IOS":
          return result;

        default:
          return null;
      }
    }
  }, {
    key: "action",
    value: function action(_ref) {
      var _ref$method = _ref.method,
          method = _ref$method === void 0 ? "" : _ref$method,
          _ref$success = _ref.success,
          success = _ref$success === void 0 ? "" : _ref$success,
          _ref$fail = _ref.fail,
          fail = _ref$fail === void 0 ? "" : _ref$fail,
          _ref$complete = _ref.complete,
          complete = _ref$complete === void 0 ? "" : _ref$complete,
          _ref$callback = _ref.callback,
          callback = _ref$callback === void 0 ? "" : _ref$callback,
          _ref$parameters = _ref.parameters,
          parameters = _ref$parameters === void 0 ? {} : _ref$parameters;
      var _parameters = {};
      method && (_parameters.method = method);
      success && (_parameters.success = success);
      fail && (_parameters.fail = fail);
      complete && (_parameters.complete = complete);
      callback && (_parameters.callback = callback);

      switch (this.platform) {
        case "Android":
          cmiot[method](JSON.stringify(_objectSpread(_objectSpread({}, _parameters), parameters)));
          break;

        case "IOS":
          _parameters.parameters = parameters;
          window.webkit.messageHandlers.cmiot.postMessage(_parameters);
          break;

        default:
          break;
      }
    }
  }, {
    key: "createAsync",
    value: function createAsync(_ref2) {
      var _this = this;

      var method = _ref2.method,
          _ref2$success = _ref2.success,
          success = _ref2$success === void 0 ? function () {} : _ref2$success,
          _ref2$fail = _ref2.fail,
          fail = _ref2$fail === void 0 ? function () {} : _ref2$fail,
          _ref2$complete = _ref2.complete,
          complete = _ref2$complete === void 0 ? function () {} : _ref2$complete,
          _ref2$parameters = _ref2.parameters,
          parameters = _ref2$parameters === void 0 ? {} : _ref2$parameters;

      if (!this.doctor()) {
        fail(_errorMsgs.CMIOT_NO_EXIST);
        return;
      }

      if (!this.canIUse(method)) {
        fail(_errorMsgs.PLATFORM_NO_SUPPORT);
        return;
      }

      var _success = "".concat(method, "_success_").concat((0, _tools.getUuid)());

      var _fail = "".concat(method, "_fail_").concat((0, _tools.getUuid)());

      var _complete = "".concat(method, "_complete_").concat((0, _tools.getUuid)());

      window.CMIOT[_success] = function (result) {
        return success(_this.dealResult(result));
      };

      window.CMIOT[_fail] = function (err) {
        return fail(_this.dealResult(err));
      };

      window.CMIOT[_complete] = function (result) {
        return complete(_this.dealResult(result));
      };

      this.action({
        method: method,
        parameters: parameters,
        success: "CMIOT.".concat(_success),
        fail: "CMIOT.".concat(_fail),
        complete: "CMIOT.".concat(_complete)
      });
    }
  }, {
    key: "createAsyncListener",
    value: function createAsyncListener(_ref3) {
      var _this2 = this;

      var method = _ref3.method,
          _ref3$callback = _ref3.callback,
          callback = _ref3$callback === void 0 ? function () {} : _ref3$callback;

      if (!this.doctor()) {
        callback(_errorMsgs.CMIOT_NO_EXIST);
        return;
      }

      if (!this.canIUse(method)) {
        fail(_errorMsgs.PLATFORM_NO_SUPPORT);
        return;
      }

      var _callback = "".concat(method, "_callback_").concat((0, _tools.getUuid)());

      window.CMIOT[_callback] = function (result) {
        return callback(_this2.dealResult(result));
      };

      this.action({
        method: method,
        callback: "CMIOT.".concat(_callback)
      });
    }
  }, {
    key: "canIUse",
    value: function canIUse(method) {
      if (!this.doctor()) {
        return false;
      }

      switch (this.platform) {
        case "Android":
          return cmiot.canIUse(method);

        case "IOS":
          return Number(window.prompt("canIUse", method)) === 0 ? false : true;

        default:
          return false;
      }
    }
  }, {
    key: "getSystemInfo",
    value: function getSystemInfo() {
      if (!this.doctor()) {
        return null;
      }

      switch (this.platform) {
        case "Android":
          return JSON.parse(cmiot.getSystemInfo());

        case "IOS":
          return JSON.parse(window.prompt("getSystemInfo"));

        default:
          return null;
      }
    }
  }, {
    key: "getNetworkType",
    value: function getNetworkType() {
      if (!this.doctor()) {
        return null;
      }

      switch (this.platform) {
        case "Android":
          return cmiot.getNetworkType();

        case "IOS":
          return window.prompt("getNetworkType");

        default:
          return null;
      }
    }
  }, {
    key: "onNetworkStatusChange",
    value: function onNetworkStatusChange(callback) {
      this.createAsyncListener({
        method: "onNetworkStatusChange",
        callback: callback
      });
    }
  }, {
    key: "offNetworkStatusChange",
    value: function offNetworkStatusChange() {
      if (!this.doctor()) {
        return null;
      }

      switch (this.platform) {
        case "Android":
          return cmiot.offNetworkStatusChange();

        case "IOS":
          return window.prompt("offNetworkStatusChange");

        default:
          return null;
      }
    }
  }, {
    key: "getConnectedWifi",
    value: function getConnectedWifi(_ref4) {
      var success = _ref4.success,
          fail = _ref4.fail,
          complete = _ref4.complete;
      this.createAsync({
        method: "getConnectedWifi",
        success: success,
        fail: fail,
        complete: complete
      });
    }
  }, {
    key: "startWifi",
    value: function startWifi(_ref5) {
      var success = _ref5.success,
          fail = _ref5.fail,
          complete = _ref5.complete;
      this.createAsync({
        method: "startWifi",
        success: success,
        fail: fail,
        complete: complete
      });
    }
  }, {
    key: "stopWifi",
    value: function stopWifi(_ref6) {
      var success = _ref6.success,
          fail = _ref6.fail,
          complete = _ref6.complete;
      this.createAsync({
        method: "stopWifi",
        success: success,
        fail: fail,
        complete: complete
      });
    }
  }, {
    key: "getWifiList",
    value: function getWifiList(_ref7) {
      var success = _ref7.success,
          fail = _ref7.fail,
          complete = _ref7.complete;
      this.createAsync({
        method: "getWifiList",
        success: success,
        fail: fail,
        complete: complete
      });
    }
  }, {
    key: "connectWifi",
    value: function connectWifi(_ref8) {
      var SSID = _ref8.SSID,
          _ref8$BSSID = _ref8.BSSID,
          BSSID = _ref8$BSSID === void 0 ? "" : _ref8$BSSID,
          password = _ref8.password,
          success = _ref8.success,
          fail = _ref8.fail,
          complete = _ref8.complete;
      this.createAsync({
        method: "connectWifi",
        success: success,
        fail: fail,
        complete: complete,
        parameters: {
          SSID: SSID,
          BSSID: BSSID,
          password: password
        }
      });
    }
  }, {
    key: "scanCode",
    value: function scanCode(_ref9) {
      var success = _ref9.success,
          fail = _ref9.fail,
          complete = _ref9.complete;
      this.createAsync({
        method: "scanCode",
        success: success,
        fail: fail,
        complete: complete
      });
    }
  }, {
    key: "openBluetoothAdapter",
    value: function openBluetoothAdapter(_ref10) {
      var success = _ref10.success,
          fail = _ref10.fail,
          complete = _ref10.complete;
      this.createAsync({
        method: "openBluetoothAdapter",
        success: success,
        fail: fail,
        complete: complete
      });
    }
  }, {
    key: "closeBluetoothAdapter",
    value: function closeBluetoothAdapter(_ref11) {
      var success = _ref11.success,
          fail = _ref11.fail,
          complete = _ref11.complete;
      this.createAsync({
        method: "closeBluetoothAdapter",
        success: success,
        fail: fail,
        complete: complete
      });
    }
  }, {
    key: "onBluetoothDeviceFound",
    value: function onBluetoothDeviceFound(callback) {
      this.createAsyncListener({
        method: "onBluetoothDeviceFound",
        callback: callback
      });
    }
  }, {
    key: "offBluetoothDeviceFound",
    value: function offBluetoothDeviceFound() {
      if (!this.doctor()) {
        return null;
      }

      switch (this.platform) {
        case "Android":
          return cmiot.offBluetoothDeviceFound();

        case "IOS":
          return window.prompt("offBluetoothDeviceFound");

        default:
          return null;
      }
    }
  }, {
    key: "getBluetoothDevices",
    value: function getBluetoothDevices(_ref12) {
      var success = _ref12.success,
          fail = _ref12.fail,
          complete = _ref12.complete;
      this.createAsync({
        method: "getBluetoothDevices",
        success: success,
        fail: fail,
        complete: complete
      });
    }
  }, {
    key: "navigateTo",
    value: function navigateTo(_ref13) {
      var url = _ref13.url,
          _ref13$customHeader = _ref13.customHeader,
          customHeader = _ref13$customHeader === void 0 ? false : _ref13$customHeader,
          _ref13$title = _ref13.title,
          title = _ref13$title === void 0 ? "Title" : _ref13$title,
          success = _ref13.success,
          fail = _ref13.fail,
          complete = _ref13.complete;
      this.createAsync({
        method: "navigateTo",
        success: success,
        fail: fail,
        complete: complete,
        parameters: {
          url: url,
          customHeader: customHeader,
          title: title
        }
      });
    }
  }]);

  return JSSdk;
}();

var _default = new JSSdk();

exports.default = _default;
},{"./helpers/error-msgs":"../src/helpers/error-msgs.js","./helpers/tools":"../src/helpers/tools.js"}],"../src/index.js":[function(require,module,exports) {
"use strict";

var _jssdk = _interopRequireDefault(require("./jssdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.getElementById("button-can-i-use-scan-code").onclick = function () {
  var b = _jssdk.default.canIUse("scanCode");

  console.log(b);
};

document.getElementById("button-get-systeminfo").onclick = function () {
  var b = _jssdk.default.getSystemInfo();

  console.log(b);
};

document.getElementById("button-get-network-type").onclick = function () {
  var type = _jssdk.default.getNetworkType();

  console.log(type);
};

document.getElementById("button-on-network-status-change").onclick = function () {
  _jssdk.default.onNetworkStatusChange(function (result) {
    console.log(result);
  });
};

document.getElementById("button-off-network-status-change").onclick = function () {
  _jssdk.default.offNetworkStatusChange();
};

document.getElementById("button-get-connected-wifi").onclick = function () {
  _jssdk.default.getConnectedWifi({
    success: function success(res) {
      return console.log("success", res);
    },
    fail: function fail(err) {
      return console.error("error", err);
    },
    complete: function complete(res) {
      if (res.resultCode === "000000") {
        console.log("complete", res);
      }
    }
  });
};

document.getElementById("button-start-wifi").onclick = function () {
  _jssdk.default.startWifi({
    success: function success(res) {
      return console.log("success", res);
    },
    fail: function fail(err) {
      return console.error("error", err);
    },
    complete: function complete(res) {
      if (res.resultCode === "000000") {
        console.log("complete", res);
      }
    }
  });
};

document.getElementById("button-stop-wifi").onclick = function () {
  _jssdk.default.stopWifi({
    success: function success(res) {
      return console.log("success", res);
    },
    fail: function fail(err) {
      return console.error("error", err);
    },
    complete: function complete(res) {
      if (res.resultCode === "000000") {
        console.log("complete", res);
      }
    }
  });
};

document.getElementById("button-get-wifi-list").onclick = function () {
  _jssdk.default.getWifiList({
    success: function success(res) {
      return console.log("success", res);
    },
    fail: function fail(err) {
      return console.error("error", err);
    },
    complete: function complete(res) {
      if (res.resultCode === "000000") {
        console.log("complete", res);
      }
    }
  });
};

document.getElementById("button-connect-wifi").onclick = function () {
  _jssdk.default.connectWifi({
    SSID: "ANDMU_5G_1",
    password: "andmuwifi",
    success: function success(res) {
      return console.log("success", res);
    },
    fail: function fail(err) {
      return console.error("error", err);
    },
    complete: function complete(res) {
      if (res.resultCode === "000000") {
        console.log("complete", res);
      }
    }
  });
};

document.getElementById("button-scan-code").onclick = function () {
  _jssdk.default.scanCode({
    success: function success(res) {
      return console.log("success", res);
    },
    fail: function fail(err) {
      return console.error("error", err);
    },
    complete: function complete(res) {
      if (res.resultCode === "000000") {
        console.log("complete", res);
      }
    }
  });
};

document.getElementById("button-open-bluetooth-adapter").onclick = function () {
  _jssdk.default.openBluetoothAdapter({
    success: function success(res) {
      return console.log("success", res);
    },
    fail: function fail(err) {
      return console.error("error", err);
    },
    complete: function complete(res) {
      if (res.resultCode === "000000") {
        console.log("complete", res);
      }
    }
  });
};

document.getElementById("button-close-bluetooth-adapter").onclick = function () {
  _jssdk.default.closeBluetoothAdapter({
    success: function success(res) {
      return console.log("success", res);
    },
    fail: function fail(err) {
      return console.error("error", err);
    },
    complete: function complete(res) {
      if (res.resultCode === "000000") {
        console.log("complete", res);
      }
    }
  });
};

document.getElementById("button-on-bluetooth-device-found").onclick = function () {
  _jssdk.default.onBluetoothDeviceFound(function (result) {
    console.log(result);
  });
};

document.getElementById("button-off-bluetooth-device-found").onclick = function () {
  _jssdk.default.offBluetoothDeviceFound();
};

document.getElementById("button-get-bluetooth-devices").onclick = function () {
  _jssdk.default.getBluetoothDevices({
    success: function success(res) {
      return console.log("success", res);
    },
    fail: function fail(err) {
      return console.log("error", err);
    },
    complete: function complete(res) {
      if (res.resultCode === "000000") {
        console.log("complete", res);
      }
    }
  });
};

document.getElementById("button-navigate-to").onclick = function () {
  _jssdk.default.navigateTo({
    title: "测试",
    url: "http://192.168.50.241:3000/webview.html",
    success: function success(res) {
      return console.log("success", res);
    },
    fail: function fail(err) {
      return console.log("error", err);
    },
    complete: function complete(res) {
      if (res.resultCode === "000000") {
        console.log("complete", res);
      }
    }
  });
};

document.getElementById("button-navigate-to-custom").onclick = function () {
  _jssdk.default.navigateTo({
    title: "测试自定义",
    customHeader: true,
    url: "http://192.168.50.241:3000/webview.html",
    success: function success(res) {
      return console.log("success", res);
    },
    fail: function fail(err) {
      return console.log("error", err);
    },
    complete: function complete(res) {
      if (res.resultCode === "000000") {
        console.log("complete", res);
      }
    }
  });
};

document.getElementById("button-navigate-back").onclick = function () {
  _jssdk.default.navigateBack({
    success: function success(res) {
      return console.log("success", res);
    },
    fail: function fail(err) {
      return console.log("error", err);
    },
    complete: function complete(res) {
      if (res.resultCode === "000000") {
        console.log("complete", res);
      }
    }
  });
};
},{"./jssdk":"../src/jssdk.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51220" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/index.js"], null)
//# sourceMappingURL=/src.7ed060e2.js.map