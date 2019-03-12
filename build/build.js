'use strict';

require('@ltd/j-dev')(__dirname+'/..')(async ({ build, get, map }) => {
	
	await build({
		name: 'j-regexp',
		Name: '@ltd/j-regexp',
		Desc: `
			可读性更好的正则表达式创建方式。
			More readable way for creating RegExp`,
		semver: await get('src/version'),
		ES: 3,
		ESM: true,
		NPM: {
			meta_: {
				description: 'More readable way for creating RegExp.／可读性更好的正则表达式创建方式。',
			}
		},
		UMD: {
			main_global: 'jRegExp',
		},
	});
	
	await map('src/d.ts', 'dist/TSD/j-regexp.d.ts');
	
});
