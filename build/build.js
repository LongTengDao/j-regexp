'use strict';

require('@ltd/j-dev')(__dirname+'/..')(async ({ build, 龙腾道, get, ful }) => {
	
	const zhs = '可读性更好的正则表达式创建方式。从属于“简计划”。';
	const en = 'More readable way for creating RegExp. Belong to "Plan J".';
	
	const semver = await get('src/version');
	
	if ( parseInt(semver)-parseInt(await get('../../LongTengDao/j-groupify/src/version'))!==5.0-3.0 ) {
		throw Error('版本号没有伴随依赖升级');
	}
	
	await build({
		name: 'j-regexp',
		user: 'LongTengDao@ltd',
		Desc: [ zhs, en ],
		Auth: 龙腾道,
		Copy: 'LGPL-3.0',
		semver,
		locate: {
			'@ltd/j-groupify': ful('../../LongTengDao/j-groupify/dist/ESM/.j-groupify'),
		},
		ES: 3,
		ESM: true,
		NPM: { description: `${en}／${zhs}` },
		UMD: { main_global: 'newRegExp' },
		LICENSE_: true,
	});
	
});
