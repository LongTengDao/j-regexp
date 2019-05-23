'use strict';

var version = '2.0.0';

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
var _export = (
/*#__PURE__*/
function () {
    var exports = {
        version: version,
        newRegExp: newRegExp,
        NewRegExp: NewRegExp
    };
    return exports['default'] = exports;
}());

module.exports = _export;

//# sourceMappingURL=index.js.map