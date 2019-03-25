export = exports;
declare const exports :{
	version :string
	newRegExp :typeof newRegExp
	NewRegExp (flags :string) :typeof newRegExp
};
declare function newRegExp (template :TemplateStringsArray, ...substitutions :( string | RegExp )[]) :RegExp;