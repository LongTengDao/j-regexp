
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

const ATTRIBUTE = newRegExp`
    \s+
    ${ATTRIBUTE_NAME}
    (?:
        \s*
        =
        \s*
        ${ATTRIBUTE_VALUE}
    )?
`;

const START_TAG = newRegExp.i`
    <${TAG_NAME}(?:${ATTRIBUTE})*\s*>
`;

const END_TAG = newRegExp.i`
    </${TAG_NAME}\s*>
`;

const SELF_CLOSING_TAG = newRegExp.i`
    <${TAG_NAME}(?:${ATTRIBUTE})*\s+/>
`;
```
