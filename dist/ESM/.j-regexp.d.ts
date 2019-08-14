export const version :'6.0.0';

type newRegExp = (template :TemplateStringsArray, ...substitutions :( RegExp | string )[]) => RegExp;
type NewRegExp = (flags :string) => newRegExp;
export const newRegExp :newRegExp & NewRegExp;

export function clearRegExp () :undefined;
export function clearRegExp<T extends any> (value :T) :T;

export function groupify (branches :string[], uFlag? :boolean, noEscape? :boolean) :string;

export default exports;
declare const exports :typeof newRegExp & Readonly<{
	version :typeof version,
	newRegExp :typeof newRegExp,
	clearRegExp :typeof clearRegExp,
	groupify :typeof groupify,
	default :typeof exports,
}>;
