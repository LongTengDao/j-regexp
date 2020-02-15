export = exports;
declare const exports :Readonly<{
	
	version :'7.0.0'
	
	newRegExp :{
		(flags :string) :(template :TemplateStringsArray, ...substitutions :( string | RegExp | readonly string[] )[]) => RegExp
		(template :TemplateStringsArray, ...substitutions :( string | RegExp | readonly string[] )[]) :RegExp
	}
	
	clearRegExp () :undefined
	clearRegExp<T extends any> (value :T) :T
	
	groupify (branches :readonly string[], uFlag? :boolean, noEscape? :boolean) :string
	
	default :typeof exports
	
}>;