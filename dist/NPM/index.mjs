/*!
 * 模块名称：j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。从属于“简计划”。
   　　　　　More readable way for creating RegExp. Belong to "Plan J".
 * 模块版本：5.2.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-regexp/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-regexp/
 */

var version = '5.2.0';

var slice = Array.prototype.slice;

var NT = /[\n\t]/g;
function Source(raw, substitutions) {
    var source = raw[0];
    for (var length = substitutions.length, index = 0; index < length;) {
        var substitution = substitutions[index];
        source += (substitution instanceof RegExp ? substitution.source : substitution) + raw[++index];
    }
    return source.replace(NT, '');
}
var newRegExp = 
/*#__PURE__*/
function (newRegExp, createNewRegExpWith) {
    (function recursion(pickedFlags, restFlags) {
        if (restFlags) {
            recursion(pickedFlags + restFlags.charAt(0), restFlags = restFlags.slice(1));
            recursion(pickedFlags, restFlags);
        }
        else if (pickedFlags) {
            newRegExp[pickedFlags] = createNewRegExpWith(pickedFlags);
        }
    })('', 'gimsuy');
    return newRegExp;
}(function newRegExp(template) {
    return new RegExp(Source(template.raw, slice.call(arguments, 1)));
}, function createNewRegExpWith(flags) {
    return {}['newRegExp.' + flags] = function (template) {
        return new RegExp(Source(template.raw, slice.call(arguments, 1)), flags);
    };
});

var clearRegExp = '$_' in RegExp
    ? function () {
        var REGEXP = /^/;
        return function clearRegExp(value) {
            REGEXP.test('');
            return value;
        };
    }()
    : function clearRegExp(value) {
        return value;
    };

var undefined$1 = void 0;

var create = Object.create || (
	/*! j-globals: Object.create (polyfill) */
	/*#__PURE__*/ function () {
		var NULL;
		if ( document.domain ) {
			try { dom = new ActiveXObject('htmlfile'); }
			catch (error) { }
		}
		if ( dom ) {
			dom.write('<script><\/script>');
			dom.close();
			NULL = dom.parentWindow.Object.prototype;
		}
		else {
			dom = document.createElement('iframe');
			dom.style.display = 'none';
			var parent = document.body || document.documentElement;
			parent.appendChild(dom);
			dom.src = 'javascript:';
			NULL = dom.contentWindow.Object.prototype;
			parent.removeChild(dom);
		}
		var dom = null;
		delete NULL.constructor;
		delete NULL.hasOwnProperty;
		delete NULL.isPrototypeOf;
		delete NULL.propertyIsEnumerable;
		delete NULL.toLocaleString;
		delete NULL.toString;
		delete NULL.valueOf;
		var Null = function () {};
		Null.prototype = NULL;
		var constructor = function () {};
		function __PURE__ (o, properties) {
			if ( properties!==undefined$1 ) { throw TypeError('CAN NOT defineProperties in ES 3 Object.create polyfill'); }
			if ( o===null ) { return new Null; }
			if ( typeof o!=='object' && typeof o!=='function' ) { throw TypeError('Object prototype may only be an Object or null: '+o); }
			constructor.prototype = o;
			var created = new constructor;
			constructor.prototype = NULL;
			return created;
		}
		return function create (o, properties) {
			return /*#__PURE__*/ __PURE__(o, properties);
		}
	}()
	/*¡ j-globals: Object.create (polyfill) */
);

var assign = Object.assign;

var hasOwnProperty = Object.prototype.hasOwnProperty;

var toStringTag = typeof Symbol!=='undefined' ? Symbol.toStringTag : undefined;

var defineProperty = Object.defineProperty;

var freeze = Object.freeze;

var Default = (
	/*! j-globals: default (internal) */
	/*#__PURE__*/ function () {
		if ( !assign && !{ 'toString': null }.propertyIsEnumerable('toString') ) { var keys = [ 'constructor', 'propertyIsEnumerable', 'isPrototypeOf', 'hasOwnProperty', 'valueOf', 'toLocaleString', 'toString' ]; }
		if ( freeze && toStringTag ) { var toStringTagPropertyDescriptor = create(null); toStringTagPropertyDescriptor.value = 'Module'; }
		function Module (exports, addOnOrigin) {
			if ( !addOnOrigin ) { addOnOrigin = exports; exports = create(null); }
			if ( assign ) { assign(exports, addOnOrigin); }
			else {
				for ( var key in addOnOrigin ) { if ( hasOwnProperty.call(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } }
				if ( keys ) { for ( var index = 7; index--; ) { if ( hasOwnProperty.call(addOnOrigin, key = keys[index]) ) { exports[key] = addOnOrigin[key]; } } }
			}
			exports['default'] = exports;
			toStringTagPropertyDescriptor && defineProperty(exports, toStringTag, toStringTagPropertyDescriptor);
			return freeze ? freeze(exports) : exports;
		}
		return function Default (exports, addOnOrigin) {
			return /*#__PURE__*/ Module(exports, addOnOrigin);
		};
	}()
	/*¡ j-globals: default (internal) */
);

/*!
 * 模块名称：j-groupify
 * 模块功能：将一个字符串数组，转化为分支式优化后的正则表达式匹配组。从属于“简计划”。
   　　　　　Transform a string array into a branch-style optimized regExp group. Belong to "Plan J".
 * 模块版本：3.4.2
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-groupify/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-groupify/
 */

var NEED_TO_ESCAPE_IN_REGEXP = /^[$()*+\-.?[\\\]^{|]/;
var SURROGATE_PAIR = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/;
var GROUP = create(null);
function groupify(branches, uFlag, noEscape) {
    var group = create(null);
    var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
    for (var length = branches.length, index = 0; index < length; ++index) {
        appendBranch(group, branches[index]);
    }
    return sourcify(group, !noEscape);
}
function appendPointBranch(group, branch) {
    if (branch) {
        var char = SURROGATE_PAIR.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
        appendPointBranch(group[char] || (group[char] = create(null)), branch.slice(char.length));
    }
    else {
        group[''] = GROUP;
    }
}
function appendCodeBranch(group, branch) {
    if (branch) {
        var char = branch.charAt(0);
        appendCodeBranch(group[char] || (group[char] = create(null)), branch.slice(1));
    }
    else {
        group[''] = GROUP;
    }
}
function sourcify(group, needEscape) {
    var branches = [];
    var singleCharactersBranch = [];
    var noEmptyBranch = true;
    for (var char in group) {
        if (char) {
            var sub_branches = sourcify(group[char], needEscape);
            if (needEscape && NEED_TO_ESCAPE_IN_REGEXP.test(char)) {
                char = '\\' + char;
            }
            sub_branches ? branches.push(char + sub_branches) : singleCharactersBranch.push(char);
        }
        else {
            noEmptyBranch = false;
        }
    }
    singleCharactersBranch.length && branches.unshift(singleCharactersBranch.length === 1 ? singleCharactersBranch[0] : '[' + singleCharactersBranch.join('') + ']');
    return branches.length === 0
        ? ''
        : (branches.length === 1 && (singleCharactersBranch.length || noEmptyBranch)
            ? branches[0]
            : '(?:' + branches.join('|') + ')')
            + (noEmptyBranch ? '' : '?');
}

/*¡ j-groupify */

var _export = Default(newRegExp, {
    version: version,
    newRegExp: newRegExp,
    clearRegExp: clearRegExp,
    groupify: groupify
});

export default _export;
export { clearRegExp, groupify, newRegExp, version };

/*¡ j-regexp */

//# sourceMappingURL=index.mjs.map