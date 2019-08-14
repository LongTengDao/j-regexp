import RegExp from '.RegExp';
import slice from '.Array.prototype.slice';

var NT = /[\n\t]/g;

function Source (raw :ReadonlyArray<string>, substitutions :( RegExp | string )[]) :string {
	var source :string = raw[0];
	for ( var length :number = substitutions.length, index :number = 0; index<length; ) {
		var substitution :RegExp | string = substitutions[index];
		source += ( substitution instanceof RegExp ? substitution.source : substitution )+raw[++index];
	}
	return source.replace(NT, '');
}

type newRegExp = (template :TemplateStringsArray, ...substitutions :( RegExp | string )[]) => RegExp;
export default function newRegExp (flags_template :string | TemplateStringsArray) :newRegExp | RegExp {
	return typeof flags_template==='string'
		? function newRegExp (template :TemplateStringsArray) :RegExp {
			return new RegExp(
				/*#__PURE__*/Source(
					template.raw,
					/*#__PURE__*/slice.call(arguments, 1)
				),
				flags_template
			);
		}
		: new RegExp(
			/*#__PURE__*/Source(
				flags_template.raw,
				/*#__PURE__*/slice.call(arguments, 1)
			)
		);
};
