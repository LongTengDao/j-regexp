'use strict';

module.exports = require('@ltd/j-dev')(__dirname+'/..')(async ({ import_default }) => {
	
	const { groupify } = await import_default('src/default', { ES: 3 });
	
	check(groupify(['a', 'a', 'b', 'cc11', 'cc22']), '(?:[ab]|cc(?:11|22))');
	
	check(groupify(['大𠮷', '大利']), '大(?:利|𠮷)');
	const uFlag = true;
	check(groupify(['大𠮷', '大利'], uFlag), '大[𠮷利]');
	
	function check (result, expect) {
		if ( result!==expect ) {
			throw new Error("'"+result+"'!=='"+expect+"'");
		}
	}
	
	check(groupify(['a', 'ab', 'ac', 'b', 'bbb', 'bc']), '(?:a[bc]?|b(?:c|bb)?)');
	
});
