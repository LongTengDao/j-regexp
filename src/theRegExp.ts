import bind from '.Function.prototype.bind?';
import test from '.RegExp.prototype.test';
import exec from '.RegExp.prototype.exec';

export var Test :{ (re :RegExp) :RegExp['test'] & Bound } = bind
	? /*#__PURE__*/bind.bind(test as any) as any
	: function (re) {
		return function (string) {
			return test.call(re, string);
		};
	};

export var Exec :{ (re :RegExp) :RegExp['exec'] & Bound } = bind
	? /*#__PURE__*/bind.bind(exec as any) as any
	: function (re) {
		return function (string) {
			return exec.call(re, string);
		};
	};

export default function theRegExp (re :RegExp) :RegExp {
	var test = re.test = Test(re);
	var exec = re.exec = Exec(re);
	var source = test.source = exec.source = re.source;
	test.unicode = exec.unicode = re.unicode;
	test.ignoreCase = exec.ignoreCase = re.ignoreCase;
	test.multiline = exec.multiline = source.indexOf('^')<0 && source.indexOf('$')<0 ? null : re.multiline;
	test.dotAll = exec.dotAll = source.indexOf('.')<0 ? null : re.dotAll;
	return re;
};

type Bound = {
	source :string
	unicode :boolean | null
	ignoreCase :boolean | null
	multiline :boolean | null
	dotAll :boolean | null
};