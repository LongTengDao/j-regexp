import RegExp from '.RegExp';
import slice from '.Array.prototype.slice';

var NT = /[\n\t]/g;

function Source (raw :ReadonlyArray<string>, substitutions :( RegExp | string )[]) :string {
	var source :string = raw[0];
	for ( var length :number = substitutions.length, index :number = 0; index<length; ) {
		var substitution :RegExp | string = substitutions[index];
		source += ( substitution instanceof RegExp ? substitution.source : substitution )+raw[++index];
	}
	return source.replace(NT, '');
}

var newRegExp :newRegExp =
	/*#__PURE__*/
	function (newRegExp, createNewRegExpWith) {
		
		( function recursion (pickedFlags :FLAGS | '', restFlags :FLAGS) :void {
			if ( restFlags ) {
				recursion(pickedFlags+restFlags.charAt(0) as FLAGS, restFlags = restFlags.slice(1) as FLAGS);
				recursion(pickedFlags, restFlags);
			}
			else if ( pickedFlags ) {
				newRegExp[pickedFlags] = createNewRegExpWith(pickedFlags);
			}
		} )('', 'gimsuy');
		
		return newRegExp;
		
	}(
		function newRegExp (template :TemplateStringsArray) :RegExp {
			return new RegExp(Source(template.raw, slice.call(arguments, 1)));
		} as newRegExp,
		
		function createNewRegExpWith (flags :FLAGS) {
			return ( {} as any )['newRegExp.'+flags] = function (template :TemplateStringsArray) :RegExp {
				return new RegExp(Source(template.raw, slice.call(arguments, 1)), flags);
			};
		}
	);

export default newRegExp;

type newRegExp = func & { [flags in FLAGS] :func };

type func = (template :TemplateStringsArray, ...substitutions :( RegExp | string )[]) => RegExp;

type FLAGS =
	
	'gimsuy' | 'gimsu' | 'gimsy' | 'gims' | 'gimuy' | 'gimu' | 'gimy' | 'gim' | 'gisuy' | 'gisu' | 'gisy' | 'gis' | 'giuy' | 'giu' | 'giy' | 'gi' | 'gmsuy' | 'gmsu' | 'gmsy' | 'gms' | 'gmuy' | 'gmu' | 'gmy' | 'gm' | 'gsuy' | 'gsu' | 'gsy' | 'gs' | 'guy' | 'gu' | 'gy' | 'g'
	|
	'imsuy' | 'imsu' | 'imsy' | 'ims' | 'imuy' | 'imu' | 'imy' | 'im' | 'isuy' | 'isu' | 'isy' | 'is' | 'iuy' | 'iu' | 'iy' | 'i'
	|
	'msuy' | 'msu' | 'msy' | 'ms' | 'muy' | 'mu' | 'my' | 'm'
	|
	'suy' | 'su' | 'sy' | 's'
	|
	'uy' | 'u'
	|
	'y';
