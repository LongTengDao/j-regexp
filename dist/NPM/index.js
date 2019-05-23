'use strict';

var version = '1.2.0';

var slice = Array.prototype.slice;

var NT = /[\n\t]/g;
function Source(raw, substitutions) {
    var source = raw[0];
    for (var length = substitutions.length, index = 0; index < length;) {
        var substitution = substitutions[index];
        source += (substitution instanceof RegExp ? substitution.source : substitution) + raw[++index];
    }
    return source.replace(NT, '');
}
function newRegExp(template) {
    return RegExp(Source(template.raw, slice.call(arguments, 1)));
}
function NewRegExp(flags) {
    return function newRegExp(template) {
        return RegExp(Source(template.raw, slice.call(arguments, 1)), flags);
    };
}
var g = /*#__PURE__*/ NewRegExp('g');
var i = /*#__PURE__*/ NewRegExp('i');
var m = /*#__PURE__*/ NewRegExp('m');
var gi = /*#__PURE__*/ NewRegExp('gi');
var gm = /*#__PURE__*/ NewRegExp('gm');
var im = /*#__PURE__*/ NewRegExp('im');
var gim = /*#__PURE__*/ NewRegExp('gim');
var _export = (
/*#__PURE__*/
function () {
    var exports = {
        version: version,
        newRegExp: newRegExp,
        NewRegExp: NewRegExp,
        g: g,
        i: i,
        m: m,
        gi: gi,
        gm: gm,
        im: im,
        gim: gim
    };
    return exports['default'] = exports;
}());

module.exports = _export;

//# sourceMappingURL=index.js.map