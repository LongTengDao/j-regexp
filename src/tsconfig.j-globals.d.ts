
declare module '.Array.prototype.slice' { export default Array.prototype.slice; }

declare module '.Object.assign' { export default Object.assign; }
declare module '.Object.create?=' { export default Object.create; }
declare module '.Object.defineProperty' { export default Object.defineProperty; }
declare module '.Object.freeze' { export default Object.freeze; }
declare module '.Object.prototype.hasOwnProperty' { export default Object.prototype.hasOwnProperty; }

declare module '.RegExp' { export default RegExp; }

declare module '.Symbol.toStringTag?' { export default Symbol.toStringTag; }

declare module '.default' { export default Default;
	function Default<Exports extends { readonly [key :string] :any, default? :Module<Exports> }> (exports :Exports) :Module<Exports>;
	function Default<Statics extends { readonly [key :string] :any, default? :ModuleFunction<Statics, Main> }, Main extends Callable | Newable | Callable & Newable> (main :Main, statics :Statics) :ModuleFunction<Statics, Main>;
	type Module<Exports> = { readonly [key in keyof Exports] :Exports[key] } & { readonly default :Module<Exports> };
	type ModuleFunction<Statics, Main> = { readonly [key in keyof Statics] :Statics[key] } & { readonly default :ModuleFunction<Statics, Main> } & Main;
	type Callable = { (...args :any[]) :any };
	type Newable = { new (...args :any[]) :any };
}

declare module '.undefined' { export default undefined; }
