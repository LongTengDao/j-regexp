export = exports;
declare const exports :{
	version :'2.0.0',
	newRegExp :typeof newRegExp,
	NewRegExp (flags :string) :typeof newRegExp,
	default: typeof exports,
};
declare function newRegExp (template :TemplateStringsArray, ...substitutions :( string | RegExp )[]) :RegExp;