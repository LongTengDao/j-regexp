import version from './version?text';
import theRegExp from './theRegExp';
import newRegExp from './newRegExp';
import clearRegExp from './clearRegExp';
import groupify from './groupify';

export {
	version,
	newRegExp,
	theRegExp,
	clearRegExp,
	groupify,
};

import Default from '.default?=';
export default Default({
	version: version,
	newRegExp: newRegExp,
	theRegExp: theRegExp,
	clearRegExp: clearRegExp,
	groupify: groupify
});
