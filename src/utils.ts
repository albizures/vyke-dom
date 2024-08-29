export type TypeClass<TType> = {
	new (): TType
	prototype: TType
}
