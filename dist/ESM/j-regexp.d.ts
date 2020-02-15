export const version :'7.0.0';

export function newRegExp (template :TemplateStringsArray, ...substitutions :( string | RegExp | readonly string[] )[]) :RegExp;
export function newRegExp (flags :string) :(template :TemplateStringsArray, ...substitutions :( string | RegExp | readonly string[] )[]) => RegExp;

export function clearRegExp () :undefined;
export function clearRegExp<T extends any> (value :T) :T;

export function groupify (branches :readonly string[], uFlag? :boolean, noEscape? :boolean) :string;

export default exports;
declare const exports :typeof newRegExp & Readonly<{
	version :typeof version,
	newRegExp :typeof newRegExp,
	clearRegExp :typeof clearRegExp,
	groupify :typeof groupify,
	default :typeof exports,
}>;
