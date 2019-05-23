export = exports;
declare const exports :{
	version :string
	newRegExp :typeof newRegExp
	NewRegExp (flags :string) :typeof newRegExp
	g :typeof newRegExp
	i :typeof newRegExp
	m :typeof newRegExp
	gi :typeof newRegExp
	gm :typeof newRegExp
	im :typeof newRegExp
	gim :typeof newRegExp
	default: typeof exports
};
declare function newRegExp (template :TemplateStringsArray, ...substitutions :( string | RegExp )[]) :RegExp;