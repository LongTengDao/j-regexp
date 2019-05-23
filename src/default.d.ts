export = exports;
declare const exports :{
	version :string,
	newRegExp :typeof newRegExp,
	NewRegExp (flags :string) :typeof newRegExp,
	default: typeof exports,
};
declare function newRegExp (template :TemplateStringsArray, ...substitutions :( string | RegExp )[]) :RegExp;