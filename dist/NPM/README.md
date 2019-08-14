
```js
const newRegExp = require('@ltd/j-regexp');

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
