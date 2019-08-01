/*!
 * 模块名称：j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。从属于“简计划”。
   　　　　　More readable way for creating RegExp. Belong to "Plan J".
 * 模块版本：5.3.0
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

	var version = '5.3.0';

	var slice = Array.prototype.slice;

	var NT = /[\n\t]/g;

	function Source (raw                       , substitutions                       )         {
		var source         = raw[0];
		for ( var length         = substitutions.length, index         = 0; index<length; ) {
			var substitution                  = substitutions[index];
			source += ( substitution instanceof RegExp ? substitution.source : substitution )+raw[++index];
		}
		return source.replace(NT, '');
	}

	var newRegExp            =
		/*#__PURE__*/
		function (newRegExp, createNewRegExpWith) {
			
			( function recursion (pickedFlags            , restFlags       )       {
				if ( restFlags ) {
					recursion(pickedFlags+restFlags.charAt(0)         , restFlags = restFlags.slice(1)         );
					recursion(pickedFlags, restFlags);
				}
				else if ( pickedFlags ) {
					newRegExp[pickedFlags] = createNewRegExpWith(pickedFlags);
				}
			} )('', 'gimsuy');
			
			return newRegExp;
			
		}(
			function newRegExp (template                      )         {
				return new RegExp(Source(template.raw, slice.call(arguments, 1)));
			}             ,
			
			function createNewRegExpWith (flags       ) {
				return ( {}        )['newRegExp.'+flags] = function (template                      )         {
					return new RegExp(Source(template.raw, slice.call(arguments, 1)), flags);
				};
			}
		);

	var clearRegExp = '$_' in RegExp
		? function () {
			var REGEXP = /^/;
			return function clearRegExp                (value    )                {
				REGEXP.test('');
				return value;
			};
		}()
		: function clearRegExp                (value    )                {
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
				dom.setAttribute('style', 'display:none !important;_display:none;');//dom.style.display = 'none';
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
			};
		}()
		/*¡ j-globals: Object.create (polyfill) */
	);

	var assign = Object.assign;

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var toStringTag = typeof Symbol!=='undefined' ? Symbol.toStringTag : undefined;

	var defineProperty = Object.defineProperty;

	var freeze = Object.freeze;

	var seal = Object.seal;

	var Default = (
		/*! j-globals: default (internal) */
		function Default (exports, addOnOrigin) {
			return /*#__PURE__*/ function Module (exports, addOnOrigin) {
				if ( !addOnOrigin ) { addOnOrigin = exports; exports = create(null); }
				if ( assign ) { assign(exports, addOnOrigin); }
				else {
					for ( var key in addOnOrigin ) { if ( hasOwnProperty.call(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } }
					if ( !{ 'toString': null }.propertyIsEnumerable('toString') ) {
						var keys = [ 'constructor', 'propertyIsEnumerable', 'isPrototypeOf', 'hasOwnProperty', 'valueOf', 'toLocaleString', 'toString' ];
						while ( key = keys.pop() ) { if ( hasOwnProperty.call(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } }
					}
				}
				exports['default'] = exports;
				if ( seal ) {
					typeof exports==='function' && exports.prototype && seal(exports.prototype);
					if ( toStringTag ) {
						var descriptor = create(null);
						descriptor.value = 'Module';
						defineProperty(exports, toStringTag, descriptor);
					}
					freeze(exports);
				}
				return exports;
			}(exports, addOnOrigin);
		}
		/*¡ j-globals: default (internal) */
	);

	/*!
	 * 模块名称：j-groupify
	 * 模块功能：将一个字符串数组，转化为分支式优化后的正则表达式匹配组。从属于“简计划”。
	   　　　　　Transform a string array into a branch-style optimized regExp group. Belong to "Plan J".
	 * 模块版本：3.5.0
	 * 许可条款：LGPL-3.0
	 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
	 * 问题反馈：https://GitHub.com/LongTengDao/j-groupify/issues
	 * 项目主页：https://GitHub.com/LongTengDao/j-groupify/
	 */

	var NEED_TO_ESCAPE_IN_REGEXP = /^[$()*+\-.?[\\\]^{|]/;
	var SURROGATE_PAIR = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/;
	var GROUP        = create(null);

	function groupify (branches          , uFlag          , noEscape          )         {
		var group        = create(null);
		var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
		for ( var length         = branches.length, index         = 0; index<length; ++index ) { appendBranch(group, branches[index]); }
		return sourcify(group, !noEscape);
	}
	function appendPointBranch (group       , branch        )       {
		if ( branch ) {
			var char         = SURROGATE_PAIR.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
			appendPointBranch(group[char] || ( group[char] = create(null) ), branch.slice(char.length));
		}
		else { group[''] = GROUP; }
	}

	function appendCodeBranch (group       , branch        )       {
		if ( branch ) {
			var char         = branch.charAt(0);
			appendCodeBranch(group[char] || ( group[char] = create(null) ), branch.slice(1));
		}
		else { group[''] = GROUP; }
	}

	function sourcify (group       , needEscape         )         {
		var branches           = [];
		var singleCharactersBranch           = [];
		var noEmptyBranch          = true;
		for ( var char in group ) {
			if ( char ) {
				var sub_branches         = sourcify(group[char], needEscape);
				if ( needEscape && NEED_TO_ESCAPE_IN_REGEXP.test(char) ) { char = '\\'+char; }
				sub_branches ? branches.push(char+sub_branches) : singleCharactersBranch.push(char);
			}
			else { noEmptyBranch = false; }
		}
		singleCharactersBranch.length && branches.unshift(singleCharactersBranch.length===1 ? singleCharactersBranch[0] : '['+singleCharactersBranch.join('')+']');
		return branches.length===0
			? ''
			: ( branches.length===1 && ( singleCharactersBranch.length || noEmptyBranch )
				? branches[0]
				: '(?:'+branches.join('|')+')'
			)
			+( noEmptyBranch ? '' : '?' );
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIm5ld1JlZ0V4cC50cyIsImNsZWFyUmVnRXhwLnRzIiwiLi4vLi4vai1ncm91cGlmeS9zcmMvZ3JvdXBpZnkudHMiLCJleHBvcnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgJzUuMy4wJzsiLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IHNsaWNlIGZyb20gJy5BcnJheS5wcm90b3R5cGUuc2xpY2UnO1xuXG52YXIgTlQgPSAvW1xcblxcdF0vZztcblxuZnVuY3Rpb24gU291cmNlIChyYXcgICAgICAgICAgICAgICAgICAgICAgICwgc3Vic3RpdHV0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIHNvdXJjZSAgICAgICAgID0gcmF3WzBdO1xuXHRmb3IgKCB2YXIgbGVuZ3RoICAgICAgICAgPSBzdWJzdGl0dXRpb25zLmxlbmd0aCwgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKSB7XG5cdFx0dmFyIHN1YnN0aXR1dGlvbiAgICAgICAgICAgICAgICAgID0gc3Vic3RpdHV0aW9uc1tpbmRleF07XG5cdFx0c291cmNlICs9ICggc3Vic3RpdHV0aW9uIGluc3RhbmNlb2YgUmVnRXhwID8gc3Vic3RpdHV0aW9uLnNvdXJjZSA6IHN1YnN0aXR1dGlvbiApK3Jhd1srK2luZGV4XTtcblx0fVxuXHRyZXR1cm4gc291cmNlLnJlcGxhY2UoTlQsICcnKTtcbn1cblxudmFyIG5ld1JlZ0V4cCAgICAgICAgICAgID1cblx0LyojX19QVVJFX18qL1xuXHRmdW5jdGlvbiAobmV3UmVnRXhwLCBjcmVhdGVOZXdSZWdFeHBXaXRoKSB7XG5cdFx0XG5cdFx0KCBmdW5jdGlvbiByZWN1cnNpb24gKHBpY2tlZEZsYWdzICAgICAgICAgICAgLCByZXN0RmxhZ3MgICAgICAgKSAgICAgICB7XG5cdFx0XHRpZiAoIHJlc3RGbGFncyApIHtcblx0XHRcdFx0cmVjdXJzaW9uKHBpY2tlZEZsYWdzK3Jlc3RGbGFncy5jaGFyQXQoMCkgICAgICAgICAsIHJlc3RGbGFncyA9IHJlc3RGbGFncy5zbGljZSgxKSAgICAgICAgICk7XG5cdFx0XHRcdHJlY3Vyc2lvbihwaWNrZWRGbGFncywgcmVzdEZsYWdzKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCBwaWNrZWRGbGFncyApIHtcblx0XHRcdFx0bmV3UmVnRXhwW3BpY2tlZEZsYWdzXSA9IGNyZWF0ZU5ld1JlZ0V4cFdpdGgocGlja2VkRmxhZ3MpO1xuXHRcdFx0fVxuXHRcdH0gKSgnJywgJ2dpbXN1eScpO1xuXHRcdFxuXHRcdHJldHVybiBuZXdSZWdFeHA7XG5cdFx0XG5cdH0oXG5cdFx0ZnVuY3Rpb24gbmV3UmVnRXhwICh0ZW1wbGF0ZSAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAge1xuXHRcdFx0cmV0dXJuIG5ldyBSZWdFeHAoU291cmNlKHRlbXBsYXRlLnJhdywgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKSk7XG5cdFx0fSAgICAgICAgICAgICAsXG5cdFx0XG5cdFx0ZnVuY3Rpb24gY3JlYXRlTmV3UmVnRXhwV2l0aCAoZmxhZ3MgICAgICAgKSB7XG5cdFx0XHRyZXR1cm4gKCB7fSAgICAgICAgKVsnbmV3UmVnRXhwLicrZmxhZ3NdID0gZnVuY3Rpb24gKHRlbXBsYXRlICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICB7XG5cdFx0XHRcdHJldHVybiBuZXcgUmVnRXhwKFNvdXJjZSh0ZW1wbGF0ZS5yYXcsIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSksIGZsYWdzKTtcblx0XHRcdH07XG5cdFx0fVxuXHQpO1xuXG5leHBvcnQgZGVmYXVsdCBuZXdSZWdFeHA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgXG5cdFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgXG5cdCAgICAgICAgICBcblx0IFxuXHQgICAgXG4iLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuXG52YXIgY2xlYXJSZWdFeHAgPSAnJF8nIGluIFJlZ0V4cFxuXHQ/IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgUkVHRVhQID0gL14vO1xuXHRcdHJldHVybiBmdW5jdGlvbiBjbGVhclJlZ0V4cCAgICAgICAgICAgICAgICAodmFsdWUgICAgKSAgICAgICAgICAgICAgICB7XG5cdFx0XHRSRUdFWFAudGVzdCgnJyk7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fTtcblx0fSgpXG5cdDogZnVuY3Rpb24gY2xlYXJSZWdFeHAgICAgICAgICAgICAgICAgKHZhbHVlICAgICkgICAgICAgICAgICAgICAge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xlYXJSZWdFeHA7IiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcblxudmFyIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUCA9IC9eWyQoKSorXFwtLj9bXFxcXFxcXV57fF0vO1xudmFyIFNVUlJPR0FURV9QQUlSID0gL15bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdLztcbnZhciBHUk9VUCAgICAgICAgPSBjcmVhdGUobnVsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdyb3VwaWZ5IChicmFuY2hlcyAgICAgICAgICAsIHVGbGFnICAgICAgICAgICwgbm9Fc2NhcGUgICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGdyb3VwICAgICAgICA9IGNyZWF0ZShudWxsKTtcblx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRmb3IgKCB2YXIgbGVuZ3RoICAgICAgICAgPSBicmFuY2hlcy5sZW5ndGgsIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IGFwcGVuZEJyYW5jaChncm91cCwgYnJhbmNoZXNbaW5kZXhdKTsgfVxuXHRyZXR1cm4gc291cmNpZnkoZ3JvdXAsICFub0VzY2FwZSk7XG59O1xuXG5mdW5jdGlvbiBhcHBlbmRQb2ludEJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhciAgICAgICAgID0gU1VSUk9HQVRFX1BBSVIudGVzdChicmFuY2gpID8gYnJhbmNoLnNsaWNlKDAsIDIpIDogYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRQb2ludEJyYW5jaChncm91cFtjaGFyXSB8fCAoIGdyb3VwW2NoYXJdID0gY3JlYXRlKG51bGwpICksIGJyYW5jaC5zbGljZShjaGFyLmxlbmd0aCkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRDb2RlQnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyICAgICAgICAgPSBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXBbY2hhcl0gfHwgKCBncm91cFtjaGFyXSA9IGNyZWF0ZShudWxsKSApLCBicmFuY2guc2xpY2UoMSkpO1xuXHR9XG5cdGVsc2UgeyBncm91cFsnJ10gPSBHUk9VUDsgfVxufVxuXG5mdW5jdGlvbiBzb3VyY2lmeSAoZ3JvdXAgICAgICAgLCBuZWVkRXNjYXBlICAgICAgICAgKSAgICAgICAgIHtcblx0dmFyIGJyYW5jaGVzICAgICAgICAgICA9IFtdO1xuXHR2YXIgc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaCAgICAgICAgICAgPSBbXTtcblx0dmFyIG5vRW1wdHlCcmFuY2ggICAgICAgICAgPSB0cnVlO1xuXHRmb3IgKCB2YXIgY2hhciBpbiBncm91cCApIHtcblx0XHRpZiAoIGNoYXIgKSB7XG5cdFx0XHR2YXIgc3ViX2JyYW5jaGVzICAgICAgICAgPSBzb3VyY2lmeShncm91cFtjaGFyXSwgbmVlZEVzY2FwZSk7XG5cdFx0XHRpZiAoIG5lZWRFc2NhcGUgJiYgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQLnRlc3QoY2hhcikgKSB7IGNoYXIgPSAnXFxcXCcrY2hhcjsgfVxuXHRcdFx0c3ViX2JyYW5jaGVzID8gYnJhbmNoZXMucHVzaChjaGFyK3N1Yl9icmFuY2hlcykgOiBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLnB1c2goY2hhcik7XG5cdFx0fVxuXHRcdGVsc2UgeyBub0VtcHR5QnJhbmNoID0gZmFsc2U7IH1cblx0fVxuXHRzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCAmJiBicmFuY2hlcy51bnNoaWZ0KHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoPT09MSA/IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2hbMF0gOiAnWycrc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5qb2luKCcnKSsnXScpO1xuXHRyZXR1cm4gYnJhbmNoZXMubGVuZ3RoPT09MFxuXHRcdD8gJydcblx0XHQ6ICggYnJhbmNoZXMubGVuZ3RoPT09MSAmJiAoIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoIHx8IG5vRW1wdHlCcmFuY2ggKVxuXHRcdFx0PyBicmFuY2hlc1swXVxuXHRcdFx0OiAnKD86JyticmFuY2hlcy5qb2luKCd8JykrJyknXG5cdFx0KVxuXHRcdCsoIG5vRW1wdHlCcmFuY2ggPyAnJyA6ICc/JyApO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmltcG9ydCBuZXdSZWdFeHAgZnJvbSAnLi9uZXdSZWdFeHAnO1xuaW1wb3J0IGNsZWFyUmVnRXhwIGZyb20gJy4vY2xlYXJSZWdFeHAnO1xuaW1wb3J0IGdyb3VwaWZ5IGZyb20gJy4vZ3JvdXBpZnknO1xuXG5leHBvcnQgeyB2ZXJzaW9uLCBuZXdSZWdFeHAsIGNsZWFyUmVnRXhwLCBncm91cGlmeSB9O1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdD89JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQobmV3UmVnRXhwLCB7XG5cdHZlcnNpb246IHZlcnNpb24sXG5cdG5ld1JlZ0V4cDogbmV3UmVnRXhwLFxuXHRjbGVhclJlZ0V4cDogY2xlYXJSZWdFeHAsXG5cdGdyb3VwaWZ5OiBncm91cGlmeVxufSk7Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZUFBZSxPQUFPOzs7O3VCQUFDLHRCQ0d2QixJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUM7O0NBRW5CLFNBQVMsTUFBTSxFQUFFLEdBQUcseUJB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