/*!
 * 模块名称：@ltd/j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。
   　　　　　More readable way for creating RegExp.
 * 模块版本：1.1.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-regexp/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-regexp/
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.jRegExp = factory());
}(this, function () { 'use strict';

    var version = '1.1.0';

    var slice = Array.prototype.slice;

    var NT = /[\n\t]/g;
    function Source(raw, substitutions) {
        var source = raw[0];
        for (var length = substitutions.length, index = 0; index < length;) {
            var substitution = substitutions[index];
            source += (typeof substitution === 'string' ? substitution : substitution.source) + raw[++index];
        }
        return source.replace(NT, '');
    }
    function newRegExp(template) {
        return RegExp(Source(template.raw, slice.call(arguments, 1)));
    }
    function NewRegExp(flags) {
        return function newRegExp(template) {
            return RegExp(Source(template.raw, slice.call(arguments, 1)), flags);
        };
    }
    var jRegExp = {
        newRegExp: newRegExp,
        NewRegExp: NewRegExp,
        version: version
    };
    jRegExp['default'] = jRegExp;

    return jRegExp;

}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMS4xLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBzbGljZSBmcm9tICcuQXJyYXkucHJvdG90eXBlLnNsaWNlJztcblxudmFyIE5UID0gL1tcXG5cXHRdL2c7XG5cbmZ1bmN0aW9uIFNvdXJjZSAocmF3LCBzdWJzdGl0dXRpb25zKSA6c3RyaW5nIHtcblx0dmFyIHNvdXJjZSA6c3RyaW5nID0gcmF3WzBdO1xuXHRmb3IgKCB2YXIgbGVuZ3RoIDpudW1iZXIgPSBzdWJzdGl0dXRpb25zLmxlbmd0aCwgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKSB7XG5cdFx0dmFyIHN1YnN0aXR1dGlvbiA6c3RyaW5nIHwgUmVnRXhwID0gc3Vic3RpdHV0aW9uc1tpbmRleF07XG5cdFx0c291cmNlICs9ICggdHlwZW9mIHN1YnN0aXR1dGlvbj09PSdzdHJpbmcnID8gc3Vic3RpdHV0aW9uIDogc3Vic3RpdHV0aW9uLnNvdXJjZSApK3Jhd1srK2luZGV4XTtcblx0fVxuXHRyZXR1cm4gc291cmNlLnJlcGxhY2UoTlQsICcnKTtcbn1cblxuZnVuY3Rpb24gbmV3UmVnRXhwICh0ZW1wbGF0ZSA6VGVtcGxhdGVTdHJpbmdzQXJyYXksIC4uLnN1YnN0aXR1dGlvbnMgOiggc3RyaW5nIHwgUmVnRXhwIClbXSkgOlJlZ0V4cDtcbmZ1bmN0aW9uIG5ld1JlZ0V4cCAodGVtcGxhdGUgOlRlbXBsYXRlU3RyaW5nc0FycmF5KSA6UmVnRXhwIHtcblx0cmV0dXJuIFJlZ0V4cChTb3VyY2UodGVtcGxhdGUucmF3LCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpKTtcbn1cbmV4cG9ydCB7IG5ld1JlZ0V4cCB9O1xuXG5leHBvcnQgZnVuY3Rpb24gTmV3UmVnRXhwIChmbGFncyA6c3RyaW5nKSA6dHlwZW9mIG5ld1JlZ0V4cCB7XG5cdHJldHVybiBmdW5jdGlvbiBuZXdSZWdFeHAgKHRlbXBsYXRlIDpUZW1wbGF0ZVN0cmluZ3NBcnJheSkgOlJlZ0V4cCB7XG5cdFx0cmV0dXJuIFJlZ0V4cChTb3VyY2UodGVtcGxhdGUucmF3LCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpLCBmbGFncyk7XG5cdH07XG59XG5cbnZhciBqUmVnRXhwID0ge1xuXHRuZXdSZWdFeHA6IG5ld1JlZ0V4cCxcblx0TmV3UmVnRXhwOiBOZXdSZWdFeHAsXG5cdHZlcnNpb246IHZlcnNpb25cbn07XG5qUmVnRXhwWydkZWZhdWx0J10gPSBqUmVnRXhwO1xuZXhwb3J0IGRlZmF1bHQgalJlZ0V4cDtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtCQUFlLE9BQU87Ozs7MEJBQUMsdEJDTXZCLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQztJQUVuQixTQUFTLE1BQU0sQ0FBRSxHQUFHLEVBQUUsYUFBYTtRQUNsQyxJQUFJLE1BQU0sR0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsS0FBTSxJQUFJLE1BQU0sR0FBVyxhQUFhLENBQUMsTUFBTSxFQUFFLEtBQUssR0FBVyxDQUFDLEVBQUUsS0FBSyxHQUFDLE1BQU0sR0FBSTtZQUNuRixJQUFJLFlBQVksR0FBb0IsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pELE1BQU0sSUFBSSxDQUFFLE9BQU8sWUFBWSxLQUFHLFFBQVEsR0FBRyxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sSUFBRyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMvRjtRQUNELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUdELFNBQVMsU0FBUyxDQUFFLFFBQThCO1FBQ2pELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0FBQ0QsYUFFZ0IsU0FBUyxDQUFFLEtBQWE7UUFDdkMsT0FBTyxTQUFTLFNBQVMsQ0FBRSxRQUE4QjtZQUN4RCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3JFLENBQUM7SUFDSCxDQUFDO0lBRUQsSUFBSSxPQUFPLEdBQUc7UUFDYixTQUFTLEVBQUUsU0FBUztRQUNwQixTQUFTLEVBQUUsU0FBUztRQUNwQixPQUFPLEVBQUUsT0FBTztLQUNoQixDQUFDO0lBQ0YsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQzs7Ozs7Ozs7Iiwic291cmNlUm9vdCI6Ii4uLy4uL3NyYy8ifQ==