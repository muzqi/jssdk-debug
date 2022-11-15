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
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf("Macintosh") > -1;
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
          return JSON.parse(result.replace(/\n/g, "\\n").replace(/\r/g, "\\r"));

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
    /******************** 01 Base Start ********************/

    /********** 01 Method Query Start **********/

  }, {
    key: "canIUse",
    value: function canIUse() {
      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

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
    /********** 01 Method Query End **********/

    /********** 02 System Info Start **********/

  }, {
    key: "getSystemInfo",
    value: function getSystemInfo() {
      if (!this.doctor()) {
        return {};
      }

      switch (this.platform) {
        case "Android":
          return JSON.parse(cmiot.getSystemInfo());

        case "IOS":
          return JSON.parse(window.prompt("getSystemInfo"));

        default:
          return {};
      }
    }
    /********** 02 System Info End **********/

    /********** 03 User Info Start **********/

  }, {
    key: "getUserInfo",
    value: function getUserInfo(key) {
      if (!this.doctor()) {
        return "";
      }

      switch (this.platform) {
        case "Android":
          return cmiot.getUserInfo(key);

        case "IOS":
          return window.prompt("getUserInfo", key);

        default:
          return "";
      }
    }
    /********** 03 User Info End **********/

    /******************** 01 Base End ********************/

    /******************** 02 Device Start ********************/

    /********** 01 WiFi Start **********/

  }, {
    key: "getConnectedWifi",
    value: function getConnectedWifi() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          success = _ref4.success,
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
    value: function startWifi() {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          success = _ref5.success,
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
    value: function stopWifi() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          success = _ref6.success,
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
    value: function getWifiList() {
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          success = _ref7.success,
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
    value: function connectWifi() {
      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          SSID = _ref8.SSID,
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
    /********** 01 WiFi End **********/

    /********** 02 Scan Code Start **********/

  }, {
    key: "scanCode",
    value: function scanCode() {
      var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          success = _ref9.success,
          fail = _ref9.fail,
          complete = _ref9.complete;

      this.createAsync({
        method: "scanCode",
        success: success,
        fail: fail,
        complete: complete
      });
    }
    /********** 02 Scan Code End **********/

    /********** 03 Network Start **********/

  }, {
    key: "getNetworkType",
    value: function getNetworkType() {
      if (!this.doctor()) {
        return "";
      }

      switch (this.platform) {
        case "Android":
          return cmiot.getNetworkType();

        case "IOS":
          return window.prompt("getNetworkType");

        default:
          return "";
      }
    }
  }, {
    key: "onNetworkStatusChange",
    value: function onNetworkStatusChange() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
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
    key: "getIP",
    value: function getIP() {
      if (!this.doctor()) {
        return "";
      }

      switch (this.platform) {
        case "Android":
          return cmiot.getIP();

        case "IOS":
          return window.prompt("getIP");

        default:
          return "";
      }
    }
    /********** 03 Network End **********/

    /********** 04 Bluetooth Start **********/

  }, {
    key: "openBluetoothAdapter",
    value: function openBluetoothAdapter() {
      var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          success = _ref10.success,
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
    value: function closeBluetoothAdapter() {
      var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          success = _ref11.success,
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
    value: function onBluetoothDeviceFound() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
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
    value: function getBluetoothDevices() {
      var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          success = _ref12.success,
          fail = _ref12.fail,
          complete = _ref12.complete;

      this.createAsync({
        method: "getBluetoothDevices",
        success: success,
        fail: fail,
        complete: complete
      });
    }
    /********** 04 Bluetooth End **********/

    /********** 05 Battery Info Start **********/

  }, {
    key: "getBatteryInfo",
    value: function getBatteryInfo() {
      if (!this.doctor()) {
        return {};
      }

      switch (this.platform) {
        case "Android":
          return JSON.parse(cmiot.getBatteryInfo());

        case "IOS":
          return JSON.parse(window.prompt("getBatteryInfo"));

        default:
          return {};
      }
    }
    /********** 05 Battery Info End **********/

    /********** 06 Permission Start **********/

  }, {
    key: "hasPermission",
    value: function hasPermission(permission) {
      if (!this.doctor()) {
        return false;
      }

      switch (this.platform) {
        case "Android":
          return cmiot.hasPermission(permission);

        case "IOS":
          return Number(window.prompt("hasPermission", method)) === 0 ? false : true;

        default:
          return false;
      }
    }
  }, {
    key: "requestPermission",
    value: function requestPermission() {
      var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          permission = _ref13.permission,
          success = _ref13.success,
          fail = _ref13.fail,
          complete = _ref13.complete;

      this.createAsync({
        method: "requestPermission",
        success: success,
        fail: fail,
        complete: complete,
        parameters: {
          permission: permission
        }
      });
    }
    /********** 06 Permission End **********/

    /******************** 02 Device End ********************/

    /******************** 03 Router Start ********************/

  }, {
    key: "navigateTo",
    value: function navigateTo() {
      var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          url = _ref14.url,
          _ref14$customNavigati = _ref14.customNavigationBar,
          customNavigationBar = _ref14$customNavigati === void 0 ? false : _ref14$customNavigati,
          _ref14$title = _ref14.title,
          title = _ref14$title === void 0 ? "Title" : _ref14$title,
          success = _ref14.success,
          fail = _ref14.fail,
          complete = _ref14.complete;

      this.createAsync({
        method: "navigateTo",
        success: success,
        fail: fail,
        complete: complete,
        parameters: {
          url: url,
          customNavigationBar: customNavigationBar,
          title: title
        }
      });
    }
  }, {
    key: "navigateBack",
    value: function navigateBack() {
      var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          success = _ref15.success,
          fail = _ref15.fail,
          complete = _ref15.complete;

      this.createAsync({
        method: "navigateBack",
        success: success,
        fail: fail,
        complete: complete
      });
    }
  }, {
    key: "switchTab",
    value: function switchTab(_ref16) {
      var _ref16$index = _ref16.index,
          index = _ref16$index === void 0 ? 0 : _ref16$index,
          success = _ref16.success,
          fail = _ref16.fail,
          complete = _ref16.complete;
      this.createAsync({
        method: "switchTab",
        success: success,
        fail: fail,
        complete: complete,
        parameters: {
          index: index
        }
      });
    }
    /******************** 03 Router End ********************/

    /******************** 04 Data Cache Start ********************/

  }, {
    key: "setStorage",
    value: function setStorage(key, value) {
      if (!this.doctor()) {
        return null;
      }

      switch (this.platform) {
        case "Android":
          return cmiot.setStorage(key, value);

        case "IOS":
          return window.prompt("setStorage", JSON.stringify({
            key: key,
            value: value
          }));

        default:
          return null;
      }
    }
  }, {
    key: "getStorage",
    value: function getStorage(key) {
      if (!this.doctor()) {
        return "";
      }

      switch (this.platform) {
        case "Android":
          return cmiot.getStorage(key);

        case "IOS":
          return window.prompt("getStorage", key);

        default:
          return "";
      }
    }
  }, {
    key: "removeStorage",
    value: function removeStorage(key) {
      if (!this.doctor()) {
        return null;
      }

      switch (this.platform) {
        case "Android":
          return cmiot.removeStorage(key);

        case "IOS":
          return window.prompt("removeStorage", key);

        default:
          return null;
      }
    }
  }, {
    key: "clearStorage",
    value: function clearStorage() {
      if (!this.doctor()) {
        return null;
      }

      switch (this.platform) {
        case "Android":
          return cmiot.clearStorage();

        case "IOS":
          return window.prompt("clearStorage");

        default:
          return null;
      }
    }
  }, {
    key: "getStorageInfo",
    value: function getStorageInfo() {
      if (!this.doctor()) {
        return {};
      }

      switch (this.platform) {
        case "Android":
          return JSON.parse(cmiot.getStorageInfo());

        case "IOS":
          return JSON.parse(window.prompt("getStorageInfo"));

        default:
          return {};
      }
    }
    /******************** 04 Data Cache End ********************/

    /******************** 05 Interface Start ********************/

    /********** 01 Navigation Start **********/

  }, {
    key: "showNavigationBarLoading",
    value: function showNavigationBarLoading() {
      var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          success = _ref17.success,
          fail = _ref17.fail,
          complete = _ref17.complete;

      this.createAsync({
        method: "showNavigationBarLoading",
        success: success,
        fail: fail,
        complete: complete
      });
    }
  }, {
    key: "hideNavigationBarLoading",
    value: function hideNavigationBarLoading() {
      var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          success = _ref18.success,
          fail = _ref18.fail,
          complete = _ref18.complete;

      this.createAsync({
        method: "hideNavigationBarLoading",
        success: success,
        fail: fail,
        complete: complete
      });
    }
  }, {
    key: "setNavigationBarColor",
    value: function setNavigationBarColor() {
      var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref19$theme = _ref19.theme,
          theme = _ref19$theme === void 0 ? "light" : _ref19$theme,
          _ref19$frontColor = _ref19.frontColor,
          frontColor = _ref19$frontColor === void 0 ? "#000" : _ref19$frontColor,
          success = _ref19.success,
          fail = _ref19.fail,
          complete = _ref19.complete;

      this.createAsync({
        method: "setNavigationBarColor",
        success: success,
        fail: fail,
        complete: complete,
        parameters: {
          theme: theme,
          frontColor: frontColor
        }
      });
    }
  }, {
    key: "setNavigationBarTitle",
    value: function setNavigationBarTitle() {
      var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref20$title = _ref20.title,
          title = _ref20$title === void 0 ? "Title" : _ref20$title,
          success = _ref20.success,
          fail = _ref20.fail,
          complete = _ref20.complete;

      this.createAsync({
        method: "setNavigationBarTitle",
        success: success,
        fail: fail,
        complete: complete,
        parameters: {
          title: title
        }
      });
    }
    /********** 01 Navigation End **********/

    /********** 02 System Start **********/

  }, {
    key: "navigateToSetting",
    value: function navigateToSetting(key) {
      if (!this.doctor()) {
        return null;
      }

      switch (this.platform) {
        case "Android":
          return cmiot.navigateToSetting(key);

        case "IOS":
          return window.prompt("navigateToSetting", key);

        default:
          return null;
      }
    }
  }, {
    key: "onBackPressed",
    value: function onBackPressed() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      if (this.platform === 'Android') {
        this.createAsyncListener({
          method: "onBackPressed",
          callback: callback
        });
      }
    }
  }, {
    key: "offBackPressed",
    value: function offBackPressed() {
      if (!this.doctor()) {
        return false;
      }

      switch (this.platform) {
        case "Android":
          return cmiot.offBackPressed();

        default:
          return false;
      }
    }
    /********** 02 System End **********/

    /******************** 05 Interface End ********************/

    /******************** 06 Media Start ********************/

    /********** 01 Image Start **********/

  }, {
    key: "chooseImage",
    value: function chooseImage() {
      var _ref21 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref21$sizeType = _ref21.sizeType,
          sizeType = _ref21$sizeType === void 0 ? "compressed" : _ref21$sizeType,
          _ref21$sourceType = _ref21.sourceType,
          sourceType = _ref21$sourceType === void 0 ? ["album"] : _ref21$sourceType,
          success = _ref21.success,
          fail = _ref21.fail,
          complete = _ref21.complete;

      this.createAsync({
        method: "chooseImage",
        success: success,
        fail: fail,
        complete: complete,
        parameters: {
          sizeType: sizeType,
          sourceType: sourceType
        }
      });
    }
  }, {
    key: "saveImage",
    value: function saveImage() {
      var _ref22 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          imageData = _ref22.imageData,
          success = _ref22.success,
          fail = _ref22.fail,
          complete = _ref22.complete;

      this.createAsync({
        method: "saveImage",
        success: success,
        fail: fail,
        complete: complete,
        parameters: {
          imageData: imageData
        }
      });
    }
    /********** 01 Image End **********/

    /******************** 06 Media End ********************/

    /******************** 07 Lifecycle Start ********************/

  }, {
    key: "onAppShow",
    value: function onAppShow() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.createAsyncListener({
        method: "onAppShow",
        callback: callback
      });
    }
  }, {
    key: "onAppHide",
    value: function onAppHide() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.createAsyncListener({
        method: "onAppHide",
        callback: callback
      });
    }
  }, {
    key: "offAppShow",
    value: function offAppShow() {
      if (!this.doctor()) {
        return false;
      }

      switch (this.platform) {
        case "Android":
          return cmiot.offAppShow();

        case "IOS":
          return Number(window.prompt("offAppShow")) === 0 ? false : true;

        default:
          return false;
      }
    }
  }, {
    key: "offAppHide",
    value: function offAppHide() {
      if (!this.doctor()) {
        return false;
      }

      switch (this.platform) {
        case "Android":
          return cmiot.offAppHide();

        case "IOS":
          return Number(window.prompt("offAppHide")) === 0 ? false : true;

        default:
          return false;
      }
    }
    /******************** 07 Lifecycle End ********************/

    /******************** 08 NetWork Start ********************/

    /********** 01 UDP Start **********/

  }, {
    key: "bindUpd",
    value: function bindUpd(port) {
      if (!this.doctor()) {
        return null;
      }

      switch (this.platform) {
        case 'Android':
          return cmiot.bindUdp(parseInt(port));

        case 'IOS':
          return window.prompt("bindUdp", port);

        default:
          return null;
      }
    }
  }, {
    key: "closeUdp",
    value: function closeUdp() {
      if (!this.doctor()) {
        return null;
      }

      switch (this.platform) {
        case 'Android':
          return cmiot.closeUdp();

        case 'IOS':
          return window.prompt("closeUdp");

        default:
          return null;
      }
    }
  }, {
    key: "sendUdpMessage",
    value: function sendUdpMessage() {
      var _ref23 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          message = _ref23.message,
          host = _ref23.host,
          port = _ref23.port,
          success = _ref23.success,
          fail = _ref23.fail,
          complete = _ref23.complete;

      this.createAsync({
        method: 'sendUdpMessage',
        success: success,
        fail: fail,
        complete: complete,
        parameters: {
          message: message,
          host: host,
          port: port
        }
      });
    }
  }, {
    key: "onUdp",
    value: function onUdp() {
      var _this3 = this;

      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      // Android 平台，udp message 消息无法通过 JSON.parse 正常解析
      // 这里针对安卓进行 base64 转换处理
      if (!this.doctor()) {
        callback(_errorMsgs.CMIOT_NO_EXIST);
        return;
      }

      if (!this.canIUse('onUdp')) {
        fail(_errorMsgs.PLATFORM_NO_SUPPORT);
        return;
      }

      var _callback = "onUdp_callback_".concat((0, _tools.getUuid)());

      var dealResult = function dealResult(result) {
        switch (_this3.platform) {
          case "Android":
            var _result = JSON.parse(result.replace(/\n/g, "\\n").replace(/\r/g, "\\r"));

            if (_result.data && _result.data.message) {
              _result.data.message = atob(_result.data.message);
            }

            return _result;

          case "IOS":
            return result;

          default:
            return null;
        }
      };

      window.CMIOT[_callback] = function (result) {
        return callback(dealResult(result));
      };

      this.action({
        method: 'onUdp',
        callback: "CMIOT.".concat(_callback)
      });
    }
    /********** 01 UDP End **********/

    /******************** 08 NetWork End ********************/

    /******************** 09 Share Start ********************/

  }, {
    key: "shareText",
    value: function shareText() {
      var _ref24 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          text = _ref24.text,
          success = _ref24.success,
          fail = _ref24.fail,
          complete = _ref24.complete;

      this.createAsync({
        method: "shareText",
        success: success,
        fail: fail,
        complete: complete,
        parameters: {
          text: text
        }
      });
    }
  }, {
    key: "shareImage",
    value: function shareImage() {
      var _ref25 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          imageData = _ref25.imageData,
          success = _ref25.success,
          fail = _ref25.fail,
          complete = _ref25.complete;

      this.createAsync({
        method: "shareImage",
        success: success,
        fail: fail,
        complete: complete,
        parameters: {
          imageData: imageData
        }
      });
    }
  }, {
    key: "shareWeb",
    value: function shareWeb() {
      var _ref26 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          title = _ref26.title,
          description = _ref26.description,
          thumbData = _ref26.thumbData,
          url = _ref26.url,
          success = _ref26.success,
          fail = _ref26.fail,
          complete = _ref26.complete;

      this.createAsync({
        method: "shareWeb",
        success: success,
        fail: fail,
        complete: complete,
        parameters: {
          title: title,
          description: description,
          thumbData: thumbData,
          url: url
        }
      });
    }
  }, {
    key: "shareVideo",
    value: function shareVideo() {
      var _ref27 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          title = _ref27.title,
          description = _ref27.description,
          thumbData = _ref27.thumbData,
          url = _ref27.url,
          success = _ref27.success,
          fail = _ref27.fail,
          complete = _ref27.complete;

      this.createAsync({
        method: "shareVideo",
        success: success,
        fail: fail,
        complete: complete,
        parameters: {
          title: title,
          description: description,
          thumbData: thumbData,
          url: url
        }
      });
    }
    /******************** 09 Share End ********************/

    /******************** 10 Work Start ********************/

  }, {
    key: "workSync",
    value: function workSync() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!this.doctor()) {
        return false;
      }

      switch (this.platform) {
        case "Android":
          return cmiot.workSync(JSON.stringify(params));

        case "IOS":
          return Number(window.prompt('workSync', JSON.stringify(params))) === 0 ? false : true;

        default:
          return false;
      }
    }
  }, {
    key: "workAsync",
    value: function workAsync() {
      var _ref28 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          method = _ref28.method,
          _ref28$parameters = _ref28.parameters,
          parameters = _ref28$parameters === void 0 ? {} : _ref28$parameters,
          success = _ref28.success,
          fail = _ref28.fail,
          complete = _ref28.complete;

      this.createAsync({
        method: "workAsync",
        success: success,
        fail: fail,
        complete: complete,
        parameters: {
          method: method,
          parameters: parameters
        }
      });
    }
    /******************** 10 Work End ********************/

  }]);

  return JSSdk;
}();

