export const version :'5.2.0';

export const newRegExp :func & { [flags in FLAGS] :func };

export function clearRegExp () :undefined;
export function clearRegExp<T extends any> (value :T) :T;

export function groupify (branches :string[], uFlag? :boolean, noEscape? :boolean) :string;

export default exports;
declare const exports :typeof newRegExp & {
	version :typeof version,
	newRegExp :typeof newRegExp,
	clearRegExp :typeof clearRegExp,
	groupify :typeof groupify,
	default :typeof exports,
};

type func = (template :TemplateStringsArray, ...substitutions :( RegExp | string )[]) => RegExp;

type FLAGS =
	'gimsuy' | 'gimsu' | 'gimsy' | 'gims' | 'gimuy' | 'gimu' | 'gimy' | 'gim' | 'gisuy' | 'gisu' | 'gisy' | 'gis' | 'giuy' | 'giu' | 'giy' | 'gi'
	| 'gmsuy' | 'gmsu' | 'gmsy' | 'gms' | 'gmuy' | 'gmu' | 'gmy' | 'gm' | 'gsuy' | 'gsu' | 'gsy' | 'gs' | 'guy' | 'gu' | 'gy' | 'g' |
	'imsuy' | 'imsu' | 'imsy' | 'ims' | 'imuy' | 'imu' | 'imy' | 'im' | 'isuy' | 'isu' | 'isy' | 'is' | 'iuy' | 'iu' | 'iy' | 'i' |
	'msuy' | 'msu' | 'msy' | 'ms' | 'muy' | 'mu' | 'my' | 'm' |
	'suy' | 'su' | 'sy' | 's' |
	'uy' | 'u' |
	'y';
