import RegExp from '.RegExp';
import isArray from '.Array.isArray?=';
import apply from '.Reflect.apply?=';

import groupify from './groupify';

var NT = /[\n\t]/g;
var SEARCH_ESCAPE = /\\./g;
function graveAccentReplacer ($$ :string) { return $$==='\\`' ? '`' : $$; }
var flags :string;
var u :boolean;

function RE (template :TemplateStringsArray) {
	var raw = template.raw;
	var source = raw[0];
	for ( var length = arguments.length, index = 1; index<length; ++index ) {
		var value = arguments[index];
		source += ( isArray(value) ? groupify(value, u) : value instanceof RegExp ? value.source : value )+raw[index];
	}
	if ( u ) { source = source.replace(SEARCH_ESCAPE, graveAccentReplacer); }
	return RegExp(source.replace(NT, ''), flags);
}

export default function newRegExp (template_flags :TemplateStringsArray | string) :RegExp | ( (template :TemplateStringsArray) => RegExp ) {
	if ( typeof template_flags==='object' ) {
		flags = '';
		u = false;
		return /*#__PURE__*/ apply(RE, null, arguments as any);
	}
	var U = /*#__PURE__*/ template_flags.indexOf('u')>=0;
	return function newRegExp (template :TemplateStringsArray) :RegExp {
		flags = template_flags;
		u = U;
		return /*#__PURE__*/ apply(RE, null, arguments as any);
	};
};
