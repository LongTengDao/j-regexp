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

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.newRegExp = factory());
}(this, function () { 'use strict';

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

    return _export;

}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIm5ld1JlZ0V4cC50cyIsImNsZWFyUmVnRXhwLnRzIiwiLi4vLi4vai1ncm91cGlmeS9zcmMvZ3JvdXBpZnkudHMiLCJleHBvcnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgJzUuMi4wJzsiLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IHNsaWNlIGZyb20gJy5BcnJheS5wcm90b3R5cGUuc2xpY2UnO1xuXG52YXIgTlQgPSAvW1xcblxcdF0vZztcblxuZnVuY3Rpb24gU291cmNlIChyYXcgOlJlYWRvbmx5QXJyYXk8c3RyaW5nPiwgc3Vic3RpdHV0aW9ucyA6KCBSZWdFeHAgfCBzdHJpbmcgKVtdKSA6c3RyaW5nIHtcblx0dmFyIHNvdXJjZSA6c3RyaW5nID0gcmF3WzBdO1xuXHRmb3IgKCB2YXIgbGVuZ3RoIDpudW1iZXIgPSBzdWJzdGl0dXRpb25zLmxlbmd0aCwgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKSB7XG5cdFx0dmFyIHN1YnN0aXR1dGlvbiA6UmVnRXhwIHwgc3RyaW5nID0gc3Vic3RpdHV0aW9uc1tpbmRleF07XG5cdFx0c291cmNlICs9ICggc3Vic3RpdHV0aW9uIGluc3RhbmNlb2YgUmVnRXhwID8gc3Vic3RpdHV0aW9uLnNvdXJjZSA6IHN1YnN0aXR1dGlvbiApK3Jhd1srK2luZGV4XTtcblx0fVxuXHRyZXR1cm4gc291cmNlLnJlcGxhY2UoTlQsICcnKTtcbn1cblxudmFyIG5ld1JlZ0V4cCA6bmV3UmVnRXhwID1cblx0LyojX19QVVJFX18qL1xuXHRmdW5jdGlvbiAobmV3UmVnRXhwLCBjcmVhdGVOZXdSZWdFeHBXaXRoKSB7XG5cdFx0XG5cdFx0KCBmdW5jdGlvbiByZWN1cnNpb24gKHBpY2tlZEZsYWdzIDpGTEFHUyB8ICcnLCByZXN0RmxhZ3MgOkZMQUdTKSA6dm9pZCB7XG5cdFx0XHRpZiAoIHJlc3RGbGFncyApIHtcblx0XHRcdFx0cmVjdXJzaW9uKHBpY2tlZEZsYWdzK3Jlc3RGbGFncy5jaGFyQXQoMCkgYXMgRkxBR1MsIHJlc3RGbGFncyA9IHJlc3RGbGFncy5zbGljZSgxKSBhcyBGTEFHUyk7XG5cdFx0XHRcdHJlY3Vyc2lvbihwaWNrZWRGbGFncywgcmVzdEZsYWdzKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCBwaWNrZWRGbGFncyApIHtcblx0XHRcdFx0bmV3UmVnRXhwW3BpY2tlZEZsYWdzXSA9IGNyZWF0ZU5ld1JlZ0V4cFdpdGgocGlja2VkRmxhZ3MpO1xuXHRcdFx0fVxuXHRcdH0gKSgnJywgJ2dpbXN1eScpO1xuXHRcdFxuXHRcdHJldHVybiBuZXdSZWdFeHA7XG5cdFx0XG5cdH0oXG5cdFx0ZnVuY3Rpb24gbmV3UmVnRXhwICh0ZW1wbGF0ZSA6VGVtcGxhdGVTdHJpbmdzQXJyYXkpIDpSZWdFeHAge1xuXHRcdFx0cmV0dXJuIG5ldyBSZWdFeHAoU291cmNlKHRlbXBsYXRlLnJhdywgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKSk7XG5cdFx0fSBhcyBuZXdSZWdFeHAsXG5cdFx0XG5cdFx0ZnVuY3Rpb24gY3JlYXRlTmV3UmVnRXhwV2l0aCAoZmxhZ3MgOkZMQUdTKSB7XG5cdFx0XHRyZXR1cm4gKCB7fSBhcyBhbnkgKVsnbmV3UmVnRXhwLicrZmxhZ3NdID0gZnVuY3Rpb24gKHRlbXBsYXRlIDpUZW1wbGF0ZVN0cmluZ3NBcnJheSkgOlJlZ0V4cCB7XG5cdFx0XHRcdHJldHVybiBuZXcgUmVnRXhwKFNvdXJjZSh0ZW1wbGF0ZS5yYXcsIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSksIGZsYWdzKTtcblx0XHRcdH07XG5cdFx0fVxuXHQpO1xuXG5leHBvcnQgZGVmYXVsdCBuZXdSZWdFeHA7XG5cbnR5cGUgbmV3UmVnRXhwID0gZnVuYyAmIHsgW2ZsYWdzIGluIEZMQUdTXSA6ZnVuYyB9O1xuXG50eXBlIGZ1bmMgPSAodGVtcGxhdGUgOlRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5zdWJzdGl0dXRpb25zIDooIFJlZ0V4cCB8IHN0cmluZyApW10pID0+IFJlZ0V4cDtcblxudHlwZSBGTEFHUyA9XG5cdFxuXHQnZ2ltc3V5JyB8ICdnaW1zdScgfCAnZ2ltc3knIHwgJ2dpbXMnIHwgJ2dpbXV5JyB8ICdnaW11JyB8ICdnaW15JyB8ICdnaW0nIHwgJ2dpc3V5JyB8ICdnaXN1JyB8ICdnaXN5JyB8ICdnaXMnIHwgJ2dpdXknIHwgJ2dpdScgfCAnZ2l5JyB8ICdnaScgfCAnZ21zdXknIHwgJ2dtc3UnIHwgJ2dtc3knIHwgJ2dtcycgfCAnZ211eScgfCAnZ211JyB8ICdnbXknIHwgJ2dtJyB8ICdnc3V5JyB8ICdnc3UnIHwgJ2dzeScgfCAnZ3MnIHwgJ2d1eScgfCAnZ3UnIHwgJ2d5JyB8ICdnJ1xuXHR8XG5cdCdpbXN1eScgfCAnaW1zdScgfCAnaW1zeScgfCAnaW1zJyB8ICdpbXV5JyB8ICdpbXUnIHwgJ2lteScgfCAnaW0nIHwgJ2lzdXknIHwgJ2lzdScgfCAnaXN5JyB8ICdpcycgfCAnaXV5JyB8ICdpdScgfCAnaXknIHwgJ2knXG5cdHxcblx0J21zdXknIHwgJ21zdScgfCAnbXN5JyB8ICdtcycgfCAnbXV5JyB8ICdtdScgfCAnbXknIHwgJ20nXG5cdHxcblx0J3N1eScgfCAnc3UnIHwgJ3N5JyB8ICdzJ1xuXHR8XG5cdCd1eScgfCAndSdcblx0fFxuXHQneSc7XG4iLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuXG52YXIgY2xlYXJSZWdFeHAgPSAnJF8nIGluIFJlZ0V4cFxuXHQ/IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgUkVHRVhQID0gL14vO1xuXHRcdHJldHVybiBmdW5jdGlvbiBjbGVhclJlZ0V4cDxUIGV4dGVuZHMgYW55PiAodmFsdWU/IDpUKSA6dW5kZWZpbmVkIHwgVCB7XG5cdFx0XHRSRUdFWFAudGVzdCgnJyk7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fTtcblx0fSgpXG5cdDogZnVuY3Rpb24gY2xlYXJSZWdFeHA8VCBleHRlbmRzIGFueT4gKHZhbHVlPyA6VCkgOnVuZGVmaW5lZCB8IFQge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xlYXJSZWdFeHA7IiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcblxudmFyIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUCA9IC9eWyQoKSorXFwtLj9bXFxcXFxcXV57fF0vO1xudmFyIFNVUlJPR0FURV9QQUlSID0gL15bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdLztcbnZhciBHUk9VUCA6R3JvdXAgPSBjcmVhdGUobnVsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyA6c3RyaW5nW10sIHVGbGFnPyA6Ym9vbGVhbiwgbm9Fc2NhcGU/IDpib29sZWFuKSA6c3RyaW5nIHtcblx0dmFyIGdyb3VwIDpHcm91cCA9IGNyZWF0ZShudWxsKTtcblx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRmb3IgKCB2YXIgbGVuZ3RoIDpudW1iZXIgPSBicmFuY2hlcy5sZW5ndGgsIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IGFwcGVuZEJyYW5jaChncm91cCwgYnJhbmNoZXNbaW5kZXhdKTsgfVxuXHRyZXR1cm4gc291cmNpZnkoZ3JvdXAsICFub0VzY2FwZSk7XG59O1xuXG5mdW5jdGlvbiBhcHBlbmRQb2ludEJyYW5jaCAoZ3JvdXAgOkdyb3VwLCBicmFuY2ggOnN0cmluZykgOnZvaWQge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhciA6c3RyaW5nID0gU1VSUk9HQVRFX1BBSVIudGVzdChicmFuY2gpID8gYnJhbmNoLnNsaWNlKDAsIDIpIDogYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRQb2ludEJyYW5jaChncm91cFtjaGFyXSB8fCAoIGdyb3VwW2NoYXJdID0gY3JlYXRlKG51bGwpICksIGJyYW5jaC5zbGljZShjaGFyLmxlbmd0aCkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRDb2RlQnJhbmNoIChncm91cCA6R3JvdXAsIGJyYW5jaCA6c3RyaW5nKSA6dm9pZCB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyIDpzdHJpbmcgPSBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXBbY2hhcl0gfHwgKCBncm91cFtjaGFyXSA9IGNyZWF0ZShudWxsKSApLCBicmFuY2guc2xpY2UoMSkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBzb3VyY2lmeSAoZ3JvdXAgOkdyb3VwLCBuZWVkRXNjYXBlIDpib29sZWFuKSA6c3RyaW5nIHtcblx0dmFyIGJyYW5jaGVzIDpzdHJpbmdbXSA9IFtdO1xuXHR2YXIgc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaCA6c3RyaW5nW10gPSBbXTtcblx0dmFyIG5vRW1wdHlCcmFuY2ggOmJvb2xlYW4gPSB0cnVlO1xuXHRmb3IgKCB2YXIgY2hhciBpbiBncm91cCApIHtcblx0XHRpZiAoIGNoYXIgKSB7XG5cdFx0XHR2YXIgc3ViX2JyYW5jaGVzIDpzdHJpbmcgPSBzb3VyY2lmeShncm91cFtjaGFyXSwgbmVlZEVzY2FwZSk7XG5cdFx0XHRpZiAoIG5lZWRFc2NhcGUgJiYgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQLnRlc3QoY2hhcikgKSB7IGNoYXIgPSAnXFxcXCcrY2hhcjsgfVxuXHRcdFx0c3ViX2JyYW5jaGVzID8gYnJhbmNoZXMucHVzaChjaGFyK3N1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcik7XG5cdFx0fVxuXHRcdGVsc2UgeyBub0VtcHR5QnJhbmNoID0gZmFsc2U7IH1cblx0fVxuXHRzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCAmJiBicmFuY2hlcy51bnNoaWZ0KHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoPT09MSA/IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2hbMF0gOiAnWycrc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5qb2luKCcnKSsnXScpO1xuXHRyZXR1cm4gYnJhbmNoZXMubGVuZ3RoPT09MFxuXHRcdD8gJydcblx0XHQ6ICggYnJhbmNoZXMubGVuZ3RoPT09MSAmJiAoIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoIHx8IG5vRW1wdHlCcmFuY2ggKVxuXHRcdFx0PyBicmFuY2hlc1swXVxuXHRcdFx0OiAnKD86JyticmFuY2hlcy5qb2luKCd8JykrJyknXG5cdFx0KVxuXHRcdCsoIG5vRW1wdHlCcmFuY2ggPyAnJyA6ICc/JyApO1xufVxuXG50eXBlIEdyb3VwID0geyBbY2hhciA6c3RyaW5nXSA6R3JvdXAgfTtcbiIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmltcG9ydCBuZXdSZWdFeHAgZnJvbSAnLi9uZXdSZWdFeHAnO1xuaW1wb3J0IGNsZWFyUmVnRXhwIGZyb20gJy4vY2xlYXJSZWdFeHAnO1xuaW1wb3J0IGdyb3VwaWZ5IGZyb20gJy4vZ3JvdXBpZnknO1xuXG5leHBvcnQgeyB2ZXJzaW9uLCBuZXdSZWdFeHAsIGNsZWFyUmVnRXhwLCBncm91cGlmeSB9O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0KG5ld1JlZ0V4cCwge1xuXHR2ZXJzaW9uOiB2ZXJzaW9uLFxuXHRuZXdSZWdFeHA6IG5ld1JlZ0V4cCxcblx0Y2xlYXJSZWdFeHA6IGNsZWFyUmVnRXhwLFxuXHRncm91cGlmeTogZ3JvdXBpZnlcbn0pOyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtCQUFlLE9BQU87Ozs7MEJBQUMsdEJDR3ZCLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQztJQUVuQixTQUFTLE1BQU0sQ0FBRSxHQUEwQixFQUFF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S0FDM0I7SUFFRCxTQUFTLFFBQVEsQ0FBRSxLQUFZLEVBQUUsVUFBbUI7UUFDbkQsSUFBSSxRQUFRLEdBQWEsRUFBRSxDQUFDO1FBQzVCLElBQUksc0JBQXNCLEdBQWEsRUFBRSxDQUFDO1FBQzFDLElBQUksYUFBYSxHQUFZLElBQUksQ0FBQztRQUNsQyxLQUFNLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRztZQUN6QixJQUFLLElBQUksRUFBRztnQkFDWCxJQUFJLFlBQVksR0FBVyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUM3RCxJQUFLLFVBQVUsSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUc7b0JBQUUsSUFBSSxHQUFHLElBQUksR0FBQyxJQUFJLENBQUM7aUJBQUU7Z0JBQzlFLFlBQVksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxZQUFZLENBQUMsR0FBRyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEY7aUJBQ0k7Z0JBQUUsYUFBYSxHQUFHLEtBQUssQ0FBQzthQUFFO1NBQy9CO1FBQ0Qsc0JBQXNCLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsTUFBTSxLQUFHLENBQUMsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNKLE9BQU8sUUFBUSxDQUFDLE1BQU0sS0FBRyxDQUFDO2NBQ3ZCLEVBQUU7Y0FDRixDQUFFLFFBQVEsQ0FBQyxNQUFNLEtBQUcsQ0FBQyxLQUFNLHNCQUFzQixDQUFDLE1BQU0sSUFBSSxhQUFhLENBQUU7a0JBQzFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7a0JBQ1gsS0FBSyxHQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUMsR0FBRzttQkFFNUIsYUFBYSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUUsQ0FBQztLQUMvQjs7OztBQ3pDRCxrQkFBZSxPQUFPLENBQUMsU0FBUyxFQUFFO1FBQ2pDLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLFNBQVMsRUFBRSxTQUFTO1FBQ3BCLFdBQVcsRUFBRSxXQUFXO1FBQ3hCLFFBQVEsRUFBRSxRQUFRO0tBQ2xCLENBQUMsQ0FBQzs7Ozs7Ozs7Iiwic291cmNlUm9vdCI6Ii4uLy4uL3NyYy8ifQ==