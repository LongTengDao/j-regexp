'use strict';

require('../test/test.js')(async ({ build, 龙腾道, get, map }) => {
	
	const zhs = '可读性更好的正则表达式创建方式。从属于“简计划”。';
	const en = 'More readable way for creating RegExp. Belong to "Plan J".';
	
	const semver = await get('src/version');
	
	await build({
		name: 'j-regexp',
		user: 'LongTengDao@ltd',
		Desc: [ zhs, en ],
		Auth: 龙腾道,
		Copy: 'LGPL-3.0',
		semver,
		ES: 3,
		ESM: true,
		NPM: { description: `${en}／${zhs}` },
		UMD: { main_global: 'jRegExp' },
		LICENSE_: true,
	});
	
	await map('docs/README.md', string => string.replace(/(\n```+)[^`\r\n]+/g, '$1'), 'dist/NPM/README.md');
	
});
