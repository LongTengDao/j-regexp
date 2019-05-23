﻿/*!
 * 模块名称：@ltd/j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。
   　　　　　More readable way for creating RegExp.
 * 模块版本：1.2.0
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

    var version = '1.2.0';

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
    function newRegExp(template) {
        return RegExp(Source(template.raw, slice.call(arguments, 1)));
    }
    function NewRegExp(flags) {
        return function newRegExp(template) {
            return RegExp(Source(template.raw, slice.call(arguments, 1)), flags);
        };
    }
    var g = /*#__PURE__*/ NewRegExp('g');
    var i = /*#__PURE__*/ NewRegExp('i');
    var m = /*#__PURE__*/ NewRegExp('m');
    var gi = /*#__PURE__*/ NewRegExp('gi');
    var gm = /*#__PURE__*/ NewRegExp('gm');
    var im = /*#__PURE__*/ NewRegExp('im');
    var gim = /*#__PURE__*/ NewRegExp('gim');
    var _export = (
    /*#__PURE__*/
    function () {
        var exports = {
            version: version,
            newRegExp: newRegExp,
            NewRegExp: NewRegExp,
            g: g,
            i: i,
            m: m,
            gi: gi,
            gm: gm,
            im: im,
            gim: gim
        };
        return exports['default'] = exports;
    }());

    return _export;

}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMS4yLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBzbGljZSBmcm9tICcuQXJyYXkucHJvdG90eXBlLnNsaWNlJztcblxudmFyIE5UID0gL1tcXG5cXHRdL2c7XG5cbmZ1bmN0aW9uIFNvdXJjZSAocmF3IDpSZWFkb25seUFycmF5PHN0cmluZz4sIHN1YnN0aXR1dGlvbnMgOiggc3RyaW5nIHwgUmVnRXhwIClbXSkgOnN0cmluZyB7XG5cdHZhciBzb3VyY2UgOnN0cmluZyA9IHJhd1swXTtcblx0Zm9yICggdmFyIGxlbmd0aCA6bnVtYmVyID0gc3Vic3RpdHV0aW9ucy5sZW5ndGgsIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICkge1xuXHRcdHZhciBzdWJzdGl0dXRpb24gOnN0cmluZyB8IFJlZ0V4cCA9IHN1YnN0aXR1dGlvbnNbaW5kZXhdO1xuXHRcdHNvdXJjZSArPSAoIHN1YnN0aXR1dGlvbiBpbnN0YW5jZW9mIFJlZ0V4cCA/IHN1YnN0aXR1dGlvbi5zb3VyY2UgOiBzdWJzdGl0dXRpb24gKStyYXdbKytpbmRleF07XG5cdH1cblx0cmV0dXJuIHNvdXJjZS5yZXBsYWNlKE5ULCAnJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdSZWdFeHAgKHRlbXBsYXRlIDpUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uc3Vic3RpdHV0aW9ucyA6KCBzdHJpbmcgfCBSZWdFeHAgKVtdKSA6UmVnRXhwO1xuZXhwb3J0IGZ1bmN0aW9uIG5ld1JlZ0V4cCAodGVtcGxhdGUgOlRlbXBsYXRlU3RyaW5nc0FycmF5KSA6UmVnRXhwIHtcblx0cmV0dXJuIFJlZ0V4cChTb3VyY2UodGVtcGxhdGUucmF3LCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE5ld1JlZ0V4cCAoZmxhZ3MgOnN0cmluZykgOnR5cGVvZiBuZXdSZWdFeHAge1xuXHRyZXR1cm4gZnVuY3Rpb24gbmV3UmVnRXhwICh0ZW1wbGF0ZSA6VGVtcGxhdGVTdHJpbmdzQXJyYXkpIDpSZWdFeHAge1xuXHRcdHJldHVybiBSZWdFeHAoU291cmNlKHRlbXBsYXRlLnJhdywgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKSwgZmxhZ3MpO1xuXHR9O1xufVxuXG5leHBvcnQgdmFyIGcgPSAvKiNfX1BVUkVfXyovTmV3UmVnRXhwKCdnJyk7XG5leHBvcnQgdmFyIGkgPSAvKiNfX1BVUkVfXyovTmV3UmVnRXhwKCdpJyk7XG5leHBvcnQgdmFyIG0gPSAvKiNfX1BVUkVfXyovTmV3UmVnRXhwKCdtJyk7XG5leHBvcnQgdmFyIGdpID0gLyojX19QVVJFX18qL05ld1JlZ0V4cCgnZ2knKTtcbmV4cG9ydCB2YXIgZ20gPSAvKiNfX1BVUkVfXyovTmV3UmVnRXhwKCdnbScpO1xuZXhwb3J0IHZhciBpbSA9IC8qI19fUFVSRV9fKi9OZXdSZWdFeHAoJ2ltJyk7XG5leHBvcnQgdmFyIGdpbSA9IC8qI19fUFVSRV9fKi9OZXdSZWdFeHAoJ2dpbScpO1xuXG5leHBvcnQgZGVmYXVsdCAoXG5cdC8qI19fUFVSRV9fKi9cblx0ZnVuY3Rpb24gKCkge1xuXHRcdHZhciBleHBvcnRzIDpleHBvcnRzID0ge1xuXHRcdFx0dmVyc2lvbjogdmVyc2lvbixcblx0XHRcdG5ld1JlZ0V4cDogbmV3UmVnRXhwLFxuXHRcdFx0TmV3UmVnRXhwOiBOZXdSZWdFeHAsXG5cdFx0XHRnOiBnLFxuXHRcdFx0aTogaSxcblx0XHRcdG06IG0sXG5cdFx0XHRnaTogZ2ksXG5cdFx0XHRnbTogZ20sXG5cdFx0XHRpbTogaW0sXG5cdFx0XHRnaW06IGdpbVxuXHRcdH07XG5cdFx0cmV0dXJuIGV4cG9ydHNbJ2RlZmF1bHQnXSA9IGV4cG9ydHM7XG5cdFx0dHlwZSBleHBvcnRzID0ge1xuXHRcdFx0dmVyc2lvbiA6dHlwZW9mIHZlcnNpb24sXG5cdFx0XHRuZXdSZWdFeHAgOnR5cGVvZiBuZXdSZWdFeHAsXG5cdFx0XHROZXdSZWdFeHAgOnR5cGVvZiBOZXdSZWdFeHAsXG5cdFx0XHRnOiB0eXBlb2YgZyxcblx0XHRcdGk6IHR5cGVvZiBpLFxuXHRcdFx0bTogdHlwZW9mIG0sXG5cdFx0XHRnaTogdHlwZW9mIGdpLFxuXHRcdFx0Z206IHR5cGVvZiBnbSxcblx0XHRcdGltOiB0eXBlb2YgaW0sXG5cdFx0XHRnaW06IHR5cGVvZiBnaW0sXG5cdFx0XHRkZWZhdWx0PyA6ZXhwb3J0cyxcblx0XHR9O1xuXHR9KClcbik7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrQkFBZSxPQUFPOzs7OzBCQUFDLHRCQ012QixJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUM7SUFFbkIsU0FBUyxNQUFNLENBQUUsR0FBMEIsRUFBRSxhQUFvQztRQUNoRixJQUFJLE1BQU0sR0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsS0FBTSxJQUFJLE1BQU0sR0FBVyxhQUFhLENBQUMsTUFBTSxFQUFFLEtBQUssR0FBVyxDQUFDLEVBQUUsS0FBSyxHQUFDLE1BQU0sR0FBSTtZQUNuRixJQUFJLFlBQVksR0FBb0IsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pELE1BQU0sSUFBSSxDQUFFLFlBQVksWUFBWSxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sR0FBRyxZQUFZLElBQUcsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDL0Y7UUFDRCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7QUFHRCxhQUFnQixTQUFTLENBQUUsUUFBOEI7UUFDeEQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7QUFFRCxhQUFnQixTQUFTLENBQUUsS0FBYTtRQUN2QyxPQUFPLFNBQVMsU0FBUyxDQUFFLFFBQThCO1lBQ3hELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDckUsQ0FBQztJQUNILENBQUM7QUFFRCxJQUFPLElBQUksQ0FBQyxpQkFBZ0IsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNDLElBQU8sSUFBSSxDQUFDLGlCQUFnQixTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0MsSUFBTyxJQUFJLENBQUMsaUJBQWdCLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzQyxJQUFPLElBQUksRUFBRSxpQkFBZ0IsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdDLElBQU8sSUFBSSxFQUFFLGlCQUFnQixTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0MsSUFBTyxJQUFJLEVBQUUsaUJBQWdCLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QyxJQUFPLElBQUksR0FBRyxpQkFBZ0IsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRS9DLGtCQUFlO0lBQ2Q7SUFDQTtRQUNDLElBQUksT0FBTyxHQUFZO1lBQ3RCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztZQUNKLEVBQUUsRUFBRSxFQUFFO1lBQ04sRUFBRSxFQUFFLEVBQUU7WUFDTixFQUFFLEVBQUUsRUFBRTtZQUNOLEdBQUcsRUFBRSxHQUFHO1NBQ1IsQ0FBQztRQUNGLE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQWNyQyxDQUFDLEVBQUUsRUFDRjs7Ozs7Ozs7Iiwic291cmNlUm9vdCI6Ii4uLy4uL3NyYy8ifQ==