var _default = new JSSdk();

exports.default = _default;
},{"./helpers/error-msgs":"../src/helpers/error-msgs.js","./helpers/tools":"../src/helpers/tools.js"}],"../src/scripts/index.js":[function(require,module,exports) {
"use strict";

var _jssdk = _interopRequireDefault(require("../jssdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var doc = document;
var asyncParameters = {
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
};
/******************** 01 Base Start ********************/

/********** 01 Method Query Start **********/

doc.getElementById("button-can-i-use").onclick = function () {
  var value = doc.getElementById("input-can-i-use").value;

  var b = _jssdk.default.canIUse(value);

  console.log(b);
};
/********** 01 Method Query End **********/

/********** 02 System Info Start **********/


doc.getElementById("button-get-systeminfo").onclick = function () {
  var b = _jssdk.default.getSystemInfo();

  console.log(b);
};
/********** 02 System Info End **********/

/********** 03 User Info Start **********/


doc.getElementById("button-get-userInfo").onclick = function () {
  try {
    var value = doc.getElementById("input-get-userInfo").value;

    var userinfo = _jssdk.default.getUserInfo(value);

    console.log(userinfo);
  } catch (err) {
    console.error("catched:", err);
  }
};
/********** 03 User Info End **********/

/******************** 01 Base End ********************/

/******************** 02 Device Start ********************/

/********** 01 WiFi Start **********/


doc.getElementById("button-get-connected-wifi").onclick = function () {
  _jssdk.default.getConnectedWifi(asyncParameters);
};

doc.getElementById("button-start-wifi").onclick = function () {
  _jssdk.default.startWifi(asyncParameters);
};

doc.getElementById("button-stop-wifi").onclick = function () {
  _jssdk.default.stopWifi(asyncParameters);
};

doc.getElementById("button-get-wifi-list").onclick = function () {
  _jssdk.default.getWifiList(asyncParameters);
};

doc.getElementById("button-connect-wifi").onclick = function () {
  _jssdk.default.connectWifi(_objectSpread({
    SSID: "ANDMU_5G_1",
    password: "andmuwifi"
  }, asyncParameters));
};

doc.getElementById("button-get-ip").onclick = function () {
  var ip = _jssdk.default.getIP();

  console.log("IP:" + ip);
};
/********** 01 WiFi End **********/

/********** 02 Scan Code Start **********/


doc.getElementById("button-scan-code").onclick = function () {
  _jssdk.default.scanCode(asyncParameters);
};
/********** 02 Scan Code End **********/

/********** 03 Network Start **********/


doc.getElementById("button-get-network-type").onclick = function () {
  var type = _jssdk.default.getNetworkType();

  console.log(type);
};

doc.getElementById("button-on-network-status-change").onclick = function () {
  _jssdk.default.onNetworkStatusChange(function (result) {
    console.log(result);
  });
};

doc.getElementById("button-off-network-status-change").onclick = function () {
  _jssdk.default.offNetworkStatusChange();
};
/********** 03 Network End **********/

/********** 04 Bluetooth Start **********/


doc.getElementById("button-open-bluetooth-adapter").onclick = function () {
  _jssdk.default.openBluetoothAdapter(asyncParameters);
};

doc.getElementById("button-close-bluetooth-adapter").onclick = function () {
  _jssdk.default.closeBluetoothAdapter(asyncParameters);
};

doc.getElementById("button-on-bluetooth-device-found").onclick = function () {
  _jssdk.default.onBluetoothDeviceFound(function (result) {
    console.log(result);
  });
};

doc.getElementById("button-off-bluetooth-device-found").onclick = function () {
  _jssdk.default.offBluetoothDeviceFound();
};

doc.getElementById("button-get-bluetooth-devices").onclick = function () {
  _jssdk.default.getBluetoothDevices(asyncParameters);
};
/********** 04 Bluetooth End **********/

/********** 05 Battery Info Start **********/


doc.getElementById("button-get-batteryInfo").onclick = function () {
  var battery = _jssdk.default.getBatteryInfo();

  console.log(battery);
};
/********** 05 Battery Info End **********/

/********** 06 Permission Start **********/


doc.getElementById("button-has-permission").onclick = function () {
  var permission = doc.getElementById("input-permission-key").value;

  var has = _jssdk.default.hasPermission(permission);

  console.log(has);
};

doc.getElementById("button-request-permission").onclick = function () {
  var permission = doc.getElementById("input-permission-key").value;

  _jssdk.default.requestPermission(_objectSpread({
    permission: permission
  }, asyncParameters));
};
/********** 06 Permission End **********/

/******************** 02 Device End ********************/

/******************** 03 Router Start ********************/


doc.getElementById("button-navigate-to").onclick = function () {
  _jssdk.default.navigateTo(_objectSpread({
    title: "测试",
    url: "http://192.168.50.241:3000/webview.html"
  }, asyncParameters));
};

doc.getElementById("button-navigate-to-custom").onclick = function () {
  _jssdk.default.navigateTo(_objectSpread({
    title: "测试自定义",
    customNavigationBar: true,
    url: "http://192.168.50.241:3000/webview.html"
  }, asyncParameters));
};
/******************** 03 Router End ********************/

/******************** 04 Data Cache Start ********************/


doc.getElementById("button-get-storage-info").onclick = function () {
  try {
    var v = _jssdk.default.getStorageInfo();

    console.log(v);
  } catch (err) {
    console.error("catched:", err);
  }
};

doc.getElementById("button-clear-storage").onclick = function () {
  try {
    var v = _jssdk.default.clearStorage();

    console.log(v);
  } catch (err) {
    console.error("catched:", err);
  }
};

doc.getElementById("button-set-storage").onclick = function () {
  try {
    var key = doc.getElementById("input-set-storage-key").value;
    var value = doc.getElementById("input-set-storage-value").value;

    var v = _jssdk.default.setStorage(key, value);

    console.log(v);
  } catch (err) {
    console.error("catched:", err);
  }
};

doc.getElementById("button-get-storage").onclick = function () {
  try {
    var key = doc.getElementById("input-get-storage").value;

    var v = _jssdk.default.getStorage(key);

    console.log(v);
  } catch (err) {
    console.error("catched:", err);
  }
};

doc.getElementById("button-remove-storage").onclick = function () {
  try {
    var key = doc.getElementById("input-remove-storage").value;

    var v = _jssdk.default.removeStorage(key);

    console.log(v);
  } catch (err) {
    console.error("catched:", err);
  }
};
/******************** 04 Data Cache End ********************/

/******************** 05 Interface Start ********************/

/********** 02 System Start **********/


doc.getElementById("button-navigate-to-setting").onclick = function () {
  _jssdk.default.navigateToSetting("wifi");
};

doc.getElementById("button-on-back-pressed").onclick = function () {
  _jssdk.default.onBackPressed(function () {
    console.log('on back');
  });
};

doc.getElementById("button-off-back-pressed").onclick = function () {
  _jssdk.default.offBackPressed();
};
/********** 02 System End **********/

/******************** 05 Interface End ********************/

/******************** 06 Media Start ********************/

/********** 01 Image Start **********/


doc.getElementById("button-choose-image").onclick = function () {
  var sizeType = doc.getElementById("select-choose-image-size-type").value;
  var _sourceType = doc.getElementById("select-choose-image-source-type").value;
  var sourceType = [];

  switch (_sourceType) {
    case "0":
      sourceType.push("album");
      break;

    case "1":
      sourceType.push("camera");
      break;

    case "2":
      sourceType.push("album", "camera");
      break;

    default:
      break;
  }

  _jssdk.default.chooseImage(_objectSpread(_objectSpread({
    sizeType: sizeType,
    sourceType: sourceType
  }, asyncParameters), {}, {
    success: function success(res) {
      if (res.resultCode === "000000") {
        doc.getElementById("img-choose-image").setAttribute("src", "data:image/jpeg;base64,".concat(res.data[0]));
      }
    }
  }));
};

doc.getElementById('button-save-image').onclick = function () {
  var imageData = doc.getElementById('input-save-image-image-data').value;

  _jssdk.default.saveImage(_objectSpread({
    imageData: imageData
  }, asyncParameters));
};
/********** 01 Image End **********/

/******************** 06 Media End ********************/

/******************** 07 Lifecycle Start ********************/


doc.getElementById("button-on-app-show").onclick = function () {
  _jssdk.default.onAppShow(function (result) {
    console.log("show:", result);
  });
};

doc.getElementById("button-off-app-show").onclick = function () {
  _jssdk.default.offAppShow();
};

doc.getElementById("button-on-app-hide").onclick = function () {
  _jssdk.default.onAppHide(function (result) {
    console.log("hide:", result);
  });
};

doc.getElementById("button-off-app-hide").onclick = function () {
  _jssdk.default.offAppHide();
};
/******************** 07 Lifecycle End ********************/

/******************** 08 NetWork Start ********************/


doc.getElementById('button-bind-udp').onclick = function () {
  var port = doc.getElementById('input-bind-udp-port').value;

  var res = _jssdk.default.bindUpd(port);

  console.log('bindUpdres>>>', res);
};

doc.getElementById('button-close-udp').onclick = function () {
  var res = _jssdk.default.closeUdp();

  console.log('closeUdpres>>>', res);
};

doc.getElementById('button-send-udp-message').onclick = function () {
  _jssdk.default.sendUdpMessage(_objectSpread({
    message: 'hello world',
    host: '192.168.43.39',
    port: '9090'
  }, asyncParameters));
};

doc.getElementById('button-on-udp').onclick = function () {
  _jssdk.default.onUdp(function (result) {
    console.log("onUdp:", result);
  });
};
/******************** 08 NetWork End ********************/

/******************** 09 Share Start ********************/


doc.getElementById('button-share-text').onclick = function () {
  var text = doc.getElementById('input-share-text-text').value;

  _jssdk.default.shareText(_objectSpread({
    text: text
  }, asyncParameters));
};

doc.getElementById('button-share-image').onclick = function () {
  var imageData = doc.getElementById('textarea-share-image-image-data').value;

  _jssdk.default.shareImage(_objectSpread({
    imageData: imageData
  }, asyncParameters));
};

doc.getElementById('button-share-web').onclick = function () {
  var title = doc.getElementById('input-share-web-title').value;
  var description = doc.getElementById('input-share-web-description').value;
  var thumbData = doc.getElementById('textarea-share-web-thumb-data').value;
  var url = doc.getElementById('input-share-web-url').value;

  _jssdk.default.shareWeb(_objectSpread({
    title: title,
    description: description,
    thumbData: thumbData,
    url: url
  }, asyncParameters));
};

doc.getElementById('button-share-video').onclick = function () {
  var title = doc.getElementById('input-share-video-title').value;
  var description = doc.getElementById('input-share-video-description').value;
  var thumbData = doc.getElementById('textarea-share-video-thumb-data').value;
  var url = doc.getElementById('input-share-video-url').value;

  _jssdk.default.shareVideo(_objectSpread({
    title: title,
    description: description,
    thumbData: thumbData,
    url: url
  }, asyncParameters));
};
/******************** 09 Share End ********************/

/******************** 10 Work Start ********************/


doc.getElementById('button-work-sync-logout').onclick = function () {
  _jssdk.default.workSync({
    method: 'logout'
  });
};

doc.getElementById('button-work-sync-packageStatusChange').onclick = function () {
  _jssdk.default.workSync({
    method: 'packageStatusChange',
    parameters: {
      mac: 'deviceid_xxx'
    }
  });
};

doc.getElementById('button-work-sync-refreshCameraList').onclick = function () {
  _jssdk.default.workSync({
    method: 'refreshCameraList'
  });
};

doc.getElementById('button-work-async-selectOrgNode').onclick = function () {
  _jssdk.default.workAsync({
    method: 'selectOrgNode',
    // parameters: {
    //   showConfirm: false,
    // },
    success: function success(res) {
      console.log(res);
    },
    fail: function fail(err) {
      return console.log('fail:', err);
    },
    complete: function complete(res) {
      return console.log('complete:', res);
    }
  });
};
/******************** 10 Work End ********************/
},{"../jssdk":"../src/jssdk.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51556" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/scripts/index.js"], null)
//# sourceMappingURL=/scripts.45c95d8c.js.map