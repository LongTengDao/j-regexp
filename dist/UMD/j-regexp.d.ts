export as namespace newRegExp;
export = exports;
declare const exports :main & {
	version :'5.2.0',
	newRegExp :main,
	clearRegExp () :undefined,
	clearRegExp<T extends any> (value :T) :T,
	groupify (branches :string[], uFlag? :boolean, noEscape? :boolean) :string,
	default :typeof exports,
};

type main = func & { [flags in FLAGS] :func };
type func = (template :TemplateStringsArray, ...substitutions :( RegExp | string )[]) => RegExp;

type FLAGS =
	'gimsuy' | 'gimsu' | 'gimsy' | 'gims' | 'gimuy' | 'gimu' | 'gimy' | 'gim' | 'gisuy' | 'gisu' | 'gisy' | 'gis' | 'giuy' | 'giu' | 'giy' | 'gi'
	| 'gmsuy' | 'gmsu' | 'gmsy' | 'gms' | 'gmuy' | 'gmu' | 'gmy' | 'gm' | 'gsuy' | 'gsu' | 'gsy' | 'gs' | 'guy' | 'gu' | 'gy' | 'g' |
	'imsuy' | 'imsu' | 'imsy' | 'ims' | 'imuy' | 'imu' | 'imy' | 'im' | 'isuy' | 'isu' | 'isy' | 'is' | 'iuy' | 'iu' | 'iy' | 'i' |
	'msuy' | 'msu' | 'msy' | 'ms' | 'muy' | 'mu' | 'my' | 'm' |
	'suy' | 'su' | 'sy' | 's' |
	'uy' | 'u' |
	'y';
