"use strict";

var _typeof =
    typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ?
    function(obj) { return typeof obj; } : 
    function(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function(root, f) {
    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
        module.exports = f;
    } else if (typeof define === 'function' && defind.amd) {
        define([], f);
    } else {
        root.BIRD = f();
    }
})(window || global || self || this, function() {

});