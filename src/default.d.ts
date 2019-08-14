export = exports;

declare const exports :NewRegExp & newRegExp & Readonly<{
	
	version :string,
	
	newRegExp :NewRegExp & newRegExp,
	
	clearRegExp () :undefined,
	clearRegExp<T extends any> (value :T) :T,
	
	groupify (branches :string[], uFlag? :boolean, noEscape? :boolean) :string,
	
	default :typeof exports,
	
}>;

type NewRegExp = (flags :string) => newRegExp;
type newRegExp = (template :TemplateStringsArray, ...substitutions :( RegExp | string )[]) => RegExp;
