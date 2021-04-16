import TypeError from '.TypeError';
import SyntaxError from '.SyntaxError';
import RegExp from '.RegExp';
import freeze from '.Object.freeze?';
import bind from '.Function.prototype.bind?';
import apply from '.Reflect.apply?';
import Proxy from '.Proxy?';

import { Test, Exec } from './theRegExp';

var NT = /[\n\t]+/g;
var ESCAPE = /\\./g;
function graveAccentReplacer ($$ :string) { return $$==='\\`' ? '`' : $$; }

var includes = ''.includes as any
	? function (that :string, searchString :string) { return that.includes(searchString); }
	: function (that :string, searchString :string) { return that.indexOf(searchString)>-1; };

function RE (this :Context, template :TemplateStringsArray) {
	var U = this.U;
	var I = this.I;
	var M = this.M;
	var S = this.S;
	var raw = template.raw;
	var source = raw[0]!.replace(NT, '');
	var index = 1;
	var length = arguments.length;
	while ( index!==length ) {
		var value :string | {
			readonly source :string
			readonly unicode? :boolean
			readonly ignoreCase? :boolean
			readonly multiline? :boolean
			readonly dotAll? :boolean
		} = arguments[index];
		if ( typeof value==='string' ) { source += value; }
		else {
			var value_source = value.source;
			if ( typeof value_source!=='string' ) { throw TypeError('source'); }
			if ( value.unicode===U ) { throw SyntaxError('unicode'); }
			if ( value.ignoreCase===I ) { throw SyntaxError('ignoreCase'); }
			if ( value.multiline===M && ( includes(value_source, '^') || includes(value_source, '$') ) ) { throw SyntaxError('multiline'); }
			if ( value.dotAll===S && includes(value_source, '.') ) { throw SyntaxError('dotAll'); }
			source += value_source;
		}
		source += raw[index++]!.replace(NT, '');
	}
	var re :RegExp = RegExp(U ? source = source.replace(ESCAPE, graveAccentReplacer) : source, this.flags);
	var test = re.test = Test(re);
	var exec = re.exec = Exec(re);
	test.source = exec.source = source;
	test.unicode = exec.unicode = U;
	test.ignoreCase = exec.ignoreCase = I;
	test.multiline = exec.multiline = includes(source, '^') || includes(source, '$') ? M : null;
	test.dotAll = exec.dotAll = includes(source, '.') ? S : null;
	return re;
}

var RE_bind = bind && /*#__PURE__*/bind.bind(RE as any);

function Context (flags :string) :Context {
	return {
		U: !includes(flags, 'u'),
		I: !includes(flags, 'i'),
		M: !includes(flags, 'm'),
		S: !includes(flags, 's'),
		flags: flags
	};
}

var CONTEXT :Context = /*#__PURE__*/Context('');

export default Proxy
	? /*#__PURE__*/new Proxy(RE, {
		apply: function (RE, thisArg, args :readonly [ TemplateStringsArray ]) { return apply(RE, CONTEXT, args); }
		,
		get: function (RE, flags :string) { return RE_bind(Context(flags)); }
		,
		defineProperty: function () { return false; }
		,
		preventExtensions: function () { return false; }
	})
	: /*#__PURE__*/function () {
		RE.apply = RE.apply;
		var newRegExp = function () { return RE.apply(CONTEXT, arguments as any); } as any;
		for ( var flags = 63; flags--; ) {
			( function (context) {
				newRegExp[context.flags] = function () { return RE.apply(context, arguments as any); };
			} )(Context(
				( flags & 32 ? '' : 'g' ) +
				( flags & 16 ? '' : 'i' ) +
				( flags &  8 ? '' : 'm' ) +
				( flags &  4 ? '' : 's' ) +
				( flags &  2 ? '' : 'u' ) +
				( flags &  1 ? '' : 'y' )
			));
		}
		return freeze ? freeze(newRegExp) : newRegExp;
	}();

type Context = Readonly<{
	U :boolean
	I :boolean
	M :boolean
	S :boolean
	flags :string
}>;