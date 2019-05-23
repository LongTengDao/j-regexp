export const version :string;

export function newRegExp (template :TemplateStringsArray, ...substitutions :( string | RegExp )[]) :RegExp;

export function NewRegExp (flags :string) :typeof newRegExp;

export default exports;
declare const exports :{
	version :typeof version,
	newRegExp :typeof newRegExp,
	NewRegExp :typeof NewRegExp,
	default :typeof exports,
};
