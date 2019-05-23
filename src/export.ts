import version from './version?text';
export { version };

import RegExp from '.RegExp';
import slice from '.Array.prototype.slice';

var NT = /[\n\t]/g;

function Source (raw :ReadonlyArray<string>, substitutions :( string | RegExp )[]) :string {
	var source :string = raw[0];
	for ( var length :number = substitutions.length, index :number = 0; index<length; ) {
		var substitution :string | RegExp = substitutions[index];
		source += ( substitution instanceof RegExp ? substitution.source : substitution )+raw[++index];
	}
	return source.replace(NT, '');
}

export function newRegExp (template :TemplateStringsArray, ...substitutions :( string | RegExp )[]) :RegExp;
export function newRegExp (template :TemplateStringsArray) :RegExp {
	return RegExp(Source(template.raw, slice.call(arguments, 1)));
}

export function NewRegExp (flags :string) :typeof newRegExp {
	return function newRegExp (template :TemplateStringsArray) :RegExp {
		return RegExp(Source(template.raw, slice.call(arguments, 1)), flags);
	};
}

export default (
	/*#__PURE__*/
	function () {
		var exports :exports = {
			version: version,
			newRegExp: newRegExp,
			NewRegExp: NewRegExp
		};
		return exports['default'] = exports;
		type exports = {
			version :typeof version,
			newRegExp :typeof newRegExp,
			NewRegExp :typeof NewRegExp,
			default? :exports,
		};
	}()
);
