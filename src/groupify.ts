import create from '.Object.create?=';
import NULL from '.null.prototype';

var NEED_TO_ESCAPE_IN_REGEXP = /^[$()*+\-.?[\\\]^{|]/;
var SURROGATE_PAIR = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/;
var GROUP = /*#__PURE__*/create(NULL) as Group;

export default function groupify (branches :ArrayLike<string>, uFlag? :boolean, noEscape? :boolean) :string {
	var group = create(NULL) as Group;
	var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
	for ( var length :number = branches.length, index :number = 0; index<length; ++index ) { appendBranch(group, branches[index]!); }
	return sourcify(group, !noEscape);
};

function appendPointBranch (group :Group, branch :string) :void {
	if ( branch ) {
		var character :string = SURROGATE_PAIR.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
		appendPointBranch(group[character] || ( group[character] = create(NULL) as Group ), branch.slice(character.length));
	}
	else { group[''] = GROUP; }
}

function appendCodeBranch (group :Group, branch :string) :void {
	if ( branch ) {
		var character :string = branch.charAt(0);
		appendCodeBranch(group[character] || ( group[character] = create(NULL) as Group ), branch.slice(1));
	}
	else { group[''] = GROUP; }
}

function sourcify (group :Group, needEscape :boolean) :string {
	var branches :string[] = [];
	var singleCharactersBranch :string[] = [];
	var noEmptyBranch :boolean = true;
	for ( var character in group ) {
		if ( character ) {
			var sub_branches :string = sourcify(group[character]!, needEscape);
			if ( needEscape && NEED_TO_ESCAPE_IN_REGEXP.test(character) ) { character = '\\' + character; }
			sub_branches ? branches.push(character + sub_branches) : singleCharactersBranch.push(character);
		}
		else { noEmptyBranch = false; }
	}
	singleCharactersBranch.length && branches.unshift(singleCharactersBranch.length===1 ? singleCharactersBranch[0]! : '[' + singleCharactersBranch.join('') + ']');
	return branches.length===0
		? ''
		: ( branches.length===1 && ( singleCharactersBranch.length || noEmptyBranch )
			? branches[0]
			: '(?:' + branches.join('|') + ')'
		)
		+ ( noEmptyBranch ? '' : '?' );
}

type Group = { [character :string] :Group };
