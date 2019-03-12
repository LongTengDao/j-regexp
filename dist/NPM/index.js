'use strict';

var version = '1.0.0';

var slice = Array.prototype.slice;

var NT = /[\n\t]/g;
function Source(raw, substitutions) {
    var source = raw[0];
    for (var length = substitutions.length, index = 0; index < length;) {
        var substitution = substitutions[index];
        source += (typeof substitution === 'string' ? substitution : substitution.source) + raw[++index];
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
var jRegExp = {
    newRegExp: newRegExp,
    NewRegExp: NewRegExp,
    version: version
};
jRegExp['default'] = jRegExp;

module.exports = jRegExp;

//# sourceMappingURL=index.js.map