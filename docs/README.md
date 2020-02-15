
```js
const { newRegExp } = require('@ltd/j-regexp');

const TAG_NAME = /[a-z][a-z\d]*/;

const ATTRIBUTE_NAME = /[a-z][a-z\-]*/;

const ATTRIBUTE_VALUE = newRegExp`
	(?:
		"[^"]*"
		|
		'[^']'
		|
		[a-z]+
	)
`;

const _ = /[\t\n\f\r\x20]/;

const ATTRIBUTE = newRegExp`
	${_}+
	${ATTRIBUTE_NAME}
	(?:
		${_}*
		=
		${_}*
		${ATTRIBUTE_VALUE}
	)?
`;

const START_TAG = newRegExp('i')`
	<${TAG_NAME}(?:${ATTRIBUTE})*${_}*>
`;

const END_TAG = newRegExp('i')`
	</${TAG_NAME}${_}*>
`;

const SELF_CLOSING_TAG = newRegExp('i')`
	<${TAG_NAME}(?:${ATTRIBUTE})*${_}+/>
`;
```

```js
const { groupify } = require('@ltd/j-regexp');

console.log(groupify(['a', 'a', 'b', 'cc11', 'cc22']));
// '(?:[ab]|cc(?:11|22))'

console.log(groupify(['大𠮷', '大利']));
// '大(?:利|𠮷)' ('𠮷'.length===2)
console.log(groupify(['大𠮷', '大利'], true));// uFlag
// '大[𠮷利]'
```
