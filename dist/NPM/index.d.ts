export = exports;
declare const exports :{
	version :'1.1.0'
	newRegExp :typeof newRegExp
	NewRegExp (flags :string) :typeof newRegExp
};
declare function newRegExp (template :TemplateStringsArray, ...substitutions :( string | RegExp )[]) :RegExp;