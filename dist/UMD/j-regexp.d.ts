export as namespace newRegExp;
export = exports;

declare const exports :typeof newRegExp & Readonly<{
	
	version :'6.3.0',
	
	newRegExp :typeof newRegExp,
	
	clearRegExp () :undefined,
	clearRegExp<T extends any> (value :T) :T,
	
	groupify (branches :readonly string[], uFlag? :boolean, noEscape? :boolean) :string,
	
	default :typeof exports,
	
}>;

declare function newRegExp (flags :string) :(template :TemplateStringsArray, ...substitutions :( RegExp | string )[]) => RegExp;
declare function newRegExp (template :TemplateStringsArray, ...substitutions :( RegExp | string )[]) :RegExp;
