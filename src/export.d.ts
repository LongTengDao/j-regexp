export const version :string;

export const newRegExp :NewRegExp & {
	readonly [Flags in `${'d' | ''}${'g' | ''}${'i' | ''}${'m' | ''}${'s' | ''}${'u' | ''}${'y' | ''}`] :NewRegExp
};

export function theRegExp<Indexes extends number = 0> (re :RegExp) :BoundIndexesRegExp<Indexes>;
export function theRegExp<Names   extends string    > (re :RegExp) :BoundNamesRegExp<Names>;

export function clearRegExp () :undefined;
export function clearRegExp<T extends any> (value :T) :T;

export function groupify (branches :ArrayLike<string>, uFlag? :boolean, noEscape? :boolean) :string;

export default exports;
declare const exports :typeof newRegExp & Readonly<{
	version :typeof version,
	newRegExp :typeof newRegExp,
	clearRegExp :typeof clearRegExp,
	groupify :typeof groupify,
	default :typeof exports,
}>;

type NewRegExp = {
	<Indexes extends number = 0> (template :TemplateStringsArray, ...substitutions :Substitutions) :BoundIndexesRegExp<Indexes>;
	<Names   extends string    > (template :TemplateStringsArray, ...substitutions :Substitutions) :BoundNamesRegExp<Names>;
};
type Substitutions = ( string | { readonly source :string } )[];

interface BoundIndexesRegExp<T extends number> extends RegExp {
	test :{
		source :string;
		(this :void, string :string) :boolean;
	};
	exec :{
		source :string;
		<Indexes extends number = 0> (this :void, string :string) :null | BoundRegExpExecArray
			&             {        [Index in T | Indexes] :string               }
			& { indices? :{        [Index in T | Indexes] :[ number, number ]   } };
	};
}
interface BoundNamesRegExp<T extends string> extends RegExp {
	test :{
		source :string;
		(this :void, string :string) :boolean;
	};
	exec :{
		source :string;
		<Names   extends string    > (this :void, string :string) :null | BoundRegExpExecArray
			&             { groups :{ [Name in T | Names] :string             } }
			& { indices? :{ groups :{ [Name in T | Names] :[ number, number ] } } };
	};
}
type BoundRegExpExecArray = RegExpExecArray
	&             { groups :undefined | { [Name in string]? :string             } } & { [Index in number]? :string             } & { 0 :string             }
	& { indices? :{ groups :undefined | { [Name in string]? :[ number, number ] } } & { [Index in number]? :[ number, number ] } & { 0 :[ number, number ] } };
