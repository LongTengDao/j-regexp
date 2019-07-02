import RegExp from '.RegExp';

var clearRegExp = '$_' in RegExp
	? function () {
		var REGEXP = /^/;
		return function clearRegExp<T extends any> (value? :T) :undefined | T {
			REGEXP.test('');
			return value;
		};
	}()
	: function clearRegExp<T extends any> (value? :T) :undefined | T {
		return value;
	};

export default clearRegExp;