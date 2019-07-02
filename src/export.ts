import version from './version?text';
import newRegExp from './newRegExp';
import clearRegExp from './clearRegExp';
import groupify from './groupify';

export { version, newRegExp, clearRegExp, groupify };

import Default from '.default';
export default Default(newRegExp, {
	version: version,
	newRegExp: newRegExp,
	clearRegExp: clearRegExp,
	groupify: groupify
});