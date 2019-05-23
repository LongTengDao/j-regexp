/*!
 * 模块名称：@ltd/j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。
   　　　　　More readable way for creating RegExp.
 * 模块版本：2.0.0
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

    var version = '2.0.0';

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
    var _export = (
    /*#__PURE__*/
    function () {
        var exports = {
            version: version,
            newRegExp: newRegExp,
            NewRegExp: NewRegExp
        };
        return exports['default'] = exports;
    }());

    return _export;

}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMi4wLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBzbGljZSBmcm9tICcuQXJyYXkucHJvdG90eXBlLnNsaWNlJztcblxudmFyIE5UID0gL1tcXG5cXHRdL2c7XG5cbmZ1bmN0aW9uIFNvdXJjZSAocmF3IDpSZWFkb25seUFycmF5PHN0cmluZz4sIHN1YnN0aXR1dGlvbnMgOiggc3RyaW5nIHwgUmVnRXhwIClbXSkgOnN0cmluZyB7XG5cdHZhciBzb3VyY2UgOnN0cmluZyA9IHJhd1swXTtcblx0Zm9yICggdmFyIGxlbmd0aCA6bnVtYmVyID0gc3Vic3RpdHV0aW9ucy5sZW5ndGgsIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICkge1xuXHRcdHZhciBzdWJzdGl0dXRpb24gOnN0cmluZyB8IFJlZ0V4cCA9IHN1YnN0aXR1dGlvbnNbaW5kZXhdO1xuXHRcdHNvdXJjZSArPSAoIHN1YnN0aXR1dGlvbiBpbnN0YW5jZW9mIFJlZ0V4cCA/IHN1YnN0aXR1dGlvbi5zb3VyY2UgOiBzdWJzdGl0dXRpb24gKStyYXdbKytpbmRleF07XG5cdH1cblx0cmV0dXJuIHNvdXJjZS5yZXBsYWNlKE5ULCAnJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdSZWdFeHAgKHRlbXBsYXRlIDpUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uc3Vic3RpdHV0aW9ucyA6KCBzdHJpbmcgfCBSZWdFeHAgKVtdKSA6UmVnRXhwO1xuZXhwb3J0IGZ1bmN0aW9uIG5ld1JlZ0V4cCAodGVtcGxhdGUgOlRlbXBsYXRlU3RyaW5nc0FycmF5KSA6UmVnRXhwIHtcblx0cmV0dXJuIFJlZ0V4cChTb3VyY2UodGVtcGxhdGUucmF3LCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE5ld1JlZ0V4cCAoZmxhZ3MgOnN0cmluZykgOnR5cGVvZiBuZXdSZWdFeHAge1xuXHRyZXR1cm4gZnVuY3Rpb24gbmV3UmVnRXhwICh0ZW1wbGF0ZSA6VGVtcGxhdGVTdHJpbmdzQXJyYXkpIDpSZWdFeHAge1xuXHRcdHJldHVybiBSZWdFeHAoU291cmNlKHRlbXBsYXRlLnJhdywgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKSwgZmxhZ3MpO1xuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCAoXG5cdC8qI19fUFVSRV9fKi9cblx0ZnVuY3Rpb24gKCkge1xuXHRcdHZhciBleHBvcnRzIDpleHBvcnRzID0ge1xuXHRcdFx0dmVyc2lvbjogdmVyc2lvbixcblx0XHRcdG5ld1JlZ0V4cDogbmV3UmVnRXhwLFxuXHRcdFx0TmV3UmVnRXhwOiBOZXdSZWdFeHBcblx0XHR9O1xuXHRcdHJldHVybiBleHBvcnRzWydkZWZhdWx0J10gPSBleHBvcnRzO1xuXHRcdHR5cGUgZXhwb3J0cyA9IHtcblx0XHRcdHZlcnNpb24gOnR5cGVvZiB2ZXJzaW9uLFxuXHRcdFx0bmV3UmVnRXhwIDp0eXBlb2YgbmV3UmVnRXhwLFxuXHRcdFx0TmV3UmVnRXhwIDp0eXBlb2YgTmV3UmVnRXhwLFxuXHRcdFx0ZGVmYXVsdD8gOmV4cG9ydHMsXG5cdFx0fTtcblx0fSgpXG4pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0JBQWUsT0FBTzs7OzswQkFBQyx0QkNNdkIsSUFBSSxFQUFFLEdBQUcsU0FBUyxDQUFDO0lBRW5CLFNBQVMsTUFBTSxDQUFFLEdBQTBCLEVBQUUsYUFBb0M7UUFDaEYsSUFBSSxNQUFNLEdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLEtBQU0sSUFBSSxNQUFNLEdBQVcsYUFBYSxDQUFDLE1BQU0sRUFBRSxLQUFLLEdBQVcsQ0FBQyxFQUFFLEtBQUssR0FBQyxNQUFNLEdBQUk7WUFDbkYsSUFBSSxZQUFZLEdBQW9CLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6RCxNQUFNLElBQUksQ0FBRSxZQUFZLFlBQVksTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsWUFBWSxJQUFHLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQy9GO1FBQ0QsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDO0FBR0QsYUFBZ0IsU0FBUyxDQUFFLFFBQThCO1FBQ3hELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0FBRUQsYUFBZ0IsU0FBUyxDQUFFLEtBQWE7UUFDdkMsT0FBTyxTQUFTLFNBQVMsQ0FBRSxRQUE4QjtZQUN4RCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3JFLENBQUM7SUFDSCxDQUFDO0FBRUQsa0JBQWU7SUFDZDtJQUNBO1FBQ0MsSUFBSSxPQUFPLEdBQVk7WUFDdEIsT0FBTyxFQUFFLE9BQU87WUFDaEIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsU0FBUyxFQUFFLFNBQVM7U0FDcEIsQ0FBQztRQUNGLE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQU9yQyxDQUFDLEVBQUUsRUFDRjs7Ozs7Ozs7Iiwic291cmNlUm9vdCI6Ii4uLy4uL3NyYy8ifQ==