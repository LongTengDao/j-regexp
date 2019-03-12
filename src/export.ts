import version from './version?text';
export { version };

import RegExp from '.RegExp';
import slice from '.Array.prototype.slice';

var NT = /[\n\t]/g;

function Source (raw, substitutions) :string {
	var source :string = raw[0];
	for ( var length :number = substitutions.length, index :number = 0; index<length; ) {
		var substitution :string | RegExp = substitutions[index];
		source += ( typeof substitution==='string' ? substitution : substitution.source )+raw[++index];
	}
	return source.replace(NT, '');
}

function newRegExp (template :TemplateStringsArray, ...substitutions :( string | RegExp )[]) :RegExp;
function newRegExp (template :TemplateStringsArray) :RegExp {
	return RegExp(Source(template.raw, slice.call(arguments, 1)));
}
export { newRegExp };

export function NewRegExp (flags :string) :typeof newRegExp {
	return function newRegExp (template :TemplateStringsArray) :RegExp {
		return RegExp(Source(template.raw, slice.call(arguments, 1)), flags);
	};
}

var jRegExp = {
	newRegExp: newRegExp,
	NewRegExp: NewRegExp,
	version: version
};
jRegExp['default'] = jRegExp;
export default jRegExp;
